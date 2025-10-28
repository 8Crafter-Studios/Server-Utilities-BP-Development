// Type definitions for Minecraft Bedrock Edition script APIs
// Project: https://github.com/DarkGamerYT/bedrock-metadata
// Definitions by: xKingDark <https://github.com/DarkGamerYT>
import * as minecraftcommon from "@minecraft/common";
import * as minecraftserver from "@minecraft/server";
/**
 * @beta
 * @packageDocumentation
 * Manifest Details
 * ```json
 * {
 *     "module_name": "@minecraft/server-editor-bindings",
 *     "version": "0.1.0-beta"
 * }
 * ```
 */
var "@minecraft/server-editor-bindings";
(function ("@minecraft/server-editor-bindings") {
    let AudioSettingsProperty;
    (function (AudioSettingsProperty) {
        AudioSettingsProperty["AreSoundsMuted"] = "AreSoundsMuted";
        AudioSettingsProperty["IsMusicMuted"] = "IsMusicMuted";
    })(AudioSettingsProperty = "@minecraft/server-editor-bindings".AudioSettingsProperty || ("@minecraft/server-editor-bindings".AudioSettingsProperty = {}));
    let Axis;
    (function (Axis) {
        Axis[Axis["None"] = 0] = "None";
        Axis[Axis["X"] = 1] = "X";
        Axis[Axis["Y"] = 2] = "Y";
        Axis[Axis["Z"] = 4] = "Z";
    })(Axis = "@minecraft/server-editor-bindings".Axis || ("@minecraft/server-editor-bindings".Axis = {}));
    let BlockMaskListType;
    (function (BlockMaskListType) {
        BlockMaskListType["Disabled"] = "Disabled";
        BlockMaskListType["Mask"] = "Mask";
        BlockMaskListType["Replace"] = "Replace";
    })(BlockMaskListType = "@minecraft/server-editor-bindings".BlockMaskListType || ("@minecraft/server-editor-bindings".BlockMaskListType = {}));
    let BlockPaletteItemType;
    (function (BlockPaletteItemType) {
        BlockPaletteItemType[BlockPaletteItemType["Simple"] = 0] = "Simple";
        BlockPaletteItemType[BlockPaletteItemType["Probability"] = 1] = "Probability";
    })(BlockPaletteItemType = "@minecraft/server-editor-bindings".BlockPaletteItemType || ("@minecraft/server-editor-bindings".BlockPaletteItemType = {}));
    let BrushDirectionalPlacementMode;
    (function (BrushDirectionalPlacementMode) {
        BrushDirectionalPlacementMode[BrushDirectionalPlacementMode["IgnoreCamera"] = 0] = "IgnoreCamera";
        BrushDirectionalPlacementMode[BrushDirectionalPlacementMode["NormalCamera"] = 1] = "NormalCamera";
        BrushDirectionalPlacementMode[BrushDirectionalPlacementMode["OppositeCamera"] = 2] = "OppositeCamera";
        BrushDirectionalPlacementMode[BrushDirectionalPlacementMode["CameraLeft"] = 3] = "CameraLeft";
        BrushDirectionalPlacementMode[BrushDirectionalPlacementMode["CameraRight"] = 4] = "CameraRight";
        BrushDirectionalPlacementMode[BrushDirectionalPlacementMode["CameraFromAbove"] = 5] = "CameraFromAbove";
        BrushDirectionalPlacementMode[BrushDirectionalPlacementMode["CameraFromBelow"] = 6] = "CameraFromBelow";
        BrushDirectionalPlacementMode[BrushDirectionalPlacementMode["FrontFacePosX"] = 7] = "FrontFacePosX";
        BrushDirectionalPlacementMode[BrushDirectionalPlacementMode["FrontFaceNegX"] = 8] = "FrontFaceNegX";
        BrushDirectionalPlacementMode[BrushDirectionalPlacementMode["FrontFacePosZ"] = 9] = "FrontFacePosZ";
        BrushDirectionalPlacementMode[BrushDirectionalPlacementMode["FrontFaceNegZ"] = 10] = "FrontFaceNegZ";
        BrushDirectionalPlacementMode[BrushDirectionalPlacementMode["FrontFacePosY"] = 11] = "FrontFacePosY";
        BrushDirectionalPlacementMode[BrushDirectionalPlacementMode["FrontFaceNegY"] = 12] = "FrontFaceNegY";
        BrushDirectionalPlacementMode[BrushDirectionalPlacementMode["Random2Axes"] = 13] = "Random2Axes";
        BrushDirectionalPlacementMode[BrushDirectionalPlacementMode["Random3Axes"] = 14] = "Random3Axes";
    })(BrushDirectionalPlacementMode = "@minecraft/server-editor-bindings".BrushDirectionalPlacementMode || ("@minecraft/server-editor-bindings".BrushDirectionalPlacementMode = {}));
    let ContiguousSelectionType;
    (function (ContiguousSelectionType) {
        ContiguousSelectionType[ContiguousSelectionType["SameBlock"] = 0] = "SameBlock";
        ContiguousSelectionType[ContiguousSelectionType["SameBlockAndStates"] = 1] = "SameBlockAndStates";
        ContiguousSelectionType[ContiguousSelectionType["SolidBlocks"] = 2] = "SolidBlocks";
        ContiguousSelectionType[ContiguousSelectionType["AllBlocks"] = 3] = "AllBlocks";
        ContiguousSelectionType[ContiguousSelectionType["Custom"] = 4] = "Custom";
    })(ContiguousSelectionType = "@minecraft/server-editor-bindings".ContiguousSelectionType || ("@minecraft/server-editor-bindings".ContiguousSelectionType = {}));
    let CursorControlMode;
    (function (CursorControlMode) {
        CursorControlMode[CursorControlMode["Keyboard"] = 0] = "Keyboard";
        CursorControlMode[CursorControlMode["Mouse"] = 1] = "Mouse";
        CursorControlMode[CursorControlMode["KeyboardAndMouse"] = 2] = "KeyboardAndMouse";
        CursorControlMode[CursorControlMode["Fixed"] = 3] = "Fixed";
    })(CursorControlMode = "@minecraft/server-editor-bindings".CursorControlMode || ("@minecraft/server-editor-bindings".CursorControlMode = {}));
    let CursorTargetMode;
    (function (CursorTargetMode) {
        CursorTargetMode[CursorTargetMode["Block"] = 0] = "Block";
        CursorTargetMode[CursorTargetMode["Face"] = 1] = "Face";
    })(CursorTargetMode = "@minecraft/server-editor-bindings".CursorTargetMode || ("@minecraft/server-editor-bindings".CursorTargetMode = {}));
    let DaylightCycle;
    (function (DaylightCycle) {
        DaylightCycle[DaylightCycle["Normal"] = 0] = "Normal";
        DaylightCycle[DaylightCycle["AlwaysDay"] = 1] = "AlwaysDay";
        DaylightCycle[DaylightCycle["LockTime"] = 2] = "LockTime";
    })(DaylightCycle = "@minecraft/server-editor-bindings".DaylightCycle || ("@minecraft/server-editor-bindings".DaylightCycle = {}));
    let EditorMode;
    (function (EditorMode) {
        EditorMode["Crosshair"] = "Crosshair";
        EditorMode["Tool"] = "Tool";
    })(EditorMode = "@minecraft/server-editor-bindings".EditorMode || ("@minecraft/server-editor-bindings".EditorMode = {}));
    let EntityOperationType;
    (function (EntityOperationType) {
        EntityOperationType[EntityOperationType["Create"] = 0] = "Create";
        EntityOperationType[EntityOperationType["Delete"] = 1] = "Delete";
    })(EntityOperationType = "@minecraft/server-editor-bindings".EntityOperationType || ("@minecraft/server-editor-bindings".EntityOperationType = {}));
    let ExportResult;
    (function (ExportResult) {
        ExportResult[ExportResult["ValidWorldExport"] = 0] = "ValidWorldExport";
        ExportResult[ExportResult["LevelFetchFailed"] = 1] = "LevelFetchFailed";
        ExportResult[ExportResult["FileArchiverFetchFailed"] = 2] = "FileArchiverFetchFailed";
        ExportResult[ExportResult["ProjectConverterFetchFailed"] = 3] = "ProjectConverterFetchFailed";
        ExportResult[ExportResult["PlayerNotFound"] = 4] = "PlayerNotFound";
        ExportResult[ExportResult["WorldExportFailed"] = 5] = "WorldExportFailed";
        ExportResult[ExportResult["WorldExportBusy"] = 6] = "WorldExportBusy";
        ExportResult[ExportResult["EditorSystemFailure"] = 7] = "EditorSystemFailure";
    })(ExportResult = "@minecraft/server-editor-bindings".ExportResult || ("@minecraft/server-editor-bindings".ExportResult = {}));
    let FlattenMode;
    (function (FlattenMode) {
        FlattenMode[FlattenMode["Both"] = 0] = "Both";
        FlattenMode[FlattenMode["Down"] = 1] = "Down";
        FlattenMode[FlattenMode["Up"] = 2] = "Up";
    })(FlattenMode = "@minecraft/server-editor-bindings".FlattenMode || ("@minecraft/server-editor-bindings".FlattenMode = {}));
    let GamePublishSetting;
    (function (GamePublishSetting) {
        GamePublishSetting[GamePublishSetting["NoMultiPlay"] = 0] = "NoMultiPlay";
        GamePublishSetting[GamePublishSetting["InviteOnly"] = 1] = "InviteOnly";
        GamePublishSetting[GamePublishSetting["FriendsOnly"] = 2] = "FriendsOnly";
        GamePublishSetting[GamePublishSetting["FriendsOfFriends"] = 3] = "FriendsOfFriends";
        GamePublishSetting[GamePublishSetting["Public"] = 4] = "Public";
    })(GamePublishSetting = "@minecraft/server-editor-bindings".GamePublishSetting || ("@minecraft/server-editor-bindings".GamePublishSetting = {}));
    let GraphicsSettingsProperty;
    (function (GraphicsSettingsProperty) {
        GraphicsSettingsProperty["DisableBlockEntityRendering"] = "DisableBlockEntityRendering";
        GraphicsSettingsProperty["DisableEntityRendering"] = "DisableEntityRendering";
        GraphicsSettingsProperty["DisableParticleRendering"] = "DisableParticleRendering";
        GraphicsSettingsProperty["DisableTerrainRendering"] = "DisableTerrainRendering";
        GraphicsSettingsProperty["DisableWeatherRendering"] = "DisableWeatherRendering";
        GraphicsSettingsProperty["GraphicsMode"] = "GraphicsMode";
        GraphicsSettingsProperty["NightVision"] = "NightVision";
        GraphicsSettingsProperty["ShowChunkBoundaries"] = "ShowChunkBoundaries";
        GraphicsSettingsProperty["ShowCompass"] = "ShowCompass";
        GraphicsSettingsProperty["ShowInvisibleBlocks"] = "ShowInvisibleBlocks";
        GraphicsSettingsProperty["ShowToastNotifications"] = "ShowToastNotifications";
    })(GraphicsSettingsProperty = "@minecraft/server-editor-bindings".GraphicsSettingsProperty || ("@minecraft/server-editor-bindings".GraphicsSettingsProperty = {}));
    let InputModifier;
    (function (InputModifier) {
        InputModifier[InputModifier["Unused"] = 0] = "Unused";
        InputModifier[InputModifier["None"] = 1] = "None";
        InputModifier[InputModifier["Alt"] = 2] = "Alt";
        InputModifier[InputModifier["Control"] = 4] = "Control";
        InputModifier[InputModifier["Shift"] = 8] = "Shift";
        InputModifier[InputModifier["Any"] = 15] = "Any";
    })(InputModifier = "@minecraft/server-editor-bindings".InputModifier || ("@minecraft/server-editor-bindings".InputModifier = {}));
    let LogChannel;
    (function (LogChannel) {
        LogChannel[LogChannel["Message"] = 1] = "Message";
        LogChannel[LogChannel["Toast"] = 2] = "Toast";
        LogChannel[LogChannel["All"] = 3] = "All";
    })(LogChannel = "@minecraft/server-editor-bindings".LogChannel || ("@minecraft/server-editor-bindings".LogChannel = {}));
    let MouseActionCategory;
    (function (MouseActionCategory) {
        MouseActionCategory[MouseActionCategory["Button"] = 1] = "Button";
        MouseActionCategory[MouseActionCategory["Wheel"] = 2] = "Wheel";
        MouseActionCategory[MouseActionCategory["Drag"] = 3] = "Drag";
    })(MouseActionCategory = "@minecraft/server-editor-bindings".MouseActionCategory || ("@minecraft/server-editor-bindings".MouseActionCategory = {}));
    let PaintCompletionState;
    (function (PaintCompletionState) {
        PaintCompletionState[PaintCompletionState["Success"] = 0] = "Success";
        PaintCompletionState[PaintCompletionState["Canceled"] = 1] = "Canceled";
        PaintCompletionState[PaintCompletionState["Failed"] = 2] = "Failed";
    })(PaintCompletionState = "@minecraft/server-editor-bindings".PaintCompletionState || ("@minecraft/server-editor-bindings".PaintCompletionState = {}));
    let PaintMode;
    (function (PaintMode) {
        PaintMode[PaintMode["BlockPaint"] = 0] = "BlockPaint";
        PaintMode[PaintMode["FreehandSelect"] = 1] = "FreehandSelect";
        PaintMode[PaintMode["Smooth"] = 2] = "Smooth";
        PaintMode[PaintMode["Roughen"] = 3] = "Roughen";
        PaintMode[PaintMode["Flatten"] = 4] = "Flatten";
    })(PaintMode = "@minecraft/server-editor-bindings".PaintMode || ("@minecraft/server-editor-bindings".PaintMode = {}));
    let Plane;
    (function (Plane) {
        Plane[Plane["None"] = 0] = "None";
        Plane[Plane["XY"] = 1] = "XY";
        Plane[Plane["XZ"] = 2] = "XZ";
        Plane[Plane["YZ"] = 4] = "YZ";
    })(Plane = "@minecraft/server-editor-bindings".Plane || ("@minecraft/server-editor-bindings".Plane = {}));
    let PlaytestSessionResult;
    (function (PlaytestSessionResult) {
        PlaytestSessionResult[PlaytestSessionResult["OK"] = 0] = "OK";
        PlaytestSessionResult[PlaytestSessionResult["InvalidSessionHandle"] = 1] = "InvalidSessionHandle";
        PlaytestSessionResult[PlaytestSessionResult["SessionInfoNotFound"] = 2] = "SessionInfoNotFound";
        PlaytestSessionResult[PlaytestSessionResult["TooManyPlayers"] = 3] = "TooManyPlayers";
        PlaytestSessionResult[PlaytestSessionResult["WorldExportFailed"] = 4] = "WorldExportFailed";
        PlaytestSessionResult[PlaytestSessionResult["WorldExportBusy"] = 5] = "WorldExportBusy";
        PlaytestSessionResult[PlaytestSessionResult["UnsupportedScenario"] = 6] = "UnsupportedScenario";
        PlaytestSessionResult[PlaytestSessionResult["EditorSystemFailure"] = 7] = "EditorSystemFailure";
        PlaytestSessionResult[PlaytestSessionResult["InvalidLevelId"] = 8] = "InvalidLevelId";
        PlaytestSessionResult[PlaytestSessionResult["PlayerNotFound"] = 9] = "PlayerNotFound";
        PlaytestSessionResult[PlaytestSessionResult["ResponseTimeout"] = 10] = "ResponseTimeout";
        PlaytestSessionResult[PlaytestSessionResult["UnspecifiedError"] = 11] = "UnspecifiedError";
    })(PlaytestSessionResult = "@minecraft/server-editor-bindings".PlaytestSessionResult || ("@minecraft/server-editor-bindings".PlaytestSessionResult = {}));
    let PrimitiveType;
    (function (PrimitiveType) {
        PrimitiveType[PrimitiveType["Text"] = 0] = "Text";
        PrimitiveType[PrimitiveType["Box"] = 1] = "Box";
        PrimitiveType[PrimitiveType["Line"] = 2] = "Line";
        PrimitiveType[PrimitiveType["Disc"] = 4] = "Disc";
        PrimitiveType[PrimitiveType["AxialSphere"] = 5] = "AxialSphere";
    })(PrimitiveType = "@minecraft/server-editor-bindings".PrimitiveType || ("@minecraft/server-editor-bindings".PrimitiveType = {}));
    let ProjectExportType;
    (function (ProjectExportType) {
        ProjectExportType[ProjectExportType["PlayableWorld"] = 0] = "PlayableWorld";
        ProjectExportType[ProjectExportType["ProjectBackup"] = 1] = "ProjectBackup";
        ProjectExportType[ProjectExportType["WorldTemplate"] = 2] = "WorldTemplate";
    })(ProjectExportType = "@minecraft/server-editor-bindings".ProjectExportType || ("@minecraft/server-editor-bindings".ProjectExportType = {}));
    let SelectionVolumeEventType;
    (function (SelectionVolumeEventType) {
        SelectionVolumeEventType[SelectionVolumeEventType["Set"] = 1] = "Set";
        SelectionVolumeEventType[SelectionVolumeEventType["Add"] = 2] = "Add";
        SelectionVolumeEventType[SelectionVolumeEventType["Remove"] = 3] = "Remove";
        SelectionVolumeEventType[SelectionVolumeEventType["Translate"] = 4] = "Translate";
        SelectionVolumeEventType[SelectionVolumeEventType["Move"] = 5] = "Move";
        SelectionVolumeEventType[SelectionVolumeEventType["Clear"] = 6] = "Clear";
    })(SelectionVolumeEventType = "@minecraft/server-editor-bindings".SelectionVolumeEventType || ("@minecraft/server-editor-bindings".SelectionVolumeEventType = {}));
    let SpeedSettingsProperty;
    (function (SpeedSettingsProperty) {
        SpeedSettingsProperty["FlySpeedMultiplier"] = "FlySpeedMultiplier";
    })(SpeedSettingsProperty = "@minecraft/server-editor-bindings".SpeedSettingsProperty || ("@minecraft/server-editor-bindings".SpeedSettingsProperty = {}));
    let SplineType;
    (function (SplineType) {
        SplineType[SplineType["Line"] = 0] = "Line";
        SplineType[SplineType["Hermite"] = 1] = "Hermite";
    })(SplineType = "@minecraft/server-editor-bindings".SplineType || ("@minecraft/server-editor-bindings".SplineType = {}));
    let StructureSource;
    (function (StructureSource) {
        StructureSource[StructureSource["BehaviorPack"] = 0] = "BehaviorPack";
        StructureSource[StructureSource["EditorProject"] = 1] = "EditorProject";
        StructureSource[StructureSource["File"] = 2] = "File";
        StructureSource[StructureSource["Level"] = 3] = "Level";
    })(StructureSource = "@minecraft/server-editor-bindings".StructureSource || ("@minecraft/server-editor-bindings".StructureSource = {}));
    let ThemeSettingsColorKey;
    (function (ThemeSettingsColorKey) {
        ThemeSettingsColorKey["Caret"] = "Caret";
        ThemeSettingsColorKey["Confirm1"] = "Confirm1";
        ThemeSettingsColorKey["Confirm2"] = "Confirm2";
        ThemeSettingsColorKey["Confirm3"] = "Confirm3";
        ThemeSettingsColorKey["ConfirmFill"] = "ConfirmFill";
        ThemeSettingsColorKey["ControlsGeneralFill"] = "ControlsGeneralFill";
        ThemeSettingsColorKey["ControlsGeneralHighlight"] = "ControlsGeneralHighlight";
        ThemeSettingsColorKey["Coordinate1"] = "Coordinate1";
        ThemeSettingsColorKey["Coordinate2"] = "Coordinate2";
        ThemeSettingsColorKey["Coordinate3"] = "Coordinate3";
        ThemeSettingsColorKey["CoordinateControlX"] = "CoordinateControlX";
        ThemeSettingsColorKey["CoordinateControlY"] = "CoordinateControlY";
        ThemeSettingsColorKey["CoordinateControlZ"] = "CoordinateControlZ";
        ThemeSettingsColorKey["CursorVolumeBorder"] = "CursorVolumeBorder";
        ThemeSettingsColorKey["CursorVolumeFill"] = "CursorVolumeFill";
        ThemeSettingsColorKey["Destroy1"] = "Destroy1";
        ThemeSettingsColorKey["Destroy2"] = "Destroy2";
        ThemeSettingsColorKey["Destroy3"] = "Destroy3";
        ThemeSettingsColorKey["DestroyFill"] = "DestroyFill";
        ThemeSettingsColorKey["DisableBackground"] = "DisableBackground";
        ThemeSettingsColorKey["DisableFill"] = "DisableFill";
        ThemeSettingsColorKey["DisableOutline"] = "DisableOutline";
        ThemeSettingsColorKey["DisableText"] = "DisableText";
        ThemeSettingsColorKey["DropDown1"] = "DropDown1";
        ThemeSettingsColorKey["DropDown2"] = "DropDown2";
        ThemeSettingsColorKey["DropDown3"] = "DropDown3";
        ThemeSettingsColorKey["ElementBorder"] = "ElementBorder";
        ThemeSettingsColorKey["Error"] = "Error";
        ThemeSettingsColorKey["FocusErrorOutline"] = "FocusErrorOutline";
        ThemeSettingsColorKey["FocusOutline"] = "FocusOutline";
        ThemeSettingsColorKey["HeaderBackground"] = "HeaderBackground";
        ThemeSettingsColorKey["HotbarOutline"] = "HotbarOutline";
        ThemeSettingsColorKey["Info1"] = "Info1";
        ThemeSettingsColorKey["Info2"] = "Info2";
        ThemeSettingsColorKey["Info3"] = "Info3";
        ThemeSettingsColorKey["InfoFill"] = "InfoFill";
        ThemeSettingsColorKey["PanelBackground"] = "PanelBackground";
        ThemeSettingsColorKey["PanelBorder"] = "PanelBorder";
        ThemeSettingsColorKey["PlacementVolumeBorder"] = "PlacementVolumeBorder";
        ThemeSettingsColorKey["PlacementVolumeFill"] = "PlacementVolumeFill";
        ThemeSettingsColorKey["PrefillVolumeBorder"] = "PrefillVolumeBorder";
        ThemeSettingsColorKey["PrefillVolumeFill"] = "PrefillVolumeFill";
        ThemeSettingsColorKey["PrimaryActive"] = "PrimaryActive";
        ThemeSettingsColorKey["PrimaryBackground1"] = "PrimaryBackground1";
        ThemeSettingsColorKey["PrimaryBackground2"] = "PrimaryBackground2";
        ThemeSettingsColorKey["PrimaryBackground3"] = "PrimaryBackground3";
        ThemeSettingsColorKey["PrimaryBackground4"] = "PrimaryBackground4";
        ThemeSettingsColorKey["PrimaryDefault"] = "PrimaryDefault";
        ThemeSettingsColorKey["PrimaryDisable"] = "PrimaryDisable";
        ThemeSettingsColorKey["PrimaryMute"] = "PrimaryMute";
        ThemeSettingsColorKey["ScrollBar"] = "ScrollBar";
        ThemeSettingsColorKey["SecondaryActive"] = "SecondaryActive";
        ThemeSettingsColorKey["SecondaryBackground1"] = "SecondaryBackground1";
        ThemeSettingsColorKey["SecondaryBackground2"] = "SecondaryBackground2";
        ThemeSettingsColorKey["SecondaryBackground3"] = "SecondaryBackground3";
        ThemeSettingsColorKey["SecondaryDefault"] = "SecondaryDefault";
        ThemeSettingsColorKey["SecondaryDisable"] = "SecondaryDisable";
        ThemeSettingsColorKey["SecondaryMute"] = "SecondaryMute";
        ThemeSettingsColorKey["SelectionVolumeBorder"] = "SelectionVolumeBorder";
        ThemeSettingsColorKey["SelectionVolumeFill"] = "SelectionVolumeFill";
        ThemeSettingsColorKey["SelectionVolumeOutlineBorder"] = "SelectionVolumeOutlineBorder";
        ThemeSettingsColorKey["SelectionVolumeOutlineFill"] = "SelectionVolumeOutlineFill";
        ThemeSettingsColorKey["TitleBarBackground"] = "TitleBarBackground";
        ThemeSettingsColorKey["ViewportOutline"] = "ViewportOutline";
        ThemeSettingsColorKey["Warning"] = "Warning";
    })(ThemeSettingsColorKey = "@minecraft/server-editor-bindings".ThemeSettingsColorKey || ("@minecraft/server-editor-bindings".ThemeSettingsColorKey = {}));
    let WidgetCollisionType;
    (function (WidgetCollisionType) {
        WidgetCollisionType[WidgetCollisionType["None"] = 0] = "None";
        WidgetCollisionType[WidgetCollisionType["Radius"] = 1] = "Radius";
        WidgetCollisionType[WidgetCollisionType["Bounds"] = 2] = "Bounds";
    })(WidgetCollisionType = "@minecraft/server-editor-bindings".WidgetCollisionType || ("@minecraft/server-editor-bindings".WidgetCollisionType = {}));
    let WidgetComponentType;
    (function (WidgetComponentType) {
        WidgetComponentType["BoundingBox"] = "BoundingBox";
        WidgetComponentType["Clipboard"] = "Clipboard";
        WidgetComponentType["Entity"] = "Entity";
        WidgetComponentType["Gizmo"] = "Gizmo";
        WidgetComponentType["Grid"] = "Grid";
        WidgetComponentType["Guide"] = "Guide";
        WidgetComponentType["RenderPrim"] = "RenderPrim";
        WidgetComponentType["Spline"] = "Spline";
        WidgetComponentType["Text"] = "Text";
        WidgetComponentType["VolumeOutline"] = "VolumeOutline";
    })(WidgetComponentType = "@minecraft/server-editor-bindings".WidgetComponentType || ("@minecraft/server-editor-bindings".WidgetComponentType = {}));
    let WidgetGizmoEventType;
    (function (WidgetGizmoEventType) {
        WidgetGizmoEventType["CornerGrabbed"] = "CornerGrabbed";
        WidgetGizmoEventType["CornerMoved"] = "CornerMoved";
        WidgetGizmoEventType["CornerReleased"] = "CornerReleased";
        WidgetGizmoEventType["OriginActivated"] = "OriginActivated";
        WidgetGizmoEventType["OriginDeactivated"] = "OriginDeactivated";
        WidgetGizmoEventType["OriginGrabbed"] = "OriginGrabbed";
        WidgetGizmoEventType["OriginMoved"] = "OriginMoved";
        WidgetGizmoEventType["OriginReleased"] = "OriginReleased";
    })(WidgetGizmoEventType = "@minecraft/server-editor-bindings".WidgetGizmoEventType || ("@minecraft/server-editor-bindings".WidgetGizmoEventType = {}));
    let WidgetGroupSelectionMode;
    (function (WidgetGroupSelectionMode) {
        WidgetGroupSelectionMode["Multiple"] = "Multiple";
        WidgetGroupSelectionMode["None"] = "None";
        WidgetGroupSelectionMode["Single"] = "Single";
    })(WidgetGroupSelectionMode = "@minecraft/server-editor-bindings".WidgetGroupSelectionMode || ("@minecraft/server-editor-bindings".WidgetGroupSelectionMode = {}));
    let WidgetMouseButtonActionType;
    (function (WidgetMouseButtonActionType) {
        WidgetMouseButtonActionType[WidgetMouseButtonActionType["Pressed"] = 0] = "Pressed";
        WidgetMouseButtonActionType[WidgetMouseButtonActionType["Released"] = 1] = "Released";
        WidgetMouseButtonActionType[WidgetMouseButtonActionType["Drag"] = 2] = "Drag";
    })(WidgetMouseButtonActionType = "@minecraft/server-editor-bindings".WidgetMouseButtonActionType || ("@minecraft/server-editor-bindings".WidgetMouseButtonActionType = {}));
    let WorldGeneratorType;
    (function (WorldGeneratorType) {
        WorldGeneratorType["Flat"] = "Flat";
        WorldGeneratorType["Nether"] = "Nether";
        WorldGeneratorType["Overworld"] = "Overworld";
        WorldGeneratorType["TheEnd"] = "TheEnd";
        WorldGeneratorType["Void"] = "Void";
    })(WorldGeneratorType = "@minecraft/server-editor-bindings".WorldGeneratorType || ("@minecraft/server-editor-bindings".WorldGeneratorType = {}));
    class AudioSettings {
    }
    "@minecraft/server-editor-bindings".AudioSettings = AudioSettings;
    class BlockPalette {
    }
    "@minecraft/server-editor-bindings".BlockPalette = BlockPalette;
    class BlockPaletteManager {
    }
    "@minecraft/server-editor-bindings".BlockPaletteManager = BlockPaletteManager;
    class BlockPaletteSelectedItemChangeAfterEvent {
        selectedPaletteItem;
    }
    "@minecraft/server-editor-bindings".BlockPaletteSelectedItemChangeAfterEvent = BlockPaletteSelectedItemChangeAfterEvent;
    class BlockPaletteSelectedItemChangeAfterEventSignal {
    }
    "@minecraft/server-editor-bindings".BlockPaletteSelectedItemChangeAfterEventSignal = BlockPaletteSelectedItemChangeAfterEventSignal;
    class BlockUtilities {
    }
    "@minecraft/server-editor-bindings".BlockUtilities = BlockUtilities;
    class BrushShapeManager {
        activeBrushVolume;
    }
    "@minecraft/server-editor-bindings".BrushShapeManager = BrushShapeManager;
    class ClipboardChangeAfterEvent {
        isPrimary;
        itemId;
    }
    "@minecraft/server-editor-bindings".ClipboardChangeAfterEvent = ClipboardChangeAfterEvent;
    class ClipboardChangeAfterEventSignal {
    }
    "@minecraft/server-editor-bindings".ClipboardChangeAfterEventSignal = ClipboardChangeAfterEventSignal;
    class ClipboardItem {
        id;
        isEmpty;
        normalizedOrigin;
        originalWorldLocation;
        size;
    }
    "@minecraft/server-editor-bindings".ClipboardItem = ClipboardItem;
    class ClipboardManager {
        /**
         * @throws This property can throw errors.
         */
        clipboard;
    }
    "@minecraft/server-editor-bindings".ClipboardManager = ClipboardManager;
    class CurrentThemeChangeAfterEvent {
        id;
    }
    "@minecraft/server-editor-bindings".CurrentThemeChangeAfterEvent = CurrentThemeChangeAfterEvent;
    class CurrentThemeChangeAfterEventSignal {
    }
    "@minecraft/server-editor-bindings".CurrentThemeChangeAfterEventSignal = CurrentThemeChangeAfterEventSignal;
    class CurrentThemeColorChangeAfterEvent {
        color;
        colorKey;
    }
    "@minecraft/server-editor-bindings".CurrentThemeColorChangeAfterEvent = CurrentThemeColorChangeAfterEvent;
    class CurrentThemeColorChangeAfterEventSignal {
    }
    "@minecraft/server-editor-bindings".CurrentThemeColorChangeAfterEventSignal = CurrentThemeColorChangeAfterEventSignal;
    class Cursor {
        /**
         * @throws This property can throw errors.
         */
        faceDirection;
        /**
         * @throws This property can throw errors.
         */
        isVisible;
    }
    "@minecraft/server-editor-bindings".Cursor = Cursor;
    class CursorPropertiesChangeAfterEvent {
        position;
        properties;
    }
    "@minecraft/server-editor-bindings".CursorPropertiesChangeAfterEvent = CursorPropertiesChangeAfterEvent;
    class CursorPropertyChangeAfterEventSignal {
    }
    "@minecraft/server-editor-bindings".CursorPropertyChangeAfterEventSignal = CursorPropertyChangeAfterEventSignal;
    class EditorConstants {
        maxSelectionSize;
        maxStructureOffset;
        minStructureOffset;
    }
    "@minecraft/server-editor-bindings".EditorConstants = EditorConstants;
    class EditorStructure {
        /**
         * @throws This property can throw errors.
         *
         * {@link minecraftserverbindings.InvalidStructureError}
         */
        description;
        /**
         * @throws This property can throw errors.
         *
         * {@link minecraftserverbindings.InvalidStructureError}
         */
        displayName;
        id;
        isValid;
        /**
         * @throws This property can throw errors.
         *
         * {@link minecraftserverbindings.InvalidStructureError}
         */
        normalizedOrigin;
        /**
         * @throws This property can throw errors.
         *
         * {@link minecraftserverbindings.InvalidStructureError}
         */
        notes;
        /**
         * @throws This property can throw errors.
         *
         * {@link minecraftserverbindings.InvalidStructureError}
         */
        offset;
        /**
         * @throws This property can throw errors.
         *
         * {@link minecraftserverbindings.InvalidStructureError}
         */
        originalWorldLocation;
        /**
         * @throws This property can throw errors.
         *
         * {@link minecraftserverbindings.InvalidStructureError}
         */
        size;
        /**
         * @throws This property can throw errors.
         *
         * {@link minecraftserverbindings.InvalidStructureError}
         */
        structureFullName;
        /**
         * @throws This property can throw errors.
         *
         * {@link minecraftserverbindings.InvalidStructureError}
         */
        structureName;
        /**
         * @throws This property can throw errors.
         *
         * {@link minecraftserverbindings.InvalidStructureError}
         */
        structureNamespace;
    }
    "@minecraft/server-editor-bindings".EditorStructure = EditorStructure;
    class EditorStructureManager {
    }
    "@minecraft/server-editor-bindings".EditorStructureManager = EditorStructureManager;
    class ExportManager {
    }
    "@minecraft/server-editor-bindings".ExportManager = ExportManager;
    class Extension {
        defaultToolGroupId;
        description;
        name;
        notes;
    }
    "@minecraft/server-editor-bindings".Extension = Extension;
    class ExtensionContext {
        afterEvents;
        blockPalette;
        blockUtilities;
        brushShapeManager;
        clipboardManager;
        cursor;
        exportManager;
        extensionInfo;
        player;
        playtest;
        selectionManager;
        settings;
        structureManager;
        transactionManager;
        widgetManager;
    }
    "@minecraft/server-editor-bindings".ExtensionContext = ExtensionContext;
    class ExtensionContextAfterEvents {
        /**
         * @remarks This property can be read in early-execution mode.
         */
        blockPaletteSelectedItemChange;
        /**
         * @remarks This property can be read in early-execution mode.
         */
        clipboardChange;
        /**
         * @remarks This property can be read in early-execution mode.
         */
        currentThemeChange;
        /**
         * @remarks This property can be read in early-execution mode.
         */
        currentThemeColorChange;
        /**
         * @remarks This property can be read in early-execution mode.
         */
        cursorPropertyChange;
        /**
         * @remarks This property can be read in early-execution mode.
         */
        modeChange;
        /**
         * @remarks This property can be read in early-execution mode.
         */
        SelectionChange;
    }
    "@minecraft/server-editor-bindings".ExtensionContextAfterEvents = ExtensionContextAfterEvents;
    class GraphicsSettings {
    }
    "@minecraft/server-editor-bindings".GraphicsSettings = GraphicsSettings;
    class IBlockPaletteItem {
    }
    "@minecraft/server-editor-bindings".IBlockPaletteItem = IBlockPaletteItem;
    class Logger {
    }
    "@minecraft/server-editor-bindings".Logger = Logger;
    class MinecraftEditor {
        /**
         * @remarks This property can be read in early-execution mode.
         */
        afterEvents;
        constants;
        /**
         * @throws This property can throw errors.
         */
        log;
        simulation;
        worldGeneratorType;
    }
    "@minecraft/server-editor-bindings".MinecraftEditor = MinecraftEditor;
    class ModeChangeAfterEvent {
        mode;
    }
    "@minecraft/server-editor-bindings".ModeChangeAfterEvent = ModeChangeAfterEvent;
    class ModeChangeAfterEventSignal {
    }
    "@minecraft/server-editor-bindings".ModeChangeAfterEventSignal = ModeChangeAfterEventSignal;
    class PlaytestManager {
    }
    "@minecraft/server-editor-bindings".PlaytestManager = PlaytestManager;
    // @ts-ignore
    class ProbabilityBlockPaletteItem extends IBlockPaletteItem {
    }
    "@minecraft/server-editor-bindings".ProbabilityBlockPaletteItem = ProbabilityBlockPaletteItem;
    class ProjectAfterEvents {
        /**
         * @remarks This property can be read in early-execution mode.
         */
        simulationStateChange;
    }
    "@minecraft/server-editor-bindings".ProjectAfterEvents = ProjectAfterEvents;
    // @ts-ignore
    class RelativeVolumeListBlockVolume extends minecraftserverbindings.BlockVolumeBase {
        isEmpty;
        /**
         * @remarks This property can't be edited in read-only mode.
         */
        origin;
        volumeCount;
    }
    "@minecraft/server-editor-bindings".RelativeVolumeListBlockVolume = RelativeVolumeListBlockVolume;
    class SelectionChangeAfterEventSignal {
    }
    "@minecraft/server-editor-bindings".SelectionChangeAfterEventSignal = SelectionChangeAfterEventSignal;
    class SelectionContainerBase {
    }
    "@minecraft/server-editor-bindings".SelectionContainerBase = SelectionContainerBase;
    // @ts-ignore
    class SelectionContainerEntity extends SelectionContainerBase {
    }
    "@minecraft/server-editor-bindings".SelectionContainerEntity = SelectionContainerEntity;
    // @ts-ignore
    class SelectionContainerVolume extends SelectionContainerBase {
        isEmpty;
        volumeCount;
    }
    "@minecraft/server-editor-bindings".SelectionContainerVolume = SelectionContainerVolume;
    class SelectionContainerVolumeEvent {
        "type";
    }
    "@minecraft/server-editor-bindings".SelectionContainerVolumeEvent = SelectionContainerVolumeEvent;
    class SelectionEventAfterEvent {
        volumeEventData;
    }
    "@minecraft/server-editor-bindings".SelectionEventAfterEvent = SelectionEventAfterEvent;
    class SelectionManager {
        entity;
        volume;
    }
    "@minecraft/server-editor-bindings".SelectionManager = SelectionManager;
    class SettingsManager {
        audio;
        graphics;
        speed;
        theme;
    }
    "@minecraft/server-editor-bindings".SettingsManager = SettingsManager;
    // @ts-ignore
    class SimpleBlockPaletteItem extends IBlockPaletteItem {
    }
    "@minecraft/server-editor-bindings".SimpleBlockPaletteItem = SimpleBlockPaletteItem;
    class SimulationState {
    }
    "@minecraft/server-editor-bindings".SimulationState = SimulationState;
    class SimulationStateAfterEvent {
        paused;
    }
    "@minecraft/server-editor-bindings".SimulationStateAfterEvent = SimulationStateAfterEvent;
    class SimulationStateChangeAfterEventSignal {
    }
    "@minecraft/server-editor-bindings".SimulationStateChangeAfterEventSignal = SimulationStateChangeAfterEventSignal;
    class SpeedSettings {
    }
    "@minecraft/server-editor-bindings".SpeedSettings = SpeedSettings;
    class ThemeSettings {
    }
    "@minecraft/server-editor-bindings".ThemeSettings = ThemeSettings;
    class TransactionManager {
    }
    "@minecraft/server-editor-bindings".TransactionManager = TransactionManager;
    class UserDefinedTransactionHandlerId {
    }
    "@minecraft/server-editor-bindings".UserDefinedTransactionHandlerId = UserDefinedTransactionHandlerId;
    class Widget {
        /**
         * @remarks This property can't be edited in read-only mode.
         */
        bindPositionToBlockCursor;
        /**
         * @remarks This property can't be edited in read-only mode.
         */
        collisionOffset;
        /**
         * @remarks This property can't be edited in read-only mode.
         */
        collisionRadius;
        /**
         * @remarks This property can't be edited in read-only mode.
         */
        collisionType;
        /**
         * @throws This property can throw errors.
         *
         * {@link InvalidWidgetError}
         */
        group;
        /**
         * @remarks This property can't be edited in read-only mode.
         */
        location;
        /**
         * @remarks This property can't be edited in read-only mode.
         */
        lockPositionToSurface;
        /**
         * @throws This property can throw errors.
         *
         * {@link InvalidWidgetError}
         */
        selectable;
        selected;
        showBoundingBox;
        showCollisionRadius;
        /**
         * @remarks This property can't be edited in read-only mode.
         */
        snapToBlockLocation;
        visible;
        widgetName;
    }
    "@minecraft/server-editor-bindings".Widget = Widget;
    class WidgetComponentBase {
        /**
         * @throws This property can throw errors.
         *
         * {@link InvalidWidgetComponentError}
         */
        componentType;
        /**
         * @throws This property can throw errors.
         *
         * {@link InvalidWidgetComponentError}
         */
        location;
        /**
         * @remarks This property can't be edited in read-only mode.
         */
        lockToSurface;
        /**
         * @throws This property can throw errors.
         *
         * {@link InvalidWidgetComponentError}
         */
        name;
        /**
         * @remarks This property can't be edited in read-only mode.
         */
        offset;
        valid;
        visible;
        /**
         * @throws This property can throw errors.
         *
         * {@link InvalidWidgetComponentError}
         */
        widget;
    }
    "@minecraft/server-editor-bindings".WidgetComponentBase = WidgetComponentBase;
    // @ts-ignore
    class WidgetComponentBoundingBox extends WidgetComponentBase {
        /**
         * @remarks This property can't be edited in read-only mode.
         */
        boundsOffset;
        /**
         * @remarks This property can't be edited in read-only mode.
         */
        enableResizeHandles;
        /**
         * @remarks This property can't be edited in read-only mode.
         */
        hullColor;
        /**
         * @remarks This property can't be edited in read-only mode.
         */
        mirror;
        /**
         * @remarks This property can't be edited in read-only mode.
         */
        normalizedOrigin;
        /**
         * @remarks This property can't be edited in read-only mode.
         */
        outlineColor;
        /**
         * @remarks This property can't be edited in read-only mode.
         */
        rotation;
        /**
         * @remarks This property can't be edited in read-only mode.
         */
        showWorldIntersections;
        /**
         * @remarks This property can't be edited in read-only mode.
         */
        size;
        /**
         * @throws This property can throw errors.
         *
         * {@link InvalidWidgetComponentError}
         */
        transformedWorldVolume;
        /**
         * @remarks This property can't be edited in read-only mode.
         */
        visibleHull;
    }
    "@minecraft/server-editor-bindings".WidgetComponentBoundingBox = WidgetComponentBoundingBox;
    class WidgetComponentBoundingBoxStateChangeEventParameters {
        boundsOffset;
        boundsSize;
        component;
        eventType;
        widget;
    }
    "@minecraft/server-editor-bindings".WidgetComponentBoundingBoxStateChangeEventParameters = WidgetComponentBoundingBoxStateChangeEventParameters;
    // @ts-ignore
    class WidgetComponentClipboard extends WidgetComponentBase {
        /**
         * @remarks This property can't be edited in read-only mode.
         */
        clipboardOffset;
        highlightHullColor;
        highlightOutlineColor;
        hullColor;
        mirror;
        normalizedOrigin;
        outlineColor;
        rotation;
        showOutline;
    }
    "@minecraft/server-editor-bindings".WidgetComponentClipboard = WidgetComponentClipboard;
    // @ts-ignore
    class WidgetComponentEntity extends WidgetComponentBase {
        /**
         * @remarks This property can't be edited in read-only mode.
         */
        clickable;
    }
    "@minecraft/server-editor-bindings".WidgetComponentEntity = WidgetComponentEntity;
    // @ts-ignore
    class WidgetComponentGizmo extends WidgetComponentBase {
        activated;
        /**
         * @remarks This property can't be edited in read-only mode.
         */
        enabledAxes;
        /**
         * @remarks This property can't be edited in read-only mode.
         */
        normalizedOffsetOverride;
    }
    "@minecraft/server-editor-bindings".WidgetComponentGizmo = WidgetComponentGizmo;
    class WidgetComponentGizmoStateChangeEventParameters {
        component;
        eventType;
        widget;
    }
    "@minecraft/server-editor-bindings".WidgetComponentGizmoStateChangeEventParameters = WidgetComponentGizmoStateChangeEventParameters;
    // @ts-ignore
    class WidgetComponentGrid extends WidgetComponentBase {
        /**
         * @remarks This property can't be edited in read-only mode.
         */
        gridColor;
        /**
         * @remarks This property can't be edited in read-only mode.
         */
        gridCount;
        /**
         * @remarks This property can't be edited in read-only mode.
         */
        gridSize;
        /**
         * @remarks This property can't be edited in read-only mode.
         */
        plane;
    }
    "@minecraft/server-editor-bindings".WidgetComponentGrid = WidgetComponentGrid;
    // @ts-ignore
    class WidgetComponentGuide extends WidgetComponentBase {
    }
    "@minecraft/server-editor-bindings".WidgetComponentGuide = WidgetComponentGuide;
    // @ts-ignore
    class WidgetComponentRenderPrimitive extends WidgetComponentBase {
        /**
         * @throws This property can throw errors.
         *
         * {@link InvalidWidgetComponentError}
         *
         * {@link InvalidWidgetError}
         */
        primitiveType;
    }
    "@minecraft/server-editor-bindings".WidgetComponentRenderPrimitive = WidgetComponentRenderPrimitive;
    // @ts-ignore
    class WidgetComponentRenderPrimitiveTypeAxialSphere extends WidgetComponentRenderPrimitiveTypeBase {
        /**
         * @remarks This property can't be edited in read-only mode.
         */
        center;
        /**
         * @remarks This property can't be edited in read-only mode.
         */
        color;
        /**
         * @remarks This property can't be edited in read-only mode.
         */
        radius;
    }
    "@minecraft/server-editor-bindings".WidgetComponentRenderPrimitiveTypeAxialSphere = WidgetComponentRenderPrimitiveTypeAxialSphere;
    class WidgetComponentRenderPrimitiveTypeBase {
        primitiveType;
        /**
         * @remarks This property can't be edited in read-only mode.
         */
        renderPriority;
    }
    "@minecraft/server-editor-bindings".WidgetComponentRenderPrimitiveTypeBase = WidgetComponentRenderPrimitiveTypeBase;
    // @ts-ignore
    class WidgetComponentRenderPrimitiveTypeBox extends WidgetComponentRenderPrimitiveTypeBase {
        /**
         * @remarks This property can't be edited in read-only mode.
         */
        center;
        /**
         * @remarks This property can't be edited in read-only mode.
         */
        color;
        /**
         * @remarks This property can't be edited in read-only mode.
         */
        size;
    }
    "@minecraft/server-editor-bindings".WidgetComponentRenderPrimitiveTypeBox = WidgetComponentRenderPrimitiveTypeBox;
    // @ts-ignore
    class WidgetComponentRenderPrimitiveTypeDisc extends WidgetComponentRenderPrimitiveTypeBase {
        /**
         * @remarks This property can't be edited in read-only mode.
         */
        center;
        /**
         * @remarks This property can't be edited in read-only mode.
         */
        color;
        /**
         * @remarks This property can't be edited in read-only mode.
         */
        radius;
    }
    "@minecraft/server-editor-bindings".WidgetComponentRenderPrimitiveTypeDisc = WidgetComponentRenderPrimitiveTypeDisc;
    // @ts-ignore
    class WidgetComponentRenderPrimitiveTypeLine extends WidgetComponentRenderPrimitiveTypeBase {
        /**
         * @remarks This property can't be edited in read-only mode.
         */
        color;
        /**
         * @remarks This property can't be edited in read-only mode.
         */
        end;
        /**
         * @remarks This property can't be edited in read-only mode.
         */
        start;
    }
    "@minecraft/server-editor-bindings".WidgetComponentRenderPrimitiveTypeLine = WidgetComponentRenderPrimitiveTypeLine;
    // @ts-ignore
    class WidgetComponentSpline extends WidgetComponentBase {
        /**
         * @remarks This property can't be edited in read-only mode.
         */
        splineType;
    }
    "@minecraft/server-editor-bindings".WidgetComponentSpline = WidgetComponentSpline;
    // @ts-ignore
    class WidgetComponentText extends WidgetComponentBase {
        /**
         * @remarks This property can't be edited in read-only mode.
         */
        color;
        /**
         * @remarks This property can't be edited in read-only mode.
         */
        label;
    }
    "@minecraft/server-editor-bindings".WidgetComponentText = WidgetComponentText;
    // @ts-ignore
    class WidgetComponentVolumeOutline extends WidgetComponentBase {
        /**
         * @remarks This property can't be edited in read-only mode.
         */
        highlightHullColor;
        /**
         * @remarks This property can't be edited in read-only mode.
         */
        highlightOutlineColor;
        /**
         * @remarks This property can't be edited in read-only mode.
         */
        hullColor;
        /**
         * @remarks This property can't be edited in read-only mode.
         */
        mirror;
        /**
         * @remarks This property can't be edited in read-only mode.
         */
        normalizedOrigin;
        /**
         * @remarks This property can't be edited in read-only mode.
         */
        outlineColor;
        /**
         * @remarks This property can't be edited in read-only mode.
         */
        rotation;
        /**
         * @remarks This property can't be edited in read-only mode.
         */
        showHighlightOutline;
        /**
         * @remarks This property can't be edited in read-only mode.
         */
        showOutline;
        /**
         * @throws This property can throw errors.
         *
         * {@link InvalidWidgetComponentError}
         */
        transformedWorldVolume;
        /**
         * @remarks This property can't be edited in read-only mode.
         */
        volumeOffset;
    }
    "@minecraft/server-editor-bindings".WidgetComponentVolumeOutline = WidgetComponentVolumeOutline;
    class WidgetGroup {
        /**
         * @throws This property can throw errors.
         *
         * {@link InvalidWidgetGroupError}
         */
        selectedWidgetCount;
        /**
         * @remarks This property can't be edited in read-only mode.
         */
        visible;
        /**
         * @remarks This property can't be edited in read-only mode.
         */
        visibleBounds;
    }
    "@minecraft/server-editor-bindings".WidgetGroup = WidgetGroup;
    class WidgetManager {
    }
    "@minecraft/server-editor-bindings".WidgetManager = WidgetManager;
    class WidgetMouseButtonEventData {
        action;
        altPressed;
        controlPressed;
        shiftPressed;
    }
    "@minecraft/server-editor-bindings".WidgetMouseButtonEventData = WidgetMouseButtonEventData;
    class WidgetStateChangeEventData {
        group;
        location;
        mouseEvent;
        selected;
        visible;
        widget;
    }
    "@minecraft/server-editor-bindings".WidgetStateChangeEventData = WidgetStateChangeEventData;
    // @ts-ignore
    class InvalidWidgetComponentError extends Error {
    }
    "@minecraft/server-editor-bindings".InvalidWidgetComponentError = InvalidWidgetComponentError;
    // @ts-ignore
    class InvalidWidgetError extends Error {
    }
    "@minecraft/server-editor-bindings".InvalidWidgetError = InvalidWidgetError;
    // @ts-ignore
    class InvalidWidgetGroupError extends Error {
    }
    "@minecraft/server-editor-bindings".InvalidWidgetGroupError = InvalidWidgetGroupError;
})("@minecraft/server-editor-bindings" || ("@minecraft/server-editor-bindings" = {}));
//# sourceMappingURL=server-editor-bindings@0.1.0-beta.js.map