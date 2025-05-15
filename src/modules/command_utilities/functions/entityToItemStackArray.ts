import type { Entity, ItemStack } from "@minecraft/server";
import { OtherEquipmentSlots } from "modules/command_utilities/constants/OtherEquipmentSlots";

export function entityToItemStackArray(
    entity: Entity,
    getContainer: boolean = true,
    getEquipment: boolean = true
): (ItemStack | undefined)[] {
    let itemList = [] as (ItemStack | undefined)[];
    let container = entity.getComponent("inventory")?.container;
    let equipment = entity.getComponent("equippable");
    for (let i = 0; i < (container?.size ?? 0); i++) {
        itemList.push(container!.getItem(i));
    }
    for (let i = 0; i < 5 && getEquipment && !!equipment; i++) {
        itemList.push(equipment?.getEquipment(OtherEquipmentSlots[i]));
    }
    return itemList;
}
