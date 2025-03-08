import { world } from "@minecraft/server";
import { ActionFormData, ModalFormData } from "@minecraft/server-ui";
import { forceShow } from "modules/ui/functions/forceShow";
import { customFormUICodes } from "modules/ui/constants/customFormUICodes";
import { ProtectedAreas } from "init/variables/protectedAreaVariables";
import { selectTexturePreset } from "modules/ui/functions/selectTexturePreset";
import { showMessage } from "modules/utilities/functions/showMessage";
import { extractPlayerFromLooseEntityType } from "modules/utilities/functions/extractPlayerFromLooseEntityType";
/**
 * A function that shows a menu of all protected areas for a given custom category. The menu has buttons for each protected area, and a button to add a new protected area.
 * @todo Make this menu have pages.
 * @param {loosePlayerType} sourceEntity The player or CommandSender to show the menu to.
 * @param {string} prefix The custom category to show the protected areas for.
 * @returns {Promise<0 | 1>} A promise that resolves to 0 or 1. If the promise resolves to 0, the previous menu should closed. If the promise resolves to 1, the previous menu should be reopened.
 * @throws {TypeError} If sourceEntity is not an instance of the Player class or an instance of the executeCommandPlayerW class with a Player linked to it.
 */
export async function editAreasForCustomCategory(sourceEntity, prefix) {
    const player = extractPlayerFromLooseEntityType(sourceEntity);
    const areas = [
        ...ProtectedAreas.areas.advancedArea[prefix].overworld,
        ...ProtectedAreas.areas.advancedArea[prefix].nether,
        ...ProtectedAreas.areas.advancedArea[prefix].the_end,
    ];
    // let a = world.getDynamicPropertyIds().filter((dpi) => dpi.startsWith("v2:" + prefix));
    // let b = world.getDynamicPropertyIds().filter((dpi) => dpi.startsWith("v2:" + prefix));
    let form = new ActionFormData();
    areas.forEach((a) => {
        form.button(customFormUICodes.action.buttons.positions.main_only + a.id, a.icon_path ?? "textures/ui/area_xyz");
    });
    if (areas.length === 0) {
        form.body("No areas in this custom category were found.");
    }
    form.button(customFormUICodes.action.buttons.positions.main_only + "Add New", /*"textures/ui/check_mark"*/ "textures/ui/color_plus");
    form.button(customFormUICodes.action.buttons.positions.title_bar_only + "Back", /*"textures/ui/chat_return_back_arrow"*/ "textures/ui/arrow_left");
    form.button(customFormUICodes.action.buttons.positions.title_bar_only + "Close", "textures/ui/crossout");
    form.button(customFormUICodes.action.buttons.positions.title_bar_only + "Refresh Areas For This Category", "textures/ui/refresh");
    form.title(customFormUICodes.action.titles.formStyles.medium + prefix);
    return await forceShow(form, player).then(async (t) => {
        if (t.canceled)
            return 1;
        switch ((!!areas[t.selection] ? "area" : undefined) ?? ["new", "back", "close", "refresh"][t.selection - areas.length]) {
            case "new": {
                let form = new ModalFormData();
                form.title(customFormUICodes.modal.titles.formStyles.medium + "New Protected Area");
                form.textField("Identifier Name", "myArea");
                form.textField("From", "x1, y1, z1");
                form.textField("To", "x2, y2, z2");
                form.dropdown("Dimension", ["Overworld", "Nether", "The End"], dimensions.indexOf(player.dimension));
                form.dropdown("Mode", ["Protection", "Anti-Protection"]);
                form.textField("Icon Path (Optional)", "text");
                form.submitButton("Add");
                return await forceShow(form, player).then(async (q) => {
                    if (q.canceled)
                        return await editAreasForCustomCategory(player, prefix);
                    const [id, from, to, dimension, mode, icon_path] = q.formValues;
                    const newValue = {
                        from: {
                            x: Number(String(from).split(",")[0]),
                            y: Number(String(from).split(",")[1]),
                            z: Number(String(from).split(",")[2]),
                        },
                        to: {
                            x: Number(String(to).split(",")[0]),
                            y: Number(String(to).split(",")[1]),
                            z: Number(String(to).split(",")[2]),
                        },
                        dimension: dimension,
                        mode: mode,
                        icon_path: (icon_path ?? "") == "" ? undefined : icon_path,
                    };
                    world.setDynamicProperty("v2:" + prefix + id, JSON.stringify(newValue));
                    ProtectedAreas.areas.advancedArea[prefix][dimensionse[dimension]].push({ id, ...newValue });
                    return await editAreasForCustomCategory(player, prefix);
                });
            }
            case "back" /*
    editPistonExtensionAreas(player)*/ /*
                    screenForm123(); */:
                return 1;
            case "close":
                return 0;
            case "refresh":
                ProtectedAreas.loadAreasForAdvancedCategory(prefix);
                return await editAreasForCustomCategory(player, prefix);
            case "area":
                if ((await manageAreaForCustomCategory(player, areas[t.selection].id, prefix)) === 1) {
                    return await editAreasForCustomCategory(player, prefix);
                }
                else {
                    return 0;
                }
            default:
                return 1;
        }
    });
}
/**
 * Shows a menu for managing a single protected area.
 * @param {loosePlayerType} sourceEntity - A player object or a reference to a player object.
 * @param {string} areaID - The identifier name of the protected area.
 * @param {string} prefix - A prefix for the advanced protected area category.
 * @returns {Promise<0 | 1>} A promise that resolves to one of two values: 0 or 1. 0 means the previous menu should be closed. 1 means the previous menu should be reopened.
 * @throws {TypeError} If sourceEntity is not an instance of the Player class or an instance of the executeCommandPlayerW class with a Player linked to it.
 */
