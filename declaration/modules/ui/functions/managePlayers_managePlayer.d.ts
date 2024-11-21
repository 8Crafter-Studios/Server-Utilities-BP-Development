import { Entity } from "@minecraft/server";
import type { savedPlayer } from "../../../Main/player_save";
/**
 *
 * @todo Split each of the cases in the switch function into separate functions.
 * @param sourceEntity
 * @param player
 * @returns
 */
export declare function managePlayers_managePlayer(sourceEntity: Entity, player: savedPlayer): Promise<0 | 1>;
