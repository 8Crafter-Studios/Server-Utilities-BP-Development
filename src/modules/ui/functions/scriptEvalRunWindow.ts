import type { Entity, Player } from "@minecraft/server";
import { ModalFormData, ModalFormResponse } from "@minecraft/server-ui";
import { forceShow } from "modules/ui/functions/forceShow";
import { executeCommandPlayerW } from "../../../Main/commands";

export function scriptEvalRunWindow(
    sourceEntitya: Entity | executeCommandPlayerW | Player
) {
    const sourceEntity = sourceEntitya instanceof executeCommandPlayerW
        ? sourceEntitya.player
        : sourceEntitya;
    let form = new ModalFormData();
    form.title("Script Evaluate Run Window");
    form.textField("Script", "JavaScript");
    form.textField("Script", "JavaScript");
    form.textField("Script", "JavaScript");
    form.textField("Script", "JavaScript");
    form.textField("Script", "JavaScript");
    form.textField("Script", "JavaScript");
    form.textField("Script", "JavaScript");
    form.textField("Script", "JavaScript");
    form.submitButton("Run");

    forceShow(form, sourceEntity as Player)
        .then((ro) => {
            let r = ro as ModalFormResponse;
            if (r.canceled) return;

            let runScriptForEval = r.formValues;
            eval(String(runScriptForEval.join("\n")));
        })
        .catch((e) => {
            console.error(e, e.stack);
        });
}
