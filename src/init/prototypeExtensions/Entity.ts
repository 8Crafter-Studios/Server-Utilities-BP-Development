import { Entity, EntityInventoryComponent, EntityEquippableComponent, PlayerCursorInventoryComponent, ItemStack, EquipmentSlot, ContainerSlot, type Vector2, type VectorYZ, type VectorXZ, type Vector3 } from "@minecraft/server";
import { MoneySystem } from "ExtraFeatures/money";
import type { RotationLocation } from "modules/coordinates/interfaces/RotationLocation";
import type { PlayerNotifications } from "init/classes/PlayerNotifications";
import { anglesToDirectionVectorDeg } from "modules/coordinates/functions/anglesToDirectionVectorDeg";
import { getChunkIndexD } from "modules/coordinates/functions/getChunkIndexD";
import type { PlayerPermissions } from "init/classes/PlayerPermissions";
import type { WorldEditSelection } from "init/classes/WorldEditSelection";
import { saveStringToEntityDynamicProperties } from "modules/utilities/functions/saveStringToEntityDynamicProperties";
import { getStringFromEntityDynamicProperties } from "modules/utilities/functions/getStringFromEntityDynamicProperties";

Object.defineProperties(Entity.prototype, {
    inventory: {
        get: function inventory(): EntityInventoryComponent | undefined {
            return (this as Entity).getComponent("inventory");
        },
        configurable: true,
        enumerable: true,
    },
    equippable: {
        get: function equippable(): EntityEquippableComponent | undefined {
            return (this as Entity).getComponent("equippable");
        },
        configurable: true,
        enumerable: true,
    },
    cursorInventory: {
        get: function cursorInventory():
            | PlayerCursorInventoryComponent
            | undefined {
            return (this as Entity).getComponent("cursor_inventory");
        },
        configurable: true,
        enumerable: true,
    },
    heldItem: {
        get: function heldItem(): ItemStack | undefined {
            if (!!!(this as Entity).getComponent("equippable")) {
                return undefined;
            } else {
                return (this as Entity)
                    .getComponent("equippable")
                    .getEquipment(EquipmentSlot.Mainhand);
            }
        },
        configurable: true,
        enumerable: true,
    },
    activeSlot: {
        get: function activeSlot(): ContainerSlot | undefined {
            if (!!!(this as Entity).getComponent("equippable")) {
                return undefined;
            } else {
                return (this as Entity)
                    .getComponent("equippable")
                    .getEquipmentSlot(EquipmentSlot.Mainhand);
            }
        },
        configurable: true,
        enumerable: true,
    },
    moneySystem: {
        get: function moneySystem(): MoneySystem {
            return MoneySystem.get(this as Entity);
        },
        configurable: true,
        enumerable: true,
    },
    dimensionLocation: {
        get: function dimensionLocation() {
            return {
                x: this.x,
                y: this.y,
                z: this.z,
                dimension: this.dimension,
            };
        },
        configurable: true,
        enumerable: true,
    },
    locationstring: {
        get: function locationstring() {
            return this.x + " " + this.y + " " + this.z;
        },
        configurable: true,
        enumerable: true,
    },
    rotationstring: {
        get: function rotationstring() {
            return this.rotx + " " + this.roty;
        },
        configurable: true,
        enumerable: true,
    },
    locationrotation: {
        get: function locationrotation(): RotationLocation {
            return {
                x: this.x,
                y: this.y,
                z: this.z,
                rotX: this.rotx,
                rotY: this.roty,
            };
        },
        configurable: true,
        enumerable: true,
    },
    xy: {
        get: function xy(): Vector2 {
            return { x: this.x, y: this.y };
        },
        configurable: true,
        enumerable: true,
    },
    yz: {
        get: function yz(): VectorYZ {
            return { y: this.y, z: this.z };
        },
        configurable: true,
        enumerable: true,
    },
    xz: {
        get: function xz(): VectorXZ {
            return { x: this.x, z: this.z };
        },
        configurable: true,
        enumerable: true,
    },
    x: {
        get: function x() {
            return this.location.x;
        },
        configurable: true,
        enumerable: true,
    },
    y: {
        get: function y() {
            return this.location.y;
        },
        configurable: true,
        enumerable: true,
    },
    z: {
        get: function z() {
            return this.location.z;
        },
        configurable: true,
        enumerable: true,
    },
    rotx: {
        get: function rotx() {
            return this.getRotation().x;
        },
        configurable: true,
        enumerable: true,
    },
    roty: {
        get: function roty() {
            return this.getRotation().y;
        },
        configurable: true,
        enumerable: true,
    },
    timeZone: {
        get: function timeZone() {
            return (
                this.getDynamicProperty("andexdbPersonalSettings:timeZone") ??
                config.system.timeZone
            )
                .toString()
                .toNumber();
        },
        set: function timeZone(
            timezone: number | string | boolean | null | undefined
        ) {
            this.setDynamicProperty(
                "andexdbPersonalSettings:timeZone",
                !!timezone ? timezone.toString() : undefined
            );
        },
        configurable: true,
        enumerable: true,
    },
    directionvector: {
        get: function directionvector() {
            return anglesToDirectionVectorDeg(this.rotx, this.roty) as Vector3;
        },
        configurable: true,
        enumerable: true,
    },
    chunkIndex: {
        get: function chunkIndex(): VectorXZ {
            return getChunkIndexD(this.xz);
        },
        configurable: true,
        enumerable: true,
    },
    saveStringToDynamicProperties: {
        value: function saveStringToDynamicProperties(string: string, propertyName: string, clearOldProperties: boolean = true, chunkSize: number | bigint = 32760): void {return saveStringToEntityDynamicProperties(this as Entity, string, propertyName, clearOldProperties, chunkSize)},
        configurable: false,
        enumerable: true,
        writable: true,
    },
    getStringFromDynamicProperties: {
        value: function getStringFromDynamicProperties(propertyName: string, zeroLengthPlaceholder: string = ""): string {return getStringFromEntityDynamicProperties(this as Entity, propertyName, zeroLengthPlaceholder)},
        configurable: false,
        enumerable: true,
        writable: true,
    },
});
export const exports_5603749806156139082470132985463298047098135609812364098 =
    undefined;
