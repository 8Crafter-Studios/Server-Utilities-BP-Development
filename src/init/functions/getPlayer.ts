import { type Player, world } from "@minecraft/server";

namespace exports {
    /**
     * Gets a player by their {@link Player.prototype.name|name}.
     *
     * @param {string | number} playerName The player's name.
     * @returns {Player | undefined} The player if found, otherwise undefined.
     */
    export function getPlayer(playerName: string): Player | undefined {
        return world.getAllPlayers().find((p) => p.name == playerName);
    }
}

export import getPlayer = exports.getPlayer;

Object.defineProperty(globalThis, "getPlayer", {
    value: getPlayer,
    configurable: false,
    enumerable: true,
    writable: false,
});
declare global {
    export import getPlayer = exports.getPlayer;
}
