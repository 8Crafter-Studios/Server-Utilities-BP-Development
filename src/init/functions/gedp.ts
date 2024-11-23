import type { Entity, Player } from "@minecraft/server";

export function gedp(entity: Entity | Player, propertyId: string) {
    return entity.getDynamicProperty(propertyId);
}
