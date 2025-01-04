import { world } from "@minecraft/server";

export function getPlayerById(playerId: string | number) {
    return world.getAllPlayers().find((v) => v.id == String(playerId));
}
Object.defineProperty(globalThis, 'getPlayerById', {
    value: getPlayerById,
    configurable: true,
    enumerable: true,
    writable: false,
})
declare global {
    const getPlayerById: typeof import('./getPlayerById').getPlayerById;
}
