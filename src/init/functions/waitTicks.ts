import { system } from "@minecraft/server";

globalThis.waitTicks = async function waitTicks(
    ticks: number = 1
): Promise<void> {
    return new Promise((resolve) => system.runTimeout(() => resolve(void null), ticks)
    );
};
