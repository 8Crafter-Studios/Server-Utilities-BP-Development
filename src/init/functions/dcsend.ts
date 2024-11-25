import { world } from "@minecraft/server";

globalThis.dcsend = function dcsend(
    value: any,
    space?: string | number,
    options?: Parameters<typeof colorizeJSONString>[1]
) {
    world.sendMessage(
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
