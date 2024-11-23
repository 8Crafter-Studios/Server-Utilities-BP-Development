import type { EntityEquippableComponent, ContainerSlot } from "@minecraft/server";
import { OtherEquipmentSlots } from "modules/command_utilities/constants/OtherEquipmentSlots";
import { EquipmentSlots } from "modules/command_utilities/constants/EquipmentSlots";

export function equippableToContainerSlotArray(
    equippable: EntityEquippableComponent,
    includeMainhand: boolean = false
) {
    let itemList = [] as ContainerSlot[];
    for (let i = 0; i < 5 + Number(includeMainhand); i++) {
        itemList.push(
            equippable?.getEquipmentSlot(
                includeMainhand ? EquipmentSlots[i] : OtherEquipmentSlots[i]
            )
        );
    }
    return itemList;
}
