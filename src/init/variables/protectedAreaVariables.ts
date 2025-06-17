import type { Block, ChatSendBeforeEvent, EffectAddBeforeEvent, GameMode } from "@minecraft/server";
import {
    Dimension,
    EntityTypes,
    ExplosionBeforeEvent,
    ItemTypes,
    ItemUseBeforeEvent,
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

/**
 * A class that contains variables that are used for the spawn protection system.
 *
 * @deprecated This class is deprecated and will be removed in a future version. This is due to a rework of the spawn protection system. These variables are no longer used.
 */
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
               *
               * @default true
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
               *
               * @default true
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
               *
               * @default true
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
    playerInteractWithEntity?:
        | false
        | {
              /**
               * Whether or not this area effect is enabled.
               *
               * @default true
               */
              enabled?: boolean;
              /**
               * A filter that determines whether or not the source entity will be affected by this area type.
               */
              targetEntityFilter: {
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
    itemUse?:
        | false
        | {
              /**
               * Whether or not this area effect is enabled.
               *
               * @default true
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
    explosion?:
        | false
        | {
              /**
               * Whether or not this area effect is enabled.
               *
               * @default true
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
               *
               * @default true
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
               *
               * @default true
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
               * @default true
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
    noPVPZone?:
        | false
        | {
              /**
               * Whether or not this area effect is enabled.
               *
               * @default true
               */
              enabled?: boolean;
          };
    /**
     * @todo This one is still a little bit buggy.
     */
    tagZone?:
        | false
        | {
              /**
               * Whether or not this area effect is enabled.
               *
               * @default true
               */
              enabled?: boolean;
              /**
               * A list of tags to apply to entities in this area.
               */
              tags: string[];
              /**
               * Whether or not to remove all of the listed tags on exit.
               *
               * @default false
               */
              removeOnExit?: boolean;
              /**
               * @todo Disabling this is currently buggy, and possibly laggy.
               *
               * @default true
               */
              playersOnly?: boolean;
          };
    // effectZone
    // damageZone
}

function makeMutableType<T>(obj: T): Mutable<T> {
    return obj;
}

/**
 * Default values for an enabled area category property.
 */
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
    playerInteractWithEntity: {
        enabled: true,
        targetEntityFilter: {
            includeTypes: [],
            excludeTypes: [],
            includeTags: [],
            excludeTags: [],
        },
        allowedBypassTags: [],
        heldItemFilters: {
            mode: "exclude",
            items: [],
        },
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
    itemUse: {
        enabled: true,
        allowedBypassTags: [],
        heldItemFilters: {
            mode: "exclude",
            items: [],
        },
    },
    noPVPZone: {
        enabled: true,
    },
    tagZone: {
        enabled: true,
        tags: [],
        removeOnExit: false,
        playersOnly: true,
    },
} as const satisfies ReadonlyDeep<AdvancedProtectedAreaCategory<false>>);

/**
 * Default values for an enabled area category property, in JSON format.
 */
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
    playerInteractWithEntity: {
        enabled: true,
        targetEntityFilter: {
            includeTypes: [],
            excludeTypes: [],
            includeTags: [],
            excludeTags: [],
        },
        allowedBypassTags: [],
        heldItemFilters: {
            mode: "exclude",
            items: [],
        },
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
    itemUse: {
        enabled: true,
        allowedBypassTags: [],
        heldItemFilters: {
            mode: "exclude",
            items: [],
        },
    },
    noPVPZone: {
        enabled: true,
    },
    tagZone: {
        enabled: true,
        tags: [],
        removeOnExit: false,
        playersOnly: true,
    },
} as const satisfies ReadonlyDeep<AdvancedProtectedAreaCategory<true>>);

/**
 * Converts an `AdvancedProtectedAreaCategory` object with raw mask properties to a JSON-compatible format.
 *
 * @param {AdvancedProtectedAreaCategory<false>} category - The category object to convert, which has the `rawmask` properties.
 * @returns {AdvancedProtectedAreaCategory<true>} A JSON-compatible `AdvancedProtectedAreaCategory` object with `mask` properties and without `rawmask`.
 *
 * This function processes specific properties (`playerBreakBlock`, `playerPlaceBlock`, `playerInteractWithBlock`, `explosion`)
 * by setting their `mask` to the value of `rawmask` and then removing the `rawmask` property.
 */

export function convertAdvancedPropertedAreaCategoryToJSON(category: AdvancedProtectedAreaCategory<false>): AdvancedProtectedAreaCategory<true> {
    const out = JSON.parse(JSON.stringify(category)) as AdvancedProtectedAreaCategory<true>;
    if (!!out.playerBreakBlock) {
        out.playerBreakBlock.mask = out.playerBreakBlock.rawmask!;
        delete out.playerBreakBlock.rawmask;
    }
    if (!!out.playerPlaceBlock) {
        out.playerPlaceBlock.mask = out.playerPlaceBlock.rawmask!;
        delete out.playerPlaceBlock.rawmask;
    }
    if (!!out.playerInteractWithBlock) {
        out.playerInteractWithBlock.mask = out.playerInteractWithBlock.rawmask!;
        delete out.playerInteractWithBlock.rawmask;
    }
    if (!!out.explosion) {
        out.explosion.mask = out.explosion.rawmask!;
        delete out.explosion.rawmask;
    }
    return out;
}

