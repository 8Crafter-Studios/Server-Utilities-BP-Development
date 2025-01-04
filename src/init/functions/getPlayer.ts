import { world } from "@minecraft/server";


export function getPlayer(playerName: string) {
    return world.getAllPlayers().find((p) => p.name == playerName);
}
Object.defineProperty(globalThis, 'getPlayer', {
    value: getPlayer,
    configurable: true,
    enumerable: true,
    writable: false,
})
declare global {
    const getPlayer: typeof import('./getPlayer').getPlayer;
}
