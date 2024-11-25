import type { Player } from "@minecraft/server";
import type { executeCommandPlayerW } from "modules/commands/classes/executeCommandPlayerW";

globalThis.psend = function psend(
    player: Player | executeCommandPlayerW,
    value: string
) {
    player.sendMessage(value);
};
