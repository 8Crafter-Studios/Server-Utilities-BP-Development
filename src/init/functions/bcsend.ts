import { world } from "@minecraft/server";

globalThis.bcsend = function bcsend(
    value: any,
    space?: string | number,
    options?: Parameters<typeof colorizeJSONString>[1]
) {
    world.sendMessage(
        colorizeJSONString(JSONStringify(value, true, space), options)
    );
};
