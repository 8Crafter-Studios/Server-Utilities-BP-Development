/**
 * index.ts
 * @module index
 * @description This file is the main file of the project.
 * @mergeModuleWith <project>
 */
import { system, world } from "@minecraft/server";

import * as GameTest from "@minecraft/server-gametest";
import * as mcServer from "@minecraft/server";
import * as mcServerUi from "@minecraft/server-ui";
import * as mcServerAdmin from "@minecraft/server-admin";/*
import * as mcServerNet from "@minecraft/server-net";*//*
import * as mcDebugUtilities from "@minecraft/debug-utilities";*/
import * as mcCommon from "@minecraft/common";
import * as mcVanillaData from "@minecraft/vanilla-data.js";
import "initializeMainGlobalVariables";
import "Assets/classes/JSONB";
import "Global";
import "init/index.js";

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
import "Eval.js";*/ /* 
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
import "legacyModuleAliases/utilities.js"; */
import "@minecraft/math.js";
import "GlobalDecorators";
import * as mcMath from "@minecraft/math.js";
import colorCore, { Color } from "color-core";
import Decimal from "decimal.js";
import * as semver from "semver";
import * as ipc from "ipc";
import moment from "moment";
import "intl";
import "intl.locales";
import alea from "alea";
import * as simplexNoise from "simplex-noise";
Object.defineProperties(globalThis, {
    IPC: {
        value: ipc.IPC,
        configurable: false,
        enumerable: true,
        writable: false,
    },
    IPC_NET: {
        value: ipc.NET,
        configurable: false,
        enumerable: true,
        writable: false,
    },
    IPC_PROTO: {
        value: ipc.PROTO,
        configurable: false,
        enumerable: true,
        writable: false,
    },
    moment: {
        value: moment,
        configurable: false,
        enumerable: true,
        writable: false,
    },
});
// semver
// import * as main from "legacyModuleAliases/Main";
// import * as coords from "legacyModuleAliases/coordinates";
// import * as cmds from "legacyModuleAliases/commands";
// import * as bans from "legacyModuleAliases/ban";
// import * as uis from "legacyModuleAliases/ui";
// import * as playersave from "legacyModuleAliases/player_save";
// import * as spawnprot from "legacyModuleAliases/spawn_protection";
// import * as chat from "legacyModuleAliases/chat";
// import * as cmdutils from "legacyModuleAliases/command_utilities";
// import * as cmdslist from "legacyModuleAliases/commands_list";
// import * as cmdsdocs from "legacyModuleAliases/commands_documentation";
// import * as utils from "legacyModuleAliases/utilities";
import * as shopmain from "ExtraFeatures/shop_main";
import * as servershop from "ExtraFeatures/server_shop";
import * as playershop from "ExtraFeatures/player_shop";
import * as moneysystem from "ExtraFeatures/money";
import * as structuremappings from "Assets/constants/structure_mappings";
import * as transformrecipes from "Assets/constants/transformrecipes";
// import * as errors from "legacyModuleAliases/errors";
const main = await moduleImportsConfig.import("main");
const coords = await moduleImportsConfig.import("coordinates");
const cmds = await moduleImportsConfig.import("commands");
const bans = await moduleImportsConfig.import("ban");
const moderation = await moduleImportsConfig.import("moderation");
const uis = await moduleImportsConfig.import("ui");
const playersave = await moduleImportsConfig.import("player_save");
const spawnprot = await moduleImportsConfig.import("spawn_protection");
const chat = await moduleImportsConfig.import("chat");
const cmdutils = await moduleImportsConfig.import("command_utilities");
const cmdslist = await moduleImportsConfig.import("commands_list");
const cmdsdocs = await moduleImportsConfig.import("commands_documentation");
const utils = await moduleImportsConfig.import("utilities");
const errors = await moduleImportsConfig.import("errors");
// const main = {};
// const coords = {};
// const cmds = {};
// const bans = {};
// const uis = {};
// const playersave = {};
// const spawnprot = {};
// const chat = {};
// const cmdutils = {};
// const cmdslist = {};
// const cmdsdocs = {};
// const utils = {};
// const errors = {};
// const shopmain = {};
// const servershop = {};
// const playershop = {};
// const moneysystem = {};
// const mcMath = {};
/**
 * @see {@link modules}
 * @ignore
 */
