import type { EntityEquippableComponent, ItemStack } from "@minecraft/server";
import { OtherEquipmentSlots } from "modules/command_utilities/constants/OtherEquipmentSlots";
import { EquipmentSlots } from "modules/command_utilities/constants/EquipmentSlots";

export function equippableToItemStackArray(
    equippable: EntityEquippableComponent,
    includeMainhand: boolean = false
): (ItemStack | undefined)[] {
    let itemList = [] as (ItemStack | undefined)[];
    for (let i = 0; i < 5 + Number(includeMainhand); i++) {
        itemList.push(
            equippable.getEquipment(
                includeMainhand ? EquipmentSlots[i] : OtherEquipmentSlots[i]
            )
        );
    }
    return itemList;
}
