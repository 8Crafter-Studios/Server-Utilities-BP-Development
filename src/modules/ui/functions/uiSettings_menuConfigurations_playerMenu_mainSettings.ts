import type { Entity, Player } from "@minecraft/server";
import { ModalFormData, ModalFormResponse } from "@minecraft/server-ui";
import { config } from "init/classes/config";
import { forceShow } from "modules/ui/functions/forceShow";
import { executeCommandPlayerW } from "modules/commands/classes/executeCommandPlayerW";
import { securityVariables } from "security/ultraSecurityModeUtils";
import { showMessage } from "modules/utilities/functions/showMessage";

/**
 * Displays and handles the main player menu settings form for a given entity.
 *
 * @param sourceEntitya - The entity that initiated the request. Can be an instance of `Entity`, `executeCommandPlayerW`, or `Player`.
 * @returns A promise that resolves to:
 * - `1` if the operation was successful or the form was canceled.
 * - `0` if the user selected "Cancel" in the access denied message.
 *
 * The function performs the following steps:
 * 1. Checks if ultra security mode is enabled.
 * 2. If enabled, verifies if the player has the required permission to access the settings.
 * 3. If the player lacks permission, displays an access denied message.
 * 4. If the player has permission or ultra security mode is disabled, displays the UI settings form.
 * 5. Updates the configuration based on the form input.
 * 6. Returns the appropriate status code based on the outcome.
 */
export async function uiSettings_menuConfigurations_playerMenu_mainSettings(sourceEntitya: Entity | executeCommandPlayerW | Player): Promise<1 | 0> {
    const sourceEntity = sourceEntitya instanceof executeCommandPlayerW ? sourceEntitya.player : (sourceEntitya as Player);
    if (securityVariables.ultraSecurityModeEnabled) {
        if (securityVariables.testPlayerForPermission(sourceEntity as Player, "andexdb.accessSettings") == false) {
            const r = await showMessage(
                sourceEntity as Player,
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
    const menuConfig = config.ui.menus.playerMenu;
    type optionsList = {
        enabled: boolean;
        showDeprecatedButtons: boolean;
        showExperimentalButtons: boolean;
        showNonFunctionalButtons: boolean;
        showUnusedButtons: boolean;
        showUpcomingButtons: boolean;
        itemName: string;
    };
    const includedOptions = [
        "enabled",
        // "showDeprecatedButtons",
        // "showExperimentalButtons",
        // "showNonFunctionalButtons",
        // "showUnusedButtons",
        "showUpcomingButtons",
        "itemName",
    ] as (keyof optionsList)[];
    const form = new ModalFormData();
    form.title("Player Menu Settings");
    const formOptionsMap = {
        enabled: () => form.toggle("§l§fEnabled§r§f\nWhether or not the player menu is enabled. Defaults to true.", menuConfig.enabled),
        showDeprecatedButtons: () =>
            form.toggle("§l§fShow Deprecated Buttons§r§f\nWhether or to show deprecated buttons. Defaults to true.", menuConfig.showDeprecatedButtons),
        showExperimentalButtons: () =>
            form.toggle("§l§fShow Experimental Buttons§r§f\nWhether or to show experimental buttons. Defaults to true.", menuConfig.showExperimentalButtons),
        showNonFunctionalButtons: () =>
            form.toggle("§l§fShow Non-Functional Buttons§r§f\nWhether or to show non-functional buttons. Defaults to true.", menuConfig.showNonFunctionalButtons),
        showUnusedButtons: () =>
            form.toggle("§l§fShow Unused Buttons§r§f\nWhether or to show unused buttons. Defaults to true.", menuConfig.showUnusedButtons),
        showUpcomingButtons: () =>
            form.toggle("§l§fShow Upcoming Buttons§r§f\nWhether or to show buttons that are placeholders for upcoming features. Defaults to true.", menuConfig.showUpcomingButtons),
        itemName: () =>
            form.textField(
                '§l§fPlayer Menu Item Name§r§f\nThe item name for the item that opens the player menu. Defaults to "Menu".',
                "item name",
                menuConfig.itemName
            ),
    } as { [key in keyof optionsList]: () => any };
    includedOptions.forEach((o) => formOptionsMap[o]());
    form.submitButton("Save");
    return await forceShow(form, sourceEntity as Player)
        .then((r) => {
            if (r.canceled) {
                return 1 as const;
            }
            const options = Object.fromEntries(includedOptions.map((o, i) => [o, r.formValues[i] as optionsList[typeof o]])) as Partial<optionsList>;
            includedOptions.forEach((v: keyof optionsList) => {
                switch (v) {
                    case "enabled":
                        menuConfig.enabled = options[v];
                        break;
                    case "showDeprecatedButtons":
                        menuConfig.showDeprecatedButtons = options[v];
                        break;
                    case "showExperimentalButtons":
                        menuConfig.showExperimentalButtons = options[v];
                        break;
                    case "showNonFunctionalButtons":
                        menuConfig.showNonFunctionalButtons = options[v];
                        break;
                    case "showUnusedButtons":
                        menuConfig.showUnusedButtons = options[v];
                        break;
                    case "showUpcomingButtons":
                        menuConfig.showUpcomingButtons = options[v];
                        break;
                    case "itemName":
                        menuConfig.itemName = options[v];
                        break;
                    default:
                        throw new Error(`Save action for setting ${JSON.stringify(v)} was not defined.`);
                }
            });
            return 1;
        })
        .catch(async (e) => {
            console.error(e, e.stack);
            return ((await showMessage(sourceEntity, "An Error occurred", `An error occurred: ${e}${e?.stack}`, "Back", "Close")).selection !== 1).toNumber();
        });
}