const modulesMap = {
    /**
     * The `@minecraft/server` module.
     *
     * @see {@link https://www.npmjs.com/package/@minecraft/server}
     * @namespace
     */
    mcServer: mcServer,
    /**
     * The `@minecraft/server-ui` module.
     *
     * @see {@link https://www.npmjs.com/package/@minecraft/server-ui}
     * @namespace
     */
    mcServerUi,
    /**
     * The `@minecraft/server-gametest` module.
     *
     * @see {@link https://www.npmjs.com/package/@minecraft/server-gametest}
     * @namespace
     */
    GameTest,
    /**
     * The `@minecraft/server-admin` module.
     *
     * @see {@link https://www.npmjs.com/package/@minecraft/server-admin}
     * @namespace
     */
    mcServerAdmin,
    /**
     * The `@minecraft/server-net` module.
     *
     * @see {@link https://www.npmjs.com/package/@minecraft/server-net}
     * @namespace
     */
    // mcServerNet,
    /**
     * The `@minecraft/debug-utilities` module.
     *
     * @see {@link https://www.npmjs.com/package/@minecraft/debug-utilities}
     * @namespace
     */
    // mcDebugUtilities,
    /**
     * The `@minecraft/diagnostics` module.
     *
     * @see {@link https://www.npmjs.com/package/@minecraft/diagnostics}
     * @namespace
     */
    // mcDiagnostics,
    /**
     * The `@minecraft/common` module.
     *
     * @see {@link https://www.npmjs.com/package/@minecraft/common}
     * @namespace
     */
    mcCommon,
    /**
     * The `@minecraft/vanilla-data` module.
     *
     * @see {@link https://www.npmjs.com/package/@minecraft/vanilla-data}
     * @namespace
     */
    mcVanillaData,
    /**
     * This module contains the main classes, constants, and functions of the add-one, as well as other miscellaneous classes, constants, and functions.
     * @namespace
     */
    main: main as UnionToIntersection<optionalModuleObjectImportFilePathsImportMap[(typeof moduleOptionalImportPathMap)["main"][number]]>,
    /**
     * This is an alias of {@link modules.assets.constants.transformrecipes}.
     * @see {@link modules.assets.constants.transformrecipes}
     * @namespace
     */
    transformrecipes,
    /**
     * This module contains classes, constants, functions, and interfaces for working with coordinates.
     * @namespace
     * @path `modules/coordinates/`
     */
    coords: coords as UnionToIntersection<optionalModuleObjectImportFilePathsImportMap[(typeof moduleOptionalImportPathMap)["coordinates"][number]]>,
    /**
     * This module contains classes, constants, functions, and types for working with commands.
     * @namespace
     * @path `modules/commands/`
     */
    cmds: cmds as UnionToIntersection<optionalModuleObjectImportFilePathsImportMap[(typeof moduleOptionalImportPathMap)["commands"][number]]>,
    /**
     * This module contains classes, constants, functions, and types for working with the ban system.
     * @namespace
     * @path `modules/ban/`
     */
    bans: bans as UnionToIntersection<optionalModuleObjectImportFilePathsImportMap[(typeof moduleOptionalImportPathMap)["ban"][number]]>,
    /**
     * This module contains classes, constants, functions, and types for working with the moderation system.
     * @namespace
     * @path `modules/moderation/`
     */
    moderation: moderation as UnionToIntersection<optionalModuleObjectImportFilePathsImportMap[(typeof moduleOptionalImportPathMap)["moderation"][number]]>,
    /**
     * This module contains constants, functions, and types for working with the UI system.
     * @namespace
     * @path `modules/ui/`
     * @primaryExport
     */
    uis: uis as UnionToIntersection<optionalModuleObjectImportFilePathsImportMap[(typeof moduleOptionalImportPathMap)["ui"][number]]>,
    /**
     * This module contains classes, constants, and functions for working with the player data save system.
     * @namespace
     * @path `modules/player_save/`
     */
    playersave: playersave as UnionToIntersection<optionalModuleObjectImportFilePathsImportMap[(typeof moduleOptionalImportPathMap)["player_save"][number]]>,
    /**
     * This module contains constants and functions for working with the spawn protection system.
     * @namespace
     * @path `modules/spawn_protection/`
     */
    spawnprot: spawnprot as UnionToIntersection<optionalModuleObjectImportFilePathsImportMap[(typeof moduleOptionalImportPathMap)["spawn_protection"][number]]>,
    /**
     * The `@minecraft/math` module.
     * @see {@link https://www.npmjs.com/package/@minecraft/math}
     * @namespace
     */
    mcMath,
    /**
     * The `color-core` module.
     * @see {@link https://www.npmjs.com/package/color-core}
     * @namespace
     */
    colorCore,
    /**
     * The Color class of the `color-core` module.
     * @see {@link modules.colorCore.Color}
     * @kindOverride Namespace
     */
    Color,
    /**
     * The `decimal.js` module.
     * @see {@link https://www.npmjs.com/package/decimal.js}
     * @namespace
     */
    Decimal,
    /**
     * The `semver` module.
     * @see {@link https://www.npmjs.com/package/semver}
     * @namespace
     */
    semver,
    /**
     * The `mcbe-ipc` module.
     * @see {@link https://www.npmjs.com/package/mcbe-ipc}
     * @namespace
     */
    ipc,
    /**
     * The `moment` module.
     * @see {@link https://momentjs.com/}
     * @see {@link https://www.npmjs.com/package/moment}
     * @namespace
     */
    moment,
    /**
     * The `alea` module.
     * @see {@link https://www.npmjs.com/package/alea}
     * @namespace
     */
    alea,
    /**
     * The `simplex-noise` module.
     * @see {@link https://www.npmjs.com/package/simplex-noise}
     * @namespace
     */
    simplexNoise,
    /**
     * The `@minecraft/server` module.
     *
     * @see {@link https://www.npmjs.com/package/@minecraft/server}
     * @namespace
     */
    ["@minecraft/server"]: mcServer,
    /**
     * The `@minecraft/server-ui` module.
     *
     * @see {@link https://www.npmjs.com/package/@minecraft/server-ui}
     * @namespace
     */
    ["@minecraft/server-ui"]: mcServerUi,
    /**
     * The `@minecraft/server-gametest` module.
     *
     * @see {@link https://www.npmjs.com/package/@minecraft/server-gametest}
     * @namespace
     */
    ["@minecraft/server-gametest"]: GameTest,
    /**
     * The `@minecraft/common` module.
     *
     * @see {@link https://www.npmjs.com/package/@minecraft/common}
     * @namespace
     */
    ["@minecraft/common"]: mcCommon,
    /**
     * The `@minecraft/server-admin` module.
     *
     * @see {@link https://www.npmjs.com/package/@minecraft/server-admin}
     * @namespace
     */
    ["@minecraft/server-admin"]: mcServerAdmin,
    /**
     * The `@minecraft/server-net` module.
     *
     * @see {@link https://www.npmjs.com/package/@minecraft/server-net}
     * @namespace
     */
    // ["@minecraft/server-net"]: mcServerNet
    /**
     * The `@minecraft/debug-utilities` module.
     *
     * @see {@link https://www.npmjs.com/package/@minecraft/debug-utilities}
     * @namespace
     */
    // ["@minecraft/debug-utilities"]: mcDebugUtilities
    /**
     * The `@minecraft/diagnostics` module.
     *
     * @see {@link https://www.npmjs.com/package/@minecraft/diagnostics}
     * @namespace
     */
    // ["@minecraft/diagnostics"]: mcDiagnostics
    /**
     * The `@minecraft/vanilla-data` module.
     * @see {@link https://www.npmjs.com/package/@minecraft/vanilla-data}
     * @namespace
     */
    ["@minecraft/vanilla-data"]: mcVanillaData,
    /**
     * The `@minecraft/math` module.
     *
     * @see {@link https://www.npmjs.com/package/@minecraft/math}
     * @namespace
     */
    ["@minecraft/math"]: mcMath,
    /**
     * This module contains constants and functions for working with chat.
     * @namespace
     * @path `modules/chat/`
     */
    chat: chat as UnionToIntersection<optionalModuleObjectImportFilePathsImportMap[(typeof moduleOptionalImportPathMap)["chat"][number]]>,
    /**
     * This module contains utility constants, enums, and functions for working with commands.
     * @namespace
     * @path `modules/command_utilities/`
     */
    cmdutils: cmdutils as UnionToIntersection<optionalModuleObjectImportFilePathsImportMap[(typeof moduleOptionalImportPathMap)["command_utilities"][number]]>,
    /**
     * This module contains the list of commands.
     * @namespace
     * @path `modules/commands_list/`
     */
    cmdslist: cmdslist as UnionToIntersection<optionalModuleObjectImportFilePathsImportMap[(typeof moduleOptionalImportPathMap)["commands_list"][number]]>,
    /**
     * This module contains documentation for commands.
     * @namespace
     * @path `modules/commands_documentation/`
     */
    cmdsdocs: cmdsdocs as UnionToIntersection<optionalModuleObjectImportFilePathsImportMap[(typeof moduleOptionalImportPathMap)["commands_documentation"][number]]>,
    /**
     * This module contains utility classes, functions, and types.
     * @namespace
     * @path `modules/utilities/`
     */
    utils: utils as UnionToIntersection<optionalModuleObjectImportFilePathsImportMap[(typeof moduleOptionalImportPathMap)["utilities"][number]]>,
    /**
     * This module contains error classes.
     * @namespace
     * @path `modules/errors/`
     */
    errors: errors as UnionToIntersection<optionalModuleObjectImportFilePathsImportMap[(typeof moduleOptionalImportPathMap)["errors"][number]]>,
    /**
     * This module contains functions and types for working with the shop system.
     * @namespace
     * @path `ExtraFeatures/shop_main`
     */
    shopmain,
    /**
     * This module contains classes, functions, and types for working with the server shop system.
     * @namespace
     * @path `ExtraFeatures/server_shop`
     */
    servershop,
    /**
     * This module contains classes, functions, and types for working with the player shop system.
     * @namespace
     * @path `ExtraFeatures/player_shop`
     */
    playershop,
    /**
     * This module contains classes for working with the money system.
     * @namespace
     * @path `ExtraFeatures/money`
     */
    moneysystem,
    /**
     * This module contains miscellaneous classes, constants, functions, types, and interfaces.
     * @namespace
     * @path `Assets/`
     */
    assets: {
        /**
         * This module contains miscellaneous classes.
         * @namespace
         * @path `Assets/classes/`
         */
        classes: {
            /**
             * An intrinsic object that provides functions to convert JavaScript values to and from the JavaScript Object Notation (JSON) format.
             * @see {@link JSONB}
             * @path `Assets/classes/JSONB`
             */
            JSONB,
        },
        /**
         * This module contains miscellaneous constants.
         * @namespace
         * @path `Assets/constants/`
         */
        constants: {
            /**
             * This module contains constants containing character maps.
             * @namespace
             * @path `Assets/constants/charMaps`
             */
            charMaps: await import("Assets/constants/charMaps"),
            /**
             * This module contians mappings for structures for the `\enchantmentbarrels` command.
             * @namespace
             * @path `Assets/constants/structure_mappings`
             */
            structuremappings,
            /**
             * This module contains constants and types for texture presets.
             * @namespace
             * @path `Assets/constants/texturePresets`
             */
            texturePresets: await import("Assets/constants/texturePresets"),
            /**
             * This module contains mappings for recipes for the `\gettransformsmithingtemplate` command.
             * @namespace
             * @path `Assets/constants/transformrecipes`
             */
            transformrecipes,
        },
    },
};
globalThis.modules = modulesMap;
declare global {
    namespace globalThis {
        /**
         * This namespace contains all the modules.
         * @namespace
         * @global
         */
        var modules: typeof modulesMap; /* 
        var IPC: typeof ipc.IPC;
        var IPC_NET: typeof ipc.NET;
        var IPC_PROTO: typeof ipc.PROTO; */
    }
}

