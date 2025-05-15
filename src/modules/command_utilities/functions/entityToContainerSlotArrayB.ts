import type { Entity, ContainerSlot } from "@minecraft/server";
import { OtherEquipmentSlots } from "modules/command_utilities/constants/OtherEquipmentSlots";

export function entityToContainerSlotArrayB(
    entity: Entity,
    getContainer: boolean = true,
    getEquipment: boolean = true
): { inventory: ContainerSlot[]; equipment: ContainerSlot[]; } | undefined {
    let itemList = [] as ContainerSlot[];
    let itemListB = [] as ContainerSlot[];
    let container = entity.getComponent("inventory")?.container;
    let equipment = entity.getComponent("equippable");
    for (let i = 0; i < (container?.size ?? 0) && getContainer; i++) {
        itemList.push(container!.getSlot(i));
    }
    for (let i = 0; i < 5 && getEquipment && !!equipment; i++) {
        itemListB.push(equipment?.getEquipmentSlot(OtherEquipmentSlots[i]));
    }
    return !!container || !!equipment
        ? { inventory: itemList, equipment: itemListB }
        : undefined;
}
