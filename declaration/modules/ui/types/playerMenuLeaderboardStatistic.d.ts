import type { ObjectiveSortOrder } from "@minecraft/server";
import type { savedPlayer } from "modules/player_save/classes/savedPlayer";
export type playerMenuLeaderboardStatistic<T extends "built-in" | "custom" | "customAdvanced"> = {
    id: string;
    buttonDisplayName: string;
    buttonIcon?: string;
    menuTitle: string;
    statsListDisplayName: string;
    valueType: T extends "custom" ? "bigint" : "string" | "number" | "bigint";
    displayOptions: {
        /**
         * @todo Make this do something.
         */
        valueDisplayTransformer_statsList?: (value: string) => string;
        /**
         * @todo Make this do something.
         */
        valueDisplayTransformer_button?: (value: string) => string;
        /**
         * @todo Make this do something.
         */
        addCommaSeparators?: boolean;
        /**
         * @todo Make this do something.
         */
        prefixWithDollarSign?: boolean;
        /**
         * @todo Make this do something.
         */
        toFixed?: number;
        /**
         * @todo Make this do something.
         */
        valueDisplayColor?: string;
    };
} & (T extends "built-in" ? {
    type: "built-in";
    /**
     * The function that gets the score for a savedPlayer instance for this leaderboard statistic.
     * @param player The savedPlayer instance for the player to get the score for.
     * @returns A string representing the value of the player's score, or undefined, which will exclude the player from the scoreboard.
     */
    getterFunction: (player: savedPlayer) => string | undefined;
    sorter: (a: string, b: string) => number;
} : T extends "custom" ? {
    type: "custom";
    scoreboardObjective: string;
    sorter: ObjectiveSortOrder;
} : {
    type: "customAdvanced";
    sortType: "function";
    /**
     * The function that gets the score for a savedPlayer instance for this leaderboard statistic.
     * @param player The savedPlayer instance for the player to get the score for.
     * @returns A string representing the value of the player's score, or undefined, which will exclude the player from the scoreboard.
     */
    getterFunction: (player: savedPlayer) => string;
    sorter: (a: string, b: string) => number;
} | {
    type: "customAdvanced";
    sortType: "order";
    /**
     * The function that gets the score for a savedPlayer instance for this leaderboard statistic.
     * @param player The savedPlayer instance for the player to get the score for.
     * @returns A string representing the value of the player's score, or undefined, which will exclude the player from the scoreboard.
     */
    getterFunction: (player: savedPlayer) => string;
    sorter: ObjectiveSortOrder;
});
