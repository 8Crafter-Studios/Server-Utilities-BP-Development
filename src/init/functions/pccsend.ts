import type { Player } from "@minecraft/server";
import type { executeCommandPlayerW } from "modules/commands/classes/executeCommandPlayerW";

globalThis.pccsend = function pccsend(
    player: Player | executeCommandPlayerW,
    value: any,
    space?: string | number,
    options?: Parameters<typeof colorizeJSONString>[1]
) {
    player.sendMessage(
        colorizeJSONString(JSON.stringify(value, undefined, space), options)
    );
};
