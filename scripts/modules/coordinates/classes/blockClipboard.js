import { world, Dimension } from "@minecraft/server";
import { splitArea } from "modules/coordinates/functions/splitArea";
/**
 * The global block clipboard.
 *
 * @see {@link BlockClipboard}
 *
 * @hideconstructor
 */
export class GlobalBlockClipboard {
    constructor() { }
    /**
     * The structure IDs of the contents of the global block clipboard.
     *
     * @type {string[]}
     */
    static get ids() {
        return world.structureManager.getWorldStructureIds().filter((v) => v.startsWith("andexdb:clipboard"));
    }
    /**
     * The size of the contents of the global block clipboard.
     *
     * If the block clipboard is empty, this will be `{ x: -1, y: -1, z: -1 }`.
     *
     * @type {Vector3}
     *
     * @default
     * ```typescript
     * { x: -1, y: -1, z: -1 }
     * ```
     */
    static get contentsSize() {
        return (world.getDynamicProperty(`andexdb:clipboards`) ?? { x: -1, y: -1, z: -1 });
    }
    /**
     * Whether the global block clipboard is empty.
     *
     * @type {boolean}
     */
    static get isEmpty() {
        return Vector.equals(this.contentsSize, { x: -1, y: -1, z: -1 });
    }
    /**
     * Clears the contents of the global block clipboard.
     */
    static clear() {
        this.ids.forEach((v) => world.structureManager.delete(v));
    }
    /**
     * Throws an error because the global block clipboard cannot be deleted.
     *
     * @throws {Error} Always, because the global block clipboard cannot be deleted.
     */
    static delete() {
        throw new Error("The global block clipboard cannot be deleted.");
    }
    /**
     * Copies the specified range of blocks to the global block clipboard.
     *
     * @param {Dimension} dimension The dimension of the area to copy to the clipboard.
     * @param {[from: Vector3, to: Vector3, indices: Vector3]} range The area to copy to the clipboard.
     * @param {StructureCreateOptions} [options] The options to copy the to the clipboard with.
     */
    static copyRange(dimension, range, options) {
        try {
            world.structureManager.createFromWorld(`andexdb:clipboard,${range[2].x ?? 0},${range[2].y ?? 0},${range[2].z ?? 0}`, dimension, range[0], range[1], options);
        }
        catch (e) {
            console.error(e, e.stack);
        }
    }
    /**
     * Copies the specified area to the global block clipboard.
     *
     * @param {Dimension} dimension The dimension of the area to copy to the clipboard.
     * @param {{ from: Vector3; to: Vector3; }} area The area to copy to the clipboard.
     * @param {StructureCreateOptions} [options] The options to copy the area to the clipboard with.
     * @param {Vector3} [sizeLimits] The sizes of the chunks of the clipboard. Defaults to `{ x: 64, y: 128, z: 64 }`.
     */
    static copy(dimension, area, options, sizeLimits = { x: 64, y: 128, z: 64 }) {
        world.setDynamicProperty(`andexdb:clipboards`, ((v) => ({
            x: Math.abs(v.x),
            y: Math.abs(v.y),
            z: Math.abs(v.z),
        }))(Vector.subtract(area.to, area.from)));
        for (const range of splitArea(area, sizeLimits)) {
            this.copyRange(dimension, range, options);
        }
    }
    /**
     * Pastes the contents of this block clipboard.
     *
     * @param {DimensionLocation} location The location to paste the contents of the clipboard.
     * @param {StructurePlaceOptions} [options] The options to paste the contents of the clipboard with.
     * @param {Vector3} [sizes] The sizes of the chunks of the clipboard. Defaults to `{ x: 64, y: 128, z: 64 }`.
     *
     * @throws {ReferenceError} If the clipboard is empty.
     */
    static paste(location, options, sizes = { x: 64, y: 128, z: 64 }) {
        if (this.isEmpty) {
            throw new ReferenceError(`The global clipboard is empty.`);
        }
        this.ids
            .map((v) => ({
            id: v,
            x: Number(v.split(",")[1] ?? 0) * sizes.x,
            y: Number(v.split(",")[2] ?? 0) * sizes.y,
            z: Number(v.split(",")[3] ?? 0) * sizes.z,
        }))
            .forEach((v) => world.structureManager.place(v.id, location.dimension, Vector.add(v, location), options));
    }
}
/**
 * A class for working with block clipboards.
 */
