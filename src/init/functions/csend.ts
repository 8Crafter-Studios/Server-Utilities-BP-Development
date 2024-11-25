import { world } from "@minecraft/server";

globalThis.csend = function csend(value: any, space?: string | number) {
    world.sendMessage(JSON.stringify(value, undefined, space));
};
