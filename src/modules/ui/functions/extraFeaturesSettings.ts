import type { Entity, Player } from "@minecraft/server";
import { ActionFormData, ActionFormResponse } from "@minecraft/server-ui";
import { mainShopSystemSettings } from "ExtraFeatures/shop_main";
import { forceShow } from "modules/ui/functions/forceShow";
import { executeCommandPlayerW } from "../../../Main/commands";
import { settings } from "./settings";
import { worldBorderSettingsDimensionSelector } from "./worldBorderSettingsDimensionSelector";

export function extraFeaturesSettings(
    sourceEntitya: Entity | executeCommandPlayerW | Player
) {
    const sourceEntity = sourceEntitya instanceof executeCommandPlayerW
        ? sourceEntitya.player
        : sourceEntitya;
    let form = new ActionFormData();
    form.title("Extra Features Settings");
    form.body(
        "Extra features are optional features that can be enabled but are disabled by default."
    );
    form.button("World Border System", "textures/ui/worldsIcon");
    form.button("Shop System", "textures/ui/store_home_icon");
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
                    worldBorderSettingsDimensionSelector(sourceEntity);
                    break;
                case 1:
                    mainShopSystemSettings(sourceEntity);
                    break;
                case 2:
                    settings(sourceEntity);
                    break;
                default:
            }
        })
        .catch((e) => {
            console.error(e, e.stack);
        });
}
