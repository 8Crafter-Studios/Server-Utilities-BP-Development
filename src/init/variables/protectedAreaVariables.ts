import type { ChatSendBeforeEvent, EffectAddBeforeEvent } from "@minecraft/server";
import { Dimension, ExplosionBeforeEvent, ItemUseBeforeEvent, ItemUseOnBeforeEvent, PlayerBreakBlockBeforeEvent, PlayerGameModeChangeBeforeEvent, PlayerInteractWithBlockBeforeEvent, PlayerInteractWithEntityBeforeEvent, PlayerPlaceBlockBeforeEvent, type Vector3 } from "@minecraft/server";
import { BlockMask } from "modules/commands/classes/BlockMask";
import { testIsWithinRanges } from "modules/spawn_protection/functions/testIsWithinRanges";

export class protectedAreaVariables {
    static noPistonExtensionAreas: {
        positive: {
            dimension: number;
            from: Vector3;
            to: Vector3;
            mode: 0 | 1;
            icon_path?: string;
        }[];
        negative: {
            dimension: number;
            from: Vector3;
            to: Vector3;
            mode: 0 | 1;
            icon_path?: string;
        }[];
    };
    static noExplosionAreas: {
        positive: {
            dimension: number;
            from: Vector3;
            to: Vector3;
            mode: 0 | 1;
            icon_path?: string;
        }[];
        negative: {
            dimension: number;
            from: Vector3;
            to: Vector3;
            mode: 0 | 1;
            icon_path?: string;
        }[];
    };
    static noBlockInteractAreas: {
        positive: {
            dimension: number;
            from: Vector3;
            to: Vector3;
            mode: 0 | 1;
            icon_path?: string;
        }[];
        negative: {
            dimension: number;
            from: Vector3;
            to: Vector3;
            mode: 0 | 1;
            icon_path?: string;
        }[];
    };
    static noInteractAreas: {
        positive: {
            dimension: number;
            from: Vector3;
            to: Vector3;
            mode: 0 | 1;
            icon_path?: string;
        }[];
        negative: {
            dimension: number;
            from: Vector3;
            to: Vector3;
            mode: 0 | 1;
            icon_path?: string;
        }[];
    };
    static protectedAreas: {
        positive: {
            dimension: number;
            from: Vector3;
            to: Vector3;
            mode: 0 | 1;
            icon_path?: string;
        }[];
        negative: {
            dimension: number;
            from: Vector3;
            to: Vector3;
            mode: 0 | 1;
            icon_path?: string;
        }[];
    };
    static noBlockBreakAreas: {
        positive: {
            dimension: number;
            from: Vector3;
            to: Vector3;
            mode: 0 | 1;
            icon_path?: string;
        }[];
        negative: {
            dimension: number;
            from: Vector3;
            to: Vector3;
            mode: 0 | 1;
            icon_path?: string;
        }[];
    };
    static noBlockPlaceAreas: {
        positive: {
            dimension: number;
            from: Vector3;
            to: Vector3;
            mode: 0 | 1;
            icon_path?: string;
        }[];
        negative: {
            dimension: number;
            from: Vector3;
            to: Vector3;
            mode: 0 | 1;
            icon_path?: string;
        }[];
    };
    static advancedAreas: {
        positive: {
            dimension: number;
            from: Vector3;
            to: Vector3;
            mode: 0 | 1;
            icon_path?: string;
        }[];
        negative: {
            dimension: number;
            from: Vector3;
            to: Vector3;
            mode: 0 | 1;
            icon_path?: string;
        }[];
    };
    static advancedAreaTypes: {}[];
}

/**
 * @todo
 */
