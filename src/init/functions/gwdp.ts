import { world } from "@minecraft/server";

export function gwdp(propertyId: string) {
    return world.getDynamicProperty(propertyId);
}
Object.defineProperty(globalThis, 'gwdp', {
    value: gwdp,
    configurable: true,
    enumerable: true,
    writable: false,
})
declare global {
    const gwdp: typeof import('./gwdp').gwdp;
}
