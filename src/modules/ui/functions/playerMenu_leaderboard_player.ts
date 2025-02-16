import { Entity, ObjectiveSortOrder, Player, world } from "@minecraft/server";
import { ActionFormData, ActionFormResponse, ModalFormData } from "@minecraft/server-ui";
import { forceShow } from "modules/ui/functions/forceShow";
import { executeCommandPlayerW } from "modules/commands/classes/executeCommandPlayerW";
import { showMessage } from "modules/utilities/functions/showMessage";
import type { playerMenuLeaderboardStatistic } from "../types/playerMenuLeaderboardStatistic";
import { savedPlayer } from "modules/player_save/classes/savedPlayer";
import { defaultPlayerMenuLeaderboardStatistics } from "../constants/defaultPlayerMenuLeaderboardStatistics";
import { numberFormatter } from "modules/utilities/functions/numberFormatter";

export async function playerMenu_leaderboard_player(
    sourceEntitya: Entity | executeCommandPlayerW | Player,
    leaderboard: playerMenuLeaderboardStatistic<any>,
    player: savedPlayer
): Promise<0 | 1> {
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
    if (!config.ui.menus.playerMenu.enabled) {
        const r = await showMessage(
            sourceEntity as Player,
            "Menu Disabled",
            "The player menu is disabled. It must be enabled in Main Menu > Settings > Player Menu.",
            "Back",
            "Cancel"
        );
        if (r.canceled || r.selection == 0) {
            return 1;
        } else {
            return 0;
        }
    }
    const menuConfig = config.ui.menus.playerMenu_leaderboards;
    // menuConfig.buttons.map(k=>[k, menuButtonIds.mainMenu.buttons[k]])
    let form = new ActionFormData();
    form.title(player.name);
    const stats = menuConfig.trackedStats.map((k) => [
        k,
        defaultPlayerMenuLeaderboardStatistics.find((s) => s.id === k && menuConfig.builtInStats[k as keyof typeof menuConfig.builtInStats].enabled) ??
            menuConfig.customStats.find((s) => s.id === k),
    ]) as [string, playerMenuLeaderboardStatistic<any>][];
    const statsDisplay = stats.map(([k, s]) => {
        let value =
            "getterFunction" in s
                ? s.getterFunction(player)
                : world.scoreboard
                      .getObjective(s.scoreboardObjective)
                      .getScore(
                          world.scoreboard.getParticipants().find((v) => tryget(() => v.getEntity()?.id) == player.id) ??
                              (world.scoreboard.getParticipants().find((v) => v.id == player.scoreboardIdentity) as any)
                      )
                      ?.toString();
        if (s.valueType == "bigint" || s.valueType == "number") {
            value = numberFormatter(
                value,
                { addCommaSeparators: s.displayOptions.addCommaSeparators ?? true, prefixWithDollarSign: s.displayOptions.prefixWithDollarSign ?? false },
                s.displayOptions.toFixed
            );
        }
        let out = `${s.statsListDisplayName}§r: ${
            "0123456789abcdefghijklmnopqrstuvwxyz".includes(s.displayOptions.valueDisplayColor?.toLowerCase() as string)
                ? "§" + s.displayOptions.valueDisplayColor
                : ""
        }${value}`;
        if (leaderboard.displayOptions.valueDisplayTransformer_statsList !== undefined) {
            out = leaderboard.displayOptions.valueDisplayTransformer_statsList(out);
        }
        return out;
    });
    form.body(
        `${player.name}\n${
            player.isOnline
                ? "Online"
                : player.isBanned
                ? "Banned"
                : menuConfig.showLastOnlineTimeInPlayerStatsList
                ? "Last Online: " + new Date(player.lastOnline).formatDateTime(sourceEntity.timeZone, false, true)
                : "Offline"
        }\n${statsDisplay.join("§r\n")}`
    );
    form.button("Back", "textures/ui/arrow_left");
    form.button("Close", "textures/ui/crossout");
    return await forceShow(form, sourceEntity)
        .then(async (ra) => {
            let r = ra as ActionFormResponse;
            // This will stop the code when the player closes the form
            if (r.canceled) return 1;

            switch ((["back", "close"] as const)[r.selection]) {
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
