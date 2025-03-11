import { Entity, Player, world } from "@minecraft/server";
import { ActionFormData, ActionFormResponse, ModalFormData, ModalFormResponse, MessageFormData } from "@minecraft/server-ui";
import { forceShow } from "modules/ui/functions/forceShow";
import { ban_format_version } from "modules/ban/constants/ban_format_version";
import { ban } from "modules/ban/classes/ban";
import { executeCommandPlayerW } from "modules/commands/classes/executeCommandPlayerW";
import { showMessage } from "modules/utilities/functions/showMessage";
import { securityVariables } from "security/ultraSecurityModeUtils";
import { customFormUICodes } from "../constants/customFormUICodes";
import { extractPlayerFromLooseEntityType } from "modules/utilities/functions/extractPlayerFromLooseEntityType";
import type { loosePlayerType } from "modules/utilities/types/loosePlayerType";
import { parseDurationRelative } from "modules/utilities/functions/parseDuration";

/**
 * Manages the bans for a given source entity. This function displays a UI for managing bans,
 * including viewing valid and expired bans, adding new bans by ID or name, and unbanning players.
 *
 * @param sourceEntitya - The entity that is invoking the manage bans function. This can be an Entity, executeCommandPlayerW, or Player.
 *
 * @returns A promise that resolves to one of the following values:
 * - `1` if the operation was successful or canceled by the user.
 * - `0` if the user does not have the required permissions, or the player hit the close button.
 * - `-2` if an error occurred during the operation.
 */
