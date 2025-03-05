import type { Block, ChatSendBeforeEvent, EffectAddBeforeEvent, EntityFilter, GameMode } from "@minecraft/server";
import {
    Dimension,
    EntityTypes,
    ExplosionBeforeEvent,
    ItemTypes,
    ItemUseBeforeEvent,
    ItemUseOnBeforeEvent,
    PlayerBreakBlockBeforeEvent,
    PlayerGameModeChangeBeforeEvent,
    PlayerInteractWithBlockBeforeEvent,
    PlayerInteractWithEntityBeforeEvent,
    PlayerPlaceBlockBeforeEvent,
    type Vector3,
} from "@minecraft/server";
import { BlockMask } from "modules/commands/classes/BlockMask";
import { testIsWithinRanges } from "modules/spawn_protection/functions/testIsWithinRanges";
import type { VerifyConstraint } from "modules/utilities/functions/filterProperties";

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
    /**
     * Whether or not this protected area category is enabled.
     * If set to false, then any areas in this category will cease to function until this is set to true.
     * If undefined, will act like it is set to true.
     */
    enabled?: boolean;
    id: string;
    icon_path?: string;
    playerPlaceBlock?:
        | false
        | {
              /**
               * Whether or not this area effect is enabled.
               */
              enabled?: boolean;
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
               * The raw string for the block mask. When saved as JSON, this is the value stored in the mask property.
               */
              rawmask?: JSONMode extends true ? undefined : string;
              /**
               * A list of tags that allow players to bypass this area type.
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
    playerBreakBlock?:
        | false
        | {
              /**
               * Whether or not this area effect is enabled.
               */
              enabled?: boolean;
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
               * The raw string for the block mask. When saved as JSON, this is the value stored in the mask property.
               */
              rawmask?: JSONMode extends true ? undefined : string;
              /**
               * A list of tags that allow players to bypass this area type.
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
    playerInteractWithBlock?:
        | false
        | {
              /**
               * Whether or not this area effect is enabled.
               */
              enabled?: boolean;
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
               * The raw string for the block mask. When saved as JSON, this is the value stored in the mask property.
               */
              rawmask?: JSONMode extends true ? undefined : string;
              /**
               * A list of tags that allow players to bypass this area type.
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
    explosion?:
        | false
        | {
              /**
               * Whether or not this area effect is enabled.
               */
              enabled?: boolean;
              /**
               * If the mode is set to `include`, then only blocks matching the specified block mask will be able to explode.
               *
               * If the mode is set to `exclude`, then blocks matching the specified block mask will be blocked from exploding.
               */
              mode: "exclude" | "include";
              /**
               * The block types to allow or block.
               */
              mask: JSONMode extends true ? string : BlockMask;
              /**
               * The raw string for the block mask. When saved as JSON, this is the value stored in the mask property.
               */
              rawmask?: JSONMode extends true ? undefined : string;
              /**
               * A filter that determines whether or not this area type will affect explosions with the specified source entities.
               */
              sourceEntityFilter: {
                  /**
                   * A list of entity types to block.
                   *
                   * Mutually exclusive with `excludeTypes`.
                   */
                  includeTypes?: string[];
                  /**
                   * A list of entity types to allow.
                   *
                   * Mutually exclusive with `includeTypes`.
                   */
                  excludeTypes?: string[];
                  /**
                   * A list of entity tags to block.
                   *
                   * Mutually exclusive with `excludeTags`.
                   */
                  includeTags?: string[];
                  /**
                   * A list of entity tags to allow.
                   *
                   * Mutually exclusive with `includeTags`.
                   */
                  excludeTags?: string[];
              };
              /**
               * A list of tags that allow players to bypass this area type.
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
    playerGameModeChange?:
        | false
        | {
              /**
               * Whether or not this area effect is enabled.
               */
              enabled?: boolean;
              /**
               * A list of tags that allow players to bypass this area type.
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
              /**
               * A list of game modes to block changing from.
               */
              fromGameModes?: GameMode[];
              /**
               * A list of game modes to block changing to.
               */
              toGameModes?: GameMode[];
              /**
               * A list of game mode from and to pairs to block.
               */
              fromGameModesToGameModes?: [fromGameMode: GameMode, toGameMode: GameMode][];
          };
    chatSend?:
        | false
        | {
              /**
               * Whether or not this area effect is enabled.
               */
              enabled?: boolean;
              /**
               * A list of tags that allow players to bypass this area type.
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
    effectAdd?:
        | false
        | {
              /**
               * Whether or not this area effect is enabled.
               * 
               * Defaults to true if not specified.
               */
              enabled?: boolean;
              /**
               * A filter that determines whether or not the source entity will be affected by this area type.
               */
              sourceEntityFilter: {
                  /**
                   * A list of entity types to block.
                   *
                   * Mutually exclusive with `excludeTypes`.
                   */
                  includeTypes?: string[];
                  /**
                   * A list of entity types to allow.
                   *
                   * Mutually exclusive with `includeTypes`.
                   */
                  excludeTypes?: string[];
                  /**
                   * A list of entity tags to block.
                   *
                   * Mutually exclusive with `excludeTags`.
                   */
                  includeTags?: string[];
                  /**
                   * A list of entity tags to allow.
                   *
                   * Mutually exclusive with `includeTags`.
                   */
                  excludeTags?: string[];
              };
              effectFilter?: {
                  /**
                   * A list of effect types to block.
                   *
                   * Mutually exclusive with `excludeTypes`.
                   */
                  includeTypes?: string[];
                  /**
                   * A list of effect types to allow.
                   *
                   * Mutually exclusive with `includeTypes`.
                   */
                  excludeTypes?: string[];
                  /**
                   * The minimum duration of the effect for this area type to be applied.
                   *
                   * Set it to undefined or don't set it to disable the check.
                   */
                  minDuration?: number;
                  /**
                   * The maximum duration of the effect for this area type to be applied.
                   *
                   * Set it to undefined or don't set it to disable the check.
                   */
                  maxDuration?: number;
              };
          };
}

