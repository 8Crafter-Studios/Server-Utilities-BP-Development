import { Entity, Player } from "@minecraft/server";
import { executeCommandPlayerW } from "modules/commands/classes/executeCommandPlayerW";
/**
 * @description Opens the player menu.
 * @param {Entity | executeCommandPlayerW | Player} sourceEntitya - The entity which should open the player menu.
 * @returns {Promise<0>} A promise which resolves to 0 once the player menu has been closed.
 * @throws TypeError - If the type of sourceEntitya is not an instance of the Player class, or an instance of the executeCommandPlayerW class with a Player linked to it.
 */
export declare function playerMenu(sourceEntitya: Entity | executeCommandPlayerW | Player): Promise<0>;
