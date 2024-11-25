import type { Player } from "@minecraft/server";
import type { executeCommandPlayerW } from "modules/commands/classes/executeCommandPlayerW";

globalThis.pbcsend = function pbcsend(
    player: Player | executeCommandPlayerW,
    value: any,
    space?: string | number,
    options?: Parameters<typeof colorizeJSONString>[1]
) {
    player.sendMessage(
        colorizeJSONString(JSONStringify(value, true, space), options)
    );
};
