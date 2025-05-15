import type { ContainerSlot, Player } from "@minecraft/server";
import type { executeCommandPlayerW } from "modules/commands/classes/executeCommandPlayerW";

export function getPlayerselectedSlotIndex(
    player: Player | executeCommandPlayerW
): ContainerSlot {
    return player
        .getComponent("inventory")!
        .container.getSlot(player.selectedSlotIndex);
}
