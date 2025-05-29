import { world, type Vector3, Dimension, type StructureCreateOptions, type DimensionLocation, type StructurePlaceOptions } from "@minecraft/server";
import { splitArea } from "modules/coordinates/functions/splitArea";

/**
 * The global block clipboard.
 *
 * @see {@link BlockClipboard}
 *
 * @hideconstructor
 */
export class GlobalBlockClipboard {
    private constructor() {}
    /**
     * The structure IDs of the contents of the global block clipboard.
     *
     * @type {string[]}
     */
    public static get ids(): string[] {
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
    public static get contentsSize(): Vector3 {
        return (world.getDynamicProperty(`andexdb:clipboards`) ?? { x: -1, y: -1, z: -1 }) as Vector3;
    }
    /**
     * Whether the global block clipboard is empty.
     *
     * @type {boolean}
     */
    public static get isEmpty(): boolean {
        return Vector.equals(this.contentsSize, { x: -1, y: -1, z: -1 });
    }
    /**
     * Clears the contents of the global block clipboard.
     */
    public static clear(): void {
        this.ids.forEach((v) => world.structureManager.delete(v));
    }
    /**
     * Throws an error because the global block clipboard cannot be deleted.
     *
     * @throws {Error} Always, because the global block clipboard cannot be deleted.
     */
    public static delete(): void {
        throw new Error("The global block clipboard cannot be deleted.");
    }
    /**
     * Copies the specified range of blocks to the global block clipboard.
     *
     * @param {Dimension} dimension The dimension of the area to copy to the clipboard.
     * @param {[from: Vector3, to: Vector3, indices: Vector3]} range The area to copy to the clipboard.
     * @param {StructureCreateOptions} [options] The options to copy the to the clipboard with.
     */
    public static copyRange(dimension: Dimension, range: [from: Vector3, to: Vector3, indices: Vector3], options?: StructureCreateOptions): void {
        try {
            world.structureManager.createFromWorld(
                `andexdb:clipboard,${range[2].x ?? 0},${range[2].y ?? 0},${range[2].z ?? 0}`,
                dimension,
                range[0],
                range[1],
                options
            );
        } catch (e) {
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
    public static copy(
        dimension: Dimension,
        area: { from: Vector3; to: Vector3 },
        options?: StructureCreateOptions,
        sizeLimits: Vector3 = { x: 64, y: 128, z: 64 }
    ): void {
        world.setDynamicProperty(
            `andexdb:clipboards`,
            ((v: Vector3) => ({
                x: Math.abs(v.x),
                y: Math.abs(v.y),
                z: Math.abs(v.z),
            }))(Vector.subtract(area.to, area.from))
        );
        for (const range of splitArea(area, sizeLimits)) {
            this.copyRange(dimension, range as any, options);
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
    public static paste(location: DimensionLocation, options?: StructurePlaceOptions, sizes: Vector3 = { x: 64, y: 128, z: 64 }): void {
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
    public readonly clipboardID: string;
    /**
     * Creates a new block clipboard.
     *
     * @param {string} clipboardID The ID of the block clipboard, must be unique, cannot contain commas.
     *
     * @throws {TypeError} If the block clipboard ID contains a comma.
     */
    public constructor(clipboardID: string) {
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
    public get ids(): string[] {
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
    public get contentsSize(): Vector3 {
        return (world.getDynamicProperty(`clipboardSize:${this.clipboardID}`) ?? { x: -1, y: -1, z: -1 }) as Vector3;
    }
    /**
     * Whether this block clipboard is empty.
     *
     * @type {boolean}
     */
    public get isEmpty(): boolean {
        return Vector.equals(this.contentsSize, { x: -1, y: -1, z: -1 });
    }
    /**
     * Clears the contents of this block clipboard.
     */
    public clear(): void {
        this.ids.forEach((v) => world.structureManager.delete(v));
        world.setDynamicProperty(`clipboardSize:${this.clipboardID}`, { x: -1, y: -1, z: -1 });
    }
    /**
     * Deletes the block clipboard.
     */
    public delete(): void {
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
    public copyRange(dimension: Dimension, range: [from: Vector3, to: Vector3, indices: Vector3], options?: StructureCreateOptions): void {
        try {
            world.structureManager.createFromWorld(
                `andexdb:clipboard,${range[2].x ?? 0},${range[2].y ?? 0},${range[2].z ?? 0}`,
                dimension,
                range[0],
                range[1],
                options
            );
        } catch (e) {
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
    public copy(
        dimension: Dimension,
        area: { from: Vector3; to: Vector3 },
        options?: StructureCreateOptions,
        sizeLimits: Vector3 = { x: 64, y: 128, z: 64 }
    ): void {
        world.setDynamicProperty(
            `clipboardSize:${this.clipboardID}`,
            ((v: Vector3) => ({
                x: Math.abs(v.x),
                y: Math.abs(v.y),
                z: Math.abs(v.z),
            }))(Vector.subtract(area.to, area.from))
        );
        for (const range of splitArea(area, sizeLimits)) {
            this.copyRange(dimension, range as any, options);
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
    public paste(location: DimensionLocation, options?: StructurePlaceOptions, sizes: Vector3 = { x: 64, y: 128, z: 64 }): void {
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
    public static getAllClipboardIDs(): string[] {
        return world.getDynamicPropertyIds().filter((v) => v.startsWith("clipboardSize:") && !v.includes(","));
    }
    /**
     * Gets all block clipboards.
     *
     * @returns {BlockClipboard[]} An array of all of the block clipboards.
     */
    public static getAllClipboards(): BlockClipboard[] {
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
    public static getClipboards(clipboardIDs: string[]): BlockClipboard[] {
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
    public static getClipboard(clipboardID: string): BlockClipboard {
        return new BlockClipboard(clipboardID);
    }
    /**
     * Deletes a block clipboard by its ID.
     *
     * @param {string} clipboardID The ID of the block clipboard.
     *
     * @throws {TypeError} If the block clipboard ID contains a comma.
     */
    public static deleteClipboard(clipboardID: string): void {
        new BlockClipboard(clipboardID).delete();
    }
    /**
     * Deletes all block clipboards.
     */
    public static deleteAllClipboards(): void {
        this.getAllClipboards().forEach((v) => v.delete());
    }
    /**
     * Clears the contents of all block clipboards.
     */
    public static clearAllClipboards(): void {
        this.getAllClipboards().forEach((v) => v.clear());
    }
    /**
     * The global block clipboard.
     *
     * @type {typeof GlobalBlockClipboard}
     */
    public static readonly global: typeof GlobalBlockClipboard = GlobalBlockClipboard;
}

