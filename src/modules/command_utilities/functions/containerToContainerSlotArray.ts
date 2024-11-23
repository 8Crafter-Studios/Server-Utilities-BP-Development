import type { Container, ContainerSlot } from "@minecraft/server";

export function containerToContainerSlotArray(container: Container) {
    let itemList = [] as ContainerSlot[];
    for (let i = 0; i < container.size; i++) {
        itemList.push(container.getSlot(i));
    }
    return itemList;
}
