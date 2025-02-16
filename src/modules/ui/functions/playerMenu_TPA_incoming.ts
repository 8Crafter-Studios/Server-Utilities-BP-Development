import { Entity, Player } from "@minecraft/server";
import { ActionFormData, ActionFormResponse } from "@minecraft/server-ui";
import { forceShow } from "modules/ui/functions/forceShow";
import { executeCommandPlayerW } from "modules/commands/classes/executeCommandPlayerW";
import { showActions } from "modules/utilities/functions/showActions";
import { showMessage } from "modules/utilities/functions/showMessage";
import { TeleportRequest } from "modules/coordinates/classes/TeleportRequest";

export async function playerMenu_TPA_incoming(sourceEntitya: Entity | executeCommandPlayerW | Player): Promise<0 | 1> {
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
        if((await showMessage(
            sourceEntity,
            "Error",
            `§cSorry but the TPA system is currently disabled.`,
            "Back",
            "Close"
        )).selection === 0) {
            return 1;
        } else {
            return 0;
        }
    }
    let form = new ActionFormData();
    form.title("Incoming Teleport Requests");
    const requests = TeleportRequest.getRequestsToPlayer(sourceEntity);
    requests.forEach((h) =>
        form.button(`${h.player.name}`)
    );
    form.button("Back", "textures/ui/arrow_left");
    form.button("Close", "textures/ui/crossout");
    return await forceShow(form, sourceEntity)
        .then(async (ra) => {
            let r = ra as ActionFormResponse;
            if (r.canceled) return 1;

            switch ((!!requests[r.selection] ? "request" : undefined) ?? (["back", "close"] as const)[r.selection - requests.length]) {
                case "request":
                    const request = requests[r.selection];
                    switch (
                        (["accept", "decline", "back", "close"] as const)[
                            (
                                await showActions(
                                    sourceEntity,
                                    "Teleport Request Details",
                                    `From: ${request.player.name}`,
                                    ["Accept Request", "textures/ui/trash_default"],
                                    ["Decline Request", "textures/ui/trash_default"],
                                    ["Back", "textures/ui/arrow_left"],
                                    ["Close", "textures/ui/crossout"]
                                )
                            ).selection
                        ]
                    ) {
                        case "accept":
                            request.accept();
                            return await playerMenu_TPA_incoming(sourceEntity);
                        case "decline":
                            request.deny();
                            return await playerMenu_TPA_incoming(sourceEntity);
                        case "back":
                            return await playerMenu_TPA_incoming(sourceEntity);
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
