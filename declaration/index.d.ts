export declare const current_format_version = "1.26.0-rc.3+BUILD.1";
export declare const supported_minecraft_version = "1.21.4x";
import * as GameTest from "@minecraft/server-gametest";
import * as mcServer from "@minecraft/server";
import * as mcServerUi from "@minecraft/server-ui";
import "Assets/classes/JSONB";
import "Global";
import "BlockEventTests.js";
import "ComponentTests.js";
import "CommandTests.js";
import "DebugTests.js";
import "GameTestExtensions.js";
import "SimulatedPlayerTests.js";
import "ItemEnchantmentsTests.js";
import "Main/commands_documentation.js";
import "Main/commands.js";
import "Main/coordinates.js";
import "Main/ban.js";
import "Main/ui.js";
import "Main/player_save.js";
import "Main/spawn_protection.js";
import "Main/chat.js";
import "Main/command_utilities.js";
import "Main/commands_list.js";
import "Main/errors.js";
import "Main/utilities.js";
import "@minecraft/math.js";
import "GlobalDecorators";
import 'init/index';
import * as main from "Main";
import * as coords from "Main/coordinates";
import * as cmds from "Main/commands";
import * as bans from "Main/ban";
import * as uis from "Main/ui";
import * as playersave from "Main/player_save";
import * as spawnprot from "Main/spawn_protection";
import * as chat from "Main/chat";
import * as cmdutils from "Main/command_utilities";
import * as cmdslist from "Main/commands_list";
import * as cmdsdocs from "Main/commands_documentation";
import * as utils from "legacyModuleAliases/utilities";
import * as shopmain from "ExtraFeatures/shop_main";
import * as servershop from "ExtraFeatures/server_shop";
import * as playershop from "ExtraFeatures/player_shop";
import * as moneysystem from "ExtraFeatures/money";
import * as structuremappings from "Assets/constants/structure_mappings";
import * as transformrecipes from "Assets/constants/transformrecipes";
import * as errors from "Main/errors";
import mcMath from "@minecraft/math.js";
import colorCore from "color-core";
import Decimal from "decimal.js";
import * as semver from "semver";
export declare const modulesMap: {
    mcServer: typeof mcServer;
    mcServerUi: typeof mcServerUi;
    GameTest: typeof GameTest;
    main: typeof main;
    /**
     * This is an alias of {@link modules.assets.constants.transformrecipes}
     */
    transformrecipes: typeof transformrecipes;
    coords: typeof coords;
    cmds: typeof cmds;
    bans: typeof bans;
    uis: typeof uis;
    playersave: typeof playersave;
    spawnprot: typeof spawnprot;
    mcMath: typeof mcMath;
    colorCore: typeof colorCore;
    Color: typeof colorCore.Color;
    Decimal: typeof Decimal;
    semver: typeof semver;
    "@minecraft/server": typeof mcServer;
    "@minecraft/server-ui": typeof mcServerUi;
    "@minecraft/server-gametest": typeof GameTest;
    "@minecraft/math": typeof mcMath;
    chat: typeof chat;
    cmdutils: typeof cmdutils;
    cmdslist: typeof cmdslist;
    cmdsdocs: typeof cmdsdocs;
    utils: typeof utils;
    errors: typeof errors;
    shopmain: typeof shopmain;
    servershop: typeof servershop;
    playershop: typeof playershop;
    moneysystem: typeof moneysystem;
    assets: {
        classes: {
            JSONB: JSONB;
        };
        constants: {
            charMaps: typeof import("Assets/constants/charMaps");
            structuremappings: typeof structuremappings;
            transformrecipes: typeof transformrecipes;
        };
    };
};
declare global {
    namespace globalThis {
        var modules: typeof modulesMap;
        var tempSavedVariables: any[];
        var crashEnabled: boolean;
        var format_version: typeof current_format_version;
    }
}
import 'Main';
