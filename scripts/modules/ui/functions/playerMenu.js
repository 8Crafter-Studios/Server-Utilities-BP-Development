import { Entity, Player } from "@minecraft/server";
import { ActionFormData, ActionFormResponse } from "@minecraft/server-ui";
import { forceShow } from "modules/ui/functions/forceShow";
import { executeCommandPlayerW } from "modules/commands/classes/executeCommandPlayerW";
import { showMessage } from "modules/utilities/functions/showMessage";
import { menuButtonIds } from "../constants/menuButtonIds";
import { playerMenu_leaderboards } from "./playerMenu_leaderboards";
import { playerMenu_about } from "./playerMenu_about";
import { playerMenu_homes } from "./playerMenu_homes";
import { ServerShop } from "ExtraFeatures/server_shop";
import { PlayerShop } from "ExtraFeatures/player_shop";
import { playerMenu_TPA } from "./playerMenu_TPA";
import { playerMenu_bounties } from "./playerMenu_bounties";
import { playerMenu_warps } from "./playerMenu_warps";
import { playerMenu_moneyTransfer } from "./playerMenu_moneyTransfer";
import { playerMenu_redeemCode } from "./playerMenu_redeemCode";
export async function playerMenu(sourceEntitya) {
    const sourceEntity = sourceEntitya instanceof executeCommandPlayerW
        ? sourceEntitya.player
        : sourceEntitya;
    if (!(sourceEntity instanceof Player)) {
        throw new TypeError("Invalid Player. Expected an instance of the Player class, or an instance of the executeCommandPlayerW class with a Player linked to it, but instead got " + (typeof sourceEntity == "object" ? sourceEntity === null ? "object[null]" : "object[" + (sourceEntity.constructor.name ?? "unknown") + "]" : typeof sourceEntity) + ".");
    }
    if (!config.ui.menus.playerMenu.enabled) {
        const r = await showMessage(sourceEntity, "Menu Disabled", "The player menu is disabled. It must be enabled in Main Menu > Settings > Player Menu.", "Back", "Cancel");
        if (r.canceled || r.selection == 0) {
            return 1;
        }
        else {
            return 0;
        }
    }
    const menuConfig = config.ui.menus.playerMenu;
    // menuConfig.buttons.map(k=>[k, menuButtonIds.mainMenu.buttons[k]])
    const buttons = menuConfig.buttons.map(k => [k, menuButtonIds.playerMenu.buttons[k]]).filter(([k, b]) => {
        if (!menuConfig.showDeprecatedButtons && b.deprecated) {
            return false;
        }
        if (!menuConfig.showExperimentalButtons && b.experimental) {
            return false;
        }
        if (!menuConfig.showNonFunctionalButtons && !b.functional && !(menuConfig.showUpcomingButtons && b.upcoming)) {
            return false;
        }
        if (!menuConfig.showUnusedButtons && b.unused) {
            return false;
        }
        if (!menuConfig.showUpcomingButtons && b.upcoming) {
            return false;
        }
        if (b.extraVisibilityConditionsCheck !== undefined) {
            return b.extraVisibilityConditionsCheck();
        }
        return true;
    });
    let form = new ActionFormData();
    form.title("Player Menu");
    form.body("Hello " + sourceEntity.name);
    buttons.forEach(([k, b]) => {
        form.button(b.displayName, b.icon);
    }); /*
    form.button("Editor Stick", "textures/items/stick");
    form.button("Editor Stick Menu B", "textures/items/stick");
    form.button("Editor Stick Menu C", "textures/items/stick");
    form.button(
        "§8Debug Screen§f(§cUnused§f)§b",
        "textures/ui/ui_debug_glyph_color"
    );
    form.button("Inventory Controller", "textures/ui/inventory_icon.png");
    form.button("Player Debug", "textures/ui/debug_glyph_color");
    form.button("Entity Debug§b", "textures/ui/debug_glyph_color"); */ /*
form.button("Entity Debugger", "textures/ui/debug_glyph_color");*/ /*
    
        form.button("Player Controller", "textures/ui/controller_glyph_color");
        form.button(
            "Entity Controller",
            "textures/ui/controller_glyph_color_switch"
        );
        form.button("World Options§b", "textures/ui/settings_glyph_color_2x");
        form.button(
            "§4Dimension Options§f(§cComing Soon!§f)§b",
            "textures/ui/icon_setting"
        );
        form.button("Create Explosion", "textures/blocks/tnt_side");
        form.button("§4Fill Blocks(§cComing Soon!§f)§b", "textures/blocks/stone");
        form.button(
            "§4World Debug§f(§cComing Soon!§f)§b",
            "textures/ui/xyz_axis.png"
        );
        form.button(
            "§4Dimension Debug§f(§cComing Soon!§f)§b",
            "textures/ui/NetherPortal"
        );
        form.button(
            "Inventory Transfer§f(§nDEPRECATED§f)",
            "textures/ui/NetherPortal"
        );
        form.button("Run Command", "textures/ui/ImpulseSquare.png");
        form.button("Script Eval", "textures/ui/RepeatSquare.png");
        form.button("Mange Restricted Areas", "textures/ui/xyz_axis.png");
        form.button("Manage Custom UIs", "textures/ui/feedIcon");
        form.button("Moderation", "textures/ui/hammer_l");
        form.button("Security", "textures/ui/absorption_effect");
        form.button("Settings", "textures/ui/settings_glyph_color_2x");
        form.button("Manage Players", "textures/ui/user_icon_white");
        form.button(
            "Manage Commands",
            "textures/ui/chat_keyboard_hover"
        );
        form.button("§eItem Editor §f[§cAlpha§f]", "textures/ui/icon_recipe_item");
        form.button(
            "§eMap Art Generator §f[§cAlpha§f]",
            "textures/items/map_locked"
        );
        form.button(
            "§eJava NBT Structure Loader §f[§cAlpha§f]",
            "textures/ui/xyz_axis"
        ); */
    form.button("Close", "textures/ui/crossout");
    return await forceShow(form, sourceEntity)
        .then(async (ra) => {
        let r = ra;
        if (r.canceled)
            return 1;
        switch (buttons[r.selection]?.[0] ?? ["close"][r.selection - buttons.length]) {
            case "leaderboards":
                if ((await playerMenu_leaderboards(sourceEntity)) == 1) {
                    return await playerMenu(sourceEntity);
                }
                else {
                    return 0;
                }
                break;
            case "homes":
                if ((await playerMenu_homes(sourceEntity)) == 1) {
                    return await playerMenu(sourceEntity);
                }
                else {
                    return 0;
                }
                break;
            case "TPA":
                if ((await playerMenu_TPA(sourceEntity)) == 1) {
                    return await playerMenu(sourceEntity);
                }
                else {
                    return 0;
                }
                break;
            case "warps":
                if ((await playerMenu_warps(sourceEntity)) == 1) {
                    return await playerMenu(sourceEntity);
                }
                else {
                    return 0;
                }
                break;
            case "bounties":
                if ((await playerMenu_bounties(sourceEntity)) == 1) {
                    return await playerMenu(sourceEntity);
                }
                else {
                    return 0;
                }
                break;
            case "serverShops":
                if ((await ServerShop.openPublicShopsSelector(sourceEntity)) == 1) {
                    return await playerMenu(sourceEntity);
                }
                else {
                    return 0;
                }
                break;
            case "playerShops":
                if ((await PlayerShop.openPublicShopsSelector(sourceEntity)) == 1) {
                    return await playerMenu(sourceEntity);
                }
                else {
                    return 0;
                }
                break;
            case "moneyTransfer":
                if ((await playerMenu_moneyTransfer(sourceEntity)) == 1) {
                    return await playerMenu(sourceEntity);
                }
                else {
                    return 0;
                }
                break; /*
        case "dailyRewards":
            if ((await playerMenu_dailyRewards(sourceEntity)) == 1) {
                return await playerMenu(sourceEntity);
            } else {
                return 0;
            }
            break; */
            case "redeemCode":
                if ((await playerMenu_redeemCode(sourceEntity)) == 1) {
                    return await playerMenu(sourceEntity);
                }
                else {
                    return 0;
                }
                break;
            case "about":
                if ((await playerMenu_about(sourceEntity)) == 1) {
                    return await playerMenu(sourceEntity);
                }
                else {
                    return 0;
                }
                break;
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
//# sourceMappingURL=playerMenu.js.map