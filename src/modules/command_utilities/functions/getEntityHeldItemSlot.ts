import { Entity, EquipmentSlot } from "@minecraft/server";

export function getEntityHeldItemSlot(entity: Entity) {
    return entity
        .getComponent("equippable")
        .getEquipmentSlot(EquipmentSlot.Mainhand);
}
