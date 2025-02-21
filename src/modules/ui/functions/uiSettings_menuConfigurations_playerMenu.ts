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

export async function uiSettings_menuConfigurations_playerMenu(
    sourceEntitya: Entity | executeCommandPlayerW | Player
): Promise<0 | 1> {
    const sourceEntity =
        sourceEntitya instanceof executeCommandPlayerW
            ? sourceEntitya.player
        : sourceEntitya as Player;
    if (securityVariables.ultraSecurityModeEnabled) {
        if(securityVariables.testPlayerForPermission(sourceEntity as Player, "andexdb.accessSettings") == false){
            const r = await showMessage(sourceEntity as Player, "Access Denied (403)", "You do not have permission to access this menu. You need the following permission to access this menu: andexdb.accessSettings", "Back", "Cancel");
            if(r.canceled || r.selection == 0){
                return 1;
            }else{
                return 0;
            }
        }
    }
    let form = new ActionFormData();
    form.title("Player Menu Settings");
    form.button("Main Settings", "textures/ui/settings_glyph_color_2x");
    form.button("Edit Buttons", "textures/ui/pencil_edit_icon");
    form.button("Leaderboards Settings", "textures/ui/icon_best3");
    form.button("Edit Warps", "textures/items/ender_pearl");
    form.button("Edit Redeemable Codes", "textures/ui/icon_blackfriday");
    form.button("Back", "textures/ui/arrow_left");
    form.button("Close", "textures/ui/crossout");

    return await forceShow(form, sourceEntity as Player)
        .then(async (ra) => {
            let r = ra as ActionFormResponse;
            if (r.canceled) return 1;

            let response = r.selection;
            switch ((["mainSettings", "editButtons", "leaderboardsSettings", "editWarps", "editRedeemableCodes", "back", "close"] as const)[response]) {
                case "mainSettings":
                    if ((await uiSettings_menuConfigurations_playerMenu_mainSettings(sourceEntity)) == 1) {
                        return await uiSettings_menuConfigurations_playerMenu(sourceEntity);
                    } else {
                        return 0;
                    }
                case "editButtons":
                    if ((await uiSettings_menuConfigurations_playerMenu_editButtons(sourceEntity)) == 1) {
                        return await uiSettings_menuConfigurations_playerMenu(sourceEntity);
                    } else {
                        return 0;
                    }
                case "leaderboardsSettings":
                    if ((await uiSettings_menuConfigurations_playerMenu_leaderboardsSettings(sourceEntity)) == 1) {
                        return await uiSettings_menuConfigurations_playerMenu(sourceEntity);
                    } else {
                        return 0;
                    }
                case "editWarps":
                    if ((await manageWarps(sourceEntity)) == 1) {
                        return await uiSettings_menuConfigurations_playerMenu(sourceEntity);
                    } else {
                        return 0;
                    }
                case "editRedeemableCodes":
                    if ((await manageRedeemableCodes(sourceEntity)) == 1) {
                        return await uiSettings_menuConfigurations_playerMenu(sourceEntity);
                    } else {
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
            return ((await showMessage(sourceEntity, "An Error Occured", `An error occured: ${e}${e?.stack}`, "Back", "Close")).selection !== 1).toNumber();
        });
}
