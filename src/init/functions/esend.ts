import { world } from "@minecraft/server";

globalThis.esend = function esend(value: any, space?: string | number) {
    world.sendMessage(
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
