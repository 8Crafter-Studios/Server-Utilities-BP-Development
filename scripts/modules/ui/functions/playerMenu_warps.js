import { Entity, Player } from "@minecraft/server";
import { ActionFormData, ActionFormResponse } from "@minecraft/server-ui";
import { forceShow } from "modules/ui/functions/forceShow";
import { executeCommandPlayerW } from "modules/commands/classes/executeCommandPlayerW";
import { showMessage } from "modules/utilities/functions/showMessage";
import { manageWarps } from "./manageWarps";
export async function playerMenu_warps(sourceEntitya) {
    const sourceEntity = sourceEntitya instanceof executeCommandPlayerW ? sourceEntitya.player : sourceEntitya;
    if (!(sourceEntity instanceof Player)) {
        throw new TypeError("Invalid Player. Expected an instance of the Player class, or an instance of the executeCommandPlayerW class with a Player linked to it, but instead got " +
            (typeof sourceEntity == "object"
                ? sourceEntity === null
                    ? "object[null]"
                    : "object[" + (sourceEntity.constructor.name ?? "unknown") + "]"
                : typeof sourceEntity) +
            ".");
    }
    if (!config.warpsSystem.enabled) {
        if ((await showMessage(sourceEntity, "Error", `§cSorry but the warps system is currently disabled.`, "Back", "Close")).selection === 0) {
            return 1;
        }
        else {
            return 0;
        }
    }
    let form = new ActionFormData();
    form.title("Warps");
    const warps = config.warpsSystem.warps;
    warps.forEach((w) => form.button(w.displayName, w.icon));
    if (sourceEntity.hasTag("admin")) {
        form.button("Manage Warps (§cAdmin Only§r)", "textures/ui/pencil_edit_icon");
    }
    form.button("Back", "textures/ui/arrow_left");
    form.button("Close", "textures/ui/crossout");
    return await forceShow(form, sourceEntity)
        .then(async (ra) => {
        let r = ra;
        if (r.canceled)
            return 1;
        switch ((!!warps[r.selection] ? "warp" : undefined) ??
            cullUndefined([sourceEntity.hasTag("admin") ? "manageWarps" : undefined, "back", "close"])[r.selection - warps.length]) {
            case "warp":
                const warp = warps[r.selection];
                if (sourceEntity.dimension !== dimensionsb[warp.dimension] && !config.teleportSystems.allowCrossDimensionalTeleport) {
                    if ((await showMessage(sourceEntity, "Error", `§cSorry but all cross-dimensional teleports have been disabled.`, "Back", "Close"))
                        .selection === 0) {
                        return await playerMenu_warps(sourceEntity);
                    }
                    else {
                        return 0;
                    }
                }
                // Check for PVP cooldown before starting the teleport countdown.
                if (Number(sourceEntity.getDynamicProperty("lastHurtByPlayerTime") ?? 0) + config.teleportSystems.pvpCooldownToTeleport * 1000 > Date.now()) {
                    sourceEntity.sendMessage(`§cSorry but you have to wait another ${Math.round((Number(sourceEntity.getDynamicProperty("lastHurtByPlayerTime") ?? 0) + config.teleportSystems.pvpCooldownToTeleport * 1000 - Date.now()) / 1000)} seconds before you can teleport again because you are still on PVP cooldown.`);
                    return 0;
                }
                // Check for teleport cooldown before starting the teleport countdown.
                if (Number(sourceEntity.getDynamicProperty("lastTeleportTime") ?? 0) + config.teleportSystems.teleportCooldown * 1000 > Date.now()) {
                    sourceEntity.sendMessage(`§cSorry but you have to wait another ${Math.round((Number(sourceEntity.getDynamicProperty("lastTeleportTime") ?? 0) +
                        config.teleportSystems.teleportCooldown * 1000 -
                        Date.now()) /
                        1000)} seconds before you can teleport again because you are still on cooldown.`);
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
                if (Number(sourceEntity.getDynamicProperty("lastHurtByPlayerTime") ?? 0) + config.teleportSystems.pvpCooldownToTeleport * 1000 > Date.now()) {
                    sourceEntity.sendMessage(`§cSorry but you have to wait another ${Math.round((Number(sourceEntity.getDynamicProperty("lastHurtByPlayerTime") ?? 0) + config.teleportSystems.pvpCooldownToTeleport * 1000 - Date.now()) / 1000)} seconds before you can teleport again because you are still on PVP cooldown.`);
                    successful = false;
                    return 0;
                }
                // Check for teleport cooldown again after ending the teleport countdown.
                if (Number(sourceEntity.getDynamicProperty("lastTeleportTime") ?? 0) + config.teleportSystems.teleportCooldown * 1000 > Date.now()) {
                    sourceEntity.sendMessage(`§cSorry but you have to wait another ${Math.round((Number(sourceEntity.getDynamicProperty("lastTeleportTime") ?? 0) +
                        config.teleportSystems.teleportCooldown * 1000 -
                        Date.now()) /
                        1000)} seconds before you can teleport again because you are still on cooldown.`);
                    return 0;
                }
                if (successful) {
                    try {
                        sourceEntity.teleport(warp.location, { dimension: dimensionsb[warp.dimension] });
                        sourceEntity.setDynamicProperty("lastTeleportTime", Date.now());
                        sourceEntity.sendMessage("§aSuccessfully teleported.");
                    }
                    catch (e) {
                        sourceEntity.sendMessage("§cAn error occured while trying to teleport you to the selected warp: " + e + e.stack);
                    }
                }
                else {
                    sourceEntity.sendMessage("§cTeleport canceled.");
                }
                return 0;
            case "manageWarps":
                if ((await manageWarps(sourceEntity)) == 1) {
                    return await playerMenu_warps(sourceEntity);
                }
                else {
                    return 0;
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
//# sourceMappingURL=playerMenu_warps.js.map