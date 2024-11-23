import { Entity, Player, world } from "@minecraft/server";
import { ActionFormData, ActionFormResponse, MessageFormData, MessageFormResponse, ModalFormData } from "@minecraft/server-ui";
import { MoneySystem } from "ExtraFeatures/money";
import { forceShow } from "modules/ui/functions/forceShow";
import { ban } from "modules/ban/classes/ban";
import { managePlayers_managePlayer_manageBans } from "./managePlayers_managePlayer_manageBans";
import { managePlayers_managePlayer_manageHomes } from "./managePlayers_managePlayer_manageHomes";
import type { savedPlayer } from "modules/player_save/classes/savedPlayer";
import { EquipmentSlots } from "modules/command_utilities/constants/EquipmentSlots";
import { showMessage } from "modules/utilities/functions/showMessage";

/**
 *
 * @todo Split each of the cases in the switch function into separate functions.
 * @param sourceEntity
 * @param player
 * @returns
 */
export async function managePlayers_managePlayer(
    sourceEntity: Entity,
    player: savedPlayer
): Promise<0 | 1> {
    let form2 = new ActionFormData();
    form2.title(player.name);
    form2.body(
        `UUID: ${player.id}\n${player.isOnline
            ? "Online"
            : "Last Online: " +
            new Date(player.lastOnline).formatDateTime(
                sourceEntity.timeZone,
                false,
                true
            )}\nData Format Version: ${player.format_version}${ban.testForIdBannedPlayer(player)
            ? "ID BANNED"
            : ban.testForIdBannedPlayer(player)
                ? "NAME BANNED"
                : ""}`
    );
    form2.button("Clear Data");
    form2.button("Show Data");
    form2.button("Check Inventory");
    if (semver.satisfies(
        player.player_save_format_version ?? "0.0.0",
        ">=1.5.0"
    )) {
        form2.button("Copy Inventory To Chest");
    }
    form2.button("Manage Bans");
    form2.button("Edit Money");
    form2.button("§4Manage Permissions§f(§cCOMING SOON!§f)");
    form2.button("§4Manage Hotbar Presets§f(§cCOMING SOON!§f)");
    form2.button("§4Manage Private Warps§f(§cCOMING SOON!§f)");
    form2.button("Manage Homes");
    form2.button("Back", "textures/ui/arrow_left");
    form2.button("Close", "textures/ui/crossout");
    return (await forceShow(form2, sourceEntity as Player)
        .then(async (ga) => {
            let g = ga as ActionFormResponse;
            if (g.canceled) {
                return 1;
            }
            switch (g.selection) {
                case 0:
                    let form3 = new MessageFormData();
                    form3.title("Confirm Player Data Clear");
                    form3.body(
                        `Are you sure you want to clear all of ${player.name}'s saved player data?\nThis action cannot be undone.`
                    );
                    form3.button2("Clear All Data");
                    form3.button1("Cancel");
                    return await forceShow(form3, sourceEntity as Player)
                        .then((ha) => {
                            let h = ha as MessageFormResponse;
                            if (h.canceled || h.selection == 0) {
                                return 1;
                            }
                            if (h.selection == 1) {
                                player.remove();
                                return 1;
                            }
                        })
                        .catch((e) => {
                            let formError = new MessageFormData();
                            formError.body(e + e.stack);
                            formError.title("Error");
                            formError.button1("Done");
                            formError.button2("Close");
                            forceShow(formError, sourceEntity as Player).then(
                                (r) => {
                                    return +(r.selection == 0);
                                }
                            );
                        });
                    break;
                case 1:
                    let form4 = new ActionFormData();
                    form4.title(`${player.name}'s Saved Player Data`);
                    form4.body(
                        `${
                /*arrayModifier(*/ JSON.stringify(
                            player
                        ).replaceAll(
                            /(?<!\\)(?![},:](\"|{\"))\"/g,
                            '§r§f"'
                        ) /*.split(""), (v, i)=>(Number(String((i/30).toFixed(4)))==Math.round(i/30)?"\n"+v:v))*/}`
                    );
                    form4.button("Done");
                    return await forceShow(form4, sourceEntity as Player)
                        .then(() => 1)
                        .catch((e) => {
                            let formError = new MessageFormData();
                            formError.body(e + e.stack);
                            formError.title("Error");
                            formError.button1("Done");
                            formError.button2("Close");
                            forceShow(formError, sourceEntity as Player).then(
                                (r) => {
                                    return +(r.selection == 0);
                                }
                            );
                        });
                    break;
                case 2:
                    let slotsArray = [];
                    let text = "";
                    if (semver.satisfies(
                        player.player_save_format_version ?? "0.0.0",
                        ">=1.5.0"
                    )) {
                        const items = player.getItems(sourceEntity);
                        Object.entries(items).forEachB((item) => {
                            if (!!item[1]) {
                                slotsArray = slotsArray.concat(
                                    String(
                                        "slot: " +
                                        item[0] +
                                        "§r§f, item: " +
                                        item[1].typeId +
                                        "§r§f, amount: " +
                                        item[1].amount +
                                        "§r§f, nameTag: " +
                                        item[1].nameTag +
                                        "§r§f, lore: " +
                                        JSONStringify(
                                            item[1].getLore() ?? [],
                                            true
                                        ) +
                                        "§r§f, enchantments: " +
                                        JSONStringify(
                                            tryget(() => item[1]
                                                .getComponent(
                                                    "enchantable"
                                                )
                                                .getEnchantments()
                                            ) ?? "N/A",
                                            true
                                        )
                                    )
                                );
                            } else {
                                slotsArray = slotsArray.concat(
                                    "slot: " + item[0] + ", item: minecraft:air"
                                );
                            }
                        });
                    } else {
                        let items = player.items.inventory.concat(
                            player.items.equipment
                        );
                        items.forEach((item) => {
                            if (item.count != 0) {
                                slotsArray = slotsArray.concat(
                                    String(
                                        "slot: " +
                                        item.slot +
                                        ", item: " +
                                        item.id +
                                        "§r§f, amount: " +
                                        item.count +
                                        ", nameTag: " +
                                        item.name +
                                        "§r§f, lore: " +
                                        JSONStringify(
                                            item.lore ?? [],
                                            true
                                        ) +
                                        "§r§f, enchantments: " +
                                        JSON.stringify(
                                            item.enchants ?? "N/A"
                                        )
                                    )
                                );
                            } else {
                                slotsArray = slotsArray.concat(
                                    "slot: " +
                                    item.slot +
                                    ", item: minecraft:air"
                                );
                            }
                        });
                    }
                    text = String(
                        "(format_version: " +
                        player.format_version +
                        ") " +
                        player.name +
                        (world
                            .getAllPlayers()
                            .find((p) => p.id == player.id) != undefined
                            ? " (Online)"
                            : " (last seen: " +
                            new Date(player.lastOnline).formatDateTime(
                                sourceEntity.timeZone
                            ) +
                            ")") +
                        " Items: \n" +
                        slotsArray.join("§r§f\n")
                    );
                    let form5 = new ActionFormData();
                    form5.title(`${player.name}'s Saved Inventory Data`);
                    form5.body(`${text}`);
                    form5.button("Done");
                    return await forceShow(form5, sourceEntity as Player)
                        .then((ha) => {
                            return 1;
                        })
                        .catch((e) => {
                            let formError = new MessageFormData();
                            formError.body(e + e.stack);
                            formError.title("Error");
                            formError.button1("Done");
                            formError.button2("Close");
                            forceShow(formError, sourceEntity as Player).then(
                                () => {
                                    return e;
                                }
                            );
                        });
                    break;
                case semver.satisfies(
                    player.player_save_format_version ?? "0.0.0",
                    ">=1.5.0"
                )
                    ? 3
                    : -3:
                    {
                        const items = player.getItems(sourceEntity);
                        const block2 = sourceEntity.dimension.getBlock(
                            sourceEntity.location
                        );
                        const block = sourceEntity.dimension.getBlock(
                            Vector.add(sourceEntity.location, Vector.up)
                        );
                        if (!!!block.getComponent("inventory")) {
                            block.setType("barrel");
                        }
                        if (!!!block2.getComponent("inventory")) {
                            block2.setType("barrel");
                        }
                        const bc = block.getComponent("inventory").container;
                        const bc2 = block2.getComponent("inventory").container;
                        for (let i = 0; i < 27; i++) {
                            bc.setItem(i, items[i]);
                        }
                        for (let i = 27; i < 36; i++) {
                            bc2.setItem(i - 27, items[i]);
                        }
                        for (let i = 0; i < 6; i++) {
                            bc2.setItem(
                                i + 9,
                                items[EquipmentSlots[i]]
                            );
                        }
                        bc2.setItem(15, items.Cursor);
                        return await managePlayers_managePlayer(
                            sourceEntity,
                            player
                        );
                    }
                    break;
                case +semver.satisfies(
                    player.player_save_format_version ?? "0.0.0",
                    ">=1.5.0"
                ) + 3:
                    if ((await managePlayers_managePlayer_manageBans(
                        sourceEntity,
                        player
                    )) == 1) {
                        return await managePlayers_managePlayer(
                            sourceEntity,
                            player
                        );
                    } else {
                        return 0;
                    }
                    break;
                case +semver.satisfies(
                    player.player_save_format_version ?? "0.0.0",
                    ">=1.5.0"
                ) + 4:
                    {
                        try {
                            return await new ModalFormData()
                                .textField(
                                    "Money",
                                    "int",
                                    MoneySystem.get(player.id).money.toString()
                                )
                                .forceShow(sourceEntity as Player)
                                .then(async (r) => {
                                    if (!!r.formValues[0].toBigInt()) {
                                        MoneySystem.get(player.id).setMoney(
                                            r.formValues[0].toBigInt()
                                        );
                                    } else {
                                        await showMessage(
                                            sourceEntity as Player,
                                            "Invalid Input",
                                            "The value you have inputted is not a valid amount of money.",
                                            "Okay",
                                            "Cancel"
                                        );
                                    }
                                    return 1;
                                });
                        } catch (e) {
                            console.error(e, e?.stack);
                            return 1;
                        }
                    }
                    break;
                case +semver.satisfies(
                    player.player_save_format_version ?? "0.0.0",
                    ">=1.5.0"
                ) + 8:
                    if ((await managePlayers_managePlayer_manageHomes(
                        sourceEntity,
                        player
                    )) == 1) {
                        return await managePlayers_managePlayer(
                            sourceEntity,
                            player
                        );
                    } else {
                        return 0;
                    }
                    return 1;
                    break;
                case +semver.satisfies(
                    player.player_save_format_version ?? "0.0.0",
                    ">=1.5.0"
                ) + 9:
                    return 1;
                    break;
                case +semver.satisfies(
                    player.player_save_format_version ?? "0.0.0",
                    ">=1.5.0"
                ) + 11:
                    return 0;
                    break;
                default:
                    return 1;
            }
        })
        .catch(async (e) => {
            let formError = new MessageFormData();
            formError.body(e + e.stack);
            formError.title("Error");
            formError.button1("Done");
            formError.button2("Close");
            return await forceShow(formError, sourceEntity as Player).then(
                (r) => {
                    return +(r.selection == 0);
                }
            );
        })) as 0 | 1;
}
