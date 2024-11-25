import { world } from "@minecraft/server";

export function swdp(
    propertyId: string,
    newValue?: string | number | boolean | undefined
) {
    return world.setDynamicProperty(propertyId, newValue);
}
Object.defineProperty(globalThis, 'swdp', {
    value: swdp,
    configurable: true,
    enumerable: true,
    writable: false,
})
declare global {
    const swdp: typeof import('./swdp').swdp;
}
