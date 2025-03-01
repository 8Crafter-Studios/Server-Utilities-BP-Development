import { Entity, Player } from "@minecraft/server";
import { ActionFormData, ActionFormResponse } from "@minecraft/server-ui";
import { forceShow } from "modules/ui/functions/forceShow";
import { executeCommandPlayerW } from "modules/commands/classes/executeCommandPlayerW";
import { showActions } from "modules/utilities/functions/showActions";
import { showMessage } from "modules/utilities/functions/showMessage";
import { TeleportRequest } from "modules/coordinates/classes/TeleportRequest";
import { customFormUICodes } from "../constants/customFormUICodes";

export async function playerMenu_TPA_outgoing(sourceEntitya: Entity | executeCommandPlayerW | Player): Promise<0 | 1> {
    const sourceEntity = sourceEntitya instanceof executeCommandPlayerW ? sourceEntitya.player : (sourceEntitya as Player);
    if (!(sourceEntity instanceof Player)) {
        throw new TypeError(
            "Invalid Player. Expected an instance of the Player class, or an instance of the executeCommandPlayerW class with a Player linked to it, but instead got " +
                (typeof sourceEntity == "object"
                    ? sourceEntity === null
                        ? "object[null]"
                        : "object[" + ((sourceEntity as object).constructor.name ?? "unknown") + "]"
                    : typeof sourceEntity) +
                "."
        );
    }
    if (!config.tpaSystem.tpaSystemEnabled) {
        if ((await showMessage(sourceEntity, "Error", `§cSorry but the TPA system is currently disabled.`, "Back", "Close")).selection === 0) {
            return 1;
        } else {
            return 0;
        }
    }
    let form = new ActionFormData();
    form.title(customFormUICodes.action.titles.formStyles.general + "Outgoing Teleport Requests");
    const requests = TeleportRequest.getRequestsFromPlayer(sourceEntity);
    requests.forEach((h) => form.button(customFormUICodes.action.buttons.positions.main_only + h.target.name));
    if (requests.length === 0) {
        form.body("No outgoing teleport requests.");
    }
    form.button(customFormUICodes.action.buttons.positions.title_bar_only + "Back", "textures/ui/arrow_left");
    form.button(customFormUICodes.action.buttons.positions.title_bar_only + "Close", "textures/ui/crossout");
    form.button(customFormUICodes.action.buttons.positions.title_bar_only + "Refresh", "textures/ui/refresh");
    return await forceShow(form, sourceEntity)
        .then(async (ra) => {
            let r = ra as ActionFormResponse;
            if (r.canceled) return 1;

            switch ((!!requests[r.selection] ? "request" : undefined) ?? (["back", "close", "refresh"] as const)[r.selection - requests.length]) {
                case "request":
                    const request = requests[r.selection];
                    switch (
                        (["cancel", "back", "close"] as const)[
                            (
                                await showActions(
                                    sourceEntity,
                                    customFormUICodes.action.titles.formStyles.general + "Teleport Request Details",
                                    `To: ${request.target.name}`,
                                    [customFormUICodes.action.buttons.positions.main_only + "Cancel Request", "textures/ui/trash_default"],
                                    [customFormUICodes.action.buttons.positions.title_bar_only + "Back", "textures/ui/arrow_left"],
                                    [customFormUICodes.action.buttons.positions.title_bar_only + "Close", "textures/ui/crossout"]
                                )
                            ).selection
                        ]
                    ) {
                        case "cancel":
                            request.cancel();
                            return await playerMenu_TPA_outgoing(sourceEntity);
                        case "back":
                            return await playerMenu_TPA_outgoing(sourceEntity);
                        case "close":
                            return 0;
                    }
                case "refresh":
                    return await playerMenu_TPA_outgoing(sourceEntity);
                case "back":
                    return 1;
                case "close":
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
