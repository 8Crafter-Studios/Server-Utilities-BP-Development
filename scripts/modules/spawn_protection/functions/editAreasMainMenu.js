import { ActionFormData, ActionFormResponse } from "@minecraft/server-ui";
import { forceShow } from "modules/ui/functions/forceShow";
import { spawnProtectionTypeList } from "./spawnProtectionTypeList";
import { editAreas } from "./editAreas";
import { customFormUICodes } from "modules/ui/constants/customFormUICodes";
export async function editAreasMainMenu(sourceEntity) {
    let form = new ActionFormData();
    form.title(customFormUICodes.action.titles.formStyles.general + "Manage Protected Areas");
    form.body("Choose area type to edit. ");
    spawnProtectionTypeList.forEach((s) => {
        form.button(customFormUICodes.action.buttons.positions.main_only + s, "textures/ui/xyz_axis");
    });
    form.button(customFormUICodes.action.buttons.positions.title_bar_only + "Back", "textures/ui/arrow_left");
    form.button(customFormUICodes.action.buttons.positions.title_bar_only + "Close", "textures/ui/crossout");
    return await forceShow(form, sourceEntity).then(async (l) => {
        if (l.canceled || l.selection === spawnProtectionTypeList.length)
            return 1;
        if (l.selection === spawnProtectionTypeList.length + 1)
            return 0;
        try {
            if ((await editAreas(sourceEntity, spawnProtectionTypeList[l.selection])) === 1) {
                return await editAreasMainMenu(sourceEntity);
            }
            else {
                return 0;
            }
        }
        catch (e) {
            console.error(e, e.stack);
        }
    });
}
//# sourceMappingURL=editAreasMainMenu.js.map