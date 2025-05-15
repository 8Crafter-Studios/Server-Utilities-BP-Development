import type { Container, ItemStack } from "@minecraft/server";

export function containerToItemStackArray(container: Container): (ItemStack | undefined)[] {
    let itemList = [] as (ItemStack | undefined)[];
    for (let i = 0; i < container.size; i++) {
        itemList.push(container.getItem(i));
    }
    return itemList;
}
