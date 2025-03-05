import type { Block, ChatSendBeforeEvent, EffectAddBeforeEvent, GameMode } from "@minecraft/server";
import { Dimension, ExplosionBeforeEvent, ItemUseBeforeEvent, ItemUseOnBeforeEvent, PlayerBreakBlockBeforeEvent, PlayerGameModeChangeBeforeEvent, PlayerInteractWithBlockBeforeEvent, PlayerInteractWithEntityBeforeEvent, PlayerPlaceBlockBeforeEvent, type Vector3 } from "@minecraft/server";
import { BlockMask } from "modules/commands/classes/BlockMask";
export declare class protectedAreaVariables {
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
    playerPlaceBlock?: false | {
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
        heldItemFilters: false | {
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
    playerBreakBlock?: false | {
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
        heldItemFilters: false | {
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
    playerInteractWithBlock?: false | {
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
        heldItemFilters: false | {
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
    explosion?: false | {
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
        heldItemFilters: false | {
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
    playerGameModeChange?: false | {
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
        heldItemFilters: false | {
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
    chatSend?: false | {
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
        heldItemFilters: false | {
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
    effectAdd?: false | {
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
export declare const AdvancedProtectedAreaCategoryPropertyAllEnabledDefaults: Mutable<{
    readonly enabled: true;
    readonly id: "";
    readonly icon_path: undefined;
    readonly chatSend: {
        readonly enabled: true;
        readonly allowedBypassTags: [];
        readonly heldItemFilters: {
            readonly mode: "exclude";
            readonly items: [];
        };
    };
    readonly effectAdd: {
        readonly enabled: true;
        readonly sourceEntityFilter: {
            readonly includeTypes: [];
            readonly excludeTypes: [];
            readonly includeTags: [];
            readonly excludeTags: [];
        };
        readonly effectFilter: {
            readonly includeTypes: [];
            readonly excludeTypes: [];
            readonly minDuration: undefined;
            readonly maxDuration: undefined;
        };
    };
    readonly explosion: {
        readonly enabled: true;
        readonly allowedBypassTags: [];
        readonly heldItemFilters: {
            readonly mode: "exclude";
            readonly items: [];
        };
        readonly mask: BlockMask;
        readonly rawmask: "none";
        readonly mode: "exclude";
        readonly sourceEntityFilter: {
            readonly includeTypes: [];
            readonly excludeTypes: [];
            readonly includeTags: [];
            readonly excludeTags: [];
        };
    };
    readonly playerBreakBlock: {
        readonly enabled: true;
        readonly allowedBypassTags: [];
        readonly heldItemFilters: {
            readonly mode: "exclude";
            readonly items: [];
        };
        readonly mask: BlockMask;
        readonly rawmask: "none";
        readonly mode: "exclude";
    };
    readonly playerInteractWithBlock: {
        readonly enabled: true;
        readonly allowedBypassTags: [];
        readonly heldItemFilters: {
            readonly mode: "exclude";
            readonly items: [];
        };
        readonly mask: BlockMask;
        readonly rawmask: "none";
        readonly mode: "exclude";
    };
    readonly playerPlaceBlock: {
        readonly enabled: true;
        readonly allowedBypassTags: [];
        readonly heldItemFilters: {
            readonly mode: "exclude";
            readonly items: [];
        };
        readonly mask: BlockMask;
        readonly rawmask: "none";
        readonly mode: "exclude";
    };
    readonly playerGameModeChange: {
        readonly enabled: true;
        readonly allowedBypassTags: [];
        readonly heldItemFilters: {
            readonly mode: "exclude";
            readonly items: [];
        };
    };
}>;
export declare const AdvancedProtectedAreaCategoryPropertyAllEnabledDefaults_JSON: Mutable<{
    readonly enabled: true;
    readonly id: "";
    readonly icon_path: undefined;
    readonly chatSend: {
        readonly enabled: true;
        readonly allowedBypassTags: [];
        readonly heldItemFilters: {
            readonly mode: "exclude";
            readonly items: [];
        };
    };
    readonly effectAdd: {
        readonly enabled: true;
        readonly sourceEntityFilter: {
            readonly includeTypes: [];
            readonly excludeTypes: [];
            readonly includeTags: [];
            readonly excludeTags: [];
        };
        readonly effectFilter: {
            readonly includeTypes: [];
            readonly excludeTypes: [];
            readonly minDuration: undefined;
            readonly maxDuration: undefined;
        };
    };
    readonly explosion: {
        readonly enabled: true;
        readonly allowedBypassTags: [];
        readonly heldItemFilters: {
            readonly mode: "exclude";
            readonly items: [];
        };
        readonly mask: "none";
        readonly rawmask: undefined;
        readonly mode: "exclude";
        readonly sourceEntityFilter: {
            readonly includeTypes: [];
            readonly excludeTypes: [];
            readonly includeTags: [];
            readonly excludeTags: [];
        };
    };
    readonly playerBreakBlock: {
        readonly enabled: true;
        readonly allowedBypassTags: [];
        readonly heldItemFilters: {
            readonly mode: "exclude";
            readonly items: [];
        };
        readonly mask: "none";
        readonly rawmask: undefined;
        readonly mode: "exclude";
    };
    readonly playerInteractWithBlock: {
        readonly enabled: true;
        readonly allowedBypassTags: [];
        readonly heldItemFilters: {
            readonly mode: "exclude";
            readonly items: [];
        };
        readonly mask: "none";
        readonly rawmask: undefined;
        readonly mode: "exclude";
    };
    readonly playerPlaceBlock: {
        readonly enabled: true;
        readonly allowedBypassTags: [];
        readonly heldItemFilters: {
            readonly mode: "exclude";
            readonly items: [];
        };
        readonly mask: "none";
        readonly rawmask: undefined;
        readonly mode: "exclude";
    };
    readonly playerGameModeChange: {
        readonly enabled: true;
        readonly allowedBypassTags: [];
        readonly heldItemFilters: {
            readonly mode: "exclude";
            readonly items: [];
        };
    };
}>;
export declare function convertAdvancedPropertedAreaCategoryToJSON(category: AdvancedProtectedAreaCategory<false>): AdvancedProtectedAreaCategory<true>;
export interface ProtectedArea {
    id: string;
    dimension: number;
    from: Vector3;
    to: Vector3;
    mode: 0 | 1;
    icon_path?: string;
}
export declare const protectedAreaCategories: readonly ["noPistonExtensionArea", "noExplosionArea", "noBlockInteractArea", "noInteractArea", "protectedArea", "noBlockBreakArea", "noBlockPlaceArea"];
export declare class ProtectedAreas {
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
    };
    static load(): void;
    static loadAreasForAllBuiltInCategories(): void;
    static loadAllAdvancedCategoriesAndTheirAreas(): void;
    static loadAreasForAllLoadedAdvancedCategories(): void;
    static loadAreasForBuiltInCategory(category: (typeof protectedAreaCategories)[number]): void;
    static loadAreasForAdvancedCategory(advancedCategoryID: string): void;
    static loadAdvancedCategory(advancedCategoryID: string): void;
    static getAdvancedCategoryIDs(): string[];
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
export declare const advancedCategoryPropertyDisplayNames: {
    readonly playerPlaceBlock: "Block Placement Prevention";
    readonly playerBreakBlock: "Block Breaking Prevention";
    readonly playerInteractWithBlock: "Block Interaction Prevention";
    readonly explosion: "Explosion Prevention";
    readonly playerInteractWithEntity: "Entity Interaction Prevention";
    readonly itemUse: "Item Use Prevention";
    readonly itemUseOn: "Item Use On Prevention";
    readonly playerGameModeChange: "Game Mode Change Prevention";
    readonly chatSend: "Player Chat Message Send Prevention";
    readonly effectAdd: "Entity Effect Add Prevention";
};
export declare class ProtectedAreaTester<T extends "playerPlaceBlock" | "playerBreakBlock" | "playerInteractWithBlock" | "explosion" | "playerInteractWithEntity" | "itemUse" | "itemUseOn" | "playerGameModeChange" | "chatSend" | "effectAdd"> {
    preventableEvent: T;
    constructor(preventaleEvent: T);
    testIsInArea(event: preventableEventTypeMap[T], location: Vector3, dimension: Dimension, extraData?: {
        block?: Block;
    }): boolean;
}
export declare class ProtectedAreaCategory {
    category: "noPistonExtensionArea" | "noExplosionArea" | "noBlockInteractArea" | "noInteractArea" | "protectedArea" | "noBlockBreakArea" | "noBlockPlaceArea" | "advancedArea";
    advancedCategoryID?: string;
    constructor(category: ProtectedAreaCategory["category"], advancedCategoryID?: ProtectedAreaCategory["advancedCategoryID"]);
    getAreas(): {
        overworld: ProtectedArea[];
        nether: ProtectedArea[];
        the_end: ProtectedArea[];
    };
    getAreasInDimension(dimension: Dimension | keyof (typeof ProtectedAreas)["areas"][ProtectedAreaCategory["category"]]): ProtectedArea[];
    loadAreas(): void;
    testIsInArea(location: Vector3, dimension: Dimension | keyof (typeof ProtectedAreas)["areas"][ProtectedAreaCategory["category"]]): boolean;
}
export {};
