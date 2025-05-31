import { type Vector3, Dimension, type StructureCreateOptions, type DimensionLocation, type StructurePlaceOptions } from "@minecraft/server";
/**
 * The global block clipboard.
 *
 * @see {@link BlockClipboard}
 *
 * @hideconstructor
 */
export declare class GlobalBlockClipboard {
    private constructor();
    /**
     * The structure IDs of the contents of the global block clipboard.
     *
     * @type {string[]}
     */
    static get ids(): string[];
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
    static get contentsSize(): Vector3;
    /**
     * Whether the global block clipboard is empty.
     *
     * @type {boolean}
     */
    static get isEmpty(): boolean;
    /**
     * Clears the contents of the global block clipboard.
     */
    static clear(): void;
    /**
     * Throws an error because the global block clipboard cannot be deleted.
     *
     * @throws {Error} Always, because the global block clipboard cannot be deleted.
     */
    static delete(): void;
    /**
     * Copies the specified range of blocks to the global block clipboard.
     *
     * @param {Dimension} dimension The dimension of the area to copy to the clipboard.
     * @param {[from: Vector3, to: Vector3, indices: Vector3]} range The area to copy to the clipboard.
     * @param {StructureCreateOptions} [options] The options to copy the to the clipboard with.
     */
    static copyRange(dimension: Dimension, range: [from: Vector3, to: Vector3, indices: Vector3], options?: StructureCreateOptions): void;
    /**
     * Copies the specified area to the global block clipboard.
     *
     * @param {Dimension} dimension The dimension of the area to copy to the clipboard.
     * @param {{ from: Vector3; to: Vector3; }} area The area to copy to the clipboard.
     * @param {StructureCreateOptions} [options] The options to copy the area to the clipboard with.
     * @param {Vector3} [sizeLimits] The sizes of the chunks of the clipboard. Defaults to `{ x: 64, y: 128, z: 64 }`.
     */
    static copy(dimension: Dimension, area: {
        from: Vector3;
        to: Vector3;
    }, options?: StructureCreateOptions, sizeLimits?: Vector3): void;
    /**
     * Pastes the contents of this block clipboard.
     *
     * @param {DimensionLocation} location The location to paste the contents of the clipboard.
     * @param {StructurePlaceOptions} [options] The options to paste the contents of the clipboard with.
     * @param {Vector3} [sizes] The sizes of the chunks of the clipboard. Defaults to `{ x: 64, y: 128, z: 64 }`.
     *
     * @throws {ReferenceError} If the clipboard is empty.
     */
    static paste(location: DimensionLocation, options?: StructurePlaceOptions, sizes?: Vector3): void;
}
/**
 * A class for working with block clipboards.
 */
export declare class BlockClipboard {
    /**
     * The ID of this block clipboard.
     *
     * @type {string}
     */
    readonly clipboardID: string;
    /**
     * Creates a new block clipboard.
     *
     * @param {string} clipboardID The ID of the block clipboard, must be unique, cannot contain commas.
     *
     * @throws {TypeError} If the block clipboard ID contains a comma.
     */
    constructor(clipboardID: string);
    /**
     * The structure IDs of the contents of this block clipboard.
     *
     * @type {string[]}
     */
    get ids(): string[];
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
    get contentsSize(): Vector3;
    /**
     * Whether this block clipboard is empty.
     *
     * @type {boolean}
     */
    get isEmpty(): boolean;
    /**
     * Clears the contents of this block clipboard.
     */
    clear(): void;
    /**
     * Deletes the block clipboard.
     */
    delete(): void;
    /**
     * Copies the specified range of blocks to this block clipboard.
     *
     * @param {Dimension} dimension The dimension of the area to copy to the clipboard.
     * @param {[from: Vector3, to: Vector3, indices: Vector3]} range The area to copy to the clipboard.
     * @param {StructureCreateOptions} [options] The options to copy the area to the clipboard with.
     */
    copyRange(dimension: Dimension, range: [from: Vector3, to: Vector3, indices: Vector3], options?: StructureCreateOptions): void;
    /**
     * Copies the specified area to this block clipboard.
     *
     * @param {Dimension} dimension The dimension of the area to copy to the clipboard.
     * @param {{ from: Vector3; to: Vector3; }} area The area to copy to the clipboard.
     * @param {StructureCreateOptions} [options] The options to copy the area to the clipboard with.
     * @param {Vector3} [sizeLimits] The sizes of the chunks of the clipboard. Defaults to `{ x: 64, y: 128, z: 64 }`.
     */
    copy(dimension: Dimension, area: {
        from: Vector3;
        to: Vector3;
    }, options?: StructureCreateOptions, sizeLimits?: Vector3): void;
    /**
     * Pastes the contents of this block clipboard.
     *
     * @param {DimensionLocation} location The location to paste the contents of the clipboard.
     * @param {StructurePlaceOptions} [options] The options to paste the contents of the clipboard with.
     * @param {Vector3} [sizes] The sizes of the chunks of the clipboard. Defaults to `{ x: 64, y: 128, z: 64 }`.
     *
     * @throws {ReferenceError} If the clipboard is empty.
     */
    paste(location: DimensionLocation, options?: StructurePlaceOptions, sizes?: Vector3): void;
    /**
     * Gets all block clipboard IDs.
     *
     * @returns {string[]} An array of all of the block clipboard IDs.
     */
    static getAllClipboardIDs(): string[];
    /**
     * Gets all block clipboards.
     *
     * @returns {BlockClipboard[]} An array of all of the block clipboards.
     */
    static getAllClipboards(): BlockClipboard[];
    /**
     * Gets block clipboards by their IDs.
     *
     * @param {string[]} clipboardIDs The IDs of the block clipboards to get.
     * @returns {BlockClipboard[]} An array of the block clipboards with the specified IDs.
     *
     * @throws {TypeError} If any of the block clipboard IDs contain a comma.
     */
    static getClipboards(clipboardIDs: string[]): BlockClipboard[];
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
    static getClipboard(clipboardID: string): BlockClipboard;
    /**
     * Deletes a block clipboard by its ID.
     *
     * @param {string} clipboardID The ID of the block clipboard.
     *
     * @throws {TypeError} If the block clipboard ID contains a comma.
     */
    static deleteClipboard(clipboardID: string): void;
    /**
     * Deletes all block clipboards.
     */
    static deleteAllClipboards(): void;
    /**
     * Clears the contents of all block clipboards.
     */
    static clearAllClipboards(): void;
    /**
     * The global block clipboard.
     *
     * @type {typeof GlobalBlockClipboard}
     */
    static readonly global: typeof GlobalBlockClipboard;
}