// export async function manageBans(sourceEntitya: Entity | executeCommandPlayerW | Player): Promise<1 | 0 | -2> {
//     const sourceEntity = sourceEntitya instanceof executeCommandPlayerW ? sourceEntitya.player : sourceEntitya;
//     if (securityVariables.ultraSecurityModeEnabled) {
//         if (securityVariables.testPlayerForPermission(player, "andexdb.accessManageBansUI") == false) {
//             const r = await showMessage(
//                 player,
//                 "Access Denied (403)",
//                 "You do not have permission to access this menu. You need the following permission to access this menu: andexdb.accessManageBansUI",
//                 "Okay",
//                 "Cancel"
//             );
//             if (r.canceled || r.selection == 0) {
//                 return 1;
//             } else {
//                 return 0;
//             }
//         }
//     }
//     let form = new ActionFormData();
//     form.title(customFormUICodes.action.titles.formStyles.gridMenu + "Manage Bans");
//     // Have auto refresh enabled only for the first method call to get the bans.
//     ban.getValidBansAutoRefresh().idBans.forEach((p) => {
//         form.button(`${customFormUICodes.action.buttons.positions.main_only}${p.originalPlayerName ?? p.playerId}\nValid - ID Ban`, "textures/ui/online");
//     });
//     ban.getExpiredBansNoRefresh().idBans.forEach((p) => {
//         form.button(
//             `${customFormUICodes.action.buttons.positions.main_only}${p.originalPlayerName ?? p.playerId}\nExpired - ID Ban`,
//             "textures/ui/Ping_Offline_Red"
//         );
//     });
//     ban.getValidBansNoRefresh().nameBans.forEach((p) => {
//         form.button(`${customFormUICodes.action.buttons.positions.main_only}${p.playerName}\nValid - Name Ban`, "textures/ui/online");
//     });
//     ban.getExpiredBansNoRefresh().nameBans.forEach((p) => {
//         form.button(`${customFormUICodes.action.buttons.positions.main_only}${p.playerName}\nExpired - Name Ban`, "textures/ui/Ping_Offline_Red");
//     });
//     let banList = ban
//         .getValidBansNoRefresh()
//         .idBans.concat(ban.getExpiredBansNoRefresh().idBans)
//         .concat(ban.getValidBansNoRefresh().nameBans)
//         .concat(ban.getExpiredBansNoRefresh().nameBans);
//     if (banList.length === 0) form.body("There are currently no bans.");
//     form.button(
//         customFormUICodes.action.buttons.positions.left_side_only + customFormUICodes.action.buttons.styles.display_icon_as_text + "Add ID Ban",
//         "textures/ui/hammer_l_id_ban"
//     );
//     form.button(
//         customFormUICodes.action.buttons.positions.left_side_only + customFormUICodes.action.buttons.styles.display_icon_as_text + "Add Name Ban",
//         "textures/ui/hammer_l_name_ban"
//     );
//     form.button(customFormUICodes.action.buttons.positions.title_bar_only + "Back", "textures/ui/arrow_left");
//     form.button(customFormUICodes.action.buttons.positions.title_bar_only + "Close", "textures/ui/crossout");
//     return await forceShow(form, player)
//         .then(async (r) => {
//             if (r.canceled) {
//                 return 1 as const;
//             }
//             switch (r.selection) {
//                 case banList.length: {
//                     if (securityVariables.ultraSecurityModeEnabled) {
//                         if (securityVariables.testPlayerForPermission(player, "andexdb.banPlayers") == false) {
//                             const r = await showMessage(
//                                 player,
//                                 "Access Denied (403)",
//                                 "You do not have permission to access this menu. You need the following permission to access this menu: andexdb.banPlayers",
//                                 "Okay",
//                                 "Cancel"
//                             );
//                             if (r.canceled || r.selection == 0) {
//                                 return 1;
//                             } else {
//                                 return 0;
//                             }
//                         }
//                     }
//                     let form5 = new ModalFormData();
//                     form5.title(`${customFormUICodes.modal.titles.formStyles.medium}Add ID Ban`);
//                     form5.textField("Player UUID\nThis is the uuid of the player. ", "Integer");
//                     form5.textField("Ban Time (In Minutes)\nLeave blank to make the ban duration permanent.", "Decimal");
//                     form5.textField("Reason", "§cYOU HAVE BEEN BANNED BY THE BAN HAMMER", "");
//                     form5.submitButton("Ban");
//                     return await forceShow(form5, player)
//                         .then((ha) => {
//                             let h = ha as ModalFormResponse;
//                             if (h.canceled) {
//                                 return 1 as const;
//                             }
//                             ban.saveBan({
//                                 removeAfterBanExpires: false,
//                                 ban_format_version: ban_format_version,
//                                 banDate: Date.now(),
//                                 playerId: String(h.formValues[0]),
//                                 originalPlayerName: undefined,
//                                 type: "id",
//                                 bannedById: sourceEntity.id,
//                                 bannedByName: (player)?.name ?? sourceEntity?.nameTag,
//                                 banId: "banId:" + Date.now() + ":" + (h.formValues[0] as string),
//                                 unbanDate:
//                                     (h.formValues[1] as string).trim() === "" ? Infinity : Number((h.formValues[1] as string).trim()) * 60000 + Date.now(),
//                                 format_version: format_version,
//                                 reason:
//                                     JSON.stringify(h.formValues[2] === "" ? "§cYOU HAVE BEEN BANNED BY THE BAN HAMMER" : h.formValues[2]).slice(0, -1) +
//                                     '\\n§r§cBanned By: {bannedByName}\\nBanned Until: {unbanDate}\\nBanned On: {banDate}\\nTime Remaining: {timeRemaining}"',
//                             });
//                             return 1;
//                         })
//                         .catch(async (e) => {
//                             let formError = new MessageFormData();
//                             formError.body(e + e.stack);
//                             formError.title("Error");
//                             formError.button1("Done");
//                             return await forceShow(formError, player).then(() => {
//                                 return -2 as const;
//                             });
//                         });
//                 }
//                 case banList.length + 1:
//                     if (securityVariables.ultraSecurityModeEnabled) {
//                         if (securityVariables.testPlayerForPermission(player, "andexdb.banPlayers") == false) {
//                             const r = await showMessage(
//                                 player,
//                                 "Access Denied (403)",
//                                 "You do not have permission to access this menu. You need the following permission to access this menu: andexdb.banPlayers",
//                                 "Okay",
//                                 "Cancel"
//                             );
//                             if (r.canceled || r.selection == 0) {
//                                 return 1;
//                             } else {
//                                 return 0;
//                             }
//                         }
//                     }
//                     let form6 = new ModalFormData();
//                     form6.title(`${customFormUICodes.modal.titles.formStyles.medium}Add Name Ban`);
//                     form6.textField("Player Name\nThis is the name of the player. ", "String");
//                     form6.textField("Ban Time (In Minutes)", "Decimal");
//                     form6.textField("Reason", "§cYOU HAVE BEEN BANNED BY THE BAN HAMMER", "");
//                     form6.submitButton("Ban");
//                     return await forceShow(form6, player)
//                         .then((ha) => {
//                             let h = ha as ModalFormResponse;
//                             if (h.canceled) {
//                                 return 1 as const;
//                             }
//                             ban.saveBan({
//                                 removeAfterBanExpires: false,
//                                 ban_format_version: ban_format_version,
//                                 banDate: Date.now(),
//                                 originalPlayerId: undefined,
//                                 playerName: String(h.formValues[0]),
//                                 type: "name",
//                                 bannedById: sourceEntity.id,
//                                 bannedByName: (player)?.name ?? sourceEntity?.nameTag,
//                                 banId: "ban:" + Date.now() + ":" + String(h.formValues[0]),
//                                 unbanDate:
//                                     (h.formValues[1] as string).trim() === "" ? Infinity : Number((h.formValues[1] as string).trim()) * 60000 + Date.now(),
//                                 format_version: format_version,
//                                 reason:
//                                     JSON.stringify(h.formValues[2] === "" ? "§cYOU HAVE BEEN BANNED BY THE BAN HAMMER" : h.formValues[2]).slice(0, -1) +
//                                     '\\n§r§cBanned By: {bannedByName}\\nBanned Until: {unbanDate}\\nBanned On: {banDate}\\nTime Remaining: {timeRemaining}"',
//                             });
//                             // Manually refresh the ban list after adding the ban so the player will be kicked as soon as possible if they are online, and so the ban will show in the manage bans menu immediately'.
//                             ban.refreshBans();
//                             return 1;
//                         })
//                         .catch(async (e) => {
//                             let formError = new MessageFormData();
//                             formError.body(e + e.stack);
//                             formError.title("Error");
//                             formError.button1("Done");
//                             return await forceShow(formError, player).then(() => {
//                                 return -2 as const;
//                             });
//                         });
//                     break;
//                 case banList.length + 2:
//                     return 1;
//                     break; /*
//         case banList.length+3:
//         backMenuFunction(sourceEntity)
//         break
//         case banList.length+4:
//         backMenuFunction(sourceEntity)*/

