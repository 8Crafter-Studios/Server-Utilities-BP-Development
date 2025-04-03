import { world } from "@minecraft/server";

globalThis.gcsend = function gcsend(
    value: any,
    space?: string | number,
    options?: Parameters<typeof colorizeJSONString>[1]
) {
    world.sendMessage(
        colorizeJSONString(
            tryget(()=>JSONB.stringify(Object.defineProperties({}, Object.fromEntries(Object.entries(Object.getOwnPropertyDescriptors(value)).map(d=>[d[0], {...d[1], enumerable: true}]))), undefined, space, {
                bigint: true,
                class: false,
                function: true,
                Infinity: true,
                get: true,
                NaN: true,
                NegativeInfinity: true,
                set: true,
                undefined: true,
            })) ?? JSONB.stringify(value, undefined, space, {
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
