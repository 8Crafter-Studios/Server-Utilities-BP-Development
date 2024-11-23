import type { Player } from "@minecraft/server";
import type { executeCommandPlayerW } from "modules/commands/classes/executeCommandPlayerW";

export function getPlayerHeldItemSlot(player: Player | executeCommandPlayerW) {
    return player
        .getComponent("inventory")
        .container.getSlot(player.selectedSlotIndex);
}