//                     break;
//                 case banList.length + 3:
//                     return 0;
//                     break;
//                 default:
//                     let form4 = new ActionFormData();
//                     form4.title(customFormUICodes.action.titles.formStyles.medium + `Manage Ban`);
//                     let ba = banList[r.selection];
//                     let timeRemaining = ba.timeRemaining;
//                     form4.body(
//                         `§bformat_version: §e${ba.format_version}\n§r§bban_format_version: §e${ba.ban_format_version}\n§r§bbanId: §6${ba.banId}\n§r§btype: §a${
//                             ba.type
//                         }\ntimeRemaining: ${timeRemaining.days}d, ${timeRemaining.hours}h ${timeRemaining.minutes}m ${timeRemaining.seconds}s ${
//                             timeRemaining.milliseconds
//                         }ms\n§r§bbanDate: §q${
//                             new Date(
//                                 Number(ba.banDate) +
//                                     Number(
//                                         sourceEntity.getDynamicProperty("andexdbPersonalSettings:timeZone") ??
//                                             world.getDynamicProperty("andexdbSettings:timeZone") ??
//                                             0
//                                     ) *
//                                         3600000
//                             ).toLocaleString() +
//                             (Number(
//                                 sourceEntity.getDynamicProperty("andexdbPersonalSettings:timeZone") ?? world.getDynamicProperty("andexdbSettings:timeZone") ?? 0
//                             ) < 0
//                                 ? " UTC"
//                                 : " UTC+") +
//                             Number(
//                                 sourceEntity.getDynamicProperty("andexdbPersonalSettings:timeZone") ?? world.getDynamicProperty("andexdbSettings:timeZone") ?? 0
//                             )
//                         }\n§r§bunbanDate: §q${
//                             new Date(
//                                 Number(ba.unbanDate) +
//                                     Number(
//                                         sourceEntity.getDynamicProperty("andexdbPersonalSettings:timeZone") ??
//                                             world.getDynamicProperty("andexdbSettings:timeZone") ??
//                                             0
//                                     ) *
//                                         3600000
//                             ).toLocaleString() +
//                             (Number(
//                                 sourceEntity.getDynamicProperty("andexdbPersonalSettings:timeZone") ?? world.getDynamicProperty("andexdbSettings:timeZone") ?? 0
//                             ) < 0
//                                 ? " UTC"
//                                 : " UTC+") +
//                             Number(
//                                 sourceEntity.getDynamicProperty("andexdbPersonalSettings:timeZone") ?? world.getDynamicProperty("andexdbSettings:timeZone") ?? 0
//                             )
//                         }\n§r§b${ba.type == "id" ? "playerId" : "originalPlayerId"}: §6${ba.type == "id" ? ba.playerId : ba.originalPlayerId}\n§r§b${
//                             ba.type == "id" ? "originalPlayerName" : "playerName"
//                         }: §6${ba.type == "id" ? ba.originalPlayerName : ba.playerName}\n§r§bbannedByName: §a${ba.bannedByName}\n§r§bbannedById: §6${
//                             ba.bannedById
//                         }\n§r§bremoveAfterBanExpires: §d${ba.removeAfterBanExpires}\n§r§breason: §r§f${ba.reason}\n§r§b${
//                             /*JSON.stringify(banList[g.selection]).replaceAll(/(?<!\\)(?![},:](\"|{\"))\"/g, "§r§f\"")*/ ""
//                         }`
//                     );
//                     form4.button(customFormUICodes.action.buttons.positions.main_only + "Unban", "textures/ui/trash_default");
//                     form4.button(customFormUICodes.action.buttons.positions.title_bar_only + "Back", "textures/ui/arrow_left");
//                     form4.button(customFormUICodes.action.buttons.positions.title_bar_only + "Close", "textures/ui/crossout");
//                     return await forceShow(form4, player)
//                         .then(async (ha) => {
//                             let h = ha as ActionFormResponse;
//                             if (h.canceled) {
//                                 return 1 as const;
//                             }
//                             if (h.selection == 0) {
//                                 if (securityVariables.ultraSecurityModeEnabled) {
//                                     if (securityVariables.testPlayerForPermission(player, "andexdb.unbanPlayers") == false) {
//                                         const r = await showMessage(
//                                             player,
//                                             "Access Denied (403)",
//                                             "You do not have permission to unban players. You need the following permission to unban players: andexdb.unbanPlayers",
//                                             "Okay",
//                                             "Cancel"
//                                         );
//                                         if (r.canceled || r.selection === 0) {
//                                             return 1;
//                                         } else {
//                                             return 0;
//                                         }
//                                     }
//                                 }
//                                 const r = await showMessage(
//                                     player,
//                                     "Are you sure?",
//                                     `Are you sure you want to unban ${ba.playerName ?? ba.originalPlayerName}<${ba.playerId ?? ba.originalPlayerId}>?`,
//                                     "Unban",
//                                     "Cancel"
//                                 );
//                                 if (r.canceled || r.selection === 1) {
//                                     return 0;
//                                 } else {
//                                     banList[r.selection].remove();
//                                     return 1;
//                                 }
//                             }
//                             if (h.selection === 1) {
//                                 return 1;
//                             }
//                             if (h.selection === 2) {
//                                 return 0;
//                             }
//                         })
//                         .catch(async (e) => {
//                             let formError = new MessageFormData();
//                             formError.body(e + e.stack);
//                             formError.title("Error");
//                             formError.button1("Done");
//                             return await forceShow(formError, player).then(() => {
//                                 return -2 as const;
//                             });
//                         });
//             }
//         })
//         .catch(async (e) => {
//             let formError = new MessageFormData();
//             formError.body(e + e.stack);
//             formError.title("Error");
//             formError.button1("Done");
//             return await forceShow(formError, player).then(() => {
//                 return -2 as const;
//             });
//         });
// }

