import { Entity, Player, world } from "@minecraft/server";
import { ActionFormData, ActionFormResponse } from "@minecraft/server-ui";
import { forceShow } from "modules/ui/functions/forceShow";
import { antispamSettings } from "./antispamSettings";
import { executeCommandPlayerW } from "../../../Main/commands";
import { manageBans } from "./manageBans";
import { mainMenu } from "./mainMenu";

export function moderationSettings(
    sourceEntitya: Entity | executeCommandPlayerW | Player
) {
    const sourceEntity = sourceEntitya instanceof executeCommandPlayerW
        ? sourceEntitya.player
        : sourceEntitya;
    let form = new ActionFormData();
    let players = world.getPlayers();
    form.title("Moderation");
    form.body("Choose menu to open. ");
    form.button(
        "§4Banned Items§f(§cComing Soon!§f)",
        "textures/ui/icon_blackfriday"
    );
    form.button("Manage Bans", "textures/ui/friend_glyph_desaturated");
    form.button("Anti-Spam", "textures/ui/mute_on");
    form.button(
        "§4Anti-Cheat§f(§cComing Soon!§f)",
        "textures/ui/friend_glyph_desaturated"
    );
    form.button("Back", "textures/ui/arrow_left"); /*
form.button("Debug Screen", "textures/ui/ui_debug_glyph_color");*/

    forceShow(form, sourceEntity as Player)
        .then((ra) => {
            let r = ra as ActionFormResponse;
            // This will stop the code when the player closes the form
            if (r.canceled) return;

            let response = r.selection;
            switch (response) {
                case 0:
                    //manageBannedItems(sourceEntity)
                    break;

                case 1:
                    manageBans(sourceEntity, moderationSettings);
                    break;

                case 2:
                    antispamSettings(sourceEntity);
                    break;

                case 3:
                    //anticheatSettings(sourceEntity)
                    break;

                case 4:
                    mainMenu(sourceEntity);
                    break;
                default:
            }
        })
        .catch((e) => {
            console.error(e, e.stack);
        });
}
