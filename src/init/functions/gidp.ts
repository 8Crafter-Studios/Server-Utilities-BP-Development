import type { ItemStack, ContainerSlot } from "@minecraft/server";

export function gidp(item: ItemStack | ContainerSlot, propertyId: string) {
    return item.getDynamicProperty(propertyId);
}
