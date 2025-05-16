import { world, Player } from "@minecraft/server";
import { swdp } from "init/functions/swdp";
import { gwdp } from "init/functions/gwdp";
import type { extendedExecuteCommandPlayerW } from "modules/commands/types/extendedExecuteCommandPlayerW";
import { Home } from "./Home";

/**
 * This class is used for managing homes for the home system.
 *
 * @hideconstructor
 */
export class HomeSystem {
    /**
     * The format version of the home system.
     */
    public static home_format_version = "0.7.0-beta.72";
    /**
     * Gets the homes for the given home IDs.
     *
     * @param {string[]} homeIds The list of home IDs to get the homes for.
     * @returns {Home[]} The homes for the given home IDs.
     */
    public static getHomes(homeIds: string[]): Home[] {
        return cullUndefined(homeIds.map((c) => Home.get(c)));
    }
    /**
     * Gets all homes.
     * @returns {Home[]} A list of all homes.
     */
    public static getAllHomes(): Home[] {
        return cullUndefined(this.getHomeIds().map((c) => Home.get(c)));
    }
    /**
     * Gets all home IDs.
     * @returns {string[]} A list of all home IDs.
     */
    public static getHomeIds(): string[] {
        return world.getDynamicPropertyIds().filter((v) => v.startsWith("home:"));
    }
    /**
     * Gets the home IDs for the given player.
     * @param {Player | extendedExecuteCommandPlayerW | string} player The player to get the home IDs for. Can be a player object, or a player ID.
     * @returns {string[]} A list of home IDs for the given player.
     */
    public static getHomeIdsForPlayer(player: Player | extendedExecuteCommandPlayerW | string): string[] {
        return world
            .getDynamicPropertyIds()
            .filter((v) => v.startsWith("home:"))
            .filter((v) => tryget(() => JSONParse(String(world.getDynamicProperty(v)))?.ownerId) == (typeof player == "string" ? player : player.id));
    }
    /**
     * Gets the homes for the given player.
     * @param {Player | extendedExecuteCommandPlayerW | string} player The player to get the homes for. Can be a player object, or a player ID.
     * @returns {Home[]} A list of homes for the given player.
     */
    public static getHomesForPlayer(player: Player | extendedExecuteCommandPlayerW | string): Home[] {
        return this.getHomes(this.getHomeIdsForPlayer(player));
    }
    /**
     * Checks if the given player has reached the maximum number of homes.
     * @param {Player | extendedExecuteCommandPlayerW | string} player The player to check.
     * @returns {boolean} True if the player has reached the maximum number of homes, false otherwise.
     */
    public static testIfPlayerAtMaxHomes(player: Player | extendedExecuteCommandPlayerW | string): boolean {
        return this.getHomeIdsForPlayer(player).length >= this.maxHomesPerPlayer;
    }
    /**
     * The maximum number of homes per player.
     *
     * Dynamic Property ID: `homeSystemSettings:maxHomesPerPlayer`
     *
     * @default Infinity
     */
    public static get maxHomesPerPlayer(): number {
        return gwdp("homeSystemSettings:maxHomesPerPlayer") == -1 ? Infinity : Number(gwdp("homeSystemSettings:maxHomesPerPlayer") ?? Infinity);
    }
    public static set maxHomesPerPlayer(maxHomes: number) {
        swdp("homeSystemSettings:maxHomesPerPlayer", maxHomes == Infinity ? -1 : maxHomes);
    }
}

