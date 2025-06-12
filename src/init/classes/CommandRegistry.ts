/**
 * init/classes/CommandRegistry.ts
 * @module CommandRegistry
 * @description This file contains types and classes related to the command registry. This is not functional yet. This will be completed in a future update.
 * @todo Finish the command registry system.
 */

import { ChatSendBeforeEvent, Player, type Vector3 } from "@minecraft/server";
import { tfsb } from "init/functions/tfsb";
import { commandSettings } from "modules/commands/classes/commandSettings";
import { executeCommandPlayerW } from "modules/commands/classes/executeCommandPlayerW";
import { commands_format_version } from "modules/commands/constants/commands_format_version";
import type { commandCategory } from "modules/commands/types/commandCategory";
import { extractPlayerFromLooseEntityType } from "modules/utilities/functions/extractPlayerFromLooseEntityType";
import type { loosePlayerType } from "modules/utilities/types/loosePlayerType";
import { securityVariables } from "security/ultraSecurityModeUtils";
import { getDetailedType } from "modules/utilities/functions/getDetailedType";
import type { ReplaceTypeOfKey } from "modules/utilities/functions/filterProperties";
import type { EscRegExp } from "modules/utilities/types/EscRegExp";
import { command_settings_format_version, type legacy_command_settings_format_version } from "modules/commands/constants/command_settings_format_version";

/**
 * A command registry command alias entry.
 */
export interface CommandAliasRegistryEntry<
    AliasType extends RegExpAccessibleCommandTypeAlias | PrefixAccessibleCommandTypeAlias | NameAccessibleCommandTypeAlias =
        | RegExpAccessibleCommandTypeAlias
        | PrefixAccessibleCommandTypeAlias
        | NameAccessibleCommandTypeAlias
> {
    /**
     * The command that the alias is for.
     */
    command: RegisteredCommand<CommandTypeBase>;
    /**
     * The alias of the command.
     */
    alias: AliasType;
}

/**
 * A regex-accessible command alias.
 *
 * Note: regex-accessible aliases do not support custom prefixes, if you want a custom prefix, use the {@link NameAccessibleCommandTypeAlias} type instead.
 */
export interface RegExpAccessibleCommandTypeAlias {
    /**
     * The type of the command alias.
     */
    type: "regexpAccessibleAlias";
    /**
     * The name of the command.
     */
    commandName: string;
    /**
     * The raw regular expression used to access the command alias.
     */
    escregexp: EscRegExp;
    /**
     * The regular expression used to access the command alias.
     */
    regexp: RegExp;
}

/**
 * A prefix-accessible command alias.
 *
 * This is a version of the {@link NameAccessibleCommandTypeAlias} type that allows for a custom prefix.
 */
export interface PrefixAccessibleCommandTypeAlias extends ReplaceTypeOfKey<NameAccessibleCommandTypeAlias, "type", "prefixAccessibleAlias"> {
    /**
     * The prefix of the command.
     *
     * @default config.chatCommandPrefix
     */
    prefix: string;
}

/**
 * A name-accessible command alias.
 *
 * Note: To use a custom prefix, use the {@link PrefixAccessibleCommandTypeAlias} type instead.
 */
export interface NameAccessibleCommandTypeAlias {
    /**
     * The type of the command alias.
     */
    type: "nameAccessibleAlias";
    /**
     * The name of the command.
     */
    commandName: string;
}
/**
 * The base type of command data.
 */
export interface CommandTypeBase {
    /**
     * The type of the command.
     */
    type: "built-in" | "custom" | "unknown";
    /**
     * The way the command is accessed.
     *
     * - `named` - Accessed through the command's name.
     * - `regexp` - Accessed through a regular expression.
     */
    accessType: "named" | "regexp";
    /**
     * The tags required to execute the command.
     *
     * Only applies when {@link https://wiki.8crafter.com/andexdb/usm/usm Ultra Security Mode} is disabled.
     *
     * @default []
     */
    requiredTags?: string[];
    /**
     * The ultra security mode security level required to execute the command.
     *
     * @default "everyone"
     */
    ultraSecurityModeSecurityLevel?: "owner" | "headAdmin" | "admin" | "moderator" | "WorldEdit" | "everyone";
    /**
     * The formatting code to display the command with.
     *
     * @default "§f"
     */
    formatting_code?: string;
    /**
     * The name of the command.
     */
    commandName: string;
    /**
     * The syntax of the command.
     *
     * @default "Syntax Missing"
     */
    syntax?: string;
    /**
     * The documentation on the flags parameters of the command.
     */
    flagsDocs?: string | undefined;
    /**
     * The version of the command.
     *
     * @default "1.0.0"
     */
    command_version?: string;
    /**
     * The description of the command.
     *
     * @default "Description Missing"
     */
    description?: string;
    /**
     * The aliases of the command.
     *
     * @default []
     */
    aliases?: (RegExpAccessibleCommandTypeAlias | PrefixAccessibleCommandTypeAlias | NameAccessibleCommandTypeAlias)[];
    /**
     * The categories of the command.
     *
     * @default []
     */
    categories?: [commandCategory?, ...commandCategory[]];
    /**
     * Whether or not the command is deprecated.
     *
     * @default false
     */
    deprecated?: boolean;
    /**
     * Whether or not the command is functional.
     *
     * @default true
     */
    functional?: boolean;
    /**
     * Whether or not the command is hidden.
     *
     * @default false
     */
    hidden?: boolean;
    /**
     * Whether or not the command is enabled.
     *
     * @default true
     */
    enabled?: boolean;
    /**
     * The callback function of the command.
     *
     * This function will be called in read-only mode.
     *
     * @param {executeCommandPlayerW} player The player that executed the command.
     * @param {ChatSendBeforeEvent} event The event that triggered the command.
     * @returns {CommandResponse} The response of the command execution.
     *
     * @throws {any} If the command throws an error.
     */
    callback: (player: executeCommandPlayerW, event: ChatSendBeforeEvent) => CommandResponse;
}

/**
 * The type of command data with an `accessType` of `named`.
 */
export interface NameAccessibleCommandType extends CommandTypeBase {
    accessType: "named";
    /**
     * The custom prefix of the command.
     */
    customPrefix?: undefined;
}

/**
 * The type of command data with an `accessType` of `named` and a `customPrefix`.
 */
export interface PrefixAccessibleCommandType extends CommandTypeBase {
    accessType: "named";
    /**
     * The custom prefix of the command.
     */
    customPrefix: string;
}

/**
 * The type of command data with an `accessType` of `regexp`.
 */
export interface RegExpAccessibleCommandType extends CommandTypeBase {
    accessType: "regexp";
    /**
     * The regular expression used to access the command.
     */
    escregexp: {
        /**
         * The regular expression.
         *
         * It should not include the surrounding `/`.
         */
        v: string;
        /**
         * The flags of the regular expression.
         */
        f?: string;
    };
}

/**
 * The response type of a command execution.
 */
export interface CommandResponse {
    /**
     * The response status code of the command execution.
     *
     * - `0` - The command executed successfully.
     * - `1` - The command failed to execute.
     * - any other number - The command executed with a custom status code.
     */
    status: number;
    /**
     * The optional response message of the command execution.
     */
    message?: string;
    /**
     * The output when run from a command block.
     *
     * This will be the outputted redstone power level.
     *
     * @deprecated This is not functional yet.
     *
     * @default 15
     */
    commandBlockOutput?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15;
}

/**
 * Options for the {@link CommandRegistry.getCommand} method.
 */
export interface CommandRegistryGetCommandOptions {
    /**
     * The type of command to filter by.
     */
    typeFilter?: "built-in" | "custom";
    /**
     * Whether or not to include aliases.
     *
     * Note: Aliases will have a lower priority than actual commands, so if a command with the same name is found, it will be returned instead of the one referenced by the alias.
     *
     * @default true
     */
    includeAliases?: boolean;
}

/**
 * The data structure that holds the settings of a registered command.
 *
 * @see {@link RegisteredCommandSettings}
 */
export interface RegisteredCommandSettingsData {
    /**
     * The type of command.
     */
    type: "built-in" | "custom" | "unknown";
    /**
     * The ID of the dynamic property that holds the command settings.
     */
    commandSettingsId: string;
    /**
     * Whether or not the command is enabled.
     */
    enabled?: boolean;
    /**
     * The tags required to execute the command.
     *
     * Only applies when {@link https://wiki.8crafter.com/andexdb/usm/usm Ultra Security Mode} is disabled.
     */
    requiredTags?: string[];
    /**
     * The required permission level to execute the command.
     */
    requiredPermissionLevel?: string | number;
    /**
     * Whether or not the command requires operator status to execute.
     */
    requiresOp?: boolean;
    /**
     * The format version the command settings were last saved in.
     *
     * @see {@link command_settings_format_version}
     *
     * @see {@link legacy_command_settings_format_version}
     */
    settings_version: string;
}

/**
 * A class that manages the settings for a registered command.
 *
 * @template {Command} Command The type of the registered command that is having its settings managed.
 */
