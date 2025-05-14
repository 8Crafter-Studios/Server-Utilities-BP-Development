import { Entity, Player } from "@minecraft/server";
import { ActionFormData, ActionFormResponse } from "@minecraft/server-ui";
import { forceShow } from "modules/ui/functions/forceShow";
import { executeCommandPlayerW } from "modules/commands/classes/executeCommandPlayerW";
import { showMessage } from "modules/utilities/functions/showMessage";
import { defaultPlayerMenuLeaderboardStatistics } from "../constants/defaultPlayerMenuLeaderboardStatistics";
import type { playerMenuLeaderboardStatistic } from "../types/playerMenuLeaderboardStatistic";
import { playerMenu_leaderboard } from "./playerMenu_leaderboard";
import { customFormUICodes } from "../constants/customFormUICodes";

export async function playerMenu_leaderboards(
    sourceEntitya: Entity | executeCommandPlayerW | Player
): Promise<0 | 1> {
    const sourceEntity = sourceEntitya instanceof executeCommandPlayerW
        ? sourceEntitya.player
        : sourceEntitya as Player;
    if(!(sourceEntity instanceof Player)){
        throw new TypeError("Invalid Player. Expected an instance of the Player class, or an instance of the executeCommandPlayerW class with a Player linked to it, but instead got " + (typeof sourceEntity == "object" ? sourceEntity === null ? "object[null]" : "object[" + ((sourceEntity as object).constructor.name ?? "unknown") + "]" : typeof sourceEntity) + ".")
    }
    if (!config.ui.menus.playerMenu.enabled) {
        const r = await showMessage(sourceEntity as Player, "Menu Disabled", "The player menu is disabled. It must be enabled in Main Menu > Settings > Player Menu.", "Back", "Cancel");
        if(r.canceled || r.selection == 0){
            return 1;
        }else{
            return 0;
        }
    }
    const menuConfig = config.ui.menus.playerMenu_leaderboards;
    // menuConfig.buttons.map(k=>[k, menuButtonIds.mainMenu.buttons[k]])
    const buttons = (menuConfig.leaderboards.map(k=>[k, defaultPlayerMenuLeaderboardStatistics.find(s=>s.id === k && menuConfig.builtInStats[k as Exclude<keyof typeof menuConfig.builtInStats, "prototype">].enabled) ?? menuConfig.customStats.find(s=>s.id === k)]) as [string, playerMenuLeaderboardStatistic<"built-in"|"custom"|"customAdvanced">][]);
    let form = new ActionFormData();
    form.title(customFormUICodes.action.titles.formStyles.medium + "Leaderboards");
    form.body("Select a leaderboard.");
    buttons.forEach(([k, b])=>{
        form.button(customFormUICodes.action.buttons.positions.main_only + b?.buttonDisplayName, b?.buttonIcon);
    });
    form.button(customFormUICodes.action.buttons.positions.title_bar_only + "Back", "textures/ui/arrow_left");
    form.button(customFormUICodes.action.buttons.positions.title_bar_only + "Close", "textures/ui/crossout");
    return await forceShow(
        form,
        sourceEntity
    )
        .then(async (ra) => {
            let r = ra as ActionFormResponse;
            // This will stop the code when the player closes the form
            if (r.canceled) return 1;

            switch (buttons[r.selection!]?.[0] ?? (["back", "close"] as const)[r.selection-buttons.length]) {
                case "back":
                    return 1;
                case "close":
                    return 0;
                default:
                    if ((await playerMenu_leaderboard(sourceEntity, buttons[r.selection!]?.[1] as playerMenuLeaderboardStatistic<"built-in"|"custom"|"customAdvanced">)) == 1) {
                        return await playerMenu_leaderboards(sourceEntity);
                    } else {
                        return 0;
                    }
            }
        })
        .catch(async (e) => {
            console.error(e, e.stack);
            return ((await showMessage(sourceEntity, "An Error occurred", `An error occurred: ${e}${e?.stack}`, "Back", "Close")).selection !== 1).toNumber();
        });
}