function makeMutableType<T>(obj: T): Mutable<T> {
    return obj;
}

export const AdvancedProtectedAreaCategoryPropertyAllEnabledDefaults = makeMutableType({
    enabled: true,
    id: "",
    icon_path: undefined as undefined,
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
            minDuration: undefined as undefined,
            maxDuration: undefined as undefined,
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
} as const satisfies AdvancedProtectedAreaCategory<false>);

export const AdvancedProtectedAreaCategoryPropertyAllEnabledDefaults_JSON = makeMutableType({
    enabled: true,
    id: "",
    icon_path: undefined as undefined,
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
            minDuration: undefined as undefined,
            maxDuration: undefined as undefined,
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
        rawmask: undefined as undefined,
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
        rawmask: undefined as undefined,
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
        rawmask: undefined as undefined,
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
        rawmask: undefined as undefined,
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
} as const satisfies AdvancedProtectedAreaCategory<true>);

export function convertAdvancedPropertedAreaCategoryToJSON(category: AdvancedProtectedAreaCategory<false>) {
    const out = JSON.parse(JSON.stringify(category)) as AdvancedProtectedAreaCategory<true>;
    if(!!out.playerBreakBlock){
        out.playerBreakBlock.mask = out.playerBreakBlock.rawmask;
        delete out.playerBreakBlock.rawmask;
    }
    if(!!out.playerPlaceBlock){
        out.playerPlaceBlock.mask = out.playerPlaceBlock.rawmask;
        delete out.playerPlaceBlock.rawmask;
    }
    if(!!out.playerInteractWithBlock){
        out.playerInteractWithBlock.mask = out.playerInteractWithBlock.rawmask;
        delete out.playerInteractWithBlock.rawmask;
    }
    if(!!out.explosion){
        out.explosion.mask = out.explosion.rawmask;
        delete out.explosion.rawmask;
    }
    return out;
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
    static loadAreasForBuiltInCategory(category: (typeof protectedAreaCategories)[number]) {
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
        this.areas[category] = {
            overworld: d.filter((v) => v.dimension == 0),
            nether: d.filter((v) => v.dimension == 1),
            the_end: d.filter((v) => v.dimension == 2),
        } as (typeof this.areas)[(typeof protectedAreaCategories)[number]];
    }
    static loadAreasForAdvancedCategory(advancedCategoryID: string) {
        let a = world.getDynamicPropertyIds().filter((dpi) => dpi.startsWith("advancedProtectedArea:" + advancedCategoryID + ":"));
        let d = a.map((v) =>
            tryget(() => ({
                id: v.slice(advancedCategoryID.length + 24),
                ...JSON.parse(String(world.getDynamicProperty(v))),
            }))
        ) as { id: string; dimension: number; from: Vector3; to: Vector3; mode: 0 | 1; icon_path?: string }[];
        d.forEach((v) => (v.mode == 1 ? undefined : v.mode == 0 ? undefined : (v.mode = 0)));
        this.areas.advancedArea[advancedCategoryID] = {
            overworld: d.filter((v) => v.dimension == 0),
            nether: d.filter((v) => v.dimension == 1),
            the_end: d.filter((v) => v.dimension == 2),
        } as (typeof this.areas)[(typeof protectedAreaCategories)[number]];
    }
    static loadAdvancedCategory(advancedCategoryID: string): void {
        const rawData = world.getDynamicProperty("advancedProtectedAreaCategory:" + advancedCategoryID);
        if (typeof rawData !== "string") return undefined;
        const data = JSON.parse(rawData) as AdvancedProtectedAreaCategory<true>;
        const outputData: AdvancedProtectedAreaCategory<false> = data as unknown as AdvancedProtectedAreaCategory<false>;
        Object.getOwnPropertyNames(data).forEach((key: keyof AdvancedProtectedAreaCategory<true>) => {
            if (key === "id" || key === "icon_path") return;
            const d = data[key];
            if (typeof outputData[key] === "boolean" || typeof d === "boolean" || d === undefined || !("mask" in d) || !("mask" in outputData[key])) return;
            outputData[key].mask = BlockMask.extract(d.mask);
            (outputData[key] as Exclude<AdvancedProtectedAreaCategory<false>["playerPlaceBlock"], false>).rawmask = d.mask;
        });
        this.areas.advancedAreaCategories = [...this.areas.advancedAreaCategories.filter((c) => c.id !== advancedCategoryID), outputData];
    }
    static getAdvancedCategoryIDs() {
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
};

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
} as {
    [K in keyof preventableEventTypeMap]: {
        builtInCategories: (typeof protectedAreaCategories)[number][];
        advancedCategoryProperty?: Exclude<keyof AdvancedProtectedAreaCategory, "icon_path" | "id" | "enabled">;
    };
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
} as const;

