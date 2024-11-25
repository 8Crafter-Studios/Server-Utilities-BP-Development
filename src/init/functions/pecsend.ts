import type { Player } from "@minecraft/server";
import type { executeCommandPlayerW } from "modules/commands/classes/executeCommandPlayerW";

globalThis.pecsend = function pecsend(
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
                function: false,
                Infinity: true,
                get: false,
                NaN: true,
                NegativeInfinity: true,
                set: false,
                undefined: true,
            }),
            options
        )
    );
};