/**
 *
 *
 * @param {loosePlayerType} sourceEntity - The player accessing the menu.
 * @param {number} [pagen] - The page of the menu to go to. Defaults to 0.
 * @param {number} [maxentriesperpage] - How many entries to show per page. Defaults to the value of {@linkcode config.ui.pages.maxPlayersPerManagePlayersPage}.
 * @returns {Promise<0 | 1>} A promise that resolves to `0` if the previous menu should be closed, or `1` if the previous menu should be reopened.
 * @throws {TypeError} If sourceEntity is not an instance of the Player class or an instance of the executeCommandPlayerW class with a Player linked to it.
 */
export async function manageBans(
    sourceEntity: loosePlayerType,
    pagen: number = 0,
    maxentriesperpage: number = config.ui.pages.maxPlayersPerManagePlayersPage ?? 9,
    search?: {
        value: string;
        caseSensitive?: boolean;
        searchNames?: boolean;
        searchIds?: boolean;
    },
    cachedEntries?: [ban, "id" | "name", "valid" | "expired"][]
): Promise<0 | 1> {
    const player = extractPlayerFromLooseEntityType(sourceEntity);
    [].sort;
    var currentParameters = {
        player,
        pagen,
        maxentriesperpage,
        search,
        cachedEntries,
    };
    while (true) {
        const { player, pagen, maxentriesperpage, search, cachedEntries } = currentParameters;
        let form = new ActionFormData();
        const page = Math.max(0, pagen);
        let displayEntries: [ban, "id" | "name", "valid" | "expired"][] = cachedEntries ?? [];
        if (cachedEntries === undefined) {
            displayEntries = [
                ...ban.getValidBansAutoRefresh().idBans.map((v) => [v, "id", "valid"] as [ban, "id" | "name", "valid" | "expired"]),
                ...ban.getExpiredBansNoRefresh().idBans.map((v) => [v, "id", "expired"] as [ban, "id" | "name", "valid" | "expired"]),
                ...ban.getValidBansNoRefresh().nameBans.map((v) => [v, "name", "valid"] as [ban, "id" | "name", "valid" | "expired"]),
                ...ban.getExpiredBansNoRefresh().nameBans.map((v) => [v, "name", "expired"] as [ban, "id" | "name", "valid" | "expired"]),
            ].filter((v) =>
                !!search
                    ? (search.searchNames !== false
                          ? search.caseSensitive == true
                              ? (v[0].originalPlayerName ?? v[0].playerName ?? "").includes(search.value)
                              : (v[0].originalPlayerName ?? v[0].playerName ?? "").toLowerCase().includes(search.value.toLowerCase())
                          : true) &&
                      (search.searchIds === true
                          ? search.caseSensitive == true
                              ? (v[0].originalPlayerId?.toString() ?? v[0].playerId?.toString() ?? "").includes(search.value)
                              : (v[0].originalPlayerId?.toString() ?? v[0].playerId?.toString() ?? "").toLowerCase().includes(search.value.toLowerCase())
                          : true)
                    : true
            );
        }
        const numentries = displayEntries.length;
        form.title(
            `${customFormUICodes.action.titles.formStyles.gridMenu}${!!search ? "Search Results" : ""} ${Math.min(
                numentries,
                page * maxentriesperpage + 1
            )}-${Math.min(numentries, (page + 1) * maxentriesperpage)} of ${numentries}`
        );
        const numpages = Math.ceil(numentries / maxentriesperpage);
        if (!!search) {
            form.body(
                `${numentries === 0 ? "No results." : ""}\nSearching for: ${JSON.stringify(search.value)}\nCase Sensitive: ${JSON.stringify(
                    search.caseSensitive ?? false
                )}`
            );
        } else {
            form.body(`${numentries === 0 ? "There are currently no bans." : ""}`);
        }
        // Navigation and Filters
        form.button(customFormUICodes.action.buttons.positions.left_side_only + "Search", "textures/ui/spyglass_flat");
        form.button(
            customFormUICodes.action.buttons.positions.left_side_only +
                (page != 0 ? "" : customFormUICodes.action.buttons.options.disabled + "§8") +
                "Previous Page",
            "textures/ui/arrow_left"
        );
        form.button(
            customFormUICodes.action.buttons.positions.left_side_only +
                (numpages > 1 ? "" : customFormUICodes.action.buttons.options.disabled + "§8") +
                "Go To Page",
            "textures/ui/page"
        );
        form.button(
            customFormUICodes.action.buttons.positions.left_side_only +
                (page < numpages - 1 ? "" : customFormUICodes.action.buttons.options.disabled + "§8") +
                "Next Page",
            "textures/ui/arrow_right"
        );
        // Padding
        form.button("");
        form.button("");
        // Entries
        let displayEntriesB = displayEntries.slice(page * maxentriesperpage, (page + 1) * maxentriesperpage);
        displayEntriesB.forEach((v) => {
            switch (true) {
                case v[1] === "id" && v[2] === "valid":
                    form.button(
                        `${customFormUICodes.action.buttons.positions.main_only}${v[0].originalPlayerName ?? v[0].playerId}\nValid - ID Ban`,
                        "textures/ui/online_id"
                    );
                    break;
                case v[1] === "id" && v[2] === "expired":
                    form.button(
                        `${customFormUICodes.action.buttons.positions.main_only}${v[0].originalPlayerName ?? v[0].playerId}\nExpired - ID Ban`,
                        "textures/ui/Ping_Offline_Red_id"
                    );
                    break;
                case v[1] === "name" && v[2] === "valid":
                    form.button(`${customFormUICodes.action.buttons.positions.main_only}${v[0].playerName}\nValid - Name Ban`, "textures/ui/online_name");
                    break;
                case v[1] === "name" && v[2] === "expired":
                    form.button(
                        `${customFormUICodes.action.buttons.positions.main_only}${v[0].playerName}\nExpired - Name Ban`,
                        "textures/ui/Ping_Offline_Red_name"
                    );
            }
            // form.button(customFormUICodes.action.buttons.positions.main_only + v[0].originalPlayerId, "loading_spinner");
        });
        form.button(
            customFormUICodes.action.buttons.positions.left_side_only + customFormUICodes.action.buttons.styles.display_icon_as_text + "Add ID Ban",
            "textures/ui/hammer_l_id_ban"
        );
        form.button(
            customFormUICodes.action.buttons.positions.left_side_only + customFormUICodes.action.buttons.styles.display_icon_as_text + "Add Name Ban",
            "textures/ui/hammer_l_name_ban"
        );
        form.button(customFormUICodes.action.buttons.positions.title_bar_only + "Back", "textures/ui/arrow_left");
        form.button(customFormUICodes.action.buttons.positions.title_bar_only + "Close", "textures/ui/crossout");
        form.button(customFormUICodes.action.buttons.positions.title_bar_only + "Refresh", "textures/ui/refresh");
        try {
            const r = await forceShow(form, player);
            if (r.canceled) return 1;

            switch (
                (["search", "previous", "go", "next", "", ""] as const)[r.selection] ??
                (!!displayEntriesB[r.selection - 6] ? "entry" : undefined) ??
                (["addIDBan", "addNameBan", "back", "close", "refresh"] as const)[r.selection - displayEntriesB.length - 6]
            ) {
                case "search":
                    {
                        const r = await tryget(
                            async () =>
                                await new ModalFormData()
                                    .title("Search")
                                    .textField("", "Search", search?.value ?? "")
                                    .toggle("Case Sensitive", search?.caseSensitive ?? false)
                                    .toggle("Search Player Names", search?.searchNames ?? true)
                                    .toggle("Search Player IDs", search?.searchIds ?? true)
                                    .submitButton("Search")
                                    .forceShow(player)
                        );
                        if (!!!r || r.canceled == true) {
                            continue;
                        }
                        currentParameters = {
                            player,
                            pagen: undefined,
                            maxentriesperpage,
                            search: {
                                value: r.formValues[0] as string,
                                caseSensitive: r.formValues[1] as boolean,
                            },
                            cachedEntries: undefined,
                        };
                    }
                    continue;
                case "previous":
                    currentParameters = { player, pagen: Math.max(0, page - 1), maxentriesperpage, search, cachedEntries };
                    continue;
                case "go": {
                    const r = await tryget(
                        async () =>
                            await new ModalFormData()
                                .title("Go To Page")
                                .textField(`Current Page: ${page + 1}\nPage # (Between 1 and ${numpages})`, "Page #")
                                .submitButton("Go To Page")
                                .forceShow(player)
                    );
                    currentParameters = {
                        player,
                        pagen: Math.max(1, Math.min(numpages, (r.formValues?.[0] as string)?.toNumber() ?? page + 1)) - 1,
                        maxentriesperpage,
                        search,
                        cachedEntries: displayEntries,
                    };
                    continue;
                }
                case "next":
                    currentParameters = { player, pagen: Math.min(numpages - 1, page + 1), maxentriesperpage, search, cachedEntries: displayEntries };
                    continue;
                case "entry":
                    if ((await manageBan(player, displayEntriesB[r.selection - 6][0])) === 1) {
                        currentParameters = { player, pagen: page, maxentriesperpage, search, cachedEntries: displayEntries };
                        continue;
                    } else {
                        return 0;
                    }
                case "addIDBan":
                    if ((await addIDBan(player)) === 1) {
                        currentParameters = { player, pagen: page, maxentriesperpage, search, cachedEntries: displayEntries };
                        continue;
                    } else {
                        return 0;
                    }/* 
                case "addNameBan":
                    if ((await addNameBan(player)) === 1) {
                        currentParameters = { player, pagen: page, maxentriesperpage, search, cachedEntries: displayEntries };
                        continue;
                    } else {
                        return 0;
                    } */
                case "refresh":
                    currentParameters = { player, pagen: page, maxentriesperpage, search, cachedEntries: undefined };
                    continue;
                case "back":
                    return 1;
                case "close":
                    return 0;
                default:
                    throw new Error(`Invalid selection: ${r.selection}`);
            }
        } catch (e) {
            console.error(e, e.stack);
            // Present the error to the user, and return 1 if they select "Back", and 0 if they select "Close".
            return ((await showMessage(player, "An Error occurred", `An error occurred: ${e}${e?.stack}`, "Back", "Close")).selection !== 1).toNumber();
        }
    }
}

