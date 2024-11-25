import type { Entity, Player } from "@minecraft/server";

export function gedp(entity: Entity | Player, propertyId: string) {
    return entity.getDynamicProperty(propertyId);
}
Object.defineProperty(globalThis, 'gedp', {
    value: gedp,
    configurable: true,
    enumerable: true,
    writable: false,
})
declare global {
    const gedp: typeof import('./gedp').gedp;
}