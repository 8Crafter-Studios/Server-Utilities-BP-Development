import type { Entity, Player } from "@minecraft/server";
import { ModalFormData, ModalFormResponse } from "@minecraft/server-ui";
import { config } from "Main";
import { forceShow } from "modules/ui/functions/forceShow";
import { executeCommandPlayerW } from "../../../Main/commands";
import { settings } from "./settings";

export function homeSystemSettings(
    sourceEntitya: Entity | executeCommandPlayerW | Player
) {
    const sourceEntity = sourceEntitya instanceof executeCommandPlayerW
        ? sourceEntitya.player
        : sourceEntitya;
    let form2 = new ModalFormData();
    form2.title("Home System Settings [§cExperimental§r]");
    form2.toggle(
        "§l§fHome System Enabled§r§f",
        config.homeSystem.homeSystemEnabled
    );
    form2.textField(
        "§l§fMaximum Homes Per Player§r§f",
        "Int|Infinity",
        String(config.homeSystem.maxHomesPerPlayer)
    );
    form2.submitButton("Save");
    forceShow(form2, sourceEntity as Player)
        .then((to) => {
            let t = to as ModalFormResponse;
            if (t.canceled) {
                settings(sourceEntity);
                return;
            } /*
    GameTest.Test.prototype.spawnSimulatedPlayer({x: 0, y: 0, z: 0})*/ /*
        ${se}GameTest.Test.prototype.spawnSimulatedPlayer({x: 0, y: 0, z: 0})*/



            let [homeSystemEnabled, maxHomesPerPlayer] = t.formValues;
            config.homeSystem.homeSystemEnabled = homeSystemEnabled as boolean;
            config.homeSystem.maxHomesPerPlayer =
                String(maxHomesPerPlayer).toLowerCase() == "infinity"
                    ? Infinity
                    : Number(maxHomesPerPlayer);
            settings(sourceEntity);
        })
        .catch((e) => {
            console.error(e, e.stack);
        });
}
