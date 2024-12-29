import * as GameTest from "@minecraft/server-gametest";
import * as mcServer from "@minecraft/server";
import * as mcServerUi from "@minecraft/server-ui";
import "initializeMainGlobalVariables";
import "Assets/classes/JSONB";
import "Global";
import "init/index.js";
import "GameTestScripts/BlockEventTests.js";
import "GameTestScripts/ComponentTests.js";
import "GameTestScripts/CommandTests.js";
import "GameTestScripts/DebugTests.js";
import "GameTestScripts/GameTestExtensions.js";
import "GameTestScripts/SimulatedPlayerTests.js";
import "GameTestScripts/ItemEnchantmentsTests.js";
import "legacyModuleAliases/commands_documentation.js";
import "legacyModuleAliases/commands.js";
import "legacyModuleAliases/coordinates.js";
import "legacyModuleAliases/ban.js";
import "legacyModuleAliases/ui.js";
import "legacyModuleAliases/player_save.js";
import "legacyModuleAliases/spawn_protection.js";
import "legacyModuleAliases/chat.js";
import "legacyModuleAliases/command_utilities.js";
import "legacyModuleAliases/commands_list.js";
import "legacyModuleAliases/errors.js";
import "legacyModuleAliases/utilities.js";
import "@minecraft/math.js";
import "GlobalDecorators";
import * as main from "legacyModuleAliases/Main";
import * as coords from "legacyModuleAliases/coordinates";
import * as cmds from "legacyModuleAliases/commands";
import * as bans from "legacyModuleAliases/ban";
import * as uis from "legacyModuleAliases/ui";
import * as playersave from "legacyModuleAliases/player_save";
import * as spawnprot from "legacyModuleAliases/spawn_protection";
import * as chat from "legacyModuleAliases/chat";
import * as cmdutils from "legacyModuleAliases/command_utilities";
import * as cmdslist from "legacyModuleAliases/commands_list";
import * as cmdsdocs from "legacyModuleAliases/commands_documentation";
import * as utils from "legacyModuleAliases/utilities";
import * as shopmain from "ExtraFeatures/shop_main";
import * as servershop from "ExtraFeatures/server_shop";
import * as playershop from "ExtraFeatures/player_shop";
import * as moneysystem from "ExtraFeatures/money";
import * as structuremappings from "Assets/constants/structure_mappings";
import * as transformrecipes from "Assets/constants/transformrecipes";
import * as errors from "legacyModuleAliases/errors";
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
    }
}
import "Main";
