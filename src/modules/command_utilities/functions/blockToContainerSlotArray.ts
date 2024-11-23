import type { Block, ContainerSlot } from "@minecraft/server";

export function blockToContainerSlotArray(block: Block) {
    let itemList = [] as ContainerSlot[];
    let container = block.getComponent("inventory")?.container;
    for (let i = 0; i < (container?.size ?? 0); i++) {
        itemList.push(container.getSlot(i));
    }
    return !!container ? itemList : undefined;
}
