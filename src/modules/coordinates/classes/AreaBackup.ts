import { world, type Vector3, type StructureCreateOptions, StructureSaveMode, type StructurePlaceOptions } from "@minecraft/server";
import { splitArea } from "modules/coordinates/functions/splitArea";

export class AreaBackup {
    id: string;
    constructor(id: string) {
        this.id = id;
    }
    get from() {
        return JSON.parse(String(world.getDynamicProperty(this.id)))
            .from as Vector3;
    }
    get to() {
        return JSON.parse(String(world.getDynamicProperty(this.id)))
            .to as Vector3;
    }
    get dimension() {
        return (
            tryget(() => world.getDimension(
                JSON.parse(String(world.getDynamicProperty(this.id)))
                    .dimension as string
            )
            ) ?? dimensionsc.overworld
        );
    }
    get backups() {
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
    get backupStructureIds() {
        return world.structureManager
            .getWorldStructureIds()
            .filter((v) => v.startsWith(`${this.id};`));
    }
    saveIds(timestamp: number | string) {
        return world.structureManager
            .getWorldStructureIds()
            .filter((v) => v.startsWith(`${this.id};${timestamp}`));
    }
    get size() {
        return ((v: Vector3) => ({
            x: Math.abs(v.x),
            y: Math.abs(v.y),
            z: Math.abs(v.z),
        }))(Vector.subtract(this.from, this.to)) as Vector3;
    }
    toJSON() {
        return {
            id: this.id,
            from: this.from,
            to: this.to,
            dimension: this.dimension,
        };
    }
    toJSONNoId() {
        return { from: this.from, to: this.to, dimension: this.dimension };
    }
    delete() {
        this.clear();
        world.setDynamicProperty(this.id);
    }
    clear() {
        this.backupStructureIds.forEach((v) => world.structureManager.delete(v)
        );
    }
    clearBackup(timestamp: number | string) {
        this.saveIds(timestamp).forEach((v) => world.structureManager.delete(v)
        );
    }
    clearBackups() {
        this.backups.forEach((v) => this.saveIds(v).forEach((v) => world.structureManager.delete(v))
        );
    }
    backupRange(
        range: [from: Vector3, to: Vector3, indices: Vector3],
        saveTime: number,
        options?: StructureCreateOptions
    ) {
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
    backup(
        saveTime = Date.now(),
        options: StructureCreateOptions = {
            saveMode: StructureSaveMode.World,
            includeBlocks: true,
            includeEntities: false,
        },
        sizeLimits = { x: 64, y: 128, z: 64 }
    ) {
        for (const range of splitArea(
            { from: this.from, to: this.to },
            sizeLimits
        )) {
            this.backupRange(range as any, saveTime, options);
        }
    }
    rollback(
        saveTime = this.backups[0],
        clearSave: boolean = false,
        options?: StructurePlaceOptions,
        sizes: Vector3 = { x: 64, y: 128, z: 64 }
    ) {
        let ids = this.saveIds(saveTime);
        if (ids.length == 0) {
            return 0;
        }
        ids
            .map((v) => ({
                id: v,
                x: Number(v.split(",")[1] ?? 0) * sizes.x,
                y: Number(v.split(",")[2] ?? 0) * sizes.y,
                z: Number(v.split(",")[3] ?? 0) * sizes.z,
            }))
            .forEach((v) => world.structureManager.place(
                v.id,
                this.dimension,
                Vector.add(this.from, v),
                options
            )
            );
        if (clearSave) {
            this.clearBackup(saveTime);
        }
        return 1;
    }
}
