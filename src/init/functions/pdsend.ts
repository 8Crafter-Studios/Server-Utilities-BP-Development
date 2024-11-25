import type { Player } from "@minecraft/server";
import type { executeCommandPlayerW } from "modules/commands/classes/executeCommandPlayerW";

globalThis.pdsend = function pdsend(
    player: Player | executeCommandPlayerW,
    value: any,
    space?: string | number
) {
    player.sendMessage(
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
        })
    );
};
