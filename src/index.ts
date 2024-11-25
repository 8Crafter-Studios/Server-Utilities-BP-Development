import { system, world } from "@minecraft/server";

globalThis.beforeScriptStartTick = system.currentTick;
export const current_format_version = "1.27.0-preview.20+BUILD.1";
globalThis.format_version = current_format_version
export const supported_minecraft_version = "1.21.4x";
globalThis.entity_scale_format_version = null;
globalThis.multipleEntityScaleVersionsDetected = false;
import * as GameTest from "@minecraft/server-gametest";
import * as mcServer from "@minecraft/server";
import * as mcServerUi from "@minecraft/server-ui";/*
import * as mcServerAdmin from "@minecraft/server-admin";*//*
import * as mcServerNet from "@minecraft/server-net";*//*
import * as mcDebugUtilities from "@minecraft/debug-utilities";*//*
import * as mcCommon from "@minecraft/common";*//*
import * as mcVanillaData from "@minecraft/vanilla-data";*/
globalThis.modules={
    assets: {
        classes: {},
        constants: {},
    },
} as any;
globalThis.subscribedEvents = {} as { [eventName: string]: Function };
globalThis.repeatingIntervals = {} as { [intervalName: string]: number };
globalThis.tempVariables = {};
import "Assets/classes/JSONB"
import "Global"
  
/*
import "AllayTests.js";
import "APITests.js";*/
import "BlockEventTests.js";/*
import "BlockTests.js";*/
import "ComponentTests.js";
import "CommandTests.js";
import "DebugTests.js";/*
import "DispenserTests.js";
import "DoorTests.js";
import "DripstoneTests.js";
import "DuplicationTests.js";
import "EntityQueryTests.js";
import "EntityTests.js";
import "ExtensionTests.js";
import "FireAvoidTests.js";
import "FrogTests.js";*/
import "GameTestExtensions.js";/*
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
import "SimulatedPlayerTests.js";/*
import "RespawnAnchorTests.js";
import "PlaceSeedsTests.js";
import "ItemTests.js";*/
import "ItemEnchantmentsTests.js";/*
import "SculkTests.js";
import "VibrationTests.js";
import "EnchantmentTests.js";*//*
import "Eval.js";*/
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
import *  as main from "Main";
globalThis.modules.main=main
import *  as coords from "Main/coordinates";
globalThis.modules.coords=coords
import *  as cmds from "Main/commands";
globalThis.modules.cmds=cmds
import *  as bans from "Main/ban";
globalThis.modules.bans=bans
import *  as uis from "Main/ui";
globalThis.modules.uis=uis
import *  as playersave from "Main/player_save";
globalThis.modules.playersave=playersave
import *  as spawnprot from "Main/spawn_protection";
globalThis.modules.spawnprot=spawnprot
import *  as chat from "Main/chat";
globalThis.modules.chat=chat
import *  as cmdutils from "Main/command_utilities";
globalThis.modules.cmdutils=cmdutils
import *  as cmdslist from "Main/commands_list";
globalThis.modules.cmdslist=cmdslist
import *  as cmdsdocs from "Main/commands_documentation";
globalThis.modules.cmdsdocs=cmdsdocs
import *  as utils from "legacyModuleAliases/utilities";
globalThis.modules.utils=utils
import *  as shopmain from "ExtraFeatures/shop_main";
import *  as servershop from "ExtraFeatures/server_shop";
import *  as playershop from "ExtraFeatures/player_shop";
import *  as moneysystem from "ExtraFeatures/money";
import *  as structuremappings from "Assets/constants/structure_mappings";
import *  as transformrecipes from "Assets/constants/transformrecipes";
globalThis.modules.assets.constants.transformrecipes=transformrecipes
import *  as errors from "Main/errors";
globalThis.modules.errors=errors
import mcMath from "@minecraft/math.js";
import colorCore, { Color } from "color-core";
import Decimal from "decimal.js";
import * as semver from "semver";
export const modulesMap = {
    mcServer: mcServer,
    mcServerUi,
    GameTest,/*
    mcServerAdmin,
    mcDebugUtilities,
    mcCommon,
    mcVanillaData,*/
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
    ["@minecraft/server-gametest"]: GameTest,/*
    ["@minecraft/common"]: mcCommon,
    ["@minecraft/server-admin"]: mcServerAdmin,
    ["@minecraft/server-net"]: mcServerNet 
    ["@minecraft/debug-utilities"]: mcDebugUtilities 
    ["@minecraft/vanilla-data"]: mcVanillaData,*/
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
}
globalThis.modules=modulesMap
declare global {
    namespace globalThis {
        var modules: typeof modulesMap
        var tempSavedVariables: any[]
        var crashEnabled: boolean
        var format_version: typeof current_format_version
    }
}
import 'Main';
globalThis.scriptStartTick=system.currentTick
globalThis.crashEnabled = false
globalThis.tempSavedVariables = []
world.setDynamicProperty("format_version", format_version)
