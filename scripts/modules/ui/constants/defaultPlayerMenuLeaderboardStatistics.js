import { MoneySystem } from "ExtraFeatures/money";
export const defaultPlayerMenuLeaderboardStatistics = [
    {
        type: "built-in",
        id: "money",
        buttonDisplayName: "Money",
        menuTitle: "Money",
        statsListDisplayName: "Money",
        valueType: "bigint",
        getterFunction: (player) => {
            return tryget(() => new MoneySystem(player.id).money.toString()) ?? undefined;
        },
        sorter: (a, b) => (a > b ? -1 : a < b ? 1 : 0),
        displayOptions: {
            prefixWithDollarSign: true,
            addCommaSeparators: true,
        },
    },
];
//# sourceMappingURL=defaultPlayerMenuLeaderboardStatistics.js.map