/**
 * Represents a protected area.
 */
export interface ProtectedArea {
    id: string;
    dimension: 0 | 1 | 2;
    from: Vector3;
    to: Vector3;
    mode: 0 | 1;
    icon_path?: string;
}

/**
 * Built-in protected area categories.
 */
export const protectedAreaCategories = [
    "noPistonExtensionArea",
    "noExplosionArea",
    "noBlockInteractArea",
    "noInteractArea",
    "protectedArea",
    "noBlockBreakArea",
    "noBlockPlaceArea",
] as const;

/**
 * Loads and stores protected areas.
 */
export class ProtectedAreas {
    /**
     * A static class containing various protected areas categorized by different types of restrictions.
     * Each category contains separate lists for the overworld, nether, and the end dimensions.
     *
     * @static
     * @memberof ProtectedAreas
     *
     * @property noPistonExtensionArea - Areas where piston extensions are not allowed.
     * @property noExplosionArea - Areas where explosions are not allowed.
     * @property noBlockInteractArea - Areas where block interactions are not allowed.
     * @property noInteractArea - Areas where interactions are not allowed.
     * @property protectedArea - General protected areas.
     * @property noBlockBreakArea - Areas where block breaking is not allowed.
     * @property noBlockPlaceArea - Areas where block placing is not allowed.
     * @property advancedArea - Advanced areas categorized by a unique ID, each containing separate lists for the overworld, nether, and the end dimensions.
     * @property advancedAreaCategories - List of advanced protected area categories.
     */
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
    /**
     * Loads all protected areas for all built-in categories and advanced categories.
     * This should be called once on startup.
     * @static
     * @returns {void}
     * @memberof ProtectedAreas
     */
    static load(): void {
        protectedAreaCategories.forEach((category) => {
            this.loadAreasForBuiltInCategory(category);
        });
        this.getAdvancedCategoryIDs().forEach((category) => {
            this.loadAdvancedCategory(category.slice(30));
            this.loadAreasForAdvancedCategory(category.slice(30));
        });
    }

    /**
     * Loads areas for all built-in categories.
     * Iterates over each category in `protectedAreaCategories` and calls
     * `loadAreasForBuiltInCategory` for each one.
     *
     * @static
     * @returns {void}
     * @memberof ProtectedAreas
     *
     * @remarks
     * This method is static and does not require an instance of the class to be called.
     */
    static loadAreasForAllBuiltInCategories(): void {
        protectedAreaCategories.forEach((category) => {
            this.loadAreasForBuiltInCategory(category);
        });
    }
    /**
     * Loads all advanced categories and their respective areas.
     *
     * This method retrieves all advanced category IDs and iterates over each category.
     * For each category, it loads the advanced category and its associated areas.
     *
     * @static
     * @returns {void}
     * @memberof ProtectedAreas
     *
     * @remarks
     * The category ID is sliced to remove the first 30 characters before loading the category and its areas.
     */
    static loadAllAdvancedCategoriesAndTheirAreas(): void {
        this.getAdvancedCategoryIDs().forEach((category) => {
            this.loadAdvancedCategory(category.slice(30));
            this.loadAreasForAdvancedCategory(category.slice(30));
        });
    }

