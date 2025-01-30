import { StructureSaveMode, type DimensionLocation, Dimension } from "@minecraft/server";
/**
 * A class containing the configuration information for the add-on.
 */
export declare class config {
    static get chatCommandsEnabled(): boolean | undefined;
    static set chatCommandsEnabled(enabled: boolean | undefined);
    static get chatCommandPrefix(): string | undefined;
    static set chatCommandPrefix(prefix: string | undefined);
    static get validChatCommandPrefixes(): string | undefined;
    static set validChatCommandPrefixes(prefixes: string | undefined);
    static get invalidChatCommandAction(): number | undefined;
    static set invalidChatCommandAction(invalidChatCommandAction: number | undefined);
    /**
     * How long in seconds after getting damaged by another player that the player has to wait before they can teleport with commands such as `\spawn`, `\home`, `\gohome`, `\tpa`, and `\rtp`.
     *
     * It defaults to 0.
     */
    static get pvpCooldownToTeleport(): number | undefined;
    static set pvpCooldownToTeleport(invalidChatCommandAction: number | undefined);
    static get undoClipboardMode(): StructureSaveMode | undefined;
    static set undoClipboardMode(undoClipboardMode: StructureSaveMode | undefined);
    static get spawnCommandLocation(): DimensionLocation | {
        x: null;
        y: null;
        z: null;
        dimension: Dimension;
    } | undefined;
    static set spawnCommandLocation(spawnCommandLocation: DimensionLocation | {
        x: null;
        y: null;
        z: null;
        dimension: Dimension;
    } | undefined);
    static get worldBorder(): {
        readonly overworld: {
            enabled: boolean | undefined;
            from: {
                x: number;
                z: number;
            } | {
                x: null;
                z: null;
            } | undefined;
            to: {
                x: number;
                z: number;
            } | {
                x: null;
                z: null;
            } | undefined;
            mode: number | undefined;
            damage: number | undefined;
            knockbackH: number | undefined;
            knockbackV: number | undefined;
            preventWorldInteractionOutsideBorder: boolean | undefined;
            tintIntensity: number | undefined;
            /**
             * d
             * @todo
             */
            warnPlayersInChat: boolean | undefined;
            /**
             * b
             * @todo
             */
            showActionbarWarningWhenOutsideBorder: boolean | undefined;
            showRedScreenOutlineWhenOutsideBorder: boolean | undefined;
            showBorderParticles: boolean | undefined;
            /**
             * @deprecated
             */
            useShadersCompatibleBorderParticles: boolean | undefined;
            buffer: number | undefined;
        };
        readonly nether: {
            enabled: boolean | undefined;
            from: {
                x: number;
                z: number;
            } | {
                x: null;
                z: null;
            } | undefined;
            to: {
                x: number;
                z: number;
            } | {
                x: null;
                z: null;
            } | undefined;
            mode: number | undefined;
            damage: number | undefined;
            knockbackH: number | undefined;
            knockbackV: number | undefined;
            preventWorldInteractionOutsideBorder: boolean | undefined;
            tintIntensity: number | undefined;
            /**
             * @todo
             */
            warnPlayersInChat: boolean | undefined;
            /**
             * @todo
             */
            showActionbarWarningWhenOutsideBorder: boolean | undefined;
            showRedScreenOutlineWhenOutsideBorder: boolean | undefined;
            showBorderParticles: boolean | undefined;
            /**
             * @deprecated
             */
            useShadersCompatibleBorderParticles: boolean | undefined;
            buffer: number | undefined;
        };
        readonly the_end: {
            enabled: boolean | undefined;
            from: {
                x: number;
                z: number;
            } | {
                x: null;
                z: null;
            } | undefined;
            to: {
                x: number;
                z: number;
            } | {
                x: null;
                z: null;
            } | undefined;
            mode: number | undefined;
            damage: number | undefined;
            knockbackH: number | undefined;
            knockbackV: number | undefined;
            preventWorldInteractionOutsideBorder: boolean | undefined;
            tintIntensity: number | undefined;
            /**
             * @todo
             */
            warnPlayersInChat: boolean | undefined;
            /**
             * @todo
             */
            showActionbarWarningWhenOutsideBorder: boolean | undefined;
            showRedScreenOutlineWhenOutsideBorder: boolean | undefined;
            showBorderParticles: boolean | undefined;
            /**
             * @deprecated
             */
            useShadersCompatibleBorderParticles: boolean | undefined;
            buffer: number | undefined;
        };
    };
    static get shopSystem(): {
        readonly server: {
            enabled: boolean | undefined;
        };
        readonly player: {
            enabled: boolean | undefined;
            maxShopsPerPlayer: number | undefined;
            allowSellingLockInSlotItems: boolean | undefined;
            allowSellingLockInInventoryItems: boolean | undefined;
            allowSellingKeepOnDeathItems: boolean | undefined;
        };
        readonly sign: {
            enabled: boolean | undefined;
        };
    };
    static get homeSystem(): {
        homeSystemEnabled: boolean | undefined;
        maxHomesPerPlayer: number | undefined;
    };
    static get tpaSystem(): {
        tpaSystemEnabled: boolean | undefined;
        /**
         * The number of seconds after a teleport request is sent before it will time out.
         */
        timeoutDuration: number | undefined;
    };
    static get chatRanks(): {
        chatDisplayTimeStamp: boolean | undefined;
        showRanksOnPlayerNameTags: boolean | undefined;
        rankMode: string | undefined;
        rankDisplayPrefix: string | undefined;
        rankDisplaySuffix: string | undefined;
        nameDisplayPrefix: string | undefined;
        nameDisplaySuffix: string | undefined;
        chatNameAndMessageSeparator: string | undefined;
        rankDisplaySeparator: string | undefined;
        /**
         * The template string for individual ranks.
         */
        rankTemplateString: string | undefined;
        messageTemplateString: string | undefined;
        nameTagTemplateString: string | undefined;
        defaultRankTemplateString: string | undefined;
        defaultMessageFormatting: string | undefined;
        defaultNameFormatting: string | undefined;
        defaultSeparatorFormatting: string | undefined;
        disableCustomChatMessages: boolean | undefined;
        allowCustomChatMessagesMuting: boolean | undefined;
        autoEscapeChatMessages: boolean | undefined;
        autoURIEscapeChatMessages: boolean | undefined;
        allowChatEscapeCodes: boolean | undefined;
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
        useScoreboardBasedMoneySystem: boolean | undefined;
        /**
         * The name of the scoreboard to use for the money system.
         *
         * Default: "andexdb:money".
         *
         * Dynamic Property ID: andexdbSettings:moneySystem.scoreboardName
         */
        scoreboardName: string | undefined;
    };
    static get antiSpamSystem(): {
        antispamEnabled: boolean | undefined;
        restartAntiSpamMuteTimerUponAttemptedMessageSendDuringMute: boolean | undefined;
        waitTimeAfterAntispamActivation: number | undefined;
        maxTimeBewteenMessagesToTriggerAntiSpam: number | undefined;
        antispamTriggerMessageCount: number | undefined;
    };
    static get ui(): {
        readonly main: {};
        readonly pages: {
            /**
             * Moved from {@link config} to {@link config.ui.pages} in version 1.23.0-preview.20+BUILD.1 on 10/04/2024 at 3:10:37 PM PDT.
             */
            maxPlayersPerManagePlayersPage: number | undefined;
            /**
             * Moved from {@link config} to {@link config.ui.pages} in version 1.23.0-preview.20+BUILD.1 on 10/04/2024 at 3:10:37 PM PDT.
             */
            maxBansPerManageBansPage: number | undefined;
            /**
             * Moved from {@link config} to {@link config.ui.pages} in version 1.23.0-preview.20+BUILD.1 on 10/04/2024 at 3:10:37 PM PDT.
             */
            maxHomesPerManageHomesPage: number | undefined;
        };
        readonly other: {
            useStarWarsReference404Page: boolean | undefined;
        };
    };
    static get system(): {
        artificialLagMS: number | undefined;
        timeZone: number | undefined;
        playerDataRefreshRate: number | undefined;
        protectedAreasRefreshRate: number | undefined;
        bannedPlayersRefreshRate: number | undefined;
        debugMode: boolean | undefined;
        /**
         * It is reccommended to leave this set to false.
         */
        allowWatchdogTerminationCrash: boolean | undefined;
        /**
         * It is reccommended to leave this set to false.
         */
        hideWatchdogTerminationCrashEnabledWarningsOnStartup: boolean | undefined;
        /**
         * It is reccommended to leave this set to false.
         * @default false
         * @decorator
         * also
         * false
         */
        useLegacyPlayerInventoryDataSaveSystem: boolean | undefined;
        playerInventoryDataSaveSystemEnabled: boolean | undefined;
        spreadPlayerInventoryDataSavesOverMultipleTicks: boolean | undefined;
        showEntityScaleNotFoundConsoleLog: boolean | undefined;
        showEntityScaleFoundConsoleLog: boolean | undefined;
        showEntityScaleNotFoundChatLog: boolean | undefined;
        showEntityScaleFoundChatLog: boolean | undefined;
        showBlueModsAnticheatNotFoundConsoleLog: boolean | undefined;
        showBlueModsAnticheatFoundConsoleLog: boolean | undefined;
        showBlueModsAnticheatNotFoundChatLog: boolean | undefined;
        showBlueModsAnticheatFoundChatLog: boolean | undefined;
        /**
         * Sets whether or not the add-on is allowed to connect to and communicate with the entity scale add-on.
         * @warning It is HIGHLY DISCOURAGED to disable this option.
         */
        allowConnectingToEntityScale: boolean | undefined;
        /**
         * Sets whether or not the add-on is allowed to connect to and communicate with the BlueMods Anticheat add-on.
         * @warning It is HIGHLY DISCOURAGED to disable this option.
         */
        allowConnectingToBlueModsAnticheat: boolean | undefined;
    };
    static reset(): void;
    static toJSON(): {
        [k: string]: any;
    };
}
