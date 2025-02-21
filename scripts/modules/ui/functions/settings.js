import { Entity, Player, world } from "@minecraft/server";
import { ActionFormData, ActionFormResponse } from "@minecraft/server-ui";
import { forceShow } from "modules/ui/functions/forceShow";
import { advancedSettings } from "./advancedSettings";
import { chatRanksSettings } from "./chatRanksSettings";
import { executeCommandPlayerW } from "modules/commands/classes/executeCommandPlayerW";
import { evalAutoScriptSettings } from "./evalAutoScriptSettings";
import { extraFeaturesSettings } from "./extraFeaturesSettings";
import { generalSettings } from "./generalSettings";
import { homeSystemSettings } from "./homeSystemSettings";
import { manageGameRulesUI } from "./manageGameRulesUI";
import { notificationsSettings } from "./notificationsSettings";
import { personalSettings } from "./personalSettings";
import { scriptSettings } from "./scriptSettings";
import { tpaSettings } from "./tpaSettings";
import { uiSettings } from "./uiSettings";
import { editModuleImportsConfig } from "./editModuleImportsConfig";
import { securityVariables } from "security/ultraSecurityModeUtils";
import { showMessage } from "modules/utilities/functions/showMessage";
import { moneySystemSettings } from "./moneySystemSettings";
import { uiSettings_menuConfigurations_playerMenu } from "./uiSettings_menuConfigurations_playerMenu";
import { teleportSystemsSettings } from "./teleportSystemsSettings";
export async function settings(sourceEntitya) {
    const sourceEntity = sourceEntitya instanceof executeCommandPlayerW
        ? sourceEntitya.player
        : sourceEntitya;
    if (securityVariables.ultraSecurityModeEnabled) {
        if (securityVariables.testPlayerForPermission(sourceEntity, "andexdb.accessSettings") == false) {
            const r = await showMessage(sourceEntity, "Access Denied (403)", "You do not have permission to access this menu. You need the following permission to access this menu: andexdb.accessSettings", "Back", "Cancel");
            if (r.canceled || r.selection == 0) {
                return 1;
            }
            else {
                return 0;
            }
        }
    }
    let form = new ActionFormData();
    let players = world.getPlayers();
    form.title("Settings");
    form.body("Choose menu to open. ");
    form.button("General Settings", "textures/ui/worldsIcon");
    form.button("Chat Ranks Settings", "textures/ui/message");
    form.button("Script Settings", "textures/ui/debug_glyph_color");
    form.button("UI Settings", "textures/ui/feedIcon");
    form.button("Eval Auto Execute Settings", "textures/ui/automation_glyph_color");
    form.button("Personal Settings", "textures/ui/profile_glyph_color");
    form.button("Notifications Settings", "textures/ui/icon_bell");
    form.button("Teleport Systems Settings", "textures/gui/newgui/mob_effects\\invisibility_effect");
    form.button("Home System Settings", "textures/ui/store_home_icon");
    form.button("TPA System Settings", "textures/items/ender_pearl");
    form.button("Money System Settings", "textures/items/emerald");
    form.button("Player Menu Settings", "textures/items/player_menu_1");
    form.button("Module Imports", "textures/ui/import");
    form.button("Manage Game Rules", "textures/ui/controller_glyph_color");
    form.button("Extra Features", "textures/ui/color_plus");
    form.button("Advanced", "textures/ui/creator_glyph_color");
    form.button("Back", "textures/ui/arrow_left");
    form.button("Close", "textures/ui/crossout"); /*
form.button("Debug Screen", "textures/ui/ui_debug_glyph_color");*/
    return await forceShow(form, sourceEntity)
        .then(async (ra) => {
        let r = ra;
        // This will stop the code when the player closes the form
        if (r.canceled)
            return 1;
        let response = r.selection;
        switch ([
            "generalSettings",
            "chatRanksSettings",
            "scriptSettings",
            "UISettings",
            "evalAutoExecuteSettings",
            "personalSettings",
            "notificationsSettings",
            "teleportSystemsSettings",
            "homeSystemSettings",
            "TPASystemSettings",
            "moneySystemSettings",
            "playerMenuSettings",
            "moduleImports",
            "manageGameRules",
            "extraFeatures",
            "advanced",
            "back",
            "close",
        ][response]) {
            case "generalSettings":
                if ((await generalSettings(sourceEntity)) == 1) {
                    return await settings(sourceEntity);
                }
                else {
                    return 0;
                }
                break;
            case "chatRanksSettings":
                if ((await chatRanksSettings(sourceEntity)) == 1) {
                    return await settings(sourceEntity);
                }
                else {
                    return 0;
                }
                break;
            case "scriptSettings":
                if ((await scriptSettings(sourceEntity)) == 1) {
                    return await settings(sourceEntity);
                }
                else {
                    return 0;
                }
                break;
            case "UISettings":
                if ((await uiSettings(sourceEntity)) == 1) {
                    return await settings(sourceEntity);
                }
                else {
                    return 0;
                }
                break;
            case "evalAutoExecuteSettings":
                if ((await evalAutoScriptSettings(sourceEntity)) == 1) {
                    return await settings(sourceEntity);
                }
                else {
                    return 0;
                }
                break;
            case "personalSettings":
                if ((await personalSettings(sourceEntity)) == 1) {
                    return await settings(sourceEntity);
                }
                else {
                    return 0;
                }
                break;
            case "notificationsSettings":
                if ((await notificationsSettings(sourceEntity)) == 1) {
                    return await settings(sourceEntity);
                }
                else {
                    return 0;
                }
                break;
            case "teleportSystemsSettings":
                if ((await teleportSystemsSettings(sourceEntity)) == 1) {
                    return await settings(sourceEntity);
                }
                else {
                    return 0;
                }
                break;
            case "homeSystemSettings":
                if ((await homeSystemSettings(sourceEntity)) == 1) {
                    return await settings(sourceEntity);
                }
                else {
                    return 0;
                }
                break;
            case "TPASystemSettings":
                if ((await tpaSettings(sourceEntity)) == 1) {
                    return await settings(sourceEntity);
                }
                else {
                    return 0;
                }
                break;
            case "moneySystemSettings":
                if ((await moneySystemSettings(sourceEntity)) == 1) {
                    return await settings(sourceEntity);
                }
                else {
                    return 0;
                }
                break;
            case "playerMenuSettings":
                if ((await uiSettings_menuConfigurations_playerMenu(sourceEntity)) == 1) {
                    return await settings(sourceEntity);
                }
                else {
                    return 0;
                }
                break;
            case "moduleImports":
                if ((await editModuleImportsConfig(sourceEntity)) == 1) {
                    return await settings(sourceEntity);
                }
                else {
                    return 0;
                }
                break;
            case "manageGameRules":
                if ((await manageGameRulesUI(sourceEntity)) == 1) {
                    return await settings(sourceEntity);
                }
                else {
                    return 0;
                }
                break;
            case "extraFeatures":
                if ((await extraFeaturesSettings(sourceEntity)) == 1) {
                    return await settings(sourceEntity);
                }
                else {
                    return 0;
                }
                break;
            case "advanced":
                if ((await advancedSettings(sourceEntity)) == 1) {
                    return await settings(sourceEntity);
                }
                else {
                    return 0;
                }
                break;
            case "back":
                return 1;
            case "close":
                return 0;
            default:
                return 1;
        }
    })
        .catch((e) => {
        console.error(e, e.stack);
        return -2;
    });
}
//# sourceMappingURL=settings.js.map