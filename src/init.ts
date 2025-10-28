import { system } from "@minecraft/server";

/**
 * The time the early-execution scripts started executing.
 */
export const preStartTime: number = Date.now();

await Promise.all([
    // This must be imported BEFORE exiting early-execution mode.
    import("@minecraft/server-editor").then(
        async (): Promise<void> => {
            Object.defineProperty(globalThis, "isEditorEdition", {
                // TO-DO: Make this value hardcoded into the add-on.
                value: system.isEditorWorld,
                enumerable: true,
                configurable: true,
                writable: false,
            });
            await import("./init/editorExtension/index");
        },
        (): void => {
            Object.defineProperty(globalThis, "isEditorEdition", {
                // TO-DO: Make this value hardcoded into the add-on.
                value: false,
                enumerable: true,
                configurable: true,
                writable: false,
            });
        }
    ),
    // This script must be run in early-execution mode.
    import("preInit/eventSubscriptions/beforeEvents/startup"),
]);

/**
 * The time the early-execution scripts finished executing.
 */
export const preEndTime: number = Date.now();

await system.waitTicks(0);

/**
 * The time the main script started executing.
 */
export const startTime: number = Date.now();

try {
    await import("./index");
} catch (e) {
    console.error(e, e.stack);
}

/**
 * The time the main script finished executing.
 */
export const endTime: number = Date.now();
/**
 * The total time spent running the early-execution scripts.
 */
export const preStartupTime: number = preEndTime - preStartTime;
/**
 * The total time spent running the main script.
 */
export const startupTime: number = endTime - startTime;
/**
 * The total time spent running all scripts.
 */
export const totalStartupTime: number = preStartupTime + startupTime;
/**
 * The delay between finishing the early-execution scripts and starting the main script (while `await system.waitTicks(0)` was running).
 */
export const exitingEarlyExecutionDelay: number = startTime - preEndTime;

console.log(
    `§r<§b8Crafter's Server Utilities§r[§gv${format_version}${
        isEditorEdition ? " §r(§eEditor Edition§r)" : "§r"
    }]> §aTotal Startup time: ${totalStartupTime}ms; Pre-startup time: ${preStartupTime}ms; Startup time: ${startupTime}ms; Exiting early-execution delay: ${exitingEarlyExecutionDelay}ms`
);

//# sourceMappingURL=init.js.map
