import { Entity, ObjectiveSortOrder, Player, world } from "@minecraft/server";
import { ActionFormData, ActionFormResponse, ModalFormData } from "@minecraft/server-ui";
import { forceShow } from "modules/ui/functions/forceShow";
import { executeCommandPlayerW } from "modules/commands/classes/executeCommandPlayerW";
import { showMessage } from "modules/utilities/functions/showMessage";
import type { playerMenuLeaderboardStatistic } from "../types/playerMenuLeaderboardStatistic";
import { savedPlayer } from "modules/player_save/classes/savedPlayer";
import { playerMenu_leaderboard_player } from "./playerMenu_leaderboard_player";
import { numberFormatter_compact } from "modules/utilities/functions/numberFormatter";

export async function playerMenu_leaderboard(
    sourceEntitya: Entity | executeCommandPlayerW | Player,
    leaderboard: playerMenuLeaderboardStatistic<any>,
    pagen: number = 0,
    maxplayersperpage: number = config.ui.pages
        .maxPlayersPerManagePlayersPage ?? 10,
    search?: {
        value: string;
        caseSensitive?: boolean;
    }
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
    let form = new ActionFormData();
    const page = Math.max(0, pagen);
    let savedPlayers = savedPlayer
        .getSavedPlayersAlphabeticalOrder()
    if(!menuConfig.showBannedPlayersInLeaderboards){
        savedPlayers = savedPlayers.filter(p=>!p.isBanned);
    }
    const sorterFunction = (typeof leaderboard.sorter == "function" ? (a: [savedPlayer, string], b: [savedPlayer, string]) => leaderboard.sorter(a[1], b[1]) : undefined) ??
        ((typeof leaderboard.sorter == "number" ? leaderboard.sorter : ObjectiveSortOrder.Descending) == ObjectiveSortOrder.Descending ? ((a: [savedPlayer, string], b: [savedPlayer, string]) => (a[1] > b[1] ? -1 : a[1] < b[1] ? 1 : 0)) : ((a: [savedPlayer, string], b: [savedPlayer, string]) => (a[1] > b[1] ? 1 : a[1] < b[1] ? -1 : 0)));
    let displayPlayers = savedPlayers
    .filter((p) => !!search
        ? search.caseSensitive == true
            ? p.name.includes(search.value)
            : p.name.toLowerCase().includes(search.value.toLowerCase())
        : true
    ).map(p=>[p, "getterFunction" in leaderboard ? leaderboard.getterFunction(p) : world.scoreboard.getObjective(leaderboard.scoreboardObjective).getScore(
            world.scoreboard.getParticipants().find((v) => tryget(() => v.getEntity()?.id) == p.id) ??
                (world.scoreboard
                    .getParticipants()
                    .find((v) => v.id == p.scoreboardIdentity) as any)
        )?.toString()] as const)
        .filter(p=>
            p[1] !== undefined
        )
        .sort(sorterFunction);
    const numsavedplayers = displayPlayers.length;
    form.title(
        `${!!search ? "Search Results" : leaderboard.menuTitle} ${Math.min(
            numsavedplayers,
            page * maxplayersperpage + 1
        )}-${Math.min(
            numsavedplayers,
            (page + 1) * maxplayersperpage
        )} of ${numsavedplayers}`
    );
    const numpages = Math.ceil(numsavedplayers / maxplayersperpage);
    if (!!search) {
        form.body(
            `Searching for: ${JSON.stringify(
                search.value
            )}\nCase Sensitive: ${JSON.stringify(
                search.caseSensitive ?? false
            )}`
        );
    }
    form.button("Search", "textures/ui/spyglass_flat");
    form.button(
        (page != 0 ? "§0" : "§8") + "Previous Page",
        "textures/ui/arrow_left"
    );
    form.button(
        (page < numpages - 1 ? "§0" : "§8") + "Next Page",
        "textures/ui/arrow_right"
    );
    displayPlayers.slice(page * maxplayersperpage, (page + 1) * maxplayersperpage).forEach((p, i) => {
        let text = `${((leaderboard.valueType == "bigint" || leaderboard.valueType == "number") ? numberFormatter_compact(p[1], leaderboard.displayOptions.prefixWithDollarSign) : p[1]).slice(0, 19)}\n#${i + 1 + page * maxplayersperpage}: ${p[0].name}`;
        if(leaderboard.displayOptions.valueDisplayTransformer_button !== undefined){
            text = leaderboard.displayOptions.valueDisplayTransformer_button(text);
        }
        form.button(
            text,
            p[0].isOnline
                ? "textures/ui/online"
                : p[0].isBanned
                    ? "textures/ui/Ping_Offline_Red_Dark"
                    : "textures/ui/offline"
        );
    });
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

            switch ((["search", "previous", "next"] as const)[r.selection] ?? (!!displayPlayers[r.selection-3] ? "player" : undefined) ?? (["back", "close"] as const)[r.selection-displayPlayers.length-3]) {
                case "search":
                    {
                        const rb = await tryget(
                            async () => await new ModalFormData()
                                .title("Search")
                                .textField(
                                    "",
                                    "Search",
                                    search?.value ?? ""
                                )
                                .toggle(
                                    "Case Sensitive",
                                    search?.caseSensitive ?? false
                                )
                                .submitButton("Search")
                                .forceShow(sourceEntity as Player)
                        );
                        if (!!!rb || rb?.canceled == true) {
                            return await playerMenu_leaderboard(
                                sourceEntity,
                                leaderboard,
                                page,
                                maxplayersperpage,
                                search
                            );
                        }
                        return await playerMenu_leaderboard(
                            sourceEntity,
                            leaderboard,
                            undefined,
                            maxplayersperpage,
                            {
                                value: rb.formValues[0] as string,
                                caseSensitive: rb.formValues[1] as boolean,
                            }
                        ); /*
            return await showMessage(sourceEntity as Player, undefined, "§cSorry, the search feature has not been implemented yet.", "Back", "Close").then(async r=>{
                if(r.selection==0){
                    return await managePlayers(sourceEntity, page, maxplayersperpage, search);
                }else{
                    return 0;
                }
            })*/







                    }
                    break;
                case "previous":
                    return await playerMenu_leaderboard(
                        sourceEntity,
                        leaderboard,
                        Math.max(0, page - 1),
                        maxplayersperpage,
                        search
                    );
                    break;
                case "next":
                    return await playerMenu_leaderboard(
                        sourceEntity,
                        leaderboard,
                        Math.min(numpages - 1, page + 1),
                        maxplayersperpage,
                        search
                    );
                    break;
                case "player":
                    if ((await playerMenu_leaderboard_player(sourceEntity, leaderboard, displayPlayers[r.selection-3][0])) == 1) {
                        return await playerMenu_leaderboard(
                            sourceEntity,
                            leaderboard,
                            page,
                            maxplayersperpage,
                            search
                        );
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
