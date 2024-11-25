import { type RawMessage, world } from "@minecraft/server";

globalThis.send = function send(
    message: (RawMessage | string)[] | RawMessage | string
) {
    world.sendMessage(message);
};
