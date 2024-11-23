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
            enabled: boolean;
            from: {
                x: number;
                z: number;
            } | {
                x: null;
                z: null;
            };
            to: {
                x: number;
                z: number;
            } | {
                x: null;
                z: null;
            };
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
            from: {
                x: number;
                z: number;
            } | {
                x: null;
                z: null;
            };
            to: {
                x: number;
                z: number;
            } | {
                x: null;
                z: null;
            };
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
            from: {
                x: number;
                z: number;
            } | {
                x: null;
                z: null;
            };
            to: {
                x: number;
                z: number;
            } | {
                x: null;
                z: null;
            };
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
    static get homeSystem(): {
        homeSystemEnabled: boolean;
        maxHomesPerPlayer: number;
    };
    static get tpaSystem(): {
        tpaSystemEnabled: boolean;
        /**
         * The number of seconds after a teleport request is sent before it will time out.
         */
        timeoutDuration: number;
    };
    static get chatRanks(): {
        chatDisplayTimeStamp: boolean;
        showRanksOnPlayerNameTags: boolean;
        rankMode: string;
        rankDisplayPrefix: string;
        rankDisplaySuffix: string;
        nameDisplayPrefix: string;
        nameDisplaySuffix: string;
        chatNameAndMessageSeparator: string;
        rankDisplaySeparator: string;
        rankTemplateString: string;
        messageTemplateString: string;
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
    static get antiSpamSystem(): {
        antispamEnabled: boolean;
        restartAntiSpamMuteTimerUponAttemptedMessageSendDuringMute: boolean;
        waitTimeAfterAntispamActivation: number;
        maxTimeBewteenMessagesToTriggerAntiSpam: number;
        antispamTriggerMessageCount: number;
    };
    static get ui(): {
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
            useStarWarsReference404Page: boolean;
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
         * It is reccommended to leave this set to false.
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
    };
    static reset(): void;
    static toJSON(): {
        [k: string]: any;
    };
}
