import type { Container, ItemStack } from "@minecraft/server";

export function fillContainer(container: Container, item: ItemStack) {
    for (let i = 0; i < container.size; i++) {
        container.setItem(i, item);
    }
}
