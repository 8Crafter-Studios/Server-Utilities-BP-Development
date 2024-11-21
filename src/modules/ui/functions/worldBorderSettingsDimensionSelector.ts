import type { Entity, Player } from "@minecraft/server";
import { ActionFormData } from "@minecraft/server-ui";
import { forceShow } from "modules/ui/functions/forceShow";
import { executeCommandPlayerW } from "../../../Main/commands";
import { extraFeaturesSettings } from "./extraFeaturesSettings";
import { worldBorderSettings } from "./worldBorderSettings";

export function worldBorderSettingsDimensionSelector(
    sourceEntitya: Entity | executeCommandPlayerW | Player
) {
    const sourceEntity = sourceEntitya instanceof executeCommandPlayerW
        ? sourceEntitya.player
        : sourceEntitya;
    let form2 = new ActionFormData();
    form2.button("Overworld");
    form2.button("Nether");
    form2.button("The End");
    form2.button("Back");
    forceShow(form2, sourceEntity as Player)
        .then((t) => {
            if (t.canceled || t.selection == 3) {
                extraFeaturesSettings(sourceEntity);
                return;
            }
            worldBorderSettings(sourceEntity, t.selection);
        })
        .catch((e) => {
            console.error(e, e.stack);
        });
}
