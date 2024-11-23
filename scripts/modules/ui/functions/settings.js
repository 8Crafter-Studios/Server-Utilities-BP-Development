import { Entity, Player, world } from "@minecraft/server";
import { ActionFormData, ActionFormResponse } from "@minecraft/server-ui";
import { forceShow } from "modules/ui/functions/forceShow";
import { advancedSettings } from "./advancedSettings";
import { chatRanksSettings } from "./chatRanksSettings";
import { executeCommandPlayerW } from "modules/commands/classes/executeCommandPlayerW";
import { evalAutoScriptSettings } from "./evalAutoScriptSettings";
import { extraFeaturesSettings } from "./extraFeaturesSettings";
import { globalSettings } from "./globalSettings";
import { homeSystemSettings } from "./homeSystemSettings";
import { manageGameRulesUI } from "./manageGameRulesUI";
import { notificationsSettings } from "./notificationsSettings";
import { personalSettings } from "./personalSettings";
import { scriptSettings } from "./scriptSettings";
import { tpaSettings } from "./tpaSettings";
import { uiSettings } from "./uiSettings";
export async function settings(sourceEntitya) {
    const sourceEntity = sourceEntitya instanceof executeCommandPlayerW
        ? sourceEntitya.player
        : sourceEntitya;
    let form = new ActionFormData();
    let players = world.getPlayers();
    form.title("Settings");
    form.body("Choose menu to open. ");
    form.button("Global Settings", "textures/ui/worldsIcon");
    form.button("Chat Ranks Settings", "textures/ui/message");
    form.button("Script Settings", "textures/ui/debug_glyph_color");
    form.button("UI Settings", "textures/ui/feedIcon");
    form.button("Eval Auto Execute Settings", "textures/ui/automation_glyph_color");
    form.button("Personal Settings", "textures/ui/profile_glyph_color");
    form.button("Notifications Settings", "textures/ui/icon_bell");
    form.button("Home System Settings [§cExperimental§r]", "textures/ui/store_home_icon");
    form.button("TPA System Settings [§cExperimental§r]", "textures/items/ender_pearl");
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
        switch (response) {
            case 0:
                globalSettings(sourceEntity);
                return 0;
                break;
            case 1:
                chatRanksSettings(sourceEntity);
                return 0;
                break;
            case 2:
                scriptSettings(sourceEntity);
                return 0;
                break;
            case 3:
                uiSettings(sourceEntity);
                return 0;
                break;
            case 4:
                evalAutoScriptSettings(sourceEntity);
                return 0;
                break;
            case 5:
                personalSettings(sourceEntity);
                return 0;
                break;
            case 6:
                notificationsSettings(sourceEntity);
                return 0;
                break;
            case 7:
                homeSystemSettings(sourceEntity);
                return 0;
                break;
            case 8:
                tpaSettings(sourceEntity);
                return 0;
                break;
            case 9:
                manageGameRulesUI(sourceEntity);
                return 0;
                break;
            case 10:
                extraFeaturesSettings(sourceEntity);
                return 0;
                break;
            case 11:
                if ((await advancedSettings(sourceEntity)) == 1) {
                    return await settings(sourceEntity);
                }
                else {
                    return 0;
                }
                break;
            case 12:
                return 1;
            case 13:
                return 0;
            default:
                return 1;
        }
    })
        .catch((e) => {
        console.error(e, e.stack);
        return 0;
    });
}
//# sourceMappingURL=settings.js.map