    /**
     * Loads areas for all loaded advanced categories.
     * Iterates through each advanced area category and loads the areas associated with that category.
     *
     * @static
     * @returns {void}
     * @memberof ProtectedAreas
     *
     * @remarks
     * This method assumes that `this.areas.advancedAreaCategories` is an array of category objects,
     * each containing an `id` property.
     */
    static loadAreasForAllLoadedAdvancedCategories(): void {
        this.areas.advancedAreaCategories.forEach((category) => this.loadAreasForAdvancedCategory(category.id));
    }
    /**
     * Loads all protected areas for the given built-in category.
     * This will upgrade old format areas to the new format.
     *
     * @static
     * @param {(typeof protectedAreaCategories)[number]} category The built-in category for which to load all protected areas.
     * @returns {void}
     * @memberof ProtectedAreas
     */
    static loadAreasForBuiltInCategory(category: (typeof protectedAreaCategories)[number]): void {
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

    /**
     * Loads the protected areas for a given advanced category ID.
     *
     * This method retrieves dynamic property IDs that start with the specified advanced category ID,
     * parses the properties into area objects, and categorizes them based on their dimension.
     *
     * @static
     * @param {string} advancedCategoryID - The ID of the advanced category for which to load protected areas.
     * @returns {void}
     * @memberof ProtectedAreas
     *
     * The method performs the following steps:
     * 1. Filters dynamic property IDs that start with "advancedProtectedArea:" followed by the advanced category ID.
     * 2. Maps the filtered property IDs to area objects by extracting the ID and parsing the JSON property value.
     * 3. Ensures the `mode` property of each area object is either 0 or 1, defaulting to 0 if invalid.
     * 4. Categorizes the area objects into `overworld`, `nether`, and `the_end` based on their dimension.
     * 5. Stores the categorized areas in the `areas.advancedArea` object under the specified advanced category ID.
     *
     * The area objects have the following structure:
     * - `id`: The unique identifier of the area.
     * - `dimension`: The dimension of the area (0 for overworld, 1 for nether, 2 for the end).
     * - `from`: The starting coordinates of the area.
     * - `to`: The ending coordinates of the area.
     * - `mode`: The mode of the area (0 or 1).
     * - `icon_path` (optional): The path to the icon representing the area.
     */
    static loadAreasForAdvancedCategory(advancedCategoryID: string): void {
        let a = world.getDynamicPropertyIds().filter((dpi) => dpi.startsWith("advancedProtectedArea:" + advancedCategoryID + ":"));
        let d = a.map((v) =>
            tryget(() => ({
                id: v.slice(advancedCategoryID.length + 23),
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
    /**
     * Loads an advanced protected area category by its ID.
     *
     * @static
     * @param {string} advancedCategoryID - The ID of the advanced protected area category to be loaded.
     * @returns {void}
     * @memberof ProtectedAreas
     *
     * @remarks This function retrieves raw data for a specific advanced protected area category,
     * parses it into a structured format, and updates the internal list of advanced area categories.
     * It skips processing for properties like "id" and "icon_path" and handles raw mask data conversion.
     * If the data type is not a string, the function returns without making any updates.
     */
    static loadAdvancedCategory(advancedCategoryID: string): void {
        const rawData = world.getDynamicProperty("advancedProtectedAreaCategory:" + advancedCategoryID);
        if (typeof rawData !== "string") return undefined;
        const data = JSON.parse(rawData) as AdvancedProtectedAreaCategory<true>;
        const outputData: AdvancedProtectedAreaCategory<false> = data as unknown as AdvancedProtectedAreaCategory<false>;
        Object.getOwnPropertyNames(data).forEach((key: keyof AdvancedProtectedAreaCategory<true>) => {
            if (key === "id" || key === "icon_path") return;
            const d = data[key]!;
            if (typeof outputData[key] === "boolean" || typeof d === "boolean" || d === undefined || !("mask" in d) || !("mask" in (outputData[key] as VerifyConstraint<typeof outputData[typeof key], object>))) return;
            (outputData[key] as Exclude<AdvancedProtectedAreaCategory<false>["playerPlaceBlock"], false>)!.rawmask = d.mask;
            (outputData[key] as Exclude<AdvancedProtectedAreaCategory<false>["playerPlaceBlock"], false>)!.mask = BlockMask.extract(d.mask, true, d.mode ?? "exclude");
            /**
             * Returns an array of strings representing the IDs of all advanced protected area categories.
             * @returns {string[]} An array of strings representing the IDs of all advanced protected area categories.
             */
            /*************  ✨ Codeium Command ⭐  *************/
            /******  c025f12d-39e0-4311-af8d-3b9e749dddde  *******/
        });
        this.areas.advancedAreaCategories = [...this.areas.advancedAreaCategories.filter((c) => c.id !== advancedCategoryID), outputData];
    }
    /**
     * Returns an array of strings representing the IDs of all advanced protected area categories.
     *
     * This function works by checking all dynamic properties on the world object and filtering for those that start with the string "advancedProtectedAreaCategory:".
     *
     * @static
     * @returns {string[]} An array of strings representing the IDs of all advanced protected area categories.
     * @memberof ProtectedAreas
     */
    static getAdvancedCategoryIDs(): string[] {
        return world.getDynamicPropertyIds().filter((dpi) => dpi.startsWith("advancedProtectedAreaCategory:"));
    }
}

/**
 * A map of event types to their corresponding event objects that can be prevented.
 *
 * @interface preventableEventTypeMap
 *
 * @property {PlayerPlaceBlockBeforeEvent} playerPlaceBlock - Event triggered before a player places a block.
 * @property {PlayerBreakBlockBeforeEvent} playerBreakBlock - Event triggered before a player breaks a block.
 * @property {PlayerInteractWithBlockBeforeEvent} playerInteractWithBlock - Event triggered before a player interacts with a block.
 * @property {ExplosionBeforeEvent} explosion - Event triggered before an explosion occurs.
 * @property {PlayerInteractWithEntityBeforeEvent} playerInteractWithEntity - Event triggered before a player interacts with an entity.
 * @property {ItemUseBeforeEvent} itemUse - Event triggered before an item is used.
 * @property {PlayerGameModeChangeBeforeEvent} playerGameModeChange - Event triggered before a player's game mode is changed.
 * @property {ChatSendBeforeEvent} chatSend - Event triggered before a chat message is sent.
 * @property {EffectAddBeforeEvent} effectAdd - Event triggered before an effect is added to an entity.
 */
interface preventableEventTypeMap {
    playerPlaceBlock: PlayerPlaceBlockBeforeEvent;
    playerBreakBlock: PlayerBreakBlockBeforeEvent;
    playerInteractWithBlock: PlayerInteractWithBlockBeforeEvent;
    explosion: ExplosionBeforeEvent;
    playerInteractWithEntity: PlayerInteractWithEntityBeforeEvent;
    itemUse: ItemUseBeforeEvent;
    playerGameModeChange: PlayerGameModeChangeBeforeEvent;
    chatSend: ChatSendBeforeEvent;
    effectAdd: EffectAddBeforeEvent;
}

/**
 * A map of preventable events to their respective categories and properties.
 *
 * Each key in the map represents a specific event that can be prevented, and the value
 * is an object containing the categories and properties associated with that event.
 *
 * @constant
 * @type {{[K in keyof preventableEventTypeMap]: { builtInCategories: (typeof protectedAreaCategories)[number][]; advancedCategoryProperty?: Exclude<keyof AdvancedProtectedAreaCategory, "icon_path" | "id" | "enabled">; }; }} K - The keys of the preventableEventTypeMap.
 *
 * @property {string[]} builtInCategories - An array of category names that are built-in for the event.
 * @property {string} [advancedCategoryProperty] - An optional property representing the advanced category for the event.
 */
const preventableEventMap: {
    [K in keyof preventableEventTypeMap]: {
        builtInCategories: (typeof protectedAreaCategories)[number][];
        advancedCategoryProperty?: Exclude<keyof AdvancedProtectedAreaCategory, "icon_path" | "id" | "enabled">;
    };
} = {
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
        advancedCategoryProperty: "playerInteractWithEntity",
    },
    itemUse: {
        builtInCategories: [],
        advancedCategoryProperty: "itemUse",
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

/**
 * A constant object that maps advanced category property keys to their display names.
 * This object is used to provide human-readable names for various prevention and interaction
 * properties within a protected area.
 *
 * @constant
 */
export const advancedCategoryPropertyDisplayNames = {
    playerPlaceBlock: "Block Placement Prevention",
    playerBreakBlock: "Block Breaking Prevention",
    playerInteractWithBlock: "Block Interaction Prevention",
    explosion: "Explosion Prevention",
    playerInteractWithEntity: "Entity Interaction Prevention",
    itemUse: "Item Use Prevention",
    playerGameModeChange: "Game Mode Change Prevention",
    chatSend: "Player Chat Message Send Prevention",
    effectAdd: "Entity Effect Add Prevention",
    noPVPZone: "PVP Prevention",
    tagZone: "Tag Zone",
} as const satisfies { [K in LooseAutocomplete<Exclude<keyof AdvancedProtectedAreaCategory, "icon_path" | "id" | "enabled">>]: string };

/**
 * The `ProtectedAreaTester` class is used to test if certain events occur within a protected area.
 *
 * @template {T extends "playerPlaceBlock" | "playerBreakBlock" | "playerInteractWithBlock" | "explosion" | "playerInteractWithEntity" | "itemUse" | "playerGameModeChange" | "chatSend" | "effectAdd"} T
 * The type of event that can be prevented. It can be one of the following:
 * - "playerPlaceBlock"
 * - "playerBreakBlock"
 * - "playerInteractWithBlock"
 * - "explosion"
 * - "playerInteractWithEntity"
 * - "itemUse"
 * - "playerGameModeChange"
 * - "chatSend"
 * - "effectAdd"
 */
export class ProtectedAreaTester<
    T extends
        | "playerPlaceBlock"
        | "playerBreakBlock"
        | "playerInteractWithBlock"
        | "explosion"
        | "playerInteractWithEntity"
        | "itemUse"
        | "playerGameModeChange"
        | "chatSend"
        | "effectAdd"
> {
    /**
     * Represents an event that can be prevented.
     *
     * @type {T} The type of the event.
     */
    preventableEvent: T;
    /**
     * Constructs an instance of the class with a preventable event.
     *
     * @param {T} preventaleEvent - The event that can be prevented.
     */
    constructor(preventaleEvent: T) {
        this.preventableEvent = preventaleEvent;
    }
    /**
     * Tests if the given event is in a protected area.
     * @param {preventableEventTypeMap[T]} event The event to test.
     * @param {Vector3} location The location to test.
     * @param {Dimension} dimension The dimension to test.
     * @param {{ block?: Block }} extraData Additional data for the test, such as the block involved in the event.
     * @returns True if the event occurs within a protected area, otherwise false.
     */
    testIsInArea(event: preventableEventTypeMap[T], location: Vector3, dimension: Dimension, extraData?: { block?: Block }): boolean {
        const categories = preventableEventMap[this.preventableEvent];
        return (
            (categories.builtInCategories.find((category) => new ProtectedAreaCategory(category).testIsInArea(location, dimension)) ??
                (categories.advancedCategoryProperty !== undefined
                    ? ProtectedAreas.areas.advancedAreaCategories
                          .filter(
                              (c) =>
                                  !!c[categories.advancedCategoryProperty!] &&
                                  ((c[categories.advancedCategoryProperty!] as Exclude<(typeof c)[NonNullable<typeof categories.advancedCategoryProperty>], boolean | undefined>)
                                      .enabled ??
                                      true)
                          )
                          .find((category) => {
                              let success = false;
                              switch (categories.advancedCategoryProperty) {
                                  case "playerPlaceBlock": {
                                      const prop: Exclude<(typeof category)[typeof categories.advancedCategoryProperty], false> =
                                          category.playerPlaceBlock as Exclude<(typeof category)[typeof categories.advancedCategoryProperty], false>;
                                      const data = event as preventableEventTypeMap[typeof categories.advancedCategoryProperty];
                                      success =
                                          !prop!.allowedBypassTags.some((tag) => data.player.hasTag(tag)) &&
                                          (prop!.heldItemFilters !== false
                                              ? prop!.heldItemFilters.mode === "include"
                                                  ? prop!.heldItemFilters.items.some(
                                                        (item) => data.player.heldItem?.typeId === (ItemTypes.get(item)?.id ?? item)
                                                    )
                                                  : !prop!.heldItemFilters.items.some(
                                                        (item) => data.player.heldItem?.typeId === (ItemTypes.get(item)?.id ?? item)
                                                    )
                                              : true) &&
                                          prop!.mask.testIfMatches(data.permutationToPlace, prop!.mode);
                                      break;
                                  }
                                  case "playerBreakBlock": {
                                      const prop: Exclude<(typeof category)[typeof categories.advancedCategoryProperty], false> =
                                          category.playerBreakBlock as Exclude<(typeof category)[typeof categories.advancedCategoryProperty], false>;
                                      const data = event as preventableEventTypeMap[typeof categories.advancedCategoryProperty];
                                      success =
                                          !prop!.allowedBypassTags.some((tag) => data.player.hasTag(tag)) &&
                                          (prop!.heldItemFilters !== false
                                              ? prop!.heldItemFilters.mode === "include"
                                                  ? prop!.heldItemFilters.items.some((item) => data.itemStack?.typeId === (ItemTypes.get(item)?.id ?? item))
                                                  : !prop!.heldItemFilters.items.some((item) => data.itemStack?.typeId === (ItemTypes.get(item)?.id ?? item))
                                              : true) &&
                                          prop!.mask.testIfMatches(data.block, prop!.mode);
                                      break;
                                  }
                                  case "playerInteractWithBlock": {
                                      const prop: Exclude<(typeof category)[typeof categories.advancedCategoryProperty], false> =
                                          category.playerInteractWithBlock as Exclude<(typeof category)[typeof categories.advancedCategoryProperty], false>;
                                      const data = event as preventableEventTypeMap[typeof categories.advancedCategoryProperty];
                                      success =
                                          !prop!.allowedBypassTags.some((tag) => data.player.hasTag(tag)) &&
                                          (prop!.heldItemFilters !== false
                                              ? prop!.heldItemFilters.mode === "include"
                                                  ? prop!.heldItemFilters.items.some((item) => data.itemStack?.typeId === (ItemTypes.get(item)?.id ?? item))
                                                  : !prop!.heldItemFilters.items.some((item) => data.itemStack?.typeId === (ItemTypes.get(item)?.id ?? item))
                                              : true) &&
                                          prop!.mask.testIfMatches(data.block, prop!.mode);
                                      break;
                                  }
                                  case "playerInteractWithEntity": {
                                      const prop: Exclude<(typeof category)[typeof categories.advancedCategoryProperty], false> =
                                          category.playerInteractWithEntity as Exclude<(typeof category)[typeof categories.advancedCategoryProperty], false>;
                                      const data = event as preventableEventTypeMap[typeof categories.advancedCategoryProperty];
                                      success =
                                          !prop!.allowedBypassTags.some((tag) => data.player.hasTag(tag)) &&
                                          (prop!.heldItemFilters !== false
                                              ? prop!.heldItemFilters.mode === "include"
                                                  ? prop!.heldItemFilters.items.some((item) => data.itemStack?.typeId === (ItemTypes.get(item)?.id ?? item))
                                                  : !prop!.heldItemFilters.items.some((item) => data.itemStack?.typeId === (ItemTypes.get(item)?.id ?? item))
                                              : true) &&
                                          ((prop!.targetEntityFilter?.excludeTags ?? []).length === 0
                                              ? prop!.targetEntityFilter?.includeTags?.some((tag) => data.target.hasTag(tag)) ?? true
                                              : !prop!.targetEntityFilter.excludeTags!.some((tag) => data.target.hasTag(tag))) &&
                                          ((prop!.targetEntityFilter?.excludeTypes ?? []).length === 0
                                              ? prop!.targetEntityFilter?.includeTypes?.some(
                                                    (type) => data.target.typeId === (EntityTypes.get(type as any)?.id ?? type)
                                                ) ?? true
                                              : !prop!.targetEntityFilter.excludeTypes!.some(
                                                    (type) => data.target.typeId === (EntityTypes.get(type as any)?.id ?? type)
                                                ));
                                      break;
                                  }
                                  case "itemUse": {
                                      const prop: Exclude<(typeof category)[typeof categories.advancedCategoryProperty], false> = category.itemUse as Exclude<
                                          (typeof category)[typeof categories.advancedCategoryProperty],
                                          false
                                      >;
                                      const data = event as preventableEventTypeMap[typeof categories.advancedCategoryProperty];
                                      success =
                                          !prop!.allowedBypassTags.some((tag) => data.source!.hasTag(tag)) &&
                                          (prop!.heldItemFilters !== false
                                              ? prop!.heldItemFilters.mode === "include"
                                                  ? prop!.heldItemFilters.items.some((item) => data.itemStack?.typeId === (ItemTypes.get(item)?.id ?? item))
                                                  : !prop!.heldItemFilters.items.some((item) => data.itemStack?.typeId === (ItemTypes.get(item)?.id ?? item))
                                              : true);
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
                                              ? !prop!.allowedBypassTags.some((tag) => data.source!.hasTag(tag)) &&
                                                tryget(() =>
                                                    prop!.heldItemFilters !== false
                                                        ? prop!.heldItemFilters.mode === "include"
                                                            ? prop!.heldItemFilters.items.some(
                                                                  (item) => data.source!.heldItem?.typeId === (ItemTypes.get(item)?.id ?? item)
                                                              )
                                                            : !prop!.heldItemFilters.items.some(
                                                                  (item) => data.source!.heldItem?.typeId === (ItemTypes.get(item)?.id ?? item)
                                                              )
                                                        : true
                                                )! &&
                                                ((prop!.sourceEntityFilter?.excludeTags ?? []).length === 0
                                                    ? prop!.sourceEntityFilter?.includeTags?.length === 0
                                                        ? true
                                                        : prop!.sourceEntityFilter?.includeTags?.some((tag) => data.source!.hasTag(tag)) ?? true
                                                    : !prop!.sourceEntityFilter.excludeTags!.some((tag) => data.source!.hasTag(tag))) &&
                                                ((prop!.sourceEntityFilter?.excludeTypes ?? []).length === 0
                                                    ? prop!.sourceEntityFilter?.includeTypes?.length === 0
                                                        ? true
                                                        : prop!.sourceEntityFilter?.includeTypes?.some(
                                                              (type) => data.source!.typeId === (EntityTypes.get(type as any)?.id ?? type)
                                                          ) ?? true
                                                    : !prop!.sourceEntityFilter.excludeTypes!.some(
                                                          (type) => data.source!.typeId === (EntityTypes.get(type as any)?.id ?? type)
                                                      ))
                                              : true) && (extraData?.block !== undefined ? prop!.mask.testIfMatches(extraData.block, prop!.mode) : true);
                                      break;
                                  }
                                  case "chatSend": {
                                      const prop: Exclude<(typeof category)[typeof categories.advancedCategoryProperty], false> = category.chatSend as Exclude<
                                          (typeof category)[typeof categories.advancedCategoryProperty],
                                          false
                                      >;
                                      const data = event as preventableEventTypeMap[typeof categories.advancedCategoryProperty];
                                      success =
                                          !prop!.allowedBypassTags.some((tag) => data.sender.hasTag(tag)) &&
                                          (prop!.heldItemFilters !== false
                                              ? prop!.heldItemFilters.mode === "include"
                                                  ? prop!.heldItemFilters.items.some(
                                                        (item) => data.sender.heldItem?.typeId === (ItemTypes.get(item)?.id ?? item)
                                                    )
                                                  : !prop!.heldItemFilters.items.some(
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
                                          ((prop!.sourceEntityFilter?.excludeTags ?? []).length === 0
                                              ? prop!.sourceEntityFilter?.includeTags?.length === 0
                                                  ? true
                                                  : prop!.sourceEntityFilter?.includeTags?.some((tag) => data.entity.hasTag(tag)) ?? true
                                              : !prop!.sourceEntityFilter.excludeTags!.some((tag) => data.entity.hasTag(tag))) &&
                                          ((prop!.sourceEntityFilter?.excludeTypes ?? []).length === 0
                                              ? prop!.sourceEntityFilter?.includeTypes?.length === 0
                                                  ? true
                                                  : prop!.sourceEntityFilter?.includeTypes?.some(
                                                        (type) => data.entity.typeId === (EntityTypes.get(type as any)?.id ?? type)
                                                    ) ?? true
                                              : !prop!.sourceEntityFilter.excludeTypes!.some(
                                                    (type) => data.entity.typeId === (EntityTypes.get(type as any)?.id ?? type)
                                                )) &&
                                          ((prop!.effectFilter?.excludeTypes ?? []).length === 0
                                              ? prop!.effectFilter?.includeTypes?.length === 0
                                                  ? true
                                                  : prop!.effectFilter?.includeTypes?.some((type) => data.effectType.toLowerCase() === type.toLowerCase()) ??
                                                    true
                                              : !prop!.effectFilter!.excludeTypes!.some((type) => data.effectType.toLowerCase() === type.toLowerCase())) &&
                                          (!Number.isNaN(Number(prop!.effectFilter?.minDuration)) || !Number.isNaN(Number(prop!.effectFilter?.maxDuration))
                                              ? (!Number.isNaN(Number(prop!.effectFilter?.minDuration))
                                                    ? prop!.effectFilter!.minDuration! / 20 <= data.duration
                                                    : true) ||
                                                (!Number.isNaN(Number(prop!.effectFilter?.maxDuration))
                                                    ? prop!.effectFilter!.maxDuration! / 20 >= data.duration
                                                    : true)
                                              : true);
                                      break;
                                  }
                                  case "playerGameModeChange": {
                                      const prop: Exclude<(typeof category)[typeof categories.advancedCategoryProperty], false> =
                                          category.playerGameModeChange as Exclude<(typeof category)[typeof categories.advancedCategoryProperty], false>;
                                      const data = event as preventableEventTypeMap[typeof categories.advancedCategoryProperty];
                                      success =
                                          !prop!.allowedBypassTags.some((tag) => data.player.hasTag(tag)) &&
                                          (prop!.heldItemFilters !== false
                                              ? prop!.heldItemFilters.mode === "include"
                                                  ? prop!.heldItemFilters.items.some(
                                                        (item) => data.player.heldItem?.typeId === (ItemTypes.get(item)?.id ?? item)
                                                    )
                                                  : !prop!.heldItemFilters.items.some(
                                                        (item) => data.player.heldItem?.typeId === (ItemTypes.get(item)?.id ?? item)
                                                    )
                                              : true) &&
                                          (((prop!.fromGameModes ?? []).length !== 0 ? prop!.fromGameModes?.some((mode) => data.fromGameMode === mode) : false) ||
                                          ((prop!.toGameModes ?? []).length !== 0 ? prop!.toGameModes?.some((mode) => data.toGameMode === mode) : false) ||
                                          ((prop!.fromGameModesToGameModes ?? []).length !== 0
                                              ? prop!.fromGameModesToGameModes?.some((mode) => data.fromGameMode === mode[0] && data.toGameMode === mode[1])
                                              : false) ||
                                          ((prop!.fromGameModes ?? []).length === 0 &&
                                              (prop!.toGameModes ?? []).length === 0 &&
                                              (prop!.fromGameModesToGameModes ?? []).length === 0)
                                              ? true
                                              : false);
                                      break;
                                  }
                              }
                              //   console.log(this.preventableEvent, success);
                              if (!success) return false;
                              return new ProtectedAreaCategory("advancedArea", category.id).testIsInArea(location, dimension);
                          })
                    : undefined)) !== undefined
        );
    }
}

/**
 * Represents a category of protected areas with various restrictions.
 *
 * @remarks
 * This class provides methods to manage and query protected areas based on different categories.
 *
 * @example
 * ```typescript
 * const protectedArea = new ProtectedAreaCategory("noBlockBreakArea");
 * protectedArea.loadAreas();
 * const isInProtectedArea = protectedArea.testIsInArea(location, "overworld");
 * ```
 *
 * @public
 */
export class ProtectedAreaCategory {
    /**
     * Represents the category of a protected area.
     *
     * Possible values:
     * - "noPistonExtensionArea": An area where pistons cannot extend.
     * - "noExplosionArea": An area protected from explosions.
     * - "noBlockInteractArea": An area where block interactions are not allowed.
     * - "noInteractArea": An area where interactions are not allowed.
     * - "protectedArea": A general protected area.
     * - "noBlockBreakArea": An area where blocks cannot be broken.
     * - "noBlockPlaceArea": An area where blocks cannot be placed.
     * - "advancedArea": An area with advanced protection settings.
     */
    category:
        | "noPistonExtensionArea"
        | "noExplosionArea"
        | "noBlockInteractArea"
        | "noInteractArea"
        | "protectedArea"
        | "noBlockBreakArea"
        | "noBlockPlaceArea"
        | "advancedArea";
    /**
     * Optional identifier for the advanced category.
     * This can be used to reference a specific category within the advanced settings or configurations.
     *
     * @type {string}
     */
    advancedCategoryID?: string;
    /**
     * Constructs a new instance of the class with the specified category and optional advanced category ID.
     *
     * @param {ProtectedAreaCategory["category"]} category The category of the protected area.
     * @param {ProtectedAreaCategory["advancedCategoryID"]} advancedCategoryID (Optional) The advanced category ID of the protected area.
     */
    constructor(category: ProtectedAreaCategory["category"], advancedCategoryID?: ProtectedAreaCategory["advancedCategoryID"]) {
        this.category = category;
        this.advancedCategoryID = advancedCategoryID;
    }
    /**
     * Retrieves the protected areas based on the current category.
     *
     * @returns An object containing arrays of `ProtectedArea` for each dimension:
     * - `overworld`: An array of protected areas in the overworld.
     * - `nether`: An array of protected areas in the nether.
     * - `the_end`: An array of protected areas in the end.
     */
    getAreas(): { overworld: ProtectedArea[]; nether: ProtectedArea[]; the_end: ProtectedArea[] } {
        if (this.category !== "advancedArea") {
            return ProtectedAreas.areas[this.category];
        } else {
            return ProtectedAreas.areas.advancedArea[this.advancedCategoryID!]!;
        }
    }
    /**
     * Retrieves the protected areas based on the current category and the specified dimension.
     *
     * @param {Dimension | keyof (typeof ProtectedAreas)["areas"][ProtectedAreaCategory["category"]]} dimension - The dimension to retrieve the protected areas for.
     * This can be a string ("overworld", "nether", or "the_end") or a `Dimension` object.
     *
     * @returns {ProtectedArea[]} An array of `ProtectedArea` for the specified dimension.
     */
    getAreasInDimension(dimension: Dimension | keyof (typeof ProtectedAreas)["areas"][ProtectedAreaCategory["category"]]): ProtectedArea[] {
        if (this.category !== "advancedArea") {
            return (
                ProtectedAreas.areas[this.category]?.[
                    typeof dimension === "string" ? dimension : (dimension.id.replace("minecraft:", "") as "overworld" | "nether" | "the_end")
                ] ?? []
            );
        } else {
            return (
                ProtectedAreas.areas.advancedArea[this.advancedCategoryID!]?.[
                    typeof dimension === "string" ? dimension : (dimension.id.replace("minecraft:", "") as "overworld" | "nether" | "the_end")
                ] ?? []
            );
        }
    }
    /**
     * Loads the protected areas for the current category.
     *
     * If the category is not "advancedArea", it loads areas using the built-in category.
     * Otherwise, it loads areas using the advanced category ID.
     */
    loadAreas(): void {
        if (this.category !== "advancedArea") {
            ProtectedAreas.loadAreasForBuiltInCategory(this.category);
        } else {
            ProtectedAreas.loadAreasForAdvancedCategory(this.advancedCategoryID!);
        }
    }
    /**
     * Checks if the specified location is within a protected area of the current category.
     *
     * @param {Vector3} location - The location to check.
     * @param {Dimension | keyof (typeof ProtectedAreas)["areas"][ProtectedAreaCategory["category"]]} dimension - The dimension to check in.
     * This can be a string ("overworld", "nether", or "the_end") or a `Dimension` object.
     *
     * @returns {boolean} `true` if the location is within a protected area, `false` otherwise.
     */
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

/**
 * Loads the protected areas.
 */
ProtectedAreas.load(); /* 

protectedAreaVariables.noPistonExtensionAreas = { positive: [], negative: [] };
protectedAreaVariables.noExplosionAreas = { positive: [], negative: [] };
protectedAreaVariables.noBlockInteractAreas = { positive: [], negative: [] };
protectedAreaVariables.noInteractAreas = { positive: [], negative: [] };
protectedAreaVariables.protectedAreas = { positive: [], negative: [] };
protectedAreaVariables.noBlockBreakAreas = { positive: [], negative: [] };
protectedAreaVariables.noBlockPlaceAreas = { positive: [], negative: [] }; */

// ${se}srun(async()=>{globalThis.protAreas = await import("init/variables/protectedAreaVariables")})
// ${se}let t1 = Date.now(); protAreas.ProtectedAreas.load(); let t2 = Date.now(); dcsend(t2-t1)
// ${se}world.setDynamicProperty("advancedProtectedAreaCategory:test1", JSON.stringify({id: "test1", playerPlaceBlock: {mode: "include", mask: "grass,stone", allowedBypassTags: [], heldItemFilters: {mode: "exclude", items: ["diamond_pickaxe"]}}, playerBreakBlock: {mode: "include", mask: "grass,stone", allowedBypassTags: [], heldItemFilters: {mode: "exclude", items: ["diamond_pickaxe"]}}, playerInteractWithBlock: {mode: "include", mask: "oak_trapdoor,spruce_trapdoor", allowedBypassTags: ["test1AdvancedProtectedAreaCategoryAntiTrapdoorBypass"], heldItemFilters: {mode: "exclude", items: ["diamond_pickaxe"]}}, explosion: false, playerGameModeChange: {allowedBypassTags: [], heldItemFilters: {mode: "exclude", items: ["diamond_pickaxe"]}}, chatSend: false, effectAdd: false}))
// ${se}world.setDynamicProperty("advancedProtectedArea:test1:test1a", JSON.stringify({id: "test1a", dimension: 0, from: {x: 242, y: 81, z: 427}, to: {x: 167, y: 63, z: 367}, mode: 0}))
// ${se}dcsend(protAreas.ProtectedAreas.areas.advancedAreaCategories[0].playerPlaceBlock.mask.blocks, 4)
// ${se}dcsend(protAreas.ProtectedAreas.areas, 4)
