import { system } from "@minecraft/server";
globalThis.beforeScriptStartTick = system.currentTick;
export const current_format_version = "1.27.0-preview.20+BUILD.1";
globalThis.format_version = current_format_version;
export const current_supported_minecraft_version = "1.21.4x";
globalThis.supported_minecraft_version = current_supported_minecraft_version;
globalThis.entity_scale_format_version = null;
globalThis.multipleEntityScaleVersionsDetected = false;
globalThis.modules = {
    assets: {
        classes: {},
        constants: {},
    },
};
globalThis.subscribedEvents = {};
globalThis.repeatingIntervals = {};
globalThis.tempVariables = {};
globalThis.editorStickMenuOpeningAsyncCancelActionNumbers = {};
globalThis.crashEnabled = false;
globalThis.tempSavedVariables = [];
globalThis.scriptStartTick = -1;
//# sourceMappingURL=initializeMainGlobalVariables.js.map