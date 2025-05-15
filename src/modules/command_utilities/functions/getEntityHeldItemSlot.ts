import { ContainerSlot, Entity, EquipmentSlot } from "@minecraft/server";

export function getEntityHeldItemSlot(entity: Entity): ContainerSlot | undefined {
    return entity
        .getComponent("equippable")
        ?.getEquipmentSlot(EquipmentSlot.Mainhand);
}
