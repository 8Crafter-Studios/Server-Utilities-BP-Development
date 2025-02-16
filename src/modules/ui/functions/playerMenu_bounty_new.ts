import { Entity, Player } from "@minecraft/server";
import { ActionFormData, ActionFormResponse, ModalFormData } from "@minecraft/server-ui";
import { forceShow } from "modules/ui/functions/forceShow";
import { executeCommandPlayerW } from "modules/commands/classes/executeCommandPlayerW";
import { showMessage } from "modules/utilities/functions/showMessage";
import { savedPlayer } from "modules/player_save/classes/savedPlayer";
import { numberFormatter } from "modules/utilities/functions/numberFormatter";
import { MoneySystem } from "ExtraFeatures/money";
import { Bounty } from "modules/main/classes/Bounty";

export async function playerMenu_bounty_new(
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
    // menuConfig.buttons.map(k=>[k, menuButtonIds.mainMenu.buttons[k]]
    let form = new ActionFormData();
    const page = Math.max(0, pagen);
    let savedPlayers = savedPlayer
        .getSavedPlayersAlphabeticalOrder().filter(p=>!p.isBanned);
    let displayPlayers = [
        ...savedPlayers
            .filter((_) => _.isOnline),
        ...savedPlayers
            .filter((_) => !_.isOnline)
            .sort(
                (a: savedPlayer, b: savedPlayer) => b.lastOnline - a.lastOnline
            ),
    ].filter((p) => !!search
        ? search.caseSensitive == true
            ? p.name.includes(search.value)
            : p.name.toLowerCase().includes(search.value.toLowerCase())
        : true
    );
    const numsavedplayers = displayPlayers.length;
    form.title(
        `${!!search ? "Search Results" : "Select Player"} ${Math.min(
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
            )}\n\nPlease select a player to put a bounty on.`
        );
    }else{
        form.body("Please select a player to put a bounty on.");
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
        form.button(
            p.name,
            p.isOnline
                ? "textures/ui/online"
                : p.isBanned
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
                            return await playerMenu_bounty_new(
                                sourceEntity,
                                page,
                                maxplayersperpage,
                                search
                            );
                        }
                        return await playerMenu_bounty_new(
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
                    return await playerMenu_bounty_new(
                        sourceEntity,
                        Math.max(0, page - 1),
                        maxplayersperpage,
                        search
                    );
                    break;
                case "next":
                    return await playerMenu_bounty_new(
                        sourceEntity,
                        Math.min(numpages - 1, page + 1),
                        maxplayersperpage,
                        search
                    );
                    break;
                case "player": {
                    const player = displayPlayers[r.selection-3];
                    const ra = await new ModalFormData().title("Place Bounty").textField(`§6--------------------------------
§aMoney: ${numberFormatter(sourceEntity.moneySystem.money, {addCommaSeparators: true, prefixWithDollarSign: true}, 0)}
§6--------------------------------
§rBounty Target: ${player.name}

§r§lAmount§r
Please enter the amount of money you would like to place on the bounty below.`, "Money Amount").submitButton("Place Bounty").forceShow(sourceEntity);
                    if(ra.canceled){
                        return await playerMenu_bounty_new(
                            sourceEntity,
                            Math.min(numpages - 1, page + 1),
                            maxplayersperpage,
                            search
                        );
                    }
                    if(ra.formValues?.[0] === ""){
                        return ((await showMessage(sourceEntity, "Reward Not Specified", "You did not specify how much money to place on the bounty.", "Back", "Close")).selection !== 1).toNumber();
                    }
                    if(!/^\d+(?:\.\d+)?(?:[eE?][+\-]?\d+)?$/.test(ra.formValues?.[0] as string)){
                        return ((await showMessage(sourceEntity, "Invalid Money Amount", `${JSON.stringify(ra.formValues?.[0])} is not a valid amount of money.`, "Back", "Close")).selection !== 1).toNumber();
                    }
                    if(!/^\d+$/.test(ra.formValues?.[0] as string)){
                        return ((await showMessage(sourceEntity, "Invalid Money Amount", `${JSON.stringify(ra.formValues?.[0])} is not a valid amount of money, the amount of money must be a whole number.`, "Back", "Close")).selection !== 1).toNumber();
                    }
                    const amount = ra.formValues?.[0]?.toBigInt() ?? 0n;
                    if(amount < 0n){
                        return ((await showMessage(sourceEntity, "Invalid Money Amount", "You may not place a negative value bounty, as that would steal someone's money.", "Back", "Close")).selection !== 1).toNumber();
                    }
                    if(amount === 0n){
                        return ((await showMessage(sourceEntity, "Invalid Money Amount", "You may not place a $0 bounty.", "Back", "Close")).selection !== 1).toNumber();
                    }
                    if(((await showMessage(sourceEntity, "Are you sure?", `Are you sure you want to place a ${numberFormatter(amount, {addCommaSeparators: true, prefixWithDollarSign: true})} bounty on ${player.name}`, "Cancel", "Confirm")).selection === 1).toNumber()){
                        Bounty.placeBountyOnPlayer(BigInt(ra.formValues[0]), sourceEntity.id, player.id, sourceEntity.name, player.name);
                        return ((await showMessage(sourceEntity, "Bounty Placed", `Successfully placed a ${numberFormatter(amount, {addCommaSeparators: true, prefixWithDollarSign: true})} bounty on ${player.name}.`, "Okay", "Close")).selection !== 1).toNumber();
                    }else{
                        return ((await showMessage(sourceEntity, "Bounty Canceled", `Your ${numberFormatter(amount, {addCommaSeparators: true, prefixWithDollarSign: true})} bounty on ${player.name} has been canceled.`, "Okay", "Close")).selection !== 1).toNumber();
                    }
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
