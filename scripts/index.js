import { system, world } from "@minecraft/server";
globalThis.beforeScriptStartTick = system.currentTick;
export const current_format_version = "1.27.0-preview.20+BUILD.1";
globalThis.format_version = current_format_version;
export const supported_minecraft_version = "1.21.4x";
globalThis.entity_scale_format_version = null;
globalThis.multipleEntityScaleVersionsDetected = false;
import * as GameTest from "@minecraft/server-gametest";
import * as mcServer from "@minecraft/server";
import * as mcServerUi from "@minecraft/server-ui"; /*
import * as mcServerAdmin from "@minecraft/server-admin";*/ /*
import * as mcServerNet from "@minecraft/server-net";*/ /*
import * as mcDebugUtilities from "@minecraft/debug-utilities";*/ /*
import * as mcCommon from "@minecraft/common";*/ /*
import * as mcVanillaData from "@minecraft/vanilla-data";*/
globalThis.modules = {
    assets: {
        classes: {},
        constants: {},
    },
};
globalThis.subscribedEvents = {};
globalThis.repeatingIntervals = {};
globalThis.tempVariables = {};
globalThis.editorStickMenuOpeningAsyncCancelActionNumbers = {};
globalThis.crashEnabled = false;
globalThis.tempSavedVariables = [];
import "Assets/classes/JSONB";
import "Global";
import 'init/index';
/*
import "AllayTests.js";
import "APITests.js";*/
import "BlockEventTests.js"; /*
import "BlockTests.js";*/
import "ComponentTests.js";
import "CommandTests.js";
import "DebugTests.js"; /*
import "DispenserTests.js";
import "DoorTests.js";
import "DripstoneTests.js";
import "DuplicationTests.js";
import "EntityQueryTests.js";
import "EntityTests.js";
import "ExtensionTests.js";
import "FireAvoidTests.js";
import "FrogTests.js";*/
import "GameTestExtensions.js"; /*
import "MinecartTests.js";
import "MobTests.js";
import "MultifaceTests.js";
import "PathFindingTests.js";
import "FlyingMachineTests.js";
import "PistonTests.js";
import "TntTests.js";
import "WaterPathfindingTests.js";
import "WardenTests.js";
import "SmallMobTests.js";
import "BigMobTests.js";
import "RaycastingTests.js";
import "RedstoneTests.js";*/
import "SimulatedPlayerTests.js"; /*
import "RespawnAnchorTests.js";
import "PlaceSeedsTests.js";
import "ItemTests.js";*/
import "ItemEnchantmentsTests.js"; /*
import "SculkTests.js";
import "VibrationTests.js";
import "EnchantmentTests.js";*/ /*
import "Eval.js";*/
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
globalThis.modules.assets.constants.transformrecipes = transformrecipes;
import * as errors from "Main/errors";
globalThis.modules.errors = errors;
import mcMath from "@minecraft/math.js";
import colorCore, { Color } from "color-core";
import Decimal from "decimal.js";
import * as semver from "semver";
export const modulesMap = {
    mcServer: mcServer,
    mcServerUi,
    GameTest,
    main,
    /**
     * This is an alias of {@link modules.assets.constants.transformrecipes}
     */
    transformrecipes,
    coords,
    cmds,
    bans,
    uis,
    playersave,
    spawnprot,
    mcMath,
    colorCore,
    Color,
    Decimal,
    semver,
    ["@minecraft/server"]: mcServer,
    ["@minecraft/server-ui"]: mcServerUi,
    ["@minecraft/server-gametest"]: GameTest,
    ["@minecraft/math"]: mcMath,
    chat,
    cmdutils,
    cmdslist,
    cmdsdocs,
    utils,
    errors,
    shopmain,
    servershop,
    playershop,
    moneysystem,
    assets: {
        classes: {
            JSONB,
        },
        constants: {
            charMaps: await import("Assets/constants/charMaps"),
            structuremappings,
            transformrecipes,
        }
    }
};
globalThis.modules = modulesMap;
import 'Main';
import { undoClipboard } from "modules/coordinates/classes/undoClipboard";
globalThis.scriptStartTick = system.currentTick;
world.setDynamicProperty("format_version", format_version);
system.runTimeout(() => undoClipboard.cullItemsMissingStructure(), 50);
//# sourceMappingURL=index.js.map