import { world } from "@minecraft/server";


export function getPlayer(playerName: string) {
    return world.getAllPlayers().find((p) => p.name == playerName);
}