/**
 * This is an alias of {@link globalThis}.
 * @namespace
 * @see {@link Globals}
 * @hideconstructor
 * @readonly
 */
// export const gt = globalThis;

// import "Main";
import { UndoClipboard } from "modules/coordinates/classes/UndoClipboard";
import type { moduleOptionalImportPathMap, optionalModuleObjectImportFilePathsImportMap } from "directoryTree";
globalThis.scriptStartTick = system.currentTick;
world.setDynamicProperty("format_version", format_version);
system.runTimeout(() => UndoClipboard.cullItemsMissingStructure(), 50);
// ${se}srun(async()=>console.log(JSON.stringify(Object.fromEntries((await import("directoryTree")).scripts.filter(s=>!!s.match(/^BP\/scripts\/modules\/[^\/]+\/.+\/[^\/]+\.js$/)).map(s=>[s, 0])), undefined, 4)))
// ${se}srun(async()=>console.log("{"+(await import("directoryTree")).scripts.filter(s=>!!s.match(/^BP\/scripts\/modules\/[^\/]+\/.+\/[^\/]+\.js$/)).map(v=>`\n    ${JSON.stringify(v)}: typeof import("./${JSON.stringify(v.slice(11, -3)).slice(1)})`)+"\n}"))
/*
${se}srun(async()=>{console.log(JSON.stringify(Object.fromEntries(await [
    "ban",
    "chat",
    "command_utilities",
    "commands",
    "commands_documentation",
    "commands_list",
    "coordinates",
    "errors",
    "main",
    "player_save",
    "spawn_protection",
    "ui",
    "utilities",
].mapAsync(async v=>[v, (await import("directoryTree")).optionalModuleObjectImportFilePaths.filter(f=>f.startsWith(`BP/scripts/modules/${v}/`))])), undefined, 4))})
*/

