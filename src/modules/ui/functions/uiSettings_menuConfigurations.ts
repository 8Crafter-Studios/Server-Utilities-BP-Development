import { Entity, Player } from "@minecraft/server";
import { ActionFormData, ActionFormResponse } from "@minecraft/server-ui";
import { forceShow } from "modules/ui/functions/forceShow";
import { executeCommandPlayerW } from "modules/commands/classes/executeCommandPlayerW";
import { securityVariables } from "security/ultraSecurityModeUtils";
import { showMessage } from "modules/utilities/functions/showMessage";
import { uiSettings_menuConfigurations_playerMenu } from "./uiSettings_menuConfigurations_playerMenu";

export async function uiSettings_menuConfigurations(
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
    form.title("Menu Configurations");
    form.button("Main Menu", "textures/ui/sidebar_icons/menu_threebars");
    form.button("Player Menu", "textures/items/player_menu_1");
    form.button("Back", "textures/ui/arrow_left");
    form.button("Close", "textures/ui/crossout");

    return await forceShow(form, sourceEntity as Player)
        .then(async (ra) => {
            let r = ra as ActionFormResponse;
            if (r.canceled) return 1;

            let response = r.selection;
            switch ((["mainMenu", "playerMenu", "back", "close"] as const)[response]) {/* 
                case "mainMenu":
                    if ((await uiSettings_menuConfigurations_mainMenu(sourceEntity)) == 1) {
                        return await uiSettings_menuConfigurations(sourceEntity);
                    } else {
                        return 0;
                    }
                    break; */
                case "playerMenu":
                    if ((await uiSettings_menuConfigurations_playerMenu(sourceEntity)) == 1) {
                        return await uiSettings_menuConfigurations(sourceEntity);
                    } else {
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
        .catch(async (e) => {
            console.error(e, e.stack);
            return ((await showMessage(sourceEntity, "An Error Occured", `An error occured: ${e}${e?.stack}`, "Back", "Close")).selection !== 1).toNumber();
        });
}
