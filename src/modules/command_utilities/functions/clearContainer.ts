import type { Container } from "@minecraft/server";

export function clearContainer(container?: Container): void {
    for (let i = 0; i < (container?.size ?? 0); i++) {
        container!.setItem(i);
    }
}