/**
 * The menu for managing a ban on a player.
 *
 * @param {loosePlayerType} sourceEntity - The player viewing the UI.
 * @returns {Promise<0 | 1>} A promise that resolves to `0` if the previous menu should be closed, or `1` if the previous menu should be reopened.
 * @throws {TypeError} If sourceEntity is not an instance of the Player class or an instance of the executeCommandPlayerW class with a Player linked to it.
 */
export async function manageBan(sourceEntity: loosePlayerType, ban: ban): Promise<0 | 1> {
    const player = extractPlayerFromLooseEntityType(sourceEntity);
    while (true) {
        try {
            let form = new ActionFormData();
            form.title(customFormUICodes.action.titles.formStyles.medium + "Manage Ban");
            const isPermanent = ban.isPermanent;
            const timeRemaining = isPermanent
                ? { days: Infinity, hours: Infinity, minutes: Infinity, seconds: Infinity, milliseconds: Infinity }
                : ban.timeRemaining;
            const duration = isPermanent ? timeRemaining : ban.duration;
            const timeZone = player.timeZone;
            form.body(
                `§bformat_version: §e${ban.format_version}\n§r§bban_format_version: §e${ban.ban_format_version}\n§r§bbanId: §6${ban.banId}\n§r§btype: §a${
                    ban.type
                }\n§r§bBan Duration: §q${
                    isPermanent ? "Permanent" : `${duration.days}d, ${duration.hours}h ${duration.minutes}m ${duration.seconds}s ${duration.milliseconds}ms`
                }${
                    isPermanent
                        ? ""
                        : `\n§r§btime Remaining: §q${timeRemaining.days}d, ${timeRemaining.hours}h ${timeRemaining.minutes}m ${timeRemaining.seconds}s ${timeRemaining.milliseconds}ms`
                }\n§r§bBan Date: §q${
                    formatDateTime(new Date(ban.banDate), timeZone) + " UTC" + (timeZone > 0 || Object.is(timeZone, 0) ? "+" : "") + timeZone
                }${
                    isPermanent
                        ? ""
                        : `\n§r§bUnban Date: §q${
                              formatDateTime(new Date(ban.unbanDate), timeZone) + " UTC" + (timeZone > 0 || Object.is(timeZone, 0) ? "+" : "") + timeZone
                          }`
                }\n§r§b${ban.type == "id" ? "Player ID" : "Original Player ID"}: §6${ban.type == "id" ? ban.playerId : ban.originalPlayerId}\n§r§b${
                    ban.type == "id" ? "Original Player Name" : "Player Name"
                }: §6${ban.type == "id" ? ban.originalPlayerName : ban.playerName}\n§r§bBanned By: §a${ban.bannedByName ?? "Unknown Name"}<${
                    ban.bannedById ?? "Unknown ID"
                }>\n§r§bremoveAfterBanExpires: §d${ban.removeAfterBanExpires}\n§r§breason: §r§f${ban.reason}\n§r§b${
                    /*JSON.stringify(banList[g.selection]).replaceAll(/(?<!\\)(?![},:](\"|{\"))\"/g, "§r§f\"")*/ ""
                }`
            );
            form.button(customFormUICodes.action.buttons.positions.main_only + "Unban", "textures/ui/trash_default");
            form.button(customFormUICodes.action.buttons.positions.title_bar_only + "Back", "textures/ui/arrow_left");
            form.button(customFormUICodes.action.buttons.positions.title_bar_only + "Close", "textures/ui/crossout");
            const r = await form.forceShow(player);
            if (r.canceled) return 1 as const;
            switch ((["unban", "back", "close"] as const)[r.selection]) {
                case "unban":
                    if ((await unbanPlayer(player, ban)) === 1) {
                        continue;
                    } else {
                        return 0;
                    }
                case "back":
                    return 1;
                case "close":
                    return 0;
            }
        } catch (e) {
            console.error(e, e.stack);
            // Present the error to the user, and return 1 if they select "Back", and 0 if they select "Close".
            return ((await showMessage(player, "An Error occurred", `An error occurred: ${e}${e?.stack}`, "Back", "Close")).selection !== 1).toNumber();
        }
    }
}