export class ProtectedAreaTester<
    T extends
        | "playerPlaceBlock"
        | "playerBreakBlock"
        | "playerInteractWithBlock"
        | "explosion"
        | "playerInteractWithEntity"
        | "itemUse"
        | "itemUseOn"
        | "playerGameModeChange"
        | "chatSend"
        | "effectAdd"
> {
    preventableEvent: T;
    constructor(preventaleEvent: T) {
        this.preventableEvent = preventaleEvent;
    }
    testIsInArea(event: preventableEventTypeMap[T], location: Vector3, dimension: Dimension, extraData?: { block?: Block }) {
        const categories = preventableEventMap[this.preventableEvent];
        return (
            (categories.builtInCategories.find((category) => new ProtectedAreaCategory(category).testIsInArea(location, dimension)) ??
                (categories.advancedCategoryProperty !== undefined
                    ? ProtectedAreas.areas.advancedAreaCategories
                          .filter((c) => !!c[categories.advancedCategoryProperty] && ((c[categories.advancedCategoryProperty] as Exclude<(typeof c)[typeof categories.advancedCategoryProperty], boolean>).enabled ?? true))
                          .find((category) => {
                              let success = false;
                              switch (categories.advancedCategoryProperty) {
                                  case "playerPlaceBlock": {
                                      const prop: Exclude<(typeof category)[typeof categories.advancedCategoryProperty], false> =
                                          category.playerPlaceBlock as Exclude<(typeof category)[typeof categories.advancedCategoryProperty], false>;
                                      const data = event as preventableEventTypeMap[typeof categories.advancedCategoryProperty];
                                      success =
                                          !prop.allowedBypassTags.some((tag) => data.player.hasTag(tag)) &&
                                          (prop.heldItemFilters !== false
                                              ? prop.heldItemFilters.mode === "include"
                                                  ? prop.heldItemFilters.items.some(
                                                        (item) => data.player.heldItem?.typeId === (ItemTypes.get(item)?.id ?? item)
                                                    )
                                                  : !prop.heldItemFilters.items.some(
                                                        (item) => data.player.heldItem?.typeId === (ItemTypes.get(item)?.id ?? item)
                                                    )
                                              : true) &&
                                          prop.mask.testIfMatches(data.permutationBeingPlaced, prop.mode);
                                      break;
                                  }
                                  case "playerBreakBlock": {
                                      const prop: Exclude<(typeof category)[typeof categories.advancedCategoryProperty], false> =
                                          category.playerBreakBlock as Exclude<(typeof category)[typeof categories.advancedCategoryProperty], false>;
                                      const data = event as preventableEventTypeMap[typeof categories.advancedCategoryProperty];
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
                                      const prop: Exclude<(typeof category)[typeof categories.advancedCategoryProperty], false> =
                                          category.playerInteractWithBlock as Exclude<(typeof category)[typeof categories.advancedCategoryProperty], false>;
                                      const data = event as preventableEventTypeMap[typeof categories.advancedCategoryProperty];
                                      success =
                                          !prop.allowedBypassTags.some((tag) => data.player.hasTag(tag)) &&
                                          (prop.heldItemFilters !== false
                                              ? prop.heldItemFilters.mode === "include"
                                                  ? prop.heldItemFilters.items.some(
                                                        (item) => data.player.heldItem?.typeId === (ItemTypes.get(item)?.id ?? item)
                                                    )
                                                  : !prop.heldItemFilters.items.some(
                                                        (item) => data.player.heldItem?.typeId === (ItemTypes.get(item)?.id ?? item)
                                                    )
                                              : true) &&
                                          prop.mask.testIfMatches(data.block, prop.mode);
                                      break;
                                  }
                                  case "explosion": {
                                      const prop: Exclude<(typeof category)[typeof categories.advancedCategoryProperty], false> = category.explosion as Exclude<
                                          (typeof category)[typeof categories.advancedCategoryProperty],
                                          false
                                      >;
                                      const data = event as preventableEventTypeMap[typeof categories.advancedCategoryProperty];
                                      success =
                                          (data.source !== undefined
                                              ? !prop.allowedBypassTags.some((tag) => data.source.hasTag(tag)) &&
                                                tryget(() =>
                                                    prop.heldItemFilters !== false
                                                        ? prop.heldItemFilters.mode === "include"
                                                            ? prop.heldItemFilters.items.some(
                                                                  (item) => data.source.heldItem?.typeId === (ItemTypes.get(item)?.id ?? item)
                                                              )
                                                            : !prop.heldItemFilters.items.some(
                                                                  (item) => data.source.heldItem?.typeId === (ItemTypes.get(item)?.id ?? item)
                                                              )
                                                        : true
                                                ) &&
                                                ((prop.sourceEntityFilter?.excludeTags ?? []).length === 0
                                                    ? prop.sourceEntityFilter?.includeTags?.some((tag) => data.source.hasTag(tag)) ?? true
                                                    : !prop.sourceEntityFilter.excludeTags.some((tag) => data.source.hasTag(tag))) &&
                                                ((prop.sourceEntityFilter?.excludeTypes ?? []).length === 0
                                                    ? prop.sourceEntityFilter?.includeTypes?.some(
                                                          (type) => data.source.typeId === (EntityTypes.get(type)?.id ?? type)
                                                      ) ?? true
                                                    : !prop.sourceEntityFilter.excludeTypes.some(
                                                          (type) => data.source.typeId === (EntityTypes.get(type)?.id ?? type)
                                                      ))
                                              : true) && (extraData?.block !== undefined ? prop.mask.testIfMatches(extraData.block, prop.mode) : true);
                                      break;
                                  }
                                  case "chatSend": {
                                      const prop: Exclude<(typeof category)[typeof categories.advancedCategoryProperty], false> = category.chatSend as Exclude<
                                          (typeof category)[typeof categories.advancedCategoryProperty],
                                          false
                                      >;
                                      const data = event as preventableEventTypeMap[typeof categories.advancedCategoryProperty];
                                      success =
                                          !prop.allowedBypassTags.some((tag) => data.sender.hasTag(tag)) &&
                                          (prop.heldItemFilters !== false
                                              ? prop.heldItemFilters.mode === "include"
                                                  ? prop.heldItemFilters.items.some(
                                                        (item) => data.sender.heldItem?.typeId === (ItemTypes.get(item)?.id ?? item)
                                                    )
                                                  : !prop.heldItemFilters.items.some(
                                                        (item) => data.sender.heldItem?.typeId === (ItemTypes.get(item)?.id ?? item)
                                                    )
                                              : true);
                                      break;
                                  }
                                  case "effectAdd": {
                                      const prop: Exclude<(typeof category)[typeof categories.advancedCategoryProperty], false> = category.effectAdd as Exclude<
                                          (typeof category)[typeof categories.advancedCategoryProperty],
                                          false
                                      >;
                                      const data = event as preventableEventTypeMap[typeof categories.advancedCategoryProperty];
                                      success =
                                          ((prop.sourceEntityFilter?.excludeTags ?? []).length === 0
                                              ? prop.sourceEntityFilter?.includeTags?.some((tag) => data.entity.hasTag(tag)) ?? true
                                              : !prop.sourceEntityFilter.excludeTags.some((tag) => data.entity.hasTag(tag))) &&
                                          ((prop.sourceEntityFilter?.excludeTypes ?? []).length === 0
                                              ? prop.sourceEntityFilter?.includeTypes?.some(
                                                    (type) => data.entity.typeId === (EntityTypes.get(type)?.id ?? type)
                                                ) ?? true
                                              : !prop.sourceEntityFilter.excludeTypes.some(
                                                    (type) => data.entity.typeId === (EntityTypes.get(type)?.id ?? type)
                                                )) &&
                                          ((prop.effectFilter?.excludeTypes ?? []).length === 0
                                              ? prop.effectFilter?.includeTypes?.some((type) => data.effectType === type) ?? true
                                              : !prop.effectFilter.excludeTypes.some((type) => data.effectType === type)) &&
                                          (!Number.isNaN(Number(prop.effectFilter?.minDuration)) ? prop.effectFilter.minDuration <= data.duration : true) &&
                                          (!Number.isNaN(Number(prop.effectFilter?.maxDuration)) ? prop.effectFilter.maxDuration >= data.duration : true);
                                      break;
                                  }
                                  case "playerGameModeChange": {
                                      const prop: Exclude<(typeof category)[typeof categories.advancedCategoryProperty], false> =
                                          category.playerGameModeChange as Exclude<(typeof category)[typeof categories.advancedCategoryProperty], false>;
                                      const data = event as preventableEventTypeMap[typeof categories.advancedCategoryProperty];
                                      success =
                                          !prop.allowedBypassTags.some((tag) => data.player.hasTag(tag)) &&
                                          (prop.heldItemFilters !== false
                                              ? prop.heldItemFilters.mode === "include"
                                                  ? prop.heldItemFilters.items.some(
                                                        (item) => data.player.heldItem?.typeId === (ItemTypes.get(item)?.id ?? item)
                                                    )
                                                  : !prop.heldItemFilters.items.some(
                                                        (item) => data.player.heldItem?.typeId === (ItemTypes.get(item)?.id ?? item)
                                                    )
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
                              if (!success) return false;
                              return new ProtectedAreaCategory("advancedArea", category.id).testIsInArea(location, dimension);
                          })
                    : undefined)) !== undefined
        );
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
    constructor(category: ProtectedAreaCategory["category"], advancedCategoryID?: ProtectedAreaCategory["advancedCategoryID"]) {
        this.category = category;
        this.advancedCategoryID = advancedCategoryID;
    }
    getAreas(): { overworld: ProtectedArea[]; nether: ProtectedArea[]; the_end: ProtectedArea[] } {
        if (this.category !== "advancedArea") {
            return ProtectedAreas.areas[this.category];
        } else {
            return ProtectedAreas.areas.advancedArea[this.advancedCategoryID];
        }
    }
    getAreasInDimension(dimension: Dimension | keyof (typeof ProtectedAreas)["areas"][ProtectedAreaCategory["category"]]): ProtectedArea[] {
        if (this.category !== "advancedArea") {
            return ProtectedAreas.areas[this.category][
                typeof dimension === "string" ? dimension : (dimension.id.replace("minecraft:", "") as "overworld" | "nether" | "the_end")
            ];
        } else {
            return ProtectedAreas.areas.advancedArea[this.advancedCategoryID][
                typeof dimension === "string" ? dimension : (dimension.id.replace("minecraft:", "") as "overworld" | "nether" | "the_end")
            ];
        }
    }
    loadAreas(): void {
        if (this.category !== "advancedArea") {
            ProtectedAreas.loadAreasForBuiltInCategory(this.category);
        } else {
            ProtectedAreas.loadAreasForAdvancedCategory(this.advancedCategoryID);
        }
    }
    testIsInArea(location: Vector3, dimension: Dimension | keyof (typeof ProtectedAreas)["areas"][ProtectedAreaCategory["category"]]): boolean {
        // if(this.category === "advancedArea" && event !== undefined) return false
        const areas = this.getAreasInDimension(dimension);
        return (
            testIsWithinRanges(
                areas.filter((a) => a.mode === 0),
                location
            ) &&
            !testIsWithinRanges(
                areas.filter((a) => a.mode === 1),
                location
            )
        );
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
