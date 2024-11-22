import type { Entity, Player, StructureSaveMode } from "@minecraft/server";
import { ModalFormData, ModalFormResponse } from "@minecraft/server-ui";
import { config } from "Main";
import { forceShow } from "modules/ui/functions/forceShow";
import { executeCommandPlayerW } from "modules/commands/classes/executeCommandPlayerW";
import { settings } from "./settings";

export function scriptSettings(
    sourceEntitya: Entity | executeCommandPlayerW | Player
) {
    const sourceEntity = sourceEntitya instanceof executeCommandPlayerW
        ? sourceEntitya.player
        : sourceEntitya;
    let form2 = new ModalFormData();
    form2.title("Script Settings");
    form2.textField(
        "§l§fplayerDataRefreshRate§r\nThe interval at which to update the saved playerdata of all online players, decreasing this number may increase lag, the default is 20",
        "integer from 1-1000",
        String(config.system.playerDataRefreshRate)
    );
    form2.textField(
        "§l§fprotectedAreasRefreshRate§r\nThe interval at which to update list the saved protected areas, decreasing this number may increase lag, the default is 200",
        "integer from 1-1000000",
        String(config.system.protectedAreasRefreshRate)
    );
    form2.textField(
        "§l§fbannedPlayersRefreshRate§r\nThe interval at which to check for banned players, decreasing this number may increase lag, the default is 20",
        "integer from 1-1000000",
        String(config.system.bannedPlayersRefreshRate)
    );
    form2.dropdown(
        "§l§fundoClipboardMode§r\nWhether to save undo history in memory or to the world files, memory will cause undo history to be cleared upon restarting the world/realm/server, the default is Memory",
        ["Memory", "World"],
        ["Memory", "World"].indexOf(String(config.undoClipboardMode))
    );
    form2.toggle(
        "§l§fshowEntityScaleNotFoundConsoleLog§r\nWhether or not to log to the console when the add-on fails to find a compatible version of entity scale active on startup, the default is true",
        config.system.showEntityScaleNotFoundConsoleLog
    );
    form2.toggle(
        "§l§fshowEntityScaleFoundConsoleLog§r\nWhether or not to log to the console when the add-on sucessfully finds a compatible version of entity scale active on startup, the default is true",
        config.system.showEntityScaleFoundConsoleLog
    );
    form2.toggle(
        "§l§fshowEntityScaleNotFoundChatLog§r\nWhether or not to log to the chat when the add-on fails to find a compatible version of entity scale active on startup, the default is false",
        config.system.showEntityScaleNotFoundChatLog
    );
    form2.toggle(
        "§l§fshowEntityScaleFoundChatLog§r\nWhether or not to log to the chat when the add-on sucessfully finds a compatible version of entity scale active on startup, the default is false",
        config.system.showEntityScaleFoundChatLog
    );
    form2.toggle(
        "§l§fdebugMode§r\nWhether debug mode is enabled or not, the default is false",
        config.system.debugMode
    );
    if (config.system.debugMode) {
        form2.textField(
            "§l§cartificialLagMS§r§c\nThe number of milliseconds of artificial lag to cause each tick. §eWARNING!: THIS IS VERY DANGEROUS AND COULD RESULT IN YOUR WORLD BEING SOFT-LOCKED IF SET TO AN EXTREMELY HIGH VALUE, BECAUSE OF THIS, THIS INPUT WILL ONLY ALLOW VALUES UP TO 10000 MILLISECONDS, TO SET IT HIGHER YOU MUST USE THE SCRIPT EVAL TO SET THE §bconfig.system.artificialLagMS§e PROPERTY TO THE DESIRED VALUE",
            "int",
            String(config.system.artificialLagMS)
        );
        form2.toggle(
            "§l§callowWatchdogTerminationCrash§r§c\nWhether or not to allow script spikes and error to crash this world/realm/server. §eWARNING!: THIS IS VERY DANGEROUS AND MAY RESULT IN YOUR WORLD/REALM/SERVER CRASHING A LOT!§r\nThe default is false",
            config.system.allowWatchdogTerminationCrash
        );
        form2.toggle(
            "§l§chideWatchdogTerminationCrashEnabledWarningsOnStartup§r§c\nWhether or not to hide the warning that appears on startup when allowWatchdogTerminationCrash is enabled. §eWARNING!: ENABLING THIS IS HIGHLY DISCOURAGED!§r\nThe default is false",
            config.system.hideWatchdogTerminationCrashEnabledWarningsOnStartup
        );
        form2.toggle(
            "§l§fspreadPlayerInventoryDataSavesOverMultipleTicks§r\nWhether or not to spread player inventory data saving over multiple ticks to reduce lag, this only applies when §bGlobal Settings>useLegacyPlayerInventoryDataSaveSystem§r is disabled, the default is true",
            config.system.spreadPlayerInventoryDataSavesOverMultipleTicks
        );
    }
    form2.submitButton("Save");
    forceShow(form2, sourceEntity as Player)
        .then((to) => {
            let t = to as ModalFormResponse;
            if (t.canceled) {
                settings(sourceEntity);
                return;
            } /*
    GameTest.Test.prototype.spawnSimulatedPlayer({x: 0, y: 0, z: 0})*/ /*
        ${se}GameTest.Test.prototype.spawnSimulatedPlayer({x: 0, y: 0, z: 0})*/



            let [
                playerDataRefreshRate, protectedAreasRefreshRate, bannedPlayersRefreshRate, undoClipboardMode, showEntityScaleNotFoundConsoleLog, showEntityScaleFoundConsoleLog, showEntityScaleNotFoundChatLog, showEntityScaleFoundChatLog, debugMode, artificialLagMS, allowWatchdogTerminationCrash, hideWatchdogTerminationCrashEnabledWarningsOnStartup, spreadPlayerInventoryDataSavesOverMultipleTicks,
            ] = t.formValues as [
                playerDataRefreshRate: string,
                protectedAreasRefreshRate: string,
                bannedPlayersRefreshRate: string,
                undoClipboardMode: 0 | 1,
                showEntityScaleNotFoundConsoleLog: boolean,
                showEntityScaleFoundConsoleLog: boolean,
                showEntityScaleNotFoundChatLog: boolean,
                showEntityScaleFoundChatLog: boolean,
                debugMode: boolean,
                artificialLagMS: string,
                allowWatchdogTerminationCrash: boolean,
                hideWatchdogTerminationCrashEnabledWarningsOnStartup: boolean,
                spreadPlayerInventoryDataSavesOverMultipleTicks: boolean
            ];
            config.system.playerDataRefreshRate =
                playerDataRefreshRate.toNumber();
            config.system.protectedAreasRefreshRate =
                protectedAreasRefreshRate.toNumber();
            config.system.bannedPlayersRefreshRate =
                bannedPlayersRefreshRate.toNumber();
            config.undoClipboardMode = (["Memory", "World"][undoClipboardMode] ?? "Memory") as StructureSaveMode;
            if (config.system.debugMode &&
                !(config.system.artificialLagMS == artificialLagMS.toNumber())) {
                config.system.artificialLagMS = Math.min(
                    artificialLagMS.toNumber(),
                    10000
                );
                config.system.allowWatchdogTerminationCrash =
                    allowWatchdogTerminationCrash;
                config.system.hideWatchdogTerminationCrashEnabledWarningsOnStartup =
                    hideWatchdogTerminationCrashEnabledWarningsOnStartup;
                config.system.spreadPlayerInventoryDataSavesOverMultipleTicks =
                    spreadPlayerInventoryDataSavesOverMultipleTicks;
            }
            config.system.debugMode = debugMode;
            config.system.showEntityScaleNotFoundConsoleLog =
                showEntityScaleNotFoundConsoleLog;
            config.system.showEntityScaleFoundConsoleLog =
                showEntityScaleFoundConsoleLog;
            config.system.showEntityScaleNotFoundChatLog =
                showEntityScaleNotFoundChatLog;
            config.system.showEntityScaleFoundChatLog =
                showEntityScaleFoundChatLog;
            settings(sourceEntity);
        })
        .catch((e) => {
            console.error(e, e.stack);
        });
}
