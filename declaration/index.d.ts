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
import "@minecraft/math.js";
import "GlobalDecorators";
import mcMath from "@minecraft/math.js";
import * as ipc from "ipc";
import "intl";
import "intl.locales";
import * as shopmain from "ExtraFeatures/shop_main";
import * as servershop from "ExtraFeatures/server_shop";
import * as playershop from "ExtraFeatures/player_shop";
import * as moneysystem from "ExtraFeatures/money";
import * as structuremappings from "Assets/constants/structure_mappings";
import * as transformrecipes from "Assets/constants/transformrecipes";
/**
 * @see {@link modules}
 * @ignore
 */
declare const modulesMap: {
    /**
     * The `@minecraft/server` module.
     * @see {@link https://www.npmjs.com/package/@minecraft/server}
     */
    mcServer: typeof mcServer;
    /**
     * The `@minecraft/server-ui` module.
     * @see {@link https://www.npmjs.com/package/@minecraft/server-ui}
     */
    mcServerUi: typeof mcServerUi;
    /**
     * The `@minecraft/server-gametest` module.
     * @see {@link https://www.npmjs.com/package/@minecraft/server-gametest}
     */
    GameTest: typeof GameTest;
    /**
     * The `@minecraft/server-admin` module.
     * @see {@link https://www.npmjs.com/package/@minecraft/server-admin}
     */
    /**
     * The `@minecraft/server-debug` module.
     * @see {@link https://www.npmjs.com/package/@minecraft/debug-utilities}
     */
    /**
     * The `@minecraft/common` module.
     * @see {@link https://www.npmjs.com/package/@minecraft/common}
     */
    /**
     * The `@minecraft/vanilla-data` module.
     * @see {@link https://www.npmjs.com/package/@minecraft/vanilla-data}
     */
    /**
     * This module contains the main classes, constants, and functions of the add-one, as well as other miscellaneous classes, constants, and functions.
     * @namespace
     */
    main: Partial<typeof import("./modules/main/classes/Bounty") & typeof import("./modules/main/classes/RedeemableCode") & typeof import("./modules/main/classes/ScoreboardV2") & typeof import("./modules/main/classes/SemVerString") & typeof import("./modules/main/classes/customFormUIElement") & typeof import("./modules/main/classes/interactable_blockb") & typeof import("./modules/main/classes/worldPlayers") & typeof import("./modules/main/constants/outsideBorderTintParticleMolangVariableMapObject") & typeof import("./modules/main/constants/outsideBorderTintShownTimes") & typeof import("./modules/main/constants/timeZones") & typeof import("./modules/main/functions/arrayToElementList") & typeof import("./modules/main/functions/checkIfCompatibleBlueModsAnticheatIsActive") & typeof import("./modules/main/functions/checkIfCompatibleEntityScaleIsActive") & typeof import("./modules/main/functions/clearAllContainerBlocks") & typeof import("./modules/main/functions/debugAction") & typeof import("./modules/main/functions/debugActionb") & typeof import("./modules/main/functions/fillBlocks") & typeof import("./modules/main/functions/fillBlocksB") & typeof import("./modules/main/functions/fillBlocksC") & typeof import("./modules/main/functions/fillBlocksCG") & typeof import("./modules/main/functions/fillBlocksD") & typeof import("./modules/main/functions/fillBlocksE") & typeof import("./modules/main/functions/fillBlocksF") & typeof import("./modules/main/functions/fillBlocksH") & typeof import("./modules/main/functions/fillBlocksHB") & typeof import("./modules/main/functions/fillBlocksHC") & typeof import("./modules/main/functions/fillBlocksHCGB") & typeof import("./modules/main/functions/fillBlocksHDFGB") & typeof import("./modules/main/functions/fillBlocksHDG") & typeof import("./modules/main/functions/fillBlocksHFFGB") & typeof import("./modules/main/functions/fillBlocksHFG") & typeof import("./modules/main/functions/fillBlocksHFGB") & typeof import("./modules/main/functions/fillBlocksHFGBM") & typeof import("./modules/main/functions/fillBlocksHH") & typeof import("./modules/main/functions/fillBlocksHHFGB") & typeof import("./modules/main/functions/fillBlocksHHG") & typeof import("./modules/main/functions/fillBlocksHHOG") & typeof import("./modules/main/functions/fillBlocksHHS") & typeof import("./modules/main/functions/fillBlocksHHSG") & typeof import("./modules/main/functions/fillBlocksHHSGB") & typeof import("./modules/main/functions/fillBlocksHISGG") & typeof import("./modules/main/functions/fillBlocksHISGGB") & typeof import("./modules/main/functions/fillBlocksHO") & typeof import("./modules/main/functions/fillBlocksHOFGB") & typeof import("./modules/main/functions/fillBlocksHOG") & typeof import("./modules/main/functions/fillBlocksHOTG") & typeof import("./modules/main/functions/fillBlocksHP") & typeof import("./modules/main/functions/fillBlocksHS") & typeof import("./modules/main/functions/fillBlocksHSG") & typeof import("./modules/main/functions/fillBlocksHSGB") & typeof import("./modules/main/functions/fillBlocksHSGG") & typeof import("./modules/main/functions/fillBlocksHSGGB") & typeof import("./modules/main/functions/fillBlocksHSSG") & typeof import("./modules/main/functions/fillBlocksHT") & typeof import("./modules/main/functions/fillBlocksHW") & typeof import("./modules/main/functions/fillBlocksHWFGB") & typeof import("./modules/main/functions/fillBlocksHWG") & typeof import("./modules/main/functions/flatPath") & typeof import("./modules/main/functions/getGroundSolidBlock") & typeof import("./modules/main/functions/getNextTopSolidBlockAbovePosition") & typeof import("./modules/main/functions/getNextTopSolidBlockBelowPosition") & typeof import("./modules/main/functions/getPathInObject") & typeof import("./modules/main/functions/getTopSolidBlock") & typeof import("./modules/main/functions/getUICustomForm") & typeof import("./modules/main/functions/scanForBlockType") & typeof import("./modules/main/functions/scanForContainerBlocks") & typeof import("./modules/main/functions/spawnBlockSurroundingParticle") & typeof import("./modules/main/functions/spawnBlockSurroundingParticleForPlayer") & typeof import("./modules/main/functions/strToCustomFormUIElement") & typeof import("./modules/main/functions/v3Multiply")>;
    /**
     * This is an alias of {@link modules.assets.constants.transformrecipes}.
     * @see {@link modules.assets.constants.transformrecipes}
     * @namespace
     */
    transformrecipes: typeof transformrecipes;
    /**
     * This module contains classes, constants, functions, and interfaces for working with coordinates.
     * @namespace
     * @path `modules/coordinates/`
     */
    coords: Partial<typeof import("./modules/coordinates/classes/AreaBackup") & typeof import("./modules/coordinates/classes/AreaBackups") & typeof import("./modules/coordinates/classes/TeleportRequest") & typeof import("./modules/coordinates/classes/WorldPosition") & typeof import("./modules/coordinates/classes/blockClipboard") & typeof import("modules/coordinates/classes/undoClipboard") & typeof import("./modules/coordinates/constants/generateMinecraftSphereBGProgress") & typeof import("./modules/coordinates/constants/generatorProgress") & typeof import("./modules/coordinates/functions/VSTR") & typeof import("./modules/coordinates/functions/anglesToDirectionVector") & typeof import("./modules/coordinates/functions/anglesToDirectionVectorDeg") & typeof import("./modules/coordinates/functions/approxEqual") & typeof import("./modules/coordinates/functions/approxEquals") & typeof import("./modules/coordinates/functions/approximatelyEqual") & typeof import("./modules/coordinates/functions/approximatelyEquals") & typeof import("./modules/coordinates/functions/caretNotation") & typeof import("./modules/coordinates/functions/caretNotationB") & typeof import("./modules/coordinates/functions/caretNotationC") & typeof import("./modules/coordinates/functions/caretNotationD") & typeof import("./modules/coordinates/functions/chunkIndexToBoundingBox") & typeof import("./modules/coordinates/functions/chunkIndexToBoundingBoxB") & typeof import("./modules/coordinates/functions/chunkIndexToBoundingBoxXZ") & typeof import("./modules/coordinates/functions/chunkIndexToBoundingBoxXZB") & typeof import("./modules/coordinates/functions/coordinates") & typeof import("./modules/coordinates/functions/coordinatesB") & typeof import("./modules/coordinates/functions/coordinatesC") & typeof import("./modules/coordinates/functions/coordinatesD") & typeof import("./modules/coordinates/functions/coordinatesE") & typeof import("./modules/coordinates/functions/degradeArray") & typeof import("./modules/coordinates/functions/dirmap") & typeof import("./modules/coordinates/functions/diroffsetmap") & typeof import("./modules/coordinates/functions/diroffsetmapb") & typeof import("./modules/coordinates/functions/diroffsetothersmap") & typeof import("./modules/coordinates/functions/doBoundingBoxesIntersect") & typeof import("./modules/coordinates/functions/drawMinecraftCircle") & typeof import("./modules/coordinates/functions/drawMinecraftCircleB") & typeof import("./modules/coordinates/functions/drawMinecraftLopsidedSphere") & typeof import("./modules/coordinates/functions/drawMinecraftSphere") & typeof import("./modules/coordinates/functions/evaluateCoordinates") & typeof import("./modules/coordinates/functions/evaluateCoordinatesB") & typeof import("./modules/coordinates/functions/evaluateRotationCoordinates") & typeof import("./modules/coordinates/functions/facingPoint") & typeof import("./modules/coordinates/functions/generateCircleCoordinates") & typeof import("./modules/coordinates/functions/generateCircleCoordinatesB") & typeof import("./modules/coordinates/functions/generateCircleCoordinatesC") & typeof import("./modules/coordinates/functions/generateDomeBG") & typeof import("./modules/coordinates/functions/generateFillBG") & typeof import("./modules/coordinates/functions/generateHollowFillBG") & typeof import("./modules/coordinates/functions/generateHollowSphere") & typeof import("./modules/coordinates/functions/generateHollowSphereB") & typeof import("./modules/coordinates/functions/generateHollowSphereBG") & typeof import("./modules/coordinates/functions/generateInverseSkygrid") & typeof import("./modules/coordinates/functions/generateInverseSkygridBG") & typeof import("./modules/coordinates/functions/generateMathExpression") & typeof import("./modules/coordinates/functions/generateMinecraftCircleOutline") & typeof import("./modules/coordinates/functions/generateMinecraftCircleOutlineBG") & typeof import("./modules/coordinates/functions/generateMinecraftConeBG") & typeof import("./modules/coordinates/functions/generateMinecraftCylinder") & typeof import("./modules/coordinates/functions/generateMinecraftOvoid") & typeof import("./modules/coordinates/functions/generateMinecraftOvoidBG") & typeof import("./modules/coordinates/functions/generateMinecraftOvoidC") & typeof import("./modules/coordinates/functions/generateMinecraftOvoidCG") & typeof import("./modules/coordinates/functions/generateMinecraftSemiSphereBG") & typeof import("./modules/coordinates/functions/generateMinecraftSemiSphereBGB") & typeof import("./modules/coordinates/functions/generateMinecraftSphere") & typeof import("./modules/coordinates/functions/generateMinecraftSphereB") & typeof import("./modules/coordinates/functions/generateMinecraftSphereBG") & typeof import("./modules/coordinates/functions/generateMinecraftSphereBGIdGenerator") & typeof import("./modules/coordinates/functions/generateMinecraftTunnel") & typeof import("./modules/coordinates/functions/generateMinecraftTunnelSet") & typeof import("./modules/coordinates/functions/generateOutlineFillBG") & typeof import("./modules/coordinates/functions/generateSkygrid") & typeof import("./modules/coordinates/functions/generateSkygridBG") & typeof import("./modules/coordinates/functions/generateSolidOvoid") & typeof import("./modules/coordinates/functions/generateSolidOvoidBG") & typeof import("./modules/coordinates/functions/generateTickingAreaFillCoordinates") & typeof import("./modules/coordinates/functions/generateTickingAreaFillCoordinatesB") & typeof import("./modules/coordinates/functions/generateTickingAreaFillCoordinatesC") & typeof import("./modules/coordinates/functions/generateWallsFillBG") & typeof import("./modules/coordinates/functions/generatorProgressIdGenerator") & typeof import("./modules/coordinates/functions/getChunkIndex") & typeof import("./modules/coordinates/functions/getChunkIndexB") & typeof import("./modules/coordinates/functions/getChunkIndexC") & typeof import("./modules/coordinates/functions/getChunkIndexD") & typeof import("./modules/coordinates/functions/getDistance") & typeof import("./modules/coordinates/functions/movePointInDirection") & typeof import("./modules/coordinates/functions/parseExpression") & typeof import("./modules/coordinates/functions/parseExpressionB") & typeof import("./modules/coordinates/functions/parseExpressionBKE") & typeof import("./modules/coordinates/functions/parseExpressionBR") & typeof import("./modules/coordinates/functions/parseExpressionKE") & typeof import("./modules/coordinates/functions/parseExpressionR") & typeof import("./modules/coordinates/functions/removeAirFromStructure") & typeof import("./modules/coordinates/functions/rotate") & typeof import("./modules/coordinates/functions/rotate3d") & typeof import("./modules/coordinates/functions/roundVector3ToMiddleOfBlock") & typeof import("./modules/coordinates/functions/roundVector3ToMiddleOfBlockFloorY") & typeof import("./modules/coordinates/functions/splitArea") & typeof import("./modules/coordinates/functions/splitAreaB") & typeof import("./modules/coordinates/functions/splitRange") & typeof import("./modules/coordinates/interfaces/DimensionRotationLocation") & typeof import("./modules/coordinates/interfaces/DimensionVolumeArea") & typeof import("./modules/coordinates/interfaces/RotationLocation") & typeof import("./modules/coordinates/interfaces/Vector4") & typeof import("./modules/coordinates/interfaces/Vector5") & typeof import("./modules/coordinates/interfaces/Warp")>;
    /**
     * This module contains classes, constants, functions, and types for working with commands.
     * @namespace
     * @path `modules/commands/`
     */
    cmds: Partial<typeof import("./modules/commands/classes/BlockMask") & typeof import("./modules/commands/classes/BlockPattern") & typeof import("./modules/commands/classes/Home") & typeof import("./modules/commands/classes/HomeSystem") & typeof import("./modules/commands/classes/LandClaim") & typeof import("./modules/commands/classes/LandClaimSystem") & typeof import("./modules/commands/classes/chunkLandClaim") & typeof import("./modules/commands/classes/command") & typeof import("./modules/commands/classes/commandSettings") & typeof import("./modules/commands/classes/executeCommandPlayer") & typeof import("./modules/commands/classes/executeCommandPlayerW") & typeof import("./modules/commands/constants/command_settings_format_version") & typeof import("./modules/commands/constants/commands_format_version") & typeof import("./modules/commands/constants/disconnectingPlayers") & typeof import("./modules/commands/functions/SNBTToJSONifiedNBTData") & typeof import("./modules/commands/functions/arryTV3") & typeof import("./modules/commands/functions/chatCommands") & typeof import("./modules/commands/functions/compareArrays") & typeof import("./modules/commands/functions/compareArraysB") & typeof import("./modules/commands/functions/compressBedrockNBTData") & typeof import("./modules/commands/functions/compressIntArray") & typeof import("./modules/commands/functions/compressIntArrayB") & typeof import("./modules/commands/functions/compressJavaNBTData") & typeof import("./modules/commands/functions/convertToSNBTFormat") & typeof import("./modules/commands/functions/cycleRGB") & typeof import("./modules/commands/functions/despawnEntities") & typeof import("./modules/commands/functions/detectNBTDataType") & typeof import("./modules/commands/functions/disconnectPlayers") & typeof import("./modules/commands/functions/evaluateParameters") & typeof import("./modules/commands/functions/evaluateParametersOld") & typeof import("./modules/commands/functions/evaluateParametersOldB") & typeof import("./modules/commands/functions/evaluateSelectors") & typeof import("./modules/commands/functions/extractIntArray") & typeof import("./modules/commands/functions/extractIntArrayB") & typeof import("./modules/commands/functions/extractIntArrayBGenerator") & typeof import("./modules/commands/functions/extractIntArrayG") & typeof import("./modules/commands/functions/extractSelectors") & typeof import("./modules/commands/functions/fltToStr") & typeof import("./modules/commands/functions/generateNBTFile") & typeof import("./modules/commands/functions/generateNBTFileB") & typeof import("./modules/commands/functions/generateNBTFileC") & typeof import("./modules/commands/functions/generateNBTFileD") & typeof import("./modules/commands/functions/generateNBTFileE") & typeof import("./modules/commands/functions/generateNBTFileEGG") & typeof import("./modules/commands/functions/generateNBTFileEGGB") & typeof import("./modules/commands/functions/generateNBTFileF") & typeof import("./modules/commands/functions/getAllEntities") & typeof import("./modules/commands/functions/getEntityById") & typeof import("./modules/commands/functions/getPlayersWithAnyOfTags") & typeof import("./modules/commands/functions/getPlayersWithTags") & typeof import("./modules/commands/functions/idGenerator") & typeof import("./modules/commands/functions/parseBlockMatcherType") & typeof import("./modules/commands/functions/parseJSONifiedNBTData") & typeof import("./modules/commands/functions/parseNBTFile") & typeof import("./modules/commands/functions/parseSNBT") & typeof import("./modules/commands/functions/sOSATSA") & typeof import("./modules/commands/functions/selectWeightedElement") & typeof import("./modules/commands/functions/setNBTDataType") & typeof import("./modules/commands/functions/strToFlt") & typeof import("./modules/commands/functions/stringifyJSONCompressed") & typeof import("./modules/commands/functions/superCompressBedrockNBTData") & typeof import("./modules/commands/functions/superCompressJavaNBTData") & typeof import("./modules/commands/functions/testBlockForMatch") & typeof import("./modules/commands/functions/testBlockForMatchToMask") & typeof import("./modules/commands/functions/ultraCompressIntArray") & typeof import("./modules/commands/functions/ultraCompressIntArrayB") & typeof import("./modules/commands/functions/ultraExtractIntArray") & typeof import("./modules/commands/functions/ultraExtractIntArrayB") & typeof import("./modules/commands/functions/unsuperCompress") & typeof import("./modules/commands/functions/unsuperCompressG") & typeof import("./modules/commands/functions/unultraCompress") & typeof import("./modules/commands/functions/vTStr") & typeof import("./modules/commands/functions/vTV3") & typeof import("./modules/commands/types/LowercaseLetter") & typeof import("./modules/commands/types/UppercaseLetter") & typeof import("./modules/commands/types/ZeroToNineCharacters") & typeof import("./modules/commands/types/commandCategory") & typeof import("./modules/commands/types/command_formats_type_list") & typeof import("./modules/commands/types/evaluateParametersArgumentTypes") & typeof import("./modules/commands/types/evaluateParametersParameter") & typeof import("./modules/commands/types/evaluateParametersParameterTypes") & typeof import("./modules/commands/types/evaluateParametersTypeMap") & typeof import("./modules/commands/types/evaluateParametersTypeMapper") & typeof import("./modules/commands/types/extendedExecuteCommandPlayerW") & typeof import("./modules/commands/types/flagsMatcherTextA") & typeof import("./modules/commands/types/flagsMatcherTextB") & typeof import("./modules/commands/types/flagsMatcherTextC") & typeof import("./modules/commands/types/mergedExecuteCommandPlayer") & typeof import("./modules/commands/types/playerobject")>;
    /**
     * This module contains classes, constants, functions, and types for working with the ban system.
     * @namespace
     * @path `modules/ban/`
     */
    bans: Partial<typeof import("./modules/ban/classes/ban") & typeof import("./modules/ban/constants/ban_format_version") & typeof import("./modules/ban/functions/checkingForBannedPlayers")>;
    /**
     * This module contains constants, functions, and types for working with the UI system.
     * @namespace
     * @path `modules/ui/`
     */
    uis: Partial<typeof import("./modules/ui/constants/customFormUICodes") & typeof import("./modules/ui/constants/defaultPlayerMenuLeaderboardStatistics") & typeof import("./modules/ui/constants/menuButtonIds") & typeof import("./modules/ui/functions/ModalFormElements") & typeof import("./modules/ui/functions/addNewCustomFormUI") & typeof import("./modules/ui/functions/addonDebugUI") & typeof import("./modules/ui/functions/advancedSettings") & typeof import("./modules/ui/functions/antispamSettings") & typeof import("./modules/ui/functions/chatAndNameTagsSettings") & typeof import("./modules/ui/functions/chatCommandRunner") & typeof import("./modules/ui/functions/chatMessageNoCensor") & typeof import("./modules/ui/functions/chatRanksSettings") & typeof import("./modules/ui/functions/chatRanksSettings_chatStyle") & typeof import("./modules/ui/functions/chatRanksSettings_chatStyleSettings") & typeof import("./modules/ui/functions/chatRanksSettings_generalChatSettings") & typeof import("./modules/ui/functions/chatRanksSettings_old") & typeof import("./modules/ui/functions/chatRanksSettings_previewChatMessage") & typeof import("./modules/ui/functions/chatSendNoCensor") & typeof import("./modules/ui/functions/commandCategories") & typeof import("./modules/ui/functions/commandCategoriesDisplay") & typeof import("./modules/ui/functions/createExplosion") & typeof import("./modules/ui/functions/customElementTypeIds") & typeof import("./modules/ui/functions/customElementTypes") & typeof import("./modules/ui/functions/customFormDataTypeIds") & typeof import("./modules/ui/functions/customFormDataTypes") & typeof import("./modules/ui/functions/customFormListSelectionMenu") & typeof import("./modules/ui/functions/customFormUIEditor") & typeof import("./modules/ui/functions/customFormUIEditorCode") & typeof import("./modules/ui/functions/editCustomFormUI") & typeof import("./modules/ui/functions/editModuleImportsConfig") & typeof import("./modules/ui/functions/editorStick") & typeof import("./modules/ui/functions/editorStickB") & typeof import("./modules/ui/functions/editorStickC") & typeof import("./modules/ui/functions/editorStickMenuB") & typeof import("./modules/ui/functions/editorStickMenuC") & typeof import("./modules/ui/functions/entityController") & typeof import("./modules/ui/functions/evalAutoScriptSettings") & typeof import("./modules/ui/functions/exportAddOnData") & typeof import("./modules/ui/functions/extraFeaturesSettings") & typeof import("./modules/ui/functions/forceShow") & typeof import("./modules/ui/functions/generalSettings") & typeof import("./modules/ui/functions/getAllBuiltInCommandsCategories") & typeof import("./modules/ui/functions/homeSystemSettings") & typeof import("./modules/ui/functions/importAddOnData") & typeof import("./modules/ui/functions/infiniteUI") & typeof import("./modules/ui/functions/infiniteUIv2") & typeof import("./modules/ui/functions/infiniteUIv3") & typeof import("./modules/ui/functions/infiniteUIv4") & typeof import("./modules/ui/functions/inventoryController") & typeof import("./modules/ui/functions/itemCodePropertyEditor") & typeof import("./modules/ui/functions/itemDynamicPropertyEditor") & typeof import("./modules/ui/functions/itemEditor") & typeof import("./modules/ui/functions/itemEditorTypeSelection") & typeof import("./modules/ui/functions/itemSelector") & typeof import("./modules/ui/functions/mainMenu") & typeof import("./modules/ui/functions/manageBans") & typeof import("./modules/ui/functions/manageCommands") & typeof import("./modules/ui/functions/manageGameRulesUI") & typeof import("./modules/ui/functions/managePlayers") & typeof import("./modules/ui/functions/managePlayers_managePlayer") & typeof import("./modules/ui/functions/managePlayers_managePlayer_manageBans") & typeof import("./modules/ui/functions/managePlayers_managePlayer_manageHomes") & typeof import("./modules/ui/functions/manageRedeemableCodes") & typeof import("./modules/ui/functions/manageWarps") & typeof import("./modules/ui/functions/mapArtGenerator") & typeof import("./modules/ui/functions/mapArtGeneratorB") & typeof import("./modules/ui/functions/moderationSettings") & typeof import("./modules/ui/functions/moneySystemSettings") & typeof import("./modules/ui/functions/nameTagsSettings") & typeof import("./modules/ui/functions/nameTagsSettings_generalNameTagsSettings") & typeof import("./modules/ui/functions/nameTagsSettings_previewNameTag") & typeof import("./modules/ui/functions/nbtStructureLoader") & typeof import("./modules/ui/functions/newItemInSlot") & typeof import("./modules/ui/functions/notificationsSettings") & typeof import("./modules/ui/functions/onlinePlayerSelector") & typeof import("./modules/ui/functions/personalSettings") & typeof import("./modules/ui/functions/playerController") & typeof import("./modules/ui/functions/playerMenu") & typeof import("./modules/ui/functions/playerMenu_TPA") & typeof import("./modules/ui/functions/playerMenu_TPA_incoming") & typeof import("./modules/ui/functions/playerMenu_TPA_outgoing") & typeof import("./modules/ui/functions/playerMenu_about") & typeof import("./modules/ui/functions/playerMenu_about_contributors") & typeof import("./modules/ui/functions/playerMenu_bounties") & typeof import("./modules/ui/functions/playerMenu_bounties_list") & typeof import("./modules/ui/functions/playerMenu_bounties_list_from") & typeof import("./modules/ui/functions/playerMenu_bounties_list_on") & typeof import("./modules/ui/functions/playerMenu_bounty") & typeof import("./modules/ui/functions/playerMenu_bounty_from_individual") & typeof import("./modules/ui/functions/playerMenu_bounty_individual") & typeof import("./modules/ui/functions/playerMenu_bounty_individuals") & typeof import("./modules/ui/functions/playerMenu_bounty_new") & typeof import("./modules/ui/functions/playerMenu_bounty_on_individual") & typeof import("./modules/ui/functions/playerMenu_homes") & typeof import("./modules/ui/functions/playerMenu_leaderboard") & typeof import("./modules/ui/functions/playerMenu_leaderboard_player") & typeof import("./modules/ui/functions/playerMenu_leaderboards") & typeof import("./modules/ui/functions/playerMenu_moneyTransfer") & typeof import("./modules/ui/functions/playerMenu_redeemCode") & typeof import("./modules/ui/functions/playerMenu_warps") & typeof import("./modules/ui/functions/scriptEvalRunWindow") & typeof import("./modules/ui/functions/scriptSettings") & typeof import("./modules/ui/functions/securitySettings") & typeof import("./modules/ui/functions/selectTexturePreset") & typeof import("./modules/ui/functions/settings") & typeof import("./modules/ui/functions/showCustomFormUI") & typeof import("./modules/ui/functions/teleportSystemsSettings") & typeof import("./modules/ui/functions/terminal") & typeof import("./modules/ui/functions/tpaSettings") & typeof import("./modules/ui/functions/uiSettings") & typeof import("./modules/ui/functions/uiSettings_main") & typeof import("./modules/ui/functions/uiSettings_menuConfigurations") & typeof import("./modules/ui/functions/uiSettings_menuConfigurations_mainMenu") & typeof import("./modules/ui/functions/uiSettings_menuConfigurations_mainMenu_mainSettings") & typeof import("./modules/ui/functions/uiSettings_menuConfigurations_playerMenu") & typeof import("./modules/ui/functions/uiSettings_menuConfigurations_playerMenu_editButtons") & typeof import("./modules/ui/functions/uiSettings_menuConfigurations_playerMenu_editButtons_addRemovedButtons") & typeof import("./modules/ui/functions/uiSettings_menuConfigurations_playerMenu_leaderboardsSettings") & typeof import("./modules/ui/functions/uiSettings_menuConfigurations_playerMenu_mainSettings") & typeof import("./modules/ui/functions/worldBorderSettings") & typeof import("./modules/ui/functions/worldBorderSettingsDimensionSelector") & typeof import("./modules/ui/types/menuButtonIdsType") & typeof import("./modules/ui/types/playerMenuLeaderboardStatistic")>;
    /**
     * This module contains classes, constants, and functions for working with the player data save system.
     * @namespace
     * @path `modules/player_save/`
     */
    playersave: Partial<typeof import("./modules/player_save/classes/savedPlayer") & typeof import("./modules/player_save/constants/player_save_format_version") & typeof import("./modules/player_save/functions/playerDataAutoSave")>;
    /**
     * This module contains constants and functions for working with the spawn protection system.
     * @namespace
     * @path `modules/spawn_protection/`
     */
    spawnprot: Partial<typeof import("./modules/spawn_protection/constants/spawn_protection_format_version") & typeof import("./modules/spawn_protection/functions/convertToCompoundBlockVolume") & typeof import("./modules/spawn_protection/functions/editAreas") & typeof import("./modules/spawn_protection/functions/editAreasForCustomCategory") & typeof import("./modules/spawn_protection/functions/editAreasMainMenu") & typeof import("./modules/spawn_protection/functions/editCustomAreaCategory") & typeof import("./modules/spawn_protection/functions/editCustomAreas") & typeof import("./modules/spawn_protection/functions/getAreas") & typeof import("./modules/spawn_protection/functions/getType") & typeof import("./modules/spawn_protection/functions/manageCustomAreaCategories") & typeof import("./modules/spawn_protection/functions/newCustomAreaCategory") & typeof import("./modules/spawn_protection/functions/protectedAreaIntervals") & typeof import("./modules/spawn_protection/functions/protectedAreasRefresher") & typeof import("./modules/spawn_protection/functions/spawnProtectionTypeList") & typeof import("./modules/spawn_protection/functions/testIsWithinRanges")>;
    /**
     * The `@minecraft/math` module.
     * @see {@link https://www.npmjs.com/package/@minecraft/math}
     * @namespace
     */
    mcMath: typeof mcMath;
    /**
     * The `color-core` module.
     * @see {@link https://www.npmjs.com/package/color-core}
     * @namespace
     */
    colorCore: typeof import("color-core");
    /**
     * The Color class of the `color-core` module.
     * @see {@link modules.colorCore.Color}
     */
    Color: typeof import("color-core").Color;
    /**
     * The `decimal.js` module.
     * @see {@link https://www.npmjs.com/package/decimal.js}
     * @namespace
     */
    Decimal: typeof import("decimal.js").default;
    /**
     * The `semver` module.
     * @see {@link https://www.npmjs.com/package/semver}
     * @namespace
     */
    semver: typeof import("semver");
    /**
     * The `mcbe-ipc` module.
     * @see {@link https://www.npmjs.com/package/mcbe-ipc}
     * @namespace
     */
    ipc: typeof ipc;
    /**
     * The `moment` module.
     * @see {@link https://momentjs.com/}
     * @see {@link https://www.npmjs.com/package/moment}
     * @namespace
     */
    moment: typeof import("moment");
    /**
     * The `@minecraft/server` module.
     * @see {@link https://www.npmjs.com/package/@minecraft/server}
     */
    "@minecraft/server": typeof mcServer;
    /**
     * The `@minecraft/server-ui` module.
     * @see {@link https://www.npmjs.com/package/@minecraft/server-ui}
     */
    "@minecraft/server-ui": typeof mcServerUi;
    /**
     * The `@minecraft/server-gametest` module.
     * @see {@link https://www.npmjs.com/package/@minecraft/server-gametest}
     */
    "@minecraft/server-gametest": typeof GameTest;
    /**
     * The `@minecraft/common` module.
     * @see {@link https://www.npmjs.com/package/@minecraft/common}
     */
    /**
     * The `@minecraft/server-admin` module.
     * @see {@link https://www.npmjs.com/package/@minecraft/server-admin}
     */
    /**
     * The `@minecraft/server-net` module.
     * @see {@link https://www.npmjs.com/package/@minecraft/server-net}
     */
    /**
     * The `@minecraft/debug-utilities` module.
     * @see {@link https://www.npmjs.com/package/@minecraft/debug-utilities}
     */
    /**
     * The `@minecraft/vanilla-data` module.
     * @see {@link https://www.npmjs.com/package/@minecraft/vanilla-data}
     */
    /**
     * The `@minecraft/math` module.
     * @see {@link https://www.npmjs.com/package/@minecraft/math}
     * @namespace
     */
    "@minecraft/math": typeof mcMath;
    /**
     * This module contains constants and functions for working with chat.
     * @namespace
     * @path `modules/chat/`
     */
    chat: Partial<typeof import("./modules/chat/constants/currentlyRequestedChatInput") & typeof import("./modules/chat/constants/patternColors") & typeof import("./modules/chat/constants/patternColorsMap") & typeof import("./modules/chat/constants/patternFunctionList") & typeof import("./modules/chat/constants/patternList") & typeof import("./modules/chat/constants/rankEvaluatorModes") & typeof import("./modules/chat/constants/rankModes") & typeof import("./modules/chat/constants/rankModesArray") & typeof import("./modules/chat/constants/rankModesArrayB") & typeof import("./modules/chat/functions/chatMessage") & typeof import("./modules/chat/functions/chatSend") & typeof import("./modules/chat/functions/chatSendMessageEvaluator") & typeof import("./modules/chat/functions/evaluateChatColorType") & typeof import("./modules/chat/functions/rankNameTagEvaluator") & typeof import("./modules/chat/functions/requestChatInput") & typeof import("./modules/chat/functions/requestConditionalChatInput")>;
    /**
     * This module contains utility constants, enums, and functions for working with commands.
     * @namespace
     * @path `modules/command_utilities/`
     */
    cmdutils: Partial<typeof import("./modules/command_utilities/constants/EquipmentSlots") & typeof import("./modules/command_utilities/constants/IllegalItemTypes") & typeof import("./modules/command_utilities/constants/JunkItemTypes") & typeof import("./modules/command_utilities/constants/OpItemTypes") & typeof import("./modules/command_utilities/constants/OtherEquipmentSlots") & typeof import("./modules/command_utilities/enums/ItemJSONParseInput") & typeof import("./modules/command_utilities/enums/componentTypeEnum") & typeof import("./modules/command_utilities/enums/durabilityComponentTypeEnum") & typeof import("./modules/command_utilities/enums/enchantableComponentTypeEnum") & typeof import("./modules/command_utilities/enums/fillmodetypeenum") & typeof import("./modules/command_utilities/enums/propertyTypeEnum") & typeof import("./modules/command_utilities/functions/blockToContainerSlotArray") & typeof import("./modules/command_utilities/functions/blockToContainerSlotListObject") & typeof import("./modules/command_utilities/functions/blockToItemStackArray") & typeof import("./modules/command_utilities/functions/clearContainer") & typeof import("./modules/command_utilities/functions/containerToContainerSlotArray") & typeof import("./modules/command_utilities/functions/containerToItemStackArray") & typeof import("./modules/command_utilities/functions/entityToContainerSlotArray") & typeof import("./modules/command_utilities/functions/entityToContainerSlotArrayB") & typeof import("./modules/command_utilities/functions/entityToContainerSlotListObject") & typeof import("./modules/command_utilities/functions/entityToItemStackArray") & typeof import("./modules/command_utilities/functions/equippableToContainerSlotArray") & typeof import("./modules/command_utilities/functions/equippableToItemStackArray") & typeof import("./modules/command_utilities/functions/fillContainer") & typeof import("./modules/command_utilities/functions/getEntityHeldItemSlot") & typeof import("./modules/command_utilities/functions/getEquipment") & typeof import("./modules/command_utilities/functions/getInventory") & typeof import("./modules/command_utilities/functions/getPlayerHeldItemSlot") & typeof import("./modules/command_utilities/functions/getPlayerselectedSlotIndex") & typeof import("./modules/command_utilities/functions/getSlotFromParsedSlot") & typeof import("./modules/command_utilities/functions/inventorySwap") & typeof import("./modules/command_utilities/functions/inventorySwapB") & typeof import("./modules/command_utilities/functions/inventorySwapC") & typeof import("./modules/command_utilities/functions/itemJSONPropertiesEval") & typeof import("./modules/command_utilities/functions/itemJSONPropertiesEvalCT") & typeof import("./modules/command_utilities/functions/parseSlot") & typeof import("./modules/command_utilities/functions/rangeToIntArray") & typeof import("./modules/command_utilities/functions/targetSelector") & typeof import("./modules/command_utilities/functions/targetSelectorAllListB") & typeof import("./modules/command_utilities/functions/targetSelectorAllListC") & typeof import("./modules/command_utilities/functions/targetSelectorAllListD") & typeof import("./modules/command_utilities/functions/targetSelectorAllListE") & typeof import("./modules/command_utilities/functions/targetSelectorB")>;
    /**
     * This module contains the list of commands.
     * @namespace
     * @path `modules/commands_list/`
     */
    cmdslist: Partial<typeof import("./modules/commands_list/constants/commands")>;
    /**
     * This module contains documentation for commands.
     * @namespace
     * @path `modules/commands_documentation/`
     */
    cmdsdocs: Partial<typeof import("./modules/commands_documentation/constants/commandflags") & typeof import("./modules/commands_documentation/constants/commandsyntaxes") & typeof import("./modules/commands_documentation/constants/helpCommandChatCommandsList") & typeof import("./modules/commands_documentation/constants/helpUpcomingCommandChatCommandsList") & typeof import("./modules/commands_documentation/enums/commanddescriptions") & typeof import("./modules/commands_documentation/functions/CMDHelpMB") & typeof import("./modules/commands_documentation/functions/getCommandHelpPage") & typeof import("./modules/commands_documentation/functions/getCommandHelpPageCustomDebug") & typeof import("./modules/commands_documentation/functions/getCommandHelpPageDebug") & typeof import("./modules/commands_documentation/functions/getCommandHelpPageDebugPlus") & typeof import("./modules/commands_documentation/functions/getCommandHelpPageExtra") & typeof import("./modules/commands_documentation/functions/listCommandsWithMissingDocumentation")>;
    /**
     * This module contains utility classes, functions, and types.
     * @namespace
     * @path `modules/utilities/`
     */
    utils: Partial<typeof import("./modules/utilities/classes/Base52") & typeof import("./modules/utilities/classes/CharacterSetConverter") & typeof import("./modules/utilities/functions/HSLToRGB") & typeof import("./modules/utilities/functions/RGBToHSL") & typeof import("./modules/utilities/functions/arrayModifier") & typeof import("./modules/utilities/functions/arrayModifierOld") & typeof import("./modules/utilities/functions/arrayify") & typeof import("./modules/utilities/functions/checkStackOverflowDepth") & typeof import("./modules/utilities/functions/combineObjects") & typeof import("./modules/utilities/functions/customModulo") & typeof import("./modules/utilities/functions/deleteStringFromDynamicProperties") & typeof import("./modules/utilities/functions/deleteStringFromEntityDynamicProperties") & typeof import("./modules/utilities/functions/escapeRegExp") & typeof import("./modules/utilities/functions/extractJSONStrings") & typeof import("./modules/utilities/functions/extractPlayerFromLooseEntityType") & typeof import("./modules/utilities/functions/filterProperties") & typeof import("./modules/utilities/functions/fixedPositionNumberObject") & typeof import("./modules/utilities/functions/formatBytes") & typeof import("./modules/utilities/functions/fromBaseToBase") & typeof import("./modules/utilities/functions/generateAIID") & typeof import("./modules/utilities/functions/generateCUID") & typeof import("./modules/utilities/functions/generateTUID") & typeof import("./modules/utilities/functions/generateTerrain") & typeof import("./modules/utilities/functions/getAIIDClasses") & typeof import("./modules/utilities/functions/getArrayElementProperty") & typeof import("./modules/utilities/functions/getCUIDClasses") & typeof import("./modules/utilities/functions/getDetailedType") & typeof import("./modules/utilities/functions/getParametersFromExtractedJSON") & typeof import("./modules/utilities/functions/getParametersFromString") & typeof import("./modules/utilities/functions/getStringFromDynamicProperties") & typeof import("./modules/utilities/functions/getStringFromEntityDynamicProperties") & typeof import("./modules/utilities/functions/getSuperUniqueID") & typeof import("./modules/utilities/functions/getSuperUniqueID2") & typeof import("./modules/utilities/functions/jsonFromString") & typeof import("./modules/utilities/functions/mazeGenerator") & typeof import("./modules/utilities/functions/mcRGBAToColorCoreRGB") & typeof import("./modules/utilities/functions/mcRGBToColorCoreRGB") & typeof import("./modules/utilities/functions/numberFormatter") & typeof import("./modules/utilities/functions/objectify") & typeof import("./modules/utilities/functions/parseDuration") & typeof import("./modules/utilities/functions/regenerateBlocks") & typeof import("./modules/utilities/functions/regenerateBlocksBasic") & typeof import("./modules/utilities/functions/roundPlaceNumberObject") & typeof import("./modules/utilities/functions/saveStringToDynamicProperties") & typeof import("./modules/utilities/functions/saveStringToEntityDynamicProperties") & typeof import("./modules/utilities/functions/shootEntity") & typeof import("./modules/utilities/functions/shootEntityB") & typeof import("./modules/utilities/functions/shootProjectile") & typeof import("./modules/utilities/functions/shootProjectileB") & typeof import("./modules/utilities/functions/showActions") & typeof import("./modules/utilities/functions/showMessage") & typeof import("./modules/utilities/functions/shuffle") & typeof import("./modules/utilities/functions/splitTextByMaxProperyLength") & typeof import("./modules/utilities/functions/splitUpStringData") & typeof import("./modules/utilities/functions/stringify") & typeof import("./modules/utilities/functions/toBase") & typeof import("./modules/utilities/types/loosePlayerType")>;
    /**
     * This module contains error classes.
     * @namespace
     * @path `modules/errors/`
     */
    errors: Partial<typeof import("./modules/errors/classes/ExpireError") & typeof import("./modules/errors/classes/NoSelectorMatchesError") & typeof import("./modules/errors/classes/ParseError") & typeof import("./modules/errors/classes/SemVerError") & typeof import("./modules/errors/classes/SemVerParseError") & typeof import("./modules/errors/classes/SemVerPhaseError") & typeof import("./modules/errors/classes/StorageFullError") & typeof import("./modules/errors/classes/TimeoutError") & typeof import("./modules/errors")>;
    /**
     * This module contains functions and types for working with the shop system.
     * @namespace
     * @path `ExtraFeatures/shop_main`
     */
    shopmain: typeof shopmain;
    /**
     * This module contains classes, functions, and types for working with the server shop system.
     * @namespace
     * @path `ExtraFeatures/server_shop`
     */
    servershop: typeof servershop;
    /**
     * This module contains classes, functions, and types for working with the player shop system.
     * @namespace
     * @path `ExtraFeatures/player_shop`
     */
    playershop: typeof playershop;
    /**
     * This module contains classes for working with the money system.
     * @namespace
     * @path `ExtraFeatures/money`
     */
    moneysystem: typeof moneysystem;
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
            JSONB: JSONB;
        };
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
            charMaps: typeof import("Assets/constants/charMaps");
            /**
             * This module contians mappings for structures for the `\enchantmentbarrels` command.
             * @namespace
             * @path `Assets/constants/structure_mappings`
             */
            structuremappings: typeof structuremappings;
            /**
             * This module contains constants and types for texture presets.
             * @namespace
             * @path `Assets/constants/texturePresets`
             */
            texturePresets: typeof import("Assets/constants/texturePresets");
            /**
             * This module contains mappings for recipes for the `\gettransformsmithingtemplate` command.
             * @namespace
             * @path `Assets/constants/transformrecipes`
             */
            transformrecipes: typeof transformrecipes;
        };
    };
};
declare global {
    namespace globalThis {
        /**
         * This namespace contains all the modules.
         * @namespace
         * @global
         */
        var modules: typeof modulesMap;
    }
}
export type * as "@minecraft/server" from "@minecraft/server";
export type * as "@minecraft/server-ui" from "@minecraft/server-ui";
/**
 * {@inheritDoc !mcServer}
 * test
 */
export type * as "@minecraft/server-gametest" from "@minecraft/server-gametest";
/**
 * aszxzxas
 * @kindOverride Module
 * @external
 */
export type * as "@minecraft/math" from "@minecraft/math";
export import A = a;
