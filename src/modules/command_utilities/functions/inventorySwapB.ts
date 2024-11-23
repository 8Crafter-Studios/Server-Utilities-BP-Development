import type { Container } from "@minecraft/server";

export function inventorySwapB(player1: Container, player2: Container) {
    for (let i = 0; i < 36; i++) {
        player1.swapItems(i, i, player2);
    }
}
