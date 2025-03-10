import { Player } from "@minecraft/server";
import { ActionFormData } from "@minecraft/server-ui";
import { uiSettings_main } from "./uiSettings_main";
import { securityVariables } from "security/ultraSecurityModeUtils";
import { showMessage } from "modules/utilities/functions/showMessage";
import { uiSettings_menuConfigurations } from "./uiSettings_menuConfigurations";
import { customFormUICodes } from "../constants/customFormUICodes";
import type { loosePlayerType } from "modules/utilities/types/loosePlayerType";
import { extractPlayerFromLooseEntityType } from "modules/utilities/functions/extractPlayerFromLooseEntityType";
import { chatRanksSettings } from "./chatRanksSettings";
import { nameTagsSettings } from "./nameTagsSettings";

export async function chatAndNameTagsSettings(sourceEntity: loosePlayerType): Promise<0 | 1> {
    const player = extractPlayerFromLooseEntityType(sourceEntity);
    while (true) {
        try {
            if (securityVariables.ultraSecurityModeEnabled) {
                if (securityVariables.testPlayerForPermission(player as Player, "andexdb.accessSettings") == false) {
                    const r = await showMessage(
                        player as Player,
                        "Access Denied (403)",
                        "You do not have permission to access this menu. You need the following permission to access this menu: andexdb.accessSettings",
                        "Back",
                        "Cancel"
                    );
                    if (r.canceled || r.selection == 0) {
                        return 1;
                    } else {
                        return 0;
                    }
                }
            }
            const form = new ActionFormData();
            form.title(customFormUICodes.action.titles.formStyles.gridMenu + "Chat & Name Tags Settings");
            form.button(`${customFormUICodes.action.buttons.positions.main_only}Chat Settings\n${config.chatRanks.disableCustomChatMessages ? "§cDisabled" : "§aEnabled"}`, "textures/ui/message");
            form.button(`${customFormUICodes.action.buttons.positions.main_only}Name Tags\nSettings\n${config.chatRanks.showRanksOnPlayerNameTags ? "§aEnabled" : "§cDisabled"}`, "textures/items/name_tag");
            form.button(customFormUICodes.action.buttons.positions.title_bar_only + "Back", "textures/ui/arrow_left");
            form.button(customFormUICodes.action.buttons.positions.title_bar_only + "Close", "textures/ui/crossout");
            form.button(customFormUICodes.action.buttons.positions.title_bar_only + "Reset Chat & Name Tags Settings", "textures/ui/reset_red");

            const r = await form.forceShow(player);
            if (r.canceled) return 1;

            let response = r.selection;
            switch ((["chatSettings", "nameTagsSettings", "back", "close", "reset"] as const)[response]) {
                case "chatSettings":
                    if ((await chatRanksSettings(player)) == 1) {
                        continue;
                    } else {
                        return 0;
                    }
                case "nameTagsSettings":
                    if ((await nameTagsSettings(player)) == 1) {
                        continue;
                    } else {
                        return 0;
                    }
                case "back":
                    return 1;
                case "close":
                    return 0;
                case "reset":
                    if (
                        (
                            await showMessage(
                                player as Player,
                                "Are You Sure?",
                                "Are you sure you want to reset all chat and name tags settings!?\nThis action cannot be undone!",
                                "Cancel",
                                "Confirm"
                            )
                        ).selection == 1
                    ) {
                        config.reset(config.chatRanks);
                        if (
                            (
                                await showMessage(
                                    player,
                                    "Reset Successful",
                                    `You have successfully reset all chat and name tags settings to the factory settings.`,
                                    "Okay",
                                    "Close"
                                )
                            ).selection !== 1
                        ) {
                            continue;
                        } else {
                            return 0;
                        }
                    } else {
                        if (
                            (
                                await showMessage(
                                    player,
                                    "Reset Canceled",
                                    `The reset of all chat and name tags settings to the factory settings has been canceled.`,
                                    "Okay",
                                    "Close"
                                )
                            ).selection !== 1
                        ) {
                            continue;
                        } else {
                            return 0;
                        }
                    }
                    continue;
                default:
                    throw new Error("Invalid selection: " + r.selection);
            }
        } catch (e) {
            console.error(e, e.stack);
            // Present the error to the user, and return 1 if they select "Back", and 0 if they select "Close".
            return ((await showMessage(player, "An Error occurred", `An error occurred: ${e}${e?.stack}`, "Back", "Close")).selection !== 1).toNumber();
        }
    }
}
