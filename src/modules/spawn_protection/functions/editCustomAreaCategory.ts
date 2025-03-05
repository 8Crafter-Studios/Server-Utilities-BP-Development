import { EffectTypes, GameMode, Player, type Entity } from "@minecraft/server";
import { ActionFormData, ModalFormData } from "@minecraft/server-ui";
import {
    advancedCategoryPropertyDisplayNames,
    AdvancedProtectedAreaCategoryPropertyAllEnabledDefaults,
    AdvancedProtectedAreaCategoryPropertyAllEnabledDefaults_JSON,
    convertAdvancedPropertedAreaCategoryToJSON,
    ProtectedAreas,
    type AdvancedProtectedAreaCategory,
} from "init/variables/protectedAreaVariables";
import { BlockMask } from "modules/commands/classes/BlockMask";
import { executeCommandPlayerW } from "modules/commands/classes/executeCommandPlayerW";
import { customFormUICodes } from "modules/ui/constants/customFormUICodes";
import type { VerifyConstraint } from "modules/utilities/functions/filterProperties";
import { getDetailedType } from "modules/utilities/functions/getDetailedType";
import { showMessage } from "modules/utilities/functions/showMessage";
import { securityVariables } from "security/ultraSecurityModeUtils";

export async function editCustomAreaCategory(
    sourceEntitya: Entity | executeCommandPlayerW | Player,
    categoryID: (typeof ProtectedAreas)["areas"]["advancedAreaCategories"][number]["id"]
): Promise<0 | 1> {
    const sourceEntity = sourceEntitya instanceof executeCommandPlayerW ? sourceEntitya.player : (sourceEntitya as Player);
    if (arguments.length !== 2) {
        throw new TypeError(`Incorrect number of arguments to function. Expected 2, received ${arguments.length}.`);
    }
    if (!(sourceEntity instanceof Player)) {
        throw new TypeError(
            "Invalid Player. Function argument [0] (sourceEntitya) expected an instance of the Player class, or an instance of the executeCommandPlayerW class with a Player linked to it, but instead got " +
                getDetailedType(sourceEntity) +
                "."
        );
    }
    if (!(typeof categoryID === "string")) {
        throw new TypeError(
            `Native type conversion failed. Function argument [1] (categoryID) expected type string but got type ${getDetailedType(categoryID)} instead`
        );
    }
    if (securityVariables.ultraSecurityModeEnabled) {
        if (securityVariables.testPlayerForPermission(sourceEntity as Player, "andexdb.editCustomProtectedAreaCategories") == false) {
            const r = await showMessage(
                sourceEntity as Player,
                "Access Denied (403)",
                "You do not have permission to access this menu. You need the following permission to access this menu: andexdb.editCustomProtectedAreaCategories",
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
    const category = ProtectedAreas.areas.advancedAreaCategories.find((v) => v.id == categoryID);
    if (category === undefined)
        return (
            (
                await showMessage(
                    sourceEntity,
                    "Invalid Category ID",
                    `The custom protected area category with ID ${JSON.stringify(categoryID)} does not exist.`,
                    "Back",
                    "Close"
                )
            ).selection !== 1
        ).toNumber();
    try {
        const rb = await new ActionFormData()
            .title(customFormUICodes.action.titles.formStyles.medium + "Edit Built-In Category")
            .body(
                `ID: ${category.id}§r
Icon Path: ${category.icon_path ?? "None"}`
            )
            .button(
                customFormUICodes.action.buttons.positions.main_only + `Settings\n${!!category && category.enabled ? "§aEnabled" : "§cDisabled"}`,
                "textures/ui/icon_setting"
            )
            .button(
                `${customFormUICodes.action.buttons.positions.main_only}${
                    category.enabled ? "" : customFormUICodes.action.buttons.options.disabled
                }Block Placement Prevention\n${!!category.playerPlaceBlock && category.playerPlaceBlock.enabled !== false ? "§aEnabled" : "§cDisabled"}`,
                "textures/ui/pencil_edit_icon"
            )
            .button(
                `${customFormUICodes.action.buttons.positions.main_only}${
                    category.enabled ? "" : customFormUICodes.action.buttons.options.disabled
                }Block Breaking Prevention\n${!!category.playerBreakBlock && category.playerBreakBlock.enabled !== false ? "§aEnabled" : "§cDisabled"}`,
                "textures/ui/pencil_edit_icon"
            )
            .button(
                `${customFormUICodes.action.buttons.positions.main_only}${
                    category.enabled ? "" : customFormUICodes.action.buttons.options.disabled
                }Block Interaction Prevention\n${
                    !!category.playerInteractWithBlock && category.playerInteractWithBlock.enabled !== false ? "§aEnabled" : "§cDisabled"
                }`,
                "textures/ui/pencil_edit_icon"
            )
            // .button(`${customFormUICodes.action.buttons.positions.main_only}Entity Interaction Prevention\n${!!category.playerPlaceBlock && category.playerPlaceBlock.enabled !== false ? "§aEnabled" : "§cDisabled"}`, "textures/ui/pencil_edit_icon")
            .button(
                `${customFormUICodes.action.buttons.positions.main_only}${
                    category.enabled ? "" : customFormUICodes.action.buttons.options.disabled
                }Explosion Prevention\n${!!category.explosion && category.explosion.enabled !== false ? "§aEnabled" : "§cDisabled"}`,
                "textures/ui/pencil_edit_icon"
            )
            .button(
                `${customFormUICodes.action.buttons.positions.main_only}${
                    category.enabled ? "" : customFormUICodes.action.buttons.options.disabled
                }Entity Effect Add Prevention\n${!!category.effectAdd && category.effectAdd.enabled !== false ? "§aEnabled" : "§cDisabled"}`,
                "textures/ui/pencil_edit_icon"
            )
            .button(
                `${customFormUICodes.action.buttons.positions.main_only}${
                    category.enabled ? "" : customFormUICodes.action.buttons.options.disabled
                }Player Chat Message Send Prevention\n${!!category.chatSend && category.chatSend.enabled !== false ? "§aEnabled" : "§cDisabled"}`,
                "textures/ui/pencil_edit_icon"
            )
            .button(
                `${customFormUICodes.action.buttons.positions.main_only}${
                    category.enabled ? "" : customFormUICodes.action.buttons.options.disabled
                }Player Game Mode Change Prevention\n${
                    !!category.playerGameModeChange && category.playerGameModeChange.enabled !== false ? "§aEnabled" : "§cDisabled"
                }`,
                "textures/ui/pencil_edit_icon"
            )
            // .button(`${customFormUICodes.action.buttons.positions.main_only}PVP Prevention\n${!!category.noPVPZone && category.noPVPZone.enabled !== false ? "§aEnabled" : "§cDisabled"}`, "textures/ui/pencil_edit_icon")
            // .button(`${customFormUICodes.action.buttons.positions.main_only}Tag Area\n${!!category.tagZone && category.tagZone.enabled !== false ? "§aEnabled" : "§cDisabled"}`, "textures/ui/pencil_edit_icon")
            // .button(`${customFormUICodes.action.buttons.positions.main_only}Effect Area\n${!!category.effectZone && category.effectZone.enabled !== false ? "§aEnabled" : "§cDisabled"}`, "textures/ui/pencil_edit_icon")
            .button(customFormUICodes.action.buttons.positions.title_bar_only + "Back", "textures/ui/arrow_left")
            .button(customFormUICodes.action.buttons.positions.title_bar_only + "Close", "textures/ui/crossout")
            .button(customFormUICodes.action.buttons.positions.title_bar_only + "Delete", "textures/ui/trash_default")
            .button(customFormUICodes.action.buttons.positions.title_bar_only + "Duplicate", "textures/ui/copy")
            .button(customFormUICodes.action.buttons.positions.title_bar_only + "Refresh This Category", "textures/ui/refresh")
            .forceShow(sourceEntity);
        if (rb.canceled) return await editCustomAreaCategory(sourceEntity, categoryID);
        switch (
            (
                [
                    "settings",
                    "playerPlaceBlock",
                    "playerBreakBlock",
                    "playerInteractWithBlock",
                    "explosion",
                    "effectAdd",
                    "chatSend",
                    "playerGameModeChange",
                    "back",
                    "close",
                    "delete",
                    "duplicate",
                    "refresh",
                ] as const
            )[rb.selection]
        ) {
            case "settings":
                return await editCustomAreaCategorySettings(sourceEntity, categoryID);
            case "playerPlaceBlock":
                return await editCustomAreaCategorySetting(sourceEntity, categoryID, "playerPlaceBlock");
            case "playerBreakBlock":
                return await editCustomAreaCategorySetting(sourceEntity, categoryID, "playerBreakBlock");
            case "playerInteractWithBlock":
                return await editCustomAreaCategorySetting(sourceEntity, categoryID, "playerInteractWithBlock");
            case "explosion":
                return await editCustomAreaCategorySetting(sourceEntity, categoryID, "explosion");
            case "effectAdd":
                return await editCustomAreaCategorySetting(sourceEntity, categoryID, "effectAdd");
            case "chatSend":
                return await editCustomAreaCategorySetting(sourceEntity, categoryID, "chatSend");
            case "playerGameModeChange":
                return await editCustomAreaCategorySetting(sourceEntity, categoryID, "playerGameModeChange");
            case "back":
                return 1;
            case "close":
                return 0;
            case "delete":
                if (securityVariables.ultraSecurityModeEnabled) {
                    if (securityVariables.testPlayerForPermission(sourceEntity as Player, "andexdb.deleteCustomProtectedAreaCategories") == false) {
                        const r = await showMessage(
                            sourceEntity as Player,
                            "Access Denied (403)",
                            "You do not have permission to access this menu. You need the following permission to access this menu: andexdb.deleteCustomProtectedAreaCategories",
                            "Back",
                            "Cancel"
                        );
                        if (r.canceled || r.selection == 0) {
                            return await editCustomAreaCategory(sourceEntity, categoryID);
                        } else {
                            return 0;
                        }
                    }
                }
                if (
                    (
                        await showMessage(
                            sourceEntity,
                            "Are you sure?",
                            "Are you sure you want to delete this category? This will also delete any linked protected areas.",
                            "Cancel",
                            "Delete"
                        )
                    ).selection === 1
                ) {
                    ProtectedAreas.loadAreasForAdvancedCategory(categoryID);
                    [
                        ...ProtectedAreas.areas.advancedArea[categoryID].overworld,
                        ...ProtectedAreas.areas.advancedArea[categoryID].nether,
                        ...ProtectedAreas.areas.advancedArea[categoryID].the_end,
                    ].forEach((area) => {
                        world.setDynamicProperty("advancedProtectedArea:" + categoryID + ":" + area.id);
                    });
                    delete ProtectedAreas.areas.advancedArea[categoryID];
                    world.setDynamicProperty("advancedProtectedAreaCategory:" + categoryID);
                    delete ProtectedAreas.areas.advancedAreaCategories[
                        ProtectedAreas.areas.advancedAreaCategories.findIndex((category) => category.id === categoryID)
                    ];
                    if (
                        (await showMessage(sourceEntity, "Category Deleted", "This protected area category has been successfully deleted.", "Back", "Close"))
                            .selection === 1
                    ) {
                        return 1;
                    } else {
                        return 0;
                    }
                } else {
                    if (
                        (
                            await showMessage(
                                sourceEntity,
                                "Deletion Canceled",
                                "The deletion of this protected area category has been successfully cancelled.",
                                "Back",
                                "Close"
                            )
                        ).selection === 1
                    ) {
                        return 1;
                    } else {
                        return 0;
                    }
                }
            case "duplicate":
                if (securityVariables.ultraSecurityModeEnabled) {
                    if (securityVariables.testPlayerForPermission(sourceEntity as Player, "andexdb.createCustomProtectedAreaCategories") == false) {
                        const r = await showMessage(
                            sourceEntity as Player,
                            "Access Denied (403)",
                            "You do not have permission to access this menu. You need the following permission to access this menu: andexdb.createCustomProtectedAreaCategories",
                            "Back",
                            "Cancel"
                        );
                        if (r.canceled || r.selection == 0) {
                            return await editCustomAreaCategory(sourceEntity, categoryID);
                        } else {
                            return 0;
                        }
                    }
                }
                // return await duplicateCustomAreaCategory(sourceEntity, categoryID);
                /**
                 * @todo Implement the duplication feature.
                 */
                return await showMessage(
                    sourceEntity as Player,
                    undefined,
                    "§cSorry, the ability to duplicate custom area categories is not yet implemented.",
                    "Back",
                    "Close"
                ).then(async (r) => {
                    if (r.selection === 0) {
                        return await editCustomAreaCategory(sourceEntity, categoryID);
                    } else {
                        return 0;
                    }
                });
            case "refresh":
                ProtectedAreas.loadAdvancedCategory(categoryID);
                return await editCustomAreaCategory(sourceEntity, categoryID);
        }
    } catch (e) {
        console.error(e, e.stack);
        // Present the error to the user, and return 1 if they select "Back", and 0 if they select "Close".
        return ((await showMessage(sourceEntity, "An Error occurred", `An error occurred: ${e}${e?.stack}`, "Back", "Close")).selection !== 1).toNumber();
    }
}

export async function editCustomAreaCategorySettings(
    sourceEntitya: Entity | executeCommandPlayerW | Player,
    categoryID: (typeof ProtectedAreas)["areas"]["advancedAreaCategories"][number]["id"]
): Promise<0 | 1> {
    const sourceEntity = sourceEntitya instanceof executeCommandPlayerW ? sourceEntitya.player : (sourceEntitya as Player);
    if (arguments.length !== 2) {
        throw new TypeError(`Incorrect number of arguments to function. Expected 2, received ${arguments.length}.`);
    }
    if (!(sourceEntity instanceof Player)) {
        throw new TypeError(
            "Invalid Player. Function argument [0] (sourceEntitya) expected an instance of the Player class, or an instance of the executeCommandPlayerW class with a Player linked to it, but instead got " +
                getDetailedType(sourceEntity) +
                "."
        );
    }
    if (!(typeof categoryID === "string")) {
        throw new TypeError(
            `Native type conversion failed. Function argument [1] (categoryID) expected type string but got type ${getDetailedType(categoryID)} instead`
        );
    }
    if (securityVariables.ultraSecurityModeEnabled) {
        if (securityVariables.testPlayerForPermission(sourceEntity as Player, "andexdb.editCustomProtectedAreaCategories") == false) {
            const r = await showMessage(
                sourceEntity as Player,
                "Access Denied (403)",
                "You do not have permission to access this menu. You need the following permission to access this menu: andexdb.editCustomProtectedAreaCategories",
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
    const category = ProtectedAreas.areas.advancedAreaCategories.find((v) => v.id == categoryID);
    if (category === undefined)
        return (
            (
                await showMessage(
                    sourceEntity,
                    "Invalid Category ID",
                    `The custom protected area category with ID ${JSON.stringify(categoryID)} does not exist.`,
                    "Back",
                    "Close"
                )
            ).selection !== 1
        ).toNumber();
    const form = new ModalFormData();
    form.title(customFormUICodes.action.titles.formStyles.medium + "Custom Area Category Settings"); /* 
    form.textField(
        "Category ID",
        "string",
        category.id
    ) */
    form.toggle(
        "Enabled\nWhether or not this protected area category is enabled. If disabled, then any areas in this category will cease to function until this is enabled.",
        category.enabled ?? true
    );
    form.textField("Icon Path (Optional)", "string", category.icon_path ?? "");
    form.submitButton("Save");
    const r = await form.forceShow(sourceEntity);
    if (r.canceled) return 1;
    category.enabled = r.formValues[0] as boolean;
    category.icon_path = r.formValues[1] as string;
    const out: AdvancedProtectedAreaCategory<true> = JSON.parse(world.getDynamicProperty("advancedProtectedAreaCategory:" + categoryID) as string);
    out.enabled = r.formValues[0] as boolean;
    out.icon_path = r.formValues[1] as string;
    world.setDynamicProperty("advancedProtectedAreaCategory:" + categoryID, JSON.stringify(out));
    return 1;
}

export async function editCustomAreaCategorySetting(
    sourceEntitya: Entity | executeCommandPlayerW | Player,
    categoryID: (typeof ProtectedAreas)["areas"]["advancedAreaCategories"][number]["id"],
    setting: Exclude<keyof AdvancedProtectedAreaCategory, "icon_path" | "id" | "enabled">
): Promise<0 | 1> {
    const sourceEntity = sourceEntitya instanceof executeCommandPlayerW ? sourceEntitya.player : (sourceEntitya as Player);
    if (arguments.length !== 3) {
        throw new TypeError(`Incorrect number of arguments to function. Expected 3, received ${arguments.length}.`);
    }
    if (!(sourceEntity instanceof Player)) {
        throw new TypeError(
            "Invalid Player. Function argument [0] (sourceEntitya) expected an instance of the Player class, or an instance of the executeCommandPlayerW class with a Player linked to it, but instead got " +
                getDetailedType(sourceEntity) +
                "."
        );
    }
    if (!(typeof categoryID === "string")) {
        throw new TypeError(
            `Native type conversion failed. Function argument [1] (categoryID) expected type string but got type ${getDetailedType(categoryID)} instead`
        );
    }
    if (!(typeof setting === "string")) {
        throw new TypeError(
            `Native type conversion failed. Function argument [2] (setting) expected type string but got type ${getDetailedType(categoryID)} instead`
        );
    }
    if (securityVariables.ultraSecurityModeEnabled) {
        if (securityVariables.testPlayerForPermission(sourceEntity as Player, "andexdb.editCustomProtectedAreaCategories") == false) {
            const r = await showMessage(
                sourceEntity as Player,
                "Access Denied (403)",
                "You do not have permission to access this menu. You need the following permission to access this menu: andexdb.editCustomProtectedAreaCategories",
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
    try {
        const category = ProtectedAreas.areas.advancedAreaCategories.find((v) => v.id == categoryID);
        if (category === undefined)
            return (
                (
                    await showMessage(
                        sourceEntity,
                        "Invalid Category ID",
                        `The custom protected area category with ID ${JSON.stringify(categoryID)} does not exist.`,
                        "Back",
                        "Close"
                    )
                ).selection !== 1
            ).toNumber();
        const option = category[setting];
        const form = new ActionFormData();
        form.title(customFormUICodes.action.titles.formStyles.medium + "Custom Area Category Settings");
        form.body(`Edit custom area category settings for ${advancedCategoryPropertyDisplayNames[setting]} in ${categoryID}.`);
        form.button(
            `${customFormUICodes.action.buttons.positions.main_only}${!!option && option.enabled ? "§aEnabled" : "§cDisabled"}`,
            !!option && option.enabled ? "textures/ui/toggle_on" : "textures/ui/toggle_off"
        );
        let optionsList: (
            | Exclude<KeysOfUnion<Exclude<typeof option, false>>, "fromGameModes" | "toGameModes" | "fromGameModesToGameModes" | "rawmask" | "mode" | "enabled">
            | "gameModeFilters"
        )[] = [];
        switch (setting) {
            case "playerPlaceBlock": {
                // !!category[setting] && category[setting];
                optionsList = ["allowedBypassTags", "heldItemFilters", "mask"];
                const option = category[setting];
                form.button(
                    `${customFormUICodes.action.buttons.positions.main_only}${
                        !!option && option.enabled ? "" : customFormUICodes.action.buttons.options.disabled
                    }Allowed Bypass Tags\n${
                        !!option && !!option.allowedBypassTags
                            ? option.allowedBypassTags.length === 1
                                ? "1 tag"
                                : `${option.allowedBypassTags.length} tags`
                            : "0 tags"
                    }`,
                    "textures/ui/pencil_edit_icon"
                );
                form.button(
                    `${customFormUICodes.action.buttons.positions.main_only}${
                        !!option && option.enabled ? "" : customFormUICodes.action.buttons.options.disabled
                    }Held Item Filters\n${
                        !!option && !!option.heldItemFilters
                            ? option.heldItemFilters.items.length === 1
                                ? `1 item ${option.heldItemFilters.mode ?? "exclude"}d`
                                : `${option.heldItemFilters.items.length} items ${option.heldItemFilters.mode ?? "exclude"}d`
                            : `0 items excluded`
                    }`,
                    "textures/ui/pencil_edit_icon"
                );
                form.button(
                    `${customFormUICodes.action.buttons.positions.main_only}${
                        !!option && option.enabled ? "" : customFormUICodes.action.buttons.options.disabled
                    }Block Mask\n${
                        !!option && !!option.mask && option.mask.blocks.length !== 0
                            ? option.mask.blocks.length === 1
                                ? `1 block permutation ${option.mode ?? "exclude"}d`
                                : `${option.mask.blocks.length} blocks ${option.mode ?? "exclude"}d`
                            : `All Blocks`
                    }`,
                    "textures/ui/pencil_edit_icon"
                );
                break;
            }
            case "playerBreakBlock": {
                optionsList = ["allowedBypassTags", "heldItemFilters", "mask"];
                const option = category[setting];
                form.button(
                    `${customFormUICodes.action.buttons.positions.main_only}${
                        !!option && option.enabled ? "" : customFormUICodes.action.buttons.options.disabled
                    }Allowed Bypass Tags\n${
                        !!option && !!option.allowedBypassTags
                            ? option.allowedBypassTags.length === 1
                                ? "1 tag"
                                : `${option.allowedBypassTags.length} tags`
                            : "0 tags"
                    }`,
                    "textures/ui/pencil_edit_icon"
                );
                form.button(
                    `${customFormUICodes.action.buttons.positions.main_only}${
                        !!option && option.enabled ? "" : customFormUICodes.action.buttons.options.disabled
                    }Held Item Filters\n${
                        !!option && !!option.heldItemFilters
                            ? option.heldItemFilters.items.length === 1
                                ? `1 item ${option.heldItemFilters.mode ?? "exclude"}d`
                                : `${option.heldItemFilters.items.length} items ${option.heldItemFilters.mode ?? "exclude"}d`
                            : `0 items excluded`
                    }`,
                    "textures/ui/pencil_edit_icon"
                );
                form.button(
                    `${customFormUICodes.action.buttons.positions.main_only}${
                        !!option && option.enabled ? "" : customFormUICodes.action.buttons.options.disabled
                    }Block Mask\n${
                        !!option && !!option.mask && option.mask.blocks.length !== 0
                            ? option.mask.blocks.length === 1
                                ? `1 block permutation ${option.mode ?? "exclude"}d`
                                : `${option.mask.blocks.length} blocks ${option.mode ?? "exclude"}d`
                            : `All Blocks`
                    }`,
                    "textures/ui/pencil_edit_icon"
                );
                break;
            }
            case "playerInteractWithBlock": {
                optionsList = ["allowedBypassTags", "heldItemFilters", "mask"];
                const option = category[setting];
                form.button(
                    `${customFormUICodes.action.buttons.positions.main_only}${
                        !!option && option.enabled ? "" : customFormUICodes.action.buttons.options.disabled
                    }Allowed Bypass Tags\n${
                        !!option && !!option.allowedBypassTags
                            ? option.allowedBypassTags.length === 1
                                ? "1 tag"
                                : `${option.allowedBypassTags.length} tags`
                            : "0 tags"
                    }`,
                    "textures/ui/pencil_edit_icon"
                );
                form.button(
                    `${customFormUICodes.action.buttons.positions.main_only}${
                        !!option && option.enabled ? "" : customFormUICodes.action.buttons.options.disabled
                    }Held Item Filters\n${
                        !!option && !!option.heldItemFilters
                            ? option.heldItemFilters.items.length === 1
                                ? `1 item ${option.heldItemFilters.mode ?? "exclude"}d`
                                : `${option.heldItemFilters.items.length} items ${option.heldItemFilters.mode ?? "exclude"}d`
                            : `0 items excluded`
                    }`,
                    "textures/ui/pencil_edit_icon"
                );
                form.button(
                    `${customFormUICodes.action.buttons.positions.main_only}${
                        !!option && option.enabled ? "" : customFormUICodes.action.buttons.options.disabled
                    }Block Mask\n${
                        !!option && !!option.mask && option.mask.blocks.length !== 0
                            ? option.mask.blocks.length === 1
                                ? `1 block permutation ${option.mode ?? "exclude"}d`
                                : `${option.mask.blocks.length} blocks ${option.mode ?? "exclude"}d`
                            : `All Blocks`
                    }`,
                    "textures/ui/pencil_edit_icon"
                );
                break;
            }
            case "explosion": {
                optionsList = ["allowedBypassTags", "heldItemFilters", "mask", "sourceEntityFilter"];
                const option = category[setting];
                form.button(
                    `${customFormUICodes.action.buttons.positions.main_only}${
                        !!option && option.enabled ? "" : customFormUICodes.action.buttons.options.disabled
                    }Allowed Bypass Tags\n${
                        !!option && !!option.allowedBypassTags
                            ? option.allowedBypassTags.length === 1
                                ? "1 tag"
                                : `${option.allowedBypassTags.length} tags`
                            : "0 tags"
                    }`,
                    "textures/ui/pencil_edit_icon"
                );
                form.button(
                    `${customFormUICodes.action.buttons.positions.main_only}${
                        !!option && option.enabled ? "" : customFormUICodes.action.buttons.options.disabled
                    }Held Item Filters\n${
                        !!option && !!option.heldItemFilters
                            ? option.heldItemFilters.items.length === 1
                                ? `1 item ${option.heldItemFilters.mode ?? "exclude"}d`
                                : `${option.heldItemFilters.items.length} items ${option.heldItemFilters.mode ?? "exclude"}d`
                            : `0 items excluded`
                    }`,
                    "textures/ui/pencil_edit_icon"
                );
                form.button(
                    `${customFormUICodes.action.buttons.positions.main_only}${
                        !!option && option.enabled ? "" : customFormUICodes.action.buttons.options.disabled
                    }Block Mask\n${
                        !!option && !!option.mask && option.mask.blocks.length !== 0
                            ? option.mask.blocks.length === 1
                                ? `1 block permutation ${option.mode ?? "exclude"}d`
                                : `${option.mask.blocks.length} blocks ${option.mode ?? "exclude"}d`
                            : `All Blocks`
                    }`,
                    "textures/ui/pencil_edit_icon"
                );
                form.button(
                    `${customFormUICodes.action.buttons.positions.main_only}${
                        !!option && option.enabled ? "" : customFormUICodes.action.buttons.options.disabled
                    }Source Entity Filter\n${
                        !!option &&
                        !!option.sourceEntityFilter &&
                        (option.sourceEntityFilter.excludeTags?.length > 0 ||
                            option.sourceEntityFilter.includeTags?.length > 0 ||
                            option.sourceEntityFilter.excludeTypes?.length > 0 ||
                            option.sourceEntityFilter.includeTypes?.length > 0)
                            ? `${
                                  option.sourceEntityFilter.excludeTags?.length > 0
                                      ? option.sourceEntityFilter.excludeTags.length === 1
                                          ? `1 tag excluded`
                                          : `${option.sourceEntityFilter.excludeTags.length} tags excluded`
                                      : option.sourceEntityFilter.includeTags?.length > 0
                                      ? option.sourceEntityFilter.includeTags?.length === 1
                                          ? `1 tag included`
                                          : `${option.sourceEntityFilter.includeTags.length} tags included`
                                      : ""
                              }${
                                  option.sourceEntityFilter.excludeTypes?.length > 0
                                      ? option.sourceEntityFilter.excludeTypes.length === 1
                                          ? `1 type excluded`
                                          : `${option.sourceEntityFilter.excludeTypes.length} types excluded`
                                      : option.sourceEntityFilter.includeTypes?.length > 0
                                      ? option.sourceEntityFilter.includeTypes?.length === 1
                                          ? `1 type included`
                                          : `${option.sourceEntityFilter.includeTypes.length} types included`
                                      : ""
                              }`
                            : "No Filter"
                    }`,
                    "textures/ui/pencil_edit_icon"
                );
                break;
            } /* 
            case "playerInteractWithEntity": {
                optionsList = ["allowedBypassTags", "heldItemFilters", "mask"];
                const option = category[setting];
                form.button(`${customFormUICodes.action.buttons.positions.main_only}${!!option && option.enabled ? "" : customFormUICodes.action.buttons.options.disabled}Allowed Bypass Tags\n${!!option && !!option.allowedBypassTags ? option.allowedBypassTags.length === 1 ? "1 tag" : `${option.allowedBypassTags.length} tags` : "0 tags"}`, "textures/ui/pencil_edit_icon");
                form.button(`${customFormUICodes.action.buttons.positions.main_only}${!!option && option.enabled ? "" : customFormUICodes.action.buttons.options.disabled}Held Item Filters\n${!!option && !!option.heldItemFilters ? option.heldItemFilters.items.length === 1 ? `1 item ${option.heldItemFilters.mode ?? "exclude"}d` : `${option.heldItemFilters.items.length} items ${option.heldItemFilters.mode ?? "exclude"}d` : `0 items excluded`}`, "textures/ui/pencil_edit_icon");
                form.button(`${customFormUICodes.action.buttons.positions.main_only}${!!option && option.enabled ? "" : customFormUICodes.action.buttons.options.disabled}Block Mask\n${!!option && !!option.mask && option.mask.blocks.length !== 0 ? option.mask.blocks.length === 1 ? `1 block permutation ${option.mode ?? "exclude"}d` : `${option.mask.blocks.length} blocks ${option.mode ?? "exclude"}d` : `All Blocks`}`, "textures/ui/pencil_edit_icon");
                break;
            } */
            case "playerGameModeChange": {
                optionsList = ["allowedBypassTags", "heldItemFilters", "gameModeFilters"];
                const option = category[setting];
                form.button(
                    `${customFormUICodes.action.buttons.positions.main_only}${
                        !!option && option.enabled ? "" : customFormUICodes.action.buttons.options.disabled
                    }Allowed Bypass Tags\n${
                        !!option && !!option.allowedBypassTags
                            ? option.allowedBypassTags.length === 1
                                ? "1 tag"
                                : `${option.allowedBypassTags.length} tags`
                            : "0 tags"
                    }`,
                    "textures/ui/pencil_edit_icon"
                );
                form.button(
                    `${customFormUICodes.action.buttons.positions.main_only}${
                        !!option && option.enabled ? "" : customFormUICodes.action.buttons.options.disabled
                    }Held Item Filters\n${
                        !!option && !!option.heldItemFilters
                            ? option.heldItemFilters.items.length === 1
                                ? `1 item ${option.heldItemFilters.mode ?? "exclude"}d`
                                : `${option.heldItemFilters.items.length} items ${option.heldItemFilters.mode ?? "exclude"}d`
                            : `0 items excluded`
                    }`,
                    "textures/ui/pencil_edit_icon"
                );
                form.button(
                    `${customFormUICodes.action.buttons.positions.main_only}${
                        !!option && option.enabled ? "" : customFormUICodes.action.buttons.options.disabled
                    }Game Mode Filters\n${
                        !!option &&
                        ((!!option.fromGameModes && option.fromGameModes.length > 0) ||
                            (!!option.toGameModes && option.toGameModes.length > 0) ||
                            (!!option.fromGameModesToGameModes && option.fromGameModesToGameModes.length > 0))
                            ? (() => {
                                  let filterCount = 0;
                                  if (!!option.fromGameModes && option.fromGameModes.length > 0) filterCount += option.fromGameModes.length;
                                  if (!!option.toGameModes && option.toGameModes.length > 0) filterCount += option.toGameModes.length;
                                  if (!!option.fromGameModesToGameModes && option.fromGameModesToGameModes.length > 0)
                                      filterCount += option.fromGameModesToGameModes.length;
                                  return filterCount === 1 ? "1 filter" : `${filterCount} filters`;
                              })()
                            : `No Filters`
                    }`,
                    "textures/ui/pencil_edit_icon"
                );
                break;
            }
            case "chatSend": {
                optionsList = ["allowedBypassTags", "heldItemFilters"];
                const option = category[setting];
                form.button(
                    `${customFormUICodes.action.buttons.positions.main_only}${
                        !!option && option.enabled ? "" : customFormUICodes.action.buttons.options.disabled
                    }Allowed Bypass Tags\n${
                        !!option && !!option.allowedBypassTags
                            ? option.allowedBypassTags.length === 1
                                ? "1 tag"
                                : `${option.allowedBypassTags.length} tags`
                            : "0 tags"
                    }`,
                    "textures/ui/pencil_edit_icon"
                );
                form.button(
                    `${customFormUICodes.action.buttons.positions.main_only}${
                        !!option && option.enabled ? "" : customFormUICodes.action.buttons.options.disabled
                    }Held Item Filters\n${
                        !!option && !!option.heldItemFilters
                            ? option.heldItemFilters.items.length === 1
                                ? `1 item ${option.heldItemFilters.mode ?? "exclude"}d`
                                : `${option.heldItemFilters.items.length} items ${option.heldItemFilters.mode ?? "exclude"}d`
                            : `0 items excluded`
                    }`,
                    "textures/ui/pencil_edit_icon"
                );
                break;
            }
            case "effectAdd": {
                optionsList = ["effectFilter", "sourceEntityFilter"];
                const option = category[setting];
                form.button(
                    `${customFormUICodes.action.buttons.positions.main_only}${
                        !!option && option.enabled ? "" : customFormUICodes.action.buttons.options.disabled
                    }Effect Filter\n${
                        !!option && !!option.effectFilter && (option.effectFilter.excludeTypes?.length > 0 || option.effectFilter.includeTypes?.length > 0)
                            ? option.effectFilter.excludeTypes?.length > 0
                                ? option.effectFilter.excludeTypes.length === 1
                                    ? "1 effect excluded"
                                    : `${option.effectFilter.excludeTypes.length} effects excluded`
                                : option.effectFilter.includeTypes.length === 1
                                ? "1 effect included"
                                : `${option.effectFilter.includeTypes.length} effects included`
                            : "All Effects"
                    }${
                        !!option && !!option.effectFilter && !Number.isNaN(Number(option.effectFilter.minDuration))
                            ? `, min duration: ${option.effectFilter.minDuration}`
                            : ""
                    }${
                        !!option && !!option.effectFilter && !Number.isNaN(Number(option.effectFilter.maxDuration))
                            ? `, max duration: ${option.effectFilter.maxDuration}`
                            : ""
                    }`,
                    "textures/ui/pencil_edit_icon"
                );
                form.button(
                    `${customFormUICodes.action.buttons.positions.main_only}${
                        !!option && option.enabled ? "" : customFormUICodes.action.buttons.options.disabled
                    }Source Entity Filter\n${
                        !!option &&
                        !!option.sourceEntityFilter &&
                        (option.sourceEntityFilter.excludeTags?.length > 0 ||
                            option.sourceEntityFilter.includeTags?.length > 0 ||
                            option.sourceEntityFilter.excludeTypes?.length > 0 ||
                            option.sourceEntityFilter.includeTypes?.length > 0)
                            ? `${
                                  option.sourceEntityFilter.excludeTags?.length > 0
                                      ? option.sourceEntityFilter.excludeTags.length === 1
                                          ? `1 tag excluded`
                                          : `${option.sourceEntityFilter.excludeTags.length} tags excluded`
                                      : option.sourceEntityFilter.includeTags?.length > 0
                                      ? option.sourceEntityFilter.includeTags?.length === 1
                                          ? `1 tag included`
                                          : `${option.sourceEntityFilter.includeTags.length} tags included`
                                      : ""
                              }${
                                  option.sourceEntityFilter.excludeTypes?.length > 0
                                      ? option.sourceEntityFilter.excludeTypes.length === 1
                                          ? `1 type excluded`
                                          : `${option.sourceEntityFilter.excludeTypes.length} types excluded`
                                      : option.sourceEntityFilter.includeTypes?.length > 0
                                      ? option.sourceEntityFilter.includeTypes?.length === 1
                                          ? `1 type included`
                                          : `${option.sourceEntityFilter.includeTypes.length} types included`
                                      : ""
                              }`
                            : "No Filter"
                    }`,
                    "textures/ui/pencil_edit_icon"
                );
                break;
            }
            default:
                throw new Error("Invalid option type.");
        }
        form.button(
            `${customFormUICodes.action.buttons.positions.main_only}${!!option && option.enabled ? "" : customFormUICodes.action.buttons.options.disabled}`,
            !!option && option.enabled ? "textures/ui/toggle_on" : "textures/ui/toggle_off"
        );
        form.button(customFormUICodes.action.buttons.positions.title_bar_only + "Back", "textures/ui/arrow_left");
        form.button(customFormUICodes.action.buttons.positions.title_bar_only + "Close", "textures/ui/crossout");
        return await form.forceShow(sourceEntity).then(async (rb) => {
            if (rb.canceled) return await editCustomAreaCategory(sourceEntity, categoryID);
            switch (
                (["toggle"] as const)[rb.selection] ??
                optionsList[rb.selection - 1] ??
                (["back", "close"] as const)[rb.selection - optionsList.length - 1]
            ) {
                case "toggle": {
                    if (!!category[setting]) {
                        if (category[setting].enabled === false) {
                            category[setting].enabled = true;
                        } else {
                            category[setting].enabled = true;
                        }
                    } else {
                        category[setting] = AdvancedProtectedAreaCategoryPropertyAllEnabledDefaults[setting] as any;
                    }
                    const out: AdvancedProtectedAreaCategory<true> = JSON.parse(
                        world.getDynamicProperty("advancedProtectedAreaCategory:" + categoryID) as string
                    );
                    if (!!out[setting]) {
                        if (out[setting].enabled === false) {
                            out[setting].enabled = true;
                        } else {
                            out[setting].enabled = true;
                        }
                    } else {
                        out[setting] = AdvancedProtectedAreaCategoryPropertyAllEnabledDefaults_JSON[setting] as any;
                    }
                    world.setDynamicProperty("advancedProtectedAreaCategory:" + categoryID, JSON.stringify(out));
                    return await editCustomAreaCategorySetting(sourceEntity, categoryID, setting);
                }
                case "allowedBypassTags": {
                    if (!!!category[setting]) {
                        if (
                            (
                                await showMessage(
                                    sourceEntity,
                                    "Event Disabled",
                                    `${advancedCategoryPropertyDisplayNames[setting]} is disabled, so this menu cannot be accessed.`,
                                    "Back",
                                    "Cancel"
                                )
                            ).selection !== 1
                        ) {
                            return await editCustomAreaCategorySetting(sourceEntity, categoryID, setting);
                        } else {
                            return 0;
                        }
                    }
                    if (!("allowedBypassTags" in category[setting])) throw new Error("allowedBypassTags is not a property of this event");
                    let form = new ModalFormData();
                    form.title("Allowed Bypass Tags");
                    form.textField(
                        "Allowed Bypass Tags",
                        "Comma separated list.",
                        (category[setting] as VerifyConstraint<(typeof category)[typeof setting], { allowedBypassTags: string[] }>).allowedBypassTags?.join(
                            ","
                        ) ?? ""
                    );
                    const r = await form.forceShow(sourceEntity);
                    if (r.canceled) return await editCustomAreaCategorySetting(sourceEntity, categoryID, setting);
                    (category[setting] as VerifyConstraint<(typeof category)[typeof setting], { allowedBypassTags: string[] }>).allowedBypassTags = (
                        r.formValues?.[0] as string
                    ).split(/,\s?/g);
                    const out: AdvancedProtectedAreaCategory<true> = JSON.parse(
                        world.getDynamicProperty("advancedProtectedAreaCategory:" + categoryID) as string
                    );
                    (out[setting] as VerifyConstraint<(typeof out)[typeof setting], { allowedBypassTags: string[] }>).allowedBypassTags = (
                        r.formValues?.[0] as string
                    ).split(/,\s?/g);
                    world.setDynamicProperty("advancedProtectedAreaCategory:" + categoryID, JSON.stringify(out));
                    return await editCustomAreaCategorySetting(sourceEntity, categoryID, setting);
                }
                case "effectFilter": {
                    if (!!!category[setting]) {
                        if (
                            (
                                await showMessage(
                                    sourceEntity,
                                    "Event Disabled",
                                    `${advancedCategoryPropertyDisplayNames[setting]} is disabled, so this menu cannot be accessed.`,
                                    "Back",
                                    "Cancel"
                                )
                            ).selection !== 1
                        ) {
                            return await editCustomAreaCategorySetting(sourceEntity, categoryID, setting);
                        } else {
                            return 0;
                        }
                    }
                    if (!("effectFilter" in category[setting])) throw new Error("effectFilter is not a property of this event");
                    const catProp = category[setting] as Exclude<(typeof category)["effectAdd"], false>;
                    let form = new ModalFormData();
                    form.title("Effect Filter");
                    form.dropdown(
                        "Effect Filter Type\nInclude will cause only effects listed below to be blocked, exclude will cause all other effects to be blocked.",
                        ["exclude", "include"],
                        catProp.effectFilter?.excludeTypes?.length === 1 ? 0 : 1
                    );
                    form.textField(
                        `Types\nList of effect types to allow or block.\nValid Effect Types: ${EffectTypes.getAll().join(", ")}\nComma separated list.`,
                        "Comma separated list.",
                        ((category[setting] as Exclude<(typeof category)["effectAdd"], false>).effectFilter?.excludeTypes?.length ?? 0) === 0
                            ? (category[setting] as Exclude<(typeof category)["effectAdd"], false>).effectFilter?.includeTypes?.join(",") ?? ""
                            : (category[setting] as Exclude<(typeof category)["effectAdd"], false>).effectFilter?.excludeTypes?.join(",") ?? ""
                    );
                    form.textField(
                        "Minimum Effect Duration\nThis will cause this to only block effects with a duration of at least this many seconds.\nLeave blank to have no minimum.",
                        "int",
                        String((category[setting] as Exclude<(typeof category)["effectAdd"], false>)?.effectFilter?.minDuration ?? "")
                    );
                    form.textField(
                        "Maximum Effect Duration\nThis will cause this to only block effects with a duration of at most this many seconds.\nLeave blank to have no maximum.",
                        "int",
                        String((category[setting] as Exclude<(typeof category)["effectAdd"], false>)?.effectFilter?.maxDuration ?? "")
                    );
                    const r = await form.forceShow(sourceEntity);
                    if (r.canceled) return await editCustomAreaCategorySetting(sourceEntity, categoryID, setting);
                    const [mode, types, minDuration, maxDuration] = r.formValues as [mode: 0 | 1, types: string, minDuration: string, maxDuration: string];
                    catProp.effectFilter.excludeTypes = mode === 0 ? (types === "" ? [] : types.split(/,\s?/g)) : [];
                    catProp.effectFilter.includeTypes = mode === 1 ? (types === "" ? [] : types.split(/,\s?/g)) : [];
                    catProp.effectFilter.minDuration = minDuration === "" ? undefined : minDuration.toNumber();
                    catProp.effectFilter.maxDuration = maxDuration === "" ? undefined : maxDuration.toNumber();
                    const out: AdvancedProtectedAreaCategory<true> = JSON.parse(
                        world.getDynamicProperty("advancedProtectedAreaCategory:" + categoryID) as string
                    );
                    const outProp = out[setting] as Exclude<(typeof out)["effectAdd"], false>;
                    outProp.effectFilter.excludeTypes =
                        (r.formValues?.[0] as 0 | 1) === 0 ? (r.formValues?.[1] === "" ? [] : (r.formValues?.[1] as string).split(/,\s?/g)) : [];
                    outProp.effectFilter.includeTypes =
                        (r.formValues?.[0] as 0 | 1) === 1 ? (r.formValues?.[1] === "" ? [] : (r.formValues?.[1] as string).split(/,\s?/g)) : [];
                    outProp.effectFilter.minDuration = minDuration === "" ? undefined : minDuration.toNumber();
                    outProp.effectFilter.maxDuration = maxDuration === "" ? undefined : maxDuration.toNumber();
                    world.setDynamicProperty("advancedProtectedAreaCategory:" + categoryID, JSON.stringify(out));
                    return await editCustomAreaCategorySetting(sourceEntity, categoryID, setting);
                }
                case "gameModeFilters": {
                    if (!!!category[setting]) {
                        if (
                            (
                                await showMessage(
                                    sourceEntity,
                                    "Event Disabled",
                                    `${advancedCategoryPropertyDisplayNames[setting]} is disabled, so this menu cannot be accessed.`,
                                    "Back",
                                    "Cancel"
                                )
                            ).selection !== 1
                        ) {
                            return await editCustomAreaCategorySetting(sourceEntity, categoryID, setting);
                        } else {
                            return 0;
                        }
                    }
                    if (!("fromGameModes" in category[setting])) throw new Error("fromGameModes is not a property of this event");
                    if (!("toGameModes" in category[setting])) throw new Error("toGameModes is not a property of this event");
                    if (!("fromGameModesToGameModes" in category[setting])) throw new Error("fromGameModesToGameModes is not a property of this event");
                    let form = new ModalFormData();
                    form.title("Game Mode Filter");
                    form.textField(
                        "To block all game mode changes, leave all of the text boxes below blank.\n\nFrom Game Modes\nA list of gamemodes that if the player is switching out of one of these gamemodes, it will be blocked.\nComma separated list.\nLeave blank to have no from game modes filter.",
                        "Comma separated list.",
                        (category[setting] as Exclude<(typeof category)["playerGameModeChange"], false>).fromGameModes?.length === 0
                            ? (category[setting] as Exclude<(typeof category)["playerGameModeChange"], false>).fromGameModes?.length === 0
                                ? (category[setting] as Exclude<(typeof category)["playerGameModeChange"], false>).fromGameModes?.join(",") ?? ""
                                : ""
                            : (category[setting] as Exclude<(typeof category)["playerGameModeChange"], false>).fromGameModes?.join(",") ?? ""
                    );
                    form.textField(
                        "To Game Modes\nA list of gamemodes that if the player is switching to one of these gamemodes, it will be blocked.\nComma separated list.\nLeave blank to have no to game modes filter.",
                        "Comma separated list.",
                        (category[setting] as Exclude<(typeof category)["playerGameModeChange"], false>).fromGameModes?.length === 0
                            ? (category[setting] as Exclude<(typeof category)["playerGameModeChange"], false>).fromGameModes?.length === 0
                                ? (category[setting] as Exclude<(typeof category)["playerGameModeChange"], false>).fromGameModes?.join(",") ?? ""
                                : ""
                            : (category[setting] as Exclude<(typeof category)["playerGameModeChange"], false>).fromGameModes?.join(",") ?? ""
                    );
                    form.textField(
                        'From Game Modes To Game Modes\nA JSON onject that if an array with arrays that each have two strings inside of it, if in any of these arrays, the first string matches the from gamemode and the second matches the to gamemode, it will be blocked.\nJSON: [from: string, to: string][]\nex. [["survival", "creative"], ["adventure", "spectator"]]\nLeave blank to have no from game modes to game modes filter.',
                        "Comma separated list.",
                        (category[setting] as Exclude<(typeof category)["playerGameModeChange"], false>).fromGameModes?.length === 0
                            ? (category[setting] as Exclude<(typeof category)["playerGameModeChange"], false>).fromGameModes?.length === 0
                                ? (category[setting] as Exclude<(typeof category)["playerGameModeChange"], false>).fromGameModes?.join(",") ?? ""
                                : ""
                            : (category[setting] as Exclude<(typeof category)["playerGameModeChange"], false>).fromGameModes?.join(",") ?? ""
                    );
                    const r = await form.forceShow(sourceEntity);
                    if (r.canceled) return await editCustomAreaCategorySetting(sourceEntity, categoryID, setting);
                    const [fromGameModes, toGameModes, fromGameModesToGameModes] = r.formValues as [
                        fromGameModes: string,
                        toGameModes: string,
                        fromGameModesToGameModes: string
                    ];
                    const catProp = category[setting] as Exclude<(typeof category)["playerGameModeChange"], false>;
                    catProp.fromGameModes = fromGameModes === "" ? [] : (fromGameModes.split(/,\s?/g) as GameMode[]);
                    catProp.toGameModes = toGameModes === "" ? [] : (toGameModes.split(/,\s?/g) as GameMode[]);
                    catProp.fromGameModesToGameModes =
                        fromGameModesToGameModes === "" ? [] : (JSON.parse(fromGameModesToGameModes) as [from: GameMode, to: GameMode][]);
                    const out: AdvancedProtectedAreaCategory<true> = JSON.parse(
                        world.getDynamicProperty("advancedProtectedAreaCategory:" + categoryID) as string
                    );
                    const outProp = out[setting] as Exclude<(typeof out)["playerGameModeChange"], false>;
                    outProp.fromGameModes = fromGameModes === "" ? [] : (fromGameModes.split(/,\s?/g) as GameMode[]);
                    outProp.toGameModes = toGameModes === "" ? [] : (toGameModes.split(/,\s?/g) as GameMode[]);
                    outProp.fromGameModesToGameModes =
                        fromGameModesToGameModes === "" ? [] : (JSON.parse(fromGameModesToGameModes) as [from: GameMode, to: GameMode][]);
                    world.setDynamicProperty("advancedProtectedAreaCategory:" + categoryID, JSON.stringify(out));
                    return await editCustomAreaCategorySetting(sourceEntity, categoryID, setting);
                }
                case "heldItemFilters": {
                    if (!!!category[setting]) {
                        if (
                            (
                                await showMessage(
                                    sourceEntity,
                                    "Event Disabled",
                                    `${advancedCategoryPropertyDisplayNames[setting]} is disabled, so this menu cannot be accessed.`,
                                    "Back",
                                    "Cancel"
                                )
                            ).selection !== 1
                        ) {
                            return await editCustomAreaCategorySetting(sourceEntity, categoryID, setting);
                        } else {
                            return 0;
                        }
                    }
                    if (!("heldItemFilters" in category[setting])) throw new Error("heldItemFilters is not a property of this event");
                    const catProp = category[setting] as Exclude<(typeof category)["playerBreakBlock"], false>;
                    const catFilters = catProp?.heldItemFilters as Exclude<(typeof catProp)["heldItemFilters"], false>;
                    let form = new ModalFormData();
                    form.title("Held Item Filters");
                    form.dropdown(
                        "Filter Type\nInclude will cause only players with held items listed below to be blocked, exclude will cause only players who are not holding one of the item types listed below to be blocked.",
                        ["exclude", "include"],
                        catFilters.mode === "exclude" ? 0 : 1
                    );
                    form.textField(
                        `Item Types\nList of item types to allow or block. These should be item namespaced IDs.\nex. minecraft:stick,minecraft:diamond_pickaxe\nComma separated list.`,
                        "Comma separated list.",
                        catFilters?.items?.length === 0 ? "" : catFilters?.items?.join(",") ?? ""
                    );
                    const r = await form.forceShow(sourceEntity);
                    if (r.canceled) return await editCustomAreaCategorySetting(sourceEntity, categoryID, setting);
                    const [mode, types] = r.formValues as [mode: 0 | 1, types: string];
                    catFilters.mode = mode === 0 ? "exclude" : "include";
                    catFilters.items = types === "" ? [] : types.split(/,\s?/g);
                    const out: AdvancedProtectedAreaCategory<true> = JSON.parse(
                        world.getDynamicProperty("advancedProtectedAreaCategory:" + categoryID) as string
                    );
                    const outProp = out[setting] as Exclude<(typeof out)["playerBreakBlock"], false>;
                    const outFilters = outProp.heldItemFilters as Exclude<(typeof outProp)["heldItemFilters"], false>;
                    outFilters.mode = mode === 0 ? "exclude" : "include";
                    outFilters.items = types === "" ? [] : types.split(/,\s?/g);
                    world.setDynamicProperty("advancedProtectedAreaCategory:" + categoryID, JSON.stringify(out));
                    return await editCustomAreaCategorySetting(sourceEntity, categoryID, setting);
                }
                case "mask": {
                    if (!!!category[setting]) {
                        if (
                            (
                                await showMessage(
                                    sourceEntity,
                                    "Event Disabled",
                                    `${advancedCategoryPropertyDisplayNames[setting]} is disabled, so this menu cannot be accessed.`,
                                    "Back",
                                    "Cancel"
                                )
                            ).selection !== 1
                        ) {
                            return await editCustomAreaCategorySetting(sourceEntity, categoryID, setting);
                        } else {
                            return 0;
                        }
                    }
                    if (!("mask" in category[setting])) throw new Error("mask is not a property of this event");
                    const catProp = category[setting] as Exclude<(typeof category)["playerBreakBlock"], false>;
                    let form = new ModalFormData();
                    form.title("Block Mask");
                    form.dropdown(
                        "Mask Type\nInclude will cause only only blocks matching the block mask below to be blocked, exclude will cause only players who are not holding one of the item types listed below to be blocked.",
                        ["exclude", "include"],
                        +(catProp.mode === "include")
                    );
                    form.textField(
                        `Block Mask\nA block mask, more information is available at §bhttps://wiki.8crafter.com/andexdb/commands/parameter-types#mask§r.`,
                        "Mask",
                        catProp.rawmask === "none" ? "" : catProp.rawmask
                    );
                    const r = await form.forceShow(sourceEntity);
                    if (r.canceled) return await editCustomAreaCategorySetting(sourceEntity, categoryID, setting);
                    const [mode, mask] = r.formValues as [mode: 0 | 1, types: string];
                    catProp.mode = mode === 0 ? "exclude" : "include";
                    catProp.mask = BlockMask.extract(mask === "" ? "none" : mask);
                    catProp.mask.type = catProp.mode;
                    catProp.rawmask = mask === "" ? "none" : mask;
                    const out: AdvancedProtectedAreaCategory<true> = JSON.parse(
                        world.getDynamicProperty("advancedProtectedAreaCategory:" + categoryID) as string
                    );
                    const outProp = out[setting] as Exclude<(typeof out)["playerBreakBlock"], false>;
                    outProp.mode = mode === 0 ? "exclude" : "include";
                    outProp.mask = mask === "" ? "none" : mask;
                    world.setDynamicProperty("advancedProtectedAreaCategory:" + categoryID, JSON.stringify(out));
                    return await editCustomAreaCategorySetting(sourceEntity, categoryID, setting);
                }
                case "sourceEntityFilter": {
                    if (!!!category[setting]) {
                        if (
                            (
                                await showMessage(
                                    sourceEntity,
                                    "Event Disabled",
                                    `${advancedCategoryPropertyDisplayNames[setting]} is disabled, so this menu cannot be accessed.`,
                                    "Back",
                                    "Cancel"
                                )
                            ).selection !== 1
                        ) {
                            return await editCustomAreaCategorySetting(sourceEntity, categoryID, setting);
                        } else {
                            return 0;
                        }
                    }
                    if (!("sourceEntityFilter" in category[setting])) throw new Error("sourceEntityFilter is not a property of this event");
                    const catProp = category[setting] as Exclude<(typeof category)["effectAdd"], false>;
                    let form = new ModalFormData();
                    form.title("Source Entity Filter");
                    form.dropdown(
                        "Entity Type Filter Type\nInclude will cause only entity types listed below to be blocked, exclude will cause all other entity types to be blocked.",
                        ["exclude", "include"],
                        catProp.sourceEntityFilter?.includeTypes?.length === 0 ? 0 : 1
                    );
                    form.textField(
                        `Entity Types\nList of entity types to allow or block.\nShould be entity namespaced IDs.\nComma separated list.`,
                        "Comma separated list.",
                        ((category[setting] as Exclude<(typeof category)["effectAdd"], false>).sourceEntityFilter?.excludeTypes?.length ?? 0) === 0
                            ? (category[setting] as Exclude<(typeof category)["effectAdd"], false>).sourceEntityFilter?.includeTypes?.join(",") ?? ""
                            : (category[setting] as Exclude<(typeof category)["effectAdd"], false>).sourceEntityFilter?.excludeTypes?.join(",") ?? ""
                    );
                    form.dropdown(
                        "Entity Tags Filter Type\nInclude will cause only entities with at least one of the tags listed below to be blocked, exclude will cause all other entities to be blocked.",
                        ["exclude", "include"],
                        catProp.sourceEntityFilter?.includeTags?.length === 0 ? 0 : 1
                    );
                    form.textField(
                        `Entity Tags\nList of entity tags to allow or block.\nComma separated list.`,
                        "Comma separated list.",
                        ((category[setting] as Exclude<(typeof category)["effectAdd"], false>).sourceEntityFilter?.excludeTags?.length ?? 0) === 0
                            ? (category[setting] as Exclude<(typeof category)["effectAdd"], false>).sourceEntityFilter?.includeTags?.join(",") ?? ""
                            : (category[setting] as Exclude<(typeof category)["effectAdd"], false>).sourceEntityFilter?.excludeTags?.join(",") ?? ""
                    );
                    const r = await form.forceShow(sourceEntity);
                    if (r.canceled) return await editCustomAreaCategorySetting(sourceEntity, categoryID, setting);
                    const [mode, types, tagsMode, tags] = r.formValues as [mode: 0 | 1, types: string, tagsMode: 0 | 1, tags: string];
                    catProp.sourceEntityFilter.excludeTypes = mode === 0 ? (types === "" ? [] : types.split(/,\s?/g)) : [];
                    catProp.sourceEntityFilter.includeTypes = mode === 1 ? (types === "" ? [] : types.split(/,\s?/g)) : [];
                    catProp.sourceEntityFilter.excludeTags = tagsMode === 0 ? (tags === "" ? [] : tags.split(/,\s?/g)) : [];
                    catProp.sourceEntityFilter.includeTags = tagsMode === 1 ? (tags === "" ? [] : tags.split(/,\s?/g)) : [];
                    const out: AdvancedProtectedAreaCategory<true> = JSON.parse(
                        world.getDynamicProperty("advancedProtectedAreaCategory:" + categoryID) as string
                    );
                    const outProp = out[setting] as Exclude<(typeof out)["effectAdd"], false>;
                    outProp.sourceEntityFilter.excludeTypes = mode === 0 ? (types === "" ? [] : types.split(/,\s?/g)) : [];
                    outProp.sourceEntityFilter.includeTypes = mode === 1 ? (types === "" ? [] : types.split(/,\s?/g)) : [];
                    outProp.sourceEntityFilter.excludeTags = tagsMode === 0 ? (tags === "" ? [] : tags.split(/,\s?/g)) : [];
                    outProp.sourceEntityFilter.includeTags = tagsMode === 1 ? (tags === "" ? [] : tags.split(/,\s?/g)) : [];
                    world.setDynamicProperty("advancedProtectedAreaCategory:" + categoryID, JSON.stringify(out));
                    return await editCustomAreaCategorySetting(sourceEntity, categoryID, setting);
                }
                case "back":
                    return await editCustomAreaCategorySetting(sourceEntity, categoryID, setting);
                case "close":
                    return 0;
            }
        });
    } catch (e) {
        console.error(e, e.stack);
        // Present the error to the user, and return 1 if they select "Back", and 0 if they select "Close".
        return ((await showMessage(sourceEntity, "An Error occurred", `An error occurred: ${e}${e?.stack}`, "Back", "Close")).selection !== 1).toNumber();
    }
}
