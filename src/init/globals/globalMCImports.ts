import { system, world } from "@minecraft/server";
import * as mcServer from "@minecraft/server";

Object.defineProperties(globalThis, {
    world: {
        value: world,
        configurable: false,
        enumerable: true,
        writable: false,
    },
    system: {
        value: system,
        configurable: false,
        enumerable: true,
        writable: false,
    },
});

declare global {
    namespace globalThis {
        /**
         * @remarks
         * A class that wraps the state of a world - a set of
         * dimensions and the environment of Minecraft.
         *
         * @see {@link mcServer.world | @minecraft/server.world}
         */
        var world: typeof import("@minecraft/server").world;
        /**
         * @remarks
         * A class that provides system-level events and functions.
         *
         * @see {@link mcServer.system | @minecraft/server.system}
         */
        var system: typeof import("@minecraft/server").system;
    }
}