declare module "@minecraft/server" {
    interface Entity {
        /*
        id: `${number}`*/
        /**
         * Defines this entity's inventory properties.
         */
        get inventory(): EntityInventoryComponent | undefined;
        /**
         * Provides access to a mob's equipment slots. This component
         * exists for all mob entities.
         * @example givePlayerElytra.ts
         * ```typescript
         * // Gives the player Elytra
         * import { EquipmentSlot, ItemStack, Player, EntityComponentTypes } from '@minecraft/server';
         * import { MinecraftItemTypes } from '@minecraft/vanilla-data';
         *
         * function giveEquipment(player: Player) {
         *     const equipmentCompPlayer = player.getComponent(EntityComponentTypes.Equippable);
         *     if (equipmentCompPlayer) {
         *         equipmentCompPlayer.setEquipment(EquipmentSlot.Chest, new ItemStack(MinecraftItemTypes.Elytra));
         *     }
         * }
         * ```
         * @example givePlayerEquipment.ts
         * ```typescript
         * // Gives the player some equipment
         * import { EquipmentSlot, ItemStack, Player, EntityComponentTypes } from '@minecraft/server';
         * import { MinecraftItemTypes } from '@minecraft/vanilla-data';
         *
         * function giveEquipment(player: Player) {
         *     const equipmentCompPlayer = player.getComponent(EntityComponentTypes.Equippable);
         *     if (equipmentCompPlayer) {
         *         equipmentCompPlayer.setEquipment(EquipmentSlot.Head, new ItemStack(MinecraftItemTypes.GoldenHelmet));
         *         equipmentCompPlayer.setEquipment(EquipmentSlot.Chest, new ItemStack(MinecraftItemTypes.IronChestplate));
         *         equipmentCompPlayer.setEquipment(EquipmentSlot.Legs, new ItemStack(MinecraftItemTypes.DiamondLeggings));
         *         equipmentCompPlayer.setEquipment(EquipmentSlot.Feet, new ItemStack(MinecraftItemTypes.NetheriteBoots));
         *         equipmentCompPlayer.setEquipment(EquipmentSlot.Mainhand, new ItemStack(MinecraftItemTypes.WoodenSword));
         *         equipmentCompPlayer.setEquipment(EquipmentSlot.Offhand, new ItemStack(MinecraftItemTypes.Shield));
         *     } else {
         *         console.warn('No equipment component found on player');
         *     }
         * }
         * ```
         */
        get equippable(): EntityEquippableComponent | undefined;
        /**
         * Represents the players cursor inventory. Used when moving
         * items between between containers in the inventory UI. Not
         * used with touch controls.
         *
         * Only works on players, on non-players it will return undefined.
         *
         * This returns the same value as `Entity.prototype.getComponent("cursor_inventory")`.
         */
        get cursorInventory(): PlayerCursorInventoryComponent | undefined;
        get heldItem(): ItemStack | undefined;
        get activeSlot(): ContainerSlot | undefined;
        get moneySystem(): MoneySystem;
        get playerNotifications(): PlayerNotifications;
        get playerPermissions(): PlayerPermissions;
        get worldEditSelection(): WorldEditSelection;
        get dimensionLocation(): DimensionLocation;
        get locationstring(): `${number} ${number} ${number}`;
        get rotationstring(): `${number} ${number}`;
        get locationrotation(): RotationLocation;
        get directionvector(): Vector3;
        get xy(): Vector2;
        get yz(): VectorYZ;
        get xz(): VectorXZ;
        get chunkIndex(): VectorXZ;
        get x(): number;
        get y(): number;
        get z(): number;
        get rotx(): number;
        get roty(): number;
        get timeZone(): number;
        set timeZone(timezone: number | string | boolean | null | undefined);
        /**
         * Saves a string to an entity's dynamic properties, optionally clearing old properties first.
         *
         * @param {string} string - The string to save to the entity's dynamic properties.
         * @param {string} propertyName - The base name of the dynamic property where the string will be saved.
         * @param {boolean} clearOldProperties - Whether to clear old properties before saving the new string. Defaults to `true`.
         * @param {number | bigint} chunkSize - The size of each chunk of the string to save. Defaults to `32760`.
         *
         * @throws {TypeError} If `propertyName` is not a string.
         * @throws {TypeError} If `clearOldProperties` is not a boolean.
         */
        saveStringToDynamicProperties(string: string, propertyName: string, clearOldProperties?: boolean, chunkSize?: number | bigint): void
        /**
         * Retrieves a concatenated string from an entity's dynamic properties.
         *
         * @param {string} propertyName - The base name of the dynamic property to retrieve.
         * @param {string} zeroLengthPlaceholder - A placeholder string to return if the dynamic property length is zero. Defaults to an empty string.
         * @returns {string} The concatenated string from the entity's dynamic properties, or the zeroLengthPlaceholder if the length is zero.
         * @throws {TypeError} If the propertyName is not a string.
         */
        getStringFromDynamicProperties(propertyName: string, zeroLengthPlaceholder?: string): string
    }
}