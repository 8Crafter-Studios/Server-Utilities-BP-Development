import type { ItemStack, ContainerSlot } from "@minecraft/server";

export function gidp(item: ItemStack | ContainerSlot, propertyId: string) {
    return item.getDynamicProperty(propertyId);
}
Object.defineProperty(globalThis, 'gidp', {
    value: gidp,
    configurable: true,
    enumerable: true,
    writable: false,
})
declare global {
    const gidp: typeof import('./gidp').gidp;
}