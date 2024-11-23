import type { Container } from "@minecraft/server";

export function clearContainer(container: Container) {
    for (let i = 0; i < container.size; i++) {
        container.setItem(i);
    }
}
