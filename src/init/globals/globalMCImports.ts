import { system, world } from "@minecraft/server";

Object.defineProperties(globalThis, {
    world: {
        value: world,
        configurable: true,
        enumerable: true,
        writable: false,
    },
    system: {
        value: system,
        configurable: true,
        enumerable: true,
        writable: false,
    }
});

declare global {
    namespace globalThis {
        var world: typeof import("@minecraft/server").world;
        var system: typeof import("@minecraft/server").system;
    }
}