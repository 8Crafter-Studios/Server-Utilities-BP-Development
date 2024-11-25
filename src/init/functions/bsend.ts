import { world } from "@minecraft/server";

globalThis.bsend = function bsend(value: any, space?: string | number) {
    world.sendMessage(JSONStringify(value, true, space));
};
