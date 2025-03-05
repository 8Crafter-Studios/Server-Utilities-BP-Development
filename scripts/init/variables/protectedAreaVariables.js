import { Dimension, EntityTypes, ExplosionBeforeEvent, ItemTypes, ItemUseBeforeEvent, ItemUseOnBeforeEvent, PlayerBreakBlockBeforeEvent, PlayerGameModeChangeBeforeEvent, PlayerInteractWithBlockBeforeEvent, PlayerInteractWithEntityBeforeEvent, PlayerPlaceBlockBeforeEvent, } from "@minecraft/server";
import { BlockMask } from "modules/commands/classes/BlockMask";
import { testIsWithinRanges } from "modules/spawn_protection/functions/testIsWithinRanges";
export class protectedAreaVariables {
    static noPistonExtensionAreas;
    static noExplosionAreas;
    static noBlockInteractAreas;
    static noInteractAreas;
    static protectedAreas;
    static noBlockBreakAreas;
    static noBlockPlaceAreas;
    static advancedAreas;
    static advancedAreaTypes;
}
function makeMutableType(obj) {
    return obj;
}
export const AdvancedProtectedAreaCategoryPropertyAllEnabledDefaults = makeMutableType({
    enabled: true,
    id: "",
    icon_path: undefined,
    chatSend: {
        enabled: true,
        allowedBypassTags: [],
        heldItemFilters: {
            mode: "exclude",
            items: [],
        },
    },
    effectAdd: {
        enabled: true,
        sourceEntityFilter: {
            includeTypes: [],
            excludeTypes: [],
            includeTags: [],
            excludeTags: [],
        },
        effectFilter: {
            includeTypes: [],
            excludeTypes: [],
            minDuration: undefined,
            maxDuration: undefined,
        },
    },
    explosion: {
        enabled: true,
        allowedBypassTags: [],
        heldItemFilters: {
            mode: "exclude",
            items: [],
        },
        mask: new BlockMask([], "exclude"),
        rawmask: "none",
        mode: "exclude",
        sourceEntityFilter: {
            includeTypes: [],
            excludeTypes: [],
            includeTags: [],
            excludeTags: [],
        },
    },
    playerBreakBlock: {
        enabled: true,
        allowedBypassTags: [],
        heldItemFilters: {
            mode: "exclude",
            items: [],
        },
        mask: new BlockMask([], "exclude"),
        rawmask: "none",
        mode: "exclude",
    },
    playerInteractWithBlock: {
        enabled: true,
        allowedBypassTags: [],
        heldItemFilters: {
            mode: "exclude",
            items: [],
        },
        mask: new BlockMask([], "exclude"),
        rawmask: "none",
        mode: "exclude",
    },
    playerPlaceBlock: {
        enabled: true,
        allowedBypassTags: [],
        heldItemFilters: {
            mode: "exclude",
            items: [],
        },
        mask: new BlockMask([], "exclude"),
        rawmask: "none",
        mode: "exclude",
    },
    playerGameModeChange: {
        enabled: true,
        allowedBypassTags: [],
        heldItemFilters: {
            mode: "exclude",
            items: [],
        },
    },
});
export const AdvancedProtectedAreaCategoryPropertyAllEnabledDefaults_JSON = makeMutableType({
    enabled: true,
    id: "",
    icon_path: undefined,
    chatSend: {
        enabled: true,
        allowedBypassTags: [],
        heldItemFilters: {
            mode: "exclude",
            items: [],
        },
    },
    effectAdd: {
        enabled: true,
        sourceEntityFilter: {
            includeTypes: [],
            excludeTypes: [],
            includeTags: [],
            excludeTags: [],
        },
        effectFilter: {
            includeTypes: [],
            excludeTypes: [],
            minDuration: undefined,
            maxDuration: undefined,
        },
    },
    explosion: {
        enabled: true,
        allowedBypassTags: [],
        heldItemFilters: {
            mode: "exclude",
            items: [],
        },
        mask: "none",
        rawmask: undefined,
        mode: "exclude",
        sourceEntityFilter: {
            includeTypes: [],
            excludeTypes: [],
            includeTags: [],
            excludeTags: [],
        },
    },
    playerBreakBlock: {
        enabled: true,
        allowedBypassTags: [],
        heldItemFilters: {
            mode: "exclude",
            items: [],
        },
        mask: "none",
        rawmask: undefined,
        mode: "exclude",
    },
    playerInteractWithBlock: {
        enabled: true,
        allowedBypassTags: [],
        heldItemFilters: {
            mode: "exclude",
            items: [],
        },
        mask: "none",
        rawmask: undefined,
        mode: "exclude",
    },
    playerPlaceBlock: {
        enabled: true,
        allowedBypassTags: [],
        heldItemFilters: {
            mode: "exclude",
            items: [],
        },
        mask: "none",
        rawmask: undefined,
        mode: "exclude",
    },
    playerGameModeChange: {
        enabled: true,
        allowedBypassTags: [],
        heldItemFilters: {
            mode: "exclude",
            items: [],
        },
    },
});
export function convertAdvancedPropertedAreaCategoryToJSON(category) {
    const out = JSON.parse(JSON.stringify(category));
    if (!!out.playerBreakBlock) {
        out.playerBreakBlock.mask = out.playerBreakBlock.rawmask;
        delete out.playerBreakBlock.rawmask;
    }
    if (!!out.playerPlaceBlock) {
        out.playerPlaceBlock.mask = out.playerPlaceBlock.rawmask;
        delete out.playerPlaceBlock.rawmask;
    }
    if (!!out.playerInteractWithBlock) {
        out.playerInteractWithBlock.mask = out.playerInteractWithBlock.rawmask;
        delete out.playerInteractWithBlock.rawmask;
    }
    if (!!out.explosion) {
        out.explosion.mask = out.explosion.rawmask;
        delete out.explosion.rawmask;
    }
    return out;
}
export const protectedAreaCategories = [
    "noPistonExtensionArea",
    "noExplosionArea",
    "noBlockInteractArea",
    "noInteractArea",
    "protectedArea",
    "noBlockBreakArea",
    "noBlockPlaceArea",
];
export class ProtectedAreas {
    static areas = {
        noPistonExtensionArea: {
            overworld: [],
            nether: [],
            the_end: [],
        },
        noExplosionArea: {
            overworld: [],
            nether: [],
            the_end: [],
        },
        noBlockInteractArea: {
            overworld: [],
            nether: [],
            the_end: [],
        },
        noInteractArea: {
            overworld: [],
            nether: [],
            the_end: [],
        },
        protectedArea: {
            overworld: [],
            nether: [],
            the_end: [],
        },
        noBlockBreakArea: {
            overworld: [],
            nether: [],
            the_end: [],
        },
        noBlockPlaceArea: {
            overworld: [],
            nether: [],
            the_end: [],
        },
        advancedArea: {},
        advancedAreaCategories: [],
    };
    static load() {
        protectedAreaCategories.forEach((category) => {
            this.loadAreasForBuiltInCategory(category);
        });
        this.getAdvancedCategoryIDs().forEach((category) => {
            this.loadAdvancedCategory(category.slice(30));
            this.loadAreasForAdvancedCategory(category.slice(30));
        });
    }
    static loadAreasForAllBuiltInCategories() {
        protectedAreaCategories.forEach((category) => {
            this.loadAreasForBuiltInCategory(category);
        });
    }
    static loadAllAdvancedCategoriesAndTheirAreas() {
        this.getAdvancedCategoryIDs().forEach((category) => {
            this.loadAdvancedCategory(category.slice(30));
            this.loadAreasForAdvancedCategory(category.slice(30));
        });
    }
    static loadAreasForAllLoadedAdvancedCategories() {
        this.areas.advancedAreaCategories.forEach((category) => this.loadAreasForAdvancedCategory(category.id));
    }
    static loadAreasForBuiltInCategory(category) {
        let a = world.getDynamicPropertyIds().filter((dpi) => dpi.startsWith(category + ":"));
        a.forEach((aelement) => {
            tryrun(() => {
                String(world.setDynamicProperty("v2:" + aelement, ((v) => JSON.stringify({
                    from: { x: Number(v[0]), y: Number(v[1]), z: Number(v[2]) },
                    to: { x: Number(v[3]), y: Number(v[4]), z: Number(v[5]) },
                    dimension: 0,
                    mode: Number(v[6]) == 1 ? 1 : 0,
                    icon_path: String(v[7] ?? ""),
                }))(String(world.getDynamicProperty(aelement)).split(","))));
                world.setDynamicProperty(aelement);
            });
        });
        let c = world.getDynamicPropertyIds().filter((dpi) => dpi.startsWith("v2:" + category + ":"));
        let d = c.map((v) => tryget(() => ({
            id: v.slice(category.length + 4),
            ...JSON.parse(String(world.getDynamicProperty(v))),
        })));
        d.forEach((v) => (v.mode == 1 ? undefined : v.mode == 0 ? undefined : (v.mode = 0)));
        this.areas[category] = {
            overworld: d.filter((v) => v.dimension == 0),
            nether: d.filter((v) => v.dimension == 1),
            the_end: d.filter((v) => v.dimension == 2),
        };
    }
    static loadAreasForAdvancedCategory(advancedCategoryID) {
        let a = world.getDynamicPropertyIds().filter((dpi) => dpi.startsWith("advancedProtectedArea:" + advancedCategoryID + ":"));
        let d = a.map((v) => tryget(() => ({
            id: v.slice(advancedCategoryID.length + 24),
            ...JSON.parse(String(world.getDynamicProperty(v))),
        })));
        d.forEach((v) => (v.mode == 1 ? undefined : v.mode == 0 ? undefined : (v.mode = 0)));
        this.areas.advancedArea[advancedCategoryID] = {
            overworld: d.filter((v) => v.dimension == 0),
            nether: d.filter((v) => v.dimension == 1),
            the_end: d.filter((v) => v.dimension == 2),
        };
    }
    static loadAdvancedCategory(advancedCategoryID) {
        const rawData = world.getDynamicProperty("advancedProtectedAreaCategory:" + advancedCategoryID);
        if (typeof rawData !== "string")
            return undefined;
        const data = JSON.parse(rawData);
        const outputData = data;
        Object.getOwnPropertyNames(data).forEach((key) => {
            if (key === "id" || key === "icon_path")
                return;
            const d = data[key];
            if (typeof outputData[key] === "boolean" || typeof d === "boolean" || d === undefined || !("mask" in d) || !("mask" in outputData[key]))
                return;
            outputData[key].mask = BlockMask.extract(d.mask);
            outputData[key].rawmask = d.mask;
        });
        this.areas.advancedAreaCategories = [...this.areas.advancedAreaCategories.filter((c) => c.id !== advancedCategoryID), outputData];
    }
    static getAdvancedCategoryIDs() {
        return world.getDynamicPropertyIds().filter((dpi) => dpi.startsWith("advancedProtectedAreaCategory:"));
    }
}
const preventableEventMap = {
    playerPlaceBlock: {
        builtInCategories: ["noBlockPlaceArea", "protectedArea"],
        advancedCategoryProperty: "playerPlaceBlock",
    },
    playerBreakBlock: {
        builtInCategories: ["noBlockBreakArea", "protectedArea"],
        advancedCategoryProperty: "playerBreakBlock",
    },
    playerInteractWithBlock: {
        builtInCategories: [
            "noBlockInteractArea" /* ,
            "noInteractArea" */,
        ],
        advancedCategoryProperty: "playerInteractWithBlock",
    },
    explosion: {
        builtInCategories: ["noExplosionArea", "protectedArea"],
        advancedCategoryProperty: "explosion",
    },
    playerInteractWithEntity: {
        builtInCategories: ["noInteractArea"],
        // advancedCategoryProperty: "playerInteractWithEntity",
    },
    itemUse: {
        builtInCategories: [],
        // advancedCategoryProperty: "itemUse",
    },
    itemUseOn: {
        builtInCategories: [
            "noBlockInteractArea" /* ,
            "noInteractArea" */,
        ],
        // advancedCategoryProperty: "itemUseOn",
    },
    playerGameModeChange: {
        builtInCategories: [],
        advancedCategoryProperty: "playerGameModeChange",
    },
    chatSend: {
        builtInCategories: [],
        advancedCategoryProperty: "chatSend",
    },
    effectAdd: {
        builtInCategories: [],
        advancedCategoryProperty: "effectAdd",
    },
};
export const advancedCategoryPropertyDisplayNames = {
    playerPlaceBlock: "Block Placement Prevention",
    playerBreakBlock: "Block Breaking Prevention",
    playerInteractWithBlock: "Block Interaction Prevention",
    explosion: "Explosion Prevention",
    playerInteractWithEntity: "Entity Interaction Prevention",
    itemUse: "Item Use Prevention",
    itemUseOn: "Item Use On Prevention",
    playerGameModeChange: "Game Mode Change Prevention",
    chatSend: "Player Chat Message Send Prevention",
    effectAdd: "Entity Effect Add Prevention",
};
export class ProtectedAreaTester {
    preventableEvent;
    constructor(preventaleEvent) {
        this.preventableEvent = preventaleEvent;
    }
    testIsInArea(event, location, dimension, extraData) {
        const categories = preventableEventMap[this.preventableEvent];
        return ((categories.builtInCategories.find((category) => new ProtectedAreaCategory(category).testIsInArea(location, dimension)) ??
            (categories.advancedCategoryProperty !== undefined
                ? ProtectedAreas.areas.advancedAreaCategories
                    .filter((c) => !!c[categories.advancedCategoryProperty] && (c[categories.advancedCategoryProperty].enabled ?? true))
                    .find((category) => {
                    let success = false;
                    switch (categories.advancedCategoryProperty) {
                        case "playerPlaceBlock": {
                            const prop = category.playerPlaceBlock;
                            const data = event;
                            success =
                                !prop.allowedBypassTags.some((tag) => data.player.hasTag(tag)) &&
                                    (prop.heldItemFilters !== false
                                        ? prop.heldItemFilters.mode === "include"
                                            ? prop.heldItemFilters.items.some((item) => data.player.heldItem?.typeId === (ItemTypes.get(item)?.id ?? item))
                                            : !prop.heldItemFilters.items.some((item) => data.player.heldItem?.typeId === (ItemTypes.get(item)?.id ?? item))
                                        : true) &&
                                    prop.mask.testIfMatches(data.permutationBeingPlaced, prop.mode);
                            break;
                        }
                        case "playerBreakBlock": {
                            const prop = category.playerBreakBlock;
                            const data = event;
                            success =
                                !prop.allowedBypassTags.some((tag) => data.player.hasTag(tag)) &&
                                    (prop.heldItemFilters !== false
                                        ? prop.heldItemFilters.mode === "include"
                                            ? prop.heldItemFilters.items.some((item) => data.itemStack?.typeId === (ItemTypes.get(item)?.id ?? item))
                                            : !prop.heldItemFilters.items.some((item) => data.itemStack?.typeId === (ItemTypes.get(item)?.id ?? item))
                                        : true) &&
                                    prop.mask.testIfMatches(data.block, prop.mode);
                            break;
                        }
                        case "playerInteractWithBlock": {
                            const prop = category.playerInteractWithBlock;
                            const data = event;
                            success =
                                !prop.allowedBypassTags.some((tag) => data.player.hasTag(tag)) &&
                                    (prop.heldItemFilters !== false
                                        ? prop.heldItemFilters.mode === "include"
                                            ? prop.heldItemFilters.items.some((item) => data.player.heldItem?.typeId === (ItemTypes.get(item)?.id ?? item))
                                            : !prop.heldItemFilters.items.some((item) => data.player.heldItem?.typeId === (ItemTypes.get(item)?.id ?? item))
                                        : true) &&
                                    prop.mask.testIfMatches(data.block, prop.mode);
                            break;
                        }
                        case "explosion": {
                            const prop = category.explosion;
                            const data = event;
                            success =
                                (data.source !== undefined
                                    ? !prop.allowedBypassTags.some((tag) => data.source.hasTag(tag)) &&
                                        tryget(() => prop.heldItemFilters !== false
                                            ? prop.heldItemFilters.mode === "include"
                                                ? prop.heldItemFilters.items.some((item) => data.source.heldItem?.typeId === (ItemTypes.get(item)?.id ?? item))
                                                : !prop.heldItemFilters.items.some((item) => data.source.heldItem?.typeId === (ItemTypes.get(item)?.id ?? item))
                                            : true) &&
                                        ((prop.sourceEntityFilter?.excludeTags ?? []).length === 0
                                            ? prop.sourceEntityFilter?.includeTags?.some((tag) => data.source.hasTag(tag)) ?? true
                                            : !prop.sourceEntityFilter.excludeTags.some((tag) => data.source.hasTag(tag))) &&
                                        ((prop.sourceEntityFilter?.excludeTypes ?? []).length === 0
                                            ? prop.sourceEntityFilter?.includeTypes?.some((type) => data.source.typeId === (EntityTypes.get(type)?.id ?? type)) ?? true
                                            : !prop.sourceEntityFilter.excludeTypes.some((type) => data.source.typeId === (EntityTypes.get(type)?.id ?? type)))
                                    : true) && (extraData?.block !== undefined ? prop.mask.testIfMatches(extraData.block, prop.mode) : true);
                            break;
                        }
                        case "chatSend": {
                            const prop = category.chatSend;
                            const data = event;
                            success =
                                !prop.allowedBypassTags.some((tag) => data.sender.hasTag(tag)) &&
                                    (prop.heldItemFilters !== false
                                        ? prop.heldItemFilters.mode === "include"
                                            ? prop.heldItemFilters.items.some((item) => data.sender.heldItem?.typeId === (ItemTypes.get(item)?.id ?? item))
                                            : !prop.heldItemFilters.items.some((item) => data.sender.heldItem?.typeId === (ItemTypes.get(item)?.id ?? item))
                                        : true);
                            break;
                        }
                        case "effectAdd": {
                            const prop = category.effectAdd;
                            const data = event;
                            success =
                                ((prop.sourceEntityFilter?.excludeTags ?? []).length === 0
                                    ? prop.sourceEntityFilter?.includeTags?.some((tag) => data.entity.hasTag(tag)) ?? true
                                    : !prop.sourceEntityFilter.excludeTags.some((tag) => data.entity.hasTag(tag))) &&
                                    ((prop.sourceEntityFilter?.excludeTypes ?? []).length === 0
                                        ? prop.sourceEntityFilter?.includeTypes?.some((type) => data.entity.typeId === (EntityTypes.get(type)?.id ?? type)) ?? true
                                        : !prop.sourceEntityFilter.excludeTypes.some((type) => data.entity.typeId === (EntityTypes.get(type)?.id ?? type))) &&
                                    ((prop.effectFilter?.excludeTypes ?? []).length === 0
                                        ? prop.effectFilter?.includeTypes?.some((type) => data.effectType === type) ?? true
                                        : !prop.effectFilter.excludeTypes.some((type) => data.effectType === type)) &&
                                    (!Number.isNaN(Number(prop.effectFilter?.minDuration)) ? prop.effectFilter.minDuration <= data.duration : true) &&
                                    (!Number.isNaN(Number(prop.effectFilter?.maxDuration)) ? prop.effectFilter.maxDuration >= data.duration : true);
                            break;
                        }
                        case "playerGameModeChange": {
                            const prop = category.playerGameModeChange;
                            const data = event;
                            success =
                                !prop.allowedBypassTags.some((tag) => data.player.hasTag(tag)) &&
                                    (prop.heldItemFilters !== false
                                        ? prop.heldItemFilters.mode === "include"
                                            ? prop.heldItemFilters.items.some((item) => data.player.heldItem?.typeId === (ItemTypes.get(item)?.id ?? item))
                                            : !prop.heldItemFilters.items.some((item) => data.player.heldItem?.typeId === (ItemTypes.get(item)?.id ?? item))
                                        : true) &&
                                    (((prop.fromGameModes ?? []).length !== 0 ? prop.fromGameModes?.some((mode) => data.fromGameMode === mode) : false) ||
                                        ((prop.toGameModes ?? []).length !== 0 ? prop.toGameModes?.some((mode) => data.toGameMode === mode) : false) ||
                                        ((prop.fromGameModesToGameModes ?? []).length !== 0
                                            ? prop.fromGameModesToGameModes?.some((mode) => data.fromGameMode === mode[0] && data.toGameMode === mode[1])
                                            : false) ||
                                        ((prop.fromGameModes ?? []).length === 0 &&
                                            (prop.toGameModes ?? []).length === 0 &&
                                            (prop.fromGameModesToGameModes ?? []).length === 0)
                                        ? true
                                        : false);
                            break;
                        }
                    }
                    if (!success)
                        return false;
                    return new ProtectedAreaCategory("advancedArea", category.id).testIsInArea(location, dimension);
                })
                : undefined)) !== undefined);
    }
}
export class ProtectedAreaCategory {
    category;
    advancedCategoryID;
    constructor(category, advancedCategoryID) {
        this.category = category;
        this.advancedCategoryID = advancedCategoryID;
    }
    getAreas() {
        if (this.category !== "advancedArea") {
            return ProtectedAreas.areas[this.category];
        }
        else {
            return ProtectedAreas.areas.advancedArea[this.advancedCategoryID];
        }
    }
    getAreasInDimension(dimension) {
        if (this.category !== "advancedArea") {
            return ProtectedAreas.areas[this.category][typeof dimension === "string" ? dimension : dimension.id.replace("minecraft:", "")];
        }
        else {
            return ProtectedAreas.areas.advancedArea[this.advancedCategoryID][typeof dimension === "string" ? dimension : dimension.id.replace("minecraft:", "")];
        }
    }
    loadAreas() {
        if (this.category !== "advancedArea") {
            ProtectedAreas.loadAreasForBuiltInCategory(this.category);
        }
        else {
            ProtectedAreas.loadAreasForAdvancedCategory(this.advancedCategoryID);
        }
    }
    testIsInArea(location, dimension) {
        // if(this.category === "advancedArea" && event !== undefined) return false
        const areas = this.getAreasInDimension(dimension);
        return (testIsWithinRanges(areas.filter((a) => a.mode === 0), location) &&
            !testIsWithinRanges(areas.filter((a) => a.mode === 1), location));
    }
}
ProtectedAreas.load();
protectedAreaVariables.noPistonExtensionAreas = { positive: [], negative: [] };
protectedAreaVariables.noExplosionAreas = { positive: [], negative: [] };
protectedAreaVariables.noBlockInteractAreas = { positive: [], negative: [] };
protectedAreaVariables.noInteractAreas = { positive: [], negative: [] };
protectedAreaVariables.protectedAreas = { positive: [], negative: [] };
protectedAreaVariables.noBlockBreakAreas = { positive: [], negative: [] };
protectedAreaVariables.noBlockPlaceAreas = { positive: [], negative: [] };
// ${se}srun(async()=>{globalThis.protAreas = await import("init/variables/protectedAreaVariables")})
// ${se}let t1 = Date.now(); protAreas.ProtectedAreas.load(); let t2 = Date.now(); dcsend(t2-t1)
// ${se}world.setDynamicProperty("advancedProtectedAreaCategory:test1", JSON.stringify({id: "test1", playerPlaceBlock: {mode: "include", mask: "grass,stone", allowedBypassTags: [], heldItemFilters: {mode: "exclude", items: ["diamond_pickaxe"]}}, playerBreakBlock: {mode: "include", mask: "grass,stone", allowedBypassTags: [], heldItemFilters: {mode: "exclude", items: ["diamond_pickaxe"]}}, playerInteractWithBlock: {mode: "include", mask: "oak_trapdoor,spruce_trapdoor", allowedBypassTags: ["test1AdvancedProtectedAreaCategoryAntiTrapdoorBypass"], heldItemFilters: {mode: "exclude", items: ["diamond_pickaxe"]}}, explosion: false, playerGameModeChange: {allowedBypassTags: [], heldItemFilters: {mode: "exclude", items: ["diamond_pickaxe"]}}, chatSend: false, effectAdd: false}))
// ${se}world.setDynamicProperty("advancedProtectedArea:test1:test1a", JSON.stringify({id: "test1a", dimension: 0, from: {x: 242, y: 81, z: 427}, to: {x: 167, y: 63, z: 367}, mode: 0}))
// ${se}dcsend(protAreas.ProtectedAreas.areas.advancedAreaCategories[0].playerPlaceBlock.mask.blocks, 4)
// ${se}dcsend(protAreas.ProtectedAreas.areas, 4)
//# sourceMappingURL=protectedAreaVariables.js.map