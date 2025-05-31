import type { Player, RawMessage } from "@minecraft/server";
import type { executeCommandPlayerW } from "modules/commands/classes/executeCommandPlayerW";

globalThis.psend = function psend(
    player: Player | executeCommandPlayerW,
    value: string | RawMessage | (string | RawMessage)[]
) {
    player.sendMessage(value);
};
