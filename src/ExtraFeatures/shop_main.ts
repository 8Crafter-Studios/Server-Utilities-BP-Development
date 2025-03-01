import { Player, Entity, ItemLockMode, ItemStack, ItemEnchantableComponent, ItemDurabilityComponent } from "@minecraft/server";
import { ActionFormData, ModalFormData } from "@minecraft/server-ui";
import { executeCommandPlayerW } from "modules/commands/classes/executeCommandPlayerW";
import { forceShow } from "modules/ui/functions/forceShow";
import { config } from "init/classes/config";
import { showMessage } from "modules/utilities/functions/showMessage";
import { ServerShopManager } from "./server_shop";
import { PlayerShopManager } from "./player_shop";
import { securityVariables } from "security/ultraSecurityModeUtils";
import { customFormUICodes } from "modules/ui/constants/customFormUICodes";
import { texturePresets, type TextureData } from "Assets/constants/texturePresets";
import type { VerifyConstraint } from "modules/utilities/functions/filterProperties";

/**
 * Main function to handle the shop system settings interface.
 *
 * @param sourceEntitya - The entity that initiated the request. Can be an `Entity`, `executeCommandPlayerW`, or `Player`.
 * @returns A promise that resolves to one of the following values:
 * - `-2` if an error occurs.
 * - `0` if the operation is closed.
 * - `1` if the operation is successful.
 *
 * The function displays a menu with options to configure the server shop, player shop, and sign shop settings.
 * It also checks for permissions if ultra security mode is enabled.
 *
 * The menu options are:
 * - Server Shop: Toggles the server shop system settings.
 * - Player Shop: Toggles the player shop system settings.
 * - Sign Shop: Displays a message that the sign shop system does not exist yet.
 * - Back: Returns to the previous menu.
 * - Close: Closes the menu.
 *
 * If an error occurs during the execution, it logs the error and returns `-2`.
 */
export async function mainShopSystemSettings(sourceEntitya: Entity | executeCommandPlayerW | Player): Promise<-2 | 0 | 1> {
    const sourceEntity = sourceEntitya instanceof executeCommandPlayerW ? sourceEntitya.player : sourceEntitya;
    assertIsDefined(sourceEntity);
    if (securityVariables.ultraSecurityModeEnabled) {
        if (securityVariables.testPlayerForPermission(sourceEntity as Player, "andexdb.accessExtraFeaturesSettings") == false) {
            const r = await showMessage(
                sourceEntity as Player,
                "Access Denied (403)",
                "You do not have permission to access this menu. You need the following permission to access this menu: andexdb.accessExtraFeaturesSettings",
                "Go Back",
                "Close"
            );
            if (r.canceled || r.selection == 0) {
                return 1;
            } else {
                return 0;
            }
        }
    }
    let form = new ActionFormData();
    form.title(customFormUICodes.action.titles.formStyles.gridMenu + "Shop Sytem Settings");
    form.button(
        customFormUICodes.action.buttons.positions.main_only + "Server Shop\n" + (config.shopSystem.server.enabled ? "§aEnabled" : "§cDisabled"),
        "textures/ui/servers"
    );
    form.button(
        customFormUICodes.action.buttons.positions.main_only + "Player Shop\n" + (config.shopSystem.player.enabled ? "§aEnabled" : "§cDisabled"),
        "textures/ui/icon_multiplayer"
    );
    form.button(
        customFormUICodes.action.buttons.positions.main_only + "§cSign Shop\n" + (config.shopSystem.sign.enabled ? "§aEnabled" : "§cDisabled"),
        "textures/ui/icon_sign"
    );
    form.button(customFormUICodes.action.buttons.positions.title_bar_only + "Back", "textures/ui/arrow_left");
    form.button(customFormUICodes.action.buttons.positions.title_bar_only + "Close", "textures/ui/crossout");
    return await forceShow(form, sourceEntity as Player)
        .then(async (r) => {
            if (r.canceled) return 1 as const;

            let response = r.selection;
            switch (response) {
                case 0:
                    if ((await ServerShopManager.serverShopSystemSettings(sourceEntity)) === 1) {
                        return await mainShopSystemSettings(sourceEntity);
                    } else {
                        return 0;
                    }
                    break;
                case 1:
                    if ((await PlayerShopManager.playerShopSystemSettings(sourceEntity)) === 1) {
                        return await mainShopSystemSettings(sourceEntity);
                    } else {
                        return 0;
                    }
                    break;
                case 2:
                    return await showMessage(sourceEntity as Player, undefined, "§cSorry, the sign shop system does not exist yet.", "Back", "Close").then(
                        async (r) => {
                            if (r.selection !== 1) {
                                return await mainShopSystemSettings(sourceEntity);
                            } else {
                                return 0;
                            }
                        }
                    );
                    // signShopSystemSettings(sourceEntity)
                    break;
                case 3:
                    return 1;
                    break;
                case 4:
                    return 0;
                    break;
                default:
                    return 1;
            }
        })
        .catch((e) => {
            console.error(e, e.stack);
            return -2 as const;
        });
}

