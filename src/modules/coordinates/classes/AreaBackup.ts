import { world, type Vector3, type StructureCreateOptions, StructureSaveMode, type StructurePlaceOptions, type Dimension } from "@minecraft/server";
import { splitArea } from "modules/coordinates/functions/splitArea";

/**
 * An interface representing the data of an area backup.
 */
export interface SavedAreaBackupData {
    /**
     * The ID of the area backup.
     *
     * @type {string}
     */
    id: string;
    /**
     * The corner of the backed up area.
     *
     * @type {Vector3}
     */
    from: Vector3;
    /**
     * The opposite corner of the backed up area.
     *
     * @type {Vector3}
     */
    to: Vector3;
    /**
     * The id of the dimension of the backed up area.
     *
     * @type {string}
     */
    dimension: string;
}

/**
 * A class representing an area backup.
 */
export class AreaBackup {
    /**
     * The ID of the area backup.
     */
    public readonly id: string;
    /**
     * Creates a new AreaBackup instance.
     *
     * @param {string} id The ID of the area backup.
     */
    public constructor(id: string) {
        this.id = id;
    }
    /**
     * The corner of the backed up area.
     *
     * @type {Vector3}
     */
    public get from(): Vector3 {
        return JSON.parse(String(world.getDynamicProperty(this.id))).from as Vector3;
    }
    /**
     * The opposite corner of the backed up area.
     *
     * @type {Vector3}
     */
    public get to(): Vector3 {
        return JSON.parse(String(world.getDynamicProperty(this.id))).to as Vector3;
    }
    /**
     * The dimension of the backed up area.
     *
     * @type {Dimension}
     */
    public get dimension(): Dimension {
        return tryget(() => world.getDimension(JSON.parse(String(world.getDynamicProperty(this.id))).dimension as string)) ?? overworld;
    }
    /**
     * The timestamps of the backups, sorted newest first.
     *
     * @type {number[]}
     */
    public get backups(): number[] {
        return [
            ...new Set(
                world.structureManager
                    .getWorldStructureIds()
                    .filter((v) => v.startsWith(`${this.id};`))
                    .map((v) => Number(v.split(";")[1].split(",")[0]))
            ),
        ]
            .sort()
            .reverse();
    }
    /**
     * The structure IDs of the backed up area.
     *
     * @type {string[]}
     */
    public get backupStructureIds(): string[] {
        return world.structureManager.getWorldStructureIds().filter((v) => v.startsWith(`${this.id};`));
    }
    /**
     * The structure IDs of the backed up area for a specific backup.
     *
     * @param {number | string} timestamp The timestamp to get the structure IDs for.
     * @returns {string[]} The structure IDs for the given timestamp.
     */
    public saveIds(timestamp: number | string): string[] {
        return world.structureManager.getWorldStructureIds().filter((v) => v.startsWith(`${this.id};${timestamp}`));
    }
    /**
     * The size of the backed up area.
     *
     * @type {Vector3}
     */
    public get size(): Vector3 {
        return ((v: Vector3) => ({
            x: Math.abs(v.x),
            y: Math.abs(v.y),
            z: Math.abs(v.z),
        }))(Vector.subtract(this.from, this.to)) as Vector3;
    }
    /**
     * The JSON representation of the area backup.
     *
     * @returns {SavedAreaBackupData} The JSON representation of the area backup.
     */
    public toJSON(): SavedAreaBackupData {
        return {
            id: this.id,
            from: this.from,
            to: this.to,
            dimension: this.dimension.id,
        };
    }
    /**
     * The JSON representation of the area backup without the ID.
     *
     * @returns {Omit<SavedAreaBackupData, "id">} The JSON representation of the area backup without the ID.
     */
    public toJSONNoId(): Omit<SavedAreaBackupData, "id"> {
        return { from: this.from, to: this.to, dimension: this.dimension.id };
    }
    /**
     * Deletes the area backup.
     */
    public delete(): void {
        this.clear();
        world.setDynamicProperty(this.id);
    }
    /**
     * Clears all backups from the area backup.
     */
    public clear(): void {
        this.backupStructureIds.forEach((v) => world.structureManager.delete(v));
    }
    /**
     * Clears a specific backup from the area backup.
     *
     * @param {number | string} timestamp The timestamp of the backup to clear.
     */
    public clearBackup(timestamp: number | string): void {
        this.saveIds(timestamp).forEach((v) => world.structureManager.delete(v));
    }
    /**
     * Clears all backups from the area backup.
     */
    public clearBackups(): void {
        this.backups.forEach((v) => this.saveIds(v).forEach((v) => world.structureManager.delete(v)));
    }
    /**
     * Backs up a specific range of the area.
     *
     * @param {[from: Vector3, to: Vector3, indices: Vector3]} range The range to back up.
     * @param {number} saveTime The timestamp to save the backup.
     * @param {StructureCreateOptions} [options] The options to use when creating the backup.
     */
    public backupRange(range: [from: Vector3, to: Vector3, indices: Vector3], saveTime: number, options?: StructureCreateOptions): void {
        try {
            world.structureManager.createFromWorld(
                `${this.id};${saveTime},${range[2].x ?? 0},${range[2].y ?? 0},${range[2].z ?? 0}`,
                this.dimension,
                range[0],
                range[1],
                options
            );
        } catch (e) {
            console.error(e, e.stack);
        }
    }
    /**
     * Backs up the area.
     *
     * @param {number} [saveTime=Date.now()] The timestamp to save the backup.
     * @param {StructureCreateOptions} [options] The options to use when creating the backup. Defaults to `{ saveMode: StructureSaveMode.World, includeBlocks: true, includeEntities: false }`.
     * @param {Vector3} [sizeLimits] The size limits to use when splitting the area. Defaults to `{ x: 64, y: 128, z: 64 }`.
     */
    public backup(
        saveTime: number = Date.now(),
        options: StructureCreateOptions = {
            saveMode: StructureSaveMode.World,
            includeBlocks: true,
            includeEntities: false,
        },
        sizeLimits: Vector3 = { x: 64, y: 128, z: 64 }
    ): void {
        for (const range of splitArea({ from: this.from, to: this.to }, sizeLimits)) {
            this.backupRange(range as any, saveTime, options);
        }
    }
    /**
     * Rolls back to a specific backup.
     *
     * @param {number} [saveTime=this.backups[0]] The timestamp of the backup to roll back to. Defaults to the newest backup.
     * @param {boolean} [clearSave=false] Whether to clear the backup after rolling back. Defaults to `false`.
     * @param {StructurePlaceOptions} [options] The options to use when placing the backup.
     * @param {Vector3} [sizes] The sizes to use when rolling back. Defaults to `{ x: 64, y: 128, z: 64 }`.
     * @returns {1 | 0} `1` if successful, `0` if not.
     */
    public rollback(
        saveTime: number = this.backups[0],
        clearSave: boolean = false,
        options?: StructurePlaceOptions,
        sizes: Vector3 = { x: 64, y: 128, z: 64 }
    ): 1 | 0 {
        /**
         * The IDs of the structures to place.
         *
         * @type {string[]}
         */
        let ids: string[] = this.saveIds(saveTime);
        if (ids.length == 0) {
            return 0;
        }
        ids.map((v) => ({
            id: v,
            x: Number(v.split(",")[1] ?? 0) * sizes.x,
            y: Number(v.split(",")[2] ?? 0) * sizes.y,
            z: Number(v.split(",")[3] ?? 0) * sizes.z,
        })).forEach((v) => world.structureManager.place(v.id, this.dimension, Vector.add(this.from, v), options));
        if (clearSave) {
            this.clearBackup(saveTime);
        }
        return 1;
    }
}

