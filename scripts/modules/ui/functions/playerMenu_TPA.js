import { Entity, Player } from "@minecraft/server";
import { ActionFormData, ActionFormResponse } from "@minecraft/server-ui";
import { forceShow } from "modules/ui/functions/forceShow";
import { executeCommandPlayerW } from "modules/commands/classes/executeCommandPlayerW";
import { playerMenu_TPA_outgoing } from "./playerMenu_TPA_outgoing";
import { TeleportRequest } from "modules/coordinates/classes/TeleportRequest";
import { showMessage } from "modules/utilities/functions/showMessage";
import { playerMenu_TPA_incoming } from "./playerMenu_TPA_incoming";
export async function playerMenu_TPA(sourceEntitya) {
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
    form.title("TPA");
    form.button("Send Teleport Request", "textures/ui/chat_send");
    form.button("Outgoing", "textures/ui/upload_glyph");
    form.button("Incoming", "textures/ui/invite_base");
    form.button("Back", "textures/ui/arrow_left");
    form.button("Close", "textures/ui/crossout");
    return await forceShow(form, sourceEntity)
        .then(async (ra) => {
        let r = ra;
        if (r.canceled)
            return 1;
        switch (["send", "outgoing", "incoming", "back", "close"][r.selection]) {
            case "send": {
                let form = new ActionFormData();
                form.title("Select Player");
                let playerslist = world.getAllPlayers().filter(p => p !== sourceEntity);
                playerslist.forEach((p) => {
                    form.button(`${p.name}` /*, "textures/ui/online"*/);
                });
                form.button("Back", "textures/ui/arrow_left");
                form.button("Close", "textures/ui/crossout");
                const r = await form.forceShow(sourceEntity);
                if (r.canceled || r.selection === playerslist.length)
                    return await playerMenu_TPA(sourceEntity);
                if (r.selection === playerslist.length + 1)
                    return 0;
                const target = playerslist[r.selection];
                try {
                    TeleportRequest.send(sourceEntity, target);
                }
                catch (e) {
                    if (e instanceof Error && e.message === "Duplicate Request") {
                        sourceEntity.sendMessage(`§cYou have already sent a teleport request to ${target.name}.`);
                    }
                    else {
                        sourceEntity.sendMessage(`§cAn error occured while sending a teleport request to ${target.name}: ${e}${e.stack}`);
                    }
                }
                sourceEntity.sendMessage(`§aSent a teleport request to ${target.name}.`);
                return await playerMenu_TPA(sourceEntity);
            }
            case "outgoing":
                if ((await playerMenu_TPA_outgoing(sourceEntity)) == 1) {
                    return await playerMenu_TPA(sourceEntity);
                }
                else {
                    return 0;
                }
            case "incoming":
                if ((await playerMenu_TPA_incoming(sourceEntity)) == 1) {
                    return await playerMenu_TPA(sourceEntity);
                }
                else {
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
//# sourceMappingURL=playerMenu_TPA.js.map