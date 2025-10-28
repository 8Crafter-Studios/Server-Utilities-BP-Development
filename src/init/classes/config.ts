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
                        public static get mode(): number {
                            return Number(world.getDynamicProperty("andexdbWorldBorderSettings:overworld.mode") ?? 1);
                        }
                        public static set mode(mode: number | undefined) {
                            world.setDynamicProperty("andexdbWorldBorderSettings:overworld.mode", mode ?? 1);
                        }
                        /**
                         * The amount of damage the overworld world border does to players when the {@link mode} is set to `2` (Damage Players).
                         *
                         * Dynamic Property ID: `andexdbWorldBorderSettings:overworld.damageMode.damage`
                         *
                         * @default 1
                         */
                        public static get damage(): number {
                            return Number(world.getDynamicProperty("andexdbWorldBorderSettings:overworld.damageMode.damage") ?? 1);
                        }
                        public static set damage(damage: number | undefined) {
                            world.setDynamicProperty("andexdbWorldBorderSettings:overworld.damageMode.damage", damage ?? 1);
                        }
                        /**
                         * The amount of horizontal knockback the overworld world border does to players when the {@link mode} is set to `1` (Yeet Players).
                         *
                         * Dynamic Property ID: `andexdbWorldBorderSettings:overworld.knockbackMode.knockbackH`
                         *
                         * @default 2.5
                         */
                        public static get knockbackH(): number {
                            return Number(world.getDynamicProperty("andexdbWorldBorderSettings:overworld.knockbackMode.knockbackH") ?? 2.5);
                        }
                        public static set knockbackH(horizontalKnockback: number | undefined) {
                            world.setDynamicProperty("andexdbWorldBorderSettings:overworld.knockbackMode.knockbackH", horizontalKnockback ?? 2.5);
                        }
                        /**
                         * The amount of vertical knockback the overworld world border does to players when the {@link mode} is set to `1` (Yeet Players).
                         *
                         * Dynamic Property ID: `andexdbWorldBorderSettings:overworld.knockbackMode.knockbackV`
                         *
                         * @default 1.25
                         */
                        public static get knockbackV(): number {
                            return Number(world.getDynamicProperty("andexdbWorldBorderSettings:overworld.knockbackMode.knockbackV") ?? 1.25);
                        }
                        public static set knockbackV(verticalKnockback: number | undefined) {
                            world.setDynamicProperty("andexdbWorldBorderSettings:overworld.knockbackMode.knockbackV", verticalKnockback ?? 1.25);
                        }
                        /**
                         * Whether or not to prevent players from interacting with the world outside of the world border for the overworld.
                         *
                         * Dynamic Property ID: `andexdbWorldBorderSettings:overworld.preventWorldInteractionOutsideBorder`
                         *
                         * @default false
                         */
                        public static get preventWorldInteractionOutsideBorder(): boolean {
                            return Boolean(world.getDynamicProperty("andexdbWorldBorderSettings:overworld.preventWorldInteractionOutsideBorder") ?? false);
                        }
                        public static set preventWorldInteractionOutsideBorder(preventWorldInteractionOutsideBorder: boolean | undefined) {
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
                        public static get tintIntensity(): number {
                            return Number(world.getDynamicProperty("andexdbWorldBorderSettings:overworld.tintIntensity") ?? 1);
                        }
                        public static set tintIntensity(tintIntensity: number | undefined) {
                            world.setDynamicProperty("andexdbWorldBorderSettings:overworld.tintIntensity", tintIntensity ?? 1);
                        }
                        /**
                         * d
                         * @todo
                         */
                        public static get warnPlayersInChat(): boolean {
                            return Boolean(world.getDynamicProperty("andexdbWorldBorderSettings:overworld.warnPlayersInChat") ?? false);
                        }
                        /**
                         * c
                         * @todo
                         */
                        public static set warnPlayersInChat(warnPlayersInChat: boolean | undefined) {
                            world.setDynamicProperty("andexdbWorldBorderSettings:overworld.warnPlayersInChat", warnPlayersInChat ?? false);
                        }
                        /**
                         * b
                         * @todo
                         */
                        public static get showActionbarWarningWhenOutsideBorder(): boolean {
                            return Boolean(world.getDynamicProperty("andexdbWorldBorderSettings:overworld.showActionbarWarningWhenOutsideBorder") ?? false);
                        }
                        /**
                         * a
                         * @todo
                         */
                        public static set showActionbarWarningWhenOutsideBorder(showActionbarWarningWhenOutsideBorder: boolean | undefined) {
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
                        public static get showRedScreenOutlineWhenOutsideBorder(): boolean {
                            return Boolean(world.getDynamicProperty("andexdbWorldBorderSettings:overworld.showRedScreenOutlineWhenOutsideBorder") ?? true);
                        }
                        public static set showRedScreenOutlineWhenOutsideBorder(showRedScreenOutlineWhenOutsideBorder: boolean | undefined) {
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
                        public static get showBorderParticles(): boolean {
                            return Boolean(world.getDynamicProperty("andexdbWorldBorderSettings:overworld.showBorderParticles") ?? true);
                        }
                        public static set showBorderParticles(showBorderParticles: boolean | undefined) {
                            world.setDynamicProperty("andexdbWorldBorderSettings:overworld.showBorderParticles", showBorderParticles ?? true);
                        }
                        /**
                         * @deprecated
                         */
                        public static get useShadersCompatibleBorderParticles(): boolean {
                            return Boolean(world.getDynamicProperty("andexdbWorldBorderSettings:overworld.useShadersCompatibleBorderParticles") ?? false);
                        }
                        public static set useShadersCompatibleBorderParticles(useShadersCompatibleBorderParticles: boolean | undefined) {
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
                        public static get buffer(): number {
                            return Number(world.getDynamicProperty("andexdbWorldBorderSettings:overworld.buffer") ?? 5);
                        }
                        public static set buffer(buffer: number | undefined) {
                            world.setDynamicProperty("andexdbWorldBorderSettings:overworld.buffer", buffer ?? 5);
                        }
                    }
                    return config_worldBorder_overworld;
                }
                /**
                 * The world border settings for the nether.
                 * @group Subclasses
                 */
                public static get nether() {
                    /**
                     * The world border settings for the nether.
                     * @hideconstructor
                     * @nameOverride nether
                     * @parentOverride Globals.config.worldBorder:class
                     * @group Subclasses
                     */
                    class config_worldBorder_nether {
                        /**
                         * Whether or not the world border is enabled for the nether.
                         *
                         * Dynamic Property ID: `andexdbWorldBorderSettings:nether.enabled`
                         *
                         * @default false
                         */
                        public static get enabled(): boolean {
                            return Boolean(world.getDynamicProperty("andexdbWorldBorderSettings:nether.enabled") ?? false);
                        }
                        public static set enabled(enabled: boolean | undefined) {
                            world.setDynamicProperty("andexdbWorldBorderSettings:nether.enabled", enabled ?? false);
                        }
                        /**
                         * The minimum x and z coordinates of the world border for the nether.
                         *
                         * Dynamic Property ID: `andexdbWorldBorderSettings:nether.from`
                         *
                         * @default
                         * ```typescript
                         * { x: -29999984, z: -29999984 }
                         * ```
                         */
                        public static get from(): { x: number; z: number } {
                            const pos: { x: number; z: number } = tryget(() =>
                                JSON.parse(String(world.getDynamicProperty("andexdbWorldBorderSettings:nether.from") ?? "{x: -29999984, z: -29999984}"))
                            ) ?? { x: -29999984, z: -29999984 };
                            return {
                                x: typeof pos.x === "number" && pos.x.isFinite() ? pos.x : -29999984,
                                z: typeof pos.z === "number" && pos.z.isFinite() ? pos.z : -29999984,
                            };
                        }
                        public static set from(from: { x: number; z: number } | { x: null; z: null } | undefined) {
                            world.setDynamicProperty("andexdbWorldBorderSettings:nether.from", JSON.stringify({ x: -29999984, z: -29999984, ...from }));
                        }
                        /**
                         * The maximum x and z coordinates of the world border for the nether.
                         *
                         * Dynamic Property ID: `andexdbWorldBorderSettings:nether.to`
                         *
                         * @default
                         * ```typescript
                         * { x: 29999984, z: 29999984 }
                         * ```
                         */
                        public static get to(): { x: number; z: number } {
                            const pos: { x: number; z: number } = tryget(() =>
                                JSON.parse(String(world.getDynamicProperty("andexdbWorldBorderSettings:nether.to") ?? "{x: 29999984, z: 29999984}"))
                            ) ?? { x: 29999984, z: 29999984 };
                            return {
                                x: typeof pos.x === "number" && pos.x.isFinite() ? pos.x : 29999984,
                                z: typeof pos.z === "number" && pos.z.isFinite() ? pos.z : 29999984,
                            };
                        }
                        public static set to(to: { x: number; z: number } | { x: null; z: null } | undefined) {
                            world.setDynamicProperty("andexdbWorldBorderSettings:nether.to", JSON.stringify({ x: 29999984, z: 29999984, ...to }));
                        }
                        /**
                         * The mode of the world border for the nether.
                         *
                         * `0` - Teleport Players\
                         * `1` - Yeet Players\
                         * `2` - Damage Players
                         *
                         * Dynamic Property ID: `andexdbWorldBorderSettings:nether.mode`
                         *
                         * @default 1
                         */
                        public static get mode(): number {
                            return Number(world.getDynamicProperty("andexdbWorldBorderSettings:nether.mode") ?? 1);
                        }
                        public static set mode(mode: number | undefined) {
                            world.setDynamicProperty("andexdbWorldBorderSettings:nether.mode", mode ?? 1);
                        }
                        /**
                         * The amount of damage the nether world border does to players when the {@link mode} is set to `2` (Damage Players).
                         *
                         * Dynamic Property ID: `andexdbWorldBorderSettings:nether.damageMode.damage`
                         *
                         * @default 1
                         */
                        public static get damage(): number {
                            return Number(world.getDynamicProperty("andexdbWorldBorderSettings:nether.damageMode.damage") ?? 1);
                        }
                        public static set damage(damage: number | undefined) {
                            world.setDynamicProperty("andexdbWorldBorderSettings:nether.damageMode.damage", damage ?? 1);
                        }
                        /**
                         * The amount of horizontal knockback the nether world border does to players when the {@link mode} is set to `1` (Yeet Players).
                         *
                         * Dynamic Property ID: `andexdbWorldBorderSettings:nether.knockbackMode.knockbackH`
                         *
                         * @default 2.5
                         */
                        public static get knockbackH(): number {
                            return Number(world.getDynamicProperty("andexdbWorldBorderSettings:nether.knockbackMode.knockbackH") ?? 2.5);
                        }
                        public static set knockbackH(horizontalKnockback: number | undefined) {
                            world.setDynamicProperty("andexdbWorldBorderSettings:nether.knockbackMode.knockbackH", horizontalKnockback ?? 2.5);
                        }
                        /**
                         * The amount of vertical knockback the nether world border does to players when the {@link mode} is set to `1` (Yeet Players).
                         *
                         * Dynamic Property ID: `andexdbWorldBorderSettings:nether.knockbackMode.knockbackV`
                         *
                         * @default 1.25
                         */
                        public static get knockbackV(): number {
                            return Number(world.getDynamicProperty("andexdbWorldBorderSettings:nether.knockbackMode.knockbackV") ?? 1.25);
                        }
                        public static set knockbackV(verticalKnockback: number | undefined) {
                            world.setDynamicProperty("andexdbWorldBorderSettings:nether.knockbackMode.knockbackV", verticalKnockback ?? 1.25);
                        }
                        /**
                         * Whether or not to prevent players from interacting with the world outside of the world border for the nether.
                         *
                         * Dynamic Property ID: `andexdbWorldBorderSettings:nether.preventWorldInteractionOutsideBorder`
                         *
                         * @default false
                         */
                        public static get preventWorldInteractionOutsideBorder(): boolean {
                            return Boolean(world.getDynamicProperty("andexdbWorldBorderSettings:nether.preventWorldInteractionOutsideBorder") ?? false);
                        }
                        public static set preventWorldInteractionOutsideBorder(preventWorldInteractionOutsideBorder: boolean | undefined) {
                            world.setDynamicProperty(
                                "andexdbWorldBorderSettings:nether.preventWorldInteractionOutsideBorder",
                                preventWorldInteractionOutsideBorder ?? false
                            );
                        }
                        /**
                         * The tint intensity of the world border for the nether.
                         *
                         * This is how many tint particles will be spawned in front of the player when they are outside of the world border.
                         *
                         * Should be an integer of at least `0`.
                         *
                         * Dynamic Property ID: `andexdbWorldBorderSettings:nether.tintIntensity`
                         *
                         * @default 1
                         */
                        public static get tintIntensity(): number {
                            return Number(world.getDynamicProperty("andexdbWorldBorderSettings:nether.tintIntensity") ?? 1);
                        }
                        public static set tintIntensity(tintIntensity: number | undefined) {
                            world.setDynamicProperty("andexdbWorldBorderSettings:nether.tintIntensity", tintIntensity ?? 1);
                        }
                        /**
                         * d
                         * @todo
                         */
                        public static get warnPlayersInChat(): boolean {
                            return Boolean(world.getDynamicProperty("andexdbWorldBorderSettings:nether.warnPlayersInChat") ?? false);
                        }
                        /**
                         * c
                         * @todo
                         */
                        public static set warnPlayersInChat(warnPlayersInChat: boolean | undefined) {
                            world.setDynamicProperty("andexdbWorldBorderSettings:nether.warnPlayersInChat", warnPlayersInChat ?? false);
                        }
                        /**
                         * b
                         * @todo
                         */
                        public static get showActionbarWarningWhenOutsideBorder(): boolean {
                            return Boolean(world.getDynamicProperty("andexdbWorldBorderSettings:nether.showActionbarWarningWhenOutsideBorder") ?? false);
                        }
                        /**
                         * a
                         * @todo
                         */
                        public static set showActionbarWarningWhenOutsideBorder(showActionbarWarningWhenOutsideBorder: boolean | undefined) {
                            world.setDynamicProperty(
                                "andexdbWorldBorderSettings:nether.showActionbarWarningWhenOutsideBorder",
                                showActionbarWarningWhenOutsideBorder ?? false
                            );
                        }
                        /**
                         * Whether or not to show tint particles when the player is outside of the world border for the nether.
                         *
                         * Dynamic Property ID: `andexdbWorldBorderSettings:nether.showRedScreenOutlineWhenOutsideBorder`
                         *
                         * @default true
                         */
                        public static get showRedScreenOutlineWhenOutsideBorder(): boolean {
                            return Boolean(world.getDynamicProperty("andexdbWorldBorderSettings:nether.showRedScreenOutlineWhenOutsideBorder") ?? true);
                        }
                        public static set showRedScreenOutlineWhenOutsideBorder(showRedScreenOutlineWhenOutsideBorder: boolean | undefined) {
                            world.setDynamicProperty(
                                "andexdbWorldBorderSettings:nether.showRedScreenOutlineWhenOutsideBorder",
                                showRedScreenOutlineWhenOutsideBorder ?? true
                            );
                        }
                        /**
                         * Whether or not to show border particles at the edges of the world border for the nether.
                         *
                         * Dynamic Property ID: `andexdbWorldBorderSettings:nether.showBorderParticles`
                         *
                         * @default true
                         */
                        public static get showBorderParticles(): boolean {
                            return Boolean(world.getDynamicProperty("andexdbWorldBorderSettings:nether.showBorderParticles") ?? true);
                        }
                        public static set showBorderParticles(showBorderParticles: boolean | undefined) {
                            world.setDynamicProperty("andexdbWorldBorderSettings:nether.showBorderParticles", showBorderParticles ?? true);
                        }
                        /**
                         * @deprecated
                         */
                        public static get useShadersCompatibleBorderParticles(): boolean {
                            return Boolean(world.getDynamicProperty("andexdbWorldBorderSettings:nether.useShadersCompatibleBorderParticles") ?? false);
                        }
                        public static set useShadersCompatibleBorderParticles(useShadersCompatibleBorderParticles: boolean | undefined) {
                            world.setDynamicProperty(
                                "andexdbWorldBorderSettings:nether.useShadersCompatibleBorderParticles",
                                useShadersCompatibleBorderParticles ?? false
                            );
                        }
                        /**
                         * The minimum distance outside of the nether world border that the player has to be before they start taking damage when the {@link mode} is set to `2` (Damage Players).
                         *
                         * Dynamic Property ID: `andexdbWorldBorderSettings:nether.buffer`
                         *
                         * @default 5
                         */
                        public static get buffer(): number {
                            return Number(world.getDynamicProperty("andexdbWorldBorderSettings:nether.buffer") ?? 5);
                        }
                        public static set buffer(buffer: number | undefined) {
                            world.setDynamicProperty("andexdbWorldBorderSettings:nether.buffer", buffer ?? 5);
                        }
                    }
                    return config_worldBorder_nether;
                }
                /**
                 * The world border settings for the end.
                 * @group Subclasses
                 */
                public static get the_end() {
                    /**
                     * The world border settings for the end.
                     * @hideconstructor
                     * @nameOverride the_end
                     * @parentOverride Globals.config.worldBorder:class
                     * @group Subclasses
                     */
                    class config_worldBorder_the_end {
                        /**
                         * Whether or not the world border is enabled for the end.
                         *
                         * Dynamic Property ID: `andexdbWorldBorderSettings:the_end.enabled`
                         *
                         * @default false
                         */
                        public static get enabled(): boolean {
                            return Boolean(world.getDynamicProperty("andexdbWorldBorderSettings:the_end.enabled") ?? false);
                        }
                        public static set enabled(enabled: boolean | undefined) {
                            world.setDynamicProperty("andexdbWorldBorderSettings:the_end.enabled", enabled ?? false);
                        }
                        /**
                         * The minimum x and z coordinates of the world border for the end.
                         *
                         * Dynamic Property ID: `andexdbWorldBorderSettings:the_end.from`
                         *
                         * @default
                         * ```typescript
                         * { x: -29999984, z: -29999984 }
                         * ```
                         */
                        public static get from(): { x: number; z: number } {
                            const pos: { x: number; z: number } = tryget(() =>
                                JSON.parse(String(world.getDynamicProperty("andexdbWorldBorderSettings:the_end.from") ?? "{x: -29999984, z: -29999984}"))
                            ) ?? { x: -29999984, z: -29999984 };
                            return {
                                x: typeof pos.x === "number" && pos.x.isFinite() ? pos.x : -29999984,
                                z: typeof pos.z === "number" && pos.z.isFinite() ? pos.z : -29999984,
                            };
                        }
                        public static set from(from: { x: number; z: number } | { x: null; z: null } | undefined) {
                            world.setDynamicProperty("andexdbWorldBorderSettings:the_end.from", JSON.stringify({ x: -29999984, z: -29999984, ...from }));
                        }
                        /**
                         * The maximum x and z coordinates of the world border for the end.
                         *
                         * Dynamic Property ID: `andexdbWorldBorderSettings:the_end.to`
                         *
                         * @default
                         * ```typescript
                         * { x: 29999984, z: 29999984 }
                         * ```
                         */
                        public static get to(): { x: number; z: number } {
                            const pos: { x: number; z: number } = tryget(() =>
                                JSON.parse(String(world.getDynamicProperty("andexdbWorldBorderSettings:the_end.to") ?? "{x: 29999984, z: 29999984}"))
                            ) ?? { x: 29999984, z: 29999984 };
                            return {
                                x: typeof pos.x === "number" && pos.x.isFinite() ? pos.x : 29999984,
                                z: typeof pos.z === "number" && pos.z.isFinite() ? pos.z : 29999984,
                            };
                        }
                        public static set to(to: { x: number; z: number } | { x: null; z: null } | undefined) {
                            world.setDynamicProperty("andexdbWorldBorderSettings:the_end.to", JSON.stringify({ x: 29999984, z: 29999984, ...to }));
                        }
                        /**
                         * The mode of the world border for the end.
                         *
                         * `0` - Teleport Players\
                         * `1` - Yeet Players\
                         * `2` - Damage Players
                         *
                         * Dynamic Property ID: `andexdbWorldBorderSettings:the_end.mode`
                         *
                         * @default 1
                         */
                        public static get mode(): number {
                            return Number(world.getDynamicProperty("andexdbWorldBorderSettings:the_end.mode") ?? 1);
                        }
                        public static set mode(mode: number | undefined) {
                            world.setDynamicProperty("andexdbWorldBorderSettings:the_end.mode", mode ?? 1);
                        }
                        /**
                         * The amount of damage the end world border does to players when the {@link mode} is set to `2` (Damage Players).
                         *
                         * Dynamic Property ID: `andexdbWorldBorderSettings:the_end.damageMode.damage`
                         *
                         * @default 1
                         */
                        public static get damage(): number {
                            return Number(world.getDynamicProperty("andexdbWorldBorderSettings:the_end.damageMode.damage") ?? 1);
                        }
                        public static set damage(damage: number | undefined) {
                            world.setDynamicProperty("andexdbWorldBorderSettings:the_end.damageMode.damage", damage ?? 1);
                        }
                        /**
                         * The amount of horizontal knockback the end world border does to players when the {@link mode} is set to `1` (Yeet Players).
                         *
                         * Dynamic Property ID: `andexdbWorldBorderSettings:the_end.knockbackMode.knockbackH`
                         *
                         * @default 2.5
                         */
                        public static get knockbackH(): number {
                            return Number(world.getDynamicProperty("andexdbWorldBorderSettings:the_end.knockbackMode.knockbackH") ?? 2.5);
                        }
                        public static set knockbackH(horizontalKnockback: number | undefined) {
                            world.setDynamicProperty("andexdbWorldBorderSettings:the_end.knockbackMode.knockbackH", horizontalKnockback ?? 2.5);
                        }
                        /**
                         * The amount of vertical knockback the end world border does to players when the {@link mode} is set to `1` (Yeet Players).
                         *
                         * Dynamic Property ID: `andexdbWorldBorderSettings:the_end.knockbackMode.knockbackV`
                         *
                         * @default 1.25
                         */
                        public static get knockbackV(): number {
                            return Number(world.getDynamicProperty("andexdbWorldBorderSettings:the_end.knockbackMode.knockbackV") ?? 1.25);
                        }
                        public static set knockbackV(verticalKnockback: number | undefined) {
                            world.setDynamicProperty("andexdbWorldBorderSettings:the_end.knockbackMode.knockbackV", verticalKnockback ?? 1.25);
                        }
                        /**
                         * Whether or not to prevent players from interacting with the world outside of the world border for the end.
                         *
                         * Dynamic Property ID: `andexdbWorldBorderSettings:the_end.preventWorldInteractionOutsideBorder`
                         *
                         * @default false
                         */
                        public static get preventWorldInteractionOutsideBorder(): boolean {
                            return Boolean(world.getDynamicProperty("andexdbWorldBorderSettings:the_end.preventWorldInteractionOutsideBorder") ?? false);
                        }
                        public static set preventWorldInteractionOutsideBorder(preventWorldInteractionOutsideBorder: boolean | undefined) {
                            world.setDynamicProperty(
                                "andexdbWorldBorderSettings:the_end.preventWorldInteractionOutsideBorder",
                                preventWorldInteractionOutsideBorder ?? false
                            );
                        }
                        /**
                         * The tint intensity of the world border for the end.
                         *
                         * This is how many tint particles will be spawned in front of the player when they are outside of the world border.
                         *
                         * Should be an integer of at least `0`.
                         *
                         * Dynamic Property ID: `andexdbWorldBorderSettings:the_end.tintIntensity`
                         *
                         * @default 1
                         */
                        public static get tintIntensity(): number {
                            return Number(world.getDynamicProperty("andexdbWorldBorderSettings:the_end.tintIntensity") ?? 1);
                        }
                        public static set tintIntensity(tintIntensity: number | undefined) {
                            world.setDynamicProperty("andexdbWorldBorderSettings:the_end.tintIntensity", tintIntensity ?? 1);
                        }
                        /**
                         * d
                         * @todo
                         */
                        public static get warnPlayersInChat(): boolean {
                            return Boolean(world.getDynamicProperty("andexdbWorldBorderSettings:the_end.warnPlayersInChat") ?? false);
                        }
                        /**
                         * c
                         * @todo
                         */
                        public static set warnPlayersInChat(warnPlayersInChat: boolean | undefined) {
                            world.setDynamicProperty("andexdbWorldBorderSettings:the_end.warnPlayersInChat", warnPlayersInChat ?? false);
                        }
                        /**
                         * b
                         * @todo
                         */
                        public static get showActionbarWarningWhenOutsideBorder(): boolean {
                            return Boolean(world.getDynamicProperty("andexdbWorldBorderSettings:the_end.showActionbarWarningWhenOutsideBorder") ?? false);
                        }
                        /**
                         * a
                         * @todo
                         */
                        public static set showActionbarWarningWhenOutsideBorder(showActionbarWarningWhenOutsideBorder: boolean | undefined) {
                            world.setDynamicProperty(
                                "andexdbWorldBorderSettings:the_end.showActionbarWarningWhenOutsideBorder",
                                showActionbarWarningWhenOutsideBorder ?? false
                            );
                        }
                        /**
                         * Whether or not to show tint particles when the player is outside of the world border for the end.
                         *
                         * Dynamic Property ID: `andexdbWorldBorderSettings:the_end.showRedScreenOutlineWhenOutsideBorder`
                         *
                         * @default true
                         */
                        public static get showRedScreenOutlineWhenOutsideBorder(): boolean {
                            return Boolean(world.getDynamicProperty("andexdbWorldBorderSettings:the_end.showRedScreenOutlineWhenOutsideBorder") ?? true);
                        }
                        public static set showRedScreenOutlineWhenOutsideBorder(showRedScreenOutlineWhenOutsideBorder: boolean | undefined) {
                            world.setDynamicProperty(
                                "andexdbWorldBorderSettings:the_end.showRedScreenOutlineWhenOutsideBorder",
                                showRedScreenOutlineWhenOutsideBorder ?? true
                            );
                        }
                        /**
                         * Whether or not to show border particles at the edges of the world border for the end.
                         *
                         * Dynamic Property ID: `andexdbWorldBorderSettings:the_end.showBorderParticles`
                         *
                         * @default true
                         */
                        public static get showBorderParticles(): boolean {
                            return Boolean(world.getDynamicProperty("andexdbWorldBorderSettings:the_end.showBorderParticles") ?? true);
                        }
                        public static set showBorderParticles(showBorderParticles: boolean | undefined) {
                            world.setDynamicProperty("andexdbWorldBorderSettings:the_end.showBorderParticles", showBorderParticles ?? true);
                        }
                        /**
                         * @deprecated
                         */
                        public static get useShadersCompatibleBorderParticles(): boolean {
                            return Boolean(world.getDynamicProperty("andexdbWorldBorderSettings:the_end.useShadersCompatibleBorderParticles") ?? false);
                        }
                        public static set useShadersCompatibleBorderParticles(useShadersCompatibleBorderParticles: boolean | undefined) {
                            world.setDynamicProperty(
                                "andexdbWorldBorderSettings:the_end.useShadersCompatibleBorderParticles",
                                useShadersCompatibleBorderParticles ?? false
                            );
                        }
                        /**
                         * The minimum distance outside of the end world border that the player has to be before they start taking damage when the {@link mode} is set to `2` (Damage Players).
                         *
                         * Dynamic Property ID: `andexdbWorldBorderSettings:the_end.buffer`
                         *
                         * @default 5
                         */
                        public static get buffer(): number {
                            return Number(world.getDynamicProperty("andexdbWorldBorderSettings:the_end.buffer") ?? 5);
                        }
                        public static set buffer(buffer: number | undefined) {
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
        public static get shopSystem() {
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
                public static get server() {
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
                        public static get enabled(): boolean {
                            return Boolean(world.getDynamicProperty("andexdbShopSystemSettings:server.enabled") ?? false);
                        }
                        public static set enabled(enabled: boolean | undefined) {
                            world.setDynamicProperty("andexdbShopSystemSettings:server.enabled", enabled ?? false);
                        }
                    }
                    return config_shopSystem_server;
                }
                /**
                 * The player shop system settings.
                 * @group Subclasses
                 */
                public static get player() {
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
                        public static get enabled(): boolean {
                            return Boolean(world.getDynamicProperty("andexdbShopSystemSettings:player.enabled") ?? false);
                        }
                        public static set enabled(enabled: boolean | undefined) {
                            world.setDynamicProperty("andexdbShopSystemSettings:player.enabled", enabled ?? false);
                        }
                        /**
                         * The maximum amount of shops a player can have.
                         *
                         * Dynamic Property ID: `andexdbShopSystemSettings:player.maxShopsPerPlayer`
                         *
                         * @default 5
                         */
                        public static get maxShopsPerPlayer(): number {
                            return (world.getDynamicProperty("andexdbShopSystemSettings:player.maxShopsPerPlayer") ?? 5).toString().toNumber() ?? 5;
                        }
                        public static set maxShopsPerPlayer(maxShopsPerPlayer: number | undefined) {
                            world.setDynamicProperty("andexdbShopSystemSettings:player.maxShopsPerPlayer", maxShopsPerPlayer ?? 5);
                        }
                        /**
                         * Whether or not players can sell items that are locked to a specific slot in their inventory.
                         *
                         * Dynamic Property ID: `andexdbShopSystemSettings:player.allowSellingLockInSlotItems`
                         *
                         * @default false
                         */
                        public static get allowSellingLockInSlotItems(): boolean {
                            return Boolean(world.getDynamicProperty("andexdbShopSystemSettings:player.allowSellingLockInSlotItems") ?? false);
                        }
                        public static set allowSellingLockInSlotItems(allowSellingLockInSlotItems: boolean | undefined) {
                            world.setDynamicProperty("andexdbShopSystemSettings:player.allowSellingLockInSlotItems", allowSellingLockInSlotItems ?? false);
                        }
                        /**
                         * Whether or not players can sell items that are locked to inventory.
                         *
                         * Dynamic Property ID: `andexdbShopSystemSettings:player.allowSellingLockInInventoryItems`
                         *
                         * @default false
                         */
                        public static get allowSellingLockInInventoryItems(): boolean {
                            return Boolean(world.getDynamicProperty("andexdbShopSystemSettings:player.allowSellingLockInInventoryItems") ?? false);
                        }
                        public static set allowSellingLockInInventoryItems(allowSellingLockInInventoryItems: boolean | undefined) {
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
                        public static get allowSellingKeepOnDeathItems(): boolean {
                            return Boolean(world.getDynamicProperty("andexdbShopSystemSettings:player.allowSellingKeepOnDeathItems") ?? true);
                        }
                        public static set allowSellingKeepOnDeathItems(allowSellingKeepOnDeathItems: boolean | undefined) {
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
                public static get sign() {
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
                        public static get enabled(): boolean {
                            return Boolean(world.getDynamicProperty("andexdbShopSystemSettings:sign.enabled") ?? false);
                        }
                        public static set enabled(enabled: boolean | undefined) {
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
        public static get teleportSystems() {
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
                public static get allowCrossDimensionalTeleport(): boolean {
                    return Boolean(world.getDynamicProperty("teleportSystemsSettings:allowCrossDimensionalTeleport") ?? true);
                }
                public static set allowCrossDimensionalTeleport(enabled: boolean | undefined) {
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
                public static get teleportCooldown(): number {
                    return Number(world.getDynamicProperty("homeSystemSettings:teleportCooldown") ?? 30);
                }
                public static set teleportCooldown(maxHomes: number | undefined) {
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
                public static get standStillTimeToTeleport(): number {
                    return Number(world.getDynamicProperty("homeSystemSettings:standStillTimeToTeleport") ?? 5);
                }
                public static set standStillTimeToTeleport(maxHomes: number | undefined) {
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
                public static get pvpCooldownToTeleport(): number {
                    return isNaN(Number(world.getDynamicProperty("andexdbSettings:pvpCooldownToTeleport")))
                        ? 15
                        : Number(world.getDynamicProperty("andexdbSettings:pvpCooldownToTeleport") ?? 15);
                }
                public static set pvpCooldownToTeleport(invalidChatCommandAction: number | undefined) {
                    world.setDynamicProperty("andexdbSettings:pvpCooldownToTeleport", invalidChatCommandAction ?? 15);
                }
            }
            return config_teleportSystems;
        }
        /**
         * The home system settings.
         * @group Subclasses
         */
        public static get homeSystem() {
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
                public static get homeSystemEnabled(): boolean {
                    return Boolean(world.getDynamicProperty("homeSystemSettings:homeSystemEnabled") ?? true);
                }
                public static set homeSystemEnabled(enabled: boolean | undefined) {
                    world.setDynamicProperty("homeSystemSettings:homeSystemEnabled", enabled ?? true);
                }
                /**
                 * The maximum number of homes a player can have.
                 *
                 * Dynamic Property ID: `homeSystemSettings:maxHomesPerPlayer`
                 *
                 * @default Infinity
                 */
                public static get maxHomesPerPlayer(): number {
                    return world.getDynamicProperty("homeSystemSettings:maxHomesPerPlayer") == -1
                        ? Infinity
                        : Number(world.getDynamicProperty("homeSystemSettings:maxHomesPerPlayer") ?? Infinity);
                }
                public static set maxHomesPerPlayer(maxHomes: number | undefined) {
                    world.setDynamicProperty("homeSystemSettings:maxHomesPerPlayer", (maxHomes ?? Infinity) == Infinity ? -1 : maxHomes);
                }
                /**
                 * Whether or not you can teleport to a home that is in a different dimension than you.
                 *
                 * Dynamic Property ID: `homeSystemSettings:allowCrossDimensionalTeleport`
                 *
                 * @default true
                 */
                public static get allowCrossDimensionalTeleport(): boolean {
                    return Boolean(world.getDynamicProperty("homeSystemSettings:allowCrossDimensionalTeleport") ?? true);
                }
                public static set allowCrossDimensionalTeleport(enabled: boolean | undefined) {
                    world.setDynamicProperty("homeSystemSettings:allowCrossDimensionalTeleport", enabled ?? true);
                }
                /**
                 * Whether or not homes are allowed in dimensions other than the overworld.
                 *
                 * Dynamic Property ID: `homeSystemSettings:allowHomesInOtherDimensions`
                 *
                 * @default true
                 */
                public static get allowHomesInOtherDimensions(): boolean {
                    return Boolean(world.getDynamicProperty("homeSystemSettings:allowHomesInOtherDimensions") ?? true);
                }
                public static set allowHomesInOtherDimensions(enabled: boolean | undefined) {
                    world.setDynamicProperty("homeSystemSettings:allowHomesInOtherDimensions", enabled ?? true);
                }
            }
            return config_homeSystem;
        }
        /**
         * The teleport request system settings.
         * @group Subclasses
         */
        public static get tpaSystem() {
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
                public static get tpaSystemEnabled(): boolean {
                    return Boolean(
                        world.getDynamicProperty("tpaSystemSettings:tpaSystemEnabled") ?? world.getDynamicProperty("rtpSystemSettings:rtpSystemEnabled") ?? true
                    );
                }
                public static set tpaSystemEnabled(enabled: boolean | undefined) {
                    world.setDynamicProperty("tpaSystemSettings:tpaSystemEnabled", enabled ?? true);
                }
                /**
                 * The number of seconds after a teleport request is sent before it will time out.
                 *
                 * Dynamic Property ID: `tpaSystemSettings:timeoutDuration`
                 *
                 * @default 60
                 */
                public static get timeoutDuration(): number {
                    return isNaN(Number(world.getDynamicProperty("tpaSystemSettings:timeoutDuration")))
                        ? 60
                        : Number(world.getDynamicProperty("tpaSystemSettings:timeoutDuration") ?? 60);
                }
                public static set timeoutDuration(timeoutDuration: number | undefined) {
                    world.setDynamicProperty("tpaSystemSettings:timeoutDuration", timeoutDuration ?? 60);
                }
                /**
                 * Whether or not you can teleport to a player who is in a different dimension than you.
                 *
                 * Dynamic Property ID: `tpaSystemSettings:allowCrossDimensionalTeleport`
                 *
                 * @default true
                 */
                public static get allowCrossDimensionalTeleport(): boolean {
                    return Boolean(world.getDynamicProperty("tpaSystemSettings:allowCrossDimensionalTeleport") ?? true);
                }
                public static set allowCrossDimensionalTeleport(enabled: boolean | undefined) {
                    world.setDynamicProperty("tpaSystemSettings:allowCrossDimensionalTeleport", enabled ?? true);
                }
            }
            return config_tpaSystem;
        }
        /**
         * The chat and name tags settings.
         * @group Subclasses
         */
        public static get chatRanks() {
            /**
             * The chat and name tags settings.
             * @hideconstructor
             * @nameOverride chatRanks
             * @parentOverride Globals.config
             * @group Subclasses
             */
            class config_chatRanks {
                public static get chatRankPrefix(): string {
                    return String(world.getDynamicProperty("andexdbSettings:chatRankPrefix") ?? "rank:");
                }
                public static set chatRankPrefix(chatRankPrefix: string | undefined) {
                    world.setDynamicProperty("andexdbSettings:chatRankPrefix", chatRankPrefix ?? "rank:");
                }
                public static get chatSudoPrefix(): string {
                    return String(world.getDynamicProperty("andexdbSettings:chatSudoPrefix") ?? "sudo:");
                }
                public static set chatSudoPrefix(chatSudoPrefix: string | undefined) {
                    world.setDynamicProperty("andexdbSettings:chatSudoPrefix", chatSudoPrefix ?? "sudo:");
                }
                public static get chatDisplayTimeStamp(): boolean {
                    return Boolean(world.getDynamicProperty("andexdbSettings:chatDisplayTimeStamp") ?? false);
                }
                public static set chatDisplayTimeStamp(chatDisplayTimeStampEnabled: boolean | undefined) {
                    world.setDynamicProperty("andexdbSettings:chatDisplayTimeStamp", chatDisplayTimeStampEnabled ?? false);
                }
                public static get showRanksOnPlayerNameTags(): boolean {
                    return Boolean(world.getDynamicProperty("andexdbSettings:showRanksOnPlayerNameTags") ?? false);
                }
                public static set showRanksOnPlayerNameTags(showRanksOnPlayerNameTags: boolean | undefined) {
                    world.setDynamicProperty("andexdbSettings:showRanksOnPlayerNameTags", showRanksOnPlayerNameTags ?? false);
                }
                public static get showHealthOnPlayerNameTags(): boolean {
                    return Boolean(world.getDynamicProperty("andexdbSettings:showHealthOnPlayerNameTags") ?? false);
                }
                public static set showHealthOnPlayerNameTags(showHealthOnPlayerNameTags: boolean | undefined) {
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
                public static get playerNameTagHealthPrecision(): 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 {
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
                public static set playerNameTagHealthPrecision(playerNameTagHealthPrecision: number | undefined) {
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
                public static get rankMode(): keyof typeof rankModes {
                    return String(world.getDynamicProperty("andexdbSettings:rankMode") ?? "custom_simple") as keyof typeof rankModes;
                }
                public static set rankMode(rankMode: keyof typeof rankModes | undefined) {
                    world.setDynamicProperty("andexdbSettings:rankMode", rankMode ?? "custom_simple");
                }
                public static get rankEvaluatorMode_chat(): (typeof rankEvaluatorModes)[number] {
                    return String(world.getDynamicProperty("andexdbSettings:rankEvaluatorMode_chat") ?? "default") as (typeof rankEvaluatorModes)[number];
                }
                public static set rankEvaluatorMode_chat(rankEvaluatorMode_chat: (typeof rankEvaluatorModes)[number] | undefined) {
                    world.setDynamicProperty("andexdbSettings:rankEvaluatorMode_chat", rankEvaluatorMode_chat ?? "default");
                }
                public static get rankEvaluatorMode_nameTags(): (typeof rankEvaluatorModes)[number] {
                    return String(world.getDynamicProperty("andexdbSettings:rankEvaluatorMode_nameTags") ?? "default") as (typeof rankEvaluatorModes)[number];
                }
                public static set rankEvaluatorMode_nameTags(rankEvaluatorMode_nameTags: (typeof rankEvaluatorModes)[number] | undefined) {
                    world.setDynamicProperty("andexdbSettings:rankEvaluatorMode_nameTags", rankEvaluatorMode_nameTags ?? "default");
                }
                public static get rankDisplayPrefix(): string {
                    return String(world.getDynamicProperty("andexdbSettings:rankDisplayPrefix") ?? "[");
                }
                public static set rankDisplayPrefix(rankDisplayPrefix: string | undefined) {
                    world.setDynamicProperty("andexdbSettings:rankDisplayPrefix", rankDisplayPrefix ?? "[");
                }
                public static get rankDisplaySuffix(): string {
                    return String(world.getDynamicProperty("andexdbSettings:rankDisplaySuffix") ?? "§r]");
                }
                public static set rankDisplaySuffix(rankDisplaySuffix: string | undefined) {
                    world.setDynamicProperty("andexdbSettings:rankDisplaySuffix", rankDisplaySuffix ?? "§r]");
                }
                public static get nameDisplayPrefix(): string {
                    return String(world.getDynamicProperty("andexdbSettings:nameDisplayPrefix") ?? "[");
                }
                public static set nameDisplayPrefix(nameDisplayPrefix: string | undefined) {
                    world.setDynamicProperty("andexdbSettings:nameDisplayPrefix", nameDisplayPrefix ?? "<");
                }
                public static get nameDisplaySuffix(): string {
                    return String(world.getDynamicProperty("andexdbSettings:nameDisplaySuffix") ?? "§r]");
                }
                public static set nameDisplaySuffix(nameDisplaySuffix: string | undefined) {
                    world.setDynamicProperty("andexdbSettings:nameDisplaySuffix", nameDisplaySuffix ?? "§r>");
                }
                public static get chatNameAndMessageSeparator(): string {
                    return String(world.getDynamicProperty("andexdbSettings:chatNameAndMessageSeparator") ?? " ");
                }
                public static set chatNameAndMessageSeparator(chatNameAndMessageSeparator: string | undefined) {
                    world.setDynamicProperty("andexdbSettings:chatNameAndMessageSeparator", chatNameAndMessageSeparator ?? " ");
                }
                public static get rankDisplaySeparator(): string {
                    return String(world.getDynamicProperty("andexdbSettings:rankDisplaySeparator") ?? " ");
                }
                public static set rankDisplaySeparator(rankDisplaySeparator: string | undefined) {
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
                public static get chatDimensionTemplateString(): string {
                    return String(world.getDynamicProperty("andexdbSettings:chatDimensionTemplateString") ?? "[${dimension}§r] ");
                }
                public static set chatDimensionTemplateString(chatDimensionTemplateString: string | undefined) {
                    world.setDynamicProperty("andexdbSettings:chatDimensionTemplateString", chatDimensionTemplateString ?? "[${dimension}§r] ");
                }
                /**
                 * The template string for individual ranks.
                 *
                 * @default "[${rank}§r]"
                 */
                public static get rankTemplateString(): string {
                    return String(world.getDynamicProperty("andexdbSettings:rankTemplateString") ?? "[${rank}§r]");
                }
                public static set rankTemplateString(rankTemplateString: string | undefined) {
                    world.setDynamicProperty("andexdbSettings:rankTemplateString", rankTemplateString ?? "[${rank}§r]");
                }
                public static get messageTemplateString(): string {
                    return String(
                        world.getDynamicProperty("andexdbSettings:messageTemplateString") ??
                            '${(showDimension ? `[${dimension}§r] ` : "")}${timestampenabled?`[${timestamp}] `:""}${ranks}§r${(ranks!="")?" ":""}<${name}§r> ${message}'
                    );
                }
                public static set messageTemplateString(messageTemplateString: string | undefined) {
                    world.setDynamicProperty(
                        "andexdbSettings:messageTemplateString",
                        messageTemplateString ??
                            '${(showDimension ? `[${dimension}§r] ` : "")}${timestampenabled?`[${timestamp}] `:""}${ranks}§r${(ranks!="")?" ":""}<${name}§r> ${message}'
                    );
                }
                public static get nameTagTemplateString(): string {
                    return String(
                        world.getDynamicProperty("andexdbSettings:nameTagTemplateString") ??
                            '${rank} ${nameFormatting}${name}${(showHealth ? `§r§f [${currentHealth}/${maxHealth}]` : "")}'
                    );
                }
                public static set nameTagTemplateString(nameTagTemplateString: string | undefined) {
                    world.setDynamicProperty(
                        "andexdbSettings:nameTagTemplateString",
                        nameTagTemplateString ?? '${rank} ${nameFormatting}${name}${(showHealth ? `§r§f [${currentHealth}/${maxHealth}]` : "")}'
                    );
                }
                public static get defaultRank(): string {
                    return String(world.getDynamicProperty("andexdbSettings:defaultRank") ?? "§bMember§r");
                }
                public static set defaultRank(defaultRank: string | undefined) {
                    world.setDynamicProperty("andexdbSettings:defaultRank", defaultRank ?? "§bMember§r");
                }
                public static get defaultMessageFormatting(): string {
                    return String(world.getDynamicProperty("andexdbSettings:defaultMessageFormatting") ?? "");
                }
                public static set defaultMessageFormatting(defaultMessageFormatting: string | undefined) {
                    world.setDynamicProperty("andexdbSettings:defaultMessageFormatting", defaultMessageFormatting ?? "");
                }
                public static get defaultNameFormatting(): string {
                    return String(world.getDynamicProperty("andexdbSettings:defaultNameFormatting") ?? "");
                }
                public static set defaultNameFormatting(defaultNameFormatting: string | undefined) {
                    world.setDynamicProperty("andexdbSettings:defaultNameFormatting", defaultNameFormatting ?? "");
                }
                public static get defaultSeparatorFormatting(): string {
                    return String(world.getDynamicProperty("andexdbSettings:defaultSeparatorFormatting") ?? "");
                }
                public static set defaultSeparatorFormatting(defaultSeparatorFormatting: string | undefined) {
                    world.setDynamicProperty("andexdbSettings:defaultSeparatorFormatting", defaultSeparatorFormatting ?? "");
                }
                public static get disableCustomChatMessages(): boolean {
                    return Boolean(world.getDynamicProperty("andexdbSettings:disableCustomChatMessages") ?? false);
                }
                public static set disableCustomChatMessages(disableCustomChatMessages: boolean | undefined) {
                    world.setDynamicProperty("andexdbSettings:disableCustomChatMessages", disableCustomChatMessages ?? false);
                }
                public static get allowCustomChatMessagesMuting(): boolean {
                    return Boolean(world.getDynamicProperty("andexdbSettings:allowCustomChatMessagesMuting") ?? false);
                }
                public static set allowCustomChatMessagesMuting(allowCustomChatMessagesMuting: boolean | undefined) {
                    world.setDynamicProperty("andexdbSettings:showRanksOnPlayerNameTags", allowCustomChatMessagesMuting ?? false);
                }
                public static get autoEscapeChatMessages(): boolean {
                    return Boolean(world.getDynamicProperty("andexdbSettings:autoEscapeChatMessages") ?? false);
                }
                public static set autoEscapeChatMessages(autoEscapeChatMessages: boolean | undefined) {
                    world.setDynamicProperty("andexdbSettings:autoEscapeChatMessages", autoEscapeChatMessages ?? false);
                }
                public static get autoURIEscapeChatMessages(): boolean {
                    return Boolean(world.getDynamicProperty("andexdbSettings:autoURIEscapeChatMessages") ?? false);
                }
                public static set autoURIEscapeChatMessages(autoURIEscapeChatMessages: boolean | undefined) {
                    world.setDynamicProperty("andexdbSettings:autoURIEscapeChatMessages", autoURIEscapeChatMessages ?? false);
                }
                public static get allowChatEscapeCodes(): boolean {
                    return Boolean(world.getDynamicProperty("andexdbSettings:allowChatEscapeCodes") ?? false);
                }
                public static set allowChatEscapeCodes(allowChatEscapeCodes: boolean | undefined) {
                    world.setDynamicProperty("andexdbSettings:allowChatEscapeCodes", allowChatEscapeCodes ?? false);
                }
            }
            return config_chatRanks;
        }
        /**
         * The money system settings.
         * @group Subclasses
         */
        public static get moneySystem() {
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
                public static get useScoreboardBasedMoneySystem(): boolean {
                    return Boolean(world.getDynamicProperty("andexdbSettings:moneySystem.useScoreboardBasedMoneySystem") ?? false);
                }
                public static set useScoreboardBasedMoneySystem(enabled: boolean | undefined) {
                    world.setDynamicProperty("andexdbSettings:moneySystem.useScoreboardBasedMoneySystem", enabled ?? false);
                }
                /**
                 * The name of the scoreboard to use for the money system.
                 *
                 * Dynamic Property ID: `andexdbSettings:moneySystem.scoreboardName`
                 *
                 * @default "andexdb:money"
                 */
                public static get scoreboardName(): string {
                    return String(world.getDynamicProperty("andexdbSettings:moneySystem.scoreboardName") ?? "andexdb:money");
                }
                public static set scoreboardName(enabled: string | undefined) {
                    world.setDynamicProperty("andexdbSettings:moneySystem.scoreboardName", enabled ?? "andexdb:money");
                }
            }
            return config_moneySystem;
        }
        /**
         * The bounty system settings.
         * @group Subclasses
         */
        public static get bountySystem() {
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
                public static get enabled(): boolean {
                    return Boolean(world.getDynamicProperty("andexdbSettings:bountySystem.enabled") ?? true);
                }
                public static set enabled(enabled: boolean | undefined) {
                    world.setDynamicProperty("andexdbSettings:bountySystem.enabled", enabled ?? true);
                }
                /**
                 * Whether to show the time that a player was last online in the stats list that is shown when a player clicks on the bounty for another player in the bounty list.
                 *
                 * Dynamic Property ID: `andexdbSettings:bountySystem.showLastOnlineTimeInPlayerStatsList`
                 *
                 * @default false
                 */
                public static get showLastOnlineTimeInBountyDetailsList(): boolean {
                    return Boolean(world.getDynamicProperty("andexdbSettings:bountySystem.showLastOnlineTimeInPlayerStatsList") ?? false);
                }
                public static set showLastOnlineTimeInBountyDetailsList(show: boolean | undefined) {
                    world.setDynamicProperty("andexdbSettings:bountySystem.showLastOnlineTimeInPlayerStatsList", show ?? false);
                }
            }
            return config_bountySystem;
        }
        /**
         * The warps system settings.
         * @group Subclasses
         */
        public static get warpsSystem() {
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
                public static get enabled(): boolean {
                    return Boolean(world.getDynamicProperty("warpsSystem:bountySystem.enabled") ?? true);
                }
                public static set enabled(enabled: boolean | undefined) {
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
                public static get warps(): Warp[] {
                    return JSONB.parse(world.getStringFromDynamicProperties("warpsSystem:warpsSystem.warps", "[]"));
                }
                public static set warps(warps: Warp[] | undefined) {
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
        public static get moneyTransferSystem() {
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
                public static get enabled(): boolean {
                    return Boolean(world.getDynamicProperty("andexdbSettings:moneyTransferSystem.enabled") ?? true);
                }
                public static set enabled(enabled: boolean | undefined) {
                    world.setDynamicProperty("andexdbSettings:moneyTransferSystem.enabled", enabled ?? true);
                }
            }
            return config_moneyTransferSystem;
        }
        /**
         * The anti-spam system settings.
         * @group Subclasses
         */
        public static get antiSpamSystem() {
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
                public static get antispamEnabled(): boolean {
                    return Boolean(world.getDynamicProperty("antispamSettings:antispamEnabled") ?? false);
                }
                public static set antispamEnabled(enabled: boolean | undefined) {
                    world.setDynamicProperty("antispamSettings:antispamEnabled", enabled ?? false);
                }
                /**
                 * Whether or not to restart the anti-spam mute timer when a message is sent during a mute.
                 *
                 * Dynamic Property ID: `antispamSettings:restartAntiSpamMuteTimerUponAttemptedMessageSendDuringMute`
                 *
                 * @default false
                 */
                public static get restartAntiSpamMuteTimerUponAttemptedMessageSendDuringMute(): boolean {
                    return Boolean(world.getDynamicProperty("antispamSettings:restartAntiSpamMuteTimerUponAttemptedMessageSendDuringMute") ?? false);
                }
                public static set restartAntiSpamMuteTimerUponAttemptedMessageSendDuringMute(
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
                public static get waitTimeAfterAntispamActivation(): number {
                    return isNaN(Number(world.getDynamicProperty("antispamSettings:waitTimeAfterAntispamActivation")))
                        ? 60
                        : Number(world.getDynamicProperty("antispamSettings:waitTimeAfterAntispamActivation") ?? 60);
                }
                public static set waitTimeAfterAntispamActivation(waitTimeInSeconds: number | undefined) {
                    world.setDynamicProperty("antispamSettings:waitTimeAfterAntispamActivation", waitTimeInSeconds ?? 60);
                }
                /**
                 * The maximum time in seconds between individual messages to trigger anti-spam.
                 *
                 * Dynamic Property ID: `antispamSettings:maxTimeBewteenMessagesToTriggerAntiSpam`
                 *
                 * @default 5
                 */
                public static get maxTimeBewteenMessagesToTriggerAntiSpam(): number {
                    return isNaN(Number(world.getDynamicProperty("antispamSettings:maxTimeBewteenMessagesToTriggerAntiSpam")))
                        ? 5
                        : Number(world.getDynamicProperty("antispamSettings:maxTimeBewteenMessagesToTriggerAntiSpam") ?? 5);
                }
                public static set maxTimeBewteenMessagesToTriggerAntiSpam(maxTimeInSeconds: number | undefined) {
                    world.setDynamicProperty("antispamSettings:maxTimeBewteenMessagesToTriggerAntiSpam", maxTimeInSeconds ?? 5);
                }
                /**
                 * The message count to trigger anti-spam.
                 *
                 * Dynamic Property ID: `antispamSettings:antispamTriggerMessageCount`
                 *
                 * @default 4
                 */
                public static get antispamTriggerMessageCount(): number {
                    return isNaN(Number(world.getDynamicProperty("antispamSettings:antispamTriggerMessageCount")))
                        ? 4
                        : Number(gwdp("antispamSettings:antispamTriggerMessageCount") ?? 4);
                }
                public static set antispamTriggerMessageCount(messageCount: number | undefined) {
                    world.setDynamicProperty("antispamSettings:antispamTriggerMessageCount", messageCount ?? 4);
                }
            }
            return config_antiSpamSystem;
        }
        /**
         * The moderation settings.
         * @group Subclasses
         */
        public static get moderation() {
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
                public static get bans() {
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
                        public static get enabled(): boolean {
                            return Boolean(world.getDynamicProperty("andexdbSettings:banEnabled") ?? true);
                        }
                        public static set enabled(enabled: boolean | undefined) {
                            world.setDynamicProperty("andexdbSettings:banEnabled", enabled ?? true);
                        }
                        /**
                         * How long it has to be since the last ban refresh before the bans list will be automatically refreshed, when getting the bans list or checking if a player is banned.
                         *
                         * Dynamic Property ID: `andexdbSettings:moderation.bans.minimumAutoRefresh`
                         *
                         * @default 1000
                         */
                        public static get minimumAutoRefresh(): number {
                            return Number(
                                world.getDynamicProperty("andexdbSettings:moderation.bans.minimumAutoRefresh") ??
                                    // Also check old ID for backwards compatibility.
                                    world.getDynamicProperty("andexdbSettings:bansMinimumAutoRefresh") ??
                                    1000
                            );
                        }
                        public static set minimumAutoRefresh(minimumAutoRefresh: number | undefined) {
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
        public static get ui() {
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
                public static get menus() {
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
                        public static get mainMenu() {
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
                                public static get showDeprecatedButtons(): boolean {
                                    return Boolean(world.getDynamicProperty("andexdbSettings:ui.menus.mainMenu.showDeprecatedButtons") ?? false);
                                }
                                public static set showDeprecatedButtons(show: boolean | undefined) {
                                    world.setDynamicProperty("andexdbSettings:ui.menus.mainMenu.showDeprecatedButtons", show ?? false);
                                }
                                /**
                                 * Whether to show the buttons marked as deprecated on the main menu.
                                 *
                                 * Dynamic Property ID: `andexdbSettings:ui.menus.mainMenu.showExperimentalButtons`
                                 *
                                 * @default true
                                 */
                                public static get showExperimentalButtons(): boolean {
                                    return Boolean(world.getDynamicProperty("andexdbSettings:ui.menus.mainMenu.showExperimentalButtons") ?? true);
                                }
                                public static set showExperimentalButtons(show: boolean | undefined) {
                                    world.setDynamicProperty("andexdbSettings:ui.menus.mainMenu.showExperimentalButtons", show ?? true);
                                }
                                /**
                                 * Whether to show the buttons marked as deprecated on the main menu.
                                 *
                                 * Dynamic Property ID: `andexdbSettings:ui.menus.mainMenu.showUnusedButtons`
                                 *
                                 * @default false
                                 */
                                public static get showUnusedButtons(): boolean {
                                    return Boolean(world.getDynamicProperty("andexdbSettings:ui.menus.mainMenu.showUnusedButtons") ?? false);
                                }
                                public static set showUnusedButtons(show: boolean | undefined) {
                                    world.setDynamicProperty("andexdbSettings:ui.menus.mainMenu.showUnusedButtons", show ?? false);
                                }
                                /**
                                 * Whether to show the buttons for features that are planned to be added in a future update on the main menu.
                                 *
                                 * Dynamic Property ID: `andexdbSettings:ui.menus.mainMenu.showUpcomingButtons`
                                 *
                                 * @default false
                                 */
                                public static get showUpcomingButtons(): boolean {
                                    return Boolean(world.getDynamicProperty("andexdbSettings:ui.menus.mainMenu.showUpcomingButtons") ?? false);
                                }
                                public static set showUpcomingButtons(show: boolean | undefined) {
                                    world.setDynamicProperty("andexdbSettings:ui.menus.mainMenu.showUpcomingButtons", show ?? false);
                                }
                                /**
                                 * Whether to show the buttons for features that are non-functional on the main menu.
                                 *
                                 * Dynamic Property ID: `andexdbSettings:ui.menus.mainMenu.showNonFunctionalButtons`
                                 *
                                 * @default false
                                 */
                                public static get showNonFunctionalButtons(): boolean {
                                    return Boolean(world.getDynamicProperty("andexdbSettings:ui.menus.mainMenu.showNonFunctionalButtons") ?? false);
                                }
                                public static set showNonFunctionalButtons(show: boolean | undefined) {
                                    world.setDynamicProperty("andexdbSettings:ui.menus.mainMenu.showNonFunctionalButtons", show ?? false);
                                }
                            }
                            return config_ui_menus_mainMenu;
                        }
                        /**
                         * The player menu settings.
                         * @group Subclasses
                         */
                        public static get playerMenu() {
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
                                public static get enabled(): boolean {
                                    return Boolean(world.getDynamicProperty("andexdbSettings:ui.menus.playerMenu.enabled") ?? true);
                                }
                                public static set enabled(enabled: boolean | undefined) {
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
                                public static get buttons(): (keyof typeof menuButtonIds.playerMenu.buttons)[] {
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
                                public static set buttons(buttonList: (keyof typeof menuButtonIds.playerMenu.buttons)[] | undefined) {
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
                                public static get itemName(): string {
                                    return String(world.getDynamicProperty("andexdbSettings:ui.menus.playerMenu.itemName") ?? "§r§fMenu");
                                }
                                public static set itemName(itemName: string | undefined) {
                                    world.setDynamicProperty("andexdbSettings:ui.menus.playerMenu.itemName", itemName ?? "§r§fMenu");
                                }
                                /**
                                 * Whether to show the buttons marked as deprecated on the player menu.
                                 *
                                 * Dynamic Property ID: `andexdbSettings:ui.menus.playerMenu.showDeprecatedButtons`
                                 *
                                 * @default false
                                 */
                                public static get showDeprecatedButtons(): boolean {
                                    return Boolean(world.getDynamicProperty("andexdbSettings:ui.menus.playerMenu.showDeprecatedButtons") ?? false);
                                }
                                public static set showDeprecatedButtons(show: boolean | undefined) {
                                    world.setDynamicProperty("andexdbSettings:ui.menus.playerMenu.showDeprecatedButtons", show ?? false);
                                }
                                /**
                                 * Whether to show the buttons marked as deprecated on the player menu.
                                 *
                                 * Dynamic Property ID: `andexdbSettings:ui.menus.playerMenu.showExperimentalButtons`
                                 *
                                 * @default true
                                 */
                                public static get showExperimentalButtons(): boolean {
                                    return Boolean(world.getDynamicProperty("andexdbSettings:ui.menus.playerMenu.showExperimentalButtons") ?? true);
                                }
                                public static set showExperimentalButtons(show: boolean | undefined) {
                                    world.setDynamicProperty("andexdbSettings:ui.menus.playerMenu.showExperimentalButtons", show ?? true);
                                }
                                /**
                                 * Whether to show the buttons marked as deprecated on the player menu.
                                 *
                                 * Dynamic Property ID: `andexdbSettings:ui.menus.playerMenu.showUnusedButtons`
                                 *
                                 * @default false
                                 */
                                public static get showUnusedButtons(): boolean {
                                    return Boolean(world.getDynamicProperty("andexdbSettings:ui.menus.playerMenu.showUnusedButtons") ?? false);
                                }
                                public static set showUnusedButtons(show: boolean | undefined) {
                                    world.setDynamicProperty("andexdbSettings:ui.menus.playerMenu.showUnusedButtons", show ?? false);
                                }
                                /**
                                 * Whether to show the buttons for features that are planned to be added in a future update on the player menu.
                                 *
                                 * Dynamic Property ID: `andexdbSettings:ui.menus.playerMenu.showUpcomingButtons`
                                 *
                                 * @default false
                                 */
                                public static get showUpcomingButtons(): boolean {
                                    return Boolean(world.getDynamicProperty("andexdbSettings:ui.menus.playerMenu.showUpcomingButtons") ?? false);
                                }
                                public static set showUpcomingButtons(show: boolean | undefined) {
                                    world.setDynamicProperty("andexdbSettings:ui.menus.playerMenu.showUpcomingButtons", show ?? false);
                                }
                                /**
                                 * Whether to show the buttons for features that are non-functional on the player menu.
                                 *
                                 * Dynamic Property ID: `andexdbSettings:ui.menus.playerMenu.showNonFunctionalButtons`
                                 *
                                 * @default false
                                 */
                                public static get showNonFunctionalButtons(): boolean {
                                    return Boolean(world.getDynamicProperty("andexdbSettings:ui.menus.playerMenu.showNonFunctionalButtons") ?? false);
                                }
                                public static set showNonFunctionalButtons(show: boolean | undefined) {
                                    world.setDynamicProperty("andexdbSettings:ui.menus.playerMenu.showNonFunctionalButtons", show ?? false);
                                }
                            }
                            return config_ui_menus_playerMenu;
                        }
                        /**
                         * The settings for the player menu leaderboards.
                         * @group Subclasses
                         */
                        public static get playerMenu_leaderboards() {
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
                                public static get builtInStats() {
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
                                        public static get money() {
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
                                                public static get enabled(): boolean {
                                                    return Boolean(
                                                        world.getDynamicProperty(
                                                            "andexdbSettings:ui.menus.playerMenu_leaderboards.builtInStats.money.enabled"
                                                        ) ?? true
                                                    );
                                                }
                                                public static set enabled(enabled: boolean | undefined) {
                                                    world.setDynamicProperty(
                                                        "andexdbSettings:ui.menus.playerMenu_leaderboards.builtInStats.money.enabled",
                                                        enabled ?? true
                                                    );
                                                }
                                                /**
                                                 * The display options for the built-in `money` leaderboard statistic.
                                                 * @group Subclasses
                                                 */
                                                public static get displayOptions() {
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
                                                        public static get currencyPrefix(): string {
                                                            return String(
                                                                world.getDynamicProperty(
                                                                    "andexdbSettings:ui.menus.playerMenu_leaderboards.builtInStats.money.displayOptions.currencyPrefix"
                                                                ) ?? "$"
                                                            );
                                                        }
                                                        public static set currencyPrefix(currencyPrefix: string | undefined) {
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
                                                        public static get addCommaSeparators(): boolean {
                                                            return Boolean(
                                                                world.getDynamicProperty(
                                                                    "andexdbSettings:ui.menus.playerMenu_leaderboards.builtInStats.money.displayOptions.addCommaSeparators"
                                                                ) ?? true
                                                            );
                                                        }
                                                        public static set addCommaSeparators(addCommaSeparators: boolean | undefined) {
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
                                public static get customStats(): playerMenuLeaderboardStatistic<"custom" | "customAdvanced">[] {
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
                                public static set customStats(buttonList: playerMenuLeaderboardStatistic<"custom" | "customAdvanced">[] | undefined) {
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
                                public static get trackedStats(): string[] {
                                    return JSON.parse(
                                        String(
                                            world.getDynamicProperty("andexdbSettings:ui.menus.playerMenu_leaderboards.trackedStats") ??
                                                JSON.stringify(defaultPlayerMenuLeaderboardStatistics.map((s) => s.id))
                                        )
                                    );
                                }
                                public static set trackedStats(buttonList: string[] | undefined) {
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
                                public static get leaderboards(): string[] {
                                    return JSON.parse(
                                        String(
                                            world.getDynamicProperty("andexdbSettings:ui.menus.playerMenu_leaderboards.leaderboards") ??
                                                JSON.stringify(defaultPlayerMenuLeaderboardStatistics.map((s) => s.id))
                                        )
                                    );
                                }
                                public static set leaderboards(buttonList: string[] | undefined) {
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
                                public static get showLastOnlineTimeInPlayerStatsList(): boolean {
                                    return Boolean(
                                        world.getDynamicProperty("andexdbSettings:ui.menus.playerMenu_leaderboards.showLastOnlineTimeInPlayerStatsList") ??
                                            false
                                    );
                                }
                                public static set showLastOnlineTimeInPlayerStatsList(show: boolean | undefined) {
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
                                public static get showBannedPlayersInLeaderboards(): boolean {
                                    return Boolean(
                                        world.getDynamicProperty("andexdbSettings:ui.menus.playerMenu_leaderboards.showBannedPlayersInLeaderboards") ?? false
                                    );
                                }
                                public static set showBannedPlayersInLeaderboards(show: boolean | undefined) {
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
                public static get main() {
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
                public static get pages() {
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
                        public static get maxPlayersPerManagePlayersPage(): number {
                            return Number(world.getDynamicProperty("andexdbSettings:maxPlayersPerManagePlayersPage") ?? 9);
                        }
                        public static set maxPlayersPerManagePlayersPage(maxPlayersPerManagePlayersPage: number | undefined) {
                            world.setDynamicProperty(
                                "andexdbSettings:maxPlayersPerManagePlayersPage",
                                Math.min(1000, Math.max(1, maxPlayersPerManagePlayersPage ?? 9))
                            );
                        }
                        /**
                         * Moved from {@link config} to {@link config.ui.pages} in version 1.23.0-preview.20+BUILD.1 on 10/04/2024 at 3:10:37 PM PDT.
                         */
                        public static get maxBansPerManageBansPage(): number {
                            return Number(world.getDynamicProperty("andexdbSettings:maxBansPerManageBansPage") ?? 10);
                        }
                        public static set maxBansPerManageBansPage(maxBansPerManageBansPage: number | undefined) {
                            world.setDynamicProperty("andexdbSettings:maxBansPerManageBansPage", maxBansPerManageBansPage ?? 10);
                        }
                        /**
                         * Moved from {@link config} to {@link config.ui.pages} in version 1.23.0-preview.20+BUILD.1 on 10/04/2024 at 3:10:37 PM PDT.
                         */
                        public static get maxHomesPerManageHomesPage(): number {
                            return Number(world.getDynamicProperty("andexdbSettings:maxHomesPerManageHomesPage") ?? 10);
                        }
                        public static set maxHomesPerManageHomesPage(maxHomesPerManageHomesPage: number | undefined) {
                            world.setDynamicProperty("andexdbSettings:maxHomesPerManageHomesPage", maxHomesPerManageHomesPage ?? 10);
                        }
                    }
                    return config_ui_pages;
                }
                /**
                 * Other UI settings.
                 * @group Subclasses
                 */
                public static get other() {
                    /**
                     * Other UI settings.
                     * @hideconstructor
                     * @nameOverride other
                     * @parentOverride Globals.config.ui:class
                     * @group Subclasses
                     */
                    class config_ui_other {
                        public static get useStarWarsReference404Page() {
                            return Boolean(world.getDynamicProperty("andexdbUISettings:other.useStarWarsReference404Page") ?? false);
                        }
                        public static set useStarWarsReference404Page(useStarWarsReference404Page: boolean | undefined) {
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
        public static get system() {
            /**
             * System settings.
             * @hideconstructor
             * @nameOverride system
             * @parentOverride Globals.config
             * @group Subclasses
             */
            class config_system {
                public static get artificialLagMS(): number {
                    return Number(world.getDynamicProperty("andexdbSettings:artificialLagMS") ?? 0);
                }
                public static set artificialLagMS(artificialLagMS: number | undefined) {
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
                public static get defaultMinMSBetweenTickWaits(): number {
                    return Number(world.getDynamicProperty("andexdbSettings:defaultMinMSBetweenTickWaits") ?? 2500);
                }
                public static set defaultMinMSBetweenTickWaits(defaultMinMSBetweenTickWaits: number | undefined) {
                    world.setDynamicProperty("andexdbSettings:defaultMinMSBetweenTickWaits", defaultMinMSBetweenTickWaits ?? 2500);
                }
                public static get timeZone(): number {
                    return isNaN(Number(world.getDynamicProperty("andexdbSettings:timeZone")))
                        ? 0
                        : Number(world.getDynamicProperty("andexdbSettings:timeZone") ?? 0);
                }
                public static set timeZone(timeZone: number | undefined) {
                    world.setDynamicProperty("andexdbSettings:timeZone", timeZone ?? 0);
                }
                public static get playerDataRefreshRate(): number {
                    return Number(world.getDynamicProperty("andexdbSettings:playerDataRefreshRate") ?? 20);
                }
                public static set playerDataRefreshRate(playerDataRefreshRate: number | undefined) {
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
                public static get protectedAreasRefreshRate(): number {
                    return Number(world.getDynamicProperty("andexdbSettings:protectedAreasRefreshRate") ?? 200);
                }
                public static set protectedAreasRefreshRate(protectedAreasRefreshRate: number | undefined) {
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
                public static get protectedAreasZoneActionsEnabled(): boolean {
                    return Boolean(world.getDynamicProperty("andexdbSettings:protectedAreasZoneActionsEnabled") ?? true);
                }
                public static set protectedAreasZoneActionsEnabled(protectedAreasZoneActionsEnabled: boolean | undefined) {
                    world.setDynamicProperty("andexdbSettings:protectedAreasZoneActionsEnabled", protectedAreasZoneActionsEnabled ?? true);
                }
                /**
                 * How often in ticks to execute the zone actions.
                 *
                 * Dynamic Property ID: `andexdbSettings:protectedAreasZoneActionsInterval`
                 *
                 * @default 5
                 */
                public static get protectedAreasZoneActionsInterval(): number {
                    return Number(world.getDynamicProperty("andexdbSettings:protectedAreasZoneActionsInterval") ?? 5);
                }
                public static set protectedAreasZoneActionsInterval(protectedAreasZoneActionsInterval: number | undefined) {
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
                public static get protectedAreasZoneRefreshInterval(): number {
                    return Number(world.getDynamicProperty("andexdbSettings:protectedAreasZoneRefreshInterval") ?? 200);
                }
                public static set protectedAreasZoneRefreshInterval(protectedAreasZoneRefreshInterval: number | undefined) {
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
                public static get bannedPlayersRefreshRate(): number {
                    return Number(world.getDynamicProperty("andexdbSettings:bannedPlayersRefreshRate") ?? 20);
                }
                public static set bannedPlayersRefreshRate(bannedPlayersRefreshRate: number | undefined) {
                    world.setDynamicProperty(
                        "andexdbSettings:bannedPlayersRefreshRate",
                        Number.isNaN(Number(bannedPlayersRefreshRate)) ? 20 : Math.min(1000, Math.max(1, Number(bannedPlayersRefreshRate ?? 20)))
                    );
                }
                public static get debugMode(): boolean {
                    return Boolean(world.getDynamicProperty("andexdbSettings:debugMode") ?? false);
                }
                public static set debugMode(debugMode: boolean | undefined) {
                    world.setDynamicProperty("andexdbSettings:debugMode", debugMode ?? false);
                }
                /**
                 * It is recommended to leave this set to false.
                 *
                 * Dynamic Property ID: `andexdbSettings:allowWatchdogTerminationCrash`
                 *
                 * @default false
                 */
                public static get allowWatchdogTerminationCrash(): boolean {
                    return Boolean(world.getDynamicProperty("andexdbSettings:allowWatchdogTerminationCrash") ?? false);
                }
                public static set allowWatchdogTerminationCrash(allowWatchdogTerminationCrash: boolean | undefined) {
                    world.setDynamicProperty("andexdbSettings:allowWatchdogTerminationCrash", allowWatchdogTerminationCrash ?? false);
                }
                /**
                 * It is recommended to leave this set to false.
                 *
                 * Dynamic Property ID: `andexdbSettings:hideWatchdogTerminationCrashEnabledWarningsOnStartup`
                 *
                 * @default false
                 */
                public static get hideWatchdogTerminationCrashEnabledWarningsOnStartup(): boolean {
                    return Boolean(world.getDynamicProperty("andexdbSettings:hideWatchdogTerminationCrashEnabledWarningsOnStartup") ?? false);
                }
                public static set hideWatchdogTerminationCrashEnabledWarningsOnStartup(hideWatchdogTerminationCrashEnabledWarningsOnStartup: boolean | undefined) {
                    world.setDynamicProperty(
                        "andexdbSettings:hideWatchdogTerminationCrashEnabledWarningsOnStartup",
                        hideWatchdogTerminationCrashEnabledWarningsOnStartup ?? false
                    );
                }
                public static get autoSavePlayerData(): boolean {
                    return Boolean(world.getDynamicProperty("andexdbSettings:autoSavePlayerData") ?? true);
                }
                public static set autoSavePlayerData(autoSavePlayerData: boolean | undefined) {
                    world.setDynamicProperty("andexdbSettings:autoSavePlayerData", autoSavePlayerData ?? true);
                }
                /**
                 * It is recommended to leave this set to false.
                 *
                 * Dynamic Property ID: `andexdbSettings:useLegacyPlayerInventoryDataSaveSystem`
                 *
                 * @default false
                 */
                public static get useLegacyPlayerInventoryDataSaveSystem(): boolean {
                    return Boolean(world.getDynamicProperty("andexdbSettings:useLegacyPlayerInventoryDataSaveSystem") ?? false);
                }
                public static set useLegacyPlayerInventoryDataSaveSystem(useLegacyPlayerInventoryDataSaveSystem: boolean | undefined) {
                    world.setDynamicProperty("andexdbSettings:useLegacyPlayerInventoryDataSaveSystem", useLegacyPlayerInventoryDataSaveSystem ?? false);
                }
                public static get playerInventoryDataSaveSystemEnabled(): boolean {
                    return Boolean(world.getDynamicProperty("andexdbSettings:playerInventoryDataSaveSystemEnabled") ?? true);
                }
                public static set playerInventoryDataSaveSystemEnabled(playerInventoryDataSaveSystemEnabled: boolean | undefined) {
                    world.setDynamicProperty("andexdbSettings:playerInventoryDataSaveSystemEnabled", playerInventoryDataSaveSystemEnabled ?? true);
                }
                public static get spreadPlayerInventoryDataSavesOverMultipleTicks(): boolean {
                    return Boolean(world.getDynamicProperty("andexdbSettings:spreadPlayerInventoryDataSavesOverMultipleTicks") ?? true);
                }
                public static set spreadPlayerInventoryDataSavesOverMultipleTicks(spreadPlayerInventoryDataSavesOverMultipleTicks: boolean | undefined) {
                    world.setDynamicProperty(
                        "andexdbSettings:spreadPlayerInventoryDataSavesOverMultipleTicks",
                        spreadPlayerInventoryDataSavesOverMultipleTicks ?? true
                    );
                }
                public static get playerDataSavePerformanceMode(): PlayerDataSaveMode {
                    return String(world.getDynamicProperty("andexdbSettings:playerDataSavePerformanceMode") ?? "full") as PlayerDataSaveMode;
                }
                public static set playerDataSavePerformanceMode(playerDataSavePerformanceMode: PlayerDataSaveMode | undefined) {
                    world.setDynamicProperty("andexdbSettings:playerDataSavePerformanceMode", playerDataSavePerformanceMode ?? "full");
                }
                public static get showEntityScaleNotFoundConsoleLog(): boolean {
                    return Boolean(world.getDynamicProperty("andexdbSettings:showEntityScaleNotFoundConsoleLog") ?? true);
                }
                public static set showEntityScaleNotFoundConsoleLog(showEntityScaleNotFoundConsoleLog: boolean | undefined) {
                    world.setDynamicProperty("andexdbSettings:showEntityScaleNotFoundConsoleLog", showEntityScaleNotFoundConsoleLog ?? true);
                }
                public static get showEntityScaleFoundConsoleLog(): boolean {
                    return Boolean(world.getDynamicProperty("andexdbSettings:showEntityScaleFoundConsoleLog") ?? true);
                }
                public static set showEntityScaleFoundConsoleLog(showEntityScaleFoundConsoleLog: boolean | undefined) {
                    world.setDynamicProperty("andexdbSettings:showEntityScaleFoundConsoleLog", showEntityScaleFoundConsoleLog ?? true);
                }
                public static get showEntityScaleNotFoundChatLog(): boolean {
                    return Boolean(world.getDynamicProperty("andexdbSettings:showEntityScaleNotFoundChatLog") ?? false);
                }
                public static set showEntityScaleNotFoundChatLog(showEntityScaleNotFoundChatLog: boolean | undefined) {
                    world.setDynamicProperty("andexdbSettings:showEntityScaleNotFoundChatLog", showEntityScaleNotFoundChatLog ?? false);
                }
                public static get showEntityScaleFoundChatLog(): boolean {
                    return Boolean(world.getDynamicProperty("andexdbSettings:showEntityScaleFoundChatLog") ?? false);
                }
                public static set showEntityScaleFoundChatLog(showEntityScaleFoundChatLog: boolean | undefined) {
                    world.setDynamicProperty("andexdbSettings:showEntityScaleFoundChatLog", showEntityScaleFoundChatLog ?? false);
                }
                public static get showBlueModsAnticheatNotFoundConsoleLog(): boolean {
                    return Boolean(world.getDynamicProperty("andexdbSettings:showBlueModsAnticheatNotFoundConsoleLog") ?? true);
                }
                public static set showBlueModsAnticheatNotFoundConsoleLog(showBlueModsAnticheatNotFoundConsoleLog: boolean | undefined) {
                    world.setDynamicProperty("andexdbSettings:showBlueModsAnticheatNotFoundConsoleLog", showBlueModsAnticheatNotFoundConsoleLog ?? true);
                }
                public static get showBlueModsAnticheatFoundConsoleLog(): boolean {
                    return Boolean(world.getDynamicProperty("andexdbSettings:showBlueModsAnticheatFoundConsoleLog") ?? true);
                }
                public static set showBlueModsAnticheatFoundConsoleLog(showBlueModsAnticheatFoundConsoleLog: boolean | undefined) {
                    world.setDynamicProperty("andexdbSettings:showBlueModsAnticheatFoundConsoleLog", showBlueModsAnticheatFoundConsoleLog ?? true);
                }
                public static get showBlueModsAnticheatNotFoundChatLog(): boolean {
                    return Boolean(world.getDynamicProperty("andexdbSettings:showBlueModsAnticheatNotFoundChatLog") ?? false);
                }
                public static set showBlueModsAnticheatNotFoundChatLog(showBlueModsAnticheatNotFoundChatLog: boolean | undefined) {
                    world.setDynamicProperty("andexdbSettings:showBlueModsAnticheatNotFoundChatLog", showBlueModsAnticheatNotFoundChatLog ?? false);
                }
                public static get showBlueModsAnticheatFoundChatLog(): boolean {
                    return Boolean(world.getDynamicProperty("andexdbSettings:showBlueModsAnticheatFoundChatLog") ?? false);
                }
                public static set showBlueModsAnticheatFoundChatLog(showBlueModsAnticheatFoundChatLog: boolean | undefined) {
                    world.setDynamicProperty("andexdbSettings:showBlueModsAnticheatFoundChatLog", showBlueModsAnticheatFoundChatLog ?? false);
                }
                /**
                 * Sets whether or not the add-on is allowed to connect to and communicate with the entity scale add-on.
                 * @warning It is HIGHLY DISCOURAGED to disable this option.
                 */
                public static get allowConnectingToEntityScale(): boolean {
                    return Boolean(world.getDynamicProperty("andexdbSettings:allowConnectingToEntityScale") ?? true);
                }
                public static set allowConnectingToEntityScale(allowConnectingToEntityScale: boolean | undefined) {
                    world.setDynamicProperty("andexdbSettings:allowConnectingToEntityScale", allowConnectingToEntityScale ?? true);
                }
                /**
                 * Sets whether or not the add-on is allowed to connect to and communicate with the BlueMods Anticheat add-on.
                 * @warning It is HIGHLY DISCOURAGED to disable this option.
                 */
                public static get allowConnectingToBlueModsAnticheat(): boolean {
                    return Boolean(world.getDynamicProperty("andexdbSettings:allowConnectingToBlueModsAnticheat") ?? true);
                }
                public static set allowConnectingToBlueModsAnticheat(allowConnectingToBlueModsAnticheat: boolean | undefined) {
                    world.setDynamicProperty("andexdbSettings:allowConnectingToBlueModsAnticheat", allowConnectingToBlueModsAnticheat ?? true);
                }
            }
            return config_system;
        }
        /**
         * Resets the specified subsection of the config, or the entire config if no subsection is specified.
         * @param subsection The subsection of the config to reset. If not specified, the entire config will be reset.
         *
         * @example
         * Reset the `config.worldBorder.overworld` section of the config:
         * ```ts
         * config.reset(config.worldBorder.overworld);
         * ```
         *
         * @example
         * Reset the entire config:
         * ```ts
         * config.reset();
         * ```
         */
        public static reset(subsection?: any): void {
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
         * @example
         * Apply settings to the config:
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
        public static applySettings<T extends FilterKey<typeof config, ["prototype", "reset", "applySettings", "toJSON"]>>(settings: DeepPartial<T>): void {
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
         *
         * @template {object} T The type of the settings category to convert to JSON.
         * @param {T} [subconfig=this] The subconfig to convert to JSON. If not specified, the entire config will be converted to JSON.
         * @returns {FilterKey<T, ["prototype", "reset", "applySettings", "toJSON"]>} An object that can be serialized to JSON, containing all the properties of the config object except for the ones with the names "prototype", "reset", "applySettings", and "toJSON", and the ones that are not enumerable.
         */
        public static toJSON<T extends object = typeof config>(subconfig: T = this as T): FilterKey<T, ["prototype", "reset", "applySettings", "toJSON"]> {
            // modules.utils.filterProperties(modules.utils.filterProperties(config, ["addCommaSeparators", "spawnCommandAllowCrossDimensionalTeleport", "allowWatchdogTerminationCrash", "spawnCommandLocation", "allowChatEscapeCodes"], {}), ["toJSON"], {}).antiSpamSystem.antispamEnabled;
            return Object.fromEntries(
                cullUndefined(
                    Object.getOwnPropertyNames(subconfig).map((key: string) => {
                        const descriptor = Object.getOwnPropertyDescriptor(subconfig, key);
                        if (descriptor?.get && descriptor.set) {
                            return [key, descriptor.get()];
                        } else if (descriptor?.get && typeof descriptor.get() === "function" && descriptor.get()?.name?.startsWith("config")) {
                            return [key, config.toJSON(descriptor.get())];
                        }
                        // return [key, this[key as keyof typeof config]];
                        return undefined;
                    })
                )
            ); /* 
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
