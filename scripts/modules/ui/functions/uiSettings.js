import { Entity, Player, world } from "@minecraft/server";
import { ActionFormData, ActionFormResponse } from "@minecraft/server-ui";
import { forceShow } from "modules/ui/functions/forceShow";
import { executeCommandPlayerW } from "modules/commands/classes/executeCommandPlayerW";
import { uiSettings_main } from "./uiSettings_main";
import { securityVariables } from "security/ultraSecurityModeUtils";
import { showMessage } from "modules/utilities/functions/showMessage";
import { uiSettings_menuConfigurations } from "./uiSettings_menuConfigurations";
import { customFormUICodes } from "../constants/customFormUICodes";
export async function uiSettings(sourceEntitya) {
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
    form.title(customFormUICodes.action.titles.formStyles.gridMenu + "UI Settings");
    form.button(customFormUICodes.action.buttons.positions.main_only + "Main", "textures/ui/debug_glyph_color");
    form.button(customFormUICodes.action.buttons.positions.main_only + "Menu Configurations", "textures/ui/automation_glyph_color");
    form.button(customFormUICodes.action.buttons.positions.main_only + "Advanced", "textures/ui/creator_glyph_color");
    form.button(customFormUICodes.action.buttons.positions.title_bar_only + "Back", "textures/ui/arrow_left");
    form.button(customFormUICodes.action.buttons.positions.title_bar_only + "Close", "textures/ui/crossout");
    return await forceShow(form, sourceEntity)
        .then(async (ra) => {
        let r = ra;
        if (r.canceled)
            return 1;
        let response = r.selection;
        switch (["main", "menuConfigurations", "advanced", "back", "close"][response]) {
            case "main":
                if ((await uiSettings_main(sourceEntity)) == 1) {
                    return await uiSettings(sourceEntity);
                }
                else {
                    return 0;
                }
            case "menuConfigurations":
                if ((await uiSettings_menuConfigurations(sourceEntity)) == 1) {
                    return await uiSettings(sourceEntity);
                }
                else {
                    return 0;
                } /*
        case "advanced":
            if ((await uiSettings_advanced(sourceEntity)) == 1) {
                return await uiSettings(sourceEntity);
            } else {
                return 0;
            } */
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
//# sourceMappingURL=uiSettings.js.map