export async function selectTexturePreset(sourceEntitya: Entity | executeCommandPlayerW | Player): Promise<0 | 1 | string> {
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
    let form = new ActionFormData();
    form.title(customFormUICodes.action.titles.formStyles.gridMenu + "Select Texture Preset");
    const keys = (Object.keys(texturePresets) as (keyof typeof texturePresets)[]).filter(k=>texturePresets[k].visibilityConditions());
    keys.forEach((key) => {
        form.button(customFormUICodes.action.buttons.positions.main_only + texturePresets[key].displayName, texturePresets[key].icon);
    });
    const r = await forceShow(form, sourceEntitya as Player);
    if (r.canceled || r.selection === keys.length) return 1;
    if (r.selection === keys.length + 1) return 0;
    const rb = await selectTexturePresetInCategory(sourceEntity, keys[r.selection]);
    if (rb === 1) return await selectTexturePreset(sourceEntity);
    if (rb === 0) return 0;
    return rb;
}

export async function selectTexturePresetInCategory<C extends keyof typeof texturePresets>(
    sourceEntitya: Entity | executeCommandPlayerW | Player,
    category: C,
    pagen: number = 0,
    search?: {
        value: string;
        caseSensitive?: boolean;
    },
    cachedTextures?: [displayName: string, icon: string][]
): Promise<0 | 1 | string> {
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
    let form = new ActionFormData();
    const page = Math.max(0, pagen);
    const textures: [displayName: string, icon: string][] = cachedTextures ?? [];
    if (cachedTextures === undefined) {
        const data = texturePresets[category].texture_data;
        if (data instanceof Array) {
            data.forEach((texture) => {
                if (!!search) {
                    if (search.caseSensitive ? !texture.includes(search.value) : !texture.toLowerCase().includes(search.value.toLowerCase())) {
                        return;
                    }
                }
                textures.push([customFormUICodes.action.buttons.positions.main_only + texture, texture]);
            });
        } else {
            const entries = Object.entries(data) as [keyof typeof data, (typeof data)[keyof typeof data]][];
            entries.forEach(([key, value]) => {
                if (typeof value.textures === "string") {
                    if (!!search) {
                        if (
                            search.caseSensitive
                                ? !(key.includes(search.value) || value.textures.includes(search.value))
                                : !(key.toLowerCase().includes(search.value.toLowerCase()) || value.textures.toLowerCase().includes(search.value.toLowerCase()))
                        ) {
                            return;
                        }
                    }
                    textures.push([customFormUICodes.action.buttons.positions.main_only + key, value.textures]);
                } else if (value.textures instanceof Array) {
                    value.textures.forEach((icon: VerifyConstraint<TextureData[string]["textures"], any[]>[number], index) => {
                        if(typeof icon === "object"){
                            if (!!search) {
                                if (
                                    search.caseSensitive
                                        ? !(key.includes(search.value) || icon.path.includes(search.value))
                                        : !(key.toLowerCase().includes(search.value.toLowerCase()) || icon.path.toLowerCase().includes(search.value.toLowerCase()))
                                ) {
                                    return;
                                }
                            }
                            textures.push([customFormUICodes.action.buttons.positions.main_only + key + "[" + index + "]", icon.path]);
                        }else{
                            if (!!search) {
                                if (
                                    search.caseSensitive
                                        ? !(key.includes(search.value) || icon.includes(search.value))
                                        : !(key.toLowerCase().includes(search.value.toLowerCase()) || icon.toLowerCase().includes(search.value.toLowerCase()))
                                ) {
                                    return;
                                }
                            }
                            textures.push([customFormUICodes.action.buttons.positions.main_only + key + "[" + index + "]", icon]);
                        }
                    });
                }
            });
        }
    }
    form.title(
        `${customFormUICodes.action.titles.formStyles.gridMenu}${!!search ? "Search Results" : "Select Texture Preset"} ${Math.min(
            textures.length,
            page * 9 + 1
        )}-${Math.min(textures.length, (page + 1) * 9)} of ${textures.length}`
    );
    const numpages = Math.ceil(textures.length / 9);
    if (!!search) {
        form.body(`Searching for: ${JSON.stringify(search.value)}\nCase Sensitive: ${JSON.stringify(search.caseSensitive ?? false)}`);
    }
    form.button(customFormUICodes.action.buttons.positions.left_side_only + "Search", "textures/ui/spyglass_flat");
    form.button(
        customFormUICodes.action.buttons.positions.left_side_only +
            (page != 0 ? "" : customFormUICodes.action.buttons.options.disabled + "§8") +
            "Previous Page",
        "textures/ui/arrow_left"
    );
    form.button(
        customFormUICodes.action.buttons.positions.left_side_only +
            (numpages > 1 ? "" : customFormUICodes.action.buttons.options.disabled + "§8") +
            "Go To Page",
        "textures/ui/page"
    );
    form.button(
        customFormUICodes.action.buttons.positions.left_side_only +
            (page < numpages - 1 ? "" : customFormUICodes.action.buttons.options.disabled + "§8") +
            "Next Page",
        "textures/ui/arrow_right"
    );
    // Padding
    form.button("");
    form.button("");
    const texturesB = textures.slice(page * 9, (page + 1) * 9);
    texturesB.forEach(([displayName, icon]) => {
        form.button(displayName, icon);
    });
    form.button(customFormUICodes.action.buttons.positions.title_bar_only + "Back", "textures/ui/arrow_left");
    form.button(customFormUICodes.action.buttons.positions.title_bar_only + "Close", "textures/ui/crossout");
    return await forceShow(form, sourceEntity)
        .then(async (r) => {
            if (r.canceled) return 1;

            switch (
                (["search", "previous", "go", "next", "", ""] as const)[r.selection] ??
                (!!texturesB[r.selection - 6] ? "texture" : undefined) ??
                (["back", "close"] as const)[r.selection - texturesB.length - 6]
            ) {
                case "search": {
                    const rb = await tryget(
                        async () =>
                            await new ModalFormData()
                                .title("Search")
                                .textField("", "Search", search?.value ?? "")
                                .toggle("Case Sensitive", search?.caseSensitive ?? false)
                                .submitButton("Search")
                                .forceShow(sourceEntity as Player)
                    );
                    if (!!!rb || rb?.canceled == true) {
                        return await selectTexturePresetInCategory(sourceEntity, category, page, search, textures);
                    }
                    return await selectTexturePresetInCategory(
                        sourceEntity,
                        category,
                        undefined,
                        {
                            value: rb.formValues[0] as string,
                            caseSensitive: rb.formValues[1] as boolean,
                        },
                        undefined
                    );
                }
                case "previous":
                    return await selectTexturePresetInCategory(sourceEntity, category, Math.max(0, page - 1), search, textures);
                case "go": {
                    const rb = await tryget(
                        async () =>
                            await new ModalFormData()
                                .title("Go To Page")
                                .textField(`Current Page: ${page + 1}\nPage # (Between 1 and ${numpages})`, "Page #")
                                .submitButton("Go To Page")
                                .forceShow(sourceEntity as Player)
                    );
                    return await selectTexturePresetInCategory(
                        sourceEntity,
                        category,
                        Math.max(1, Math.min(numpages, (rb.formValues?.[0] as string)?.toNumber() ?? page + 1)) - 1,
                        search,
                        textures
                    );
                }
                case "next":
                    return await selectTexturePresetInCategory(sourceEntity, category, Math.min(numpages - 1, page + 1), search, textures);
                case "texture":
                    return texturesB[r.selection - 6][1];
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
            return ((await showMessage(sourceEntity, "An Error occurred", `An error occurred: ${e}${e?.stack}`, "Back", "Close")).selection !== 1).toNumber();
        });
}

export type ShopElement = SellableShopElement | BuyableShopElement;
export type PlayerShopElement = PlayerShopPage | PlayerSavedShopItem | PlayerSellableShopItem | PlayerSellableAdvancedShopItem;
export type PlayerSellableShopElement = PlayerShopPage | PlayerSellableShopItem | PlayerSellableAdvancedShopItem;
export type PlayerBuyableShopElement = PlayerShopPage | PlayerSavedShopItem;
export type SellableShopElement = ShopPage | SellableShopItem;
export type BuyableShopElement = ShopPage | ShopItem;
export type ShopItem = SavedShopItem | NewItemStackShopItem | GiveCommandShopItem;

/**
 * A player shop page.
 */
export type PlayerShopPage = {
    texture?: string;
    pageTitle: string;
    pageBody: string;
    title: string;
    data: PlayerShopElement[];
    type: "player_shop_page";
};
/**
 * A player shop item saved in a structure block.
 */
export type PlayerSavedShopItem = {
    /**
     * The maximum stack size of the item.
     * This is also used as the limit for the remainingStock property
     * and this is the maximum value for the buy amount slider.
     */
    maxStackSize: number;
    remainingStock: number;
    itemDetails: {
        typeId: ItemStack["typeId"];
        nameTag?: ItemStack["nameTag"];
        loreLineCount: ReturnType<ItemStack["getLore"]>["length"] /*
        canDestroyLength: ReturnType<ItemStack["getCanDestroy"]>["length"]
        canPlaceOnLength: ReturnType<ItemStack["getCanPlaceOn"]>["length"]*/;
        enchantments:
            | ReturnType<ItemEnchantableComponent["getEnchantments"]>
            | "N/A, This item may have enchantments but they cannot be read because this item is not normally enchantable.";
        maxDurability: ItemDurabilityComponent["maxDurability"];
        damage: ItemDurabilityComponent["damage"];
        keepOnDeath: ItemStack["keepOnDeath"];
        lockMode: ItemStack["lockMode"];
    };
    texture?: string;
    title: string;
    playerID: `${number}`;
    structureID: string;
    entityID: string;
    price: number;
    step: number;
    type: "player_shop_item";
    itemType: "player_shop_saved";
};
/**
 * An item for the sell section of the PlayerShop.
 */
export type PlayerSellableShopItem = {
    amountWanted: number;
    currentAmount: number;
    texture?: string;
    title: string;
    playerID: `${number}`;
    itemID: string;
    value: number;
    step: number;
    type: "player_shop_item";
    itemType: "player_shop_sellable";
    /**
     * @todo
     */
    format_version?: "1.0.0";
};
/**
 * An advanced item for the sell section of the PlayerShop.
 */
export type PlayerSellableAdvancedShopItem = {
    amountWanted: number;
    currentAmount: number;
    texture?: string;
    title: string;
    playerID: `${number}`;
    itemID: string;
    extraRestrictions: {
        /**
         * @todo
         */
        dataValue?: number;
        /**
         * @todo
         */
        minimumDurability?: number;
        /**
         * @todo
         */
        maximumDurability?: number;
        /**
         * @todo
         */
        requiredEnchantmentsMode?: "ignore" | "exact" | "allow_additional";
        /**
         * Enchantments that are required to be on the item.
         *
         * This is ignored when {@link PlayerSellableAdvancedShopItem.extraRestrictions PlayerSellableAdvancedShopItem.extraRestrictions.requiredEnchantmentsMode} is set to "ignore".
         * @todo
         */
        requiredEnchantments?: ({ type: string; minLevel: number; maxLevel: number } | { type: string; level: number })[];
        /**
         * Additional enchantments that can be on the item but are actually optional.
         *
         * This only applies when {@link PlayerSellableAdvancedShopItem.extraRestrictions PlayerSellableAdvancedShopItem.extraRestrictions.requiredEnchantmentsMode} is set to "exact".
         * @todo
         */
        optionalAdditionalEnchantments?: ({ type: string; minLevel: number; maxLevel: number } | { type: string; level: number })[];
        /**
         * Enchantment types that are not allowed to be on the item.
         *
         * This only applies when {@link PlayerSellableAdvancedShopItem.extraRestrictions PlayerSellableAdvancedShopItem.extraRestrictions.requiredEnchantmentsMode} is set to "allow_additional".
         * @todo
         */
        excludedEnchantmentTypes?: string[];
        /**
         * @todo
         */
        potionEffectType?: string;
        /**
         * @todo
         */
        potionLiquidType?: string;
        /**
         * @todo
         */
        potionModifierType?: string;
        /**
         * @todo
         */
        keepOnDeath?: boolean;
        /**
         * @todo
         */
        lockMode?: ItemLockMode;
        /**
         * @todo
         */
        canPlaceOn?: string[];
        /**
         * @todo
         */
        canDestroy?: string[];
        /**
         * @todo
         */
        dynamicProperties?: [string, string | number | boolean][];
        /**
         * @todo
         */
        nameTag?: string;
        /**
         * @todo
         */
        lore?: string[];
    };
    value: number;
    step: number;
    type: "player_shop_item";
    itemType: "player_shop_sellable_advanced";
    /**
     * @todo
     */
    format_version: "2.0.0";
};
/**
 * A shop page.
 */
export type ShopPage = {
    texture?: string;
    pageTitle: string;
    pageBody: string;
    title: string;
    data: ShopElement[];
    type: "page";
};
/**
 * A shop item saved in a structure block.
 */
export type SavedShopItem = {
    itemDetails: {
        typeId: ItemStack["typeId"];
        nameTag?: ItemStack["nameTag"];
        loreLineCount: ReturnType<ItemStack["getLore"]>["length"] /*
        canDestroyLength: ReturnType<ItemStack["getCanDestroy"]>["length"]
        canPlaceOnLength: ReturnType<ItemStack["getCanPlaceOn"]>["length"]*/;
        enchantments:
            | ReturnType<ItemEnchantableComponent["getEnchantments"]>
            | "N/A, This item may have enchantments but they cannot be read because this item is not normally enchantable.";
        maxDurability: ItemDurabilityComponent["maxDurability"];
        damage: ItemDurabilityComponent["damage"];
        keepOnDeath: ItemStack["keepOnDeath"];
        lockMode: ItemStack["lockMode"];
    };
    texture?: string;
    title: string;
    structureID: string;
    entityID: string;
    price: number;
    step?: number;
    max?: number;
    type: "item";
    itemType: "pre-made";
};
/**
 * A shop item saved as a list of properties.
 */
export type NewItemStackShopItem = {
    remainingStock?: number;
    texture?: string;
    title: string;
    itemID: string;
    itemName?: string;
    itemLore?: string[];
    keepOnDeath: boolean;
    lockMode: ItemLockMode;
    canPlaceOn?: string[];
    canDestroy?: string[];
    dynamicProperties?: { [id: string]: string | number | boolean };
    price: number;
    step?: number;
    max?: number;
    type: "item";
    itemType: "newItemStack";
};
/**
 * A shop item saved as a namespaced id and an data value.
 */
export type GiveCommandShopItem = {
    remainingStock?: number;
    texture?: string;
    title: string;
    itemID: string;
    itemData: number;
    price: number;
    step?: number;
    max?: number;
    type: "item";
    itemType: "giveCommand";
};
/**
 * An item for the sell section of the ServerShop.
 */
export type SellableShopItem = {
    amountWanted?: number;
    texture?: string;
    title: string;
    itemID: string;
    itemData?: number;
    value: number;
    step?: number;
    max?: number;
    type: "item";
    itemType: "sellable";
};
