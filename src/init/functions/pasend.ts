import type { Player } from "@minecraft/server";
import type { executeCommandPlayerW } from "modules/commands/classes/executeCommandPlayerW";

globalThis.pasend = function pasend(
    player: Player | executeCommandPlayerW,
    value: any
) {
    player.sendMessage(String(value));
};