export interface AdvancedProtectedAreaCategory<JSONMode extends boolean = false> {
    id: string;
    icon_path?: string;
    playerPlaceBlock:
        | false
        | {
              /**
               * If the mode is set to `include`, then only blocks matching the specified block mask will be allowed to be placed by players.
               *
               * If the mode is set to `exclude`, then blocks matching the specified block mask will be blocked from being placed by players.
               */
              mode: "exclude" | "include";
              /**
               * The block types to allow or block.
               */
              mask: JSONMode extends true ? string : BlockMask;
              /**
               * A list of tags that allow players to bypass this area.
               */
              allowedBypassTags: string[];
              /**
               * Filters for held items that determine whether or not this area type will affect that player.
               */
              heldItemFilters:
                  | false
                  | {
                        /**
                         * If the mode is set to `include`, then only players holding one of the specified items will be affected by this area type.
                         *
                         * If the mode is set to `exclude`, then players holding one of the specified items will not be affected by this area type.
                         */
                        mode: "exclude" | "include";
                        /**
                         * The item types to allow or block.
                         */
                        items: string[];
                    };
          };
    playerBreakBlock:
        | false
        | {
              /**
               * If the mode is set to `include`, then only blocks matching the specified block mask will be allowed to be broken by players.
               *
               * If the mode is set to `exclude`, then blocks matching the specified block mask will be blocked from being broken by players.
               */
              mode: "exclude" | "include";
              /**
               * The block types to allow or block.
               */
              mask: JSONMode extends true ? string : BlockMask;
              /**
               * A list of tags that allow players to bypass this area.
               */
              allowedBypassTags: string[];
              /**
               * Filters for held items that determine whether or not this area type will affect that player.
               */
              heldItemFilters:
                  | false
                  | {
                        /**
                         * If the mode is set to `include`, then only players holding one of the specified items will be affected by this area type.
                         *
                         * If the mode is set to `exclude`, then players holding one of the specified items will not be affected by this area type.
                         */
                        mode: "exclude" | "include";
                        /**
                         * The item types to allow or block.
                         */
                        items: string[];
                    };
          };
    playerInteractWithBlock:
        | false
        | {
              /**
               * If the mode is set to `include`, then only blocks matching the specified block mask will be allowed to be broken by players.
               *
               * If the mode is set to `exclude`, then blocks matching the specified block mask will be blocked from being broken by players.
               */
              mode: "exclude" | "include";
              /**
               * The block types to allow or block.
               */
              mask: JSONMode extends true ? string : BlockMask;
              /**
               * A list of tags that allow players to bypass this area.
               */
              allowedBypassTags: string[];
              /**
               * Filters for held items that determine whether or not this area type will affect that player.
               */
              heldItemFilters:
                  | false
                  | {
                        /**
                         * If the mode is set to `include`, then only players holding one of the specified items will be affected by this area type.
                         *
                         * If the mode is set to `exclude`, then players holding one of the specified items will not be affected by this area type.
                         */
                        mode: "exclude" | "include";
                        /**
                         * The item types to allow or block.
                         */
                        items: string[];
                    };
          };
}

export interface ProtectedArea {
    id: string;
    dimension: number;
    from: Vector3;
    to: Vector3;
    mode: 0 | 1;
    icon_path?: string;
}

export const protectedAreaCategories = [
    "noPistonExtensionArea",
    "noExplosionArea",
    "noBlockInteractArea",
    "noInteractArea",
    "protectedArea",
    "noBlockBreakArea",
    "noBlockPlaceArea",
] as const;

