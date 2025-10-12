import type { GetBlocksStandingOnOptions, PlayerPermissionLevel } from "@minecraft/server";
import {
    Player,
    type Vector3,
    Dimension,
    type Vector2,
    Block,
    Entity,
    type RawMessage,
    EntityInventoryComponent,
    EntityEquippableComponent,
    PlayerCursorInventoryComponent,
    ItemStack,
    EquipmentSlot,
    ContainerSlot,
    type VectorYZ,
    type VectorXZ,
    EffectType,
    type EntityEffectOptions,
    type MusicOptions,
    type PlayerSoundOptions,
    GameMode,
    type DimensionLocation,
    MolangVariableMap,
    type EntityApplyDamageByProjectileOptions,
    type EntityApplyDamageOptions,
    type BlockRaycastOptions,
    type EntityComponentTypeMap,
    type BlockComponentTypeMap,
    type EntityRaycastOptions,
    type EntityQueryOptions,
    type PlayAnimationOptions,
    type TeleportOptions,
    InputInfo,
    type EntityComponentReturnType,
    GraphicsMode,
    CommandPermissionLevel,
} from "@minecraft/server";
import { MoneySystem } from "ExtraFeatures/money";
import { PlayerNotifications } from "init/classes/PlayerNotifications";
import { PlayerPermissions } from "init/classes/PlayerPermissions";
import { WorldEditSelection } from "init/classes/WorldEditSelection";
import "init/classes/config";
import { chatCommands } from "modules/commands/functions/chatCommands";
import { WorldPosition } from "modules/coordinates/classes/WorldPosition";
import { anglesToDirectionVectorDeg } from "modules/coordinates/functions/anglesToDirectionVectorDeg";
import { getChunkIndexD } from "modules/coordinates/functions/getChunkIndexD";
import type { RotationLocation } from "modules/coordinates/interfaces/RotationLocation";
import { deleteStringFromEntityDynamicProperties } from "modules/utilities/functions/deleteStringFromEntityDynamicProperties";
import { getStringFromEntityDynamicProperties } from "modules/utilities/functions/getStringFromEntityDynamicProperties";
import { saveStringToEntityDynamicProperties } from "modules/utilities/functions/saveStringToEntityDynamicProperties";

/**
 * Represents a player to be used for the `\execute` command without the `name` and `id` properties.
 */
export class executeCommandPlayerW implements Omit<Player, "name" | "id"> {
    player?: Player;
    sendErrorsTo?: Player | Console | Player[] | (() => Player | Player[] | Console) | null | undefined;
    modifiedlocation?: Vector3;
    modifieddimension?: Dimension;
    rotation?: Vector2;
    block?: Block;
    fromPlayer: boolean;
    fromEntity: boolean;
    isFromWorldPosition: boolean;
    fromPlayerWorldPosition: boolean;
    fromEntityWorldPosition: boolean;
    fromBlockWorldPosition: boolean;
    rawWorldPosition?: WorldPosition;
    raw?: any;

