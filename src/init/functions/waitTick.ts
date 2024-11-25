import { system } from "@minecraft/server";

globalThis.waitTick = async function waitTick(): Promise<void> {
    return new Promise((resolve) => system.run(() => resolve(void null)));
};