export async function manageAreaForCustomCategory(sourceEntity, areaID, prefix) {
    const player = extractPlayerFromLooseEntityType(sourceEntity);
    const area = [
        ...ProtectedAreas.areas.advancedArea[prefix].overworld,
        ...ProtectedAreas.areas.advancedArea[prefix].nether,
        ...ProtectedAreas.areas.advancedArea[prefix].the_end,
    ].find((a) => a.id === areaID);
    let form = new ActionFormData();
    form.title(customFormUICodes.action.titles.formStyles.medium + area.id);
    form.body(area.id);
    form.button(customFormUICodes.action.buttons.positions.main_only + "Edit", "textures/ui/book_edit_default");
    form.button(customFormUICodes.action.buttons.positions.main_only + "Apply Icon Texture Preset", "textures/items/map_locked");
    form.button(customFormUICodes.action.buttons.positions.main_only + "Delete", /*"textures/ui/trash_can"*/ "textures/ui/trash_default");
    form.button(customFormUICodes.action.buttons.positions.title_bar_only + "Back", 
    /*"textures/ui/chat_return_back_arrow"*/ /*"textures/ui/undoArrow"*/ "textures/ui/chevron_left");
    form.button(customFormUICodes.action.buttons.positions.title_bar_only + "Close", "textures/ui/crossout");
    return await forceShow(form, player).then(async (w) => {
        if (w.canceled) {
            return await manageAreaForCustomCategory(player, areaID, prefix);
        }
        switch (["edit", "applyIconTexturePreset", "delete", "back", "close"][w.selection]) {
            case "edit":
                return editAreaForCustomCategory(player, areaID, prefix);
            case "applyIconTexturePreset": {
                const r = await selectTexturePreset(player);
                if (r === 1) {
                    return await manageAreaForCustomCategory(player, areaID, prefix);
                }
                else if (r === 0) {
                    return 0;
                }
                else {
                    area.icon_path = r;
                    const out = JSON.parse(world.getDynamicProperty("advancedProtectedArea:" + prefix + ":" + area.id));
                    out.icon_path = r;
                    world.setDynamicProperty("advancedProtectedArea:" + prefix + ":" + area.id, JSON.stringify(out));
                    return await manageAreaForCustomCategory(player, areaID, prefix);
                }
            }
            case "delete":
                world.setDynamicProperty("advancedProtectedArea:" + prefix + ":" + area.id, undefined);
                ProtectedAreas.areas.advancedArea[prefix][dimensionse[area.dimension]].splice(ProtectedAreas.areas.advancedArea[prefix][dimensionse[area.dimension]].findIndex((a) => a.id === area.id), 1);
                return 1;
            case "back":
                return 1;
            case "close":
                return 0;
        }
    });
}
/**
 * Edits a protected area for a specified custom category.
 *
 * @param {loosePlayerType} sourceEntity - The entity initiating the edit, can be of type `loosePlayerType`.
 * @param {string} areaID - The identifier for the area to be edited.
 * @param {string} prefix - The prefix associated with the custom category.
 * @returns {Promise<0 | 1>} A promise that resolves to `0` if the previous menu should be closed, or `1` if the previous menu should be reopened.
 * @throws {TypeError} If sourceEntity is not an instance of the Player class or an instance of the executeCommandPlayerW class with a Player linked to it.
 *
 * @remarks
 * This function presents a form to the player allowing them to edit the coordinates, dimension, mode, and optional icon path of a protected area.
 *
 * Updates the protected area details based on user input and saves the changes.
 *
 * Handles errors by displaying a message to the player.
 */
