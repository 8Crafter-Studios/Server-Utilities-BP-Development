import type { Vector3 } from "@minecraft/server";
import { world, StructureSaveMode, type DimensionLocation, Dimension } from "@minecraft/server";
import { gwdp } from "init/functions/gwdp";
import type { Warp } from "modules/coordinates/interfaces/Warp";
import type { PlayerDataSaveMode } from "modules/player_save/classes/savedPlayer";
import { defaultPlayerMenuLeaderboardStatistics } from "modules/ui/constants/defaultPlayerMenuLeaderboardStatistics";
import { menuButtonIds } from "modules/ui/constants/menuButtonIds";
import type { rankModes } from "modules/chat/constants/rankModes";
import type { playerMenuLeaderboardStatistic, playerMenuLeaderboardStatistic_JSONB } from "modules/ui/types/playerMenuLeaderboardStatistic";
import type { rankEvaluatorModes } from "modules/chat/constants/rankEvaluatorModes";
import type { FilterKey, filterProperties } from "modules/utilities/functions/filterProperties";

namespace exports {
    /**
     * A class containing the configuration information for the add-on.
     * @hideconstructor
     */
    export class config {
        /*
    @log
    @loggedMethod
    greet() {
        console.log(`Hello, my name is 1.`);
    }*/
        /**
         * Whether or not chat commands are enabled.
         *
         * Dynamic Property ID: `andexdbSettings:chatCommandsEnabled`
         *
         * @default true
         *
         * @danger Disabling this setting is highly discouraged.
         */
        public static get chatCommandsEnabled(): boolean {
            return Boolean(world.getDynamicProperty("andexdbSettings:chatCommandsEnabled") ?? true);
        }
        public static set chatCommandsEnabled(enabled: boolean | undefined) {
            world.setDynamicProperty("andexdbSettings:chatCommandsEnabled", enabled ?? true);
        }
        /**
         * The prefix for all built-in chat commands.
         *
         * Dynamic Property ID: `andexdbSettings:chatCommandPrefix`
         *
         * @default "\\"
         */
        public static get chatCommandPrefix(): string {
            return String(world.getDynamicProperty("andexdbSettings:chatCommandPrefix") ?? "\\");
        }
        public static set chatCommandPrefix(prefix: string | undefined) {
            world.setDynamicProperty("andexdbSettings:chatCommandPrefix", prefix ?? "\\");
        }
        /**
         * The list of command prefixes that the add-on will recognize and leave chat messages starting with those alone to allow other chat command add-ons to use them.
         *
         * Dynamic Property ID: `andexdbSettings:validChatCommandPrefixes`
         *
         * @default ""
         */
        public static get validChatCommandPrefixes(): string {
            return String(world.getDynamicProperty("andexdbSettings:validChatCommandPrefixes") ?? "");
        }
        public static set validChatCommandPrefixes(prefixes: string | undefined) {
            world.setDynamicProperty("andexdbSettings:validChatCommandPrefixes", prefixes ?? "");
        }
        /**
         * The action to take when an invalid chat command is entered.
         *
         * 0 = Do Nothing\
         * 1 = Send Message\
         * 2 = Cancel Message\
         * 3 = Warn Player
         *
         * Dynamic Property ID: `andexdbSettings:invalidChatCommandAction`
         *
         * @default 3
         */
        public static get invalidChatCommandAction(): number {
            return isNaN(Number(world.getDynamicProperty("andexdbSettings:invalidChatCommandAction")))
                ? 3
                : Number(world.getDynamicProperty("andexdbSettings:invalidChatCommandAction") ?? 3);
        }
        public static set invalidChatCommandAction(invalidChatCommandAction: number | undefined) {
            world.setDynamicProperty("andexdbSettings:invalidChatCommandAction", invalidChatCommandAction ?? 3);
        }
        /**
         * The save mode for the undo clipboard.
         *
         * Dynamic Property ID: `andexdbSettings:undoClipboardMode`
         *
         * @default "Memory"
         */
        public static get undoClipboardMode(): StructureSaveMode {
            return String(world.getDynamicProperty("andexdbSettings:undoClipboardMode") ?? StructureSaveMode.Memory) as StructureSaveMode;
        }
        public static set undoClipboardMode(undoClipboardMode: StructureSaveMode | undefined) {
            world.setDynamicProperty("andexdbSettings:undoClipboardMode", undoClipboardMode ?? StructureSaveMode.Memory);
        }
        /**
         * The default spawn location for the gametest structures, this is used when spawning in no AI entities and simulated players.
         *
         * Dynamic Property ID: `andexdbSettings:gametestStructureDefaultSpawnLocation`
         *
         * @default
         * ```typescript
         * { x: 1000000000, y: 100, z: 1000000000 }
         * ```
         */
        public static get gametestStructureDefaultSpawnLocation(): Vector3 {
            const v: Vector3 = (world.getDynamicProperty("andexdbSettings:gametestStructureDefaultSpawnLocation") ?? {
                x: 1000000000,
                y: 100,
                z: 1000000000,
            }) as Vector3;
            return (
                tryget(() => ({
                    x: v.x ?? 1000000000,
                    y: v.y ?? 100,
                    z: v.z ?? 1000000000,
                })) ?? ({ x: 1000000000, y: 100, z: 1000000000 } as Vector3)
            );
        }
        public static set gametestStructureDefaultSpawnLocation(gametestStructureDefaultSpawnLocation: Partial<Vector3> | undefined) {
            world.setDynamicProperty("andexdbSettings:gametestStructureDefaultSpawnLocation", {
                x: gametestStructureDefaultSpawnLocation?.x ?? 1000000000,
                y: gametestStructureDefaultSpawnLocation?.y ?? 100,
                z: gametestStructureDefaultSpawnLocation?.z ?? 1000000000,
            });
        }
        /**
         * The location to teleport players when they use the \\spawn command.
         *
         * Dynamic Property ID: `andexdbSettings:spawnCommandLocation`
         *
         * @default
         * ```typescript
         * { x: null, y: null, z: null, dimension: overworld }
         * ```
         */
        public static get spawnCommandLocation(): DimensionLocation | { x: null; y: null; z: null; dimension: Dimension } {
            const v: (Vector3 & { dimension: string }) | { x: null; y: null; z: null; dimension: string } = tryget(() =>
                JSON.parse(String(world.getDynamicProperty("andexdbSettings:spawnCommandLocation") ?? '{x: null, y: null, z: null, dimension: "overworld"}'))
            ) ?? { x: null, y: null, z: null, dimension: "overworld" };
            return (
                tryget(() => ({
                    x: v.x!,
                    y: v.y!,
                    z: v.z!,
                    dimension: (dimensionsf as { [id: string]: Dimension })[String(v.dimension)] ?? overworld,
                })) ?? ({ x: null, y: null, z: null, dimension: overworld } as DimensionLocation | { x: null; y: null; z: null; dimension: Dimension })
            );
        }
        public static set spawnCommandLocation(spawnCommandLocation: DimensionLocation | { x: null; y: null; z: null; dimension: Dimension } | undefined) {
            world.setDynamicProperty(
                "andexdbSettings:spawnCommandLocation",
                JSON.stringify({
                    x: spawnCommandLocation?.x ?? null,
                    y: spawnCommandLocation?.y ?? null,
                    z: spawnCommandLocation?.z ?? null,
                    dimension: spawnCommandLocation?.dimension ?? overworld,
                })
            );
        }
        /**
         * Whether or not players can teleport to spawn using the `\spawn` command when they are in a different dimension than the spawn.
         *
         * Dynamic Property ID: `andexdbSettings:spawnCommandAllowCrossDimensionalTeleport`
         *
         * @default true
         */
        public static get spawnCommandAllowCrossDimensionalTeleport(): boolean {
            return Boolean(world.getDynamicProperty("andexdbSettings:spawnCommandAllowCrossDimensionalTeleport") ?? true);
        }
        public static set spawnCommandAllowCrossDimensionalTeleport(enabled: boolean | undefined) {
            world.setDynamicProperty("andexdbSettings:spawnCommandAllowCrossDimensionalTeleport", enabled ?? true);
        }
        /**
         * The world border settings.
         * @group Subclasses
         */
        public static get worldBorder() {
            /**
             * The world border settings.
             * @hideconstructor
             * @nameOverride worldBorder
             * @parentOverride Globals.config
             * @group Subclasses
             */
            class config_worldBorder {
                /**
                 * The world border settings for the overworld.
                 * @group Subclasses
                 */
                public static get overworld() {
                    /**
                     * The world border settings for the overworld.
                     * @hideconstructor
                     * @nameOverride overworld
                     * @parentOverride Globals.config.worldBorder:class
                     * @group Subclasses
                     */
                    class config_worldBorder_overworld {
                        /**
                         * Whether or not the world border is enabled for the overworld.
                         *
                         * Dynamic Property ID: `andexdbWorldBorderSettings:overworld.enabled`
                         *
                         * @default false
                         */
                        public static get enabled(): boolean {
                            return Boolean(world.getDynamicProperty("andexdbWorldBorderSettings:overworld.enabled") ?? false);
                        }
                        public static set enabled(enabled: boolean | undefined) {
                            world.setDynamicProperty("andexdbWorldBorderSettings:overworld.enabled", enabled ?? false);
                        }
                        /**
                         * The minimum x and z coordinates of the world border for the overworld.
                         *
                         * Dynamic Property ID: `andexdbWorldBorderSettings:overworld.from`
                         *
                         * @default
                         * ```typescript
                         * { x: -29999984, z: -29999984 }
                         * ```
                         */
                        public static get from(): { x: number; z: number } {
                            const pos: { x: number; z: number } = tryget(() =>
                                JSON.parse(String(world.getDynamicProperty("andexdbWorldBorderSettings:overworld.from") ?? "{x: -29999984, z: -29999984}"))
                            ) ?? { x: -29999984, z: -29999984 };
                            return {
                                x: typeof pos.x === "number" && pos.x.isFinite() ? pos.x : -29999984,
                                z: typeof pos.z === "number" && pos.z.isFinite() ? pos.z : -29999984,
                            };
                        }
                        public static set from(from: { x: number; z: number } | { x: null; z: null } | undefined) {
                            world.setDynamicProperty("andexdbWorldBorderSettings:overworld.from", JSON.stringify({ x: -29999984, z: -29999984, ...from }));
                        }
                        /**
                         * The maximum x and z coordinates of the world border for the overworld.
                         *
                         * Dynamic Property ID: `andexdbWorldBorderSettings:overworld.to`
                         *
                         * @default
                         * ```typescript
                         * { x: 29999984, z: 29999984 }
                         * ```
                         */
                        public static get to(): { x: number; z: number } {
                            const pos: { x: number; z: number } = tryget(() =>
                                JSON.parse(String(world.getDynamicProperty("andexdbWorldBorderSettings:overworld.to") ?? "{x: 29999984, z: 29999984}"))
                            ) ?? { x: 29999984, z: 29999984 };
                            return {
                                x: typeof pos.x === "number" && pos.x.isFinite() ? pos.x : 29999984,
                                z: typeof pos.z === "number" && pos.z.isFinite() ? pos.z : 29999984,
                            };
                        }
                        public static set to(to: { x: number; z: number } | { x: null; z: null } | undefined) {
                            world.setDynamicProperty("andexdbWorldBorderSettings:overworld.to", JSON.stringify({ x: 29999984, z: 29999984, ...to }));
                        }
                        /**
                         * The mode of the world border for the overworld.
                         *
                         * `0` - Teleport Players\
                         * `1` - Yeet Players\
                         * `2` - Damage Players
                         *
                         * Dynamic Property ID: `andexdbWorldBorderSettings:overworld.mode`
                         *
                         * @default 1
                         */
                        static get mode(): number {
                            return Number(world.getDynamicProperty("andexdbWorldBorderSettings:overworld.mode") ?? 1);
                        }
                        static set mode(mode: number | undefined) {
                            world.setDynamicProperty("andexdbWorldBorderSettings:overworld.mode", mode ?? 1);
                        }
                        /**
                         * The amount of damage the overworld world border does to players when the {@link mode} is set to `2` (Damage Players).
                         *
                         * Dynamic Property ID: `andexdbWorldBorderSettings:overworld.damageMode.damage`
                         *
                         * @default 1
                         */
                        static get damage(): number {
                            return Number(world.getDynamicProperty("andexdbWorldBorderSettings:overworld.damageMode.damage") ?? 1);
                        }
                        static set damage(damage: number | undefined) {
                            world.setDynamicProperty("andexdbWorldBorderSettings:overworld.damageMode.damage", damage ?? 1);
                        }
                        /**
                         * The amount of horizontal knockback the overworld world border does to players when the {@link mode} is set to `1` (Yeet Players).
                         *
                         * Dynamic Property ID: `andexdbWorldBorderSettings:overworld.knockbackMode.knockbackH`
                         *
                         * @default 2.5
                         */
                        static get knockbackH(): number {
                            return Number(world.getDynamicProperty("andexdbWorldBorderSettings:overworld.knockbackMode.knockbackH") ?? 2.5);
                        }
                        static set knockbackH(horizontalKnockback: number | undefined) {
                            world.setDynamicProperty("andexdbWorldBorderSettings:overworld.knockbackMode.knockbackH", horizontalKnockback ?? 2.5);
                        }
                        /**
                         * The amount of vertical knockback the overworld world border does to players when the {@link mode} is set to `1` (Yeet Players).
                         *
                         * Dynamic Property ID: `andexdbWorldBorderSettings:overworld.knockbackMode.knockbackV`
                         *
                         * @default 1.25
                         */
                        static get knockbackV(): number {
                            return Number(world.getDynamicProperty("andexdbWorldBorderSettings:overworld.knockbackMode.knockbackV") ?? 1.25);
                        }
                        static set knockbackV(verticalKnockback: number | undefined) {
                            world.setDynamicProperty("andexdbWorldBorderSettings:overworld.knockbackMode.knockbackV", verticalKnockback ?? 1.25);
                        }
                        /**
                         * Whether or not to prevent players from interacting with the world outside of the world border for the overworld.
                         *
                         * Dynamic Property ID: `andexdbWorldBorderSettings:overworld.preventWorldInteractionOutsideBorder`
                         *
                         * @default false
                         */
                        static get preventWorldInteractionOutsideBorder(): boolean {
                            return Boolean(world.getDynamicProperty("andexdbWorldBorderSettings:overworld.preventWorldInteractionOutsideBorder") ?? false);
                        }
                        static set preventWorldInteractionOutsideBorder(preventWorldInteractionOutsideBorder: boolean | undefined) {
                            world.setDynamicProperty(
                                "andexdbWorldBorderSettings:overworld.preventWorldInteractionOutsideBorder",
                                preventWorldInteractionOutsideBorder ?? false
                            );
                        }
                        /**
                         * The tint intensity of the world border for the overworld.
                         *
                         * This is how many tint particles will be spawned in front of the player when they are outside of the world border.
                         *
                         * Should be an integer of at least `0`.
                         *
                         * Dynamic Property ID: `andexdbWorldBorderSettings:overworld.tintIntensity`
                         *
                         * @default 1
                         */
                        static get tintIntensity(): number {
                            return Number(world.getDynamicProperty("andexdbWorldBorderSettings:overworld.tintIntensity") ?? 1);
                        }
                        static set tintIntensity(tintIntensity: number | undefined) {
                            world.setDynamicProperty("andexdbWorldBorderSettings:overworld.tintIntensity", tintIntensity ?? 1);
                        }
                        /**
                         * d
                         * @todo
                         */
                        static get warnPlayersInChat(): boolean {
                            return Boolean(world.getDynamicProperty("andexdbWorldBorderSettings:overworld.warnPlayersInChat") ?? false);
                        }
                        /**
                         * c
                         * @todo
                         */
                        static set warnPlayersInChat(warnPlayersInChat: boolean | undefined) {
                            world.setDynamicProperty("andexdbWorldBorderSettings:overworld.warnPlayersInChat", warnPlayersInChat ?? false);
                        }
                        /**
                         * b
                         * @todo
                         */
                        static get showActionbarWarningWhenOutsideBorder(): boolean {
                            return Boolean(world.getDynamicProperty("andexdbWorldBorderSettings:overworld.showActionbarWarningWhenOutsideBorder") ?? false);
                        }
                        /**
                         * a
                         * @todo
                         */
                        static set showActionbarWarningWhenOutsideBorder(showActionbarWarningWhenOutsideBorder: boolean | undefined) {
                            world.setDynamicProperty(
                                "andexdbWorldBorderSettings:overworld.showActionbarWarningWhenOutsideBorder",
                                showActionbarWarningWhenOutsideBorder ?? false
                            );
                        }
                        /**
                         * Whether or not to show tint particles when the player is outside of the world border for the overworld.
                         *
                         * Dynamic Property ID: `andexdbWorldBorderSettings:overworld.showRedScreenOutlineWhenOutsideBorder`
                         *
                         * @default true
                         */
                        static get showRedScreenOutlineWhenOutsideBorder(): boolean {
                            return Boolean(world.getDynamicProperty("andexdbWorldBorderSettings:overworld.showRedScreenOutlineWhenOutsideBorder") ?? true);
                        }
                        static set showRedScreenOutlineWhenOutsideBorder(showRedScreenOutlineWhenOutsideBorder: boolean | undefined) {
                            world.setDynamicProperty(
                                "andexdbWorldBorderSettings:overworld.showRedScreenOutlineWhenOutsideBorder",
                                showRedScreenOutlineWhenOutsideBorder ?? true
                            );
                        }
                        /**
                         * Whether or not to show border particles at the edges of the world border for the overworld.
                         *
                         * Dynamic Property ID: `andexdbWorldBorderSettings:overworld.showBorderParticles`
                         *
                         * @default true
                         */
                        static get showBorderParticles(): boolean {
                            return Boolean(world.getDynamicProperty("andexdbWorldBorderSettings:overworld.showBorderParticles") ?? true);
                        }
                        static set showBorderParticles(showBorderParticles: boolean | undefined) {
                            world.setDynamicProperty("andexdbWorldBorderSettings:overworld.showBorderParticles", showBorderParticles ?? true);
                        }
                        /**
                         * @deprecated
                         */
                        static get useShadersCompatibleBorderParticles(): boolean {
                            return Boolean(world.getDynamicProperty("andexdbWorldBorderSettings:overworld.useShadersCompatibleBorderParticles") ?? false);
                        }
                        /**
                         * @deprecated
                         */
                        static set useShadersCompatibleBorderParticles(useShadersCompatibleBorderParticles: boolean | undefined) {
                            world.setDynamicProperty(
                                "andexdbWorldBorderSettings:overworld.useShadersCompatibleBorderParticles",
                                useShadersCompatibleBorderParticles ?? false
                            );
                        }
                        /**
                         * The minimum distance outside of the overworld world border that the player has to be before they start taking damage when the {@link mode} is set to `2` (Damage Players).
                         *
                         * Dynamic Property ID: `andexdbWorldBorderSettings:overworld.buffer`
                         *
                         * @default 5
                         */
                        static get buffer(): number {
                            return Number(world.getDynamicProperty("andexdbWorldBorderSettings:overworld.buffer") ?? 5);
                        }
                        static set buffer(buffer: number | undefined) {
                            world.setDynamicProperty("andexdbWorldBorderSettings:overworld.buffer", buffer ?? 5);
                        }
                    }
                    return config_worldBorder_overworld;
                }
                /**
                 * The world border settings for the nether.
                 * @group Subclasses
                 */
                static get nether() {
                    /**
                     * The world border settings for the nether.
                     * @hideconstructor
                     * @nameOverride nether
                     * @parentOverride Globals.config.worldBorder:class
                     * @group Subclasses
                     */
                    class config_worldBorder_nether {
                        static get enabled(): boolean {
                            return Boolean(world.getDynamicProperty("andexdbWorldBorderSettings:nether.enabled") ?? false);
                        }
                        static set enabled(enabled: boolean | undefined) {
                            world.setDynamicProperty("andexdbWorldBorderSettings:nether.enabled", enabled ?? false);
                        }
                        static get from(): { x: number; z: number } | { x: null; z: null } {
                            return (
                                tryget(() =>
                                    JSON.parse(String(world.getDynamicProperty("andexdbWorldBorderSettings:nether.from") ?? "{x: -29999984, z: -29999984}"))
                                ) ?? { x: -29999984, z: -29999984 }
                            );
                        }
                        static set from(from: { x: number; z: number } | { x: null; z: null } | undefined) {
                            world.setDynamicProperty("andexdbWorldBorderSettings:nether.from", JSON.stringify(from ?? { x: -29999984, z: -29999984 }));
                        }
                        static get to(): { x: number; z: number } | { x: null; z: null } {
                            return (
                                tryget(() =>
                                    JSON.parse(String(world.getDynamicProperty("andexdbWorldBorderSettings:nether.to") ?? "{x: 29999984, z: 29999984}"))
                                ) ?? { x: 29999984, z: 29999984 }
                            );
                        }
                        static set to(to: { x: number; z: number } | { x: null; z: null } | undefined) {
                            world.setDynamicProperty("andexdbWorldBorderSettings:nether.to", JSON.stringify(to ?? { x: 29999984, z: 29999984 }));
                        }
                        static get mode(): number {
                            return Number(world.getDynamicProperty("andexdbWorldBorderSettings:nether.mode") ?? 1);
                        }
                        static set mode(mode: number | undefined) {
                            world.setDynamicProperty("andexdbWorldBorderSettings:nether.mode", mode ?? 1);
                        }
                        static get damage(): number {
                            return Number(world.getDynamicProperty("andexdbWorldBorderSettings:nether.damageMode.damage") ?? 1);
                        }
                        static set damage(damage: number | undefined) {
                            world.setDynamicProperty("andexdbWorldBorderSettings:nether.damageMode.damage", damage ?? 1);
                        }
                        static get knockbackH(): number {
                            return Number(world.getDynamicProperty("andexdbWorldBorderSettings:nether.knockbackMode.knockbackH") ?? 2.5);
                        }
                        static set knockbackH(horizontalKnockback: number | undefined) {
                            world.setDynamicProperty("andexdbWorldBorderSettings:nether.knockbackMode.knockbackH", horizontalKnockback ?? 2.5);
                        }
                        static get knockbackV(): number {
                            return Number(world.getDynamicProperty("andexdbWorldBorderSettings:nether.knockbackMode.knockbackV") ?? 1.25);
                        }
                        static set knockbackV(verticalKnockback: number | undefined) {
                            world.setDynamicProperty("andexdbWorldBorderSettings:nether.knockbackMode.knockbackV", verticalKnockback ?? 1.25);
                        }
                        static get preventWorldInteractionOutsideBorder(): boolean {
                            return Boolean(world.getDynamicProperty("andexdbWorldBorderSettings:nether.preventWorldInteractionOutsideBorder") ?? false);
                        }
                        static set preventWorldInteractionOutsideBorder(preventWorldInteractionOutsideBorder: boolean | undefined) {
                            world.setDynamicProperty(
                                "andexdbWorldBorderSettings:nether.preventWorldInteractionOutsideBorder",
                                preventWorldInteractionOutsideBorder ?? false
                            );
                        }
                        static get tintIntensity(): number {
                            return Number(world.getDynamicProperty("andexdbWorldBorderSettings:nether.tintIntensity") ?? 1);
                        }
                        static set tintIntensity(tintIntensity: number | undefined) {
                            world.setDynamicProperty("andexdbWorldBorderSettings:nether.tintIntensity", tintIntensity ?? 1);
                        }
                        /**
                         * @todo
                         */
                        static get warnPlayersInChat(): boolean {
                            return Boolean(world.getDynamicProperty("andexdbWorldBorderSettings:nether.warnPlayersInChat") ?? false);
                        }
                        /**
                         * @todo
                         */
                        static set warnPlayersInChat(warnPlayersInChat: boolean | undefined) {
                            world.setDynamicProperty("andexdbWorldBorderSettings:nether.warnPlayersInChat", warnPlayersInChat ?? false);
                        }
                        /**
                         * @todo
                         */
                        static get showActionbarWarningWhenOutsideBorder(): boolean {
                            return Boolean(world.getDynamicProperty("andexdbWorldBorderSettings:nether.showActionbarWarningWhenOutsideBorder") ?? false);
                        }
                        /**
                         * @todo
                         */
                        static set showActionbarWarningWhenOutsideBorder(showActionbarWarningWhenOutsideBorder: boolean | undefined) {
                            world.setDynamicProperty(
                                "andexdbWorldBorderSettings:nether.showActionbarWarningWhenOutsideBorder",
                                showActionbarWarningWhenOutsideBorder ?? false
                            );
                        }
                        static get showRedScreenOutlineWhenOutsideBorder(): boolean {
                            return Boolean(world.getDynamicProperty("andexdbWorldBorderSettings:nether.showRedScreenOutlineWhenOutsideBorder") ?? true);
                        }
                        static set showRedScreenOutlineWhenOutsideBorder(showRedScreenOutlineWhenOutsideBorder: boolean | undefined) {
                            world.setDynamicProperty(
                                "andexdbWorldBorderSettings:nether.showRedScreenOutlineWhenOutsideBorder",
                                showRedScreenOutlineWhenOutsideBorder ?? true
                            );
                        }
                        static get showBorderParticles(): boolean {
                            return Boolean(world.getDynamicProperty("andexdbWorldBorderSettings:nether.showBorderParticles") ?? true);
                        }
                        static set showBorderParticles(showBorderParticles: boolean | undefined) {
                            world.setDynamicProperty("andexdbWorldBorderSettings:nether.showBorderParticles", showBorderParticles ?? true);
                        }
                        /**
                         * @deprecated
                         */
                        static get useShadersCompatibleBorderParticles(): boolean {
                            return Boolean(world.getDynamicProperty("andexdbWorldBorderSettings:nether.useShadersCompatibleBorderParticles") ?? false);
                        }
                        /**
                         * @deprecated
                         */
                        static set useShadersCompatibleBorderParticles(useShadersCompatibleBorderParticles: boolean | undefined) {
                            world.setDynamicProperty(
                                "andexdbWorldBorderSettings:nether.useShadersCompatibleBorderParticles",
                                useShadersCompatibleBorderParticles ?? false
                            );
                        }
                        static get buffer(): number {
                            return Number(world.getDynamicProperty("andexdbWorldBorderSettings:nether.buffer") ?? 5);
                        }
                        static set buffer(buffer: number | undefined) {
                            world.setDynamicProperty("andexdbWorldBorderSettings:nether.buffer", buffer ?? 5);
                        }
                    }
                    return config_worldBorder_nether;
                }
                /**
                 * The world border settings for the end.
                 * @group Subclasses
                 */
                static get the_end() {
                    /**
                     * The world border settings for the end.
                     * @hideconstructor
                     * @nameOverride the_end
                     * @parentOverride Globals.config.worldBorder:class
                     * @group Subclasses
                     */
                    class config_worldBorder_the_end {
                        static get enabled(): boolean {
                            return Boolean(world.getDynamicProperty("andexdbWorldBorderSettings:the_end.enabled") ?? false);
                        }
                        static set enabled(enabled: boolean | undefined) {
                            world.setDynamicProperty("andexdbWorldBorderSettings:the_end.enabled", enabled ?? false);
                        }
                        static get from(): { x: number; z: number } | { x: null; z: null } {
                            return (
                                tryget(() =>
                                    JSON.parse(String(world.getDynamicProperty("andexdbWorldBorderSettings:the_end.from") ?? "{x: -29999984, z: -29999984}"))
                                ) ?? { x: -29999984, z: -29999984 }
                            );
                        }
                        static set from(from: { x: number; z: number } | { x: null; z: null } | undefined) {
                            world.setDynamicProperty("andexdbWorldBorderSettings:the_end.from", JSON.stringify(from ?? { x: -29999984, z: -29999984 }));
                        }
                        static get to(): { x: number; z: number } | { x: null; z: null } {
                            return (
                                tryget(() =>
                                    JSON.parse(String(world.getDynamicProperty("andexdbWorldBorderSettings:the_end.to") ?? "{x: 29999984, z: 29999984}"))
                                ) ?? { x: 29999984, z: 29999984 }
                            );
                        }
                        static set to(to: { x: number; z: number } | { x: null; z: null } | undefined) {
                            world.setDynamicProperty("andexdbWorldBorderSettings:the_end.to", JSON.stringify(to ?? { x: 29999984, z: 29999984 }));
                        }
                        static get mode(): number {
                            return Number(world.getDynamicProperty("andexdbWorldBorderSettings:the_end.mode") ?? 1);
                        }
                        static set mode(mode: number | undefined) {
                            world.setDynamicProperty("andexdbWorldBorderSettings:the_end.mode", mode ?? 1);
                        }
                        static get damage(): number {
                            return Number(world.getDynamicProperty("andexdbWorldBorderSettings:the_end.damageMode.damage") ?? 1);
                        }
                        static set damage(damage: number | undefined) {
                            world.setDynamicProperty("andexdbWorldBorderSettings:the_end.damageMode.damage", damage ?? 1);
                        }
                        static get knockbackH(): number {
                            return Number(world.getDynamicProperty("andexdbWorldBorderSettings:the_end.knockbackMode.knockbackH") ?? 2.5);
                        }
                        static set knockbackH(horizontalKnockback: number | undefined) {
                            world.setDynamicProperty("andexdbWorldBorderSettings:the_end.knockbackMode.knockbackH", horizontalKnockback ?? 2.5);
                        }
                        static get knockbackV(): number {
                            return Number(world.getDynamicProperty("andexdbWorldBorderSettings:the_end.knockbackMode.knockbackV") ?? 1.25);
                        }
                        static set knockbackV(verticalKnockback: number | undefined) {
                            world.setDynamicProperty("andexdbWorldBorderSettings:the_end.knockbackMode.knockbackV", verticalKnockback ?? 1.25);
                        }
                        static get preventWorldInteractionOutsideBorder(): boolean {
                            return Boolean(world.getDynamicProperty("andexdbWorldBorderSettings:the_end.preventWorldInteractionOutsideBorder") ?? false);
                        }
                        static set preventWorldInteractionOutsideBorder(preventWorldInteractionOutsideBorder: boolean | undefined) {
                            world.setDynamicProperty(
                                "andexdbWorldBorderSettings:the_end.preventWorldInteractionOutsideBorder",
                                preventWorldInteractionOutsideBorder ?? false
                            );
                        }
                        static get tintIntensity(): number {
                            return Number(world.getDynamicProperty("andexdbWorldBorderSettings:the_end.tintIntensity") ?? 1);
                        }
                        static set tintIntensity(tintIntensity: number | undefined) {
                            world.setDynamicProperty("andexdbWorldBorderSettings:the_end.tintIntensity", tintIntensity ?? 1);
                        }
                        /**
                         * @todo
                         */
                        static get warnPlayersInChat(): boolean {
                            return Boolean(world.getDynamicProperty("andexdbWorldBorderSettings:the_end.warnPlayersInChat") ?? false);
                        }
                        /**
                         * @todo
                         */
                        static set warnPlayersInChat(warnPlayersInChat: boolean | undefined) {
                            world.setDynamicProperty("andexdbWorldBorderSettings:the_end.warnPlayersInChat", warnPlayersInChat ?? false);
                        }
                        /**
                         * @todo
                         */
                        static get showActionbarWarningWhenOutsideBorder(): boolean {
                            return Boolean(world.getDynamicProperty("andexdbWorldBorderSettings:the_end.showActionbarWarningWhenOutsideBorder") ?? false);
                        }
                        /**
                         * @todo
                         */
                        static set showActionbarWarningWhenOutsideBorder(showActionbarWarningWhenOutsideBorder: boolean | undefined) {
                            world.setDynamicProperty(
                                "andexdbWorldBorderSettings:the_end.showActionbarWarningWhenOutsideBorder",
                                showActionbarWarningWhenOutsideBorder ?? false
                            );
                        }
                        static get showRedScreenOutlineWhenOutsideBorder(): boolean {
                            return Boolean(world.getDynamicProperty("andexdbWorldBorderSettings:the_end.showRedScreenOutlineWhenOutsideBorder") ?? true);
                        }
                        static set showRedScreenOutlineWhenOutsideBorder(showRedScreenOutlineWhenOutsideBorder: boolean | undefined) {
                            world.setDynamicProperty(
                                "andexdbWorldBorderSettings:the_end.showRedScreenOutlineWhenOutsideBorder",
                                showRedScreenOutlineWhenOutsideBorder ?? true
                            );
                        }
                        static get showBorderParticles(): boolean {
                            return Boolean(world.getDynamicProperty("andexdbWorldBorderSettings:the_end.showBorderParticles") ?? true);
                        }
                        static set showBorderParticles(showBorderParticles: boolean | undefined) {
                            world.setDynamicProperty("andexdbWorldBorderSettings:the_end.showBorderParticles", showBorderParticles ?? true);
                        }
                        /**
                         * @deprecated
                         */
                        static get useShadersCompatibleBorderParticles(): boolean {
                            return Boolean(world.getDynamicProperty("andexdbWorldBorderSettings:the_end.useShadersCompatibleBorderParticles") ?? false);
                        }
                        /**
                         * @deprecated
                         */
                        static set useShadersCompatibleBorderParticles(useShadersCompatibleBorderParticles: boolean | undefined) {
                            world.setDynamicProperty(
                                "andexdbWorldBorderSettings:the_end.useShadersCompatibleBorderParticles",
                                useShadersCompatibleBorderParticles ?? false
                            );
                        }
                        static get buffer(): number {
                            return Number(world.getDynamicProperty("andexdbWorldBorderSettings:the_end.buffer") ?? 5);
                        }
                        static set buffer(buffer: number | undefined) {
                            world.setDynamicProperty("andexdbWorldBorderSettings:the_end.buffer", buffer ?? 5);
                        }
                    }
                    return config_worldBorder_the_end;
                }
            }
            return config_worldBorder;
        }
        /**
         * The shop system settings.
         * @group Subclasses
         */
        static get shopSystem() {
            /**
             * The shop system settings.
             * @hideconstructor
             * @nameOverride shopSystem
             * @parentOverride Globals.config
             * @group Subclasses
             */
            class config_shopSystem {
                /**
                 * The server shop system settings.
                 * @group Subclasses
                 */
                static get server() {
                    /**
                     * The server shop system settings.
                     * @hideconstructor
                     * @nameOverride server
                     * @parentOverride Globals.config.shopSystem:class
                     * @group Subclasses
                     */
                    class config_shopSystem_server {
                        /**
                         * Whether or not the server shop system is enabled.
                         *
                         * Dynamic Property ID: `andexdbShopSystemSettings:server.enabled`
                         *
                         * @default false
                         */
                        static get enabled(): boolean {
                            return Boolean(world.getDynamicProperty("andexdbShopSystemSettings:server.enabled") ?? false);
                        }
                        static set enabled(enabled: boolean | undefined) {
                            world.setDynamicProperty("andexdbShopSystemSettings:server.enabled", enabled ?? false);
                        }
                    }
                    return config_shopSystem_server;
                }
                /**
                 * The player shop system settings.
                 * @group Subclasses
                 */
                static get player() {
                    /**
                     * The player shop system settings.
                     * @hideconstructor
                     * @nameOverride player
                     * @parentOverride Globals.config.shopSystem:class
                     * @group Subclasses
                     */
                    class config_shopSystem_player {
                        /**
                         * Whether or not the player shop system is enabled.
                         *
                         * Dynamic Property ID: `andexdbShopSystemSettings:player.enabled`
                         *
                         * @default false
                         */
                        static get enabled(): boolean {
                            return Boolean(world.getDynamicProperty("andexdbShopSystemSettings:player.enabled") ?? false);
                        }
                        static set enabled(enabled: boolean | undefined) {
                            world.setDynamicProperty("andexdbShopSystemSettings:player.enabled", enabled ?? false);
                        }
                        /**
                         * The maximum amount of shops a player can have.
                         *
                         * Dynamic Property ID: `andexdbShopSystemSettings:player.maxShopsPerPlayer`
                         *
                         * @default 5
                         */
                        static get maxShopsPerPlayer(): number {
                            return (world.getDynamicProperty("andexdbShopSystemSettings:player.maxShopsPerPlayer") ?? 5).toString().toNumber() ?? 5;
                        }
                        static set maxShopsPerPlayer(maxShopsPerPlayer: number | undefined) {
                            world.setDynamicProperty("andexdbShopSystemSettings:player.maxShopsPerPlayer", maxShopsPerPlayer ?? 5);
                        }
                        /**
                         * Whether or not players can sell items that are locked to a specific slot in their inventory.
                         *
                         * Dynamic Property ID: `andexdbShopSystemSettings:player.allowSellingLockInSlotItems`
                         *
                         * @default false
                         */
                        static get allowSellingLockInSlotItems(): boolean {
                            return Boolean(world.getDynamicProperty("andexdbShopSystemSettings:player.allowSellingLockInSlotItems") ?? false);
                        }
                        static set allowSellingLockInSlotItems(allowSellingLockInSlotItems: boolean | undefined) {
                            world.setDynamicProperty("andexdbShopSystemSettings:player.allowSellingLockInSlotItems", allowSellingLockInSlotItems ?? false);
                        }
                        /**
                         * Whether or not players can sell items that are locked to inventory.
                         *
                         * Dynamic Property ID: `andexdbShopSystemSettings:player.allowSellingLockInInventoryItems`
                         *
                         * @default false
                         */
                        static get allowSellingLockInInventoryItems(): boolean {
                            return Boolean(world.getDynamicProperty("andexdbShopSystemSettings:player.allowSellingLockInInventoryItems") ?? false);
                        }
                        static set allowSellingLockInInventoryItems(allowSellingLockInInventoryItems: boolean | undefined) {
                            world.setDynamicProperty(
                                "andexdbShopSystemSettings:player.allowSellingLockInInventoryItems",
                                allowSellingLockInInventoryItems ?? false
                            );
                        }
                        /**
                         * Whether or not players can sell items that have the keepOnDeath component set to true.
                         *
                         * Dynamic Property ID: `andexdbShopSystemSettings:player.allowSellingKeepOnDeathItems`
                         *
                         * @default true
                         */
                        static get allowSellingKeepOnDeathItems(): boolean {
                            return Boolean(world.getDynamicProperty("andexdbShopSystemSettings:player.allowSellingKeepOnDeathItems") ?? true);
                        }
                        static set allowSellingKeepOnDeathItems(allowSellingKeepOnDeathItems: boolean | undefined) {
                            world.setDynamicProperty("andexdbShopSystemSettings:player.allowSellingKeepOnDeathItems", allowSellingKeepOnDeathItems ?? true);
                        }
                    }
                    return config_shopSystem_player;
                }
                /**
                 * The sign shop system settings.
                 * @alpha
                 * @unused The sign shop system has not been implemented yet.
                 * @group Subclasses
                 */
                static get sign() {
                    /**
                     * The sign shop system settings.
                     * @hideconstructor
                     * @nameOverride sign
                     * @parentOverride Globals.config.shopSystem:class
                     * @alpha
                     * @unused
                     * @group Subclasses
                     */
                    class config_shopSystem_sign {
                        /**
                         * Whether or not the sign shop system is enabled.
                         *
                         * Dynamic Property ID: `andexdbShopSystemSettings:sign.enabled`
                         *
                         * @alpha
                         * @unused
                         *
                         * @default false
                         */
                        static get enabled(): boolean {
                            return Boolean(world.getDynamicProperty("andexdbShopSystemSettings:sign.enabled") ?? false);
                        }
                        static set enabled(enabled: boolean | undefined) {
                            world.setDynamicProperty("andexdbShopSystemSettings:sign.enabled", enabled ?? false);
                        }
                    }
                    return config_shopSystem_sign;
                }
            }
            return config_shopSystem;
        }
        /**
         * The settings for all teleportation related systems, features, and commands of that add-on that are available to regular players.
         * @group Subclasses
         */
        static get teleportSystems() {
            /**
             * The settings for all teleportation related systems, features, and commands of that add-on that are available to regular players.
             * @hideconstructor
             * @nameOverride teleportSystems
             * @parentOverride Globals.config
             * @group Subclasses
             */
            class config_teleportSystems {
                /**
                 * Whether or not cross-dimensional teleports are allowed.
                 *
                 * Affects all types of teleports that regular players can use, including but not limited to the home system, TPA system, and the `\spawn` command.
                 *
                 * Overrides the `allowCrossDimensionalTeleport` options for the home system, TPA system, and `\spawn` command.
                 *
                 * Dynamic Property ID: `teleportSystemsSettings:allowCrossDimensionalTeleport`
                 *
                 * @default true
                 */
                static get allowCrossDimensionalTeleport(): boolean {
                    return Boolean(world.getDynamicProperty("teleportSystemsSettings:allowCrossDimensionalTeleport") ?? true);
                }
                static set allowCrossDimensionalTeleport(enabled: boolean | undefined) {
                    world.setDynamicProperty("teleportSystemsSettings:allowCrossDimensionalTeleport", enabled ?? true);
                }
                /**
                 * How long in seconds after teleporting that the player has to wait before they can teleport again.
                 *
                 * Set it to 0 to have no teleport cooldown.
                 *
                 * Dynamic Property ID: `homeSystemSettings:teleportCooldown`
                 *
                 * @default 30
                 */
                static get teleportCooldown(): number {
                    return Number(world.getDynamicProperty("homeSystemSettings:teleportCooldown") ?? 30);
                }
                static set teleportCooldown(maxHomes: number | undefined) {
                    world.setDynamicProperty("homeSystemSettings:teleportCooldown", maxHomes ?? 30);
                }
                /**
                 * How long in seconds that the player has to stand still before they can teleport, if they move during this time period, the teleportation is canceled.
                 *
                 * Set it to 0 to have players teleport instantly.
                 *
                 * Dynamic Property ID: `homeSystemSettings:standStillTimeToTeleport`
                 *
                 * @default 5
                 */
                static get standStillTimeToTeleport(): number {
                    return Number(world.getDynamicProperty("homeSystemSettings:standStillTimeToTeleport") ?? 5);
                }
                static set standStillTimeToTeleport(maxHomes: number | undefined) {
                    world.setDynamicProperty("homeSystemSettings:standStillTimeToTeleport", maxHomes ?? 5);
                }
                /**
                 * How long in seconds after getting damaged by another player that the player has to wait before they can teleport with the player menu or commands such as `\spawn`, `\home`, `\gohome`, `\tpa`, and `\rtp`.
                 *
                 * Set it to 0 to have no PVP cooldown.
                 *
                 * Dynamic Property ID: `andexdbSettings:pvpCooldownToTeleport`
                 *
                 * @default 15
                 */
                static get pvpCooldownToTeleport(): number {
                    return isNaN(Number(world.getDynamicProperty("andexdbSettings:pvpCooldownToTeleport")))
                        ? 15
                        : Number(world.getDynamicProperty("andexdbSettings:pvpCooldownToTeleport") ?? 15);
                }
                static set pvpCooldownToTeleport(invalidChatCommandAction: number | undefined) {
                    world.setDynamicProperty("andexdbSettings:pvpCooldownToTeleport", invalidChatCommandAction ?? 15);
                }
            }
            return config_teleportSystems;
        }
        /**
         * The home system settings.
         * @group Subclasses
         */
        static get homeSystem() {
            /**
             * The home system settings.
             * @hideconstructor
             * @nameOverride homeSystem
             * @parentOverride Globals.config
             * @group Subclasses
             */
            class config_homeSystem {
                /**
                 * Whether or not the home system is enabled.
                 *
                 * Dynamic Property ID: `homeSystemSettings:homeSystemEnabled`
                 *
                 * @default true
                 */
                static get homeSystemEnabled(): boolean {
                    return Boolean(world.getDynamicProperty("homeSystemSettings:homeSystemEnabled") ?? true);
                }
                static set homeSystemEnabled(enabled: boolean | undefined) {
                    world.setDynamicProperty("homeSystemSettings:homeSystemEnabled", enabled ?? true);
                }
                /**
                 * The maximum number of homes a player can have.
                 *
                 * Dynamic Property ID: `homeSystemSettings:maxHomesPerPlayer`
                 *
                 * @default Infinity
                 */
                static get maxHomesPerPlayer(): number {
                    return world.getDynamicProperty("homeSystemSettings:maxHomesPerPlayer") == -1
                        ? Infinity
                        : Number(world.getDynamicProperty("homeSystemSettings:maxHomesPerPlayer") ?? Infinity);
                }
                static set maxHomesPerPlayer(maxHomes: number | undefined) {
                    world.setDynamicProperty("homeSystemSettings:maxHomesPerPlayer", (maxHomes ?? Infinity) == Infinity ? -1 : maxHomes);
                }
                /**
                 * Whether or not you can teleport to a home that is in a different dimension than you.
                 *
                 * Dynamic Property ID: `homeSystemSettings:allowCrossDimensionalTeleport`
                 *
                 * @default true
                 */
                static get allowCrossDimensionalTeleport(): boolean {
                    return Boolean(world.getDynamicProperty("homeSystemSettings:allowCrossDimensionalTeleport") ?? true);
                }
                static set allowCrossDimensionalTeleport(enabled: boolean | undefined) {
                    world.setDynamicProperty("homeSystemSettings:allowCrossDimensionalTeleport", enabled ?? true);
                }
                /**
                 * Whether or not homes are allowed in dimensions other than the overworld.
                 *
                 * Dynamic Property ID: `homeSystemSettings:allowHomesInOtherDimensions`
                 *
                 * @default true
                 */
                static get allowHomesInOtherDimensions(): boolean {
                    return Boolean(world.getDynamicProperty("homeSystemSettings:allowHomesInOtherDimensions") ?? true);
                }
                static set allowHomesInOtherDimensions(enabled: boolean | undefined) {
                    world.setDynamicProperty("homeSystemSettings:allowHomesInOtherDimensions", enabled ?? true);
                }
            }
            return config_homeSystem;
        }
        /**
         * The teleport request system settings.
         * @group Subclasses
         */
        static get tpaSystem() {
            /**
             * The teleport request system settings.
             * @hideconstructor
             * @nameOverride tpaSystem
             * @parentOverride Globals.config
             * @group Subclasses
             */
            class config_tpaSystem {
                /**
                 * Whether or not the teleport request system is enabled.
                 *
                 * Dynamic Property ID: `tpaSystemSettings:tpaSystemEnabled`
                 *
                 * @default true
                 */
                static get tpaSystemEnabled(): boolean {
                    return Boolean(
                        world.getDynamicProperty("tpaSystemSettings:tpaSystemEnabled") ?? world.getDynamicProperty("rtpSystemSettings:rtpSystemEnabled") ?? true
                    );
                }
                static set tpaSystemEnabled(enabled: boolean | undefined) {
                    world.setDynamicProperty("tpaSystemSettings:tpaSystemEnabled", enabled ?? true);
                }
                /**
                 * The number of seconds after a teleport request is sent before it will time out.
                 *
                 * Dynamic Property ID: `tpaSystemSettings:timeoutDuration`
                 *
                 * @default 60
                 */
                static get timeoutDuration(): number {
                    return isNaN(Number(world.getDynamicProperty("tpaSystemSettings:timeoutDuration")))
                        ? 60
                        : Number(world.getDynamicProperty("tpaSystemSettings:timeoutDuration") ?? 60);
                }
                static set timeoutDuration(timeoutDuration: number | undefined) {
                    world.setDynamicProperty("tpaSystemSettings:timeoutDuration", timeoutDuration ?? 60);
                }
                /**
                 * Whether or not you can teleport to a player who is in a different dimension than you.
                 *
                 * Dynamic Property ID: `tpaSystemSettings:allowCrossDimensionalTeleport`
                 *
                 * @default true
                 */
                static get allowCrossDimensionalTeleport(): boolean {
                    return Boolean(world.getDynamicProperty("tpaSystemSettings:allowCrossDimensionalTeleport") ?? true);
                }
                static set allowCrossDimensionalTeleport(enabled: boolean | undefined) {
                    world.setDynamicProperty("tpaSystemSettings:allowCrossDimensionalTeleport", enabled ?? true);
                }
            }
            return config_tpaSystem;
        }
        /**
         * The chat and name tags settings.
         * @group Subclasses
         */
        static get chatRanks() {
            /**
             * The chat and name tags settings.
             * @hideconstructor
             * @nameOverride chatRanks
             * @parentOverride Globals.config
             * @group Subclasses
             */
            class config_chatRanks {
                static get chatRankPrefix(): string {
                    return String(world.getDynamicProperty("andexdbSettings:chatRankPrefix") ?? "rank:");
                }
                static set chatRankPrefix(chatRankPrefix: string | undefined) {
                    world.setDynamicProperty("andexdbSettings:chatRankPrefix", chatRankPrefix ?? "rank:");
                }
                static get chatSudoPrefix(): string {
                    return String(world.getDynamicProperty("andexdbSettings:chatSudoPrefix") ?? "sudo:");
                }
                static set chatSudoPrefix(chatSudoPrefix: string | undefined) {
                    world.setDynamicProperty("andexdbSettings:chatSudoPrefix", chatSudoPrefix ?? "sudo:");
                }
                static get chatDisplayTimeStamp(): boolean {
                    return Boolean(world.getDynamicProperty("andexdbSettings:chatDisplayTimeStamp") ?? false);
                }
                static set chatDisplayTimeStamp(chatDisplayTimeStampEnabled: boolean | undefined) {
                    world.setDynamicProperty("andexdbSettings:chatDisplayTimeStamp", chatDisplayTimeStampEnabled ?? false);
                }
                static get showRanksOnPlayerNameTags(): boolean {
                    return Boolean(world.getDynamicProperty("andexdbSettings:showRanksOnPlayerNameTags") ?? false);
                }
                static set showRanksOnPlayerNameTags(showRanksOnPlayerNameTags: boolean | undefined) {
                    world.setDynamicProperty("andexdbSettings:showRanksOnPlayerNameTags", showRanksOnPlayerNameTags ?? false);
                }
                static get showHealthOnPlayerNameTags(): boolean {
                    return Boolean(world.getDynamicProperty("andexdbSettings:showHealthOnPlayerNameTags") ?? false);
                }
                static set showHealthOnPlayerNameTags(showHealthOnPlayerNameTags: boolean | undefined) {
                    world.setDynamicProperty("andexdbSettings:showHealthOnPlayerNameTags", showHealthOnPlayerNameTags ?? false);
                }
                /**
                 * The maximum number of decimal places to display on the health display on player name tags.
                 *
                 * Must be between 0 and 20 (inclusive).
                 *
                 * Dynamic Property ID: `andexdbSettings:playerNameTagHealthPrecision`
                 *
                 * @default 1
                 */
                static get playerNameTagHealthPrecision(): 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 {
                    return Math.min(Math.max(0, String(world.getDynamicProperty("andexdbSettings:playerNameTagHealthPrecision") ?? 1).toNumber() ?? 1), 20) as
                        | 0
                        | 1
                        | 2
                        | 3
                        | 4
                        | 5
                        | 6
                        | 7
                        | 8
                        | 9
                        | 10
                        | 11
                        | 12
                        | 13
                        | 14
                        | 15
                        | 16
                        | 17
                        | 18
                        | 19
                        | 20;
                }
                static set playerNameTagHealthPrecision(playerNameTagHealthPrecision: number | undefined) {
                    world.setDynamicProperty(
                        "andexdbSettings:playerNameTagHealthPrecision",
                        Math.min(
                            Math.max(
                                0,
                                typeof playerNameTagHealthPrecision === "number"
                                    ? playerNameTagHealthPrecision.isFinite()
                                        ? playerNameTagHealthPrecision
                                        : 1
                                    : 1
                            ),
                            20
                        )
                    );
                }
                static get rankMode(): keyof typeof rankModes {
                    return String(world.getDynamicProperty("andexdbSettings:rankMode") ?? "custom_simple") as keyof typeof rankModes;
                }
                static set rankMode(rankMode: keyof typeof rankModes | undefined) {
                    world.setDynamicProperty("andexdbSettings:rankMode", rankMode ?? "custom_simple");
                }
                static get rankEvaluatorMode_chat(): (typeof rankEvaluatorModes)[number] {
                    return String(world.getDynamicProperty("andexdbSettings:rankEvaluatorMode_chat") ?? "default") as (typeof rankEvaluatorModes)[number];
                }
                static set rankEvaluatorMode_chat(rankEvaluatorMode_chat: (typeof rankEvaluatorModes)[number] | undefined) {
                    world.setDynamicProperty("andexdbSettings:rankEvaluatorMode_chat", rankEvaluatorMode_chat ?? "default");
                }
                static get rankEvaluatorMode_nameTags(): (typeof rankEvaluatorModes)[number] {
                    return String(world.getDynamicProperty("andexdbSettings:rankEvaluatorMode_nameTags") ?? "default") as (typeof rankEvaluatorModes)[number];
                }
                static set rankEvaluatorMode_nameTags(rankEvaluatorMode_nameTags: (typeof rankEvaluatorModes)[number] | undefined) {
                    world.setDynamicProperty("andexdbSettings:rankEvaluatorMode_nameTags", rankEvaluatorMode_nameTags ?? "default");
                }
                static get rankDisplayPrefix(): string {
                    return String(world.getDynamicProperty("andexdbSettings:rankDisplayPrefix") ?? "[");
                }
                static set rankDisplayPrefix(rankDisplayPrefix: string | undefined) {
                    world.setDynamicProperty("andexdbSettings:rankDisplayPrefix", rankDisplayPrefix ?? "[");
                }
                static get rankDisplaySuffix(): string {
                    return String(world.getDynamicProperty("andexdbSettings:rankDisplaySuffix") ?? "§r]");
                }
                static set rankDisplaySuffix(rankDisplaySuffix: string | undefined) {
                    world.setDynamicProperty("andexdbSettings:rankDisplaySuffix", rankDisplaySuffix ?? "§r]");
                }
                static get nameDisplayPrefix(): string {
                    return String(world.getDynamicProperty("andexdbSettings:nameDisplayPrefix") ?? "[");
                }
                static set nameDisplayPrefix(nameDisplayPrefix: string | undefined) {
                    world.setDynamicProperty("andexdbSettings:nameDisplayPrefix", nameDisplayPrefix ?? "<");
                }
                static get nameDisplaySuffix(): string {
                    return String(world.getDynamicProperty("andexdbSettings:nameDisplaySuffix") ?? "§r]");
                }
                static set nameDisplaySuffix(nameDisplaySuffix: string | undefined) {
                    world.setDynamicProperty("andexdbSettings:nameDisplaySuffix", nameDisplaySuffix ?? "§r>");
                }
                static get chatNameAndMessageSeparator(): string {
                    return String(world.getDynamicProperty("andexdbSettings:chatNameAndMessageSeparator") ?? " ");
                }
                static set chatNameAndMessageSeparator(chatNameAndMessageSeparator: string | undefined) {
                    world.setDynamicProperty("andexdbSettings:chatNameAndMessageSeparator", chatNameAndMessageSeparator ?? " ");
                }
                static get rankDisplaySeparator(): string {
                    return String(world.getDynamicProperty("andexdbSettings:rankDisplaySeparator") ?? " ");
                }
                static set rankDisplaySeparator(rankDisplaySeparator: string | undefined) {
                    world.setDynamicProperty("andexdbSettings:rankDisplaySeparator", rankDisplaySeparator ?? " ");
                }
                /**
                 * The template string for displaying a player's dimension in the chat.
                 *
                 * Only applies in Custom(Advanced) mode.
                 *
                 * @todo
                 *
                 * @default "[${dimension}§r] "
                 */
                static get chatDimensionTemplateString(): string {
                    return String(world.getDynamicProperty("andexdbSettings:chatDimensionTemplateString") ?? "[${dimension}§r] ");
                }
                static set chatDimensionTemplateString(chatDimensionTemplateString: string | undefined) {
                    world.setDynamicProperty("andexdbSettings:chatDimensionTemplateString", chatDimensionTemplateString ?? "[${dimension}§r] ");
                }
                /**
                 * The template string for individual ranks.
                 *
                 * @default "[${rank}§r]"
                 */
                static get rankTemplateString(): string {
                    return String(world.getDynamicProperty("andexdbSettings:rankTemplateString") ?? "[${rank}§r]");
                }
                static set rankTemplateString(rankTemplateString: string | undefined) {
                    world.setDynamicProperty("andexdbSettings:rankTemplateString", rankTemplateString ?? "[${rank}§r]");
                }
                static get messageTemplateString(): string {
                    return String(
                        world.getDynamicProperty("andexdbSettings:messageTemplateString") ??
                            '${(showDimension ? `[${dimension}§r] ` : "")}${timestampenabled?`[${timestamp}] `:""}${ranks}§r${(ranks!="")?" ":""}<${name}§r> ${message}'
                    );
                }
                static set messageTemplateString(messageTemplateString: string | undefined) {
                    world.setDynamicProperty(
                        "andexdbSettings:messageTemplateString",
                        messageTemplateString ??
                            '${(showDimension ? `[${dimension}§r] ` : "")}${timestampenabled?`[${timestamp}] `:""}${ranks}§r${(ranks!="")?" ":""}<${name}§r> ${message}'
                    );
                }
                static get nameTagTemplateString(): string {
                    return String(
                        world.getDynamicProperty("andexdbSettings:nameTagTemplateString") ??
                            '${rank} ${nameFormatting}${name}${(showHealth ? `§r§f [${currentHealth}/${maxHealth}]` : "")}'
                    );
                }
                static set nameTagTemplateString(nameTagTemplateString: string | undefined) {
                    world.setDynamicProperty(
                        "andexdbSettings:nameTagTemplateString",
                        nameTagTemplateString ?? '${rank} ${nameFormatting}${name}${(showHealth ? `§r§f [${currentHealth}/${maxHealth}]` : "")}'
                    );
                }
                static get defaultRank(): string {
                    return String(world.getDynamicProperty("andexdbSettings:defaultRank") ?? "§bMember§r");
                }
                static set defaultRank(defaultRank: string | undefined) {
                    world.setDynamicProperty("andexdbSettings:defaultRank", defaultRank ?? "§bMember§r");
                }
                static get defaultMessageFormatting(): string {
                    return String(world.getDynamicProperty("andexdbSettings:defaultMessageFormatting") ?? "");
                }
                static set defaultMessageFormatting(defaultMessageFormatting: string | undefined) {
                    world.setDynamicProperty("andexdbSettings:defaultMessageFormatting", defaultMessageFormatting ?? "");
                }
                static get defaultNameFormatting(): string {
                    return String(world.getDynamicProperty("andexdbSettings:defaultNameFormatting") ?? "");
                }
                static set defaultNameFormatting(defaultNameFormatting: string | undefined) {
                    world.setDynamicProperty("andexdbSettings:defaultNameFormatting", defaultNameFormatting ?? "");
                }
                static get defaultSeparatorFormatting(): string {
                    return String(world.getDynamicProperty("andexdbSettings:defaultSeparatorFormatting") ?? "");
                }
                static set defaultSeparatorFormatting(defaultSeparatorFormatting: string | undefined) {
                    world.setDynamicProperty("andexdbSettings:defaultSeparatorFormatting", defaultSeparatorFormatting ?? "");
                }
                static get disableCustomChatMessages(): boolean {
                    return Boolean(world.getDynamicProperty("andexdbSettings:disableCustomChatMessages") ?? false);
                }
                static set disableCustomChatMessages(disableCustomChatMessages: boolean | undefined) {
                    world.setDynamicProperty("andexdbSettings:disableCustomChatMessages", disableCustomChatMessages ?? false);
                }
                static get allowCustomChatMessagesMuting(): boolean {
                    return Boolean(world.getDynamicProperty("andexdbSettings:allowCustomChatMessagesMuting") ?? false);
                }
                static set allowCustomChatMessagesMuting(allowCustomChatMessagesMuting: boolean | undefined) {
                    world.setDynamicProperty("andexdbSettings:showRanksOnPlayerNameTags", allowCustomChatMessagesMuting ?? false);
                }
                static get autoEscapeChatMessages(): boolean {
                    return Boolean(world.getDynamicProperty("andexdbSettings:autoEscapeChatMessages") ?? false);
                }
                static set autoEscapeChatMessages(autoEscapeChatMessages: boolean | undefined) {
                    world.setDynamicProperty("andexdbSettings:autoEscapeChatMessages", autoEscapeChatMessages ?? false);
                }
                static get autoURIEscapeChatMessages(): boolean {
                    return Boolean(world.getDynamicProperty("andexdbSettings:autoURIEscapeChatMessages") ?? false);
                }
                static set autoURIEscapeChatMessages(autoURIEscapeChatMessages: boolean | undefined) {
                    world.setDynamicProperty("andexdbSettings:autoURIEscapeChatMessages", autoURIEscapeChatMessages ?? false);
                }
                static get allowChatEscapeCodes(): boolean {
                    return Boolean(world.getDynamicProperty("andexdbSettings:allowChatEscapeCodes") ?? false);
                }
                static set allowChatEscapeCodes(allowChatEscapeCodes: boolean | undefined) {
                    world.setDynamicProperty("andexdbSettings:allowChatEscapeCodes", allowChatEscapeCodes ?? false);
                }
            }
            return config_chatRanks;
        }
        /**
         * The money system settings.
         * @group Subclasses
         */
        static get moneySystem() {
            /**
             * The money system settings.
             * @hideconstructor
             * @nameOverride moneySystem
             * @parentOverride Globals.config
             * @group Subclasses
             */
            class config_moneySystem {
                /**
                 * Whether or not to use a scoreboard-based money system instead of a dynamic property-based one.
                 *
                 * Enabling this option will cause the money system to max out at the 32-bit integer limit (approximately 2.1 billion), but will allow for modifying a player's money with the /scoreboard command instead of having to use the main menu or use script eval.
                 *
                 * When this option is disabled the limit is `10^32767`. So basically infinite.
                 *
                 * Dynamic Property ID: `andexdbSettings:moneySystem.useScoreboardBasedMoneySystem`
                 *
                 * @default false
                 */
                static get useScoreboardBasedMoneySystem(): boolean {
                    return Boolean(world.getDynamicProperty("andexdbSettings:moneySystem.useScoreboardBasedMoneySystem") ?? false);
                }
                static set useScoreboardBasedMoneySystem(enabled: boolean | undefined) {
                    world.setDynamicProperty("andexdbSettings:moneySystem.useScoreboardBasedMoneySystem", enabled ?? false);
                }
                /**
                 * The name of the scoreboard to use for the money system.
                 *
                 * Dynamic Property ID: `andexdbSettings:moneySystem.scoreboardName`
                 *
                 * @default "andexdb:money"
                 */
                static get scoreboardName(): string {
                    return String(world.getDynamicProperty("andexdbSettings:moneySystem.scoreboardName") ?? "andexdb:money");
                }
                static set scoreboardName(enabled: string | undefined) {
                    world.setDynamicProperty("andexdbSettings:moneySystem.scoreboardName", enabled ?? "andexdb:money");
                }
            }
            return config_moneySystem;
        }
        /**
         * The bounty system settings.
         * @group Subclasses
         */
        static get bountySystem() {
            /**
             * The bounty system settings.
             * @hideconstructor
             * @nameOverride bountySystem
             * @parentOverride Globals.config
             * @group Subclasses
             */
            class config_bountySystem {
                /**
                 * Whether or not the bounty system is enabled.
                 *
                 * Dynamic Property ID: `andexdbSettings:bountySystem.enabled`
                 *
                 * @default true
                 */
                static get enabled(): boolean {
                    return Boolean(world.getDynamicProperty("andexdbSettings:bountySystem.enabled") ?? true);
                }
                static set enabled(enabled: boolean | undefined) {
                    world.setDynamicProperty("andexdbSettings:bountySystem.enabled", enabled ?? true);
                }
                /**
                 * Whether to show the time that a player was last online in the stats list that is shown when a player clicks on the bounty for another player in the bounty list.
                 *
                 * Dynamic Property ID: `andexdbSettings:bountySystem.showLastOnlineTimeInPlayerStatsList`
                 *
                 * @default false
                 */
                static get showLastOnlineTimeInBountyDetailsList(): boolean {
                    return Boolean(world.getDynamicProperty("andexdbSettings:bountySystem.showLastOnlineTimeInPlayerStatsList") ?? false);
                }
                static set showLastOnlineTimeInBountyDetailsList(show: boolean | undefined) {
                    world.setDynamicProperty("andexdbSettings:bountySystem.showLastOnlineTimeInPlayerStatsList", show ?? false);
                }
            }
            return config_bountySystem;
        }
        /**
         * The warps system settings.
         * @group Subclasses
         */
        static get warpsSystem() {
            /**
             * The warps system settings.
             * @hideconstructor
             * @nameOverride warpsSystem
             * @parentOverride Globals.config
             * @group Subclasses
             */
            class config_warpsSystem {
                /**
                 * Whether or not the warps system is enabled.
                 *
                 * Dynamic Property ID: `andexdbSettings:warpsSystem.enabled`
                 *
                 * @default true
                 */
                static get enabled(): boolean {
                    return Boolean(world.getDynamicProperty("warpsSystem:bountySystem.enabled") ?? true);
                }
                static set enabled(enabled: boolean | undefined) {
                    world.setDynamicProperty("andexdbSettings:warpsSystem.enabled", enabled ?? true);
                }
                /**
                 * List of saved warps.
                 *
                 * Dynamic Property ID: `andexdbSettings:warpsSystem.warps`
                 *
                 * @default []
                 *
                 * @throws {TypeError} The setter throws if the input is not an array of warp interface objects or undefined.
                 */
                static get warps(): Warp[] {
                    return JSONB.parse(world.getStringFromDynamicProperties("warpsSystem:warpsSystem.warps", "[]"));
                }
                static set warps(warps: Warp[] | undefined) {
                    if (warps === undefined) {
                        world.saveStringToDynamicProperties("[]", "warpsSystem:warpsSystem.warps");
                    } else if (warps instanceof Array) {
                        world.saveStringToDynamicProperties(JSONB.stringify(warps), "warpsSystem:warpsSystem.warps");
                    } else {
                        throw new TypeError(
                            "Invalid warps list provided, expected an array of warp interface objects or undefined, but instead got " +
                                (typeof warps == "object"
                                    ? warps === null
                                        ? "object[null]"
                                        : "object[" + ((warps as object).constructor.name ?? "unknown") + "]"
                                    : typeof warps) +
                                "."
                        );
                    }
                }
            }
            return config_warpsSystem;
        }
        /**
         * The money transfer system settings.
         * @group Subclasses
         */
        static get moneyTransferSystem() {
            /**
             * The money transfer system settings.
             * @hideconstructor
             * @nameOverride moneyTransferSystem
             * @parentOverride Globals.config
             * @group Subclasses
             */
            class config_moneyTransferSystem {
                /**
                 * Whether or not the money transfer system is enabled.
                 *
                 * Dynamic Property ID: `andexdbSettings:moneyTransferSystem.enabled`
                 *
                 * @default true
                 */
                static get enabled(): boolean {
                    return Boolean(world.getDynamicProperty("andexdbSettings:moneyTransferSystem.enabled") ?? true);
                }
                static set enabled(enabled: boolean | undefined) {
                    world.setDynamicProperty("andexdbSettings:moneyTransferSystem.enabled", enabled ?? true);
                }
            }
            return config_moneyTransferSystem;
        }
        /**
         * The anti-spam system settings.
         * @group Subclasses
         */
        static get antiSpamSystem() {
            /**
             * The anti-spam system settings.
             * @hideconstructor
             * @nameOverride antiSpamSystem
             * @parentOverride Globals.config
             * @group Subclasses
             */
            class config_antiSpamSystem {
                /**
                 * Whether or not the anti-spam system is enabled.
                 *
                 * Dynamic Property ID: `antispamSettings:antispamEnabled`
                 *
                 * @default false
                 */
                static get antispamEnabled(): boolean {
                    return Boolean(world.getDynamicProperty("antispamSettings:antispamEnabled") ?? false);
                }
                static set antispamEnabled(enabled: boolean | undefined) {
                    world.setDynamicProperty("antispamSettings:antispamEnabled", enabled ?? false);
                }
                /**
                 * Whether or not to restart the anti-spam mute timer when a message is sent during a mute.
                 *
                 * Dynamic Property ID: `antispamSettings:restartAntiSpamMuteTimerUponAttemptedMessageSendDuringMute`
                 *
                 * @default false
                 */
                static get restartAntiSpamMuteTimerUponAttemptedMessageSendDuringMute(): boolean {
                    return Boolean(world.getDynamicProperty("antispamSettings:restartAntiSpamMuteTimerUponAttemptedMessageSendDuringMute") ?? false);
                }
                static set restartAntiSpamMuteTimerUponAttemptedMessageSendDuringMute(
                    restartAntiSpamMuteTimerUponAttemptedMessageSendDuringMute: boolean | undefined
                ) {
                    world.setDynamicProperty(
                        "antispamSettings:restartAntiSpamMuteTimerUponAttemptedMessageSendDuringMute",
                        restartAntiSpamMuteTimerUponAttemptedMessageSendDuringMute ?? false
                    );
                }
                /**
                 * The wait time in seconds before a player can send another chat message.
                 *
                 * Dynamic Property ID: `antispamSettings:waitTimeAfterAntispamActivation`
                 *
                 * @default 60
                 */
                static get waitTimeAfterAntispamActivation(): number {
                    return isNaN(Number(world.getDynamicProperty("antispamSettings:waitTimeAfterAntispamActivation")))
                        ? 60
                        : Number(world.getDynamicProperty("antispamSettings:waitTimeAfterAntispamActivation") ?? 60);
                }
                static set waitTimeAfterAntispamActivation(waitTimeInSeconds: number | undefined) {
                    world.setDynamicProperty("antispamSettings:waitTimeAfterAntispamActivation", waitTimeInSeconds ?? 60);
                }
                /**
                 * The maximum time in seconds between individual messages to trigger anti-spam.
                 *
                 * Dynamic Property ID: `antispamSettings:maxTimeBewteenMessagesToTriggerAntiSpam`
                 *
                 * @default 5
                 */
                static get maxTimeBewteenMessagesToTriggerAntiSpam(): number {
                    return isNaN(Number(world.getDynamicProperty("antispamSettings:maxTimeBewteenMessagesToTriggerAntiSpam")))
                        ? 5
                        : Number(world.getDynamicProperty("antispamSettings:maxTimeBewteenMessagesToTriggerAntiSpam") ?? 5);
                }
                static set maxTimeBewteenMessagesToTriggerAntiSpam(maxTimeInSeconds: number | undefined) {
                    world.setDynamicProperty("antispamSettings:maxTimeBewteenMessagesToTriggerAntiSpam", maxTimeInSeconds ?? 5);
                }
                /**
                 * The message count to trigger anti-spam.
                 *
                 * Dynamic Property ID: `antispamSettings:antispamTriggerMessageCount`
                 *
                 * @default 4
                 */
                static get antispamTriggerMessageCount(): number {
                    return isNaN(Number(world.getDynamicProperty("antispamSettings:antispamTriggerMessageCount")))
                        ? 4
                        : Number(gwdp("antispamSettings:antispamTriggerMessageCount") ?? 4);
                }
                static set antispamTriggerMessageCount(messageCount: number | undefined) {
                    world.setDynamicProperty("antispamSettings:antispamTriggerMessageCount", messageCount ?? 4);
                }
            }
            return config_antiSpamSystem;
        }
        /**
         * The moderation settings.
         * @group Subclasses
         */
        static get moderation() {
            /**
             * The moderation settings.
             * @hideconstructor
             * @nameOverride moderation
             * @parentOverride Globals.config
             * @group Subclasses
             */
            class config_moderation {
                /**
                 * The ban settings.
                 * @group Subclasses
                 */
                static get bans() {
                    /**
                     * The ban settings.
                     * @hideconstructor
                     * @nameOverride bans
                     * @parentOverride Globals.config.moderation:class
                     * @group Subclasses
                     */
                    class config_moderation_bans {
                        /**
                         * Whether or not the ban system is enabled.
                         *
                         * Dynamic Property ID: `andexdbSettings:banEnabled`
                         *
                         * @default true
                         */
                        static get enabled(): boolean {
                            return Boolean(world.getDynamicProperty("andexdbSettings:banEnabled") ?? true);
                        }
                        static set enabled(enabled: boolean | undefined) {
                            world.setDynamicProperty("andexdbSettings:banEnabled", enabled ?? true);
                        }
                        /**
                         * How long it has to be since the last ban refresh before the bans list will be automatically refreshed, when getting the bans list or checking if a player is banned.
                         *
                         * Dynamic Property ID: `andexdbSettings:moderation.bans.minimumAutoRefresh`
                         *
                         * @default 1000
                         */
                        static get minimumAutoRefresh() {
                            return Number(
                                world.getDynamicProperty("andexdbSettings:moderation.bans.minimumAutoRefresh") ??
                                    // Also check old ID for backwards compatibility.
                                    world.getDynamicProperty("andexdbSettings:bansMinimumAutoRefresh") ??
                                    1000
                            );
                        }
                        static set minimumAutoRefresh(minimumAutoRefresh: number | undefined) {
                            world.setDynamicProperty("andexdbSettings:moderation.bans.minimumAutoRefresh", minimumAutoRefresh ?? 1000);
                        }
                    }
                    return config_moderation_bans;
                }
            }
            return config_moderation;
        }
        /**
         * The UI settings.
         * @group Subclasses
         */
        static get ui() {
            /**
             * The UI settings.
             * @hideconstructor
             * @nameOverride ui
             * @parentOverride Globals.config
             * @group Subclasses
             */
            class config_ui {
                /**
                 * The menu configurations.
                 * @group Subclasses
                 */
                static get menus() {
                    /**
                     * The menu configurations.
                     * @hideconstructor
                     * @nameOverride menus
                     * @parentOverride Globals.config.ui:class
                     * @group Subclasses
                     */
                    class config_ui_menus {
                        /**
                         * The main menu settings.
                         * @group Subclasses
                         */
                        static get mainMenu() {
                            /**
                             * The main menu settings.
                             * @hideconstructor
                             * @nameOverride mainMenu
                             * @parentOverride Globals.config.ui:class.menus:class
                             * @group Subclasses
                             */
                            class config_ui_menus_mainMenu {
                                /**
                                 *
                                 */ /* 
                            get buttons(): (keyof typeof menuButtonIds.mainMenu.buttons)[] {
                                return JSON.parse(
                                    String(
                                        world.getDynamicProperty("andexdbSettings:ui.menus.mainMenu.buttons") ??
                                            JSON.stringify(
                                                (Object.keys(menuButtonIds.mainMenu.buttons) as (keyof typeof menuButtonIds.mainMenu.buttons)[]).sort((a, b) =>
                                                    menuButtonIds.mainMenu.buttons[a].defaultButtonIndex > menuButtonIds.mainMenu.buttons[b].defaultButtonIndex
                                                        ? 1
                                                        : menuButtonIds.mainMenu.buttons[a].defaultButtonIndex <
                                                          menuButtonIds.mainMenu.buttons[b].defaultButtonIndex
                                                        ? -1
                                                        : 0
                                                )
                                            )
                                    )
                                );
                            },
                            set buttons(buttonList: (keyof typeof menuButtonIds.mainMenu.buttons)[] | undefined) {
                                world.setDynamicProperty(
                                    "andexdbSettings:ui.menus.mainMenu.buttons",
                                    JSON.stringify(
                                        buttonList ??
                                            (Object.keys(menuButtonIds.mainMenu.buttons) as (keyof typeof menuButtonIds.mainMenu.buttons)[]).sort((a, b) =>
                                                menuButtonIds.mainMenu.buttons[a].defaultButtonIndex > menuButtonIds.mainMenu.buttons[b].defaultButtonIndex
                                                    ? 1
                                                    : menuButtonIds.mainMenu.buttons[a].defaultButtonIndex <
                                                      menuButtonIds.mainMenu.buttons[b].defaultButtonIndex
                                                    ? -1
                                                    : 0
                                            )
                                    )
                                );
                            }, */
                                /**
                                 * Whether to show the buttons marked as deprecated on the main menu.
                                 *
                                 * Dynamic Property ID: `andexdbSettings:ui.menus.mainMenu.showDeprecatedButtons`
                                 *
                                 * @default false
                                 */
                                static get showDeprecatedButtons(): boolean {
                                    return Boolean(world.getDynamicProperty("andexdbSettings:ui.menus.mainMenu.showDeprecatedButtons") ?? false);
                                }
                                static set showDeprecatedButtons(show: boolean | undefined) {
                                    world.setDynamicProperty("andexdbSettings:ui.menus.mainMenu.showDeprecatedButtons", show ?? false);
                                }
                                /**
                                 * Whether to show the buttons marked as deprecated on the main menu.
                                 *
                                 * Dynamic Property ID: `andexdbSettings:ui.menus.mainMenu.showExperimentalButtons`
                                 *
                                 * @default true
                                 */
                                static get showExperimentalButtons(): boolean {
                                    return Boolean(world.getDynamicProperty("andexdbSettings:ui.menus.mainMenu.showExperimentalButtons") ?? true);
                                }
                                static set showExperimentalButtons(show: boolean | undefined) {
                                    world.setDynamicProperty("andexdbSettings:ui.menus.mainMenu.showExperimentalButtons", show ?? true);
                                }
                                /**
                                 * Whether to show the buttons marked as deprecated on the main menu.
                                 *
                                 * Dynamic Property ID: `andexdbSettings:ui.menus.mainMenu.showUnusedButtons`
                                 *
                                 * @default false
                                 */
                                static get showUnusedButtons(): boolean {
                                    return Boolean(world.getDynamicProperty("andexdbSettings:ui.menus.mainMenu.showUnusedButtons") ?? false);
                                }
                                static set showUnusedButtons(show: boolean | undefined) {
                                    world.setDynamicProperty("andexdbSettings:ui.menus.mainMenu.showUnusedButtons", show ?? false);
                                }
                                /**
                                 * Whether to show the buttons for features that are planned to be added in a future update on the main menu.
                                 *
                                 * Dynamic Property ID: `andexdbSettings:ui.menus.mainMenu.showUpcomingButtons`
                                 *
                                 * @default false
                                 */
                                static get showUpcomingButtons(): boolean {
                                    return Boolean(world.getDynamicProperty("andexdbSettings:ui.menus.mainMenu.showUpcomingButtons") ?? false);
                                }
                                static set showUpcomingButtons(show: boolean | undefined) {
                                    world.setDynamicProperty("andexdbSettings:ui.menus.mainMenu.showUpcomingButtons", show ?? false);
                                }
                                /**
                                 * Whether to show the buttons for features that are non-functional on the main menu.
                                 *
                                 * Dynamic Property ID: `andexdbSettings:ui.menus.mainMenu.showNonFunctionalButtons`
                                 *
                                 * @default false
                                 */
                                static get showNonFunctionalButtons(): boolean {
                                    return Boolean(world.getDynamicProperty("andexdbSettings:ui.menus.mainMenu.showNonFunctionalButtons") ?? false);
                                }
                                static set showNonFunctionalButtons(show: boolean | undefined) {
                                    world.setDynamicProperty("andexdbSettings:ui.menus.mainMenu.showNonFunctionalButtons", show ?? false);
                                }
                            }
                            return config_ui_menus_mainMenu;
                        }
                        /**
                         * The player menu settings.
                         * @group Subclasses
                         */
                        static get playerMenu() {
                            /**
                             * The player menu settings.
                             * @hideconstructor
                             * @nameOverride playerMenu
                             * @parentOverride Globals.config.ui:class.menus:class
                             * @group Subclasses
                             */
                            class config_ui_menus_playerMenu {
                                /**
                                 * Whether or not the player menu is enabled.
                                 *
                                 * Dynamic Property ID: `andexdbSettings:ui.menus.playerMenu.enabled`
                                 *
                                 * @default true
                                 */
                                static get enabled(): boolean {
                                    return Boolean(world.getDynamicProperty("andexdbSettings:ui.menus.playerMenu.enabled") ?? true);
                                }
                                static set enabled(enabled: boolean | undefined) {
                                    world.setDynamicProperty("andexdbSettings:ui.menus.playerMenu.enabled", enabled ?? true);
                                }
                                /**
                                 * The buttons to show on the player menu. They will appear in the order that they are specified in this option.
                                 *
                                 * Dynamic Property ID: `andexdbSettings:ui.menus.playerMenu.buttons`
                                 *
                                 * @default JSON.stringify(
                                 *    (Object.keys(menuButtonIds.playerMenu.buttons) as (keyof typeof menuButtonIds.playerMenu.buttons)[]).sort(
                                 *        (a, b) =>
                                 *            menuButtonIds.playerMenu.buttons[a].defaultButtonIndex >
                                 *            menuButtonIds.playerMenu.buttons[b].defaultButtonIndex
                                 *                ? 1
                                 *                : menuButtonIds.playerMenu.buttons[a].defaultButtonIndex <
                                 *                  menuButtonIds.playerMenu.buttons[b].defaultButtonIndex
                                 *                ? -1
                                 *                : 0
                                 *    )
                                 *)
                                 */
                                static get buttons(): (keyof typeof menuButtonIds.playerMenu.buttons)[] {
                                    return JSON.parse(
                                        String(
                                            world.getDynamicProperty("andexdbSettings:ui.menus.playerMenu.buttons") ??
                                                JSON.stringify(
                                                    (Object.keys(menuButtonIds.playerMenu.buttons) as (keyof typeof menuButtonIds.playerMenu.buttons)[]).sort(
                                                        (a, b) =>
                                                            menuButtonIds.playerMenu.buttons[a].defaultButtonIndex >
                                                            menuButtonIds.playerMenu.buttons[b].defaultButtonIndex
                                                                ? 1
                                                                : menuButtonIds.playerMenu.buttons[a].defaultButtonIndex <
                                                                  menuButtonIds.playerMenu.buttons[b].defaultButtonIndex
                                                                ? -1
                                                                : 0
                                                    )
                                                )
                                        )
                                    );
                                }
                                static set buttons(buttonList: (keyof typeof menuButtonIds.playerMenu.buttons)[] | undefined) {
                                    world.setDynamicProperty(
                                        "andexdbSettings:ui.menus.playerMenu.buttons",
                                        JSON.stringify(
                                            buttonList ??
                                                (Object.keys(menuButtonIds.playerMenu.buttons) as (keyof typeof menuButtonIds.playerMenu.buttons)[]).sort(
                                                    (a, b) =>
                                                        menuButtonIds.playerMenu.buttons[a].defaultButtonIndex >
                                                        menuButtonIds.playerMenu.buttons[b].defaultButtonIndex
                                                            ? 1
                                                            : menuButtonIds.playerMenu.buttons[a].defaultButtonIndex <
                                                              menuButtonIds.playerMenu.buttons[b].defaultButtonIndex
                                                            ? -1
                                                            : 0
                                                )
                                        )
                                    );
                                }
                                /**
                                 * The item name for the item that opens the player menu.
                                 *
                                 * Dynamic Property ID: `andexdbSettings:ui.menus.playerMenu.itemName`
                                 *
                                 * @default "Menu"
                                 */
                                static get itemName(): string {
                                    return String(world.getDynamicProperty("andexdbSettings:ui.menus.playerMenu.itemName") ?? "§r§fMenu");
                                }
                                static set itemName(itemName: string | undefined) {
                                    world.setDynamicProperty("andexdbSettings:ui.menus.playerMenu.itemName", itemName ?? "§r§fMenu");
                                }
                                /**
                                 * Whether to show the buttons marked as deprecated on the player menu.
                                 *
                                 * Dynamic Property ID: `andexdbSettings:ui.menus.playerMenu.showDeprecatedButtons`
                                 *
                                 * @default false
                                 */
                                static get showDeprecatedButtons(): boolean {
                                    return Boolean(world.getDynamicProperty("andexdbSettings:ui.menus.playerMenu.showDeprecatedButtons") ?? false);
                                }
                                static set showDeprecatedButtons(show: boolean | undefined) {
                                    world.setDynamicProperty("andexdbSettings:ui.menus.playerMenu.showDeprecatedButtons", show ?? false);
                                }
                                /**
                                 * Whether to show the buttons marked as deprecated on the player menu.
                                 *
                                 * Dynamic Property ID: `andexdbSettings:ui.menus.playerMenu.showExperimentalButtons`
                                 *
                                 * @default true
                                 */
                                static get showExperimentalButtons(): boolean {
                                    return Boolean(world.getDynamicProperty("andexdbSettings:ui.menus.playerMenu.showExperimentalButtons") ?? true);
                                }
                                static set showExperimentalButtons(show: boolean | undefined) {
                                    world.setDynamicProperty("andexdbSettings:ui.menus.playerMenu.showExperimentalButtons", show ?? true);
                                }
                                /**
                                 * Whether to show the buttons marked as deprecated on the player menu.
                                 *
                                 * Dynamic Property ID: `andexdbSettings:ui.menus.playerMenu.showUnusedButtons`
                                 *
                                 * @default false
                                 */
                                static get showUnusedButtons(): boolean {
                                    return Boolean(world.getDynamicProperty("andexdbSettings:ui.menus.playerMenu.showUnusedButtons") ?? false);
                                }
                                static set showUnusedButtons(show: boolean | undefined) {
                                    world.setDynamicProperty("andexdbSettings:ui.menus.playerMenu.showUnusedButtons", show ?? false);
                                }
                                /**
                                 * Whether to show the buttons for features that are planned to be added in a future update on the player menu.
                                 *
                                 * Dynamic Property ID: `andexdbSettings:ui.menus.playerMenu.showUpcomingButtons`
                                 *
                                 * @default false
                                 */
                                static get showUpcomingButtons(): boolean {
                                    return Boolean(world.getDynamicProperty("andexdbSettings:ui.menus.playerMenu.showUpcomingButtons") ?? false);
                                }
                                static set showUpcomingButtons(show: boolean | undefined) {
                                    world.setDynamicProperty("andexdbSettings:ui.menus.playerMenu.showUpcomingButtons", show ?? false);
                                }
                                /**
                                 * Whether to show the buttons for features that are non-functional on the player menu.
                                 *
                                 * Dynamic Property ID: `andexdbSettings:ui.menus.playerMenu.showNonFunctionalButtons`
                                 *
                                 * @default false
                                 */
                                static get showNonFunctionalButtons(): boolean {
                                    return Boolean(world.getDynamicProperty("andexdbSettings:ui.menus.playerMenu.showNonFunctionalButtons") ?? false);
                                }
                                static set showNonFunctionalButtons(show: boolean | undefined) {
                                    world.setDynamicProperty("andexdbSettings:ui.menus.playerMenu.showNonFunctionalButtons", show ?? false);
                                }
                            }
                            return config_ui_menus_playerMenu;
                        }
                        /**
                         * The settings for the player menu leaderboards.
                         * @group Subclasses
                         */
                        static get playerMenu_leaderboards() {
                            /**
                             * The settings for the player menu leaderboards.
                             * @hideconstructor
                             * @nameOverride playerMenu_leaderboards
                             * @parentOverride Globals.config.ui:class.menus:class
                             * @group Subclasses
                             */
                            class config_ui_menus_playerMenu_leaderboards {
                                /**
                                 * The settings for the built-in leaderboard statistics.
                                 * @group Subclasses
                                 */
                                static get builtInStats() {
                                    /**
                                     * The settings for the built-in leaderboard statistics.
                                     * @hideconstructor
                                     * @nameOverride builtInStats
                                     * @parentOverride Globals.config.ui:class.menus:class.playerMenu_leaderboards:class
                                     * @group Subclasses
                                     */
                                    class config_ui_menus_playerMenu_leaderboards_builtInStats {
                                        /**
                                         * The settings for the built-in `money` leaderboard statistic.
                                         * @group Subclasses
                                         */
                                        static get money() {
                                            /**
                                             * The settings for the built-in `money` leaderboard statistic.
                                             * @hideconstructor
                                             * @nameOverride money
                                             * @parentOverride Globals.config.ui:class.menus:class.playerMenu_leaderboards:class.builtInStats:class
                                             * @group Subclasses
                                             */
                                            class config_ui_menus_playerMenu_leaderboards_builtInStats_money {
                                                /**
                                                 * Whether or not the built-in `money` leaderboard statictic is enabled.
                                                 *
                                                 * Dynamic Property ID: `andexdbSettings:ui.menus.playerMenu_leaderboards.builtInStats.money.enabled`
                                                 *
                                                 * @default true
                                                 */
                                                static get enabled(): boolean {
                                                    return Boolean(
                                                        world.getDynamicProperty(
                                                            "andexdbSettings:ui.menus.playerMenu_leaderboards.builtInStats.money.enabled"
                                                        ) ?? true
                                                    );
                                                }
                                                static set enabled(enabled: boolean | undefined) {
                                                    world.setDynamicProperty(
                                                        "andexdbSettings:ui.menus.playerMenu_leaderboards.builtInStats.money.enabled",
                                                        enabled ?? true
                                                    );
                                                }
                                                /**
                                                 * The display options for the built-in `money` leaderboard statistic.
                                                 * @group Subclasses
                                                 */
                                                static get displayOptions() {
                                                    /**
                                                     * The display options for the built-in `money` leaderboard statistic.
                                                     * @hideconstructor
                                                     * @nameOverride displayOptions
                                                     * @parentOverride Globals.config.ui:class.menus:class.playerMenu_leaderboards:class.builtInStats:class.money:class
                                                     * @group Subclasses
                                                     */
                                                    class config_ui_menus_playerMenu_leaderboards_builtInStats_money_displayOptions {
                                                        /**
                                                         * A currency symbol to prefix the displayed value with.
                                                         *
                                                         * For example, if this is set to "$", then 1327401 would become $1327401 and -1234781 would become -$1234781. (Can be combined with "Add Comma Separators" to make it display like -$1,234,781.).
                                                         *
                                                         * Dynamic Property ID: `andexdbSettings:ui.menus.playerMenu_leaderboards.builtInStats.money.displayOptions.currencyPrefix`
                                                         *
                                                         * @default "$"
                                                         */
                                                        static get currencyPrefix(): string {
                                                            return String(
                                                                world.getDynamicProperty(
                                                                    "andexdbSettings:ui.menus.playerMenu_leaderboards.builtInStats.money.displayOptions.currencyPrefix"
                                                                ) ?? "$"
                                                            );
                                                        }
                                                        static set currencyPrefix(currencyPrefix: string | undefined) {
                                                            world.setDynamicProperty(
                                                                "andexdbSettings:ui.menus.playerMenu_leaderboards.builtInStats.money.displayOptions.currencyPrefix",
                                                                currencyPrefix ?? "$"
                                                            );
                                                        }
                                                        /**
                                                         * Whether or not to add comma separators to the displayed value for this statistic.
                                                         *
                                                         * For example, if this is set to true, then 1327401 would become 1,327,401 and -1234781 would become -1,234,781.
                                                         *
                                                         * Dynamic Property ID: `andexdbSettings:ui.menus.playerMenu_leaderboards.builtInStats.money.displayOptions.addCommaSeparators`
                                                         *
                                                         * @default true
                                                         */
                                                        static get addCommaSeparators(): boolean {
                                                            return Boolean(
                                                                world.getDynamicProperty(
                                                                    "andexdbSettings:ui.menus.playerMenu_leaderboards.builtInStats.money.displayOptions.addCommaSeparators"
                                                                ) ?? true
                                                            );
                                                        }
                                                        static set addCommaSeparators(addCommaSeparators: boolean | undefined) {
                                                            world.setDynamicProperty(
                                                                "andexdbSettings:ui.menus.playerMenu_leaderboards.builtInStats.money.displayOptions.addCommaSeparators",
                                                                addCommaSeparators ?? true
                                                            );
                                                        }
                                                    }
                                                    return config_ui_menus_playerMenu_leaderboards_builtInStats_money_displayOptions;
                                                }
                                            }
                                            return config_ui_menus_playerMenu_leaderboards_builtInStats_money;
                                        }
                                    }
                                    return config_ui_menus_playerMenu_leaderboards_builtInStats;
                                }
                                /**
                                 * The custom leaderboard statistics.
                                 *
                                 * Dynamic Property ID: `andexdbSettings:ui.menus.playerMenu_leaderboards.customStats`
                                 *
                                 * @default []
                                 */
                                static get customStats(): playerMenuLeaderboardStatistic<"custom" | "customAdvanced">[] {
                                    return (
                                        JSONB.parse(
                                            String(world.getDynamicProperty("andexdbSettings:ui.menus.playerMenu_leaderboards.customStats") ?? "[]")
                                        ) as playerMenuLeaderboardStatistic_JSONB<"custom" | "customAdvanced">[]
                                    ).map((s) => {
                                        if (s.type === "custom") {
                                            return {
                                                buttonDisplayName: s.buttonDisplayName,
                                                buttonIcon: s.buttonIcon,
                                                displayOptions: {
                                                    addCommaSeparators: s.displayOptions?.addCommaSeparators ?? true,
                                                    currencyPrefix: s.displayOptions?.currencyPrefix ?? "",
                                                    toFixed: s.displayOptions?.toFixed,
                                                    valueDisplayColor: s.displayOptions?.valueDisplayColor,
                                                    valueDisplayTransformer_button:
                                                        s.displayOptions?.valueDisplayTransformer_button !== undefined
                                                            ? eval?.(s.displayOptions.valueDisplayTransformer_button)
                                                            : undefined,
                                                    valueDisplayTransformer_statsList:
                                                        s.displayOptions?.valueDisplayTransformer_statsList !== undefined
                                                            ? eval?.(s.displayOptions.valueDisplayTransformer_statsList)
                                                            : undefined,
                                                },
                                                id: s.id,
                                                menuTitle: s.menuTitle,
                                                scoreboardObjective: s.scoreboardObjective,
                                                sorter: s.sorter,
                                                statsListDisplayName: s.statsListDisplayName,
                                                type: s.type,
                                                valueType: s.valueType,
                                            } as playerMenuLeaderboardStatistic<"custom">;
                                        } else if (s.type === "customAdvanced") {
                                            if (s.sortType === "function") {
                                                return {
                                                    buttonDisplayName: s.buttonDisplayName,
                                                    buttonIcon: s.buttonIcon,
                                                    displayOptions: {
                                                        addCommaSeparators: s.displayOptions?.addCommaSeparators ?? true,
                                                        currencyPrefix: s.displayOptions?.currencyPrefix ?? "",
                                                        toFixed: s.displayOptions?.toFixed,
                                                        valueDisplayColor: s.displayOptions?.valueDisplayColor,
                                                        valueDisplayTransformer_button:
                                                            s.displayOptions?.valueDisplayTransformer_button !== undefined
                                                                ? eval?.(s.displayOptions.valueDisplayTransformer_button)
                                                                : undefined,
                                                        valueDisplayTransformer_statsList:
                                                            s.displayOptions?.valueDisplayTransformer_statsList !== undefined
                                                                ? eval?.(s.displayOptions.valueDisplayTransformer_statsList)
                                                                : undefined,
                                                    },
                                                    getterFunction: s.getterFunction !== undefined ? eval?.(s.getterFunction) : undefined,
                                                    id: s.id,
                                                    menuTitle: s.menuTitle,
                                                    sorter: eval?.(s.sorter as string),
                                                    sortType: s.sortType,
                                                    statsListDisplayName: s.statsListDisplayName,
                                                    type: s.type,
                                                    valueType: s.valueType,
                                                } as playerMenuLeaderboardStatistic<"customAdvanced", "function">;
                                            } else {
                                                return {
                                                    buttonDisplayName: s.buttonDisplayName,
                                                    buttonIcon: s.buttonIcon,
                                                    displayOptions: {
                                                        addCommaSeparators: s.displayOptions?.addCommaSeparators ?? true,
                                                        currencyPrefix: s.displayOptions?.currencyPrefix ?? "",
                                                        toFixed: s.displayOptions?.toFixed,
                                                        valueDisplayColor: s.displayOptions?.valueDisplayColor,
                                                        valueDisplayTransformer_button:
                                                            s.displayOptions?.valueDisplayTransformer_button !== undefined
                                                                ? eval?.(s.displayOptions.valueDisplayTransformer_button)
                                                                : undefined,
                                                        valueDisplayTransformer_statsList:
                                                            s.displayOptions?.valueDisplayTransformer_statsList !== undefined
                                                                ? eval?.(s.displayOptions.valueDisplayTransformer_statsList)
                                                                : undefined,
                                                    },
                                                    getterFunction: s.getterFunction !== undefined ? eval?.(s.getterFunction) : undefined,
                                                    id: s.id,
                                                    menuTitle: s.menuTitle,
                                                    sorter: s.sorter,
                                                    sortType: s.sortType,
                                                    statsListDisplayName: s.statsListDisplayName,
                                                    type: s.type,
                                                    valueType: s.valueType,
                                                } as playerMenuLeaderboardStatistic<"customAdvanced", "order">;
                                            }
                                        } else {
                                            return s;
                                        }
                                    });
                                }
                                static set customStats(buttonList: playerMenuLeaderboardStatistic<"custom" | "customAdvanced">[] | undefined) {
                                    world.setDynamicProperty(
                                        "andexdbSettings:ui.menus.playerMenu_leaderboards.customStats",
                                        JSONB.stringify(
                                            (buttonList ?? []).map((s) => {
                                                if (s.type === "custom") {
                                                    return {
                                                        buttonDisplayName: s.buttonDisplayName,
                                                        buttonIcon: s.buttonIcon,
                                                        displayOptions: {
                                                            addCommaSeparators: s.displayOptions?.addCommaSeparators ?? true,
                                                            currencyPrefix: s.displayOptions?.currencyPrefix ?? "",
                                                            toFixed: s.displayOptions?.toFixed,
                                                            valueDisplayColor: s.displayOptions?.valueDisplayColor,
                                                            valueDisplayTransformer_button:
                                                                s.displayOptions?.valueDisplayTransformer_button !== undefined
                                                                    ? s.displayOptions.valueDisplayTransformer_button.toString()
                                                                    : undefined,
                                                            valueDisplayTransformer_statsList:
                                                                s.displayOptions?.valueDisplayTransformer_statsList !== undefined
                                                                    ? s.displayOptions.valueDisplayTransformer_statsList.toString()
                                                                    : undefined,
                                                        },
                                                        id: s.id,
                                                        menuTitle: s.menuTitle,
                                                        scoreboardObjective: s.scoreboardObjective,
                                                        sorter: s.sorter,
                                                        statsListDisplayName: s.statsListDisplayName,
                                                        type: s.type,
                                                        valueType: s.valueType,
                                                    } as playerMenuLeaderboardStatistic_JSONB<"custom">;
                                                } else if (s.type === "customAdvanced") {
                                                    if (s.sortType === "function") {
                                                        return {
                                                            buttonDisplayName: s.buttonDisplayName,
                                                            buttonIcon: s.buttonIcon,
                                                            displayOptions: {
                                                                addCommaSeparators: s.displayOptions?.addCommaSeparators ?? true,
                                                                currencyPrefix: s.displayOptions?.currencyPrefix ?? "",
                                                                toFixed: s.displayOptions?.toFixed,
                                                                valueDisplayColor: s.displayOptions?.valueDisplayColor,
                                                                valueDisplayTransformer_button:
                                                                    s.displayOptions?.valueDisplayTransformer_button !== undefined
                                                                        ? s.displayOptions.valueDisplayTransformer_button.toString()
                                                                        : undefined,
                                                                valueDisplayTransformer_statsList:
                                                                    s.displayOptions?.valueDisplayTransformer_statsList !== undefined
                                                                        ? s.displayOptions.valueDisplayTransformer_statsList.toString()
                                                                        : undefined,
                                                            },
                                                            getterFunction: s.getterFunction?.toString(),
                                                            id: s.id,
                                                            menuTitle: s.menuTitle,
                                                            sorter: s.sorter.toString(),
                                                            sortType: s.sortType,
                                                            statsListDisplayName: s.statsListDisplayName,
                                                            type: s.type,
                                                            valueType: s.valueType,
                                                        } as playerMenuLeaderboardStatistic_JSONB<"customAdvanced", "function">;
                                                    } else {
                                                        return {
                                                            buttonDisplayName: s.buttonDisplayName,
                                                            buttonIcon: s.buttonIcon,
                                                            displayOptions: {
                                                                addCommaSeparators: s.displayOptions?.addCommaSeparators ?? true,
                                                                currencyPrefix: s.displayOptions?.currencyPrefix ?? "",
                                                                toFixed: s.displayOptions?.toFixed,
                                                                valueDisplayColor: s.displayOptions?.valueDisplayColor,
                                                                valueDisplayTransformer_button:
                                                                    s.displayOptions?.valueDisplayTransformer_button !== undefined
                                                                        ? s.displayOptions.valueDisplayTransformer_button.toString()
                                                                        : undefined,
                                                                valueDisplayTransformer_statsList:
                                                                    s.displayOptions?.valueDisplayTransformer_statsList !== undefined
                                                                        ? s.displayOptions.valueDisplayTransformer_statsList.toString()
                                                                        : undefined,
                                                            },
                                                            getterFunction: s.getterFunction?.toString(),
                                                            id: s.id,
                                                            menuTitle: s.menuTitle,
                                                            sorter: s.sorter,
                                                            sortType: s.sortType,
                                                            statsListDisplayName: s.statsListDisplayName,
                                                            type: s.type,
                                                            valueType: s.valueType,
                                                        } as playerMenuLeaderboardStatistic_JSONB<"customAdvanced", "order">;
                                                    }
                                                }
                                            })
                                        )
                                    );
                                }
                                /**
                                 * The statistics that are displayed when a player clicks on another player inside of the player menu leaderboard, they will be displayed in the order they are in this array.
                                 *
                                 * It should be an array of ids of leaderboard statistics, including both custom and built-in ones.
                                 *
                                 * Defaults to the list of the built-in leaderboard statistics from the `defaultPlayerMenuLeaderboardStatistics` array, in the same order that they appear in the array.
                                 *
                                 * Dynamic Property ID: `andexdbSettings:ui.menus.playerMenu_leaderboards.trackedStats`
                                 *
                                 * @default defaultPlayerMenuLeaderboardStatistics.map((s) => s.id)
                                 */
                                static get trackedStats(): string[] {
                                    return JSON.parse(
                                        String(
                                            world.getDynamicProperty("andexdbSettings:ui.menus.playerMenu_leaderboards.trackedStats") ??
                                                JSON.stringify(defaultPlayerMenuLeaderboardStatistics.map((s) => s.id))
                                        )
                                    );
                                }
                                static set trackedStats(buttonList: string[] | undefined) {
                                    world.setDynamicProperty(
                                        "andexdbSettings:ui.menus.playerMenu_leaderboards.trackedStats",
                                        JSON.stringify(buttonList ?? defaultPlayerMenuLeaderboardStatistics.map((s) => s.id))
                                    );
                                }
                                /**
                                 * The list of statistics that have their own leaderboards, they will be displayed in the order they are in this array.
                                 *
                                 * It should be an array of ids of leaderboard statistics, including both custom and built-in ones.
                                 *
                                 * Defaults to the list of the built-in leaderboard statistics from the `defaultPlayerMenuLeaderboardStatistics` array, in the same order that they appear in the array.
                                 *
                                 * Dynamic Property ID: `andexdbSettings:ui.menus.playerMenu_leaderboards.leaderboards`
                                 *
                                 * @default defaultPlayerMenuLeaderboardStatistics.map((s) => s.id)
                                 */
                                static get leaderboards(): string[] {
                                    return JSON.parse(
                                        String(
                                            world.getDynamicProperty("andexdbSettings:ui.menus.playerMenu_leaderboards.leaderboards") ??
                                                JSON.stringify(defaultPlayerMenuLeaderboardStatistics.map((s) => s.id))
                                        )
                                    );
                                }
                                static set leaderboards(buttonList: string[] | undefined) {
                                    world.setDynamicProperty(
                                        "andexdbSettings:ui.menus.playerMenu_leaderboards.leaderboards",
                                        JSON.stringify(buttonList ?? defaultPlayerMenuLeaderboardStatistics.map((s) => s.id))
                                    );
                                }
                                /**
                                 * Whether to show the time that a player was last online in the stats list that is shown when a player click on another player in a leaderboard.
                                 *
                                 * Dynamic Property ID: `andexdbSettings:ui.menus.playerMenu_leaderboards.showLastOnlineTimeInPlayerStatsList`
                                 *
                                 * @default false
                                 */
                                static get showLastOnlineTimeInPlayerStatsList(): boolean {
                                    return Boolean(
                                        world.getDynamicProperty("andexdbSettings:ui.menus.playerMenu_leaderboards.showLastOnlineTimeInPlayerStatsList") ??
                                            false
                                    );
                                }
                                static set showLastOnlineTimeInPlayerStatsList(show: boolean | undefined) {
                                    world.setDynamicProperty(
                                        "andexdbSettings:ui.menus.playerMenu_leaderboards.showLastOnlineTimeInPlayerStatsList",
                                        show ?? false
                                    );
                                }
                                /**
                                 * Whether to show banned players inside of the leaderboards.
                                 *
                                 * Dynamic Property ID: `andexdbSettings:ui.menus.playerMenu_leaderboards.showBannedPlayersInLeaderboards`
                                 *
                                 * @default false
                                 */
                                static get showBannedPlayersInLeaderboards(): boolean {
                                    return Boolean(
                                        world.getDynamicProperty("andexdbSettings:ui.menus.playerMenu_leaderboards.showBannedPlayersInLeaderboards") ?? false
                                    );
                                }
                                static set showBannedPlayersInLeaderboards(show: boolean | undefined) {
                                    world.setDynamicProperty("andexdbSettings:ui.menus.playerMenu_leaderboards.showBannedPlayersInLeaderboards", show ?? false);
                                }
                            }
                            return config_ui_menus_playerMenu_leaderboards;
                        }
                    }
                    return config_ui_menus;
                }
                /**
                 * The main UI settings.
                 * @group Subclasses
                 */
                static get main() {
                    /**
                     * The main UI settings.
                     * @hideconstructor
                     * @nameOverride main
                     * @parentOverride Globals.config.ui:class
                     * @group Subclasses
                     */
                    class config_ui_main {}
                    return config_ui_main;
                }
                /**
                 * The settings for paged UI menus.
                 * @group Subclasses
                 */
                static get pages() {
                    /**
                     * The settings for paged UI menus.
                     * @hideconstructor
                     * @nameOverride pages
                     * @parentOverride Globals.config.ui:class
                     * @group Subclasses
                     */
                    class config_ui_pages {
                        /**
                         * Moved from {@link config} to {@link config.ui.pages} in version 1.23.0-preview.20+BUILD.1 on 10/04/2024 at 3:10:37 PM PDT.
                         */
                        static get maxPlayersPerManagePlayersPage(): number {
                            return Number(world.getDynamicProperty("andexdbSettings:maxPlayersPerManagePlayersPage") ?? 9);
                        }
                        static set maxPlayersPerManagePlayersPage(maxPlayersPerManagePlayersPage: number | undefined) {
                            world.setDynamicProperty(
                                "andexdbSettings:maxPlayersPerManagePlayersPage",
                                Math.min(1000, Math.max(1, maxPlayersPerManagePlayersPage ?? 9))
                            );
                        }
                        /**
                         * Moved from {@link config} to {@link config.ui.pages} in version 1.23.0-preview.20+BUILD.1 on 10/04/2024 at 3:10:37 PM PDT.
                         */
                        static get maxBansPerManageBansPage(): number {
                            return Number(world.getDynamicProperty("andexdbSettings:maxBansPerManageBansPage") ?? 10);
                        }
                        static set maxBansPerManageBansPage(maxBansPerManageBansPage: number | undefined) {
                            world.setDynamicProperty("andexdbSettings:maxBansPerManageBansPage", maxBansPerManageBansPage ?? 10);
                        }
                        /**
                         * Moved from {@link config} to {@link config.ui.pages} in version 1.23.0-preview.20+BUILD.1 on 10/04/2024 at 3:10:37 PM PDT.
                         */
                        static get maxHomesPerManageHomesPage(): number {
                            return Number(world.getDynamicProperty("andexdbSettings:maxHomesPerManageHomesPage") ?? 10);
                        }
                        static set maxHomesPerManageHomesPage(maxHomesPerManageHomesPage: number | undefined) {
                            world.setDynamicProperty("andexdbSettings:maxHomesPerManageHomesPage", maxHomesPerManageHomesPage ?? 10);
                        }
                    }
                    return config_ui_pages;
                }
                /**
                 * Other UI settings.
                 * @group Subclasses
                 */
                static get other() {
                    /**
                     * Other UI settings.
                     * @hideconstructor
                     * @nameOverride other
                     * @parentOverride Globals.config.ui:class
                     * @group Subclasses
                     */
                    class config_ui_other {
                        static get useStarWarsReference404Page() {
                            return Boolean(world.getDynamicProperty("andexdbUISettings:other.useStarWarsReference404Page") ?? false);
                        }
                        static set useStarWarsReference404Page(useStarWarsReference404Page: boolean | undefined) {
                            world.setDynamicProperty("andexdbUISettings:other.useStarWarsReference404Page", useStarWarsReference404Page ?? false);
                        }
                    }
                    return config_ui_other;
                }
            }
            return config_ui;
        }
        /**
         * System settings.
         * @group Subclasses
         */
        static get system() {
            /**
             * System settings.
             * @hideconstructor
             * @nameOverride system
             * @parentOverride Globals.config
             * @group Subclasses
             */
            class config_system {
                static get artificialLagMS(): number {
                    return Number(world.getDynamicProperty("andexdbSettings:artificialLagMS") ?? 0);
                }
                static set artificialLagMS(artificialLagMS: number | undefined) {
                    world.setDynamicProperty("andexdbSettings:artificialLagMS", artificialLagMS ?? 0);
                }
                /**
                 * The default minimum time between tick waits, in milliseconds.
                 *
                 * This will be the minimum amount of milliseconds that many generation functions will spend each tick, set this to a really low value to reduce lag while using them, but setting it really low will also cause the generation functions to take a really long time.
                 *
                 * Setting it close to or above 10000 may cause the generation functions to be interrupted with script hang errors.
                 *
                 * @default 2500
                 */
                static get defaultMinMSBetweenTickWaits(): number {
                    return Number(world.getDynamicProperty("andexdbSettings:defaultMinMSBetweenTickWaits") ?? 2500);
                }
                static set defaultMinMSBetweenTickWaits(defaultMinMSBetweenTickWaits: number | undefined) {
                    world.setDynamicProperty("andexdbSettings:defaultMinMSBetweenTickWaits", defaultMinMSBetweenTickWaits ?? 2500);
                }
                static get timeZone(): number {
                    return isNaN(Number(world.getDynamicProperty("andexdbSettings:timeZone")))
                        ? 0
                        : Number(world.getDynamicProperty("andexdbSettings:timeZone") ?? 0);
                }
                static set timeZone(timeZone: number | undefined) {
                    world.setDynamicProperty("andexdbSettings:timeZone", timeZone ?? 0);
                }
                static get playerDataRefreshRate(): number {
                    return Number(world.getDynamicProperty("andexdbSettings:playerDataRefreshRate") ?? 20);
                }
                static set playerDataRefreshRate(playerDataRefreshRate: number | undefined) {
                    world.setDynamicProperty(
                        "andexdbSettings:playerDataRefreshRate",
                        Number.isNaN(Number(playerDataRefreshRate)) ? 5 : Math.min(1000, Math.max(1, Number(playerDataRefreshRate ?? 20)))
                    );
                }
                /**
                 * How often to refresh protected areas.
                 *
                 * Dynamic Property ID: `andexdbSettings:protectedAreasRefreshRate`
                 *
                 * @default 200
                 *
                 * @deprecated
                 */
                static get protectedAreasRefreshRate(): number {
                    return Number(world.getDynamicProperty("andexdbSettings:protectedAreasRefreshRate") ?? 200);
                }
                static set protectedAreasRefreshRate(protectedAreasRefreshRate: number | undefined) {
                    world.setDynamicProperty(
                        "andexdbSettings:protectedAreasRefreshRate",
                        Number.isNaN(Number(protectedAreasRefreshRate)) ? 200 : Math.min(1000000, Math.max(1, Number(protectedAreasRefreshRate ?? 200)))
                    );
                }
                /**
                 * Whether to enable zone actions for protected areas.
                 *
                 * Dynamic Property ID: `andexdbSettings:protectedAreasZoneActionsEnabled`
                 *
                 * @default true
                 */
                static get protectedAreasZoneActionsEnabled(): boolean {
                    return Boolean(world.getDynamicProperty("andexdbSettings:protectedAreasZoneActionsEnabled") ?? true);
                }
                static set protectedAreasZoneActionsEnabled(protectedAreasZoneActionsEnabled: boolean | undefined) {
                    world.setDynamicProperty("andexdbSettings:protectedAreasZoneActionsEnabled", protectedAreasZoneActionsEnabled ?? true);
                }
                /**
                 * How often in ticks to execute the zone actions.
                 *
                 * Dynamic Property ID: `andexdbSettings:protectedAreasZoneActionsInterval`
                 *
                 * @default 5
                 */
                static get protectedAreasZoneActionsInterval(): number {
                    return Number(world.getDynamicProperty("andexdbSettings:protectedAreasZoneActionsInterval") ?? 5);
                }
                static set protectedAreasZoneActionsInterval(protectedAreasZoneActionsInterval: number | undefined) {
                    world.setDynamicProperty(
                        "andexdbSettings:protectedAreasZoneActionsInterval",
                        Number.isNaN(Number(protectedAreasZoneActionsInterval))
                            ? 5
                            : Math.min(1000000, Math.max(1, Number(protectedAreasZoneActionsInterval ?? 5)))
                    );
                }
                /**
                 * How often in milliseconds to refresh the list of protected areas zones with zone actions.
                 *
                 * Dynamic Property ID: `andexdbSettings:protectedAreasZoneRefreshInterval`
                 *
                 * @default 200
                 */
                static get protectedAreasZoneRefreshInterval(): number {
                    return Number(world.getDynamicProperty("andexdbSettings:protectedAreasZoneRefreshInterval") ?? 200);
                }
                static set protectedAreasZoneRefreshInterval(protectedAreasZoneRefreshInterval: number | undefined) {
                    world.setDynamicProperty(
                        "andexdbSettings:protectedAreasZoneRefreshInterval",
                        Number.isNaN(Number(protectedAreasZoneRefreshInterval))
                            ? 200
                            : Math.min(1000000, Math.max(1, Number(protectedAreasZoneRefreshInterval ?? 200)))
                    );
                }
                /**
                 * How often in ticks to check for banned players.
                 *
                 * Dynamic Property ID: `andexdbSettings:bannedPlayersRefreshRate`
                 *
                 * @default 20
                 */
                static get bannedPlayersRefreshRate(): number {
                    return Number(world.getDynamicProperty("andexdbSettings:bannedPlayersRefreshRate") ?? 20);
                }
                static set bannedPlayersRefreshRate(bannedPlayersRefreshRate: number | undefined) {
                    world.setDynamicProperty(
                        "andexdbSettings:bannedPlayersRefreshRate",
                        Number.isNaN(Number(bannedPlayersRefreshRate)) ? 20 : Math.min(1000, Math.max(1, Number(bannedPlayersRefreshRate ?? 20)))
                    );
                }
                static get debugMode(): boolean {
                    return Boolean(world.getDynamicProperty("andexdbSettings:debugMode") ?? false);
                }
                static set debugMode(debugMode: boolean | undefined) {
                    world.setDynamicProperty("andexdbSettings:debugMode", debugMode ?? false);
                }
                /**
                 * It is recommended to leave this set to false.
                 *
                 * Dynamic Property ID: `andexdbSettings:allowWatchdogTerminationCrash`
                 *
                 * @default false
                 */
                static get allowWatchdogTerminationCrash(): boolean {
                    return Boolean(world.getDynamicProperty("andexdbSettings:allowWatchdogTerminationCrash") ?? false);
                }
                static set allowWatchdogTerminationCrash(allowWatchdogTerminationCrash: boolean | undefined) {
                    world.setDynamicProperty("andexdbSettings:allowWatchdogTerminationCrash", allowWatchdogTerminationCrash ?? false);
                }
                /**
                 * It is recommended to leave this set to false.
                 *
                 * Dynamic Property ID: `andexdbSettings:hideWatchdogTerminationCrashEnabledWarningsOnStartup`
                 *
                 * @default false
                 */
                static get hideWatchdogTerminationCrashEnabledWarningsOnStartup(): boolean {
                    return Boolean(world.getDynamicProperty("andexdbSettings:hideWatchdogTerminationCrashEnabledWarningsOnStartup") ?? false);
                }
                static set hideWatchdogTerminationCrashEnabledWarningsOnStartup(hideWatchdogTerminationCrashEnabledWarningsOnStartup: boolean | undefined) {
                    world.setDynamicProperty(
                        "andexdbSettings:hideWatchdogTerminationCrashEnabledWarningsOnStartup",
                        hideWatchdogTerminationCrashEnabledWarningsOnStartup ?? false
                    );
                }
                static get autoSavePlayerData(): boolean {
                    return Boolean(world.getDynamicProperty("andexdbSettings:autoSavePlayerData") ?? true);
                }
                static set autoSavePlayerData(autoSavePlayerData: boolean | undefined) {
                    world.setDynamicProperty("andexdbSettings:autoSavePlayerData", autoSavePlayerData ?? true);
                }
                /**
                 * It is recommended to leave this set to false.
                 *
                 * Dynamic Property ID: `andexdbSettings:useLegacyPlayerInventoryDataSaveSystem`
                 *
                 * @default false
                 */
                static get useLegacyPlayerInventoryDataSaveSystem(): boolean {
                    return Boolean(world.getDynamicProperty("andexdbSettings:useLegacyPlayerInventoryDataSaveSystem") ?? false);
                }
                static set useLegacyPlayerInventoryDataSaveSystem(useLegacyPlayerInventoryDataSaveSystem: boolean | undefined) {
                    world.setDynamicProperty("andexdbSettings:useLegacyPlayerInventoryDataSaveSystem", useLegacyPlayerInventoryDataSaveSystem ?? false);
                }
                static get playerInventoryDataSaveSystemEnabled(): boolean {
                    return Boolean(world.getDynamicProperty("andexdbSettings:playerInventoryDataSaveSystemEnabled") ?? true);
                }
                static set playerInventoryDataSaveSystemEnabled(playerInventoryDataSaveSystemEnabled: boolean | undefined) {
                    world.setDynamicProperty("andexdbSettings:playerInventoryDataSaveSystemEnabled", playerInventoryDataSaveSystemEnabled ?? true);
                }
                static get spreadPlayerInventoryDataSavesOverMultipleTicks(): boolean {
                    return Boolean(world.getDynamicProperty("andexdbSettings:spreadPlayerInventoryDataSavesOverMultipleTicks") ?? true);
                }
                static set spreadPlayerInventoryDataSavesOverMultipleTicks(spreadPlayerInventoryDataSavesOverMultipleTicks: boolean | undefined) {
                    world.setDynamicProperty(
                        "andexdbSettings:spreadPlayerInventoryDataSavesOverMultipleTicks",
                        spreadPlayerInventoryDataSavesOverMultipleTicks ?? true
                    );
                }
                static get playerDataSavePerformanceMode(): PlayerDataSaveMode {
                    return String(world.getDynamicProperty("andexdbSettings:playerDataSavePerformanceMode") ?? "full") as PlayerDataSaveMode;
                }
                static set playerDataSavePerformanceMode(playerDataSavePerformanceMode: PlayerDataSaveMode | undefined) {
                    world.setDynamicProperty("andexdbSettings:playerDataSavePerformanceMode", playerDataSavePerformanceMode ?? "full");
                }
                static get showEntityScaleNotFoundConsoleLog(): boolean {
                    return Boolean(world.getDynamicProperty("andexdbSettings:showEntityScaleNotFoundConsoleLog") ?? true);
                }
                static set showEntityScaleNotFoundConsoleLog(showEntityScaleNotFoundConsoleLog: boolean | undefined) {
                    world.setDynamicProperty("andexdbSettings:showEntityScaleNotFoundConsoleLog", showEntityScaleNotFoundConsoleLog ?? true);
                }
                static get showEntityScaleFoundConsoleLog(): boolean {
                    return Boolean(world.getDynamicProperty("andexdbSettings:showEntityScaleFoundConsoleLog") ?? true);
                }
                static set showEntityScaleFoundConsoleLog(showEntityScaleFoundConsoleLog: boolean | undefined) {
                    world.setDynamicProperty("andexdbSettings:showEntityScaleFoundConsoleLog", showEntityScaleFoundConsoleLog ?? true);
                }
                static get showEntityScaleNotFoundChatLog(): boolean {
                    return Boolean(world.getDynamicProperty("andexdbSettings:showEntityScaleNotFoundChatLog") ?? false);
                }
                static set showEntityScaleNotFoundChatLog(showEntityScaleNotFoundChatLog: boolean | undefined) {
                    world.setDynamicProperty("andexdbSettings:showEntityScaleNotFoundChatLog", showEntityScaleNotFoundChatLog ?? false);
                }
                static get showEntityScaleFoundChatLog(): boolean {
                    return Boolean(world.getDynamicProperty("andexdbSettings:showEntityScaleFoundChatLog") ?? false);
                }
                static set showEntityScaleFoundChatLog(showEntityScaleFoundChatLog: boolean | undefined) {
                    world.setDynamicProperty("andexdbSettings:showEntityScaleFoundChatLog", showEntityScaleFoundChatLog ?? false);
                }
                static get showBlueModsAnticheatNotFoundConsoleLog(): boolean {
                    return Boolean(world.getDynamicProperty("andexdbSettings:showBlueModsAnticheatNotFoundConsoleLog") ?? true);
                }
                static set showBlueModsAnticheatNotFoundConsoleLog(showBlueModsAnticheatNotFoundConsoleLog: boolean | undefined) {
                    world.setDynamicProperty("andexdbSettings:showBlueModsAnticheatNotFoundConsoleLog", showBlueModsAnticheatNotFoundConsoleLog ?? true);
                }
                static get showBlueModsAnticheatFoundConsoleLog(): boolean {
                    return Boolean(world.getDynamicProperty("andexdbSettings:showBlueModsAnticheatFoundConsoleLog") ?? true);
                }
                static set showBlueModsAnticheatFoundConsoleLog(showBlueModsAnticheatFoundConsoleLog: boolean | undefined) {
                    world.setDynamicProperty("andexdbSettings:showBlueModsAnticheatFoundConsoleLog", showBlueModsAnticheatFoundConsoleLog ?? true);
                }
                static get showBlueModsAnticheatNotFoundChatLog(): boolean {
                    return Boolean(world.getDynamicProperty("andexdbSettings:showBlueModsAnticheatNotFoundChatLog") ?? false);
                }
                static set showBlueModsAnticheatNotFoundChatLog(showBlueModsAnticheatNotFoundChatLog: boolean | undefined) {
                    world.setDynamicProperty("andexdbSettings:showBlueModsAnticheatNotFoundChatLog", showBlueModsAnticheatNotFoundChatLog ?? false);
                }
                static get showBlueModsAnticheatFoundChatLog(): boolean {
                    return Boolean(world.getDynamicProperty("andexdbSettings:showBlueModsAnticheatFoundChatLog") ?? false);
                }
                static set showBlueModsAnticheatFoundChatLog(showBlueModsAnticheatFoundChatLog: boolean | undefined) {
                    world.setDynamicProperty("andexdbSettings:showBlueModsAnticheatFoundChatLog", showBlueModsAnticheatFoundChatLog ?? false);
                }
                /**
                 * Sets whether or not the add-on is allowed to connect to and communicate with the entity scale add-on.
                 * @warning It is HIGHLY DISCOURAGED to disable this option.
                 */
                static get allowConnectingToEntityScale(): boolean {
                    return Boolean(world.getDynamicProperty("andexdbSettings:allowConnectingToEntityScale") ?? true);
                }
                static set allowConnectingToEntityScale(allowConnectingToEntityScale: boolean | undefined) {
                    world.setDynamicProperty("andexdbSettings:allowConnectingToEntityScale", allowConnectingToEntityScale ?? true);
                }
                /**
                 * Sets whether or not the add-on is allowed to connect to and communicate with the BlueMods Anticheat add-on.
                 * @warning It is HIGHLY DISCOURAGED to disable this option.
                 */
                static get allowConnectingToBlueModsAnticheat(): boolean {
                    return Boolean(world.getDynamicProperty("andexdbSettings:allowConnectingToBlueModsAnticheat") ?? true);
                }
                static set allowConnectingToBlueModsAnticheat(allowConnectingToBlueModsAnticheat: boolean | undefined) {
                    world.setDynamicProperty("andexdbSettings:allowConnectingToBlueModsAnticheat", allowConnectingToBlueModsAnticheat ?? true);
                }
            }
            return config_system;
        }
        /**
         * Resets the specified subsection of the config, or the entire config if no subsection is specified.
         * @param subsection The subsection of the config to reset. If not specified, the entire config will be reset.
         *
         * @example Reset the `config.worldBorder.overworld` section of the config:
         * ```ts
         * config.reset(config.worldBorder.overworld);
         * ```
         *
         * @example Reset the entire config:
         * ```ts
         * config.reset();
         * ```
         */
        static reset(subsection?: any): void {
            function resetProperties(obj: any) {
                const descriptors = Object.getOwnPropertyDescriptors(obj);
                for (const [key, descriptor] of Object.entries(descriptors)) {
                    if (descriptor?.get && descriptor.set) {
                        obj[key] = undefined;
                    } else if (descriptor?.get && typeof descriptor.get() === "function") {
                        resetProperties(descriptor.get());
                    }
                }
            }
            resetProperties(subsection ?? config);
        }
        /**
         * Applies the specified settings to the config.
         * @param {FilterKey<DeepPartial<typeof config>, ["prototype", "reset", "applySettings", "toJSON"]>} settings The settings to apply to the config, as a partial of the JSONified version of the config.
         *
         * @example Apply settings to the config:
         * ```ts
         * config.applySettings({
         *     worldBorder: {
         *         overworld: {
         *             enabled: true
         *         },
         *     },
         *     chatCommandPrefix: "!",
         * });
         * ```
         */
        static applySettings<T extends FilterKey<typeof config, ["prototype", "reset", "applySettings", "toJSON"]>>(settings: DeepPartial<T>): void {
            function applySettingsRecursive(settings: any, target: any) {
                for (const key in settings) {
                    if (settings.hasOwnProperty(key)) {
                        const descriptor = Object.getOwnPropertyDescriptor(target, key);
                        if (descriptor?.get && descriptor.set) {
                            if (typeof settings[key] === "object" && settings[key] !== null && !Array.isArray(settings[key])) {
                                applySettingsRecursive(settings[key], target[key]);
                            } else {
                                target[key] = settings[key];
                            }
                        }
                    }
                }
            }
            applySettingsRecursive(settings, config);
        }
        /**
         * Converts the config object to a JSON-serializable object.
         * @returns {FilterKey<typeof config, ["prototype", "reset", "applySettings", "toJSON"]>} An object that can be serialized to JSON, containing all the properties of the config object except for the ones with the names "prototype", "reset", "applySettings", and "toJSON", and the ones that are not enumerable.
         */
        static toJSON(): FilterKey<typeof config, ["prototype", "reset", "applySettings", "toJSON"]> {
            // modules.utils.filterProperties(modules.utils.filterProperties(config, ["addCommaSeparators", "spawnCommandAllowCrossDimensionalTeleport", "allowWatchdogTerminationCrash", "spawnCommandLocation", "allowChatEscapeCodes"], {}), ["toJSON"], {}).antiSpamSystem.antispamEnabled;
            return Object.fromEntries(
                cullUndefined(
                    Object.getOwnPropertyNames(this).map((key) => {
                        const descriptor = Object.getOwnPropertyDescriptor(this, key);
                        if (descriptor?.get && descriptor.set) {
                            return [key, descriptor.get()];
                        } else if (descriptor?.get && typeof descriptor.get() === "function" && descriptor.get()?.name?.startsWith("config")) {
                            return [key, config.toJSON.call(descriptor.get())];
                        }
                        // return [key, this[key as keyof typeof config]];
                        return undefined;
                    })
                )
            ) as ReturnType<typeof modules.utils.filterProperties<typeof config, ["prototype", "reset", "applySettings", "toJSON"]>>; /* 
                Object.getOwnPropertyNames(config)
                    .filter(
                        (n) =>
                            ![
                                "constructor",
                                "toString",
                                "toLocaleString",
                                "valueOf",
                                "hasOwnProperty",
                                "name",
                                "prototype",
                                "reset",
                                "applySettings",
                                "length",
                                "toJSON",
                            ].includes(n)
                    )
                    .map((n) => [n, config[n as keyof typeof config]])
            ); */
        }
    }
}

export import config = exports.config;
/**
 * {@inheritDoc exports.config.system}
 */
export const system = exports.config.system;

Object.defineProperties(globalThis, {
    config: {
        value: exports.config,
        configurable: false,
        enumerable: true,
        writable: false,
    },
});

declare global {
    namespace globalThis {
        export import config = exports.config;
    }
}
