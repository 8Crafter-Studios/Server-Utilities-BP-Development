import type { Entity, Player } from "@minecraft/server";
import { ActionFormData, ActionFormResponse } from "@minecraft/server-ui";
import { forceShow } from "modules/ui/functions/forceShow";
import { executeCommandPlayerW } from "modules/commands/classes/executeCommandPlayerW";
import { addonDebugUI } from "./addonDebugUI";
import { customFormUICodes } from "../constants/customFormUICodes";
import { showMessage } from "modules/utilities/functions/showMessage";

export async function advancedSettings(
    sourceEntitya: Entity | executeCommandPlayerW | Player
): Promise<0 | 1> {
    const sourceEntity = sourceEntitya instanceof executeCommandPlayerW
        ? sourceEntitya.player
        : sourceEntitya as Player;
    let form = new ActionFormData();
    form.title(customFormUICodes.action.titles.formStyles.gridMenu + "Advanced Settings");
    form.button(customFormUICodes.action.buttons.positions.main_only + "Debug", "textures/ui/icon_setting");
    form.button(customFormUICodes.action.buttons.positions.title_bar_only + "Back", "textures/ui/arrow_left");
    form.button(customFormUICodes.action.buttons.positions.title_bar_only + "Close", "textures/ui/crossout");

    return await forceShow(form, sourceEntity as Player)
        .then(async (ra) => {
            let r = ra as ActionFormResponse;
            if (r.canceled) return 1;

            let response = r.selection;
            switch (response) {
                case 0:
                    if ((await addonDebugUI(sourceEntity)) == 1) {
                        return await advancedSettings(sourceEntity);
                    } else {
                        return 0;
                    }
                case 1:
                    return 1;
                case 2:
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