/**
 * The `@minecraft/server` module.
 *
 * @beta
 * Contains many types related to manipulating a Minecraft
 * world, including entities, blocks, dimensions, and more.
 *
 * Manifest Details
 * ```json
 * {
 *   "module_name": "@minecraft/server",
 *   "version": "1.18.0-beta"
 * }
 * ```
 *
 * @see {@link https://www.npmjs.com/package/@minecraft/server}
 */
export type * as "@minecraft/server" from "@minecraft/server";
/**
 * The `@minecraft/server-ui` module.
 *
 * @beta
 * The `@minecraft/server-ui` module contains types for
 * expressing simple dialog-based user experiences.
 *
 *   * {@link ActionFormData} contain a list of buttons with
 * captions and images that can be used for presenting a set of
 * options to a player.
 *   * {@link MessageFormData} are simple two-button message
 * experiences that are functional for Yes/No or OK/Cancel
 * questions.
 *   * {@link ModalFormData} allow for a more flexible
 * "questionnaire-style" list of controls that can be used to
 * take input.
 *
 * Manifest Details
 * ```json
 * {
 *   "module_name": "@minecraft/server-ui",
 *   "version": "1.4.0-beta"
 * }
 * ```
 *
 * @see {@link https://www.npmjs.com/package/@minecraft/server-ui}
 */
