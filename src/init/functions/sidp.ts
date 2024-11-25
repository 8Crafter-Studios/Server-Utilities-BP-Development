import type { ItemStack, ContainerSlot, Entity, Player } from "@minecraft/server";

export function sidp(
    item: ItemStack | ContainerSlot,
    entity: Entity | Player,
    propertyId: string,
    newValue?: string | number | boolean | undefined
) {
    return item.setDynamicProperty(propertyId, newValue);
}
Object.defineProperty(globalThis, 'sidp', {
    value: sidp,
    configurable: true,
    enumerable: true,
    writable: false,
})
declare global {
    const sidp: typeof import('./sidp').sidp;
}
