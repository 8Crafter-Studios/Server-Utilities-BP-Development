import type { Entity, Player } from "@minecraft/server";
import { ModalFormData, ModalFormResponse } from "@minecraft/server-ui";
import "init/classes/config";
import { forceShow } from "modules/ui/functions/forceShow";
import { executeCommandPlayerW } from "modules/commands/classes/executeCommandPlayerW";
import { securityVariables } from "security/ultraSecurityModeUtils";
import { showMessage } from "modules/utilities/functions/showMessage";

/**
 * Displays the Home System Settings UI and handles user interactions.
 * 
 * @param sourceEntitya - The entity that initiated the request. Can be an `Entity`, `executeCommandPlayerW`, or `Player`.
 * @returns A promise that resolves to:
 * - `1` if the operation was successful or the user canceled the operation.
 * - `0` if the user does not have permission to access the settings.
 * - `-2` if an error occurred during the operation.
 */
export async function homeSystemSettings(
    sourceEntitya: Entity | executeCommandPlayerW | Player
): Promise<1 | 0 | -2> {
    const sourceEntity = sourceEntitya instanceof executeCommandPlayerW
        ? sourceEntitya.player
        : sourceEntitya;
    if (securityVariables.ultraSecurityModeEnabled) {
        if(securityVariables.testPlayerForPermission(sourceEntity as Player, "andexdb.accessSettings") == false){
            const r = await showMessage(sourceEntity as Player, "Access Denied (403)", "You do not have permission to access this menu. You need the following permission to access this menu: andexdb.accessSettings", "Go Back", "Close");
            if(r.canceled || r.selection == 0){
                return 1;
            }else{
                return 0;
            }
        }
    }
    let form2 = new ModalFormData();
    form2.title("Home System Settings [§cExperimental§r]");
    form2.toggle(
        "§l§fHome System Enabled§r§f",
        config.homeSystem.homeSystemEnabled
    );
    form2.textField(
        "§l§fMaximum Homes Per Player§r§f",
        "Int|Infinity",
        String(config.homeSystem.maxHomesPerPlayer)
    );
    form2.submitButton("Save");
    return await forceShow(form2, sourceEntity as Player)
        .then((to) => {
            let t = to as ModalFormResponse;
            if (t.canceled) {
                return 1 as const;
            } /*
    GameTest.Test.prototype.spawnSimulatedPlayer({x: 0, y: 0, z: 0})*/ /*
        ${se}GameTest.Test.prototype.spawnSimulatedPlayer({x: 0, y: 0, z: 0})*/



            let [homeSystemEnabled, maxHomesPerPlayer] = t.formValues;
            config.homeSystem.homeSystemEnabled = homeSystemEnabled as boolean;
            config.homeSystem.maxHomesPerPlayer =
                String(maxHomesPerPlayer).toLowerCase() == "infinity"
                    ? Infinity
                    : Number(maxHomesPerPlayer);
            return 1;
        })
        .catch((e) => {
            console.error(e, e.stack);
            return -2 as const;
        });
}
