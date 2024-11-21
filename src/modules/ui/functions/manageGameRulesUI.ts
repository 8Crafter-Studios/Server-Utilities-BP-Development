import { Entity, GameRules, Player, world } from "@minecraft/server";
import { ModalFormData, ModalFormResponse } from "@minecraft/server-ui";
import { forceShow } from "modules/ui/functions/forceShow";
import { executeCommandPlayerW } from "../../../Main/commands";

export function manageGameRulesUI(
    sourceEntitya: Entity | executeCommandPlayerW | Player
) {
    const sourceEntity = sourceEntitya instanceof executeCommandPlayerW
        ? sourceEntitya.player
        : sourceEntitya;
    let form2 = new ModalFormData();
    const ruleNames = Object.getOwnPropertyNames(GameRules.prototype)
        .filter((r) => r != "constructor")
        .sort(
            (a, b) => -+(typeof world.gameRules[a] != typeof world.gameRules[b]) *
                (2 * +(typeof world.gameRules[a] == "number") - 1)
        );
    const ruleValues = world.gameRules;
    form2.title("Manage Game Rules");
    ruleNames.forEach((r) => {
        if (typeof ruleValues[r] == "number") {
            form2.textField(r, "number", String(ruleValues[r]));
        } else {
            form2.toggle(r, Boolean(ruleValues[r]));
        }
    });
    form2.submitButton("Save");
    forceShow(form2, sourceEntity as Player)
        .then((to) => {
            let t = to as ModalFormResponse;
            if (t.canceled) return;
            try {
                t.formValues.forEach((v, i) => {
                    if (ruleValues[ruleNames[i]] != v) {
                        ruleValues[ruleNames[i]] =
                            typeof ruleValues[ruleNames[i]] == "number"
                                ? Number(v)
                                : v;
                    }
                });
            } catch (e) {
                (sourceEntity as Player).sendMessage("§c" + e + " " + e.stack);
            }
        })
        .catch((e) => {
            console.error(e, e.stack);
        });
}
