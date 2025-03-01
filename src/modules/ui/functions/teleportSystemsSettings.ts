import type { Entity, Player } from "@minecraft/server";
import { ModalFormData } from "@minecraft/server-ui";
import { config } from "init/classes/config";
import { forceShow } from "modules/ui/functions/forceShow";
import { executeCommandPlayerW } from "modules/commands/classes/executeCommandPlayerW";
import { securityVariables } from "security/ultraSecurityModeUtils";
import { showMessage } from "modules/utilities/functions/showMessage";

/**
 * Displays and handles the teleport systems settings form for a given entity.
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
export async function teleportSystemsSettings(sourceEntitya: Entity | executeCommandPlayerW | Player): Promise<1 | 0> {
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
    const menuConfig = config.teleportSystems;
    type optionsList = {
        allowCrossDimensionalTeleport: boolean;
        pvpCooldownToTeleport: string;
        standStillTimeToTeleport: string;
        teleportCooldown: string;
    };
    const includedOptions = [
        "allowCrossDimensionalTeleport",
        "pvpCooldownToTeleport",
        "standStillTimeToTeleport",
        "teleportCooldown",
    ] as (keyof optionsList)[];
    const form = new ModalFormData();
    form.title("Player Menu Settings");
    const formOptionsMap = {
        allowCrossDimensionalTeleport: () =>
            form.toggle("§l§fEnabled§r§f\nWhether or not the player menu is enabled. Defaults to true.", menuConfig.allowCrossDimensionalTeleport),
        pvpCooldownToTeleport: () =>
            form.textField(
                "§l§fpvpCooldownToTeleport§r§f\nHow long in seconds after getting damaged by another player that the player has to wait before they can teleport with the player menu or commands such as \\spawn, \\home, \\gohome, \\tpa, and \\rtp. Set it to 0 to have no cooldown. Defaults to 15.",
                "float",
                menuConfig.pvpCooldownToTeleport.toString()
            ),
        standStillTimeToTeleport: () =>
            form.textField(
                "§l§fstandStillTimeToTeleport§r§f\nHow long in seconds that the player has to stand still before they can teleport, if they move during this time period, the teleportation is canceled. Set it to 0 to have players teleport instantly. Defaults to 5.",
                "float",
                menuConfig.standStillTimeToTeleport.toString()
            ),
        teleportCooldown: () =>
            form.textField(
                "§l§fteleportCooldown§r§f\nHow long in seconds after teleporting that the player has to wait before they can teleport again. Set it to 0 to have no cooldown. Defaults to 30.",
                "float",
                menuConfig.teleportCooldown.toString()
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
                    case "allowCrossDimensionalTeleport":
                        menuConfig.allowCrossDimensionalTeleport = options[v];
                        break;
                    case "pvpCooldownToTeleport":
                        menuConfig.pvpCooldownToTeleport = options[v].toNumber();
                        break;
                    case "standStillTimeToTeleport":
                        menuConfig.standStillTimeToTeleport = options[v].toNumber();
                        break;
                    case "teleportCooldown":
                        menuConfig.teleportCooldown = options[v].toNumber();
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
