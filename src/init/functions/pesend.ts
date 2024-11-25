import type { Player } from "@minecraft/server";
import type { executeCommandPlayerW } from "modules/commands/classes/executeCommandPlayerW";

globalThis.pesend = function pesend(
    player: Player | executeCommandPlayerW,
    value: any,
    space?: string | number
) {
    player.sendMessage(
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
        })
    );
};
