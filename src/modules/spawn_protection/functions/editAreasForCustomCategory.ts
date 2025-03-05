import { Player, world } from "@minecraft/server";
import { ActionFormData, ModalFormData, ActionFormResponse, ModalFormResponse } from "@minecraft/server-ui";
import { forceShow } from "modules/ui/functions/forceShow";
import { customFormUICodes } from "modules/ui/constants/customFormUICodes";
import { ProtectedAreas } from "init/variables/protectedAreaVariables";

/**
 *
 * @todo Make this menu have pages.
 * @param player
 * @param prefix
 * @returns
 */
export async function editAreasForCustomCategory(
    player: Player,
    prefix: (typeof ProtectedAreas)["areas"]["advancedAreaCategories"][number]["id"]
): Promise<0 | 1> {
    const areas = [...ProtectedAreas.areas.advancedArea[prefix].overworld, ...ProtectedAreas.areas.advancedArea[prefix].nether, ...ProtectedAreas.areas.advancedArea[prefix].the_end];
    // let a = world.getDynamicPropertyIds().filter((dpi) => dpi.startsWith("v2:" + prefix));
    // let b = world.getDynamicPropertyIds().filter((dpi) => dpi.startsWith("v2:" + prefix));
    let form = new ActionFormData();
    areas.forEach((a, i) => {
        /*console.warn(aelement.slice(22)); */ form.button(
            customFormUICodes.action.buttons.positions.main_only + a.id,
            a.icon_path ?? "textures/ui/area_xyz"
        );
        // b[i] = String(world.getDynamicProperty("v2:" + prefix + ":" + a.id));
    });
    if(areas.length === 0){
        form.body("No areas in this custom category were found.");
    }
    form.button(customFormUICodes.action.buttons.positions.main_only + "Add New", /*"textures/ui/check_mark"*/ "textures/ui/color_plus");
    form.button(customFormUICodes.action.buttons.positions.title_bar_only + "Back", /*"textures/ui/chat_return_back_arrow"*/ "textures/ui/arrow_left");
    form.button(customFormUICodes.action.buttons.positions.title_bar_only + "Close", "textures/ui/crossout");
    form.button(customFormUICodes.action.buttons.positions.title_bar_only + "Refresh Areas For This Category", "textures/ui/refresh");
    form.title(customFormUICodes.action.titles.formStyles.medium + prefix);
    return await forceShow(form, player).then(async (t) => {
        if (t.canceled) return 1;
        switch ((!!areas[t.selection] ? "area" : undefined) ?? (["new", "back", "close", "refresh"] as const)[t.selection - areas.length]) {
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
                    if (q.canceled) return await editAreasForCustomCategory(player, prefix);
                    const [id, from, to, dimension, mode, icon_path] = (q as ModalFormResponse).formValues as [id: string, from: string, to: string, dimension: 0 | 1 | 2, mode: 0 | 1, icon_path: string];
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
                        icon_path: (icon_path ?? "") == "" ? undefined : icon_path as string,
                    };
                    world.setDynamicProperty(
                        "v2:" + prefix + id,
                        JSON.stringify(newValue)
                    );
                    ProtectedAreas.areas.advancedArea[prefix][dimensionse[dimension]].push({ id, ...newValue});
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
            case "area": {
                const currentArea = areas[t.selection];
                let form = new ActionFormData();
                form.title(customFormUICodes.action.titles.formStyles.medium + currentArea.id);
                form.body(currentArea.id);
                form.button(customFormUICodes.action.buttons.positions.main_only + "Edit", "textures/ui/book_edit_default");
                form.button(customFormUICodes.action.buttons.positions.main_only + "Delete", /*"textures/ui/trash_can"*/ "textures/ui/trash_default");
                form.button(
                    customFormUICodes.action.buttons.positions.title_bar_only + "Back",
                    /*"textures/ui/chat_return_back_arrow"*/ /*"textures/ui/undoArrow"*/ "textures/ui/chevron_left"
                );
                form.button(customFormUICodes.action.buttons.positions.title_bar_only + "Close", "textures/ui/crossout");
                return await forceShow(form, player).then(async (w) => {
                    if (w.canceled) {
                        return await editAreasForCustomCategory(player, prefix);
                    }
                    switch ((w as ActionFormResponse).selection) {
                        case 0: {
                            const defaults = areas[Number((t as ActionFormResponse).selection)];
                            let form = new ModalFormData();
                            form.title(customFormUICodes.modal.titles.formStyles.medium + "Edit Protected Area");
                            form.textField("From", "x1, y1, z1", `${defaults.from.x}, ${defaults.from.y}, ${defaults.from.z}`);
                            form.textField("To", "x2, y2, z2", `${defaults.to.x}, ${defaults.to.y}, ${defaults.to.z}`);
                            form.dropdown("Dimension", ["Overworld", "Nether", "The End"], defaults.dimension);
                            form.dropdown("Mode", ["Protection", "Anti-Protection"], defaults.mode);
                            form.textField("Icon Path (Optional)", "text", defaults.icon_path ?? "");
                            form.submitButton("Save");

                            return await forceShow(form, player).then(async (q) => {
                                if (q.canceled) return await editAreasForCustomCategory(player, prefix);
                                const [from, to, dimension, mode, icon_path] = (q as ModalFormResponse).formValues;
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
                                    dimension: dimension as 0 | 1 | 2,
                                    mode: mode as 0 | 1,
                                    icon_path: (icon_path ?? "") == "" ? undefined : (icon_path as string),
                                };
                                if (defaults.dimension === dimension) {
                                    ProtectedAreas.areas.advancedArea[prefix][dimensionse[dimension as number]].splice(
                                        ProtectedAreas.areas.advancedArea[prefix][dimensionse[dimension as number]].findIndex((a) => a.id === defaults.id),
                                        1,
                                        {
                                            id: defaults.id,
                                            ...newValue,
                                        }
                                    );
                                } else {
                                    ProtectedAreas.areas.advancedArea[prefix][dimensionse[defaults.dimension]].splice(
                                        ProtectedAreas.areas.advancedArea[prefix][dimensionse[defaults.dimension as number]].findIndex((a) => a.id === defaults.id),
                                        1
                                    );
                                    ProtectedAreas.areas.advancedArea[prefix][dimensionse[dimension as number]].push({
                                        id: defaults.id,
                                        ...newValue,
                                    });
                                }
                                world.setDynamicProperty("v2:" + prefix + ":" + defaults.id, JSON.stringify(newValue));
                                return await editAreasForCustomCategory(player, prefix);
                            });
                        }
                        case 1:
                            world.setDynamicProperty(areas[t.selection].id, undefined);
                            ProtectedAreas.areas.advancedArea[prefix][dimensionse[areas[t.selection].dimension]].splice(
                                ProtectedAreas.areas.advancedArea[prefix][dimensionse[areas[t.selection].dimension as number]].findIndex(
                                    (a) => a.id === areas[t.selection].id
                                ),
                                1
                            );
                            return await editAreasForCustomCategory(player, prefix);
                        case 2:
                            return await editAreasForCustomCategory(player, prefix);
                        case 3:
                            return 0;
                    }
                });
            }
            default:
                return 1;
        }
    });
}
