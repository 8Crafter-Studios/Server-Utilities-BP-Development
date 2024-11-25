import { world } from "@minecraft/server";

globalThis.fcsend = function fcsend(
    value: any,
    space?: string | number,
    options?: Parameters<typeof colorizeJSONString>[1]
) {
    world.sendMessage(
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
                undefined: false,
            }),
            options
        )
    );
};
