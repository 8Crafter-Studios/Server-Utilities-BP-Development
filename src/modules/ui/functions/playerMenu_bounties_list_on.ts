import { Entity, Player } from "@minecraft/server";
import { ActionFormData, ActionFormResponse, ModalFormData } from "@minecraft/server-ui";
import { forceShow } from "modules/ui/functions/forceShow";
import { executeCommandPlayerW } from "modules/commands/classes/executeCommandPlayerW";
import { showMessage } from "modules/utilities/functions/showMessage";
import { savedPlayer } from "modules/player_save/classes/savedPlayer";
import { numberFormatter_compact } from "modules/utilities/functions/numberFormatter";
import { Bounty } from "modules/main/classes/Bounty";
import { playerMenu_bounty_individual } from "./playerMenu_bounty_individual";
import { playerMenu_bounty_on_individual } from "./playerMenu_bounty_on_individual";

export async function playerMenu_bounties_list_on(
    sourceEntitya: Entity | executeCommandPlayerW | Player,
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
    if (!config.bountySystem.enabled) {
        const r = await showMessage(sourceEntity as Player, "Bounty System Disabled", "The bounty system is disabled. It must be enabled in Main Menu > Settings > Bounty System.", "Back", "Cancel");
        if(r.canceled || r.selection == 0){
            return 1;
        }else{
            return 0;
        }
    }
    let form = new ActionFormData();
    const page = Math.max(0, pagen);
    let bounties = Bounty.getBountiesOnPlayer(sourceEntity.id).map(b=>[b, b.getLinkedSourceSavedPlayer()] as [bounty: Bounty, source: savedPlayer])
        .filter(b=>!b[1].isBanned);
    let displayPlayers = bounties
    .filter((p) => !!search
        ? search.caseSensitive == true
            ? p[1].name.includes(search.value)
            : p[1].name.toLowerCase().includes(search.value.toLowerCase())
        : true
    ).sort(((a: [Bounty, savedPlayer], b: [Bounty, savedPlayer]) => (a[0].value > b[0].value ? -1 : a[0].value < b[0].value ? 1 : a[1].name > b[1].name ? -1 : a[1].name < b[1].name ? 1 : 0)));
    const numsavedplayers = displayPlayers.length;
    form.title(
        `${!!search ? "Search Results" : "Bounties Placed On Me"} ${Math.min(
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
    }else{
        form.body(`There ${numsavedplayers === 1 ? "is" : "are"} ${numsavedplayers} active bount${numsavedplayers === 1 ? "y" : "ies"} that have been placed on you.`);
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
        let text = `${numberFormatter_compact(p[0].value, true)}\n${p[1].name}`;
        form.button(
            text,
            p[1].isOnline
                ? "textures/ui/online"
                : p[1].isBanned
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

            switch ((["search", "previous", "next"] as const)[r.selection] ?? (!!displayPlayers[r.selection-3] ? "bounty" : undefined) ?? (["back", "close"] as const)[r.selection-displayPlayers.length-3]) {
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
                            return await playerMenu_bounties_list_on(
                                sourceEntity,
                                page,
                                maxplayersperpage,
                                search
                            );
                        }
                        return await playerMenu_bounties_list_on(
                            sourceEntity,
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
                    return await playerMenu_bounties_list_on(
                        sourceEntity,
                        Math.max(0, page - 1),
                        maxplayersperpage,
                        search
                    );
                    break;
                case "next":
                    return await playerMenu_bounties_list_on(
                        sourceEntity,
                        Math.min(numpages - 1, page + 1),
                        maxplayersperpage,
                        search
                    );
                    break;
                case "bounty":
                    if ((await playerMenu_bounty_on_individual(sourceEntity, bounties[r.selection-3][0], bounties[r.selection-3][1])) == 1) {
                        return await playerMenu_bounties_list_on(
                            sourceEntity,
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
