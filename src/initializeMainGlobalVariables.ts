import { system } from "@minecraft/server";
import "init/functions/breakpoint";

globalThis.beforeScriptStartTick = system.currentTick;
export const current_format_version = "1.28.3-preview.20+BUILD.1";
globalThis.format_version = current_format_version
export const current_supported_minecraft_version = "1.21.5x";
globalThis.supported_minecraft_version = current_supported_minecraft_version
globalThis.entity_scale_format_version = null;
globalThis.multipleEntityScaleVersionsDetected = false;
globalThis.modules={
    assets: {
        classes: {},
        constants: {},
    },
} as any;
globalThis.subscribedEvents = {} as { [eventName: string]: Function };
globalThis.repeatingIntervals = {} as { [intervalName: string]: number };
globalThis.tempVariables = {};
globalThis.editorStickMenuOpeningAsyncCancelActionNumbers = {} as {
    [id: string]: number;
};
globalThis.crashEnabled = false
globalThis.tempSavedVariables = []
globalThis.scriptStartTick=-1
declare global {
    namespace globalThis {
        var tempSavedVariables: any[]
        var crashEnabled: boolean
        var format_version: typeof current_format_version
        var supported_minecraft_version: typeof current_supported_minecraft_version
        var editorStickMenuOpeningAsyncCancelActionNumbers: {
            [id: string]: number;
        }
        var beforeInitializeTick: number;
        var initializeTick: number;
        var beforeScriptStartTick: number;
        var scriptStartTick: number;
        var tempVariables: { [key: PropertyKey]: any };
        var subscribedEvents: { [eventName: string]: Function };
        var repeatingIntervals: {
            worldBorderSystem?: number;
            protectedAreasRefresher?: number;
            bannedPlayersChecker?: number;
            playerDataAutoSave?: number;
            [intervalName: string]: number;
        };
        var entity_scale_format_version: string | null;
        var multipleEntityScaleVersionsDetected: boolean;
    }
}
/* Object.defineProperty(console, "error", {
    value: function error(...args: any[]) {
        world.sendMessage(args.join(" "));
    },
    configurable: true,
    writable: true,
}) */
// Object.defineProperty(console, "error", { value: function error(...args: any[]) { world.getAllPlayers().filter(p=>p.hasTag("getAllConsoleNotifications")||p.hasTag("getConsoleErrors")).forEach(p=>p.sendMessage(args.join(" "))); }, configurable: true, writable: true, });
// JS: Object.defineProperty(console, "error", { value: function error(...args) { world.sendMessage(args.join(" ")); }, configurable: true, writable: true, });
