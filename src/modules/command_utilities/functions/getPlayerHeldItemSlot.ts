import type { ContainerSlot, Player } from "@minecraft/server";
import type { executeCommandPlayerW } from "modules/commands/classes/executeCommandPlayerW";

export function getPlayerHeldItemSlot(player: Player | executeCommandPlayerW): ContainerSlot {
    return player
        .getComponent("inventory")!
        .container.getSlot(player.selectedSlotIndex);
}
