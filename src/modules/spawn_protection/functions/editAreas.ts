import { Player, world } from "@minecraft/server";
import { ActionFormData, ModalFormData, ActionFormResponse, ModalFormResponse } from "@minecraft/server-ui";
import { forceShow } from "modules/ui/functions/forceShow";
import { editAreasMainMenu } from "./editAreasMainMenu";
import { customFormUICodes } from "modules/ui/constants/customFormUICodes";

export async function editAreas(player: Player, prefix: string): Promise<0 | 1> {
    let a = world.getDynamicPropertyIds().filter((dpi) => dpi.startsWith("v2:" + prefix));
    let b = world.getDynamicPropertyIds().filter((dpi) => dpi.startsWith("v2:" + prefix));
    let form1234 = new ActionFormData();
    let form12345 = new ModalFormData();
    let form1234567 = new ActionFormData();
    let form123456 = new ModalFormData();
    a.forEach((aelement, i) => {
        /*console.warn(aelement.slice(22)); */ form1234.button(
            aelement.slice(prefix.length + 3),
            tryget(() => JSON.parse(String(world?.getDynamicProperty(aelement))).icon_path) ?? "textures/ui/area_xyz"
        );
        b[i] = String(world.getDynamicProperty(aelement));
    });
    form1234.button(customFormUICodes.action.buttons.positions.main_only + "Add New", /*"textures/ui/check_mark"*/ "textures/ui/color_plus");
    form1234.button(customFormUICodes.action.buttons.positions.title_bar_only + "Back", /*"textures/ui/chat_return_back_arrow"*/ "textures/ui/arrow_left");
    form1234.button(customFormUICodes.action.buttons.positions.title_bar_only + "Close", "textures/ui/crossout");
    form1234.button(customFormUICodes.action.buttons.positions.title_bar_only + "Refresh", "textures/ui/refresh");
    form1234.title(customFormUICodes.action.titles.formStyles.fullscreen + prefix);
    return await forceShow(form1234, player).then(async (t) => {
        if (t.canceled) return 1;
        switch (true) {
            case (t as ActionFormResponse).selection == a.length:
                form12345.title("New Protected Area");
                form12345.textField("Identifier Name", "myArea");
                form12345.textField("From", "x1, y1, z1");
                form12345.textField("To", "x2, y2, z2");
                form12345.dropdown("Dimension", ["Overworld", "Nether", "The End"], dimensions.indexOf(player.dimension));
                form12345.dropdown("Mode", ["Protection", "Anti-Protection"]);
                form12345.textField("Icon Path (Optional)", "text");
                form12345.submitButton("Add");

                return await forceShow(form12345, player).then(async (q) => {
                    if (q.canceled) return await editAreas(player, prefix);
                    const [id, from, to, dimension, mode, icon_path] = (q as ModalFormResponse).formValues;
                    world.setDynamicProperty(
                        "v2:" + prefix + id,
                        JSON.stringify({
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
                            dimension: Number(dimension),
                            mode: Number(mode),
                            icon_path: (icon_path ?? "") == "" ? undefined : icon_path,
                        })
                    );
                    return await editAreas(player, prefix);
                });
            case (t as ActionFormResponse).selection == a.length + 1 /*
    editPistonExtensionAreas(player)*/ /*
            screenForm123(); */:
                return 1;
            case (t as ActionFormResponse).selection == a.length + 2:
                return 0;
            case (t as ActionFormResponse).selection == a.length + 3:
                return await editAreas(player, prefix);
            default:
                form1234567.button(customFormUICodes.action.buttons.positions.main_only + "Edit", "textures/ui/book_edit_default");
                form1234567.button(customFormUICodes.action.buttons.positions.main_only + "Delete", /*"textures/ui/trash_can"*/ "textures/ui/trash_default");
                form1234567.button(
                    customFormUICodes.action.buttons.positions.title_bar_only + "Back",
                    /*"textures/ui/chat_return_back_arrow"*/ /*"textures/ui/undoArrow"*/ "textures/ui/chevron_left"
                );
                form1234567.button(customFormUICodes.action.buttons.positions.title_bar_only + "Close", "textures/ui/crossout");
                return await forceShow(form1234567, player).then(async (w) => {
                    if (w.canceled) {
                        editAreas(player, prefix);
                        return;
                    }
                    switch ((w as ActionFormResponse).selection) {
                        case 0: {
                            const defaults = JSON.parse(String(world.getDynamicProperty(String(a[Number((t as ActionFormResponse).selection)]))));
                            form12345.title("Edit Protected Area");
                            form123456.textField("From", "x1, y1, z1", `${defaults.from.x}, ${defaults.from.y}, ${defaults.from.z}`);
                            form123456.textField("To", "x2, y2, z2", `${defaults.to.x}, ${defaults.to.y}, ${defaults.to.z}`);
                            form123456.dropdown("Dimension", ["Overworld", "Nether", "The End"], defaults.dimension);
                            form123456.dropdown("Mode", ["Protection", "Anti-Protection"], defaults.mode);
                            form123456.textField("Icon Path (Optional)", "text", defaults.icon_path ?? "");
                            form123456.submitButton("Save");

                            return await forceShow(form123456, player).then(async (q) => {
                                if (q.canceled) return await editAreas(player, prefix);
                                const [from, to, dimension, mode, icon_path] = (q as ModalFormResponse).formValues;
                                world.setDynamicProperty(
                                    a[(t as ActionFormResponse).selection],
                                    JSON.stringify({
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
                                        dimension: Number(dimension),
                                        mode: Number(mode),
                                        icon_path: (icon_path ?? "") == "" ? undefined : icon_path,
                                    })
                                );
                                return await editAreas(player, prefix);
                            });
                        }
                        case 1:
                            world.setDynamicProperty(a[(t as ActionFormResponse).selection], undefined);
                            return await editAreas(player, prefix);
                        case 2:
                            return await editAreas(player, prefix);
                        case 3:
                            return 0;
                    }
                });
        }
    });
}
