import type { Block, ItemStack } from "@minecraft/server";

export function blockToItemStackArray(block: Block) {
    let itemList = [] as ItemStack[];
    let container = block.getComponent("inventory")?.container;
    for (let i = 0; i < container.size; i++) {
        itemList.push(container.getItem(i));
    }
    return itemList;
}
