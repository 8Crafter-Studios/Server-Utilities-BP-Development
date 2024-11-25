import { system, world } from "@minecraft/server";
import * as GameTest from "@minecraft/server-gametest";
import * as mcServer from "@minecraft/server";
import * as mcServerUi from "@minecraft/server-ui"; /*
import * as mcServerAdmin from "@minecraft/server-admin";*/ /*
import * as mcServerNet from "@minecraft/server-net";*/ /*
import * as mcDebugUtilities from "@minecraft/debug-utilities";*/ /*
import * as mcCommon from "@minecraft/common";*/ /*
import * as mcVanillaData from "@minecraft/vanilla-data";*/
import "initializeMainGlobalVariables";
import "Assets/classes/JSONB";
import "Global";
import 'init/index';
/*
import "GameTestScripts/AllayTests.js";
import "GameTestScripts/APITests.js";*/
import "GameTestScripts/BlockEventTests.js"; /*
import "GameTestScripts/BlockTests.js";*/
import "GameTestScripts/ComponentTests.js";
import "GameTestScripts/CommandTests.js";
import "GameTestScripts/DebugTests.js"; /*
import "GameTestScripts/DispenserTests.js";
import "GameTestScripts/DoorTests.js";
import "GameTestScripts/DripstoneTests.js";
import "GameTestScripts/DuplicationTests.js";
import "GameTestScripts/EntityQueryTests.js";
import "GameTestScripts/EntityTests.js";
import "GameTestScripts/ExtensionTests.js";
import "GameTestScripts/FireAvoidTests.js";
import "GameTestScripts/FrogTests.js";*/
import "GameTestScripts/GameTestExtensions.js"; /*
import "GameTestScripts/MinecartTests.js";
import "GameTestScripts/MobTests.js";
import "GameTestScripts/MultifaceTests.js";
import "GameTestScripts/PathFindingTests.js";
import "GameTestScripts/FlyingMachineTests.js";
import "GameTestScripts/PistonTests.js";
import "GameTestScripts/TntTests.js";
import "GameTestScripts/WaterPathfindingTests.js";
import "GameTestScripts/WardenTests.js";
import "GameTestScripts/SmallMobTests.js";
import "GameTestScripts/BigMobTests.js";
import "GameTestScripts/RaycastingTests.js";
import "GameTestScripts/RedstoneTests.js";*/
import "GameTestScripts/SimulatedPlayerTests.js"; /*
import "GameTestScripts/RespawnAnchorTests.js";
import "GameTestScripts/PlaceSeedsTests.js";
import "GameTestScripts/ItemTests.js";*/
import "GameTestScripts/ItemEnchantmentsTests.js"; /*
import "GameTestScripts/SculkTests.js";
import "GameTestScripts/VibrationTests.js";
import "GameTestScripts/EnchantmentTests.js";*/ /*
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
import * as errors from "legacyModuleAliases/errors";
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