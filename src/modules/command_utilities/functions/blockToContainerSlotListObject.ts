import type { Block, ContainerSlot } from "@minecraft/server";

export function blockToContainerSlotListObject(block: Block) {
    let itemList = {} as Record<string, ContainerSlot>;
    let container = block.getComponent("inventory")?.container;
    for (let i = 0; i < (container?.size ?? 0); i++) {
        itemList[String(i)] = container.getSlot(i);
    }
    return !!container ? itemList : undefined;
}
