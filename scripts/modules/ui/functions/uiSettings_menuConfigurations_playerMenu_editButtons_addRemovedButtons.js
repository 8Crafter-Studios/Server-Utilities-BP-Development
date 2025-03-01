import { Entity, Player } from "@minecraft/server";
import { ActionFormData } from "@minecraft/server-ui";
import { executeCommandPlayerW } from "modules/commands/classes/executeCommandPlayerW";
import { securityVariables } from "security/ultraSecurityModeUtils";
import { showMessage } from "modules/utilities/functions/showMessage";
import { menuButtonIds } from "../constants/menuButtonIds";
export async function uiSettings_menuConfigurations_playerMenu_editButtons_addRemovedButtons(sourceEntitya) {
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
    try {
        const menuConfig = config.ui.menus.playerMenu;
        const currentButtonsA = menuConfig.buttons;
        const buttons = Object.entries(menuButtonIds.playerMenu.buttons).filter(b => !currentButtonsA.includes(b[0])).sort((a, b) => a[1].defaultButtonIndex - b[1].defaultButtonIndex);
        const form = new ActionFormData();
        form.title("Add Removed Buttons");
        form.body(buttons.length === 0 ? "No removed buttons found." : "Select a button to view its details and add it back to the player menu.");
        buttons.forEach(b => {
            form.button(b[1].displayName, b[1].icon);
        });
        form.button("Back", "textures/ui/arrow_left");
        form.button("Close", "textures/ui/crossout");
        const r = await form.forceShow(sourceEntity);
        if (r.canceled || r.selection === buttons.length) {
            return 1;
        }
        if (r.selection === buttons.length + 1) {
            return 0;
        }
        const buttonID = buttons[r.selection][0];
        const button = buttons[r.selection][1];
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
            .button("Add", "textures/ui/color_plus")
            .button("Back", "textures/ui/arrow_left")
            .button("Close", "textures/ui/crossout")
            .forceShow(sourceEntity);
        if (rb.canceled || rb.selection === 1)
            return await uiSettings_menuConfigurations_playerMenu_editButtons_addRemovedButtons(sourceEntity);
        if (rb.selection === 2)
            return 0;
        if (rb.selection === 0) {
            const currentButtonsB = menuConfig.buttons;
            currentButtonsB.push(buttonID);
            menuConfig.buttons = currentButtonsB;
        }
        return await uiSettings_menuConfigurations_playerMenu_editButtons_addRemovedButtons(sourceEntity);
    }
    catch (e) {
        console.error(e, e.stack);
        return ((await showMessage(sourceEntity, "An Error occurred", `An error occurred: ${e}${e?.stack}`, "Back", "Close")).selection !== 1).toNumber();
    }
    ;
}
//# sourceMappingURL=uiSettings_menuConfigurations_playerMenu_editButtons_addRemovedButtons.js.map