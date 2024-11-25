import type { Player } from "@minecraft/server";
import type { executeCommandPlayerW } from "modules/commands/classes/executeCommandPlayerW";

globalThis.pcsend = function pcsend(
    player: Player | executeCommandPlayerW,
    value: any,
    space?: string | number
) {
    player.sendMessage(JSON.stringify(value, undefined, space));
};
