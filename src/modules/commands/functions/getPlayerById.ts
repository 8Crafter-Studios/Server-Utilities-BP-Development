import { world } from "@minecraft/server";

export function getPlayerById(playerId: string | number) {
    return world.getAllPlayers().find((v) => v.id == String(playerId));
}
