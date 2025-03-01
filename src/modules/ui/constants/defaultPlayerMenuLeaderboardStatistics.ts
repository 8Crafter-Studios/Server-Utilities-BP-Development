import { MoneySystem } from "ExtraFeatures/money";
import type { playerMenuLeaderboardStatistic } from "../types/playerMenuLeaderboardStatistic";

export const defaultPlayerMenuLeaderboardStatistics = [
    {
        type: "built-in",
        id: "money",
        buttonDisplayName: "Money",
        buttonIcon: "textures/items/emerald",
        menuTitle: "Money",
        statsListDisplayName: "Money",
        valueType: "bigint",
        getterFunction: (player) => {
            return tryget(() => new MoneySystem(player.id as any).money.toString()) ?? undefined;
        },
        sorter: (a, b) => (BigInt(a) > BigInt(b) ? -1 : BigInt(a) < BigInt(b) ? 1 : 0),
        displayOptions: {
            get currencyPrefix(){
                return config.ui.menus.playerMenu_leaderboards.builtInStats.money.displayOptions.currencyPrefix;
            },
            get addCommaSeparators(){
                return config.ui.menus.playerMenu_leaderboards.builtInStats.money.displayOptions.addCommaSeparators;
            },
        },
    },
] as const satisfies playerMenuLeaderboardStatistic<"built-in">[];
