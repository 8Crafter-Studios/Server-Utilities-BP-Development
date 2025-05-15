import type { Block, ItemStack } from "@minecraft/server";

export function blockToItemStackArray(block: Block): (ItemStack | undefined)[] {
    let itemList = [] as (ItemStack | undefined)[];
    let container = block.getComponent("inventory")?.container;
    for (let i = 0; i < (container!?.size ?? 0); i++) {
        itemList.push(container?.getItem(i));
    }
    return itemList;
}
