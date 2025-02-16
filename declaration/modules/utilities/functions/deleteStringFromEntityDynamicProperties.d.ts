import type { Entity } from "@minecraft/server";
/**
 * Deletes a string from dynamic properties.
 *
 * @param {Entity} entity - The entity from which the string will be deleted.
 * @param {string} propertyName - The name of the property to save the string under.
 *
 * @throws {TypeError} If `propertyName` is not a string.
 */
export declare function deleteStringFromEntityDynamicProperties(entity: Entity, propertyName: string): void;