    constructor(player: Player | Entity | WorldPosition, sendErrorsTo?: Player | Console | null | number) {
        if (player instanceof WorldPosition) {
            this.modifiedlocation = player.location;
            this.modifieddimension = player.dimension;
            this.rotation = player.rotation;
            this.player = (player.entity ?? player.block) as any;
            this.sendErrorsTo =
                sendErrorsTo === null || Number.isNaN(sendErrorsTo as number)
                    ? null
                    : (sendErrorsTo as Player | Player[] | Console | (() => Player | Player[] | Console)) ??
                      (player.entity instanceof Player ? player.entity : console);
            this.block = player.block;
            this.isFromWorldPosition = true;
            this.fromPlayerWorldPosition = player.entity instanceof Player;
            this.fromEntityWorldPosition = !!player.entity;
            this.fromBlockWorldPosition = !!player.block;
            this.rawWorldPosition = player;
            this.fromPlayer = false;
            this.fromEntity = false;
            this.raw = player;
        } else if (player instanceof Entity) {
            this.player = player as Player;
            this.sendErrorsTo =
                sendErrorsTo === null || Number.isNaN(sendErrorsTo as number)
                    ? null
                    : (sendErrorsTo as Player | Player[] | Console | (() => Player | Player[] | Console)) ?? (player instanceof Player ? player : console);
            this.modifiedlocation = player.location;
            this.modifieddimension = player.dimension;
            this.rotation = player.getRotation();
            this.isFromWorldPosition = false;
            this.fromPlayerWorldPosition = false;
            this.fromEntityWorldPosition = false;
            this.fromBlockWorldPosition = false;
            this.fromPlayer = player instanceof Player;
            this.fromEntity = true;
            this.raw = player;
        } else {
            throw new TypeError(
                `Unsupported type ${JSON.stringify(
                    typeof player == "object"
                        ? (
                              tryget(() => (player as object)?.constructor) ?? {
                                  name: typeof player,
                              }
                          ).name
                        : typeof player
                )} passed into parameter [0]. `
            );
        }
    }
    toWorldPosition() {
        return new WorldPosition(this.location, this.getRotation(), this.dimension, this.player, this.block);
    }
    run(command: string) {
        chatCommands({
            returnBeforeChatSend: false,
            event: {
                cancel: false,
                message: command,
                sender: this.player as Player,
            },
            eventData: {
                cancel: false,
                message: command,
                sender: this.player as Player,
            },
            newMessage: command,
            player: this.player as Player,
        });
    }
    sendError(error: any, sendErrorAsIs: boolean = false, sendErrorsTo?: Player | Console | Player[] | (() => Player | Player[] | Console) | null | undefined) {
        const sest = sendErrorsTo ?? this.sendErrorsTo;
        if (!!sest) {
            if (sendErrorAsIs) {
                if (sest instanceof Player) {
                    sest.sendMessage(error as string);
                } else if (sest instanceof Array) {
                    sest.forEach((v) => {
                        if (v instanceof Player) {
                            v.sendMessage(error as string);
                        } else if ("warn" in (v as any as Console)) {
                            (v as any as Console).error(error);
                        }
                    });
                } else if ("warn" in (sest as any as Console)) {
                    (sest as any as Console).error(error);
                } else if (typeof sest == "function") {
                    this.sendError(error as string, true, sest());
                }
            } else {
                if (sest instanceof Player) {
                    sest.sendMessage(
                        typeof error == "string"
                            ? error
                            : "rawtext" in error
                            ? error
                            : typeof error == "object"
                            ? tryget(() => JSONStringify(error)) ?? tryget(() => JSON.stringify(error)) ?? String(error)
                            : String(error)
                    );
                } else if (sest instanceof Array) {
                    sest.forEach((v) => {
                        if (v instanceof Player) {
                            v.sendMessage(
                                typeof error == "string"
                                    ? error
                                    : "rawtext" in error
                                    ? error
                                    : typeof error == "object"
                                    ? tryget(() => JSONStringify(error)) ?? tryget(() => JSON.stringify(error)) ?? String(error)
                                    : String(error)
                            );
                        } else if ("warn" in (v as any as Console)) {
                            (v as any as Console).error(
                                typeof error == "string"
                                    ? error
                                    : "rawtext" in error
                                    ? error
                                    : error instanceof Array
                                    ? error
                                    : typeof error == "object"
                                    ? tryget(() => JSONStringify(error)) ?? tryget(() => JSON.stringify(error)) ?? String(error)
                                    : String(error)
                            );
                        }
                    });
                } else if ("warn" in (sest as any as Console)) {
                    (sest as any as Console).error(
                        typeof error == "string"
                            ? error
                            : "rawtext" in error
                            ? error
                            : error instanceof Array
                            ? error
                            : typeof error == "object"
                            ? tryget(() => JSONStringify(error)) ?? tryget(() => JSON.stringify(error)) ?? String(error)
                            : String(error)
                    );
                } else if (typeof sest == "function") {
                    this.sendError(error as string, true, sest());
                }
            }
        }
    }
    sendMessageB(
        message: string | RawMessage | (string | RawMessage)[],
        sendErrorsTo?: Player | Console | Player[] | (() => Player | Player[] | Console) | null | undefined
    ) {
        const sest = sendErrorsTo ?? this.sendErrorsTo;
        if (!!sest) {
            if (sest instanceof Player) {
                sest.sendMessage(message);
            } else if (sest instanceof Array) {
                sest.forEach((v) => {
                    if (v instanceof Player) {
                        v.sendMessage(message);
                    } else if ("warn" in (v as any as Console)) {
                        (v as any as Console).error(message);
                    }
                });
            } else if ("warn" in (sest as any as Console)) {
                (sest as any as Console).error(message);
            } else if (typeof sest == "function") {
                this.sendMessageB(message as string, sest());
            }
        }
    }
    get inventory(): EntityInventoryComponent {
        return this.getComponent("inventory")!;
    }
    get equippable(): EntityEquippableComponent {
        return this.getComponent("equippable")!;
    }
    get cursorInventory(): PlayerCursorInventoryComponent {
        return this.getComponent("cursor_inventory")!;
    }
    get heldItem(): ItemStack | undefined {
        return this.getComponent("equippable")?.getEquipment(EquipmentSlot.Mainhand);
    }
    get activeSlot(): ContainerSlot {
        return this.getComponent("equippable")?.getEquipmentSlot(EquipmentSlot.Mainhand)!;
    }
    /**
     * Returns an instance of the {@link MoneySystem} class that is associated with this entity.
     *
     * @author 8Crafter
     *
     * @throws {ReferenceError} If the executeCommandPlayerW instance does not have a linked player.
     */
    get moneySystem(): MoneySystem {
        if (!this.player)
            throw new ReferenceError(
                "[[executeCommandPlayerW.prototype.moneySystem::get]] This getter cannot be used when the executeCommandPlayerW instance does not have a linked player."
            );
        return MoneySystem.get(this.player.id);
    }
    /**
     * Returns an instance of the {@link PlayerNotifications} class that is associated with this entity.
     *
     * @author 8Crafter
     *
     * @throws {ReferenceError} If the executeCommandPlayerW instance does not have a linked player.
     */
    get playerNotifications(): PlayerNotifications {
        if (!this.player)
            throw new ReferenceError(
                "[[executeCommandPlayerW.prototype.playerNotifications::get]] This getter cannot be used when the executeCommandPlayerW instance does not have a linked player."
            );
        return new PlayerNotifications(this.player);
    }
    /**
     * Returns an instance of the {@link PlayerPermissions} class that is associated with this entity.
     *
     * @author 8Crafter
     *
     * @throws {ReferenceError} If the executeCommandPlayerW instance does not have a linked player.
     */
    get playerPermissions(): PlayerPermissions {
        if (!this.player)
            throw new ReferenceError(
                "[[executeCommandPlayerW.prototype.playerPermissions::get]] This getter cannot be used when the executeCommandPlayerW instance does not have a linked player."
            );
        return new PlayerPermissions(this.player);
    }
    /**
     * Returns an instance of the {@link WorldEditSelection} class that is associated with this entity.
     *
     * @author 8Crafter
     *
     * @throws {ReferenceError} If the executeCommandPlayerW instance does not have a linked player.
     */
    get worldEditSelection(): WorldEditSelection {
        if (!this.player)
            throw new ReferenceError(
                "[[executeCommandPlayerW.prototype.worldEditSelection::get]] This getter cannot be used when the executeCommandPlayerW instance does not have a linked player."
            );
        return new WorldEditSelection(this.player);
    }
    get dimensionLocation() {
        return Object.assign(this.location, { dimension: this.dimension });
    }
    get dimension() {
        return this.modifieddimension ?? this.player?.dimension!;
    }
    get location() {
        return this.modifiedlocation ?? this.player?.location!;
    }
    get locationstring(): `${number} ${number} ${number}` {
        return (this.x + " " + this.y + " " + this.z) as `${number} ${number} ${number}`;
    }
    get rotationstring(): `${number} ${number}` {
        return (this.rotx + " " + this.roty) as `${number} ${number}`;
    }
    get locationrotation(): RotationLocation {
        return {
            x: this.x,
            y: this.y,
            z: this.z,
            rotX: this.rotx,
            rotY: this.roty,
        };
    }
    get directionvector() {
        return anglesToDirectionVectorDeg(this.rotx, this.roty) as Vector3;
    }
    get xy(): Vector2 {
        return { x: this.x, y: this.y };
    }
    get yz(): VectorYZ {
        return { y: this.y, z: this.z };
    }
    get xz(): VectorXZ {
        return { x: this.x, z: this.z };
    }
    get chunkIndex(): VectorXZ {
        return getChunkIndexD(this.xz);
    }
    get x() {
        return this.modifiedlocation?.x ?? this.player?.location?.x!;
    }
    get y() {
        return this.modifiedlocation?.y ?? this.player?.location?.y!;
    }
    get z() {
        return this.modifiedlocation?.z ?? this.player?.location?.z!;
    }
    get rotx() {
        return this.rotation?.x ?? this.player?.getRotation?.()?.x!;
    }
    get roty() {
        return this.rotation?.y ?? this.player?.getRotation?.()?.y!;
    }
    get timeZone(): number {
        return this.getDynamicProperty("andexdbPersonalSettings:timeZone")?.toString().toNumber() ?? config.system.timeZone;
    }
    set timeZone(timezone: number | string | boolean | null | undefined) {
        this.setDynamicProperty("andexdbPersonalSettings:timeZone", !!timezone ? timezone.toString() : undefined);
    }
    get camera() {
        return this.player?.camera!;
    }
    get isEmoting() {
        return this.player?.isEmoting!;
    }
    get isFlying() {
        return this.player?.isFlying!;
    }
    get isGliding() {
        return this.player?.isGliding!;
    }
    get isJumping() {
        return this.player?.isJumping!;
    }
    get isClimbing() {
        return this.player?.isClimbing!;
    }
    get isFalling() {
        return this.player?.isFalling!;
    }
    get isInWater() {
        return this.player?.isInWater!;
    }
    get isOnGround() {
        return this.player?.isOnGround!;
    }
    get isSleeping() {
        return this.player?.isSleeping!;
    }
    get isSprinting() {
        return this.player?.isSprinting!;
    }
    get isSwimming() {
        return this.player?.isSwimming!;
    }
    //get fallDistance(){return this.player?.fallDistance} Removed in 1.21.20 sadly. >:(
    get scoreboardIdentity() {
        return this.player?.scoreboardIdentity;
    }
    //get lifetimeState(){return this.player?.lifetimeState} Removed in 1.21.20 sadly. >:(
    get level() {
        return this.player?.level!;
    }
    get onScreenDisplay() {
        return this.player?.onScreenDisplay!;
    }
    /**
     * @remarks
     * This property can't be edited in read-only mode.
     *
     * @throws {ReferenceError} If the executeCommandPlayerW instance does not have a linked player when using the setter.
     */
    get selectedSlotIndex() {
        return this.player?.selectedSlotIndex!;
    }
    set selectedSlotIndex(slotNumber: number) {
        if (!this.player)
            throw new ReferenceError(
                "[[executeCommandPlayerW.prototype.selectedSlotIndex::set]] This setter cannot be used when the executeCommandPlayerW instance does not have a linked player."
            );
        this.player.selectedSlotIndex = slotNumber;
    }
    get totalXpNeededForNextLevel() {
        return this.player?.totalXpNeededForNextLevel!;
    }
    get xpEarnedAtCurrentLevel() {
        return this.player?.xpEarnedAtCurrentLevel!;
    }
    /**
     * @remarks
     * Whether the entity is sneaking - that is, moving more slowly
     * and more quietly.
     *
     * This property can't be edited in read-only mode.
     *
     * @throws {ReferenceError} If the executeCommandPlayerW instance does not have a linked player when using the setter.
     */
    get isSneaking() {
        return this.player?.isSneaking!;
    }
    set isSneaking(isSneaking: boolean) {
        if (!this.player)
            throw new ReferenceError(
                "[[executeCommandPlayerW.prototype.isSneaking::set]] This setter cannot be used when the executeCommandPlayerW instance does not have a linked player."
            );
        this.player.isSneaking = isSneaking;
    }
    get typeId() {
        return this.player?.typeId!;
    }
    get nameTag() {
        return this.player?.nameTag!;
    }
    set nameTag(nameTag: string) {
        if (!this.player)
            throw new ReferenceError(
                "[[executeCommandPlayerW.prototype.nameTag::set]] This setter cannot be used when the executeCommandPlayerW instance does not have a linked player."
            );
        this.player.nameTag = nameTag;
    }
    get inputPermissions() {
        return this.player?.inputPermissions!;
    }
    get clientSystemInfo() {
        return this.player?.clientSystemInfo!;
    }
    get inputInfo() {
        return this.player?.inputInfo!;
    }
    /**
     * @beta
     * @remarks
     * Gets the current graphics mode of the player's client. This
     * can be changed in the Video section of the settings menu
     * based on what hardware is available.
     *
     * This property can return undefined if the {@link executeCommandPlayerW} instance does not have a linked player.
     *
     * @throws This property can throw when used.
     *
     * {@link InvalidEntityError}
     */
    get graphicsMode(): GraphicsMode {
        return this.player?.graphicsMode!;
    }
    get isValid() {
        return this.player?.isValid!;
    }
    get localizationKey() {
        return this.player?.localizationKey!;
    }
    get commandPermissionLevel(): CommandPermissionLevel {
        return this.player?.commandPermissionLevel!;
    }
    get playerPermissionLevel(): PlayerPermissionLevel {
        return this.player?.playerPermissionLevel!;
    }
    get target(): Entity | undefined {
        return this.player?.target;
    }
    addEffect(effectType: string | EffectType, duration: number, options?: EntityEffectOptions) {
        return this.player?.addEffect(effectType, duration, options);
    }
    addExperience(amount: number) {
        return this.player?.addExperience(amount)!;
    }
    getRotation() {
        return this.rotation ?? this.player?.getRotation()!;
    }
    getViewDirection() {
        return !!this.rotation ? anglesToDirectionVectorDeg(this.rotation.x, this.rotation.y) : this.player?.getViewDirection()!;
    }
    addLevels(amount: number) {
        return this.player?.addLevels(amount)!;
    }
    eatItem(itemStack: ItemStack) {
        return this.player?.eatItem(itemStack);
    }
    getGameMode() {
        return this.player?.getGameMode()!;
    }
    getItemCooldown(itemCategory: string) {
        return this.player?.getItemCooldown(itemCategory)!;
    }
    getSpawnPoint() {
        return this.player?.getSpawnPoint()!;
    }
    getTotalXp() {
        return this.player?.getTotalXp()!;
    } /* 
    isOp() {
        return this.player?.isOp()!;
    } */
    lookAt(targetLocation: Vector3) {
        return this.player?.lookAt(targetLocation);
    }
    playMusic(trackId: string, musicOptions?: MusicOptions) {
        return this.player?.playMusic(trackId, musicOptions);
    }
    playSound(soundId: string, soundOptions?: PlayerSoundOptions) {
        return this.player?.playSound(soundId, soundOptions);
    }
    postClientMessage(id: string, value: string) {
        return this.player?.postClientMessage(id, value);
    }
    queueMusic(trackId: string, musicOptions?: MusicOptions) {
        return this.player?.queueMusic(trackId, musicOptions);
    }
    resetLevel() {
        return this.player?.resetLevel()!;
    }
    sendMessage(message: string | RawMessage | (string | RawMessage)[]) {
        return this.player?.sendMessage(message);
    }
    setGameMode(gameMode?: GameMode | number) {
        return this.player?.setGameMode(gameMode);
    } /* 
    setOp(isOp: boolean) {
        return this.player?.setOp(isOp);
    } */
    setSpawnPoint(spawnPoint?: DimensionLocation) {
        return this.player?.setSpawnPoint(spawnPoint);
    }
    spawnParticle(effectName: string, location: Vector3, molangVariables?: MolangVariableMap) {
        return this.player?.spawnParticle(effectName, location, molangVariables);
    }
    startItemCooldown(itemCategory: string, tickDuration: number) {
        return this.player?.startItemCooldown(itemCategory, tickDuration);
    }
    stopMusic() {
        return this.player?.stopMusic()!;
    }
    addTag(tag: string) {
        return this.player?.addTag(tag)!;
    }
    applyDamage(amount: number, options?: EntityApplyDamageByProjectileOptions | EntityApplyDamageOptions) {
        return this.player?.applyDamage(amount, options)!;
    }
    applyImpulse(vector: Vector3): void {
        return this.player?.applyImpulse(vector);
    }
    applyKnockback(horizontalForce: VectorXZ, verticalStrength: number) {
        return this.player?.applyKnockback(horizontalForce, verticalStrength);
    }
    clearDynamicProperties() {
        return this.player?.clearDynamicProperties()!;
    }
    clearVelocity() {
        return this.player?.clearVelocity()!;
    }
    extinguishFire(useEffects?: boolean) {
        return this.player?.extinguishFire(useEffects)!;
    }
    getAimAssist() {
        return this.player?.getAimAssist()!;
    }
    getBlockFromViewDirection(options?: BlockRaycastOptions) {
        return this.player?.getBlockFromViewDirection(options);
    }
    getComponent<T extends keyof EntityComponentTypeMap>(componentId: T): EntityComponentTypeMap[T] | undefined;
    getComponent<T extends keyof BlockComponentTypeMap>(componentId: T): BlockComponentTypeMap[T] | undefined;
    getComponent<T extends string>(componentId: T): EntityComponentReturnType<T> | undefined;
    getComponent<T extends keyof EntityComponentTypeMap | keyof BlockComponentTypeMap>(
        componentId: T
    ): T extends keyof EntityComponentTypeMap
        ? EntityComponentTypeMap[T] | undefined
        : T extends keyof BlockComponentTypeMap
        ? BlockComponentTypeMap[T] | undefined
        : undefined {
        return (tryget(() => this.player?.getComponent(componentId as keyof EntityComponentTypeMap)) ??
            tryget(() => this.block?.getComponent(componentId as keyof BlockComponentTypeMap))) as T extends keyof EntityComponentTypeMap
            ? EntityComponentTypeMap[T] | undefined
            : T extends keyof BlockComponentTypeMap
            ? BlockComponentTypeMap[T] | undefined
            : undefined;
    }
    getComponents() {
        return this.player?.getComponents()!;
    }
    getDynamicProperty(identifier: string) {
        return this.player?.getDynamicProperty(identifier);
    }
    getDynamicPropertyIds() {
        return this.player?.getDynamicPropertyIds()!;
    }
    getDynamicPropertyTotalByteCount() {
        return this.player?.getDynamicPropertyTotalByteCount()!;
    }
    getEffect(effectType: string | EffectType) {
        return this.player?.getEffect(effectType);
    }
    getEffects() {
        return this.player?.getEffects()!;
    }
    getEntitiesFromViewDirection(options?: EntityRaycastOptions) {
        return this.player?.getEntitiesFromViewDirection(options)!;
    }
    getHeadLocation() {
        return this.player?.getHeadLocation()!;
    }
    getProperty(identifier: string) {
        return this.player?.getProperty(identifier);
    }
    getTags() {
        return this.player?.getTags()!;
    }
    getVelocity() {
        return this.player?.getVelocity()!;
    }
    hasComponent(componentId: string) {
        return this.player?.hasComponent(componentId)!;
    }
    hasTag(tag: string) {
        return this.player?.hasTag(tag)!;
    }
    kill() {
        return this.player?.kill()!;
    }
    matches(options: EntityQueryOptions) {
        return this.player?.matches(options)!;
    }
    playAnimation(animationName: string, options?: PlayAnimationOptions) {
        return this.player?.playAnimation(animationName, options);
    }
    remove() {
        return this.player?.remove()!;
    }
    removeEffect(effectType: string | EffectType) {
        return this.player?.removeEffect(effectType)!;
    }
    removeTag(tag: string) {
        return this.player?.removeTag(tag)!;
    }
    resetProperty(identifier: string) {
        return this.player?.resetProperty(identifier)!;
    }
    runCommand(commandString: string) {
        return this.player?.runCommand(commandString)!;
    }
    setDynamicProperty(identifier: string, value?: string | number | boolean | Vector3) {
        return this.player?.setDynamicProperty(identifier, value);
    }
    setDynamicProperties(values: Record<string, boolean | number | string | Vector3>) {
        return this.player?.setDynamicProperties(values);
    }
    setOnFire(seconds: number, useEffects?: boolean) {
        return this.player?.setOnFire(seconds, useEffects)!;
    }
    setProperty(identifier: string, value: string | number | boolean) {
        return this.player?.setProperty(identifier, value);
    }
    setRotation(rotation: Vector2) {
        return this.player?.setRotation(rotation);
    }
    teleport(location: Vector3, teleportOptions?: TeleportOptions) {
        return this.player?.teleport(location, teleportOptions);
    }
    triggerEvent(eventName: string) {
        return this.player?.triggerEvent(eventName);
    }
    tryTeleport(location: Vector3, teleportOptions?: TeleportOptions) {
        return this.player?.tryTeleport(location, teleportOptions)!;
    }
    setPropertyOverrideForEntity(targetEntity: Entity, identifier: string, value: boolean | number | string) {
        return this.player?.setPropertyOverrideForEntity(targetEntity, identifier, value);
    }
    removePropertyOverrideForEntity(targetEntity: Entity, identifier: string) {
        return this.player?.removePropertyOverrideForEntity(targetEntity, identifier);
    }
    clearPropertyOverridesForEntity(targetEntity: Entity) {
        return this.player?.clearPropertyOverridesForEntity(targetEntity);
    }
    stopSound(soundId: string): void {
        return this.player?.stopSound(soundId)!;
    }
    stopAllSounds(): void {
        return this.player?.stopAllSounds()!;
    }
    getAllBlocksStandingOn(options?: GetBlocksStandingOnOptions): Block[] {
        return this.player?.getAllBlocksStandingOn(options)!;
    }
    getBlockStandingOn(options?: GetBlocksStandingOnOptions): Block | undefined {
        return this.player?.getBlockStandingOn(options);
    }
    saveStringToDynamicProperties(string: string, propertyName: string, clearOldProperties: boolean = true, chunkSize: number | bigint = 32760): void {
        saveStringToEntityDynamicProperties(this.player as Entity, string, propertyName, clearOldProperties, chunkSize);
    }
    getStringFromDynamicProperties(propertyName: string, zeroLengthPlaceholder: string = ""): string {
        return getStringFromEntityDynamicProperties(this.player as Entity, propertyName, zeroLengthPlaceholder);
    }
    deleteStringFromDynamicProperties(propertyName: string): void {
        deleteStringFromEntityDynamicProperties(this.player as Entity, propertyName);
    }
}