export class ProtectedAreas {
    static areas: {
        noPistonExtensionArea: {
            overworld: ProtectedArea[];
            nether: ProtectedArea[];
            the_end: ProtectedArea[];
        };
        noExplosionArea: {
            overworld: ProtectedArea[];
            nether: ProtectedArea[];
            the_end: ProtectedArea[];
        };
        noBlockInteractArea: {
            overworld: ProtectedArea[];
            nether: ProtectedArea[];
            the_end: ProtectedArea[];
        };
        noInteractArea: {
            overworld: ProtectedArea[];
            nether: ProtectedArea[];
            the_end: ProtectedArea[];
        };
        protectedArea: {
            overworld: ProtectedArea[];
            nether: ProtectedArea[];
            the_end: ProtectedArea[];
        };
        noBlockBreakArea: {
            overworld: ProtectedArea[];
            nether: ProtectedArea[];
            the_end: ProtectedArea[];
        };
        noBlockPlaceArea: {
            overworld: ProtectedArea[];
            nether: ProtectedArea[];
            the_end: ProtectedArea[];
        };
        advancedArea: {
            [advancedCategoryID: string]: {
                overworld: ProtectedArea[];
                nether: ProtectedArea[];
                the_end: ProtectedArea[];
            };
        };
        advancedAreaCategories: AdvancedProtectedAreaCategory[];
    } = {
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
            this.loadAdvancedCategory(category);
            this.loadAreasForAdvancedCategory(category);
        });
    }
    static loadAreasForBuiltInCategory(category: typeof protectedAreaCategories[number]) {
        let a = world.getDynamicPropertyIds().filter((dpi) => dpi.startsWith(category + ":"));
        a.forEach((aelement) => {
            tryrun(() => {
                String(
                    world.setDynamicProperty(
                        "v2:" + aelement,
                        ((v) =>
                            JSON.stringify({
                                from: { x: Number(v[0]), y: Number(v[1]), z: Number(v[2]) },
                                to: { x: Number(v[3]), y: Number(v[4]), z: Number(v[5]) },
                                dimension: 0,
                                mode: Number(v[6]) == 1 ? 1 : 0,
                                icon_path: String(v[7] ?? ""),
                            }))(String(world.getDynamicProperty(aelement)).split(","))
                    )
                );
                world.setDynamicProperty(aelement);
            });
        });
        let c = world.getDynamicPropertyIds().filter((dpi) => dpi.startsWith("v2:" + category + ":"));
        let d = c.map((v) =>
            tryget(() => ({
                id: v.slice(category.length + 4),
                ...JSON.parse(String(world.getDynamicProperty(v))),
            }))
        ) as { id: string; dimension: number; from: Vector3; to: Vector3; mode: 0 | 1; icon_path?: string }[];
        d.forEach((v) => (v.mode == 1 ? undefined : v.mode == 0 ? undefined : (v.mode = 0)));
        this.areas[category] = { overworld: d.filter((v) => v.dimension == 0), nether: d.filter((v) => v.dimension == 1), the_end: d.filter((v) => v.dimension == 2) } as typeof this.areas[typeof protectedAreaCategories[number]];
    }
    static loadAreasForAdvancedCategory(advancedCategoryID: string){
        let a = world.getDynamicPropertyIds().filter((dpi) => dpi.startsWith("advancedProtectedArea:" + advancedCategoryID + ":"));
        let d = a.map((v) =>
            tryget(() => ({
                id: v.slice(advancedCategoryID.length + 4),
                ...JSON.parse(String(world.getDynamicProperty(v))),
            }))
        ) as { id: string; dimension: number; from: Vector3; to: Vector3; mode: 0 | 1; icon_path?: string }[];
        d.forEach((v) => (v.mode == 1 ? undefined : v.mode == 0 ? undefined : (v.mode = 0)));
        this.areas.advancedArea[advancedCategoryID] = { overworld: d.filter((v) => v.dimension == 0), nether: d.filter((v) => v.dimension == 1), the_end: d.filter((v) => v.dimension == 2) } as typeof this.areas[typeof protectedAreaCategories[number]];
    }
    static loadAdvancedCategory(advancedCategoryID: string): void {
        const rawData = world.getDynamicProperty("advancedProtectedAreaCategory:" + advancedCategoryID);
        if(typeof rawData !== "string") return undefined;
        const data = JSON.parse(rawData) as AdvancedProtectedAreaCategory<true>;
        const outputData: AdvancedProtectedAreaCategory<false> = data as unknown as AdvancedProtectedAreaCategory<false>;
        Object.getOwnPropertyNames(data).forEach((key: keyof AdvancedProtectedAreaCategory<true>) => {
            if(key === "id" || key === "icon_path") return;
            const d = data[key];
            if(outputData[key] === false || d === false || d === undefined) return;
            outputData[key].mask = BlockMask.extract(d.mask);
        });
        this.areas.advancedAreaCategories = [...this.areas.advancedAreaCategories.filter(c=>c.id !== advancedCategoryID), outputData];
    }
    static getAdvancedCategoryIDs(){
        return world.getDynamicPropertyIds().filter((dpi) => dpi.startsWith("advancedProtectedAreaCategory:"));
    }
}

type preventableEventTypeMap = {
    playerPlaceBlock: PlayerPlaceBlockBeforeEvent;
    playerBreakBlock: PlayerBreakBlockBeforeEvent;
    playerInteractWithBlock: PlayerInteractWithBlockBeforeEvent;
    explosion: ExplosionBeforeEvent;
    playerInteractWithEntity: PlayerInteractWithEntityBeforeEvent;
    itemUse: ItemUseBeforeEvent;
    itemUseOn: ItemUseOnBeforeEvent;
    playerGameModeChange: PlayerGameModeChangeBeforeEvent;
    chatSend: ChatSendBeforeEvent;
    effectAdd: EffectAddBeforeEvent;
}

