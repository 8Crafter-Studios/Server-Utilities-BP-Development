import { Entity, Player } from "@minecraft/server";
import { ActionFormData, ActionFormResponse, ModalFormData } from "@minecraft/server-ui";
import { forceShow } from "modules/ui/functions/forceShow";
import { executeCommandPlayerW } from "modules/commands/classes/executeCommandPlayerW";
import { showActions } from "modules/utilities/functions/showActions";
import { HomeSystem } from "modules/commands/classes/HomeSystem";
import { vTStr } from "modules/commands/functions/vTStr";
import { showMessage } from "modules/utilities/functions/showMessage";
import { Home } from "modules/commands/classes/Home";
import { coordinates } from "modules/coordinates/functions/coordinates";
import { coordinatesB } from "modules/coordinates/functions/coordinatesB";

export async function playerMenu_warps(sourceEntitya: Entity | executeCommandPlayerW | Player): Promise<0 | 1> {
    const sourceEntity = sourceEntitya instanceof executeCommandPlayerW ? sourceEntitya.player : (sourceEntitya as Player);
    if (!(sourceEntity instanceof Player)) {
        throw new TypeError(
            "Invalid Player. Expected an instance of the Player class, or an instance of the executeCommandPlayerW class with a Player linked to it, but instead got " +
                (typeof sourceEntity == "object"
                    ? sourceEntity === null
                        ? "object[null]"
                        : "object[" + ((sourceEntity as object).constructor.name ?? "unknown") + "]"
                    : typeof sourceEntity) +
                "."
        );
    }
    if (!config.warpsSystem.enabled) {
        if ((await showMessage(sourceEntity, "Error", `§cSorry but the warps system is currently disabled.`, "Back", "Close")).selection === 0) {
            return 1;
        } else {
            return 0;
        }
    }
    let form = new ActionFormData();
    form.title("Warps");
    const warps = config.warpsSystem.warps;
    warps.forEach((w) => form.button(w.displayName, w.icon));
    if (sourceEntity.hasTag("admin")) {
        form.button("Add Warp (§cAdmin Only§r)", "textures/ui/color_plus");
    }
    form.button("Back", "textures/ui/arrow_left");
    form.button("Close", "textures/ui/crossout");
    return await forceShow(form, sourceEntity)
        .then(async (ra) => {
            let r = ra as ActionFormResponse;
            // This will stop the code when the player closes the form
            if (r.canceled) return 1;

            switch (
                (!!warps[r.selection] ? "warp" : undefined) ??
                cullUndefined([sourceEntity.hasTag("admin") ? "newWarp" : undefined, "back", "close"] as const)[r.selection - warps.length]
            ) {
                case "warp":
                    const warp = warps[r.selection];
                    if (sourceEntity.dimension !== dimensionsb[warp.dimension] && !config.teleportSystems.allowCrossDimensionalTeleport) {
                        if (
                            (await showMessage(sourceEntity, "Error", `§cSorry but all cross-dimensional teleports have been disabled.`, "Back", "Close"))
                                .selection === 0
                        ) {
                            return await playerMenu_warps(sourceEntity);
                        } else {
                            return 0;
                        }
                    }
                    if (sourceEntity.dimension !== dimensionsb[warp.dimension] && !config.homeSystem.allowCrossDimensionalTeleport) {
                        if (
                            (await showMessage(sourceEntity, "Error", `§cSorry but cross-dimensional home teleports have been disabled.`, "Back", "Close"))
                                .selection === 0
                        ) {
                            return await playerMenu_warps(sourceEntity);
                        } else {
                            return 0;
                        }
                    }
                    // Check for PVP cooldown before starting the teleport countdown.
                    if (Number(sourceEntity.getDynamicProperty("lastHurtByPlayerTime") ?? 0) + config.pvpCooldownToTeleport * 1000 > Date.now()) {
                        sourceEntity.sendMessage(
                            `§cSorry but you have to wait another ${Math.round(
                                (Number(sourceEntity.getDynamicProperty("lastHurtByPlayerTime") ?? 0) + config.pvpCooldownToTeleport * 1000 - Date.now()) / 1000
                            )} seconds before you can teleport again because you are still on PVP cooldown.`
                        );
                        return 0;
                    }
                    // Check for teleport cooldown before starting the teleport countdown.
                    if (Number(sourceEntity.getDynamicProperty("lastTeleportTime") ?? 0) + config.teleportSystems.teleportCooldown * 1000 > Date.now()) {
                        sourceEntity.sendMessage(
                            `§cSorry but you have to wait another ${Math.round(
                                (Number(sourceEntity.getDynamicProperty("lastTeleportTime") ?? 0) +
                                    config.teleportSystems.teleportCooldown * 1000 -
                                    Date.now()) /
                                    1000
                            )} seconds before you can teleport again because you are still on cooldown.`
                        );
                        return 0;
                    }
                    const standStillTime = config.teleportSystems.standStillTimeToTeleport;
                    if (standStillTime > 0) {
                        sourceEntity.sendMessage("§eStand still for " + standStillTime + " seconds to teleport.");
                        await waitTicks(20);
                    }
                    const playerPosition = sourceEntity.location;
                    let successful = true;
                    for (let i = 0; i < standStillTime; i++) {
                        if (!Vector.equals(sourceEntity.location, playerPosition)) {
                            successful = false;
                            break;
                        }
                        sourceEntity.sendMessage("§bTeleporting in " + (standStillTime - i));
                        await waitTicks(20);
                    }
                    // Check for PVP cooldown again after ending the teleport countdown.
                    if (Number(sourceEntity.getDynamicProperty("lastHurtByPlayerTime") ?? 0) + config.pvpCooldownToTeleport * 1000 > Date.now()) {
                        sourceEntity.sendMessage(
                            `§cSorry but you have to wait another ${Math.round(
                                (Number(sourceEntity.getDynamicProperty("lastHurtByPlayerTime") ?? 0) + config.pvpCooldownToTeleport * 1000 - Date.now()) / 1000
                            )} seconds before you can teleport again because you are still on PVP cooldown.`
                        );
                        successful = false;
                        return 0;
                    }
                    // Check for teleport cooldown again after ending the teleport countdown.
                    if (Number(sourceEntity.getDynamicProperty("lastTeleportTime") ?? 0) + config.teleportSystems.teleportCooldown * 1000 > Date.now()) {
                        sourceEntity.sendMessage(
                            `§cSorry but you have to wait another ${Math.round(
                                (Number(sourceEntity.getDynamicProperty("lastTeleportTime") ?? 0) +
                                    config.teleportSystems.teleportCooldown * 1000 -
                                    Date.now()) /
                                    1000
                            )} seconds before you can teleport again because you are still on cooldown.`
                        );
                        return 0;
                    }
                    if (successful) {
                        try {
                            sourceEntity.teleport(warp.location, { dimension: dimensionsb[warp.dimension] });
                            sourceEntity.setDynamicProperty("lastTeleportTime", Date.now());
                            sourceEntity.sendMessage("§aSuccessfully teleported.");
                        } catch (e) {
                            sourceEntity.sendMessage("§cAn error occured while trying to teleport you to the selected warp: " + e + e.stack);
                        }
                    } else {
                        sourceEntity.sendMessage("§cTeleport canceled.");
                    }
                    return 0;
                case "newWarp": {
                    if (!sourceEntity.hasTag("admin")) {
                        if (
                            (await showMessage(sourceEntity, "Error", `§cSorry but you do not have permission to create a new warp.`, "Back", "Close"))
                                .selection === 0
                        ) {
                            return await playerMenu_warps(sourceEntity);
                        } else {
                            return 0;
                        }
                    }
                    const location = sourceEntity.dimensionLocation;
                    const r = await new ModalFormData()
                        .title("New Warp")
                        .textField(`Please enter the name for the new warp below.`, "Warp Name")
                        .textField(`Please enter the coordinates for the new warp below. ex. 172.41 76 29.5`, "x y z")
                        .dropdown(
                            "Please select the dimension for the new warp below.",
                            dimensionsd.map((d) => dimensionTypeDisplayFormattingE[d])
                        )
                        .textField(`Enter the path to an icon for the warp button below. (Optional)`, "textures/items/ender_pearl")
                        .submitButton("Create Warp")
                        .forceShow(sourceEntity);
                    if (r.canceled) {
                        return await playerMenu_warps(sourceEntity);
                    }
                    if (r.formValues?.[0] === "") {
                        if ((await showMessage(sourceEntity, "Error", `§cPlease specify a name for the warp.`, "Back", "Close")).selection === 0) {
                            return await playerMenu_warps(sourceEntity);
                        } else {
                            return 0;
                        }
                    }
                    if (r.formValues?.[1] === "") {
                        if ((await showMessage(sourceEntity, "Error", `§cPlease specify a location for the warp.`, "Back", "Close")).selection === 0) {
                            return await playerMenu_warps(sourceEntity);
                        } else {
                            return 0;
                        }
                    }
                    if (!!warps.find((w) => w.displayName === warp.displayName)) {
                        if ((await showMessage(sourceEntity, "Error", `§cYou already have a warp with this name.`, "Back", "Close")).selection === 0) {
                            return await playerMenu_warps(sourceEntity);
                        } else {
                            return 0;
                        }
                    }
                    config.warpsSystem.warps = [
                        ...config.warpsSystem.warps,
                        {
                            dimension: dimensionsd[r.formValues?.[2] as number],
                            displayName: r.formValues?.[0] as string,
                            location: coordinatesB(r.formValues?.[1] as string, sourceEntity.location, sourceEntity.getViewDirection()),
                            icon: (r.formValues?.[3] as string) !== "" ? (r.formValues?.[3] as string) : undefined,
                        },
                    ];
                    return await playerMenu_warps(sourceEntity);
                }
                case "back":
                    return 1;
                case "close":
                    return 0;
                default:
                    return 1;
            }
        })
        .catch((e) => {
            console.error(e, e.stack);
            return 0;
        });
}