export type * as "@minecraft/server-ui" from "@minecraft/server-ui";
/**
 * The `@minecraft/server-gametest` module.
 *
 * @beta
 * The @minecraft/server-gametest module provides scriptable
 * APIs for scaffolding and testing content experiences in
 * Minecraft.
 *
 * Manifest Details
 * ```json
 * {
 *   "module_name": "@minecraft/server-gametest",
 *   "version": "1.0.0-internal.1.20.80-stable"
 * }
 * ```
 *
 * @see {@link https://www.npmjs.com/package/@minecraft/server-gametest}
 * @kindOverride Module
 */
export type * as "@minecraft/server-gametest" from "@minecraft/server-gametest";
/**
 * The `@minecraft/server-admin` module.
 *
 * @beta
 * Contains types related to administering a Bedrock Dedicated
 * Server. These types allow for the configuration of variables
 * and secrets in JSON files in the Bedrock Dedicated Server
 * folder. These types cannot be used on Minecraft clients or
 * within Minecraft Realms.
 *
 * Manifest Details
 * ```json
 * {
 *   "module_name": "@minecraft/server-admin",
 *   "version": "1.0.0-beta"
 * }
 * ```
 *
 * @see {@link https://www.npmjs.com/package/@minecraft/server-admin}
 * @kindOverride Module
 */
