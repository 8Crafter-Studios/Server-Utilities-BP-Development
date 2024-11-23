import { world } from "@minecraft/server";

export function gwdp(propertyId: string) {
    return world.getDynamicProperty(propertyId);
}