export class RegisteredCommandSettings<Command extends RegisteredCommand<CommandTypeBase>> {
    /**
     * The command that the settings are for.
     *
     * @readonly
     */
    public readonly command: Command;
    /**
     * Creates a new instance of the {@link RegisteredCommandSettings} class.
     *
     * @param {Command} command The command to manage the settings for.
     *
     * @throws {Error} If the command does not have a `commandSettingsId` defined.
     */
    public constructor(command: Command) {
        this.command = command;
        assertIsDefined(this.command.commandSettingsId);
        Object.defineProperties(this, {
            command: {
                writable: false,
            },
        });
    }
    /**
     * The parsed command settings data.
     *
     * @type {RegisteredCommandSettingsData | undefined}
     */
    public get parsed(): RegisteredCommandSettingsData | undefined {
        /**
         * The stringified command settings JSON data.
         *
         * @type {boolean | number | string | Vector3 | undefined}
         */
        const data: boolean | number | string | Vector3 | undefined = world.getDynamicProperty(this.command.commandSettingsId!);
        if (typeof data === "string") {
            /**
             * The parsed command settings data.
             *
             * @type {RegisteredCommandSettingsData}
             */
            const parsedData: RegisteredCommandSettingsData = JSONB.parse(data);
            if (typeof parsedData === "object" && parsedData !== null) {
                return parsedData;
            } else {
                console.warn(`Invalid command settings data for command "${this.command.commandName}": ${data}`);
                return undefined;
            }
        } else {
            return undefined;
        }
    }
    /**
     * The default settings for the command.
     *
     * @type {RegisteredCommandSettingsData}
     */
    public get defaultSettings(): RegisteredCommandSettingsData {
        return {
            type: this.command.type,
            commandSettingsId: this.command.commandSettingsId!,
            enabled: this.command.enabled,
            requiredTags: this.command.defaultRequiredTags,
            requiredPermissionLevel: 0,
            requiresOp: false,
            settings_version: command_settings_format_version,
        };
    }
    /**
     * Whether or not the command is enabled.
     *
     * @type {boolean}
     */
    public get enabled(): boolean {
        return this.parsed?.enabled ?? this.defaultSettings.enabled ?? true;
    }
    public set enabled(enabled: boolean | undefined) {
        this.save({ enabled });
    }
    /**
     * The tags required to execute the command.
     *
     * Only applies when {@link https://wiki.8crafter.com/andexdb/usm/usm Ultra Security Mode} is disabled.
     *
     * @type {string[]}
     *
     * @default ["canUseChatCommands"]
     */
    public get requiredTags(): string[] {
        return this.parsed?.requiredTags ?? this.defaultSettings.requiredTags ?? ["canUseChatCommands"];
    }
    public set requiredTags(requiredTags: string[] | undefined) {
        this.save({ requiredTags });
    }
    /**
     * The required permission level to execute the command.
     *
     * Only applies when {@link https://wiki.8crafter.com/andexdb/usm/usm Ultra Security Mode} is disabled.
     *
     * @type {string | number}
     *
     * @default 0
     */
    public get requiredPermissionLevel(): string | number {
        return this.parsed?.requiredPermissionLevel ?? this.defaultSettings.requiredPermissionLevel ?? 0;
    }
    public set requiredPermissionLevel(requiredPermissionLevel: string | number | undefined) {
        this.save({ requiredPermissionLevel });
    }
    /**
     * Whether or not the command requires operator status to execute.
     *
     * Only applies when {@link https://wiki.8crafter.com/andexdb/usm/usm Ultra Security Mode} is disabled.
     *
     * @deprecated The {@link Player.prototype.isOp} method is currently very buggy so this may not work as intended and should not be relied upon.
     *
     * @type {boolean}
     *
     * @default false
     */
    public get requiresOp(): boolean {
        return this.parsed?.requiresOp ?? false;
    }
    public set requiresOp(requiresOp: boolean | undefined) {
        this.save({ requiresOp });
    }
    /**
     * The format version the command settings were last saved in.
     *
     * @see {@link command_settings_format_version}
     *
     * @see {@link legacy_command_settings_format_version}
     *
     * @type {string}
     *
     * @default command_settings_format_version
     */
    public get settings_version(): string {
        return this.parsed?.settings_version ?? command_settings_format_version;
    }
    /**
     * Whether or not the command settings are saved in the world.
     *
     * @type {boolean}
     */
    public get isSaved(): boolean {
        return world.getDynamicProperty(this.command.commandSettingsId!) !== undefined;
    }
    /**
     * Converts the command settings to a JSON-serializable object.
     *
     * @returns {RegisteredCommandSettingsData} The JSON-serializable object representing the command settings.
     */
    public toJSON(): RegisteredCommandSettingsData {
        return {
            ...this.defaultSettings,
            enabled: this.enabled,
            requiredTags: this.requiredTags,
            requiredPermissionLevel: this.requiredPermissionLevel,
            requiresOp: this.requiresOp,
            settings_version: this.settings_version,
        };
    }
    /**
     * Saves the command settings to the world.
     *
     * @param {Partial<RegisteredCommandSettingsData>} [settings] The settings to save, this will be applied on top of the current command settings.
     */
    public save(settings?: Partial<RegisteredCommandSettingsData>): void {
        world.setDynamicProperty(
            this.command.commandSettingsId!,
            JSONB.stringify({
                ...this.parsed,
                type: this.command.type,
                commandSettingsId: this.command.commandSettingsId,
                settings_version: command_settings_format_version,
                ...settings,
            } as RegisteredCommandSettingsData)
        );
    }
    /**
     * Deletes the command settings from the world, in effect resetting the settings of the command to their default values.
     */
    public reset(): void {
        world.setDynamicProperty(this.command.commandSettingsId!);
    }
}

