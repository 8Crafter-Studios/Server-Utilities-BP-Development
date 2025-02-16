import { Entity, Player } from "@minecraft/server";
import { ActionFormData, ActionFormResponse, ModalFormData } from "@minecraft/server-ui";
import { forceShow } from "modules/ui/functions/forceShow";
import { executeCommandPlayerW } from "modules/commands/classes/executeCommandPlayerW";
import { showActions } from "modules/utilities/functions/showActions";
import { playerMenu_about_contributors } from "./playerMenu_about_contributors";
import { HomeSystem } from "modules/commands/classes/HomeSystem";
import { vTStr } from "modules/commands/functions/vTStr";
import { showMessage } from "modules/utilities/functions/showMessage";
import { Home } from "modules/commands/classes/Home";
import { TeleportRequest } from "modules/coordinates/classes/TeleportRequest";
export async function playerMenu_TPA_outgoing(sourceEntitya) {
    const sourceEntity = sourceEntitya instanceof executeCommandPlayerW ? sourceEntitya.player : sourceEntitya;
    if (!(sourceEntity instanceof Player)) {
        throw new TypeError("Invalid Player. Expected an instance of the Player class, or an instance of the executeCommandPlayerW class with a Player linked to it, but instead got " +
            (typeof sourceEntity == "object"
                ? sourceEntity === null
                    ? "object[null]"
                    : "object[" + (sourceEntity.constructor.name ?? "unknown") + "]"
                : typeof sourceEntity) +
            ".");
    }
    if (!config.tpaSystem.tpaSystemEnabled) {
        if ((await showMessage(sourceEntity, "Error", `§cSorry but the TPA system is currently disabled.`, "Back", "Close")).selection === 0) {
            return 1;
        }
        else {
            return 0;
        }
    }
    let form = new ActionFormData();
    form.title("Outgoing Teleport Requests");
    const requests = TeleportRequest.getRequestsFromPlayer(sourceEntity);
    requests.forEach((h) => form.button(`${h.target.name}`));
    form.button("Back", "textures/ui/arrow_left");
    form.button("Close", "textures/ui/crossout");
    return await forceShow(form, sourceEntity)
        .then(async (ra) => {
        let r = ra;
        if (r.canceled)
            return 1;
        switch ((!!requests[r.selection] ? "request" : undefined) ?? ["back", "close"][r.selection - requests.length]) {
            case "request":
                const request = requests[r.selection];
                switch (["cancel", "back", "close"][(await showActions(sourceEntity, "Teleport Request Details", `To: ${request.target.name}`, ["Cancel Request", "textures/ui/trash_default"], ["Back", "textures/ui/arrow_left"], ["Close", "textures/ui/crossout"])).selection]) {
                    case "cancel":
                        request.cancel();
                        return await playerMenu_TPA_outgoing(sourceEntity);
                    case "back":
                        return await playerMenu_TPA_outgoing(sourceEntity);
                    case "close":
                        return 0;
                }
            case "back":
                return 1;
            case "close":
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
//# sourceMappingURL=playerMenu_TPA_outgoing.js.map