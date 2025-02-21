import { Entity, Player } from "@minecraft/server";
import { ActionFormData, ActionFormResponse, ModalFormData } from "@minecraft/server-ui";
import { forceShow } from "modules/ui/functions/forceShow";
import { executeCommandPlayerW } from "modules/commands/classes/executeCommandPlayerW";
import { showActions } from "modules/utilities/functions/showActions";
import { vTStr } from "modules/commands/functions/vTStr";
import { showMessage } from "modules/utilities/functions/showMessage";
import { coordinatesB } from "modules/coordinates/functions/coordinatesB";
import { securityVariables } from "security/ultraSecurityModeUtils";
export async function manageWarps(sourceEntitya) {
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
    if (securityVariables.ultraSecurityModeEnabled) {
        if (securityVariables.testPlayerForPermission(sourceEntity, "andexdb.accessManageWarpsUI") == false) {
            const r = await showMessage(sourceEntity, "Access Denied (403)", "You do not have permission to access this menu. You need the following permission to access this menu: andexdb.accessManageWarpsUI", "Okay", "Cancel");
            if (r.canceled || r.selection == 0) {
                return 1;
            }
            else {
                return 0;
            }
        }
    }
    else if (!sourceEntity.hasTag("admin")) {
        const r = await showMessage(sourceEntity, "Access Denied (403)", "You do not have permission to access this menu. You need the following tag to access this menu: admin", "Okay", "Cancel");
        if (r.canceled || r.selection == 0) {
            return 1;
        }
        else {
            return 0;
        }
    }
    let form = new ActionFormData();
    form.title("Manage Warps");
    const warps = config.warpsSystem.warps;
    warps.forEach((w) => form.button(w.displayName, w.icon));
    form.button("Add Warp", "textures/ui/color_plus");
    form.button("Back", "textures/ui/arrow_left");
    form.button("Close", "textures/ui/crossout");
    return await forceShow(form, sourceEntity)
        .then(async (ra) => {
        let r = ra;
        if (r.canceled)
            return 1;
        switch ((!!warps[r.selection] ? "warp" : undefined) ?? ["newWarp", "back", "close"][r.selection - warps.length]) {
            case "warp": {
                const warp = warps[r.selection];
                const warpsb = warps.filter((w) => w !== warp);
                switch (["move", "edit", "delete", "back", "close"][(await showActions(sourceEntity, "Warp Details", `${warp.displayName}\nDimension: ${dimensionTypeDisplayFormattingD[warp.dimension]}\nLocation: ${vTStr(warp.location)}\nIcon: ${warp.icon}`, ["Move", "textures/ui/move"], ["Edit", "textures/ui/pencil_edit_icon"], ["Delete", "textures/ui/trash_default"], ["Back", "textures/ui/arrow_left"], ["Close", "textures/ui/crossout"])).selection]) {
                    case "move": {
                        const r = await showActions(sourceEntity, "Move Warp", "Would you like to move this warp above or below another warp?", ["Move Above", "textures/ui/chevron_white_up"], ["Move Below", "textures/ui/chevron_white_down"], ["Back", "textures/ui/arrow_left"], ["Close", "textures/ui/crossout"]);
                        if (r.canceled || r.selection === 2) {
                            return await manageWarps(sourceEntity);
                        }
                        if (r.selection === 3) {
                            return 0;
                        }
                        let form = new ActionFormData();
                        form.title("Move Warp");
                        form.body(`Select the warp you would like to move this warp ${r.selection === 0 ? "above" : "below"}.`);
                        warpsb.forEach((w) => form.button(w.displayName, w.icon));
                        form.button("Back", "textures/ui/arrow_left");
                        form.button("Close", "textures/ui/crossout");
                        const rb = await form.forceShow(sourceEntity);
                        if (rb.canceled || rb.selection === warpsb.length) {
                            return await manageWarps(sourceEntity);
                        }
                        if (rb.selection === warpsb.length + 1) {
                            return 0;
                        }
                        const destinationIndex = rb.selection + r.selection;
                        const currentWarps = config.warpsSystem.warps;
                        currentWarps.splice(currentWarps.findIndex((w) => w.displayName === warp.displayName), 1);
                        currentWarps.splice(destinationIndex, 0, warp);
                        config.warpsSystem.warps = currentWarps;
                        return await manageWarps(sourceEntity);
                    }
                    case "edit": {
                        const r = await new ModalFormData()
                            .title("New Warp")
                            .textField(`Warp Display Name`, "Warp Name", warp.displayName)
                            .textField(`Warp Location. ex. 172.41 76 29.5`, "x y z", vTStr(warp.location))
                            .dropdown("Warp Dimension", dimensionsd.map((d) => dimensionTypeDisplayFormattingE[d]), dimensionsd.indexOf(warp.dimension))
                            .textField(`Warp Button Icon Path. (Optional)`, "textures/items/ender_pearl", warp.icon)
                            .submitButton("Save Changes")
                            .forceShow(sourceEntity);
                        if (r.canceled) {
                            return await manageWarps(sourceEntity);
                        }
                        if (r.formValues?.[0] === "") {
                            if ((await showMessage(sourceEntity, "Error", `§cPlease specify a name for the warp.`, "Back", "Close")).selection === 0) {
                                return await manageWarps(sourceEntity);
                            }
                            else {
                                return 0;
                            }
                        }
                        if (r.formValues?.[1] === "") {
                            if ((await showMessage(sourceEntity, "Error", `§cPlease specify a location for the warp.`, "Back", "Close")).selection === 0) {
                                return await manageWarps(sourceEntity);
                            }
                            else {
                                return 0;
                            }
                        }
                        if (warp.displayName !== r.formValues?.[0] && !!warps.find((w) => w.displayName === r.formValues?.[0])) {
                            if ((await showMessage(sourceEntity, "Error", `§cYou already have a warp with this name.`, "Back", "Close")).selection === 0) {
                                return await manageWarps(sourceEntity);
                            }
                            else {
                                return 0;
                            }
                        }
                        warp.dimension = dimensionsd[r.formValues?.[2]];
                        warp.displayName = r.formValues?.[0];
                        warp.location = coordinatesB(r.formValues?.[1], sourceEntity.location, sourceEntity.getViewDirection());
                        warp.icon = r.formValues?.[3] !== "" ? r.formValues?.[3] : undefined;
                        config.warpsSystem.warps = warps;
                        return await manageWarps(sourceEntity);
                    }
                    case "delete": {
                        if ((await showMessage(sourceEntity, "Are You Sure?", "Are you sure you want to delete this warp!?\nThis action cannot be undone!", "Cancel", "Confirm")).selection == 1) {
                            config.warpsSystem.warps = warpsb;
                        }
                        return await manageWarps(sourceEntity);
                    }
                    case "back":
                        return await manageWarps(sourceEntity);
                    case "close":
                        return 0;
                }
            }
            case "newWarp": {
                const r = await new ModalFormData()
                    .title("New Warp")
                    .textField(`Please enter the name for the new warp below.`, "Warp Name")
                    .textField(`Please enter the coordinates for the new warp below. ex. 172.41 76 29.5`, "x y z")
                    .dropdown("Please select the dimension for the new warp below.", dimensionsd.map((d) => dimensionTypeDisplayFormattingE[d]))
                    .textField(`Enter the path to an icon for the warp button below. (Optional)`, "textures/items/ender_pearl")
                    .submitButton("Create Warp")
                    .forceShow(sourceEntity);
                if (r.canceled) {
                    return await manageWarps(sourceEntity);
                }
                if (r.formValues?.[0] === "") {
                    if ((await showMessage(sourceEntity, "Error", `§cPlease specify a name for the warp.`, "Back", "Close")).selection === 0) {
                        return await manageWarps(sourceEntity);
                    }
                    else {
                        return 0;
                    }
                }
                if (r.formValues?.[1] === "") {
                    if ((await showMessage(sourceEntity, "Error", `§cPlease specify a location for the warp.`, "Back", "Close")).selection === 0) {
                        return await manageWarps(sourceEntity);
                    }
                    else {
                        return 0;
                    }
                }
                if (!!warps.find((w) => w.displayName === r.formValues?.[0])) {
                    if ((await showMessage(sourceEntity, "Error", `§cYou already have a warp with this name.`, "Back", "Close")).selection === 0) {
                        return await manageWarps(sourceEntity);
                    }
                    else {
                        return 0;
                    }
                }
                const dimension = dimensionsd[r.formValues?.[2]];
                const displayName = r.formValues?.[0];
                const location = coordinatesB(r.formValues?.[1], sourceEntity.location, sourceEntity.getViewDirection());
                const icon = r.formValues?.[3] !== "" ? r.formValues?.[3] : undefined;
                config.warpsSystem.warps = [
                    ...config.warpsSystem.warps,
                    {
                        dimension,
                        displayName,
                        location,
                        icon,
                    },
                ];
                if ((await showMessage(sourceEntity, "Warp Created", `You have successfully created a new warp with the name ${JSON.stringify(displayName)}, at ${vTStr(location)} in ${dimensionTypeDisplayFormatting[dimension]}, with ${icon === undefined ? "no icon" : "the icon " + JSON.stringify(icon)}.`, "Okay", "Close")).selection !== 1) {
                    return await manageWarps(sourceEntity);
                }
                else {
                    return 0;
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
        return ((await showMessage(sourceEntity, "An Error Occured", `An error occured: ${e}${e?.stack}`, "Back", "Close")).selection !== 1).toNumber();
    });
}
//# sourceMappingURL=manageWarps.js.map