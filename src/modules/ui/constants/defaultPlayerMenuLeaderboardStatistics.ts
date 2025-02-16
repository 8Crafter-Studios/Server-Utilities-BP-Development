import { MoneySystem } from "ExtraFeatures/money";
import type { playerMenuLeaderboardStatistic } from "../types/playerMenuLeaderboardStatistic";

export const defaultPlayerMenuLeaderboardStatistics = [
    {
        type: "built-in",
        id: "money",
        buttonDisplayName: "Money",
        menuTitle: "Money",
        statsListDisplayName: "Money",
        valueType: "bigint",
        getterFunction: (player) => {
            return tryget(() => new MoneySystem(player.id as any).money.toString()) ?? undefined;
        },
        sorter: (a, b) => (a > b ? -1 : a < b ? 1 : 0),
        displayOptions: {
            prefixWithDollarSign: true,
            addCommaSeparators: true,
        },
    },
] as const satisfies playerMenuLeaderboardStatistic<"built-in">[];
