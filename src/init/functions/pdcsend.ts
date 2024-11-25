import type { Player } from "@minecraft/server";
import type { executeCommandPlayerW } from "modules/commands/classes/executeCommandPlayerW";

globalThis.pdcsend = function pdcsend(
    player: Player | executeCommandPlayerW,
    value: any,
    space?: string | number,
    options?: Parameters<typeof colorizeJSONString>[1]
) {
    player.sendMessage(
        colorizeJSONString(
            JSONB.stringify(value, undefined, space, {
                bigint: true,
                class: false,
                function: true,
                Infinity: true,
                get: true,
                NaN: true,
                NegativeInfinity: true,
                set: true,
                undefined: true,
            }),
            options
        )
    );
};