export type * as "@minecraft/server-admin" from "@minecraft/server-admin";
/**
 * The `@minecraft/server-net` module.
 *
 * Note: This module is not in the manifest.json so it cannot be accessed in-game.
 *
 * It is only in the api docs for references for vanilla types.
 *
 * @beta
 * The `@minecraft/server-net` module contains types for
 * executing HTTP-based requests. This module can only be used
 * on Bedrock Dedicated Server. These APIs do not function
 * within the Minecraft game client or within Minecraft Realms.
 *
 * Manifest Details
 * ```json
 * {
 *   "module_name": "@minecraft/server-net",
 *   "version": "1.0.0-beta"
 * }
 * ```
 *
 * @see {@link https://www.npmjs.com/package/@minecraft/server-net}
 * @kindOverride Module
 */
// export type * as "@minecraft/server-net" from "@minecraft/server-net"; // Must be import type because it is not in the manifest.json so it cannot be imported or exported in-game.
/**
 * The `@minecraft/debug-utilities` module.
 *
 * Note: This module is not in the manifest.json so it cannot be accessed in-game.
 *
 * It is only in the api docs for references for vanilla types.
 *
 * @beta
 * Contains debug utility functions.
 *
 * Manifest Details
 * ```json
 * {
 *   "module_name": "@minecraft/debug-utilities",
 *   "version": "1.0.0-beta"
 * }
 * ```
 *
 * @see {@link https://www.npmjs.com/package/@minecraft/debug-utilities}
 * @kindOverride Module
 */
// export type * as "@minecraft/debug-utilities" from "@minecraft/debug-utilities"; // Must be import type because it is not in the manifest.json so it cannot be imported or exported in-game.
/**
 * The `@minecraft/diagnostics` module.
 *
 * Note: This module is not in the manifest.json so it cannot be accessed in-game.
 *
 * It is only in the api docs for references for vanilla types
 *
 * @see {@link https://www.npmjs.com/package/@minecraft/diagnostics}
 * @kindOverride Module
 */
// export type * as "@minecraft/diagnostics" from "@minecraft/diagnostics"; // Must be import type because it is not in the manifest.json so it cannot be imported or exported in-game.
/**
 * The `@minecraft/common` module.
 *
 * Manifest Details
 * ```json
 * {
 *   "module_name": "@minecraft/common",
 *   "version": "1.1.0"
 * }
 * ```
 * 
 * @see {@link https://www.npmjs.com/package/@minecraft/common}
 * @kindOverride Module
 */
export type * as "@minecraft/common" from "@minecraft/common";
/**
 * The `@minecraft/vanilla-data` module.
 *
 * This module contains type definitions and enumarations for vanilla content
 * within the game, such as Blocks, Items, Entities, and more. This module is
 * versioned accordingly with Minecraft release and preview versions, and
 * contain the up to date types available in the game.
 *
 * @see {@link https://www.npmjs.com/package/@minecraft/vanilla-data}
 * @kindOverride Module
 */
export type * as "@minecraft/vanilla-data" from "@minecraft/vanilla-data";
/**
 * The `@minecraft/math` module.
 *
 * @see {@link https://www.npmjs.com/package/@minecraft/math}
 * @version v2.2.1
 * @kindOverride Module
 * @external
 */
export type * as "@minecraft/math" from "@minecraft/math";
