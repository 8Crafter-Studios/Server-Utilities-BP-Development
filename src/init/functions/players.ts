import { Player, world } from "@minecraft/server";

Object.defineProperty(globalThis, "players", {
    get: function player(): { [name: string]: Player; } {
        return Object.fromEntries(
            world.getAllPlayers().map((p) => [p.name, p])
        );
    },
    configurable: true,
    enumerable: true,
});
