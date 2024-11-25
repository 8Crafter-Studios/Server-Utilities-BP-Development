import type { Player } from "@minecraft/server";
import type { executeCommandPlayerW } from "modules/commands/classes/executeCommandPlayerW";

globalThis.pbsend = function pbsend(
    player: Player | executeCommandPlayerW,
    value: any,
    space?: string | number
) {
    player.sendMessage(JSONStringify(value, true, space));
};
