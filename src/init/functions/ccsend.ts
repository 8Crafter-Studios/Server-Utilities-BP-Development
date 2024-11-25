import { world } from "@minecraft/server";

globalThis.ccsend = function ccsend(
    value: any,
    space?: string | number,
    options?: Parameters<typeof colorizeJSONString>[1]
) {
    world.sendMessage(
        colorizeJSONString(JSON.stringify(value, undefined, space), options)
    );
};
