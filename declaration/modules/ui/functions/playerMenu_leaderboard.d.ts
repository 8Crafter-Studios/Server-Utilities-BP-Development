import { Entity, Player } from "@minecraft/server";
import { executeCommandPlayerW } from "modules/commands/classes/executeCommandPlayerW";
import type { playerMenuLeaderboardStatistic } from "../types/playerMenuLeaderboardStatistic";
export declare function playerMenu_leaderboard(sourceEntitya: Entity | executeCommandPlayerW | Player, leaderboard: playerMenuLeaderboardStatistic<any>, pagen?: number, maxplayersperpage?: number, search?: {
    value: string;
    caseSensitive?: boolean;
}): Promise<0 | 1>;
