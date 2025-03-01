import { Entity, Player } from "@minecraft/server";
import { ActionFormData, ActionFormResponse } from "@minecraft/server-ui";
import { forceShow } from "modules/ui/functions/forceShow";
import { executeCommandPlayerW } from "modules/commands/classes/executeCommandPlayerW";
import { securityVariables } from "security/ultraSecurityModeUtils";
import { showMessage } from "modules/utilities/functions/showMessage";
import { uiSettings_menuConfigurations_playerMenu_mainSettings } from "./uiSettings_menuConfigurations_playerMenu_mainSettings";
import { uiSettings_menuConfigurations_playerMenu_editButtons } from "./uiSettings_menuConfigurations_playerMenu_editButtons";
import { manageWarps } from "./manageWarps";
import { manageRedeemableCodes } from "./manageRedeemableCodes";
import { uiSettings_menuConfigurations_playerMenu_leaderboardsSettings } from "./uiSettings_menuConfigurations_playerMenu_leaderboardsSettings";
import { customFormUICodes } from "../constants/customFormUICodes";
export async function uiSettings_menuConfigurations_playerMenu(sourceEntitya) {
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
    form.title(customFormUICodes.action.titles.formStyles.gridMenu + "Player Menu Settings");
    form.button(customFormUICodes.action.buttons.positions.main_only + "Main Settings", "textures/ui/settings_glyph_color_2x");
    form.button(customFormUICodes.action.buttons.positions.main_only + "Edit Buttons", "textures/ui/pencil_edit_icon");
    form.button(customFormUICodes.action.buttons.positions.main_only + "Leaderboards Settings", "textures/ui/icon_best3");
    form.button(customFormUICodes.action.buttons.positions.main_only + "Edit Warps", "textures/items/ender_pearl");
    form.button(customFormUICodes.action.buttons.positions.main_only + "Edit Redeemable Codes", "textures/ui/icon_blackfriday");
    form.button(customFormUICodes.action.buttons.positions.title_bar_only + "Back", "textures/ui/arrow_left");
    form.button(customFormUICodes.action.buttons.positions.title_bar_only + "Close", "textures/ui/crossout");
    return await forceShow(form, sourceEntity)
        .then(async (ra) => {
        let r = ra;
        if (r.canceled)
            return 1;
        let response = r.selection;
        switch (["mainSettings", "editButtons", "leaderboardsSettings", "editWarps", "editRedeemableCodes", "back", "close"][response]) {
            case "mainSettings":
                if ((await uiSettings_menuConfigurations_playerMenu_mainSettings(sourceEntity)) == 1) {
                    return await uiSettings_menuConfigurations_playerMenu(sourceEntity);
                }
                else {
                    return 0;
                }
            case "editButtons":
                if ((await uiSettings_menuConfigurations_playerMenu_editButtons(sourceEntity)) == 1) {
                    return await uiSettings_menuConfigurations_playerMenu(sourceEntity);
                }
                else {
                    return 0;
                }
            case "leaderboardsSettings":
                if ((await uiSettings_menuConfigurations_playerMenu_leaderboardsSettings(sourceEntity)) == 1) {
                    return await uiSettings_menuConfigurations_playerMenu(sourceEntity);
                }
                else {
                    return 0;
                }
            case "editWarps":
                if ((await manageWarps(sourceEntity)) == 1) {
                    return await uiSettings_menuConfigurations_playerMenu(sourceEntity);
                }
                else {
                    return 0;
                }
            case "editRedeemableCodes":
                if ((await manageRedeemableCodes(sourceEntity)) == 1) {
                    return await uiSettings_menuConfigurations_playerMenu(sourceEntity);
                }
                else {
                    return 0;
                }
            case "back":
                return 1;
            case "close":
                return 0;
            default:
                return 1;
        }
    })
        .catch(async (e) => {
        console.error(e, e.stack);
        return ((await showMessage(sourceEntity, "An Error occurred", `An error occurred: ${e}${e?.stack}`, "Back", "Close")).selection !== 1).toNumber();
    });
}
//# sourceMappingURL=uiSettings_menuConfigurations_playerMenu.js.map