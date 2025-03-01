import { Entity, Player } from "@minecraft/server";
import { ActionFormData, ActionFormResponse } from "@minecraft/server-ui";
import { forceShow } from "modules/ui/functions/forceShow";
import { executeCommandPlayerW } from "modules/commands/classes/executeCommandPlayerW";
import { securityVariables } from "security/ultraSecurityModeUtils";
import { showMessage } from "modules/utilities/functions/showMessage";
import { menuButtonIds } from "../constants/menuButtonIds";
import { showActions } from "modules/utilities/functions/showActions";
import { uiSettings_menuConfigurations_playerMenu_editButtons_addRemovedButtons } from "./uiSettings_menuConfigurations_playerMenu_editButtons_addRemovedButtons";
export async function uiSettings_menuConfigurations_playerMenu_editButtons(sourceEntitya) {
    const sourceEntity = sourceEntitya instanceof executeCommandPlayerW ? sourceEntitya.player : sourceEntitya;
    if (securityVariables.ultraSecurityModeEnabled) {
        if (securityVariables.testPlayerForPermission(sourceEntity, "andexdb.accessSettings") == false) {
            const r = await showMessage(sourceEntity, "Access Denied (403)", "You do not have permission to access this menu. You need the following permission to access this menu: andexdb.accessSettings", "Back", "Cancel");
            if (r.canceled || r.selection == 0) {
                return 1;
            }
            else {
                return 0;
            }
        }
    }
    const menuConfig = config.ui.menus.playerMenu;
    let form = new ActionFormData();
    form.title("Edit Buttons");
    menuConfig.buttons.forEach((b) => {
        const button = menuButtonIds.playerMenu.buttons[b];
        let appendedDisplayNameText = "";
        if (button.deprecated && !menuConfig.showDeprecatedButtons) {
            appendedDisplayNameText = "\n§o§pHidden§r";
        }
        else if (button.experimental && !menuConfig.showExperimentalButtons) {
            appendedDisplayNameText = "\n§o§pHidden§r";
        }
        else if (!button.functional && !menuConfig.showNonFunctionalButtons) {
            appendedDisplayNameText = "\n§o§pHidden§r";
        }
        else if (button.unused && !menuConfig.showUnusedButtons) {
            appendedDisplayNameText = "\n§o§pHidden§r";
        }
        else if (button.upcoming && !menuConfig.showUpcomingButtons) {
            appendedDisplayNameText = "\n§o§pHidden§r";
        }
        else if ("extraVisibilityConditionsCheck" in button && !button.extraVisibilityConditionsCheck()) {
            appendedDisplayNameText = "\n§o§pHidden§r";
        }
        form.button(button.displayName + appendedDisplayNameText, button.icon);
    });
    form.button("Add Removed Buttons", "textures/ui/color_plus");
    form.button("Reset To Defaults", "textures/ui/reset_white");
    form.button("Back", "textures/ui/arrow_left");
    form.button("Close", "textures/ui/crossout");
    return await forceShow(form, sourceEntity)
        .then(async (ra) => {
        let r = ra;
        if (r.canceled)
            return 1;
        switch (r.selection < menuConfig.buttons.length
            ? "button"
            : ["addRemovedButtons", "reset", "back", "close"][r.selection - menuConfig.buttons.length]) {
            case "button": {
                const buttonID = menuConfig.buttons[r.selection];
                const button = menuButtonIds.playerMenu.buttons[buttonID];
                let buttonHiddenReasonMessage = "";
                if (button.deprecated && !menuConfig.showDeprecatedButtons) {
                    buttonHiddenReasonMessage = "\n§o§cThis button will not be displayed becuase it is deprecated and the showDeprecatedButtons option is disabled.§r";
                }
                else if (button.experimental && !menuConfig.showExperimentalButtons) {
                    buttonHiddenReasonMessage = "\n§o§cThis button will not be displayed becuase it is experimental and the showExperimentalButtons option is disabled.§r";
                }
                else if (!button.functional && !menuConfig.showNonFunctionalButtons) {
                    buttonHiddenReasonMessage = "\n§o§cThis button will not be displayed becuase it is non-functional and the showNonFunctionalButtons option is disabled.§r";
                }
                else if (button.unused && !menuConfig.showUnusedButtons) {
                    buttonHiddenReasonMessage = "\n§o§cThis button will not be displayed becuase it is unused and the showUnusedButtons option is disabled.§r";
                }
                else if (button.upcoming && !menuConfig.showUpcomingButtons) {
                    buttonHiddenReasonMessage = "\n§o§cThis button will not be displayed becuase it is a placeholder for an upcoming feature and the showUpcomingButtons option is disabled.§r";
                }
                else if ("extraVisibilityConditionsCheck" in button && !button.extraVisibilityConditionsCheck()) {
                    buttonHiddenReasonMessage = "extraVisibilityConditionsCheckFailedReason" in button ? `\n§o§cThis button will not be displayed becuase ${button.extraVisibilityConditionsCheckFailedReason()}§c.§r` : "\n§o§cThis button will not be displayed becuase it has not met its defined extra visibility conditions.§r";
                }
                const rb = await new ActionFormData().title("Edit Button").body(`ID: ${buttonID}
Display Name: ${button.displayName}§r
Button Icon: ${button.icon}§r
Default Button Index: ${button.defaultButtonIndex}${button.deprecated ? "\n§pThis button is deprecated.§r" : ""}${button.experimental ? "\n§eThis button is experimental.§r" : ""}${button.functional ? "" : "\n§4This button is non-functional.§r"}${button.unused ? "\n§pThis button is unused.§r" : ""}${button.upcoming ? "\n§pThis button is a placeholder for an upcoming feature.§r" : ""}${buttonHiddenReasonMessage}`)
                    .button("Move", "textures/ui/move")
                    .button("Remove", "textures/ui/trash_default")
                    .button("Back", "textures/ui/arrow_left")
                    .button("Close", "textures/ui/crossout")
                    .forceShow(sourceEntity);
                if (rb.canceled || rb.selection === 2)
                    return await uiSettings_menuConfigurations_playerMenu_editButtons(sourceEntity);
                if (rb.selection === 3)
                    return 0;
                if (rb.selection === 0) {
                    const r = await showActions(sourceEntity, "Move Button", "Would you like to move this button above or below another button?", ["Move Above", "textures/ui/chevron_white_up"], ["Move Below", "textures/ui/chevron_white_down"], ["Back", "textures/ui/arrow_left"], ["Close", "textures/ui/crossout"]);
                    if (r.canceled || r.selection === 2) {
                        return await uiSettings_menuConfigurations_playerMenu_editButtons(sourceEntity);
                    }
                    if (r.selection === 3) {
                        return 0;
                    }
                    const buttons = menuConfig.buttons;
                    let form = new ActionFormData();
                    form.title("Move Button");
                    form.body(`Select the button you would like to move this button ${r.selection === 0 ? "above" : "below"}.`);
                    menuConfig.buttons.forEach((b) => {
                        const button = menuButtonIds.playerMenu.buttons[b];
                        form.button(button.displayName, button.icon);
                    });
                    form.button("Back", "textures/ui/arrow_left");
                    form.button("Close", "textures/ui/crossout");
                    const rb = await form.forceShow(sourceEntity);
                    if (rb.canceled || rb.selection === buttons.length) {
                        return await uiSettings_menuConfigurations_playerMenu_editButtons(sourceEntity);
                    }
                    if (rb.selection === buttons.length + 1) {
                        return 0;
                    }
                    const destinationIndex = rb.selection + r.selection;
                    const currentButtons = menuConfig.buttons;
                    currentButtons.splice(currentButtons.findIndex(w => w === buttonID), 1);
                    currentButtons.splice(destinationIndex, 0, buttonID);
                    menuConfig.buttons = currentButtons;
                    return await uiSettings_menuConfigurations_playerMenu_editButtons(sourceEntity);
                }
                else {
                    menuConfig.buttons = menuConfig.buttons.filter(b => b !== buttonID);
                    return await uiSettings_menuConfigurations_playerMenu_editButtons(sourceEntity);
                }
            }
            case "addRemovedButtons": {
                if ((await uiSettings_menuConfigurations_playerMenu_editButtons_addRemovedButtons(sourceEntity)) == 1) {
                    return await uiSettings_menuConfigurations_playerMenu_editButtons(sourceEntity);
                }
                else {
                    return 0;
                }
            }
            case "reset": {
                if ((await showMessage(sourceEntity, "Are You Sure?", "Are you sure you want to reset the button arrangement back to the default!?\nThis action cannot be undone!", "Cancel", "Confirm")).selection == 1) {
                    menuConfig.buttons = undefined;
                    if ((await showMessage(sourceEntity, "Reset Successful", `You have successfully reset the button arrangement for the player menu to the factory settings.`, "Okay", "Close")).selection !== 1) {
                        return await uiSettings_menuConfigurations_playerMenu_editButtons(sourceEntity);
                    }
                    else {
                        return 0;
                    }
                    ;
                }
                else {
                    if ((await showMessage(sourceEntity, "Reset Canceled", `The reset of the button arrangement for the player menu to the factory settings has been canceled.`, "Okay", "Close")).selection !== 1) {
                        return await uiSettings_menuConfigurations_playerMenu_editButtons(sourceEntity);
                    }
                    else {
                        return 0;
                    }
                    ;
                }
            }
            case "back":
                return 1;
            case "close":
                return 0;
            default:
                return 1;
        }
    })
        .catch(async (e) => {
        console.error(e, e.stack);
        return ((await showMessage(sourceEntity, "An Error occurred", `An error occurred: ${e}${e?.stack}`, "Back", "Close")).selection !== 1).toNumber();
    });
}
//# sourceMappingURL=uiSettings_menuConfigurations_playerMenu_editButtons.js.map