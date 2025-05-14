import { type Player, world } from "@minecraft/server";

namespace exports {
    /**
     * Gets a player by their {@link Player.prototype.id|UUID}.
     *
     * @param {string | number} playerId The player's UUID.
     * @returns {Player | undefined} The player if found, otherwise undefined.
     */
    export function getPlayerById(playerId: string | number): Player | undefined {
        return world.getAllPlayers().find((p) => p.id == String(playerId));
    }
}

export import getPlayerById = exports.getPlayerById;

Object.defineProperty(globalThis, "getPlayerById", {
    value: getPlayerById,
    configurable: false,
    enumerable: true,
    writable: false,
});
declare global {
    export import getPlayerById = exports.getPlayerById;
}