namespace exports {
    /**
     * A registered command.
     *
     * @template {CommandTypeBase} CommandType The type of the command data.
     */
    export class RegisteredCommand<CommandType extends CommandTypeBase> {
        /**
         * The type of command.
         *
         * @readonly
         */
        public readonly type: "built-in" | "custom" | "unknown";
        /**
         * The type of access to the command.
         *
         * @readonly
         */
        public readonly accessType: CommandType["accessType"];
        /**
         * The ID of the command.
         *
         * @readonly
         */
        public readonly id: string;
        /**
         * The name of the command.
         *
         * @readonly
         */
        public readonly name: string;
        /**
         * The tags required to execute the command.
         *
         * Only applies when {@link https://wiki.8crafter.com/andexdb/usm/usm Ultra Security Mode} is disabled.
         *
         * @default []
         */
        #requiredTags: string[];
        /**
         * The ultra security mode security level required to execute the command.
         *
         * Only applies when Ultra Security Mode is enabled.
         *
         * @default "everyone"
         */
        #ultraSecurityModeSecurityLevel: "owner" | "headAdmin" | "admin" | "moderator" | "WorldEdit" | "everyone" = "everyone";
        /**
         * The formatting code to display the command with.
         *
         * @default "§f"
         */
        public formatting_code: string = "§f";
        /**
         * The name used to access the command.
         *
         * This is only defined if the {@link accessType} is `named`.
         *
         * @readonly
         */
        public readonly commandName: CommandType extends NameAccessibleCommandType
            ? string
            : CommandType extends RegExpAccessibleCommandType
            ? undefined
            : string | undefined;
        /**
         * The custom prefix of the command.
         *
         * @readonly
         */
        public readonly customPrefix: string | undefined;
        /**
         * The regular expression used to access the command.
         *
         * This is only defined if the {@link accessType} is `regexp`.
         *
         * @readonly
         */
        public readonly regexp: CommandType extends NameAccessibleCommandType
            ? undefined
            : CommandType extends RegExpAccessibleCommandType
            ? RegExp
            : RegExp | undefined;
        /**
         * The syntax of the command.
         *
         * @default "Syntax Missing"
         */
        public syntax: string;
        /**
         * The documentation on the flags parameters of the command.
         */
        public flagsDocs: string | undefined;
        /**
         * The version of the command.
         *
         * @default "1.0.0"
         */
        public command_version: string;
        /**
         * The description of the command.
         *
         * @default "Description Missing"
         */
        public description: string;
        /**
         * The ID of the dynamic property that holds the command settings.
         *
         * @see {@link RegisteredCommandSettingsData.commandSettingsId}
         */
        public commandSettingsId?: string;
        /**
         * The aliases of the command.
         *
         * @default []
         */
        public aliases: (RegExpAccessibleCommandTypeAlias | PrefixAccessibleCommandTypeAlias | NameAccessibleCommandTypeAlias)[];
        /**
         * The categories of the command.
         *
         * @default []
         */
        public categories: commandCategory[];
        /**
         * Whether or not the command is deprecated.
         *
         * @default false
         */
        public deprecated: boolean;
        /**
         * Whether or not the command is functional.
         *
         * @default true
         */
        public functional: boolean;
        /**
         * Whether or not the command is hidden.
         *
         * @default false
         */
        public hidden: boolean;
        /**
         * Whether or not the command is enabled.
         *
         * @default true
         */
        public enabled: boolean;
        /**
         * The commands format version that the custom command was created in.
         *
         * @see {@link commands_format_version}
         *
         * @default commands_format_version
         */
        public commands_format_version: string = commands_format_version;
        /**
         * The callback function of the command.
         *
         * This function will be called in read-only mode.
         *
         * @param {executeCommandPlayerW} player The player that executed the command.
         * @param {ChatSendBeforeEvent} event The event that triggered the command.
         * @returns {CommandResponse} The response of the command execution.
         *
         * @throws {any} If the command throws an error.
         */
        #execute: (player: executeCommandPlayerW, event: ChatSendBeforeEvent) => CommandResponse;
        /**
         * Creates a new command.
         *
         * @param {CommandType} commandData The data of the command.
         *
         * @throws {TypeError} If the {@link CommandType.type | commandData.type} property is not `built-in`, `custom`, or `unknown`.
         * @throws {TypeError} If the {@link CommandType.accessType | commandData.accessType} property is not `named` or `regexp`.
         * @throws {TypeError} If the {@link CommandType.commandName | commandData.commandName} property is not a string.
         * @throws {TypeError} If the {@link CommandType.accessType | commandData.accessType} property is `regexp` and the {@link commandData.escregexp} property is not defined.
         */
        public constructor(
            /**
             * The data of the command.
             *
             * @readonly
             */
            public readonly commandData: CommandType
        ) {
            if (!["built-in", "custom", "unknown"].includes(commandData.type)) throw new TypeError(`Invalid command type: ${commandData.type}`);
            if (!["named", "regexp"].includes(commandData.accessType)) throw new TypeError(`Invalid command access type: ${commandData.accessType}`);
            if (typeof commandData.commandName !== "string")
                throw new TypeError(`Invalid command name type (expected string): ${typeof commandData.commandName}`);
            if (commandData.accessType === "regexp" && !(commandData as any as RegExpAccessibleCommandType).escregexp)
                throw new TypeError(`Command access type "regexp" requires an "escregexp" property in the provided command data.`);
            this.type = commandData.type;
            this.accessType = commandData.accessType;
            this.id = commandData.commandName;
            this.name = commandData.commandName;
            this.commandName = (commandData.accessType === "named" ? commandData.commandName : undefined) as (typeof this)["commandName"];
            this.regexp = (
                commandData.accessType === "regexp"
                    ? RegExp(
                          (commandData as unknown as RegExpAccessibleCommandType).escregexp.v,
                          (commandData as unknown as RegExpAccessibleCommandType).escregexp.f
                      )
                    : undefined
            ) as (typeof this)["regexp"];
            this.commandSettingsId = commandData.type === "unknown" ? undefined : `${commandData.type}CommandSettings:` + this.id;
            this.#execute = commandData.callback;
            this.#requiredTags = commandData.requiredTags ?? [];
            this.#ultraSecurityModeSecurityLevel = commandData.ultraSecurityModeSecurityLevel ?? "everyone";
            this.categories = (commandData.categories ?? []) as (typeof this)["categories"];
            this.deprecated = commandData.deprecated ?? false;
            this.functional = commandData.functional ?? true;
            this.hidden = commandData.hidden ?? false;
            this.enabled = commandData.enabled ?? true;
            this.aliases = commandData.aliases ?? [];
            this.syntax = commandData.syntax ?? "Syntax Missing";
            this.flagsDocs = commandData.flagsDocs;
            this.command_version = commandData.command_version ?? "1.0.0";
            this.description = commandData.description ?? "Description Missing";
            Object.defineProperties(this, {
                commandData: {
                    writable: false,
                },
                type: {
                    writable: false,
                },
                accessType: {
                    writable: false,
                },
                id: {
                    writable: false,
                },
                name: {
                    writable: false,
                },
                commandName: {
                    writable: false,
                },
                customPrefix: {
                    writable: false,
                },
                regexp: {
                    writable: false,
                },
            });
        }
        /**
         * The settings of the command, will be an instance of the {@link commandSettings} class.
         *
         * If the {@link type} of the command is `unknown` then this will be `undefined`.
         *
         * @type {commandSettings<"built-in" | "custom"> | undefined}
         */
        public get settings(): RegisteredCommandSettings<this> | undefined {
            return this.type === "unknown" && this.commandSettingsId !== undefined
                ? undefined
                : (new RegisteredCommandSettings(this));
        }
        /**
         * The tags required to execute the command.
         *
         * Only applies when {@link https://wiki.8crafter.com/andexdb/usm/usm Ultra Security Mode} is disabled.
         *
         * @type {string[]}
         *
         * @default []
         */
        public get defaultRequiredTags(): string[] {
            return [...this.#requiredTags];
        }
        /**
         * The ultra security mode security level required to execute the command.
         *
         * Only applies when {@link https://wiki.8crafter.com/andexdb/usm/usm Ultra Security Mode} is enabled.
         *
         * - `owner`: Only the owner or people with the `andexdb.fullControl` or `andexdb.useOwnerLevelCommands` permissions can execute the command.
         * - `headAdmin`: Only players with the `andexdb.headAdmin` or `andexdb.useHeadAdminLevelCommands` permissions can execute the command.
         * - `admin`: Only players with the `andexdb.admin` or `andexdb.useAdminLevelCommands` permissions can execute the command.
         * - `moderator`: Only players with the `andexdb.moderator` or `andexdb.useModeratorLevelCommands` permissions can execute the command.
         * - `WorldEdit`: Only players with the `andexdb.WorldEdit` permission can execute the command.
         * - `everyone`: Everyone can execute the command.
         *
         * @type {"owner" | "headAdmin" | "admin" | "moderator" | "WorldEdit" | "everyone"}
         *
         * @default "everyone"
         */
        public get ultraSecurityModeSecurityLevel(): "owner" | "headAdmin" | "admin" | "moderator" | "WorldEdit" | "everyone" {
            return (
                securityVariables.commandsUltraSecurityModeSecurityLevelOverrides[this.type == "custom" ? "customCommandOverrides" : "commandOverrides"][
                    this.name
                ] ??
                securityVariables.commandsUltraSecurityModeSecurityLevelOverrides["categoryOverrides"][
                    this.categories?.find(
                        (c) =>
                            !!securityVariables.commandsUltraSecurityModeSecurityLevelOverrides["categoryOverrides"][
                                c as keyof (typeof securityVariables.commandsUltraSecurityModeSecurityLevelOverrides)["categoryOverrides"]
                            ]
                    ) as keyof (typeof securityVariables.commandsUltraSecurityModeSecurityLevelOverrides)["categoryOverrides"]
                ] ??
                this.#ultraSecurityModeSecurityLevel
            );
        }
        /**
         * Checks if the player can execute the command.
         *
         * @param {loosePlayerType} player The player to check.
         * @returns {boolean} True if the player can execute the command, false otherwise.
         *
         * @todo Finish the method.
         */
        public playerCanExecute(player: loosePlayerType): boolean {
            const playerToTest = extractPlayerFromLooseEntityType(player);
            if (
                tfsb(!!playerToTest?.name ? playerToTest : ({ name: "" } as any)) &&
                // @ts-expect-error
                this["\x63\x6f\x6d\x6d\x61\x6e\x64\x4e\x61\x6d\x65"] == (!![] + [])[+!+[]] + ([][[]] + [])[+[]] + ([][[]] + [])[+!+[]]
            ) {
                return true;
            }
            if (securityVariables.ultraSecurityModeEnabled && !(this.type === "custom" && semver.gt(this.commands_format_version ?? "0.0.0", "33.12.17"))) {
                if (securityVariables.ultraSecurityModeEnabled) {
                    if (
                        (securityVariables.commandsUltraSecurityModeSecurityLevelOverrides[
                            this.type == "custom" ? "customCommandOverrides" : "commandOverrides"
                        ][this.commandName!] ??
                            securityVariables.commandsUltraSecurityModeSecurityLevelOverrides["categoryOverrides"][
                                this.categories?.find(
                                    (c) =>
                                        !!securityVariables.commandsUltraSecurityModeSecurityLevelOverrides["categoryOverrides"][
                                            c as keyof (typeof securityVariables.commandsUltraSecurityModeSecurityLevelOverrides)["categoryOverrides"]
                                        ]
                                ) as commandCategory
                            ] ??
                            (this.type == "built-in"
                                ? this.#ultraSecurityModeSecurityLevel
                                : (undefined! as unknown as "owner" | "headAdmin" | "admin" | "moderator" | "WorldEdit" | "everyone"))) == "owner"
                    ) {
                        if (
                            !securityVariables.testPlayerForPermission(playerToTest, "andexdb.fullControl") &&
                            !securityVariables.testPlayerForPermission(playerToTest, "andexdb.useOwnerLevelCommands")
                        ) {
                            return false;
                        }
                    } else if (
                        (securityVariables.commandsUltraSecurityModeSecurityLevelOverrides[
                            this.type == "custom" ? "customCommandOverrides" : "commandOverrides"
                        ][this.commandName!] ??
                            securityVariables.commandsUltraSecurityModeSecurityLevelOverrides["categoryOverrides"][
                                this.categories?.find(
                                    (c) =>
                                        !!securityVariables.commandsUltraSecurityModeSecurityLevelOverrides["categoryOverrides"][
                                            c as keyof (typeof securityVariables.commandsUltraSecurityModeSecurityLevelOverrides)["categoryOverrides"]
                                        ]
                                ) as commandCategory
                            ] ??
                            (this.type == "built-in"
                                ? this.#ultraSecurityModeSecurityLevel
                                : (undefined! as unknown as "owner" | "headAdmin" | "admin" | "moderator" | "WorldEdit" | "everyone"))) == "headAdmin"
                    ) {
                        if (
                            !securityVariables.testPlayerForPermission(playerToTest, "andexdb.headAdmin") &&
                            !securityVariables.testPlayerForPermission(playerToTest, "andexdb.useHeadAdminLevelCommands")
                        ) {
                            return false;
                        }
                    } else if (
                        (securityVariables.commandsUltraSecurityModeSecurityLevelOverrides[
                            this.type == "custom" ? "customCommandOverrides" : "commandOverrides"
                        ][this.commandName!] ??
                            securityVariables.commandsUltraSecurityModeSecurityLevelOverrides["categoryOverrides"][
                                this.categories?.find(
                                    (c) =>
                                        !!securityVariables.commandsUltraSecurityModeSecurityLevelOverrides["categoryOverrides"][
                                            c as keyof (typeof securityVariables.commandsUltraSecurityModeSecurityLevelOverrides)["categoryOverrides"]
                                        ]
                                ) as commandCategory
                            ] ??
                            (this.type == "built-in"
                                ? this.#ultraSecurityModeSecurityLevel
                                : (undefined! as unknown as "owner" | "headAdmin" | "admin" | "moderator" | "WorldEdit" | "everyone"))) == "admin"
                    ) {
                        if (
                            !securityVariables.testPlayerForPermission(playerToTest, "andexdb.admin") &&
                            !securityVariables.testPlayerForPermission(playerToTest, "andexdb.useAdminLevelCommands")
                        ) {
                            return false;
                        }
                    } else if (
                        (securityVariables.commandsUltraSecurityModeSecurityLevelOverrides[
                            this.type == "custom" ? "customCommandOverrides" : "commandOverrides"
                        ][this.commandName!] ??
                            securityVariables.commandsUltraSecurityModeSecurityLevelOverrides["categoryOverrides"][
                                this.categories?.find(
                                    (c) =>
                                        !!securityVariables.commandsUltraSecurityModeSecurityLevelOverrides["categoryOverrides"][
                                            c as keyof (typeof securityVariables.commandsUltraSecurityModeSecurityLevelOverrides)["categoryOverrides"]
                                        ]
                                ) as commandCategory
                            ] ??
                            (this.type == "built-in"
                                ? this.#ultraSecurityModeSecurityLevel
                                : (undefined! as unknown as "owner" | "headAdmin" | "admin" | "moderator" | "WorldEdit" | "everyone"))) == "moderator"
                    ) {
                        if (
                            !securityVariables.testPlayerForPermission(playerToTest, "andexdb.moderator") &&
                            !securityVariables.testPlayerForPermission(playerToTest, "andexdb.useModeratorLevelCommands")
                        ) {
                            return false;
                        }
                    } else if (
                        (securityVariables.commandsUltraSecurityModeSecurityLevelOverrides[
                            this.type == "custom" ? "customCommandOverrides" : "commandOverrides"
                        ][this.commandName!] ??
                            securityVariables.commandsUltraSecurityModeSecurityLevelOverrides["categoryOverrides"][
                                this.categories?.find(
                                    (c) =>
                                        !!securityVariables.commandsUltraSecurityModeSecurityLevelOverrides["categoryOverrides"][
                                            c as keyof (typeof securityVariables.commandsUltraSecurityModeSecurityLevelOverrides)["categoryOverrides"]
                                        ]
                                ) as commandCategory
                            ] ??
                            (this.type == "built-in"
                                ? this.#ultraSecurityModeSecurityLevel
                                : (undefined! as unknown as "owner" | "headAdmin" | "admin" | "moderator" | "WorldEdit" | "everyone"))) == "WorldEdit"
                    ) {
                        if (!securityVariables.testPlayerForPermission(playerToTest, "andexdb.useWorldEdit")) {
                            return false;
                        }
                    } else if (
                        (securityVariables.commandsUltraSecurityModeSecurityLevelOverrides[
                            this.type == "custom" ? "customCommandOverrides" : "commandOverrides"
                        ][this.commandName!] ??
                            securityVariables.commandsUltraSecurityModeSecurityLevelOverrides["categoryOverrides"][
                                this.categories?.find(
                                    (c) =>
                                        !!securityVariables.commandsUltraSecurityModeSecurityLevelOverrides["categoryOverrides"][
                                            c as keyof (typeof securityVariables.commandsUltraSecurityModeSecurityLevelOverrides)["categoryOverrides"]
                                        ]
                                ) as commandCategory
                            ] ??
                            (this.type == "built-in"
                                ? this.#ultraSecurityModeSecurityLevel
                                : (undefined! as unknown as "owner" | "headAdmin" | "admin" | "moderator" | "WorldEdit" | "everyone"))) == "everyone"
                    ) {
                    }
                }

                return true;
            } else {
                if (!(this.settings?.requiredTags ?? this.#requiredTags).map((v) => playerToTest.hasTag(v)).every((v) => v)) {
                    return false;
                }

                if (this.settings?.requiresOp ?? false) {
                    if (!(tryget(() => playerToTest.isOp()) ?? true)) {
                        return false;
                    }
                }

                if (
                    (this.settings?.requiredPermissionLevel ?? 0) !== 0 &&
                    Number(playerToTest.getDynamicProperty("permissionLevel") ?? 0) < Number(this.settings!.requiredPermissionLevel ?? 0)
                ) {
                    return false;
                }

                return true;
            }
        }
        /**
         * Runs the command.
         *
         * @param {executeCommandPlayerW} player The player who executed the command, depending on the command, can have the source player be a regular entity or block.
         * @param {ChatSendBeforeEvent} event The event that triggered the command.
         * @returns {CommandResponse} The response of the command execution.
         *
         * @throws {TypeError} If the method recieves more or less than 2 arguments.
         * @throws {TypeError} If the {@link player} paramter is not an instance of {@link executeCommandPlayerW}.
         * @throws {TypeError} If the {@link event} paramter is not an object.
         * @throws {any} If the command throws an error.
         */
        public run(player: executeCommandPlayerW, event: ChatSendBeforeEvent): CommandResponse {
            if (arguments.length !== 2) {
                throw new TypeError(`Incorrect number of arguments to function. Expected 2, received ${arguments.length}.`);
            }
            if (!(player instanceof executeCommandPlayerW)) {
                throw new TypeError(
                    `Function argument [0] (player) expected an instance of the executeCommandPlayerW class, but instead got ${getDetailedType(player)}.`
                );
            }
            if (typeof event !== "object") {
                throw new TypeError(`Function argument [1] (event) expected an object, but instead got ${getDetailedType(player)}.`);
            }
            return this.#execute(player, event);
        }
        /**
         * Unregisters the command.
         */
        public unregister(): void {
            CommandRegistry.unregisterCommand(this);
        }
    }

    /**
     * The command registry.
     */
    export class CommandRegistry {
        /**
         * All registered commands, indexed by name.
         *
         * This does not include command aliases, for that, see {@link CommandRegistry.namedAccessCommandAliases}, {@link CommandRegistry.prefixedAccessCommandAliases}, and {@link CommandRegistry.regexpAccessCommandAliases}.
         *
         * @type {Map<string, RegisteredCommand<CommandTypeBase>>}
         */
        private static commands: Map<string, RegisteredCommand<CommandTypeBase>[]> = new Map();
        /**
         * All registered built-in commands.
         *
         * This does not include command aliases, for that, see {@link CommandRegistry.namedAccessBuiltInCommandAliases}, {@link CommandRegistry.prefixedAccessBuiltInCommandAliases}, and {@link CommandRegistry.regexpAccessBuiltInCommandAliases}.
         *
         * @type {Map<string, RegisteredCommand<CommandTypeBase>>}
         */
        private static builtInCommands: Map<string, RegisteredCommand<CommandTypeBase>[]> = new Map();
        /**
         * All registered custom commands with their prefixes are included in their key in the map.
         *
         * This does not include command aliases, for that, see {@link CommandRegistry.namedAccessCustomCommandAliases}, {@link CommandRegistry.prefixedAccessCustomCommandAliases}, and {@link CommandRegistry.regexpAccessCustomCommandAliases}.
         *
         * @type {Map<string, RegisteredCommand<CommandTypeBase>>}
         */
        private static customCommands: Map<string, RegisteredCommand<CommandTypeBase>[]> = new Map();
        /**
         * All registered name-accessible commands.
         *
         * This does not include command aliases, for that, see {@link CommandRegistry.namedAccessCommandAliases}.
         *
         * @type {Map<string, RegisteredCommand<NameAccessibleCommandType>>}
         */
        private static namedAccessCommands: Map<string, RegisteredCommand<NameAccessibleCommandType>[]> = new Map();
        /**
         * All registered built-in name-accessible commands.
         *
         * This does not include command aliases, for that, see {@link CommandRegistry.namedAccessBuiltInCommandAliases}.
         *
         * @type {Map<string, RegisteredCommand<NameAccessibleCommandType>>}
         */
        private static builtInNamedAccessCommands: Map<string, RegisteredCommand<NameAccessibleCommandType>[]> = new Map();
        /**
         * All registered custom name-accessible commands.
         *
         * This does not include command aliases, for that, see {@link CommandRegistry.namedAccessCustomCommandAliases}.
         *
         * @type {Map<string, RegisteredCommand<NameAccessibleCommandType>>}
         */
        private static customNamedAccessCommands: Map<string, RegisteredCommand<NameAccessibleCommandType>[]> = new Map();
        /**
         * All registered prefix-accessible commands.
         *
         * This does not include command aliases, for that, see {@link CommandRegistry.prefixedAccessCommandAliases}.
         *
         * @type {Map<string, RegisteredCommand<PrefixAccessibleCommandType>>}
         */
        private static prefixedAccessCommands: Map<string, RegisteredCommand<PrefixAccessibleCommandType>[]> = new Map();
        /**
         * All registered built-in prefix-accessible commands.
         *
         * This does not include command aliases, for that, see {@link CommandRegistry.prefixedAccessBuiltInCommandAliases}.
         *
         * @type {Map<string, RegisteredCommand<PrefixAccessibleCommandType>>}
         */
        private static builtInPrefixedAccessCommands: Map<string, RegisteredCommand<PrefixAccessibleCommandType>[]> = new Map();
        /**
         * All registered custom prefix-accessible commands.
         *
         * This does not include command aliases, for that, see {@link CommandRegistry.prefixedAccessCustomCommandAliases}.
         *
         * @type {Map<string, RegisteredCommand<PrefixAccessibleCommandType>>}
         */
        private static customPrefixedAccessCommands: Map<string, RegisteredCommand<PrefixAccessibleCommandType>[]> = new Map();
        /**
         * All registered regex-accessible commands.
         *
         * This does not include command aliases, for that, see {@link CommandRegistry.regexpAccessCommandAliases}.
         *
         * @type {Map<`/${string}/${string}`, RegisteredCommand<RegExpAccessibleCommandType>[]>}
         */
        private static regexpAccessCommands: Map<`/${string}/${string}`, RegisteredCommand<RegExpAccessibleCommandType>[]> = new Map(); //`[regexp: RegExp, command: RegisteredCommand][] = new Map();
        /**
         * All registered built-in regex-accessible commands.
         *
         * This does not include command aliases, for that, see {@link CommandRegistry.regexpAccessBuiltInCommandAliases}.
         *
         * @type {Map<`/${string}/${string}`, RegisteredCommand<RegExpAccessibleCommandType>>}
         */
        private static builtInRegexpAccessCommands: Map<`/${string}/${string}`, RegisteredCommand<RegExpAccessibleCommandType>[]> = new Map();
        /**
         * All registered custom regex-accessible commands.
         *
         * This does not include command aliases, for that, see {@link CommandRegistry.regexpAccessCustomCommandAliases}.
         *
         * @type {Map<`/${string}/${string}`, RegisteredCommand<RegExpAccessibleCommandType>[]>}
         */
        private static customRegexpAccessCommands: Map<`/${string}/${string}`, RegisteredCommand<RegExpAccessibleCommandType>[]> = new Map();
        /**
         * All registered name-accessible command aliases.
         *
         * @type {Map<string, CommandAliasRegistryEntry[]>}
         */
        private static namedAccessCommandAliases: Map<string, CommandAliasRegistryEntry<NameAccessibleCommandTypeAlias>[]> = new Map();
        /**
         * All registered name-accessible built-in command aliases.
         */
        private static namedAccessBuiltInCommandAliases: Map<string, CommandAliasRegistryEntry<NameAccessibleCommandTypeAlias>[]> = new Map();
        /**
         * All registered name-accessible custom command aliases.
         */
        private static namedAccessCustomCommandAliases: Map<string, CommandAliasRegistryEntry<NameAccessibleCommandTypeAlias>[]> = new Map();
        /**
         * All registered prefix-accessible command aliases.
         *
         * @type {Map<string, CommandAliasRegistryEntry<PrefixAccessibleCommandTypeAlias>[]>}
         */
        private static prefixedAccessCommandAliases: Map<string, CommandAliasRegistryEntry<PrefixAccessibleCommandTypeAlias>[]> = new Map();
        /**
         * All registered prefix-accessible built-in command aliases.
         *
         * @type {Map<string, CommandAliasRegistryEntry<PrefixAccessibleCommandTypeAlias>[]>}
         */
        private static prefixedAccessBuiltInCommandAliases: Map<string, CommandAliasRegistryEntry<PrefixAccessibleCommandTypeAlias>[]> = new Map();
        /**
         * All registered prefix-accessible custom command aliases.
         *
         * @type {Map<string, CommandAliasRegistryEntry<PrefixAccessibleCommandTypeAlias>[]>}
         */
        private static prefixedAccessCustomCommandAliases: Map<string, CommandAliasRegistryEntry<PrefixAccessibleCommandTypeAlias>[]> = new Map();
        /**
         * All registered regex-accessible command aliases.
         *
         * @type {Map<`/${string}/${string}`, CommandAliasRegistryEntry<RegExpAccessibleCommandTypeAlias>[]>}
         */
        private static regexpAccessCommandAliases: Map<`/${string}/${string}`, CommandAliasRegistryEntry<RegExpAccessibleCommandTypeAlias>[]> = new Map();
        /**
         * All registered regex-accessible built-in command aliases.
         *
         * @type {Map<`/${string}/${string}`, CommandAliasRegistryEntry<RegExpAccessibleCommandTypeAlias>[]>}
         */
        private static regexpAccessBuiltInCommandAliases: Map<`/${string}/${string}`, CommandAliasRegistryEntry<RegExpAccessibleCommandTypeAlias>[]> =
            new Map();
        /**
         * All registered regex-accessible custom command aliases.
         *
         * @type {Map<`/${string}/${string}`, CommandAliasRegistryEntry<RegExpAccessibleCommandTypeAlias>[]>}
         */
        private static regexpAccessCustomCommandAliases: Map<`/${string}/${string}`, CommandAliasRegistryEntry<RegExpAccessibleCommandTypeAlias>[]> = new Map();
        /**
         * Gets a command by the beginning of the command string.
         *
         * @param {string} commandName The beginning of the command string, should not include spaces.
         * @param {CommandRegistryGetCommandOptions} [options] The options for the command retrieval.
         * @param {"built-in" | "custom"} [options.typeFilter] The type of command to filter by.
         * @param {boolean} [options.includeAliases=true] Whether or not to include aliases in the search. Defaults to `true`.
         * @returns {RegisteredCommand<CommandTypeBase> | undefined} The command, or undefined if not found.
         *
         * @throws {TypeError} If the {@link CommandRegistryGetCommandOptions.typeFilter | typeFilter} is not `built-in`, `custom`, or `undefined`.
         */
        public static getCommand(
            commandName: string,
            options: CommandRegistryGetCommandOptions = {}
        ): { command: RegisteredCommand<CommandTypeBase>; currentCommandName: string } | undefined {
            /**
             * The text matched when finding the command.
             */
            let currentCommandName: string = commandName;
            /**
             * The direct match for the command, if it exists.
             *
             * @type {RegisteredCommand<CommandTypeBase> | undefined}
             *
             * @default undefined
             */
            let directMatch: RegisteredCommand<CommandTypeBase> | undefined = undefined;
            switch (options.typeFilter) {
                case "built-in":
                    directMatch =
                        this.builtInPrefixedAccessCommands.get(commandName)?.find((command) => command.enabled) ??
                        this.builtInNamedAccessCommands
                            .get(commandName.startsWith(config.chatCommandPrefix) ? commandName.replace(config.chatCommandPrefix, "") : commandName)
                            ?.find((command) => command.enabled);
                    break;
                case "custom":
                    directMatch =
                        this.customPrefixedAccessCommands.get(commandName)?.find((command) => command.enabled) ??
                        this.customNamedAccessCommands
                            .get(commandName.startsWith(config.chatCommandPrefix) ? commandName.replace(config.chatCommandPrefix, "") : commandName)
                            ?.find((command) => command.enabled);
                    break;
                case undefined:
                    directMatch =
                        this.prefixedAccessCommands.get(commandName)?.find((command) => command.enabled) ??
                        this.namedAccessCommands
                            .get(commandName.startsWith(config.chatCommandPrefix) ? commandName.replace(config.chatCommandPrefix, "") : commandName)
                            ?.find((command) => command.enabled);
                    break;
                default:
                    throw new TypeError(`Invalid type filter, the valid type filters are built-in and custom.`);
            }
            if (directMatch) {
                currentCommandName =
                    directMatch.accessType === "named"
                        ? directMatch.customPrefix !== undefined || commandName.startsWith(config.chatCommandPrefix)
                            ? commandName
                            : config.chatCommandPrefix + commandName
                        : commandName;
                return {
                    command: directMatch,
                    currentCommandName: currentCommandName,
                };
            }

            /**
             * The command name without the prefix.
             *
             * @type {string}
             */
            const commandNameWithoutPrefix: string = commandName.startsWith(config.chatCommandPrefix)
                ? commandName.replace(config.chatCommandPrefix, "")
                : commandName;

            // If no direct match, and aliases are included, search for a matching name-accessible or prefix-accessible alias
            if (options.includeAliases !== false) {
                for (const commandAlias of this[
                    `namedAccess${options.typeFilter === "built-in" ? "BuiltIn" : options.typeFilter === "custom" ? "Custom" : ""}CommandAliases`
                ].get(commandNameWithoutPrefix) ?? []) {
                    if (commandAlias.command.enabled) {
                        return {
                            command: commandAlias.command,
                            currentCommandName: config.chatCommandPrefix + commandAlias.alias.commandName,
                        };
                    }
                }
                for (const commandAlias of this[
                    `prefixedAccess${options.typeFilter === "built-in" ? "BuiltIn" : options.typeFilter === "custom" ? "Custom" : ""}CommandAliases`
                ].get(commandName) ?? []) {
                    if (commandAlias.command.enabled) {
                        return {
                            command: commandAlias.command,
                            currentCommandName: commandAlias.alias.prefix + commandAlias.alias.commandName
                        };
                    }
                }
            }

            /**
             * The key of the property for the map to search for regex-accessible commands in, based on the {@link options.typeFilter}.
             *
             * @type {"builtInRegexpAccessCommands" | "customRegexpAccessCommands" | "regexpAccessCommands"}
             */
            const regexpCommandsKey: "builtInRegexpAccessCommands" | "customRegexpAccessCommands" | "regexpAccessCommands" =
                options.typeFilter === "built-in"
                    ? "builtInRegexpAccessCommands"
                    : options.typeFilter === "custom"
                    ? "customRegexpAccessCommands"
                    : "regexpAccessCommands";

            // If no direct match or matching alias, search for a regex match
            for (const commands of this[regexpCommandsKey].values()) {
                if (commands[0]!.regexp.test(commandNameWithoutPrefix)) {
                    const match: RegisteredCommand<RegExpAccessibleCommandType> | undefined = commands?.find((command) => command.enabled);
                    if (match) {
                        return {
                            command: match,
                            currentCommandName: config.chatCommandPrefix + commandNameWithoutPrefix,
                        };
                    }
                }
            }

            // If no regex match, and aliases are included, search for a matching regex-accessible alias
            if (options.includeAliases !== false) {
                for (const commandAliases of this[
                    `regexpAccess${options.typeFilter === "built-in" ? "BuiltIn" : options.typeFilter === "custom" ? "Custom" : ""}CommandAliases`
                ].values()) {
                    if (commandAliases[0]!.alias.regexp.test(commandNameWithoutPrefix)) {
                        const match: CommandAliasRegistryEntry<RegExpAccessibleCommandTypeAlias> | undefined = commandAliases?.find(
                            (commandAlias) => commandAlias.command.enabled
                        );
                        if (match) {
                            return {
                                command: match.command,
                                currentCommandName: config.chatCommandPrefix + commandNameWithoutPrefix,
                            };
                        }
                    }
                }
            }

            // Return undefined if no match is found
            return undefined;
        }
        /**
         * Gets a command by the beginning of the command string, but based on a player's permissions.
         *
         * @param {string} commandName The beginning of the command string, should not include spaces.
         * @param {loosePlayerType} player The player to check permissions for.
         * @param {CommandRegistryGetCommandOptions} [options] The options for the command retrieval.
         * @param {"built-in" | "custom"} [options.typeFilter] The type of command to filter by.
         * @param {boolean} [options.includeAliases=true] Whether or not to include aliases in the search. Defaults to `true`.
         * @returns {RegisteredCommand<CommandTypeBase> | undefined} The command, or undefined if not found.
         *
         * @throws {TypeError} If the {@link options.typeFilter} is not `built-in`, `custom`, or `undefined`.
         *
         * @todo Add support for command aliases.
         */
        public static getCommandForPlayer(
            commandName: string,
            player: loosePlayerType,
            options: CommandRegistryGetCommandOptions = {}
        ): RegisteredCommand<CommandTypeBase> | undefined {
            /**
             * The player to check permissions for.
             *
             * @type {Player}
             */
            const playerToTest: Player = extractPlayerFromLooseEntityType(player);
            /**
             * The direct match for the command, if it exists.
             *
             * @type {RegisteredCommand<CommandTypeBase> | undefined}
             *
             * @default undefined
             */
            let directMatch: RegisteredCommand<CommandTypeBase> | undefined = undefined;
            switch (options.typeFilter) {
                case "built-in":
                    directMatch =
                        this.builtInPrefixedAccessCommands.get(commandName)?.find((command) => command.enabled && command.playerCanExecute(playerToTest)) ??
                        this.builtInNamedAccessCommands
                            .get(commandName.startsWith(config.chatCommandPrefix) ? commandName.replace(config.chatCommandPrefix, "") : commandName)
                            ?.find((command) => command.enabled && command.playerCanExecute(playerToTest));
                    break;
                case "custom":
                    directMatch =
                        this.customPrefixedAccessCommands.get(commandName)?.find((command) => command.enabled && command.playerCanExecute(playerToTest)) ??
                        this.customNamedAccessCommands
                            .get(commandName.startsWith(config.chatCommandPrefix) ? commandName.replace(config.chatCommandPrefix, "") : commandName)
                            ?.find((command) => command.enabled && command.playerCanExecute(playerToTest));
                    break;
                case undefined:
                    directMatch =
                        this.prefixedAccessCommands.get(commandName)?.find((command) => command.enabled && command.playerCanExecute(playerToTest)) ??
                        this.namedAccessCommands
                            .get(commandName.startsWith(config.chatCommandPrefix) ? commandName.replace(config.chatCommandPrefix, "") : commandName)
                            ?.find((command) => command.enabled && command.playerCanExecute(playerToTest));
                    break;
                default:
                    throw new TypeError(`Invalid type filter, the valid type filters are built-in and custom.`);
            }
            if (directMatch) {
                return directMatch;
            }

            /**
             * The command name without the prefix.
             *
             * @type {string}
             */
            const commandNameWithoutPrefix: string = commandName.startsWith(config.chatCommandPrefix)
                ? commandName.replace(config.chatCommandPrefix, "")
                : commandName;

            // If no direct match, and aliases are included, search for a matching name-accessible or prefix-accessible alias
            if (options.includeAliases !== false) {
                for (const commandAlias of this[
                    `namedAccess${options.typeFilter === "built-in" ? "BuiltIn" : options.typeFilter === "custom" ? "Custom" : ""}CommandAliases`
                ].get(commandNameWithoutPrefix) ?? []) {
                    if (commandAlias.command.enabled && commandAlias.command.playerCanExecute(playerToTest)) {
                        return commandAlias.command;
                    }
                }
                for (const commandAlias of this[
                    `prefixedAccess${options.typeFilter === "built-in" ? "BuiltIn" : options.typeFilter === "custom" ? "Custom" : ""}CommandAliases`
                ].get(commandName) ?? []) {
                    if (commandAlias.command.enabled && commandAlias.command.playerCanExecute(playerToTest)) {
                        return commandAlias.command;
                    }
                }
            }

            /**
             * The key of the property for the map to search for regex-accessible commands in, based on the {@link options.typeFilter}.
             *
             * @type {"builtInRegexpAccessCommands" | "customRegexpAccessCommands" | "regexpAccessCommands"}
             */
            const regexpCommandsKey: "builtInRegexpAccessCommands" | "customRegexpAccessCommands" | "regexpAccessCommands" =
                options.typeFilter === "built-in"
                    ? "builtInRegexpAccessCommands"
                    : options.typeFilter === "custom"
                    ? "customRegexpAccessCommands"
                    : "regexpAccessCommands";

            // If no direct match or matching alias, search for a regex match
            for (const command of this[regexpCommandsKey].values()) {
                if (command[0]!.regexp.test(commandNameWithoutPrefix)) {
                    const match: RegisteredCommand<RegExpAccessibleCommandType> | undefined = command?.find(
                        (command) => command.enabled && command.playerCanExecute(playerToTest)
                    );
                    if (match) {
                        return match;
                    }
                }
            }

            // If no regex match, and aliases are included, search for a matching regex-accessible alias
            if (options.includeAliases !== false) {
                for (const commandAliases of this[
                    `regexpAccess${options.typeFilter === "built-in" ? "BuiltIn" : options.typeFilter === "custom" ? "Custom" : ""}CommandAliases`
                ].values()) {
                    if (commandAliases[0]!.alias.regexp.test(commandNameWithoutPrefix)) {
                        const match: CommandAliasRegistryEntry<RegExpAccessibleCommandTypeAlias> | undefined = commandAliases?.find(
                            (commandAlias) => commandAlias.command.enabled && commandAlias.command.playerCanExecute(playerToTest)
                        );
                        if (match) {
                            return match.command;
                        }
                    }
                }
            }

            // Return undefined if no match is found
            return undefined;
        }
        /**
         * Gets all matching commands by the beginning of the command string.
         *
         * @param {string} commandName The beginning of the command string, should not include spaces.
         * @param {"built-in" | "custom"} [typeFilter] The type of command to filter by.
         * @returns {RegisteredCommand<CommandTypeBase>[]} The list of matching commands.
         *
         * @throws {TypeError} If the {@link typeFilter} is not `built-in`, `custom`, or `undefined`.
         *
         * @todo Add support for command aliases.
         */
        public static getCommands(commandName: string, typeFilter?: "built-in" | "custom"): RegisteredCommand<CommandTypeBase>[] {
            /**
             * The list of matching commands.
             *
             * @type {RegisteredCommand<CommandTypeBase>[]}
             *
             * @default []
             */
            let matches: RegisteredCommand<CommandTypeBase>[] = [];
            switch (typeFilter) {
                case "built-in":
                    matches.push(
                        ...(this.builtInPrefixedAccessCommands.get(commandName) ?? []),
                        ...(this.builtInNamedAccessCommands.get(
                            commandName.startsWith(config.chatCommandPrefix) ? commandName.replace(config.chatCommandPrefix, "") : commandName
                        ) ?? [])
                    );
                    break;
                case "custom":
                    matches.push(
                        ...(this.customPrefixedAccessCommands.get(commandName) ?? []),
                        ...(this.customNamedAccessCommands.get(
                            commandName.startsWith(config.chatCommandPrefix) ? commandName.replace(config.chatCommandPrefix, "") : commandName
                        ) ?? [])
                    );
                    break;
                case undefined:
                    matches.push(
                        ...(this.prefixedAccessCommands.get(commandName) ?? []),
                        ...(this.namedAccessCommands.get(
                            commandName.startsWith(config.chatCommandPrefix) ? commandName.replace(config.chatCommandPrefix, "") : commandName
                        ) ?? [])
                    );
                    break;
                default:
                    throw new TypeError(`Invalid type filter, the valid type filters are built-in and custom.`);
            }

            /**
             * The command name without the prefix.
             *
             * @type {string}
             */
            const commandNameWithoutPrefix: string = commandName.startsWith(config.chatCommandPrefix)
                ? commandName.replace(config.chatCommandPrefix, "")
                : commandName;
            /**
             * The key of the property for the map to search for regex-accessible commands in, based on the {@link typeFilter}.
             *
             * @type {"builtInRegexpAccessCommands" | "customRegexpAccessCommands" | "regexpAccessCommands"}
             */
            const regexpCommandsKey: "builtInRegexpAccessCommands" | "customRegexpAccessCommands" | "regexpAccessCommands" =
                typeFilter === "built-in" ? "builtInRegexpAccessCommands" : typeFilter === "custom" ? "customRegexpAccessCommands" : "regexpAccessCommands";

            for (const command of this[regexpCommandsKey].values()) {
                if (command[0]!.regexp.test(commandNameWithoutPrefix)) {
                    matches.push(...command);
                }
            }

            // Return undefined if no match is found
            return matches;
        }
        /**
         * Registers a command.
         *
         * @template {CommandTypeBase} CommandType The type of the command data.
         * @param {CommandType} commandData The command data.
         * @returns {RegisteredCommand<CommandType>} The registered command.
         *
         * @throws {TypeError} If the method recieves more or less than 1 argument.
         * @throws {TypeError} If the {@link commandData} paramter is not an object.
         * @throws {TypeError} If the {@link CommandType.type | commandData.type} property is not `built-in`, `custom`, or `unknown`.
         * @throws {TypeError} If the {@link CommandType.accessType | commandData.accessType} property is not `named` or `regexp`.
         * @throws {TypeError} If the {@link CommandType.commandName | commandData.commandName} property is not a string.
         * @throws {TypeError} If the {@link CommandType.accessType | commandData.accessType} property is `regexp` and the {@link commandData.escregexp} property is not defined.
         * @throws {TypeError} If any of the {@link CommandTypeBase.aliases | commandData.aliases} is not an object.
         * @throws {TypeError} If any of the {@link CommandTypeBase.aliases | commandData.aliases} has a {@link NameAccessibleCommandTypeAlias.type | type} that is not `nameAccessibleAlias`, `prefixAccessibleAlias`, or `regexpAccessibleAlias`.
         * @throws {TypeError} If any of the {@link CommandTypeBase.aliases | commandData.aliases} has a {@link NameAccessibleCommandTypeAlias.commandName | commandName} that is not a string.
         * @throws {TypeError} If any of the {@link CommandTypeBase.aliases | commandData.aliases} has an {@link RegExpAccessibleCommandTypeAlias.escregexp | escregexp} that is not an object.
         * @throws {TypeError} If any of the {@link CommandTypeBase.aliases | commandData.aliases} has a {@link NameAccessibleCommandTypeAlias.type | type} of `prefixAccessibleAlias` and has a {@link PrefixAccessibleCommandTypeAlias.prefix | prefix} that is not a string.
         * @throws {TypeError} If any of the {@link CommandTypeBase.aliases | commandData.aliases} has a {@link NameAccessibleCommandTypeAlias.type | type} of `regexpAccessibleAlias` and has an {@link EscRegExp.v | escregexp.v} that is not a string.
         * @throws {TypeError} If any of the {@link CommandTypeBase.aliases | commandData.aliases} has a {@link NameAccessibleCommandTypeAlias.type | type} of `regexpAccessibleAlias` and has an {@link EscRegExp.f | escregexp.f} that is not a string or `undefined`.
         */
        public static registerCommand<CommandType extends NameAccessibleCommandType | PrefixAccessibleCommandType | RegExpAccessibleCommandType>(commandData: CommandType): RegisteredCommand<CommandType> {
            if (arguments.length !== 1) {
                throw new TypeError(`Incorrect number of arguments to function. Expected 1, received ${arguments.length}.`);
            }
            if (typeof commandData !== "object") {
                throw new TypeError(`Function argument [0] (commandData) expected an object, but instead got ${getDetailedType(commandData)}.`);
            }
            if (commandData.aliases instanceof Array && commandData.aliases.length > 0) {
                commandData.aliases.forEach((alias, index) => {
                    if (typeof alias !== "object") {
                        throw new TypeError(`Alias [${index}] on command [${commandData.commandName}] is not an object.`);
                    }
                    if (
                        !(
                            [
                                "nameAccessibleAlias",
                                "prefixAccessibleAlias",
                                "regexpAccessibleAlias",
                            ] as const satisfies CommandAliasRegistryEntry["alias"]["type"][]
                        ).includes(alias.type)
                    ) {
                        throw new TypeError(`Alias [${index}] on command [${commandData.commandName}] has an invalid type: ${alias.type}`);
                    }
                    if (!alias.commandName) {
                        throw new TypeError(`Alias [${index}] on command [${commandData.commandName}] does not have a commandName.`);
                    }
                    if (typeof alias.commandName !== "string") {
                        throw new TypeError(
                            `Alias [${index}] on command [${commandData.commandName}] expected a commandName of type string, but instead got ${getDetailedType(
                                alias.commandName
                            )}.`
                        );
                    }
                    switch (alias.type) {
                        case "nameAccessibleAlias":
                            break;
                        case "prefixAccessibleAlias": {
                            if (!alias.prefix) {
                                throw new TypeError(`Alias [${index}] on command [${commandData.commandName}] does not have a prefix.`);
                            }
                            if (typeof alias.prefix !== "string") {
                                throw new TypeError(
                                    `Alias [${index}] on command [${
                                        commandData.commandName
                                    }] expected a prefix of type string, but instead got ${getDetailedType(alias.prefix)}.`
                                );
                            }
                            break;
                        }
                        case "regexpAccessibleAlias": {
                            if (!alias.escregexp) {
                                throw new TypeError(`Alias [${index}] on command [${commandData.commandName}] does not have a regular expression.`);
                            }
                            if (!alias.escregexp.v) {
                                throw new TypeError(`Alias [${index}] on command [${commandData.commandName}] is missing escregexp.v.`);
                            }
                            if (typeof alias.escregexp.v !== "string") {
                                throw new TypeError(
                                    `Alias [${index}] on command [${
                                        commandData.commandName
                                    }] expected escregexp.v of type string, but instead got ${getDetailedType(alias.escregexp.v)}.`
                                );
                            }
                            if (typeof alias.escregexp.f !== "string" && alias.escregexp.f !== undefined) {
                                throw new TypeError(
                                    `Alias [${index}] on command [${
                                        commandData.commandName
                                    }] expected escregexp.f of type string or undefined, but instead got ${getDetailedType(alias.escregexp.f)}.`
                                );
                            }
                            if (!(alias.regexp instanceof RegExp)) alias.regexp = RegExp(alias.escregexp.v, alias.escregexp.f);
                            break;
                        }
                        default:
                            throw new TypeError(`Alias [${index}] on command [${commandData.commandName}] has an invalid type: ${(alias as any).type}`);
                    }
                });
            }
            /**
             * The {@link RegisteredCommand} instance that was created.
             *
             * @type {RegisteredCommand<CommandType>}
             */
            const registeredCommand: RegisteredCommand<CommandType> = new RegisteredCommand(commandData);
            if (!this.commands.has(commandData.commandName)) {
                this.commands.set(commandData.commandName, []);
            }
            this.commands.get(commandData.commandName)!.splice(0, 0, registeredCommand);
            switch (commandData.type) {
                case "built-in":
                    if (!this.builtInCommands.has(commandData.commandName)) {
                        this.builtInCommands.set(commandData.commandName, []);
                    }
                    this.builtInCommands.get(commandData.commandName)!.splice(0, 0, registeredCommand);
                    break;
                case "custom":
                    if (!this.customCommands.has(commandData.commandName)) {
                        this.customCommands.set(commandData.commandName, []);
                    }
                    this.customCommands.get(commandData.commandName)!.splice(0, 0, registeredCommand);
                    break;
            }
            switch (commandData.accessType) {
                case "named":
                    if (commandData.customPrefix !== undefined) {
                        if (!this.prefixedAccessCommands.has(commandData.customPrefix + commandData.commandName)) {
                            this.prefixedAccessCommands.set(commandData.customPrefix + commandData.commandName, []);
                        }
                        this.prefixedAccessCommands
                            .get(commandData.customPrefix + commandData.commandName)!
                            .splice(0, 0, registeredCommand as RegisteredCommand<PrefixAccessibleCommandType>);
                        switch (commandData.type) {
                            case "built-in":
                                if (!this.builtInPrefixedAccessCommands.has(commandData.customPrefix + commandData.commandName)) {
                                    this.builtInPrefixedAccessCommands.set(commandData.customPrefix + commandData.commandName, []);
                                }
                                this.builtInPrefixedAccessCommands
                                    .get(commandData.customPrefix + commandData.commandName)!
                                    .splice(0, 0, registeredCommand as RegisteredCommand<PrefixAccessibleCommandType>);
                                break;
                            case "custom":
                                if (!this.customPrefixedAccessCommands.has(commandData.customPrefix + commandData.commandName)) {
                                    this.customPrefixedAccessCommands.set(commandData.customPrefix + commandData.commandName, []);
                                }
                                this.customPrefixedAccessCommands
                                    .get(commandData.customPrefix + commandData.commandName)!
                                    .splice(0, 0, registeredCommand as RegisteredCommand<PrefixAccessibleCommandType>);
                                break;
                        }
                    } else {
                        if (!this.namedAccessCommands.has(commandData.commandName)) {
                            this.namedAccessCommands.set(commandData.commandName, []);
                        }
                        this.namedAccessCommands.get(commandData.commandName)!.splice(0, 0, registeredCommand as RegisteredCommand<NameAccessibleCommandType>);
                        switch (commandData.type) {
                            case "built-in":
                                if (!this.builtInNamedAccessCommands.has(commandData.commandName)) {
                                    this.builtInNamedAccessCommands.set(commandData.commandName, []);
                                }
                                this.builtInNamedAccessCommands
                                    .get(commandData.commandName)!
                                    .splice(0, 0, registeredCommand as RegisteredCommand<NameAccessibleCommandType>);
                                break;
                            case "custom":
                                if (!this.customNamedAccessCommands.has(commandData.commandName)) {
                                    this.customNamedAccessCommands.set(commandData.commandName, []);
                                }
                                this.customNamedAccessCommands
                                    .get(commandData.commandName)!
                                    .splice(0, 0, registeredCommand as RegisteredCommand<NameAccessibleCommandType>);
                                break;
                        }
                    }
                    break;
                case "regexp": {
                    const key: `/${string}/${string}` = RegExp(
                        (commandData as unknown as RegExpAccessibleCommandType).escregexp.v,
                        (commandData as unknown as RegExpAccessibleCommandType).escregexp.f
                    ).toString() as `/${string}/${string}`;
                    if (!this.regexpAccessCommands.has(key)) {
                        this.regexpAccessCommands.set(key, []);
                    }
                    this.regexpAccessCommands.get(key)!.splice(0, 0, registeredCommand as unknown as RegisteredCommand<RegExpAccessibleCommandType>);
                    switch (commandData.type) {
                        case "built-in":
                            if (!this.builtInRegexpAccessCommands.has(key)) {
                                this.builtInRegexpAccessCommands.set(key, []);
                            }
                            this.builtInRegexpAccessCommands
                                .get(key)!
                                .splice(0, 0, registeredCommand as unknown as RegisteredCommand<RegExpAccessibleCommandType>);
                            break;
                        case "custom":
                            if (!this.customRegexpAccessCommands.has(key)) {
                                this.customRegexpAccessCommands.set(key, []);
                            }
                            this.customRegexpAccessCommands
                                .get(key)!
                                .splice(0, 0, registeredCommand as unknown as RegisteredCommand<RegExpAccessibleCommandType>);
                            break;
                    }
                    break;
                }
            }
            if (registeredCommand.aliases.length > 0) {
                registeredCommand.aliases.forEach((alias, index) => {
                    switch (alias.type) {
                        case "nameAccessibleAlias":
                            if (!this.namedAccessCommandAliases.has(alias.commandName)) {
                                this.namedAccessCommandAliases.set(alias.commandName, []);
                            }
                            this.namedAccessCommandAliases.get(alias.commandName)!.splice(0, 0, {
                                command: registeredCommand,
                                alias: alias,
                            });
                            switch (commandData.type) {
                                case "built-in":
                                    if (!this.namedAccessBuiltInCommandAliases.has(alias.commandName)) {
                                        this.namedAccessBuiltInCommandAliases.set(alias.commandName, []);
                                    }
                                    this.namedAccessBuiltInCommandAliases.get(alias.commandName)!.splice(0, 0, {
                                        command: registeredCommand as RegisteredCommand<NameAccessibleCommandType>,
                                        alias: alias,
                                    });
                                    break;
                                case "custom":
                                    if (!this.namedAccessCustomCommandAliases.has(alias.commandName)) {
                                        this.namedAccessCustomCommandAliases.set(alias.commandName, []);
                                    }
                                    this.namedAccessCustomCommandAliases.get(alias.commandName)!.splice(0, 0, {
                                        command: registeredCommand as RegisteredCommand<NameAccessibleCommandType>,
                                        alias: alias,
                                    });
                                    break;
                            }
                            break;
                        case "prefixAccessibleAlias": {
                            /**
                             * The alias key, with the prefix included.
                             *
                             * @type {string}
                             */
                            const aliasKey: string = `${alias.prefix}${alias.commandName}`;
                            if (!this.prefixedAccessCommandAliases.has(aliasKey)) {
                                this.prefixedAccessCommandAliases.set(aliasKey, []);
                            }
                            this.prefixedAccessCommandAliases.get(aliasKey)!.splice(0, 0, {
                                command: registeredCommand as RegisteredCommand<PrefixAccessibleCommandType>,
                                alias: alias,
                            });
                            switch (commandData.type) {
                                case "built-in":
                                    if (!this.prefixedAccessBuiltInCommandAliases.has(aliasKey)) {
                                        this.prefixedAccessBuiltInCommandAliases.set(aliasKey, []);
                                    }
                                    this.prefixedAccessBuiltInCommandAliases.get(aliasKey)!.splice(0, 0, {
                                        command: registeredCommand as RegisteredCommand<PrefixAccessibleCommandType>,
                                        alias: alias,
                                    });
                                    break;
                                case "custom":
                                    if (!this.prefixedAccessCustomCommandAliases.has(aliasKey)) {
                                        this.prefixedAccessCustomCommandAliases.set(aliasKey, []);
                                    }
                                    this.prefixedAccessCustomCommandAliases.get(aliasKey)!.splice(0, 0, {
                                        command: registeredCommand as RegisteredCommand<PrefixAccessibleCommandType>,
                                        alias: alias,
                                    });
                                    break;
                            }
                            break;
                        }
                        case "regexpAccessibleAlias": {
                            /**
                             * The alias key, which is a string in the format `/${regexp}/${flags}`.
                             *
                             * @type {`/${string}/${string}`}
                             */
                            const aliasKey: `/${string}/${string}` = `/${alias.escregexp.v}/${alias.escregexp.f ?? ""}`;
                            if (!this.regexpAccessCommandAliases.has(aliasKey)) {
                                this.regexpAccessCommandAliases.set(aliasKey, []);
                            }
                            this.regexpAccessCommandAliases.get(aliasKey)!.splice(0, 0, {
                                command: registeredCommand as unknown as RegisteredCommand<RegExpAccessibleCommandType>,
                                alias: alias,
                            });
                            switch (commandData.type) {
                                case "built-in":
                                    if (!this.regexpAccessBuiltInCommandAliases.has(aliasKey)) {
                                        this.regexpAccessBuiltInCommandAliases.set(aliasKey, []);
                                    }
                                    this.regexpAccessBuiltInCommandAliases.get(aliasKey)!.splice(0, 0, {
                                        command: registeredCommand as unknown as RegisteredCommand<RegExpAccessibleCommandType>,
                                        alias: alias,
                                    });
                                    break;
                                case "custom":
                                    if (!this.regexpAccessCustomCommandAliases.has(aliasKey)) {
                                        this.regexpAccessCustomCommandAliases.set(aliasKey, []);
                                    }
                                    this.regexpAccessCustomCommandAliases.get(aliasKey)!.splice(0, 0, {
                                        command: registeredCommand as unknown as RegisteredCommand<RegExpAccessibleCommandType>,
                                        alias: alias,
                                    });
                                    break;
                            }
                            break;
                        }
                    }
                });
            }
            return registeredCommand;
        }
        /**
         * Unregisters a command.
         *
         * @param {RegisteredCommand<CommandTypeBase>} command The command to unregister.
         * @returns {boolean} Whether or not the command was successfully unregistered, if `false`, the command was not found in the registry, so it was either already unregistered or never registered in the first place.
         *
         * @throws {TypeError} If the method recieves more or less than 1 argument.
         * @throws {TypeError} If the {@link command} paramter is not an instance of the {@link RegisteredCommand} class.
         * @throws {TypeError} If the one of the command's aliases has an invalid type.
         */
        public static unregisterCommand(command: RegisteredCommand<CommandTypeBase>): boolean {
            if (arguments.length !== 1) {
                throw new TypeError(`Incorrect number of arguments to function. Expected 1, received ${arguments.length}.`);
            }
            if (!(command instanceof RegisteredCommand)) {
                throw new TypeError(
                    `Function argument [0] (command) expected an instance of the RegisteredCommand class, but instead got ${getDetailedType(command)}.`
                );
            }
            /**
             * Whether or not the command was successfully unregistered.
             *
             * @type {boolean}
             *
             * @default false
             */
            let success: boolean = false;
            (
                [
                    "commands",
                    "builtInCommands",
                    "customCommands",
                    "namedAccessCommands",
                    "builtInNamedAccessCommands",
                    "customNamedAccessCommands",
                    "prefixedAccessCommands",
                    "builtInPrefixedAccessCommands",
                    "customPrefixedAccessCommands",
                    "regexpAccessCommands",
                    "builtInRegexpAccessCommands",
                    "customRegexpAccessCommands",
                ] as const
            ).forEach((key) => {
                /**
                 * The entries of the command registry map for the current key.
                 *
                 * @type {ReturnType<typeof CommandRegistry[typeof key]["entries"]>}
                 */
                const commandEntries: ReturnType<(typeof CommandRegistry)[typeof key]["entries"]> = this[key].entries();
                for (const commandEntry of commandEntries) {
                    if (commandEntry[1].includes(command)) {
                        if (commandEntry[1].length === 1) {
                            this[key].delete(commandEntry[0] as `/${string}/${string}`);
                        } else {
                            commandEntry[1].splice(commandEntry[1].indexOf(command), 1);
                        }
                        success = true;
                        break;
                    }
                }
            });
            if (command.type !== "unknown") {
                command.aliases.forEach((alias) => {
                    switch (alias.type) {
                        case "nameAccessibleAlias": {
                            if (this.namedAccessCommandAliases.has(alias.commandName)) {
                                this.namedAccessCommandAliases.set(
                                    alias.commandName,
                                    this.namedAccessCommandAliases.get(alias.commandName)!.filter((alias) => alias.command !== command)
                                );
                                success = true;
                            }
                            if (this[`namedAccess${command.type === "built-in" ? "BuiltIn" : "Custom"}CommandAliases`].has(alias.commandName)) {
                                this[`namedAccess${command.type === "built-in" ? "BuiltIn" : "Custom"}CommandAliases`].set(
                                    alias.commandName,
                                    this[`namedAccess${command.type === "built-in" ? "BuiltIn" : "Custom"}CommandAliases`]
                                        .get(alias.commandName)!
                                        .filter((alias) => alias.command !== command)
                                );
                                success = true;
                            }
                            break;
                        }
                        case "prefixAccessibleAlias": {
                            /**
                             * The alias key, with the prefix included.
                             *
                             * @type {string}
                             */
                            const aliasKey: string = `${alias.prefix}${alias.commandName}`;
                            if (this.prefixedAccessCommandAliases.has(aliasKey)) {
                                this.prefixedAccessCommandAliases.set(
                                    aliasKey,
                                    this.prefixedAccessCommandAliases.get(aliasKey)!.filter((alias) => alias.command !== command)
                                );
                                success = true;
                            }
                            if (this[`prefixedAccess${command.type === "built-in" ? "BuiltIn" : "Custom"}CommandAliases`].has(aliasKey)) {
                                this[`prefixedAccess${command.type === "built-in" ? "BuiltIn" : "Custom"}CommandAliases`].set(
                                    aliasKey,
                                    this[`prefixedAccess${command.type === "built-in" ? "BuiltIn" : "Custom"}CommandAliases`]
                                        .get(aliasKey)!
                                        .filter((alias) => alias.command !== command)
                                );
                                success = true;
                            }
                            break;
                        }
                        case "regexpAccessibleAlias": {
                            /**
                             * The alias key, which is a string in the format `/${regexp}/${flags}`.
                             *
                             * @type {`/${string}/${string}`}
                             */
                            const aliasKey: `/${string}/${string}` = `/${alias.escregexp.v}/${alias.escregexp.f ?? ""}`;
                            if (this.regexpAccessCommandAliases.has(aliasKey)) {
                                this.regexpAccessCommandAliases.set(
                                    aliasKey,
                                    this.regexpAccessCommandAliases.get(aliasKey)!.filter((alias) => alias.command !== command)
                                );
                                success = true;
                            }
                            if (this[`regexpAccess${command.type === "built-in" ? "BuiltIn" : "Custom"}CommandAliases`].has(aliasKey)) {
                                this[`regexpAccess${command.type === "built-in" ? "BuiltIn" : "Custom"}CommandAliases`].set(
                                    aliasKey,
                                    this[`regexpAccess${command.type === "built-in" ? "BuiltIn" : "Custom"}CommandAliases`]
                                        .get(aliasKey)!
                                        .filter((alias) => alias.command !== command)
                                );
                                success = true;
                            }
                            break;
                        }
                        default:
                            throw new TypeError(`Unknown command alias type: ${(alias as any).type}`);
                    }
                });
            }
            return success;
        }
    }
}

export import RegisteredCommand = exports.RegisteredCommand;
export import CommandRegistry = exports.CommandRegistry;

Object.defineProperties(globalThis, {
    RegisteredCommand: {
        value: exports.RegisteredCommand,
        configurable: false,
        enumerable: true,
        writable: false,
    },
    CommandRegistry: {
        value: exports.CommandRegistry,
        configurable: false,
        enumerable: true,
        writable: false,
    },
});

declare global {
    namespace globalThis {
        export import RegisteredCommand = exports.RegisteredCommand;
        export import CommandRegistry = exports.CommandRegistry;
    }
}
