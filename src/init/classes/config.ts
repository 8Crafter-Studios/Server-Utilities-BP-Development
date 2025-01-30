import { world, StructureSaveMode, type DimensionLocation, Dimension } from "@minecraft/server";
import { gwdp } from "init/functions/gwdp";

/**
 * A class containing the configuration information for the add-on.
 */

export class config {
    /*
    @log
    @loggedMethod
    greet() {
        console.log(`Hello, my name is 1.`);
    }*/
    static get chatCommandsEnabled() {
        return Boolean(world.getDynamicProperty("andexdbSettings:chatCommandsEnabled") ?? true);
    }
    static set chatCommandsEnabled(enabled: boolean | undefined) {
        world.setDynamicProperty("andexdbSettings:chatCommandsEnabled", enabled ?? true);
    }
    static get chatCommandPrefix() {
        return String(world.getDynamicProperty("andexdbSettings:chatCommandPrefix") ?? "\\");
    }
    static set chatCommandPrefix(prefix: string | undefined) {
        world.setDynamicProperty("andexdbSettings:chatCommandPrefix", prefix ?? "\\");
    }
    static get validChatCommandPrefixes() {
        return String(world.getDynamicProperty("andexdbSettings:validChatCommandPrefixes") ?? "");
    }
    static set validChatCommandPrefixes(prefixes: string | undefined) {
        world.setDynamicProperty("andexdbSettings:validChatCommandPrefixes", prefixes ?? "");
    }
    static get invalidChatCommandAction() {
        return isNaN(Number(world.getDynamicProperty("andexdbSettings:invalidChatCommandAction")))
            ? 3
            : Number(world.getDynamicProperty("andexdbSettings:invalidChatCommandAction") ?? 3);
    }
    static set invalidChatCommandAction(invalidChatCommandAction: number | undefined) {
        world.setDynamicProperty("andexdbSettings:invalidChatCommandAction", invalidChatCommandAction ?? 3);
    }
    /**
     * How long in seconds after getting damaged by another player that the player has to wait before they can teleport with commands such as `\spawn`, `\home`, `\gohome`, `\tpa`, and `\rtp`.
     * 
     * It defaults to 0.
     */
    static get pvpCooldownToTeleport() {
        return isNaN(Number(world.getDynamicProperty("andexdbSettings:pvpCooldownToTeleport")))
            ? 0
            : Number(world.getDynamicProperty("andexdbSettings:pvpCooldownToTeleport") ?? 0);
    }
    static set pvpCooldownToTeleport(invalidChatCommandAction: number | undefined) {
        world.setDynamicProperty("andexdbSettings:pvpCooldownToTeleport", invalidChatCommandAction ?? 0);
    }
    static get undoClipboardMode() {
        return String(world.getDynamicProperty("andexdbSettings:undoClipboardMode") ?? StructureSaveMode.Memory) as StructureSaveMode;
    }
    static set undoClipboardMode(undoClipboardMode: StructureSaveMode | undefined) {
        world.setDynamicProperty("andexdbSettings:undoClipboardMode", undoClipboardMode ?? StructureSaveMode.Memory);
    }
    static get spawnCommandLocation() {
        const v = tryget(() =>
            JSON.parse(String(world.getDynamicProperty("andexdbSettings:spawnCommandLocation") ?? '{x: null, y: null, z: null, dimension: "overworld"}'))
        ) ?? { x: null, y: null, z: null, dimension: "overworld" };
        return (
            tryget(() => ({
                x: v.x,
                y: v.y,
                z: v.z,
                dimension: dimensionsb[String(v.dimension)] ?? overworld,
            })) ?? ({ x: null, y: null, z: null, dimension: overworld } as DimensionLocation | { x: null; y: null; z: null; dimension: Dimension })
        );
    }
    static set spawnCommandLocation(spawnCommandLocation: DimensionLocation | { x: null; y: null; z: null; dimension: Dimension } | undefined) {
        world.setDynamicProperty(
            "andexdbSettings:spawnCommandLocation",
            JSON.stringify({
                x: spawnCommandLocation.x,
                y: spawnCommandLocation.y,
                z: spawnCommandLocation.z,
                dimension: spawnCommandLocation.dimension ?? overworld,
            })
        );
    }
    static get worldBorder() {
        return {
            get overworld() {
                return {
                    get enabled() {
                        return Boolean(world.getDynamicProperty("andexdbWorldBorderSettings:overworld.enabled") ?? false);
                    },
                    set enabled(enabled: boolean | undefined) {
                        world.setDynamicProperty("andexdbWorldBorderSettings:overworld.enabled", enabled ?? false);
                    },
                    get from() {
                        return (
                            tryget(() =>
                                JSON.parse(String(world.getDynamicProperty("andexdbWorldBorderSettings:overworld.from") ?? "{x: -29999984, z: -29999984}"))
                            ) ?? { x: -29999984, z: -29999984 }
                        );
                    },
                    set from(from: { x: number; z: number } | { x: null; z: null } | undefined) {
                        world.setDynamicProperty("andexdbWorldBorderSettings:overworld.from", JSON.stringify(from ?? { x: -29999984, z: -29999984 }));
                    },
                    get to() {
                        return (
                            tryget(() =>
                                JSON.parse(String(world.getDynamicProperty("andexdbWorldBorderSettings:overworld.to") ?? "{x: 29999984, z: 29999984}"))
                            ) ?? { x: 29999984, z: 29999984 }
                        );
                    },
                    set to(to: { x: number; z: number } | { x: null; z: null } | undefined) {
                        world.setDynamicProperty("andexdbWorldBorderSettings:overworld.to", JSON.stringify(to ?? { x: 29999984, z: 29999984 }));
                    },
                    get mode() {
                        return Number(world.getDynamicProperty("andexdbWorldBorderSettings:overworld.mode") ?? 1);
                    },
                    set mode(mode: number | undefined) {
                        world.setDynamicProperty("andexdbWorldBorderSettings:overworld.mode", mode ?? 1);
                    },
                    get damage() {
                        return Number(world.getDynamicProperty("andexdbWorldBorderSettings:overworld.damageMode.damage") ?? 1);
                    },
                    set damage(damage: number | undefined) {
                        world.setDynamicProperty("andexdbWorldBorderSettings:overworld.damageMode.damage", damage ?? 1);
                    },
                    get knockbackH() {
                        return Number(world.getDynamicProperty("andexdbWorldBorderSettings:overworld.knockbackMode.knockbackH") ?? 2.5);
                    },
                    set knockbackH(horizontalKnockback: number | undefined) {
                        world.setDynamicProperty("andexdbWorldBorderSettings:overworld.knockbackMode.knockbackH", horizontalKnockback ?? 2.5);
                    },
                    get knockbackV() {
                        return Number(world.getDynamicProperty("andexdbWorldBorderSettings:overworld.knockbackMode.knockbackV") ?? 1.25);
                    },
                    set knockbackV(verticalKnockback: number | undefined) {
                        world.setDynamicProperty("andexdbWorldBorderSettings:overworld.knockbackMode.knockbackV", verticalKnockback ?? 1.25);
                    },
                    get preventWorldInteractionOutsideBorder() {
                        return Boolean(world.getDynamicProperty("andexdbWorldBorderSettings:overworld.preventWorldInteractionOutsideBorder") ?? false);
                    },
                    set preventWorldInteractionOutsideBorder(preventWorldInteractionOutsideBorder: boolean | undefined) {
                        world.setDynamicProperty(
                            "andexdbWorldBorderSettings:overworld.preventWorldInteractionOutsideBorder",
                            preventWorldInteractionOutsideBorder ?? false
                        );
                    },
                    get tintIntensity() {
                        return Number(world.getDynamicProperty("andexdbWorldBorderSettings:overworld.tintIntensity") ?? 1);
                    },
                    set tintIntensity(tintIntensity: number | undefined) {
                        world.setDynamicProperty("andexdbWorldBorderSettings:overworld.tintIntensity", tintIntensity ?? 1);
                    },
                    /**
                     * d
                     * @todo
                     */
                    get warnPlayersInChat() {
                        return Boolean(world.getDynamicProperty("andexdbWorldBorderSettings:overworld.warnPlayersInChat") ?? false);
                    },
                    /**
                     * c
                     * @todo
                     */
                    set warnPlayersInChat(warnPlayersInChat: boolean | undefined) {
                        world.setDynamicProperty("andexdbWorldBorderSettings:overworld.warnPlayersInChat", warnPlayersInChat ?? false);
                    },
                    /**
                     * b
                     * @todo
                     */
                    get showActionbarWarningWhenOutsideBorder() {
                        return Boolean(world.getDynamicProperty("andexdbWorldBorderSettings:overworld.showActionbarWarningWhenOutsideBorder") ?? false);
                    },
                    /**
                     * a
                     * @todo
                     */
                    set showActionbarWarningWhenOutsideBorder(showActionbarWarningWhenOutsideBorder: boolean | undefined) {
                        world.setDynamicProperty(
                            "andexdbWorldBorderSettings:overworld.showActionbarWarningWhenOutsideBorder",
                            showActionbarWarningWhenOutsideBorder ?? false
                        );
                    },
                    get showRedScreenOutlineWhenOutsideBorder() {
                        return Boolean(world.getDynamicProperty("andexdbWorldBorderSettings:overworld.showRedScreenOutlineWhenOutsideBorder") ?? true);
                    },
                    set showRedScreenOutlineWhenOutsideBorder(showRedScreenOutlineWhenOutsideBorder: boolean | undefined) {
                        world.setDynamicProperty(
                            "andexdbWorldBorderSettings:overworld.showRedScreenOutlineWhenOutsideBorder",
                            showRedScreenOutlineWhenOutsideBorder ?? true
                        );
                    },
                    get showBorderParticles() {
                        return Boolean(world.getDynamicProperty("andexdbWorldBorderSettings:overworld.showBorderParticles") ?? true);
                    },
                    set showBorderParticles(showBorderParticles: boolean | undefined) {
                        world.setDynamicProperty("andexdbWorldBorderSettings:overworld.showBorderParticles", showBorderParticles ?? true);
                    },
                    /**
                     * @deprecated
                     */
                    get useShadersCompatibleBorderParticles() {
                        return Boolean(world.getDynamicProperty("andexdbWorldBorderSettings:overworld.useShadersCompatibleBorderParticles") ?? false);
                    },
                    /**
                     * @deprecated
                     */
                    set useShadersCompatibleBorderParticles(useShadersCompatibleBorderParticles: boolean | undefined) {
                        world.setDynamicProperty(
                            "andexdbWorldBorderSettings:overworld.useShadersCompatibleBorderParticles",
                            useShadersCompatibleBorderParticles ?? false
                        );
                    },
                    get buffer() {
                        return Number(world.getDynamicProperty("andexdbWorldBorderSettings:overworld.buffer") ?? 5);
                    },
                    set buffer(buffer: number | undefined) {
                        world.setDynamicProperty("andexdbWorldBorderSettings:overworld.buffer", buffer ?? 5);
                    },
                };
            },
            get nether() {
                return {
                    get enabled() {
                        return Boolean(world.getDynamicProperty("andexdbWorldBorderSettings:nether.enabled") ?? false);
                    },
                    set enabled(enabled: boolean | undefined) {
                        world.setDynamicProperty("andexdbWorldBorderSettings:nether.enabled", enabled ?? false);
                    },
                    get from() {
                        return (
                            tryget(() =>
                                JSON.parse(String(world.getDynamicProperty("andexdbWorldBorderSettings:nether.from") ?? "{x: -29999984, z: -29999984}"))
                            ) ?? { x: -29999984, z: -29999984 }
                        );
                    },
                    set from(from: { x: number; z: number } | { x: null; z: null } | undefined) {
                        world.setDynamicProperty("andexdbWorldBorderSettings:nether.from", JSON.stringify(from ?? { x: -29999984, z: -29999984 }));
                    },
                    get to() {
                        return (
                            tryget(() =>
                                JSON.parse(String(world.getDynamicProperty("andexdbWorldBorderSettings:nether.to") ?? "{x: 29999984, z: 29999984}"))
                            ) ?? { x: 29999984, z: 29999984 }
                        );
                    },
                    set to(to: { x: number; z: number } | { x: null; z: null } | undefined) {
                        world.setDynamicProperty("andexdbWorldBorderSettings:nether.to", JSON.stringify(to ?? { x: 29999984, z: 29999984 }));
                    },
                    get mode() {
                        return Number(world.getDynamicProperty("andexdbWorldBorderSettings:nether.mode") ?? 1);
                    },
                    set mode(mode: number | undefined) {
                        world.setDynamicProperty("andexdbWorldBorderSettings:nether.mode", mode ?? 1);
                    },
                    get damage() {
                        return Number(world.getDynamicProperty("andexdbWorldBorderSettings:nether.damageMode.damage") ?? 1);
                    },
                    set damage(damage: number | undefined) {
                        world.setDynamicProperty("andexdbWorldBorderSettings:nether.damageMode.damage", damage ?? 1);
                    },
                    get knockbackH() {
                        return Number(world.getDynamicProperty("andexdbWorldBorderSettings:nether.knockbackMode.knockbackH") ?? 2.5);
                    },
                    set knockbackH(horizontalKnockback: number | undefined) {
                        world.setDynamicProperty("andexdbWorldBorderSettings:nether.knockbackMode.knockbackH", horizontalKnockback ?? 2.5);
                    },
                    get knockbackV() {
                        return Number(world.getDynamicProperty("andexdbWorldBorderSettings:nether.knockbackMode.knockbackV") ?? 1.25);
                    },
                    set knockbackV(verticalKnockback: number | undefined) {
                        world.setDynamicProperty("andexdbWorldBorderSettings:nether.knockbackMode.knockbackV", verticalKnockback ?? 1.25);
                    },
                    get preventWorldInteractionOutsideBorder() {
                        return Boolean(world.getDynamicProperty("andexdbWorldBorderSettings:nether.preventWorldInteractionOutsideBorder") ?? false);
                    },
                    set preventWorldInteractionOutsideBorder(preventWorldInteractionOutsideBorder: boolean | undefined) {
                        world.setDynamicProperty(
                            "andexdbWorldBorderSettings:nether.preventWorldInteractionOutsideBorder",
                            preventWorldInteractionOutsideBorder ?? false
                        );
                    },
                    get tintIntensity() {
                        return Number(world.getDynamicProperty("andexdbWorldBorderSettings:nether.tintIntensity") ?? 1);
                    },
                    set tintIntensity(tintIntensity: number | undefined) {
                        world.setDynamicProperty("andexdbWorldBorderSettings:nether.tintIntensity", tintIntensity ?? 1);
                    },
                    /**
                     * @todo
                     */
                    get warnPlayersInChat() {
                        return Boolean(world.getDynamicProperty("andexdbWorldBorderSettings:nether.warnPlayersInChat") ?? false);
                    },
                    /**
                     * @todo
                     */
                    set warnPlayersInChat(warnPlayersInChat: boolean | undefined) {
                        world.setDynamicProperty("andexdbWorldBorderSettings:nether.warnPlayersInChat", warnPlayersInChat ?? false);
                    },
                    /**
                     * @todo
                     */
                    get showActionbarWarningWhenOutsideBorder() {
                        return Boolean(world.getDynamicProperty("andexdbWorldBorderSettings:nether.showActionbarWarningWhenOutsideBorder") ?? false);
                    },
                    /**
                     * @todo
                     */
                    set showActionbarWarningWhenOutsideBorder(showActionbarWarningWhenOutsideBorder: boolean | undefined) {
                        world.setDynamicProperty(
                            "andexdbWorldBorderSettings:nether.showActionbarWarningWhenOutsideBorder",
                            showActionbarWarningWhenOutsideBorder ?? false
                        );
                    },
                    get showRedScreenOutlineWhenOutsideBorder() {
                        return Boolean(world.getDynamicProperty("andexdbWorldBorderSettings:nether.showRedScreenOutlineWhenOutsideBorder") ?? true);
                    },
                    set showRedScreenOutlineWhenOutsideBorder(showRedScreenOutlineWhenOutsideBorder: boolean | undefined) {
                        world.setDynamicProperty(
                            "andexdbWorldBorderSettings:nether.showRedScreenOutlineWhenOutsideBorder",
                            showRedScreenOutlineWhenOutsideBorder ?? true
                        );
                    },
                    get showBorderParticles() {
                        return Boolean(world.getDynamicProperty("andexdbWorldBorderSettings:nether.showBorderParticles") ?? true);
                    },
                    set showBorderParticles(showBorderParticles: boolean | undefined) {
                        world.setDynamicProperty("andexdbWorldBorderSettings:nether.showBorderParticles", showBorderParticles ?? true);
                    },
                    /**
                     * @deprecated
                     */
                    get useShadersCompatibleBorderParticles() {
                        return Boolean(world.getDynamicProperty("andexdbWorldBorderSettings:nether.useShadersCompatibleBorderParticles") ?? false);
                    },
                    /**
                     * @deprecated
                     */
                    set useShadersCompatibleBorderParticles(useShadersCompatibleBorderParticles: boolean | undefined) {
                        world.setDynamicProperty(
                            "andexdbWorldBorderSettings:nether.useShadersCompatibleBorderParticles",
                            useShadersCompatibleBorderParticles ?? false
                        );
                    },
                    get buffer() {
                        return Number(world.getDynamicProperty("andexdbWorldBorderSettings:nether.buffer") ?? 5);
                    },
                    set buffer(buffer: number | undefined) {
                        world.setDynamicProperty("andexdbWorldBorderSettings:nether.buffer", buffer ?? 5);
                    },
                };
            },
            get the_end() {
                return {
                    get enabled() {
                        return Boolean(world.getDynamicProperty("andexdbWorldBorderSettings:the_end.enabled") ?? false);
                    },
                    set enabled(enabled: boolean | undefined) {
                        world.setDynamicProperty("andexdbWorldBorderSettings:the_end.enabled", enabled ?? false);
                    },
                    get from() {
                        return (
                            tryget(() =>
                                JSON.parse(String(world.getDynamicProperty("andexdbWorldBorderSettings:the_end.from") ?? "{x: -29999984, z: -29999984}"))
                            ) ?? { x: -29999984, z: -29999984 }
                        );
                    },
                    set from(from: { x: number; z: number } | { x: null; z: null } | undefined) {
                        world.setDynamicProperty("andexdbWorldBorderSettings:the_end.from", JSON.stringify(from ?? { x: -29999984, z: -29999984 }));
                    },
                    get to() {
                        return (
                            tryget(() =>
                                JSON.parse(String(world.getDynamicProperty("andexdbWorldBorderSettings:the_end.to") ?? "{x: 29999984, z: 29999984}"))
                            ) ?? { x: 29999984, z: 29999984 }
                        );
                    },
                    set to(to: { x: number; z: number } | { x: null; z: null } | undefined) {
                        world.setDynamicProperty("andexdbWorldBorderSettings:the_end.to", JSON.stringify(to ?? { x: 29999984, z: 29999984 }));
                    },
                    get mode() {
                        return Number(world.getDynamicProperty("andexdbWorldBorderSettings:the_end.mode") ?? 1);
                    },
                    set mode(mode: number | undefined) {
                        world.setDynamicProperty("andexdbWorldBorderSettings:the_end.mode", mode ?? 1);
                    },
                    get damage() {
                        return Number(world.getDynamicProperty("andexdbWorldBorderSettings:the_end.damageMode.damage") ?? 1);
                    },
                    set damage(damage: number | undefined) {
                        world.setDynamicProperty("andexdbWorldBorderSettings:the_end.damageMode.damage", damage ?? 1);
                    },
                    get knockbackH() {
                        return Number(world.getDynamicProperty("andexdbWorldBorderSettings:the_end.knockbackMode.knockbackH") ?? 2.5);
                    },
                    set knockbackH(horizontalKnockback: number | undefined) {
                        world.setDynamicProperty("andexdbWorldBorderSettings:the_end.knockbackMode.knockbackH", horizontalKnockback ?? 2.5);
                    },
                    get knockbackV() {
                        return Number(world.getDynamicProperty("andexdbWorldBorderSettings:the_end.knockbackMode.knockbackV") ?? 1.25);
                    },
                    set knockbackV(verticalKnockback: number | undefined) {
                        world.setDynamicProperty("andexdbWorldBorderSettings:the_end.knockbackMode.knockbackV", verticalKnockback ?? 1.25);
                    },
                    get preventWorldInteractionOutsideBorder() {
                        return Boolean(world.getDynamicProperty("andexdbWorldBorderSettings:the_end.preventWorldInteractionOutsideBorder") ?? false);
                    },
                    set preventWorldInteractionOutsideBorder(preventWorldInteractionOutsideBorder: boolean | undefined) {
                        world.setDynamicProperty(
                            "andexdbWorldBorderSettings:the_end.preventWorldInteractionOutsideBorder",
                            preventWorldInteractionOutsideBorder ?? false
                        );
                    },
                    get tintIntensity() {
                        return Number(world.getDynamicProperty("andexdbWorldBorderSettings:the_end.tintIntensity") ?? 1);
                    },
                    set tintIntensity(tintIntensity: number | undefined) {
                        world.setDynamicProperty("andexdbWorldBorderSettings:the_end.tintIntensity", tintIntensity ?? 1);
                    },
                    /**
                     * @todo
                     */
                    get warnPlayersInChat() {
                        return Boolean(world.getDynamicProperty("andexdbWorldBorderSettings:the_end.warnPlayersInChat") ?? false);
                    },
                    /**
                     * @todo
                     */
                    set warnPlayersInChat(warnPlayersInChat: boolean | undefined) {
                        world.setDynamicProperty("andexdbWorldBorderSettings:the_end.warnPlayersInChat", warnPlayersInChat ?? false);
                    },
                    /**
                     * @todo
                     */
                    get showActionbarWarningWhenOutsideBorder() {
                        return Boolean(world.getDynamicProperty("andexdbWorldBorderSettings:the_end.showActionbarWarningWhenOutsideBorder") ?? false);
                    },
                    /**
                     * @todo
                     */
                    set showActionbarWarningWhenOutsideBorder(showActionbarWarningWhenOutsideBorder: boolean | undefined) {
                        world.setDynamicProperty(
                            "andexdbWorldBorderSettings:the_end.showActionbarWarningWhenOutsideBorder",
                            showActionbarWarningWhenOutsideBorder ?? false
                        );
                    },
                    get showRedScreenOutlineWhenOutsideBorder() {
                        return Boolean(world.getDynamicProperty("andexdbWorldBorderSettings:the_end.showRedScreenOutlineWhenOutsideBorder") ?? true);
                    },
                    set showRedScreenOutlineWhenOutsideBorder(showRedScreenOutlineWhenOutsideBorder: boolean | undefined) {
                        world.setDynamicProperty(
                            "andexdbWorldBorderSettings:the_end.showRedScreenOutlineWhenOutsideBorder",
                            showRedScreenOutlineWhenOutsideBorder ?? true
                        );
                    },
                    get showBorderParticles() {
                        return Boolean(world.getDynamicProperty("andexdbWorldBorderSettings:the_end.showBorderParticles") ?? true);
                    },
                    set showBorderParticles(showBorderParticles: boolean | undefined) {
                        world.setDynamicProperty("andexdbWorldBorderSettings:the_end.showBorderParticles", showBorderParticles ?? true);
                    },
                    /**
                     * @deprecated
                     */
                    get useShadersCompatibleBorderParticles() {
                        return Boolean(world.getDynamicProperty("andexdbWorldBorderSettings:the_end.useShadersCompatibleBorderParticles") ?? false);
                    },
                    /**
                     * @deprecated
                     */
                    set useShadersCompatibleBorderParticles(useShadersCompatibleBorderParticles: boolean | undefined) {
                        world.setDynamicProperty(
                            "andexdbWorldBorderSettings:the_end.useShadersCompatibleBorderParticles",
                            useShadersCompatibleBorderParticles ?? false
                        );
                    },
                    get buffer() {
                        return Number(world.getDynamicProperty("andexdbWorldBorderSettings:the_end.buffer") ?? 5);
                    },
                    set buffer(buffer: number | undefined) {
                        world.setDynamicProperty("andexdbWorldBorderSettings:the_end.buffer", buffer ?? 5);
                    },
                };
            },
        };
    }
    static get shopSystem() {
        return {
            get server() {
                return {
                    get enabled() {
                        return Boolean(world.getDynamicProperty("andexdbShopSystemSettings:server.enabled") ?? false);
                    },
                    set enabled(enabled: boolean | undefined) {
                        world.setDynamicProperty("andexdbShopSystemSettings:server.enabled", enabled ?? false);
                    },
                };
            },
            get player() {
                return {
                    get enabled() {
                        return Boolean(world.getDynamicProperty("andexdbShopSystemSettings:player.enabled") ?? false);
                    },
                    set enabled(enabled: boolean | undefined) {
                        world.setDynamicProperty("andexdbShopSystemSettings:player.enabled", enabled ?? false);
                    },
                    get maxShopsPerPlayer() {
                        return (world.getDynamicProperty("andexdbShopSystemSettings:player.maxShopsPerPlayer") ?? 5).toString().toNumber();
                    },
                    set maxShopsPerPlayer(maxShopsPerPlayer: number | undefined) {
                        world.setDynamicProperty("andexdbShopSystemSettings:player.maxShopsPerPlayer", maxShopsPerPlayer ?? 5);
                    },
                    get allowSellingLockInSlotItems() {
                        return Boolean(world.getDynamicProperty("andexdbShopSystemSettings:player.allowSellingLockInSlotItems") ?? false);
                    },
                    set allowSellingLockInSlotItems(allowSellingLockInSlotItems: boolean | undefined) {
                        world.setDynamicProperty("andexdbShopSystemSettings:player.allowSellingLockInSlotItems", allowSellingLockInSlotItems ?? false);
                    },
                    get allowSellingLockInInventoryItems() {
                        return Boolean(world.getDynamicProperty("andexdbShopSystemSettings:player.allowSellingLockInInventoryItems") ?? false);
                    },
                    set allowSellingLockInInventoryItems(allowSellingLockInInventoryItems: boolean | undefined) {
                        world.setDynamicProperty(
                            "andexdbShopSystemSettings:player.allowSellingLockInInventoryItems",
                            allowSellingLockInInventoryItems ?? false
                        );
                    },
                    get allowSellingKeepOnDeathItems() {
                        return Boolean(world.getDynamicProperty("andexdbShopSystemSettings:player.allowSellingKeepOnDeathItems") ?? true);
                    },
                    set allowSellingKeepOnDeathItems(allowSellingKeepOnDeathItems: boolean | undefined) {
                        world.setDynamicProperty("andexdbShopSystemSettings:player.allowSellingKeepOnDeathItems", allowSellingKeepOnDeathItems ?? true);
                    },
                };
            },
            get sign() {
                return {
                    get enabled() {
                        return Boolean(world.getDynamicProperty("andexdbShopSystemSettings:sign.enabled") ?? false);
                    },
                    set enabled(enabled: boolean | undefined) {
                        world.setDynamicProperty("andexdbShopSystemSettings:sign.enabled", enabled ?? false);
                    },
                };
            },
        };
    }
    static get homeSystem() {
        return {
            get homeSystemEnabled() {
                return Boolean(world.getDynamicProperty("homeSystemSettings:homeSystemEnabled") ?? false);
            },
            set homeSystemEnabled(enabled: boolean | undefined) {
                world.setDynamicProperty("homeSystemSettings:homeSystemEnabled", enabled ?? false);
            },
            get maxHomesPerPlayer() {
                return world.getDynamicProperty("homeSystemSettings:maxHomesPerPlayer") == -1
                    ? Infinity
                    : Number(world.getDynamicProperty("homeSystemSettings:maxHomesPerPlayer") ?? Infinity);
            },
            set maxHomesPerPlayer(maxHomes: number | undefined) {
                world.setDynamicProperty("homeSystemSettings:maxHomesPerPlayer", (maxHomes ?? Infinity) == Infinity ? -1 : maxHomes);
            },
        };
    }
    static get tpaSystem() {
        return {
            get tpaSystemEnabled() {
                return Boolean(
                    world.getDynamicProperty("tpaSystemSettings:tpaSystemEnabled") ?? world.getDynamicProperty("rtpSystemSettings:rtpSystemEnabled") ?? false
                );
            },
            set tpaSystemEnabled(enabled: boolean | undefined) {
                world.setDynamicProperty("tpaSystemSettings:tpaSystemEnabled", enabled ?? false);
            },
            /**
             * The number of seconds after a teleport request is sent before it will time out.
             */
            get timeoutDuration() {
                return isNaN(Number(world.getDynamicProperty("tpaSystemSettings:timeoutDuration")))
                    ? 60
                    : Number(world.getDynamicProperty("tpaSystemSettings:timeoutDuration") ?? 60);
            },
            set timeoutDuration(timeoutDuration: number | undefined) {
                world.setDynamicProperty("tpaSystemSettings:timeoutDuration", timeoutDuration ?? 60);
            },
        };
    }
    static get chatRanks() {
        return {
            get chatDisplayTimeStamp() {
                return Boolean(world.getDynamicProperty("andexdbSettings:chatDisplayTimeStamp") ?? false);
            },
            set chatDisplayTimeStamp(chatDisplayTimeStampEnabled: boolean | undefined) {
                world.setDynamicProperty("andexdbSettings:chatDisplayTimeStamp", chatDisplayTimeStampEnabled ?? false);
            },
            get showRanksOnPlayerNameTags() {
                return Boolean(world.getDynamicProperty("andexdbSettings:showRanksOnPlayerNameTags") ?? false);
            },
            set showRanksOnPlayerNameTags(showRanksOnPlayerNameTags: boolean | undefined) {
                world.setDynamicProperty("andexdbSettings:showRanksOnPlayerNameTags", showRanksOnPlayerNameTags ?? false);
            },
            get rankMode() {
                return String(world.getDynamicProperty("andexdbSettings:rankMode") ?? "custom_simple");
            },
            set rankMode(rankMode: string | undefined) {
                world.setDynamicProperty("andexdbSettings:rankMode", rankMode ?? "custom_simple");
            },
            get rankDisplayPrefix() {
                return String(world.getDynamicProperty("andexdbSettings:rankDisplayPrefix") ?? "[");
            },
            set rankDisplayPrefix(rankDisplayPrefix: string | undefined) {
                world.setDynamicProperty("andexdbSettings:rankDisplayPrefix", rankDisplayPrefix ?? "[");
            },
            get rankDisplaySuffix() {
                return String(world.getDynamicProperty("andexdbSettings:rankDisplaySuffix") ?? "§r]");
            },
            set rankDisplaySuffix(rankDisplaySuffix: string | undefined) {
                world.setDynamicProperty("andexdbSettings:rankDisplaySuffix", rankDisplaySuffix ?? "§r]");
            },
            get nameDisplayPrefix() {
                return String(world.getDynamicProperty("andexdbSettings:nameDisplayPrefix") ?? "[");
            },
            set nameDisplayPrefix(nameDisplayPrefix: string | undefined) {
                world.setDynamicProperty("andexdbSettings:nameDisplayPrefix", nameDisplayPrefix ?? "<");
            },
            get nameDisplaySuffix() {
                return String(world.getDynamicProperty("andexdbSettings:nameDisplaySuffix") ?? "§r]");
            },
            set nameDisplaySuffix(nameDisplaySuffix: string | undefined) {
                world.setDynamicProperty("andexdbSettings:nameDisplaySuffix", nameDisplaySuffix ?? "§r>");
            },
            get chatNameAndMessageSeparator() {
                return String(world.getDynamicProperty("andexdbSettings:chatNameAndMessageSeparator") ?? " ");
            },
            set chatNameAndMessageSeparator(chatNameAndMessageSeparator: string | undefined) {
                world.setDynamicProperty("andexdbSettings:chatNameAndMessageSeparator", chatNameAndMessageSeparator ?? " ");
            },
            get rankDisplaySeparator() {
                return String(world.getDynamicProperty("andexdbSettings:rankDisplaySeparator") ?? " ");
            },
            set rankDisplaySeparator(rankDisplaySeparator: string | undefined) {
                world.setDynamicProperty("andexdbSettings:rankDisplaySeparator", rankDisplaySeparator ?? " ");
            },
            /**
             * The template string for individual ranks.
             */
            get rankTemplateString() {
                return String(world.getDynamicProperty("andexdbSettings:rankTemplateString") ?? "[${rank}§r]");
            },
            set rankTemplateString(rankTemplateString: string | undefined) {
                world.setDynamicProperty("andexdbSettings:rankTemplateString", rankTemplateString ?? "[${rank}§r]");
            },
            get messageTemplateString() {
                return String(
                    world.getDynamicProperty("andexdbSettings:messageTemplateString") ??
                        '§r${timestampenabled?`[${timestamp}]`:""}${ranks}§r${(ranks!="")?" ":""}<${name}§r> ${message}'
                );
            },
            set messageTemplateString(messageTemplateString: string | undefined) {
                world.setDynamicProperty(
                    "andexdbSettings:messageTemplateString",
                    messageTemplateString ?? '§r${timestampenabled?`[${timestamp}]`:""}${ranks}§r${(ranks!="")?" ":""}<${name}§r> ${message}'
                );
            },
            get nameTagTemplateString() {
                return String(
                    world.getDynamicProperty("andexdbSettings:nameTagTemplateString") ??
                        '${(showDimension ? `[${dimension}§r§f] ` : "")}${rank} ${nameb}${(showHealth ? `§r§f[${currentHealth}/${maxHealth}] ` : "")}'
                );
            },
            set nameTagTemplateString(nameTagTemplateString: string | undefined) {
                world.setDynamicProperty(
                    "andexdbSettings:nameTagTemplateString",
                    nameTagTemplateString ?? '${(showDimension ? `[${dimension}§r§f] ` : "")}${rank} ${nameb}${(showHealth ? `§r§f[${currentHealth}/${maxHealth}] ` : "")}'
                );
            },
            get defaultRankTemplateString() {
                return String(world.getDynamicProperty("andexdbSettings:defaultRankTemplateString") ?? "");
            },
            set defaultRankTemplateString(defaultRankTemplateString: string | undefined) {
                world.setDynamicProperty("andexdbSettings:defaultRankTemplateString", defaultRankTemplateString ?? "");
            },
            get defaultMessageFormatting() {
                return String(world.getDynamicProperty("andexdbSettings:defaultMessageFormatting") ?? "");
            },
            set defaultMessageFormatting(defaultMessageFormatting: string | undefined) {
                world.setDynamicProperty("andexdbSettings:defaultMessageFormatting", defaultMessageFormatting ?? "");
            },
            get defaultNameFormatting() {
                return String(world.getDynamicProperty("andexdbSettings:defaultNameFormatting") ?? "");
            },
            set defaultNameFormatting(defaultNameFormatting: string | undefined) {
                world.setDynamicProperty("andexdbSettings:defaultNameFormatting", defaultNameFormatting ?? "");
            },
            get defaultSeparatorFormatting() {
                return String(world.getDynamicProperty("andexdbSettings:defaultSeparatorFormatting") ?? "");
            },
            set defaultSeparatorFormatting(defaultSeparatorFormatting: string | undefined) {
                world.setDynamicProperty("andexdbSettings:defaultSeparatorFormatting", defaultSeparatorFormatting ?? "");
            },
            get disableCustomChatMessages() {
                return Boolean(world.getDynamicProperty("andexdbSettings:disableCustomChatMessages") ?? false);
            },
            set disableCustomChatMessages(disableCustomChatMessages: boolean | undefined) {
                world.setDynamicProperty("andexdbSettings:disableCustomChatMessages", disableCustomChatMessages ?? false);
            },
            get allowCustomChatMessagesMuting() {
                return Boolean(world.getDynamicProperty("andexdbSettings:allowCustomChatMessagesMuting") ?? false);
            },
            set allowCustomChatMessagesMuting(allowCustomChatMessagesMuting: boolean | undefined) {
                world.setDynamicProperty("andexdbSettings:showRanksOnPlayerNameTags", allowCustomChatMessagesMuting ?? false);
            },
            get autoEscapeChatMessages() {
                return Boolean(world.getDynamicProperty("andexdbSettings:autoEscapeChatMessages") ?? false);
            },
            set autoEscapeChatMessages(autoEscapeChatMessages: boolean | undefined) {
                world.setDynamicProperty("andexdbSettings:autoEscapeChatMessages", autoEscapeChatMessages ?? false);
            },
            get autoURIEscapeChatMessages() {
                return Boolean(world.getDynamicProperty("andexdbSettings:autoURIEscapeChatMessages") ?? false);
            },
            set autoURIEscapeChatMessages(autoURIEscapeChatMessages: boolean | undefined) {
                world.setDynamicProperty("andexdbSettings:autoURIEscapeChatMessages", autoURIEscapeChatMessages ?? false);
            },
            get allowChatEscapeCodes() {
                return Boolean(world.getDynamicProperty("andexdbSettings:allowChatEscapeCodes") ?? false);
            },
            set allowChatEscapeCodes(allowChatEscapeCodes: boolean | undefined) {
                world.setDynamicProperty("andexdbSettings:allowChatEscapeCodes", allowChatEscapeCodes ?? false);
            },
        };
    }
    static get moneySystem() {
        return {
            /**
             * Whether or not to use a scoreboard-based money system instead of a dynamic property-based one.
             * 
             * Enabling this option will cause the money system to max out at the 32-bit integer limit (approximately 2.1 billion), but will allow for modifying a player's money with the /scoreboard command instead of having to use the main menu or use script eval.
             * 
             * When this option is disabled the limit is 10^32767. So basically infinite.
             * 
             * Default: false.
             * 
             * Dynamic Property ID: andexdbSettings:moneySystem.useScoreboardBasedMoneySystem
             */
            get useScoreboardBasedMoneySystem() {
                return Boolean(world.getDynamicProperty("andexdbSettings:moneySystem.useScoreboardBasedMoneySystem") ?? false);
            },
            set useScoreboardBasedMoneySystem(enabled: boolean | undefined) {
                world.setDynamicProperty("andexdbSettings:moneySystem.useScoreboardBasedMoneySystem", enabled ?? false);
            },
            /**
             * The name of the scoreboard to use for the money system.
             * 
             * Default: "andexdb:money".
             * 
             * Dynamic Property ID: andexdbSettings:moneySystem.scoreboardName
             */
            get scoreboardName() {
                return String(world.getDynamicProperty("andexdbSettings:moneySystem.scoreboardName") ?? "andexdb:money");
            },
            set scoreboardName(enabled: string | undefined) {
                world.setDynamicProperty("andexdbSettings:moneySystem.scoreboardName", enabled ?? "andexdb:money");
            },
        };
    }
    static get antiSpamSystem() {
        return {
            get antispamEnabled() {
                return Boolean(world.getDynamicProperty("antispamSettings:antispamEnabled") ?? false);
            },
            set antispamEnabled(enabled: boolean | undefined) {
                world.setDynamicProperty("antispamSettings:antispamEnabled", enabled ?? false);
            },
            get restartAntiSpamMuteTimerUponAttemptedMessageSendDuringMute() {
                return Boolean(world.getDynamicProperty("antispamSettings:restartAntiSpamMuteTimerUponAttemptedMessageSendDuringMute") ?? false);
            },
            set restartAntiSpamMuteTimerUponAttemptedMessageSendDuringMute(restartAntiSpamMuteTimerUponAttemptedMessageSendDuringMute: boolean | undefined) {
                world.setDynamicProperty(
                    "antispamSettings:restartAntiSpamMuteTimerUponAttemptedMessageSendDuringMute",
                    restartAntiSpamMuteTimerUponAttemptedMessageSendDuringMute ?? false
                );
            },
            get waitTimeAfterAntispamActivation() {
                return isNaN(Number(world.getDynamicProperty("antispamSettings:waitTimeAfterAntispamActivation")))
                    ? 60
                    : Number(world.getDynamicProperty("antispamSettings:waitTimeAfterAntispamActivation") ?? 60);
            },
            set waitTimeAfterAntispamActivation(waitTimeInSeconds: number | undefined) {
                world.setDynamicProperty("antispamSettings:waitTimeAfterAntispamActivation", waitTimeInSeconds ?? 60);
            },
            get maxTimeBewteenMessagesToTriggerAntiSpam() {
                return isNaN(Number(world.getDynamicProperty("antispamSettings:maxTimeBewteenMessagesToTriggerAntiSpam")))
                    ? 5
                    : Number(world.getDynamicProperty("antispamSettings:maxTimeBewteenMessagesToTriggerAntiSpam") ?? 5);
            },
            set maxTimeBewteenMessagesToTriggerAntiSpam(maxTimeInSeconds: number | undefined) {
                world.setDynamicProperty("antispamSettings:maxTimeBewteenMessagesToTriggerAntiSpam", maxTimeInSeconds ?? 5);
            },
            get antispamTriggerMessageCount() {
                return isNaN(Number(world.getDynamicProperty("antispamSettings:antispamTriggerMessageCount")))
                    ? 4
                    : Number(gwdp("antispamSettings:antispamTriggerMessageCount") ?? 4);
            },
            set antispamTriggerMessageCount(messageCount: number | undefined) {
                world.setDynamicProperty("antispamSettings:antispamTriggerMessageCount", messageCount ?? 4);
            },
        };
    }
    static get ui() {
        return {
            get main() {
                return {};
            },
            get pages() {
                return {
                    /**
                     * Moved from {@link config} to {@link config.ui.pages} in version 1.23.0-preview.20+BUILD.1 on 10/04/2024 at 3:10:37 PM PDT.
                     */
                    get maxPlayersPerManagePlayersPage() {
                        return Number(world.getDynamicProperty("andexdbSettings:maxPlayersPerManagePlayersPage") ?? 10);
                    },
                    set maxPlayersPerManagePlayersPage(maxPlayersPerManagePlayersPage: number | undefined) {
                        world.setDynamicProperty(
                            "andexdbSettings:maxPlayersPerManagePlayersPage",
                            Math.min(1000, Math.max(1, maxPlayersPerManagePlayersPage ?? 10))
                        );
                    },
                    /**
                     * Moved from {@link config} to {@link config.ui.pages} in version 1.23.0-preview.20+BUILD.1 on 10/04/2024 at 3:10:37 PM PDT.
                     */
                    get maxBansPerManageBansPage() {
                        return Number(world.getDynamicProperty("andexdbSettings:maxBansPerManageBansPage") ?? 10);
                    },
                    set maxBansPerManageBansPage(maxBansPerManageBansPage: number | undefined) {
                        world.setDynamicProperty("andexdbSettings:maxBansPerManageBansPage", maxBansPerManageBansPage ?? 10);
                    },
                    /**
                     * Moved from {@link config} to {@link config.ui.pages} in version 1.23.0-preview.20+BUILD.1 on 10/04/2024 at 3:10:37 PM PDT.
                     */
                    get maxHomesPerManageHomesPage() {
                        return Number(world.getDynamicProperty("andexdbSettings:maxHomesPerManageHomesPage") ?? 10);
                    },
                    set maxHomesPerManageHomesPage(maxHomesPerManageHomesPage: number | undefined) {
                        world.setDynamicProperty("andexdbSettings:maxHomesPerManageHomesPage", maxHomesPerManageHomesPage ?? 10);
                    },
                };
            },
            get other() {
                return {
                    get useStarWarsReference404Page() {
                        return Boolean(world.getDynamicProperty("andexdbUISettings:other.useStarWarsReference404Page") ?? false);
                    },
                    set useStarWarsReference404Page(useStarWarsReference404Page: boolean | undefined) {
                        world.setDynamicProperty("andexdbUISettings:other.useStarWarsReference404Page", useStarWarsReference404Page ?? false);
                    },
                };
            },
        };
    }
    static get system() {
        return {
            get artificialLagMS() {
                return Number(world.getDynamicProperty("andexdbSettings:artificialLagMS") ?? 0);
            },
            set artificialLagMS(artificialLagMS: number | undefined) {
                world.setDynamicProperty("andexdbSettings:artificialLagMS", artificialLagMS ?? 0);
            },
            get timeZone() {
                return isNaN(Number(world.getDynamicProperty("andexdbSettings:timeZone")))
                    ? 0
                    : Number(world.getDynamicProperty("andexdbSettings:timeZone") ?? 0);
            },
            set timeZone(timeZone: number | undefined) {
                world.setDynamicProperty("andexdbSettings:timeZone", timeZone ?? 0);
            },
            get playerDataRefreshRate() {
                return Number(world.getDynamicProperty("andexdbSettings:playerDataRefreshRate") ?? 20);
            },
            set playerDataRefreshRate(playerDataRefreshRate: number | undefined) {
                world.setDynamicProperty(
                    "andexdbSettings:playerDataRefreshRate",
                    Number.isNaN(Number(playerDataRefreshRate)) ? 5 : Math.min(1000, Math.max(1, Number(playerDataRefreshRate ?? 20)))
                );
            },
            get protectedAreasRefreshRate() {
                return Number(world.getDynamicProperty("andexdbSettings:protectedAreasRefreshRate") ?? 200);
            },
            set protectedAreasRefreshRate(protectedAreasRefreshRate: number | undefined) {
                world.setDynamicProperty(
                    "andexdbSettings:protectedAreasRefreshRate",
                    Number.isNaN(Number(protectedAreasRefreshRate)) ? 200 : Math.min(1000000, Math.max(1, Number(protectedAreasRefreshRate ?? 200)))
                );
            },
            get bannedPlayersRefreshRate() {
                return Number(world.getDynamicProperty("andexdbSettings:bannedPlayersRefreshRate") ?? 20);
            },
            set bannedPlayersRefreshRate(bannedPlayersRefreshRate: number | undefined) {
                world.setDynamicProperty(
                    "andexdbSettings:bannedPlayersRefreshRate",
                    Number.isNaN(Number(bannedPlayersRefreshRate)) ? 20 : Math.min(1000, Math.max(1, Number(bannedPlayersRefreshRate ?? 20)))
                );
            },
            get debugMode() {
                return Boolean(world.getDynamicProperty("andexdbSettings:debugMode") ?? false);
            },
            set debugMode(debugMode: boolean | undefined) {
                world.setDynamicProperty("andexdbSettings:debugMode", debugMode ?? false);
            },
            /**
             * It is reccommended to leave this set to false.
             */
            get allowWatchdogTerminationCrash() {
                return Boolean(world.getDynamicProperty("andexdbSettings:allowWatchdogTerminationCrash") ?? false);
            },
            set allowWatchdogTerminationCrash(allowWatchdogTerminationCrash: boolean | undefined) {
                world.setDynamicProperty("andexdbSettings:allowWatchdogTerminationCrash", allowWatchdogTerminationCrash ?? false);
            },
            /**
             * It is reccommended to leave this set to false.
             */
            get hideWatchdogTerminationCrashEnabledWarningsOnStartup() {
                return Boolean(world.getDynamicProperty("andexdbSettings:hideWatchdogTerminationCrashEnabledWarningsOnStartup") ?? false);
            },
            set hideWatchdogTerminationCrashEnabledWarningsOnStartup(hideWatchdogTerminationCrashEnabledWarningsOnStartup: boolean | undefined) {
                world.setDynamicProperty(
                    "andexdbSettings:hideWatchdogTerminationCrashEnabledWarningsOnStartup",
                    hideWatchdogTerminationCrashEnabledWarningsOnStartup ?? false
                );
            },
            /**
             * It is reccommended to leave this set to false.
             * @default false
             * @decorator
             * also
             * false
             */
            get useLegacyPlayerInventoryDataSaveSystem() {
                return Boolean(world.getDynamicProperty("andexdbSettings:useLegacyPlayerInventoryDataSaveSystem") ?? false);
            },
            set useLegacyPlayerInventoryDataSaveSystem(useLegacyPlayerInventoryDataSaveSystem: boolean | undefined) {
                world.setDynamicProperty("andexdbSettings:useLegacyPlayerInventoryDataSaveSystem", useLegacyPlayerInventoryDataSaveSystem ?? false);
            },
            get playerInventoryDataSaveSystemEnabled() {
                return Boolean(world.getDynamicProperty("andexdbSettings:playerInventoryDataSaveSystemEnabled") ?? true);
            },
            set playerInventoryDataSaveSystemEnabled(playerInventoryDataSaveSystemEnabled: boolean | undefined) {
                world.setDynamicProperty("andexdbSettings:playerInventoryDataSaveSystemEnabled", playerInventoryDataSaveSystemEnabled ?? true);
            },
            get spreadPlayerInventoryDataSavesOverMultipleTicks() {
                return Boolean(world.getDynamicProperty("andexdbSettings:spreadPlayerInventoryDataSavesOverMultipleTicks") ?? true);
            },
            set spreadPlayerInventoryDataSavesOverMultipleTicks(spreadPlayerInventoryDataSavesOverMultipleTicks: boolean | undefined) {
                world.setDynamicProperty(
                    "andexdbSettings:spreadPlayerInventoryDataSavesOverMultipleTicks",
                    spreadPlayerInventoryDataSavesOverMultipleTicks ?? true
                );
            },
            get showEntityScaleNotFoundConsoleLog() {
                return Boolean(world.getDynamicProperty("andexdbSettings:showEntityScaleNotFoundConsoleLog") ?? true);
            },
            set showEntityScaleNotFoundConsoleLog(showEntityScaleNotFoundConsoleLog: boolean | undefined) {
                world.setDynamicProperty("andexdbSettings:showEntityScaleNotFoundConsoleLog", showEntityScaleNotFoundConsoleLog ?? true);
            },
            get showEntityScaleFoundConsoleLog() {
                return Boolean(world.getDynamicProperty("andexdbSettings:showEntityScaleFoundConsoleLog") ?? true);
            },
            set showEntityScaleFoundConsoleLog(showEntityScaleFoundConsoleLog: boolean | undefined) {
                world.setDynamicProperty("andexdbSettings:showEntityScaleFoundConsoleLog", showEntityScaleFoundConsoleLog ?? true);
            },
            get showEntityScaleNotFoundChatLog() {
                return Boolean(world.getDynamicProperty("andexdbSettings:showEntityScaleNotFoundChatLog") ?? false);
            },
            set showEntityScaleNotFoundChatLog(showEntityScaleNotFoundChatLog: boolean | undefined) {
                world.setDynamicProperty("andexdbSettings:showEntityScaleNotFoundChatLog", showEntityScaleNotFoundChatLog ?? false);
            },
            get showEntityScaleFoundChatLog() {
                return Boolean(world.getDynamicProperty("andexdbSettings:showEntityScaleFoundChatLog") ?? false);
            },
            set showEntityScaleFoundChatLog(showEntityScaleFoundChatLog: boolean | undefined) {
                world.setDynamicProperty("andexdbSettings:showEntityScaleFoundChatLog", showEntityScaleFoundChatLog ?? false);
            },
            get showBlueModsAnticheatNotFoundConsoleLog() {
                return Boolean(world.getDynamicProperty("andexdbSettings:showBlueModsAnticheatNotFoundConsoleLog") ?? true);
            },
            set showBlueModsAnticheatNotFoundConsoleLog(showBlueModsAnticheatNotFoundConsoleLog: boolean | undefined) {
                world.setDynamicProperty("andexdbSettings:showBlueModsAnticheatNotFoundConsoleLog", showBlueModsAnticheatNotFoundConsoleLog ?? true);
            },
            get showBlueModsAnticheatFoundConsoleLog() {
                return Boolean(world.getDynamicProperty("andexdbSettings:showBlueModsAnticheatFoundConsoleLog") ?? true);
            },
            set showBlueModsAnticheatFoundConsoleLog(showBlueModsAnticheatFoundConsoleLog: boolean | undefined) {
                world.setDynamicProperty("andexdbSettings:showBlueModsAnticheatFoundConsoleLog", showBlueModsAnticheatFoundConsoleLog ?? true);
            },
            get showBlueModsAnticheatNotFoundChatLog() {
                return Boolean(world.getDynamicProperty("andexdbSettings:showBlueModsAnticheatNotFoundChatLog") ?? false);
            },
            set showBlueModsAnticheatNotFoundChatLog(showBlueModsAnticheatNotFoundChatLog: boolean | undefined) {
                world.setDynamicProperty("andexdbSettings:showBlueModsAnticheatNotFoundChatLog", showBlueModsAnticheatNotFoundChatLog ?? false);
            },
            get showBlueModsAnticheatFoundChatLog() {
                return Boolean(world.getDynamicProperty("andexdbSettings:showBlueModsAnticheatFoundChatLog") ?? false);
            },
            set showBlueModsAnticheatFoundChatLog(showBlueModsAnticheatFoundChatLog: boolean | undefined) {
                world.setDynamicProperty("andexdbSettings:showBlueModsAnticheatFoundChatLog", showBlueModsAnticheatFoundChatLog ?? false);
            },
            /**
             * Sets whether or not the add-on is allowed to connect to and communicate with the entity scale add-on.
             * @warning It is HIGHLY DISCOURAGED to disable this option.
             */
            get allowConnectingToEntityScale() {
                return Boolean(world.getDynamicProperty("andexdbSettings:allowConnectingToEntityScale") ?? true);
            },
            set allowConnectingToEntityScale(allowConnectingToEntityScale: boolean | undefined) {
                world.setDynamicProperty("andexdbSettings:allowConnectingToEntityScale", allowConnectingToEntityScale ?? true);
            },
            /**
             * Sets whether or not the add-on is allowed to connect to and communicate with the BlueMods Anticheat add-on.
             * @warning It is HIGHLY DISCOURAGED to disable this option.
             */
            get allowConnectingToBlueModsAnticheat() {
                return Boolean(world.getDynamicProperty("andexdbSettings:allowConnectingToBlueModsAnticheat") ?? true);
            },
            set allowConnectingToBlueModsAnticheat(allowConnectingToBlueModsAnticheat: boolean | undefined) {
                world.setDynamicProperty("andexdbSettings:allowConnectingToBlueModsAnticheat", allowConnectingToBlueModsAnticheat ?? true);
            },
        };
    }
    static reset() {
        // Object.entries(Object.getOwnPropertyDescriptors(this)).filter(v=>v[1].hasOwnProperty("get")).flatMap(v=>v[1].hasOwnProperty("set")?v[1]:v[1]["get"]())
    }
    static toJSON() {
        return Object.fromEntries(
            Object.getOwnPropertyNames(config)
                .filter((n) => !["constructor", "toString", "toLocaleString", "valueOf", "hasOwnProperty", "name", "prototype", "reset", "length"].includes(n))
                .map((n) => [n, config[n]])
        );
    }
}
Object.defineProperties(globalThis, {
    config: {
        value: config,
        configurable: true,
        enumerable: true,
        writable: false,
    },
});