/**
 * Shows a UI for unbanning a player.
 *
 * This menu prompts players to confirm the unbanning of the specified player, and unbans they player if they confirm.
 *
 * @param {loosePlayerType} sourceEntity - The player viewing the UI.
 * @returns {Promise<0 | 1>} A promise that resolves to `0` if the previous menu should be closed, or `1` if the previous menu should be reopened.
 * @throws {TypeError} If sourceEntity is not an instance of the Player class or an instance of the executeCommandPlayerW class with a Player linked to it.
 */
export async function unbanPlayer(sourceEntity: loosePlayerType, selectedBan: ban): Promise<0 | 1> {
    const player = extractPlayerFromLooseEntityType(sourceEntity);
    try {
        if (securityVariables.ultraSecurityModeEnabled) {
            if (securityVariables.testPlayerForPermission(player, "andexdb.unbanPlayers") == false) {
                const r = await showMessage(
                    player,
                    "Access Denied (403)",
                    "You do not have permission to unban players. You need the following permission to unban players: andexdb.unbanPlayers",
                    "Okay",
                    "Cancel"
                );
                if (r.canceled || r.selection === 0) {
                    return 1;
                } else {
                    return 0;
                }
            }
        }
        const r = await showMessage(
            player,
            "Are you sure?",
            `Are you sure you want to unban ${selectedBan.playerName ?? selectedBan.originalPlayerName ?? "Unknown Name"}<${
                selectedBan.playerId ?? selectedBan.originalPlayerId ?? "Unknown ID"
            }>?`,
            "Cancel",
            "Unban"
        );
        if (r.canceled) return 1 as const;
        switch ((["cancel", "unban"] as const)[r.selection]) {
            case "cancel": {
                return (
                    (
                        await showMessage(
                            player,
                            "Unban Canceled",
                            `The unban of ${selectedBan.playerName ?? selectedBan.originalPlayerName ?? "Unknown Name"}<${
                                selectedBan.playerId ?? selectedBan.originalPlayerId ?? "Unknown ID"
                            }> has been sucessfully canceled.`,
                            "Back",
                            "Close"
                        )
                    ).selection !== 1
                ).toNumber();
            }
            case "unban": {
                selectedBan.remove();
                return (
                    (
                        await showMessage(
                            player,
                            "Player Unbanned",
                            `${selectedBan.playerName ?? selectedBan.originalPlayerName ?? "Unknown Name"}<${
                                selectedBan.playerId ?? selectedBan.originalPlayerId ?? "Unknown ID"
                            }> has been sucessfully unbanned.`,
                            "Back",
                            "Close"
                        )
                    ).selection !== 1
                ).toNumber();
            }
        }
    } catch (e) {
        console.error(e, e.stack);
        // Present the error to the user, and return 1 if they select "Back", and 0 if they select "Close".
        return ((await showMessage(player, "An Error occurred", `An error occurred: ${e}${e?.stack}`, "Back", "Close")).selection !== 1).toNumber();
    }
}

