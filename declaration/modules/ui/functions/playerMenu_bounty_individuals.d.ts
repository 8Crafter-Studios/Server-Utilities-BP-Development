import { Entity, Player } from "@minecraft/server";
import { executeCommandPlayerW } from "modules/commands/classes/executeCommandPlayerW";
import { savedPlayer } from "modules/player_save/classes/savedPlayer";
import { TotalBounty } from "modules/main/classes/Bounty";
export declare function playerMenu_bounty_individuals(sourceEntitya: Entity | executeCommandPlayerW | Player, totalBounty: TotalBounty, targetPlayer?: savedPlayer, pagen?: number, maxplayersperpage?: number, search?: {
    value: string;
    caseSensitive?: boolean;
}): Promise<0 | 1>;