const preventableEventMap = {
    playerPlaceBlock: {
        builtInCategories: []
    },
    playerBreakBlock: {
        builtInCategories: []
    },
    playerInteractWithBlock: {
        builtInCategories: []
    },
    explosion: {
        builtInCategories: []
    },
    playerInteractWithEntity: {
        builtInCategories: []
    },
    itemUse: {
        builtInCategories: []
    },
    itemUseOn: {
        builtInCategories: []
    },
    playerGameModeChange: {
        builtInCategories: []
    },
    chatSend: {
        builtInCategories: []
    },
    effectAdd: {
        builtInCategories: []
    },
} as {
    [K in keyof preventableEventTypeMap]: {
        builtInCategories: typeof protectedAreaCategories[number][];
        advancedCategoryProperty?: Exclude<keyof AdvancedProtectedAreaCategory, "icon_path" | "id">;
    }
}

export class ProtectedAreaTester<T extends "playerPlaceBlock" | "playerBreakBlock" | "playerInteractWithBlock" | "explosion" | "playerInteractWithEntity" | "itemUse" | "itemUseOn" | "playerGameModeChange" | "chatSend" | "effectAdd"> {
    preventableEvent: T;
    constructor(preventaleEvent: T){
        this.preventableEvent = preventaleEvent;
    }
    testIsInArea(event: preventableEventTypeMap[T], location: Vector3, dimension: Dimension) {
        const categories = preventableEventMap[this.preventableEvent];
        return (
            categories.builtInCategories.find((category) => new ProtectedAreaCategory(category).testIsInArea(location, dimension))
            ?? (categories.advancedCategoryProperty !== undefined ? new ProtectedAreaCategory("advancedArea", categories.advancedCategoryProperty).testIsInArea(location, dimension) : undefined)
        ) !== undefined;
    }
}

export class ProtectedAreaCategory {
    category:
        | "noPistonExtensionArea"
        | "noExplosionArea"
        | "noBlockInteractArea"
        | "noInteractArea"
        | "protectedArea"
        | "noBlockBreakArea"
        | "noBlockPlaceArea"
        | "advancedArea";
    advancedCategoryID?: string;
    constructor(category: ProtectedAreaCategory["category"], advancedCategoryID?: ProtectedAreaCategory["advancedCategoryID"]){
        this.category = category;
        this.advancedCategoryID = advancedCategoryID;
    }
    getAreas(): { overworld: ProtectedArea[]; nether: ProtectedArea[]; the_end: ProtectedArea[]; } {
        if (this.category !== "advancedArea") {
            return ProtectedAreas.areas[this.category];
        } else {
            return ProtectedAreas.areas.advancedArea[this.advancedCategoryID];
        }
    }
    getAreasInDimension(dimension: Dimension | keyof typeof ProtectedAreas["areas"][ProtectedAreaCategory["category"]]): ProtectedArea[] {
        if (this.category !== "advancedArea") {
            return ProtectedAreas.areas[this.category][typeof dimension === "string" ? dimension : dimension.id as "overworld" | "nether" | "the_end"];
        } else {
            return ProtectedAreas.areas.advancedArea[this.advancedCategoryID][typeof dimension === "string" ? dimension : dimension.id as "overworld" | "nether" | "the_end"];
        }
    }
    loadAreas(): void{
        if (this.category !== "advancedArea") {
            ProtectedAreas.loadAreasForBuiltInCategory(this.category);
        } else {
            ProtectedAreas.loadAreasForAdvancedCategory(this.advancedCategoryID);
        }
    }
    testIsInArea(location: Vector3, dimension: Dimension | keyof typeof ProtectedAreas["areas"][ProtectedAreaCategory["category"]]): boolean {
        const areas = this.getAreasInDimension(dimension);
        return testIsWithinRanges(areas.filter(a=>a.mode === 0), location)
        && !testIsWithinRanges(areas.filter(a=>a.mode === 1), location);
    }
}

protectedAreaVariables.noPistonExtensionAreas = { positive: [], negative: [] };
protectedAreaVariables.noExplosionAreas = { positive: [], negative: [] };
protectedAreaVariables.noBlockInteractAreas = { positive: [], negative: [] };
protectedAreaVariables.noInteractAreas = { positive: [], negative: [] };
protectedAreaVariables.protectedAreas = { positive: [], negative: [] };
protectedAreaVariables.noBlockBreakAreas = { positive: [], negative: [] };
protectedAreaVariables.noBlockPlaceAreas = { positive: [], negative: [] };
