import { world } from "@minecraft/server";

globalThis.asend = function asend(value: any) {
    world.sendMessage(String(value));
};
