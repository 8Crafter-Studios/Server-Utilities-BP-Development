import { Entity, ObjectiveSortOrder, Player, world } from "@minecraft/server";
import { ActionFormData, ActionFormResponse, ModalFormData } from "@minecraft/server-ui";
import { forceShow } from "modules/ui/functions/forceShow";
import { executeCommandPlayerW } from "modules/commands/classes/executeCommandPlayerW";
import { showMessage } from "modules/utilities/functions/showMessage";
import type { playerMenuLeaderboardStatistic } from "../types/playerMenuLeaderboardStatistic";
import { savedPlayer } from "modules/player_save/classes/savedPlayer";
import { playerMenu_leaderboard_player } from "./playerMenu_leaderboard_player";
import { numberFormatter_compact } from "modules/utilities/functions/numberFormatter";
import { Bounty, TotalBounty } from "modules/main/classes/Bounty";
import { playerMenu_bounty } from "./playerMenu_bounty";
import { playerMenu_bounty_individuals } from "./playerMenu_bounty_individuals";
import { playerMenu_bounties_list } from "./playerMenu_bounties_list";
import { playerMenu_bounty_new } from "./playerMenu_bounty_new";
import { playerMenu_bounties_list_from } from "./playerMenu_bounties_list_from";
import { playerMenu_bounties_list_on } from "./playerMenu_bounties_list_on";

export async function playerMenu_bounties(
    sourceEntitya: Entity | executeCommandPlayerW | Player,
): Promise<0 | 1> {
    const sourceEntity = sourceEntitya instanceof executeCommandPlayerW
        ? sourceEntitya.player
        : sourceEntitya as Player;
    if(!(sourceEntity instanceof Player)){
        throw new TypeError("Invalid Player. Expected an instance of the Player class, or an instance of the executeCommandPlayerW class with a Player linked to it, but instead got " + (typeof sourceEntity == "object" ? sourceEntity === null ? "object[null]" : "object[" + ((sourceEntity as object).constructor.name ?? "unknown") + "]" : typeof sourceEntity) + ".")
    }
    if (!config.bountySystem.enabled) {
        const r = await showMessage(sourceEntity as Player, "Bounty System Disabled", "The bounty system is disabled. It must be enabled in Main Menu > Settings > Bounty System.", "Back", "Cancel");
        if(r.canceled || r.selection == 0){
            return 1;
        }else{
            return 0;
        }
    }
    let form = new ActionFormData();
    form.title(
        "Bounties"
    );
    form.button("Place a Bounty", "textures/ui/pointer");
    form.button("View All Active Bounties", "textures/gui/newgui/Friends");
    form.button("View Bounties You Placed", "textures/gui/newgui/mob_effects/strength_effect");
    form.button("View Bounties Placed On You", "textures/gui/newgui/mob_effects/wither_effect");
    form.button("Back", "textures/ui/arrow_left");
    form.button("Close", "textures/ui/crossout");
    return await forceShow(
        form,
        sourceEntity,
    )
        .then(async (ra) => {
            let r = ra as ActionFormResponse;
            // This will stop the code when the player closes the form
            if (r.canceled) return 1;

            switch ((["new", "viewAll", "viewFrom", "viewOn", "back", "close"] as const)[r.selection]) {
                case "new":
                    if ((await playerMenu_bounty_new(sourceEntity)) == 1) {
                        return await playerMenu_bounties(sourceEntity);
                    } else {
                        return 0;
                    }
                case "viewAll":
                    if ((await playerMenu_bounties_list(sourceEntity)) == 1) {
                        return await playerMenu_bounties(sourceEntity);
                    } else {
                        return 0;
                    }
                case "viewFrom":
                    if ((await playerMenu_bounties_list_from(sourceEntity)) == 1) {
                        return await playerMenu_bounties(sourceEntity);
                    } else {
                        return 0;
                    }
                case "viewOn":
                    if ((await playerMenu_bounties_list_on(sourceEntity)) == 1) {
                        return await playerMenu_bounties(sourceEntity);
                    } else {
                        return 0;
                    }
                case "back":
                    return 1;
                case "close":
                    return 0;
                default:
            }
        })
        .catch((e) => {
            console.error(e, e.stack);
            return 0;
        });
}
