import { world } from "@minecraft/server";

export function swdp(
    propertyId: string,
    newValue?: string | number | boolean | undefined
) {
    return world.setDynamicProperty(propertyId, newValue);
}