export async function addIDBan(sourceEntity: loosePlayerType): Promise<0 | 1> {
    const player = extractPlayerFromLooseEntityType(sourceEntity);
    while (true) {
        try {
            if (securityVariables.ultraSecurityModeEnabled) {
                if (securityVariables.testPlayerForPermission(player, "andexdb.banPlayers") == false) {
                    const r = await showMessage(
                        player,
                        "Access Denied (403)",
                        "You do not have permission to access this menu. You need the following permission to access this menu: andexdb.banPlayers",
                        "Okay",
                        "Cancel"
                    );
                    if (r.canceled || r.selection == 0) {
                        return 1;
                    } else {
                        return 0;
                    }
                }
            }
            let form = new ModalFormData();
            form.title(`${customFormUICodes.modal.titles.formStyles.medium}Add ID Ban`);
            form.textField("Player UUID\nThis is the uuid of the player. ", "Integer");
            form.textField("Ban Time (In Minutes)\nLeave blank to make the ban duration permanent.", "Decimal");
            form.textField("Reason", "§cYOU HAVE BEEN BANNED BY THE BAN HAMMER", "");
            form.submitButton("Ban");
            const r = await forceShow(form, player);
            if (r.canceled) {
                return 1 as const;
            }
            const banDate = Date.now();
            ban.saveBan({
                removeAfterBanExpires: false,
                ban_format_version: ban_format_version,
                banDate:banDate,
                playerId: r.formValues[0] as string,
                originalPlayerName: undefined,
                type: "id",
                bannedById: player.id,
                bannedByName: player?.name ?? player?.nameTag,
                banId: "banId:" + Date.now() + ":" + (r.formValues[0] as string),
                unbanDate: (r.formValues[1] as string).trim() === "" ? Infinity : parseDurationRelative(r.formValues[1] as string, banDate) * 60000 + Date.now(),
                format_version: format_version,
                reason: r.formValues[2] === "" ? "§cYOU HAVE BEEN BANNED BY THE BAN HAMMER" : (r.formValues[2] as string),
                hasAdvancedReason: false,
            });
            return 1;
        } catch (e) {
            console.error(e, e.stack);
            // Present the error to the user, and return 1 if they select "Back", and 0 if they select "Close".
            return ((await showMessage(player, "An Error occurred", `An error occurred: ${e}${e?.stack}`, "Back", "Close")).selection !== 1).toNumber();
        }
    }
}
