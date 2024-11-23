import type { Entity, Player } from "@minecraft/server";

export function sedp(
    entity: Entity | Player,
    propertyId: string,
    newValue?: string | number | boolean | undefined
) {
    return entity.setDynamicProperty(propertyId, newValue);
}
