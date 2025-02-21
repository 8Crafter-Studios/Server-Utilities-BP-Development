import { StructureSaveMode, type DimensionLocation, Dimension } from "@minecraft/server";
import type { Warp } from "modules/coordinates/interfaces/Warp";
import { menuButtonIds } from "modules/ui/constants/menuButtonIds";
import type { playerMenuLeaderboardStatistic } from "modules/ui/types/playerMenuLeaderboardStatistic";
/**
 * A class containing the configuration information for the add-on.
 */
export declare class config {
    static get chatCommandsEnabled(): boolean;
    static set chatCommandsEnabled(enabled: boolean | undefined);
    static get chatCommandPrefix(): string;
    static set chatCommandPrefix(prefix: string | undefined);
    static get validChatCommandPrefixes(): string;
    static set validChatCommandPrefixes(prefixes: string | undefined);
    static get invalidChatCommandAction(): number;
    static set invalidChatCommandAction(invalidChatCommandAction: number | undefined);
    static get undoClipboardMode(): StructureSaveMode;
    static set undoClipboardMode(undoClipboardMode: StructureSaveMode | undefined);
    static get spawnCommandLocation(): DimensionLocation | {
        x: null;
        y: null;
        z: null;
        dimension: Dimension;
    };
    static set spawnCommandLocation(spawnCommandLocation: DimensionLocation | {
        x: null;
        y: null;
        z: null;
        dimension: Dimension;
    } | undefined);
    /**
     * Whether or not players can teleport to spawn using the `\spawn` command when they are in a different dimension than the spawn.
     *
     * Defaults to true.
     */
    static get spawnCommandAllowCrossDimensionalTeleport(): boolean;
    static set spawnCommandAllowCrossDimensionalTeleport(enabled: boolean | undefined);
    static get worldBorder(): {
        readonly overworld: {
            enabled: boolean;
            get from(): {
                x: number;
                z: number;
            } | {
                x: null;
                z: null;
            };
            set from(from: {
                x: number;
                z: number;
            } | {
                x: null;
                z: null;
            } | undefined);
            get to(): {
                x: number;
                z: number;
            } | {
                x: null;
                z: null;
            };
            set to(to: {
                x: number;
                z: number;
            } | {
                x: null;
                z: null;
            } | undefined);
            mode: number;
            damage: number;
            knockbackH: number;
            knockbackV: number;
            preventWorldInteractionOutsideBorder: boolean;
            tintIntensity: number;
            /**
             * d
             * @todo
             */
            warnPlayersInChat: boolean;
            /**
             * b
             * @todo
             */
            showActionbarWarningWhenOutsideBorder: boolean;
            showRedScreenOutlineWhenOutsideBorder: boolean;
            showBorderParticles: boolean;
            /**
             * @deprecated
             */
            useShadersCompatibleBorderParticles: boolean;
            buffer: number;
        };
        readonly nether: {
            enabled: boolean;
            get from(): {
                x: number;
                z: number;
            } | {
                x: null;
                z: null;
            };
            set from(from: {
                x: number;
                z: number;
            } | {
                x: null;
                z: null;
            } | undefined);
            get to(): {
                x: number;
                z: number;
            } | {
                x: null;
                z: null;
            };
            set to(to: {
                x: number;
                z: number;
            } | {
                x: null;
                z: null;
            } | undefined);
            mode: number;
            damage: number;
            knockbackH: number;
            knockbackV: number;
            preventWorldInteractionOutsideBorder: boolean;
            tintIntensity: number;
            /**
             * @todo
             */
            warnPlayersInChat: boolean;
            /**
             * @todo
             */
            showActionbarWarningWhenOutsideBorder: boolean;
            showRedScreenOutlineWhenOutsideBorder: boolean;
            showBorderParticles: boolean;
            /**
             * @deprecated
             */
            useShadersCompatibleBorderParticles: boolean;
            buffer: number;
        };
        readonly the_end: {
            enabled: boolean;
            get from(): {
                x: number;
                z: number;
            } | {
                x: null;
                z: null;
            };
            set from(from: {
                x: number;
                z: number;
            } | {
                x: null;
                z: null;
            } | undefined);
            get to(): {
                x: number;
                z: number;
            } | {
                x: null;
                z: null;
            };
            set to(to: {
                x: number;
                z: number;
            } | {
                x: null;
                z: null;
            } | undefined);
            mode: number;
            damage: number;
            knockbackH: number;
            knockbackV: number;
            preventWorldInteractionOutsideBorder: boolean;
            tintIntensity: number;
            /**
             * @todo
             */
            warnPlayersInChat: boolean;
            /**
             * @todo
             */
            showActionbarWarningWhenOutsideBorder: boolean;
            showRedScreenOutlineWhenOutsideBorder: boolean;
            showBorderParticles: boolean;
            /**
             * @deprecated
             */
            useShadersCompatibleBorderParticles: boolean;
            buffer: number;
        };
    };
    static get shopSystem(): {
        readonly server: {
            enabled: boolean;
        };
        readonly player: {
            enabled: boolean;
            maxShopsPerPlayer: number;
            allowSellingLockInSlotItems: boolean;
            allowSellingLockInInventoryItems: boolean;
            allowSellingKeepOnDeathItems: boolean;
        };
        readonly sign: {
            enabled: boolean;
        };
    };
    static get teleportSystems(): {
        /**
         * Whether or not cross-dimensional teleports are allowed.
         *
         * Affects all types of teleports that regular players can use, including but not limited to the home system, TPA system, and the `\spawn` command.
         *
         * Overrides the `allowCrossDimensionalTeleport` options for the home system, TPA system, and `\spawn` command.
         *
         * @default true
         */
        allowCrossDimensionalTeleport: boolean;
        /**
         * How long in seconds after teleporting that the player has to wait before they can teleport again.
         *
         * Set it to 0 to have no teleport cooldown.
         *
         * @default 30
         */
        teleportCooldown: number;
        /**
         * How long in seconds that the player has to stand still before they can teleport, if they move during this time period, the teleportation is canceled.
         *
         * Set it to 0 to have players teleport instantly.
         *
         * @default 5
         */
        standStillTimeToTeleport: number;
        /**
         * How long in seconds after getting damaged by another player that the player has to wait before they can teleport with the player menu or commands such as `\spawn`, `\home`, `\gohome`, `\tpa`, and `\rtp`.
         *
         * Set it to 0 to have no PVP cooldown.
         *
         * @default 15
         */
        pvpCooldownToTeleport: number;
    };
    static get homeSystem(): {
        homeSystemEnabled: boolean;
        maxHomesPerPlayer: number;
        /**
         * Whether or not you can teleport to a home that is in a different dimension than you.
         *
         * Defaults to true.
         */
        allowCrossDimensionalTeleport: boolean;
        /**
         * Whether or not homes are allowed in dimensions other than the overworld.
         *
         * Defaults to true.
         */
        allowHomesInOtherDimensions: boolean;
    };
    static get tpaSystem(): {
        tpaSystemEnabled: boolean;
        /**
         * The number of seconds after a teleport request is sent before it will time out.
         *
         * Defaults to 60.
         */
        timeoutDuration: number;
        /**
         * Whether or not you can teleport to a player who is in a different dimension than you.
         *
         * Defaults to true.
         */
        allowCrossDimensionalTeleport: boolean;
    };
    static get chatRanks(): {
        chatRankPrefix: string;
        chatSudoPrefix: string;
        chatDisplayTimeStamp: boolean;
        showRanksOnPlayerNameTags: boolean;
        rankMode: string;
        rankDisplayPrefix: string;
        rankDisplaySuffix: string;
        nameDisplayPrefix: string;
        nameDisplaySuffix: string;
        chatNameAndMessageSeparator: string;
        rankDisplaySeparator: string;
        /**
         * The template string for individual ranks.
         */
        rankTemplateString: string;
        messageTemplateString: string;
        nameTagTemplateString: string;
        defaultRankTemplateString: string;
        defaultMessageFormatting: string;
        defaultNameFormatting: string;
        defaultSeparatorFormatting: string;
        disableCustomChatMessages: boolean;
        allowCustomChatMessagesMuting: boolean;
        autoEscapeChatMessages: boolean;
        autoURIEscapeChatMessages: boolean;
        allowChatEscapeCodes: boolean;
    };
    static get moneySystem(): {
        /**
         * Whether or not to use a scoreboard-based money system instead of a dynamic property-based one.
         *
         * Enabling this option will cause the money system to max out at the 32-bit integer limit (approximately 2.1 billion), but will allow for modifying a player's money with the /scoreboard command instead of having to use the main menu or use script eval.
         *
         * When this option is disabled the limit is 10^32767. So basically infinite.
         *
         * Default: false.
         *
         * Dynamic Property ID: andexdbSettings:moneySystem.useScoreboardBasedMoneySystem
         */
        useScoreboardBasedMoneySystem: boolean;
        /**
         * The name of the scoreboard to use for the money system.
         *
         * Default: "andexdb:money".
         *
         * Dynamic Property ID: andexdbSettings:moneySystem.scoreboardName
         */
        scoreboardName: string;
    };
    static get bountySystem(): {
        /**
         * Whether or not the bounty system is enabled.
         *
         * Default: true.
         *
         * Dynamic Property ID: andexdbSettings:bountySystem.enabled
         */
        enabled: boolean;
        /**
         * Whether to show the time that a player was last online in the stats list that is shown when a player clicks on the bounty for another player in the bounty list.
         *
         * Defaults to false.
         */
        showLastOnlineTimeInBountyDetailsList: boolean;
    };
    static get warpsSystem(): {
        /**
         * Whether or not the warps system is enabled.
         *
         * Default: true.
         *
         * Dynamic Property ID: andexdbSettings:warpsSystem.enabled
         */
        enabled: boolean;
        /**
         * List of saved warps.
         *
         * Default: [].
         *
         * Dynamic Property ID: andexdbSettings:warpsSystem.warps
         *
         * @throws The setter throws if the input is not an array of warp interface objects or undefined.
         */
        warps: Warp[];
    };
    static get moneyTransferSystem(): {
        /**
         * Whether or not the money transfer system is enabled.
         *
         * Default: true.
         *
         * Dynamic Property ID: andexdbSettings:moneyTransferSystem.enabled
         */
        enabled: boolean;
    };
    static get antiSpamSystem(): {
        antispamEnabled: boolean;
        restartAntiSpamMuteTimerUponAttemptedMessageSendDuringMute: boolean;
        waitTimeAfterAntispamActivation: number;
        maxTimeBewteenMessagesToTriggerAntiSpam: number;
        antispamTriggerMessageCount: number;
    };
    static get ui(): {
        readonly menus: {
            readonly mainMenu: {
                /**
                 *
                 */
                buttons: (keyof typeof menuButtonIds.mainMenu.buttons)[];
                /**
                 * Whether to show the buttons marked as deprecated on the main menu.
                 *
                 * Defaults to false.
                 */
                showDeprecatedButtons: boolean;
                /**
                 * Whether to show the buttons marked as deprecated on the main menu.
                 *
                 * Defaults to true.
                 */
                showExperimentalButtons: boolean;
                /**
                 * Whether to show the buttons marked as deprecated on the main menu.
                 *
                 * Defaults to false.
                 */
                showUnusedButtons: boolean;
                /**
                 * Whether to show the buttons for features that are planned to be added in a future update on the main menu.
                 *
                 * Defaults to false.
                 */
                showUpcomingButtons: boolean;
                /**
                 * Whether to show the buttons for features that are non-functional on the main menu.
                 *
                 * Defaults to false.
                 */
                showNonFunctionalButtons: boolean;
            };
            readonly playerMenu: {
                /**
                 * Whether or not the player menu is enabled.
                 *
                 * Defaults to true.
                 */
                enabled: boolean;
                /**
                 *
                 */
                buttons: (keyof typeof menuButtonIds.playerMenu.buttons)[];
                /**
                 * The item name for the item that opens the player menu.
                 *
                 * Defaults to "Menu".
                 */
                itemName: string;
                /**
                 * Whether to show the buttons marked as deprecated on the player menu.
                 *
                 * Defaults to false.
                 */
                showDeprecatedButtons: boolean;
                /**
                 * Whether to show the buttons marked as deprecated on the player menu.
                 *
                 * Defaults to true.
                 */
                showExperimentalButtons: boolean;
                /**
                 * Whether to show the buttons marked as deprecated on the player menu.
                 *
                 * Defaults to false.
                 */
                showUnusedButtons: boolean;
                /**
                 * Whether to show the buttons for features that are planned to be added in a future update on the player menu.
                 *
                 * Defaults to false.
                 */
                showUpcomingButtons: boolean;
                /**
                 * Whether to show the buttons for features that are non-functional on the player menu.
                 *
                 * Defaults to false.
                 */
                showNonFunctionalButtons: boolean;
            };
            readonly playerMenu_leaderboards: {
                /**
                 * The settings for the built-in leaderboard statistics.
                 */
                readonly builtInStats: {
                    readonly money: {
                        /**
                         * Whether or not this built-in statictic is enabled.
                         *
                         * Defaults to true.
                         */
                        enabled: boolean;
                        readonly displayOptions: {
                            /**
                             * Whether or not to prefix the displayed value for this statistic with a dollar sign.
                             *
                             * Defaults to true.
                             */
                            prefixWithDollarSign: boolean;
                            /**
                             * Whether or not to add comma separators to the displayed value for this statistic.
                             *
                             * Defaults to true.
                             */
                            addCommaSeparators: boolean;
                        };
                    };
                };
                /**
                 *
                 */
                customStats: playerMenuLeaderboardStatistic<"custom" | "customAdvanced">[];
                /**
                 * The statistics that are displayed when a player clicks on another player inside of the player menu leaderboard, they will be displayed in the order they are in this array.
                 *
                 * It should be an array of ids of leaderboard statistics, including both custom and built-in ones.
                 *
                 * Defaults to the list of the built-in leaderboard statistics from the `defaultPlayerMenuLeaderboardStatistics` array, in the same order that they appear in the array.
                 */
                trackedStats: string[];
                /**
                 * The list of statistics that have their own leaderboards, they will be displayed in the order they are in this array.
                 *
                 * It should be an array of ids of leaderboard statistics, including both custom and built-in ones.
                 *
                 * Defaults to the list of the built-in leaderboard statistics from the `defaultPlayerMenuLeaderboardStatistics` array, in the same order that they appear in the array.
                 */
                leaderboards: string[];
                /**
                 * Whether to show the time that a player was last online in the stats list that is shown when a player click on another player in a leaderboard.
                 *
                 * Defaults to false.
                 */
                showLastOnlineTimeInPlayerStatsList: boolean;
                /**
                 * Whether to show banned players inside of the leaderboards.
                 *
                 * Defaults to false.
                 */
                showBannedPlayersInLeaderboards: boolean;
            };
        };
        readonly main: {};
        readonly pages: {
            /**
             * Moved from {@link config} to {@link config.ui.pages} in version 1.23.0-preview.20+BUILD.1 on 10/04/2024 at 3:10:37 PM PDT.
             */
            maxPlayersPerManagePlayersPage: number;
            /**
             * Moved from {@link config} to {@link config.ui.pages} in version 1.23.0-preview.20+BUILD.1 on 10/04/2024 at 3:10:37 PM PDT.
             */
            maxBansPerManageBansPage: number;
            /**
             * Moved from {@link config} to {@link config.ui.pages} in version 1.23.0-preview.20+BUILD.1 on 10/04/2024 at 3:10:37 PM PDT.
             */
            maxHomesPerManageHomesPage: number;
        };
        readonly other: {
            useStarWarsReference404Page: boolean | undefined;
        };
    };
    static get system(): {
        artificialLagMS: number;
        timeZone: number;
        playerDataRefreshRate: number;
        protectedAreasRefreshRate: number;
        bannedPlayersRefreshRate: number;
        debugMode: boolean;
        /**
         * It is reccommended to leave this set to false.
         */
        allowWatchdogTerminationCrash: boolean;
        /**
         * It is reccommended to leave this set to false.
         */
        hideWatchdogTerminationCrashEnabledWarningsOnStartup: boolean;
        /**
         * It is recommended to leave this set to false.
         * @default false
         * @decorator
         * also
         * false
         */
        useLegacyPlayerInventoryDataSaveSystem: boolean;
        playerInventoryDataSaveSystemEnabled: boolean;
        spreadPlayerInventoryDataSavesOverMultipleTicks: boolean;
        showEntityScaleNotFoundConsoleLog: boolean;
        showEntityScaleFoundConsoleLog: boolean;
        showEntityScaleNotFoundChatLog: boolean;
        showEntityScaleFoundChatLog: boolean;
        showBlueModsAnticheatNotFoundConsoleLog: boolean;
        showBlueModsAnticheatFoundConsoleLog: boolean;
        showBlueModsAnticheatNotFoundChatLog: boolean;
        showBlueModsAnticheatFoundChatLog: boolean;
        /**
         * Sets whether or not the add-on is allowed to connect to and communicate with the entity scale add-on.
         * @warning It is HIGHLY DISCOURAGED to disable this option.
         */
        allowConnectingToEntityScale: boolean;
        /**
         * Sets whether or not the add-on is allowed to connect to and communicate with the BlueMods Anticheat add-on.
         * @warning It is HIGHLY DISCOURAGED to disable this option.
         */
        allowConnectingToBlueModsAnticheat: boolean;
    };
    static reset(subsection?: any): void;
    static applySettings(settings: DeepPartial<ReturnType<typeof modules.utils.filterProperties<typeof config, ["prototype", "reset", "applySettings", "toJSON"]>>>): void;
    static toJSON(): {
        [k: string]: string | number | boolean | DimensionLocation | config | {
            /**
             * Whether or not to use a scoreboard-based money system instead of a dynamic property-based one.
             *
             * Enabling this option will cause the money system to max out at the 32-bit integer limit (approximately 2.1 billion), but will allow for modifying a player's money with the /scoreboard command instead of having to use the main menu or use script eval.
             *
             * When this option is disabled the limit is 10^32767. So basically infinite.
             *
             * Default: false.
             *
             * Dynamic Property ID: andexdbSettings:moneySystem.useScoreboardBasedMoneySystem
             */
            useScoreboardBasedMoneySystem: boolean;
            /**
             * The name of the scoreboard to use for the money system.
             *
             * Default: "andexdb:money".
             *
             * Dynamic Property ID: andexdbSettings:moneySystem.scoreboardName
             */
            scoreboardName: string;
        } | {
            readonly menus: {
                readonly mainMenu: {
                    /**
                     *
                     */
                    buttons: (keyof typeof menuButtonIds.mainMenu.buttons)[];
                    /**
                     * Whether to show the buttons marked as deprecated on the main menu.
                     *
                     * Defaults to false.
                     */
                    showDeprecatedButtons: boolean;
                    /**
                     * Whether to show the buttons marked as deprecated on the main menu.
                     *
                     * Defaults to true.
                     */
                    showExperimentalButtons: boolean;
                    /**
                     * Whether to show the buttons marked as deprecated on the main menu.
                     *
                     * Defaults to false.
                     */
                    showUnusedButtons: boolean;
                    /**
                     * Whether to show the buttons for features that are planned to be added in a future update on the main menu.
                     *
                     * Defaults to false.
                     */
                    showUpcomingButtons: boolean;
                    /**
                     * Whether to show the buttons for features that are non-functional on the main menu.
                     *
                     * Defaults to false.
                     */
                    showNonFunctionalButtons: boolean;
                };
                readonly playerMenu: {
                    /**
                     * Whether or not the player menu is enabled.
                     *
                     * Defaults to true.
                     */
                    enabled: boolean;
                    /**
                     *
                     */
                    buttons: (keyof typeof menuButtonIds.playerMenu.buttons)[];
                    /**
                     * The item name for the item that opens the player menu.
                     *
                     * Defaults to "Menu".
                     */
                    itemName: string;
                    /**
                     * Whether to show the buttons marked as deprecated on the player menu.
                     *
                     * Defaults to false.
                     */
                    showDeprecatedButtons: boolean;
                    /**
                     * Whether to show the buttons marked as deprecated on the player menu.
                     *
                     * Defaults to true.
                     */
                    showExperimentalButtons: boolean;
                    /**
                     * Whether to show the buttons marked as deprecated on the player menu.
                     *
                     * Defaults to false.
                     */
                    showUnusedButtons: boolean;
                    /**
                     * Whether to show the buttons for features that are planned to be added in a future update on the player menu.
                     *
                     * Defaults to false.
                     */
                    showUpcomingButtons: boolean;
                    /**
                     * Whether to show the buttons for features that are non-functional on the player menu.
                     *
                     * Defaults to false.
                     */
                    showNonFunctionalButtons: boolean;
                };
                readonly playerMenu_leaderboards: {
                    /**
                     * The settings for the built-in leaderboard statistics.
                     */
                    readonly builtInStats: {
                        readonly money: {
                            /**
                             * Whether or not this built-in statictic is enabled.
                             *
                             * Defaults to true.
                             */
                            enabled: boolean;
                            readonly displayOptions: {
                                /**
                                 * Whether or not to prefix the displayed value for this statistic with a dollar sign.
                                 *
                                 * Defaults to true.
                                 */
                                prefixWithDollarSign: boolean;
                                /**
                                 * Whether or not to add comma separators to the displayed value for this statistic.
                                 *
                                 * Defaults to true.
                                 */
                                addCommaSeparators: boolean;
                            };
                        };
                    };
                    /**
                     *
                     */
                    customStats: playerMenuLeaderboardStatistic<"custom" | "customAdvanced">[];
                    /**
                     * The statistics that are displayed when a player clicks on another player inside of the player menu leaderboard, they will be displayed in the order they are in this array.
                     *
                     * It should be an array of ids of leaderboard statistics, including both custom and built-in ones.
                     *
                     * Defaults to the list of the built-in leaderboard statistics from the `defaultPlayerMenuLeaderboardStatistics` array, in the same order that they appear in the array.
                     */
                    trackedStats: string[];
                    /**
                     * The list of statistics that have their own leaderboards, they will be displayed in the order they are in this array.
                     *
                     * It should be an array of ids of leaderboard statistics, including both custom and built-in ones.
                     *
                     * Defaults to the list of the built-in leaderboard statistics from the `defaultPlayerMenuLeaderboardStatistics` array, in the same order that they appear in the array.
                     */
                    leaderboards: string[];
                    /**
                     * Whether to show the time that a player was last online in the stats list that is shown when a player click on another player in a leaderboard.
                     *
                     * Defaults to false.
                     */
                    showLastOnlineTimeInPlayerStatsList: boolean;
                    /**
                     * Whether to show banned players inside of the leaderboards.
                     *
                     * Defaults to false.
                     */
                    showBannedPlayersInLeaderboards: boolean;
                };
            };
            readonly main: {};
            readonly pages: {
                /**
                 * Moved from {@link config} to {@link config.ui.pages} in version 1.23.0-preview.20+BUILD.1 on 10/04/2024 at 3:10:37 PM PDT.
                 */
                maxPlayersPerManagePlayersPage: number;
                /**
                 * Moved from {@link config} to {@link config.ui.pages} in version 1.23.0-preview.20+BUILD.1 on 10/04/2024 at 3:10:37 PM PDT.
                 */
                maxBansPerManageBansPage: number;
                /**
                 * Moved from {@link config} to {@link config.ui.pages} in version 1.23.0-preview.20+BUILD.1 on 10/04/2024 at 3:10:37 PM PDT.
                 */
                maxHomesPerManageHomesPage: number;
            };
            readonly other: {
                useStarWarsReference404Page: boolean | undefined;
            };
        } | {
            homeSystemEnabled: boolean;
            maxHomesPerPlayer: number;
            /**
             * Whether or not you can teleport to a home that is in a different dimension than you.
             *
             * Defaults to true.
             */
            allowCrossDimensionalTeleport: boolean;
            /**
             * Whether or not homes are allowed in dimensions other than the overworld.
             *
             * Defaults to true.
             */
            allowHomesInOtherDimensions: boolean;
        } | {
            tpaSystemEnabled: boolean;
            /**
             * The number of seconds after a teleport request is sent before it will time out.
             *
             * Defaults to 60.
             */
            timeoutDuration: number;
            /**
             * Whether or not you can teleport to a player who is in a different dimension than you.
             *
             * Defaults to true.
             */
            allowCrossDimensionalTeleport: boolean;
        } | {
            /**
             * Whether or not the warps system is enabled.
             *
             * Default: true.
             *
             * Dynamic Property ID: andexdbSettings:warpsSystem.enabled
             */
            enabled: boolean;
            /**
             * List of saved warps.
             *
             * Default: [].
             *
             * Dynamic Property ID: andexdbSettings:warpsSystem.warps
             *
             * @throws The setter throws if the input is not an array of warp interface objects or undefined.
             */
            warps: Warp[];
        } | {
            /**
             * Whether or not the bounty system is enabled.
             *
             * Default: true.
             *
             * Dynamic Property ID: andexdbSettings:bountySystem.enabled
             */
            enabled: boolean;
            /**
             * Whether to show the time that a player was last online in the stats list that is shown when a player clicks on the bounty for another player in the bounty list.
             *
             * Defaults to false.
             */
            showLastOnlineTimeInBountyDetailsList: boolean;
        } | {
            readonly server: {
                enabled: boolean;
            };
            readonly player: {
                enabled: boolean;
                maxShopsPerPlayer: number;
                allowSellingLockInSlotItems: boolean;
                allowSellingLockInInventoryItems: boolean;
                allowSellingKeepOnDeathItems: boolean;
            };
            readonly sign: {
                enabled: boolean;
            };
        } | {
            /**
             * Whether or not the money transfer system is enabled.
             *
             * Default: true.
             *
             * Dynamic Property ID: andexdbSettings:moneyTransferSystem.enabled
             */
            enabled: boolean;
        } | {
            x: null;
            y: null;
            z: null;
            dimension: Dimension;
        } | {
            readonly overworld: {
                enabled: boolean;
                get from(): {
                    x: number;
                    z: number;
                } | {
                    x: null;
                    z: null;
                };
                set from(from: {
                    x: number;
                    z: number;
                } | {
                    x: null;
                    z: null;
                } | undefined);
                get to(): {
                    x: number;
                    z: number;
                } | {
                    x: null;
                    z: null;
                };
                set to(to: {
                    x: number;
                    z: number;
                } | {
                    x: null;
                    z: null;
                } | undefined);
                mode: number;
                damage: number;
                knockbackH: number;
                knockbackV: number;
                preventWorldInteractionOutsideBorder: boolean;
                tintIntensity: number;
                /**
                 * d
                 * @todo
                 */
                warnPlayersInChat: boolean;
                /**
                 * b
                 * @todo
                 */
                showActionbarWarningWhenOutsideBorder: boolean;
                showRedScreenOutlineWhenOutsideBorder: boolean;
                showBorderParticles: boolean;
                /**
                 * @deprecated
                 */
                useShadersCompatibleBorderParticles: boolean;
                buffer: number;
            };
            readonly nether: {
                enabled: boolean;
                get from(): {
                    x: number;
                    z: number;
                } | {
                    x: null;
                    z: null;
                };
                set from(from: {
                    x: number;
                    z: number;
                } | {
                    x: null;
                    z: null;
                } | undefined);
                get to(): {
                    x: number;
                    z: number;
                } | {
                    x: null;
                    z: null;
                };
                set to(to: {
                    x: number;
                    z: number;
                } | {
                    x: null;
                    z: null;
                } | undefined);
                mode: number;
                damage: number;
                knockbackH: number;
                knockbackV: number;
                preventWorldInteractionOutsideBorder: boolean;
                tintIntensity: number;
                /**
                 * @todo
                 */
                warnPlayersInChat: boolean;
                /**
                 * @todo
                 */
                showActionbarWarningWhenOutsideBorder: boolean;
                showRedScreenOutlineWhenOutsideBorder: boolean;
                showBorderParticles: boolean;
                /**
                 * @deprecated
                 */
                useShadersCompatibleBorderParticles: boolean;
                buffer: number;
            };
            readonly the_end: {
                enabled: boolean;
                get from(): {
                    x: number;
                    z: number;
                } | {
                    x: null;
                    z: null;
                };
                set from(from: {
                    x: number;
                    z: number;
                } | {
                    x: null;
                    z: null;
                } | undefined);
                get to(): {
                    x: number;
                    z: number;
                } | {
                    x: null;
                    z: null;
                };
                set to(to: {
                    x: number;
                    z: number;
                } | {
                    x: null;
                    z: null;
                } | undefined);
                mode: number;
                damage: number;
                knockbackH: number;
                knockbackV: number;
                preventWorldInteractionOutsideBorder: boolean;
                tintIntensity: number;
                /**
                 * @todo
                 */
                warnPlayersInChat: boolean;
                /**
                 * @todo
                 */
                showActionbarWarningWhenOutsideBorder: boolean;
                showRedScreenOutlineWhenOutsideBorder: boolean;
                showBorderParticles: boolean;
                /**
                 * @deprecated
                 */
                useShadersCompatibleBorderParticles: boolean;
                buffer: number;
            };
        } | {
            /**
             * Whether or not cross-dimensional teleports are allowed.
             *
             * Affects all types of teleports that regular players can use, including but not limited to the home system, TPA system, and the `\spawn` command.
             *
             * Overrides the `allowCrossDimensionalTeleport` options for the home system, TPA system, and `\spawn` command.
             *
             * @default true
             */
            allowCrossDimensionalTeleport: boolean;
            /**
             * How long in seconds after teleporting that the player has to wait before they can teleport again.
             *
             * Set it to 0 to have no teleport cooldown.
             *
             * @default 30
             */
            teleportCooldown: number;
            /**
             * How long in seconds that the player has to stand still before they can teleport, if they move during this time period, the teleportation is canceled.
             *
             * Set it to 0 to have players teleport instantly.
             *
             * @default 5
             */
            standStillTimeToTeleport: number;
            /**
             * How long in seconds after getting damaged by another player that the player has to wait before they can teleport with the player menu or commands such as `\spawn`, `\home`, `\gohome`, `\tpa`, and `\rtp`.
             *
             * Set it to 0 to have no PVP cooldown.
             *
             * @default 15
             */
            pvpCooldownToTeleport: number;
        } | {
            chatRankPrefix: string;
            chatSudoPrefix: string;
            chatDisplayTimeStamp: boolean;
            showRanksOnPlayerNameTags: boolean;
            rankMode: string;
            rankDisplayPrefix: string;
            rankDisplaySuffix: string;
            nameDisplayPrefix: string;
            nameDisplaySuffix: string;
            chatNameAndMessageSeparator: string;
            rankDisplaySeparator: string;
            /**
             * The template string for individual ranks.
             */
            rankTemplateString: string;
            messageTemplateString: string;
            nameTagTemplateString: string;
            defaultRankTemplateString: string;
            defaultMessageFormatting: string;
            defaultNameFormatting: string;
            defaultSeparatorFormatting: string;
            disableCustomChatMessages: boolean;
            allowCustomChatMessagesMuting: boolean;
            autoEscapeChatMessages: boolean;
            autoURIEscapeChatMessages: boolean;
            allowChatEscapeCodes: boolean;
        } | {
            antispamEnabled: boolean;
            restartAntiSpamMuteTimerUponAttemptedMessageSendDuringMute: boolean;
            waitTimeAfterAntispamActivation: number;
            maxTimeBewteenMessagesToTriggerAntiSpam: number;
            antispamTriggerMessageCount: number;
        } | {
            artificialLagMS: number;
            timeZone: number;
            playerDataRefreshRate: number;
            protectedAreasRefreshRate: number;
            bannedPlayersRefreshRate: number;
            debugMode: boolean;
            /**
             * It is reccommended to leave this set to false.
             */
            allowWatchdogTerminationCrash: boolean;
            /**
             * It is reccommended to leave this set to false.
             */
            hideWatchdogTerminationCrashEnabledWarningsOnStartup: boolean;
            /**
             * It is recommended to leave this set to false.
             * @default false
             * @decorator
             * also
             * false
             */
            useLegacyPlayerInventoryDataSaveSystem: boolean;
            playerInventoryDataSaveSystemEnabled: boolean;
            spreadPlayerInventoryDataSavesOverMultipleTicks: boolean;
            showEntityScaleNotFoundConsoleLog: boolean;
            showEntityScaleFoundConsoleLog: boolean;
            showEntityScaleNotFoundChatLog: boolean;
            showEntityScaleFoundChatLog: boolean;
            showBlueModsAnticheatNotFoundConsoleLog: boolean;
            showBlueModsAnticheatFoundConsoleLog: boolean;
            showBlueModsAnticheatNotFoundChatLog: boolean;
            showBlueModsAnticheatFoundChatLog: boolean;
            /**
             * Sets whether or not the add-on is allowed to connect to and communicate with the entity scale add-on.
             * @warning It is HIGHLY DISCOURAGED to disable this option.
             */
            allowConnectingToEntityScale: boolean;
            /**
             * Sets whether or not the add-on is allowed to connect to and communicate with the BlueMods Anticheat add-on.
             * @warning It is HIGHLY DISCOURAGED to disable this option.
             */
            allowConnectingToBlueModsAnticheat: boolean;
        } | typeof config.reset | typeof config.applySettings | typeof config.toJSON;
    };
}
