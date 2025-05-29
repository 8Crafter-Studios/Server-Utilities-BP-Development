import { world, Dimension, type Vector3 } from "@minecraft/server";
import { AreaBackup } from "./AreaBackup";

/**
 * A class representing a collection of area backups.
 */
export class AreaBackups {
    /**
     * The IDs of the area backups.
     *
     * @type {string[]}
     */
    public static get ids(): string[] {
        return world
            .getDynamicPropertyIds()
            .filter((v) => v.startsWith("areabackup:"));
    }
    /**
     * The structure IDs of the area backups.
     *
     * @type {string[]}
     */
    public static get structureIds(): string[] {
        return world.structureManager
            .getWorldStructureIds()
            .filter((v) => v.startsWith("areabackup:"));
    }
    /**
     * The area backups.
     *
     * @type {AreaBackup[]}
     */
    public static get areas(): AreaBackup[] {
        return this.ids.map((v) => this.get(v));
    }
    /**
     * Gets an area backup by its ID.
     *
     * @param {string} id The ID of the area backup.
     * @returns {AreaBackup} The area backup.
     */
    public static get(id: string): AreaBackup {
        return new AreaBackup(id);
    }
    /**
     * Deletes an area backup by its ID.
     *
     * @param {string} id The ID of the area backup.
     */
    public static delete(id: string): void {
        new AreaBackup(id).delete();
    }
    /**
     * Deletes all area backups.
     */
    public static clear(): void {
        this.ids.forEach((v) => new AreaBackup(v).delete());
    }
    /**
     * Creates an area backup.
     *
     * @param {string} id The ID of the area backup.
     * @param {Dimension | string} dimension The dimension of the area backup.
     * @param {{ from: Vector3; to: Vector3; }} area The area of the area backup.
     * @returns {AreaBackup} The newly created area backup.
     */
    static createAreaBackup(
        id: string,
        dimension: Dimension | string,
        area: { from: Vector3; to: Vector3; }
    ): AreaBackup {
        world.setDynamicProperty(
            "areabackup:" + id.replaceAll(";", "").replaceAll(",", ""),
            JSON.stringify({
                from: area.from,
                to: area.to,
                dimension: typeof dimension === "string" ? dimension : dimension.id,
            })
        );
        return new AreaBackup(id);
    }
}
