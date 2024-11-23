import type { Entity, Player } from "@minecraft/server";
import { ModalFormData, ModalFormResponse } from "@minecraft/server-ui";
import { config } from "init/classes/config";
import { forceShow } from "modules/ui/functions/forceShow";
import { executeCommandPlayerW } from "modules/commands/classes/executeCommandPlayerW";
import { settings } from "./settings";

export function tpaSettings(
    sourceEntitya: Entity | executeCommandPlayerW | Player
) {
    const sourceEntity = sourceEntitya instanceof executeCommandPlayerW
        ? sourceEntitya.player
        : sourceEntitya;
    let form2 = new ModalFormData();
    form2.title("TPA System Settings [§cExperimental§r]");
    form2.toggle("§l§fEnable TPA System", config.tpaSystem.tpaSystemEnabled);
    form2.textField(
        "§l§fSeconds Until Request Times Out§r§o\ndefault is 60",
        "int",
        config.tpaSystem.timeoutDuration.toString()
    );
    //form2.textField("§l§fMaximum Homes Per Player§r§f", "Int|Infinity", String(config.homeSystem.maxHomesPerPlayer));
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



            let [tpaSystemEnabled, timeoutDuration] = t.formValues as [
                tpaSystemEnabled: boolean,
                timeoutDuration: string
            ];
            config.tpaSystem.tpaSystemEnabled = tpaSystemEnabled;
            config.tpaSystem.timeoutDuration = timeoutDuration.toNumber();
            //config.homeSystem.maxHomesPerPlayer=String(maxHomesPerPlayer).toLowerCase()=="infinity"?Infinity:Number(maxHomesPerPlayer)
            settings(sourceEntity);
        })
        .catch((e) => {
            console.error(e, e.stack);
        });
}
