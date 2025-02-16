export declare const defaultPlayerMenuLeaderboardStatistics: [{
    readonly type: "built-in";
    readonly id: "money";
    readonly buttonDisplayName: "Money";
    readonly menuTitle: "Money";
    readonly statsListDisplayName: "Money";
    readonly valueType: "bigint";
    readonly getterFunction: (player: import("../../player_save/classes/savedPlayer").savedPlayer) => string;
    readonly sorter: (a: string, b: string) => 0 | 1 | -1;
    readonly displayOptions: {
        readonly prefixWithDollarSign: true;
        readonly addCommaSeparators: true;
    };
}];