export async function editAreaForCustomCategory(sourceEntity, areaID, prefix) {
    const player = extractPlayerFromLooseEntityType(sourceEntity);
    const area = [
        ...ProtectedAreas.areas.advancedArea[prefix].overworld,
        ...ProtectedAreas.areas.advancedArea[prefix].nether,
        ...ProtectedAreas.areas.advancedArea[prefix].the_end,
    ].find((a) => a.id === areaID);
    let form = new ModalFormData();
    form.title(customFormUICodes.modal.titles.formStyles.medium + "Edit Protected Area");
    form.textField("From", "x1, y1, z1", `${area.from.x}, ${area.from.y}, ${area.from.z}`);
    form.textField("To", "x2, y2, z2", `${area.to.x}, ${area.to.y}, ${area.to.z}`);
    form.dropdown("Dimension", ["Overworld", "Nether", "The End"], area.dimension);
    form.dropdown("Mode", ["Protection", "Anti-Protection"], area.mode);
    form.textField("Icon Path (Optional)", "text", area.icon_path ?? "");
    form.submitButton("Save");
    return await forceShow(form, player)
        .then(async (q) => {
        if (q.canceled)
            return 1;
        const [from, to, dimension, mode, icon_path] = q.formValues;
        const newValue = {
            from: {
                x: Number(String(from).split(",")[0]),
                y: Number(String(from).split(",")[1]),
                z: Number(String(from).split(",")[2]),
            },
            to: {
                x: Number(String(to).split(",")[0]),
                y: Number(String(to).split(",")[1]),
                z: Number(String(to).split(",")[2]),
            },
            dimension: dimension,
            mode: mode,
            icon_path: (icon_path ?? "") == "" ? undefined : icon_path,
        };
        let newArea = {
            id: area.id,
            ...newValue,
        };
        if (area.dimension === dimension) {
            ProtectedAreas.areas.advancedArea[prefix][dimensionse[dimension]].splice(ProtectedAreas.areas.advancedArea[prefix][dimensionse[dimension]].findIndex((a) => a.id === area.id), 1, newArea);
        }
        else {
            ProtectedAreas.areas.advancedArea[prefix][dimensionse[area.dimension]].splice(ProtectedAreas.areas.advancedArea[prefix][dimensionse[area.dimension]].findIndex((a) => a.id === area.id), 1);
            ProtectedAreas.areas.advancedArea[prefix][dimensionse[dimension]].push(newArea);
        }
        world.setDynamicProperty("advancedProtectedArea:" + prefix + ":" + area.id, JSON.stringify(newValue));
        return 1;
    })
        .catch(async (e) => {
        console.error(e, e.stack);
        // Present the error to the user, and return 1 if they select "Back", and 0 if they select "Close".
        return ((await showMessage(player, "An Error occurred", `An error occurred: ${e}${e?.stack}`, "Back", "Close")).selection !== 1).toNumber();
    });
}
//# sourceMappingURL=editAreasForCustomCategory.js.map