export class BlockClipboard {
    /**
     * The ID of this block clipboard.
     *
     * @type {string}
     */
    clipboardID;
    /**
     * Creates a new block clipboard.
     *
     * @param {string} clipboardID The ID of the block clipboard, must be unique, cannot contain commas.
     *
     * @throws {TypeError} If the block clipboard ID contains a comma.
     */
    constructor(clipboardID) {
        if (clipboardID.includes(",")) {
            throw new TypeError(`Invalid clipboard ID: ${clipboardID}; Clipboard IDs cannot contain commas.`);
        }
        this.clipboardID = clipboardID;
        Object.defineProperty(this, "clipboardID", {
            enumerable: true,
            writable: false,
            configurable: true,
        });
        if (!world.getDynamicProperty(`clipboardSize:${this.clipboardID}`)) {
            world.setDynamicProperty(`clipboardSize:${this.clipboardID}`, { x: -1, y: -1, z: -1 });
        }
    }
    /**
     * The structure IDs of the contents of this block clipboard.
     *
     * @type {string[]}
     */
    get ids() {
        return world.structureManager.getWorldStructureIds().filter((v) => v.startsWith(`clipboard:${this.clipboardID},`));
    }
    /**
     * The size of the contents of this block clipboard.
     *
     * When the block clipboard is empty, this will be `{ x: -1, y: -1, z: -1 }`.
     *
     * @type {Vector3}
     *
     * @default
     * ```typescript
     * { x: -1, y: -1, z: -1 }
     * ```
     */
    get contentsSize() {
        return (world.getDynamicProperty(`clipboardSize:${this.clipboardID}`) ?? { x: -1, y: -1, z: -1 });
    }
    /**
     * Whether this block clipboard is empty.
     *
     * @type {boolean}
     */
    get isEmpty() {
        return Vector.equals(this.contentsSize, { x: -1, y: -1, z: -1 });
    }
    /**
     * Clears the contents of this block clipboard.
     */
    clear() {
        this.ids.forEach((v) => world.structureManager.delete(v));
        world.setDynamicProperty(`clipboardSize:${this.clipboardID}`, { x: -1, y: -1, z: -1 });
    }
    /**
     * Deletes the block clipboard.
     */
    delete() {
        this.clear();
        world.setDynamicProperty(`clipboardSize:${this.clipboardID}`);
    }
    /**
     * Copies the specified range of blocks to this block clipboard.
     *
     * @param {Dimension} dimension The dimension of the area to copy to the clipboard.
     * @param {[from: Vector3, to: Vector3, indices: Vector3]} range The area to copy to the clipboard.
     * @param {StructureCreateOptions} [options] The options to copy the area to the clipboard with.
     */
    copyRange(dimension, range, options) {
        try {
            world.structureManager.createFromWorld(`andexdb:clipboard,${range[2].x ?? 0},${range[2].y ?? 0},${range[2].z ?? 0}`, dimension, range[0], range[1], options);
        }
        catch (e) {
            console.error(e, e.stack);
        }
    }
    /**
     * Copies the specified area to this block clipboard.
     *
     * @param {Dimension} dimension The dimension of the area to copy to the clipboard.
     * @param {{ from: Vector3; to: Vector3; }} area The area to copy to the clipboard.
     * @param {StructureCreateOptions} [options] The options to copy the area to the clipboard with.
     * @param {Vector3} [sizeLimits] The sizes of the chunks of the clipboard. Defaults to `{ x: 64, y: 128, z: 64 }`.
     */
    copy(dimension, area, options, sizeLimits = { x: 64, y: 128, z: 64 }) {
        world.setDynamicProperty(`clipboardSize:${this.clipboardID}`, ((v) => ({
            x: Math.abs(v.x),
            y: Math.abs(v.y),
            z: Math.abs(v.z),
        }))(Vector.subtract(area.to, area.from)));
        for (const range of splitArea(area, sizeLimits)) {
            this.copyRange(dimension, range, options);
        }
    }
    /**
     * Pastes the contents of this block clipboard.
     *
     * @param {DimensionLocation} location The location to paste the contents of the clipboard.
     * @param {StructurePlaceOptions} [options] The options to paste the contents of the clipboard with.
     * @param {Vector3} [sizes] The sizes of the chunks of the clipboard. Defaults to `{ x: 64, y: 128, z: 64 }`.
     *
     * @throws {ReferenceError} If the clipboard is empty.
     */
    paste(location, options, sizes = { x: 64, y: 128, z: 64 }) {
        if (this.isEmpty) {
            throw new ReferenceError(`Clipboard ${this.clipboardID} is empty.`);
        }
        this.ids
            .map((v) => ({
            id: v,
            x: Number(v.split(",")[1] ?? 0) * sizes.x,
            y: Number(v.split(",")[2] ?? 0) * sizes.y,
            z: Number(v.split(",")[3] ?? 0) * sizes.z,
        }))
            .forEach((v) => world.structureManager.place(v.id, location.dimension, Vector.add(v, location), options));
    }
    /**
     * Gets all block clipboard IDs.
     *
     * @returns {string[]} An array of all of the block clipboard IDs.
     */
    static getAllClipboardIDs() {
        return world.getDynamicPropertyIds().filter((v) => v.startsWith("clipboardSize:") && !v.includes(","));
    }
    /**
     * Gets all block clipboards.
     *
     * @returns {BlockClipboard[]} An array of all of the block clipboards.
     */
    static getAllClipboards() {
        return this.getAllClipboardIDs().map((v) => new BlockClipboard(v));
    }
    /**
     * Gets block clipboards by their IDs.
     *
     * @param {string[]} clipboardIDs The IDs of the block clipboards to get.
     * @returns {BlockClipboard[]} An array of the block clipboards with the specified IDs.
     *
     * @throws {TypeError} If any of the block clipboard IDs contain a comma.
     */
    static getClipboards(clipboardIDs) {
        return clipboardIDs.map((v) => new BlockClipboard(v));
    }
    /**
     * Gets a block clipboard by its ID.
     *
     * If the block clipboard does not exist, it will be created.
     *
     * @param {string} clipboardID The ID of the block clipboard, must be unique, cannot contain commas.
     * @returns {BlockClipboard} The block clipboard.
     *
     * @throws {TypeError} If the block clipboard ID contains a comma.
     */
    static getClipboard(clipboardID) {
        return new BlockClipboard(clipboardID);
    }
    /**
     * Deletes a block clipboard by its ID.
     *
     * @param {string} clipboardID The ID of the block clipboard.
     *
     * @throws {TypeError} If the block clipboard ID contains a comma.
     */
    static deleteClipboard(clipboardID) {
        new BlockClipboard(clipboardID).delete();
    }
    /**
     * Deletes all block clipboards.
     */
    static deleteAllClipboards() {
        this.getAllClipboards().forEach((v) => v.delete());
    }
    /**
     * Clears the contents of all block clipboards.
     */
    static clearAllClipboards() {
        this.getAllClipboards().forEach((v) => v.clear());
    }
    /**
     * The global block clipboard.
     *
     * @type {typeof GlobalBlockClipboard}
     */
    static global = GlobalBlockClipboard;
}
//# sourceMappingURL=BlockClipboard.js.map