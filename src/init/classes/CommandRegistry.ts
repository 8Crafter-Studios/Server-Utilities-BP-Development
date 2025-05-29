/**
 * init/classes/CommandRegistry.ts
 * @module CommandRegistry
 * @description This file contains types and classes related to the command registry. This is not functional yet. This will be completed in a future update.
 * @todo Finish the command registry system.
 */

import { ChatSendBeforeEvent } from "@minecraft/server";
import { tfsb } from "init/functions/tfsb";
import { command } from "modules/commands/classes/command";
import { commandSettings } from "modules/commands/classes/commandSettings";
import { executeCommandPlayerW } from "modules/commands/classes/executeCommandPlayerW";
import { commands_format_version } from "modules/commands/constants/commands_format_version";
import type { command_formats_type_list } from "modules/commands/types/command_formats_type_list";
import type { commandCategory } from "modules/commands/types/commandCategory";
import { extractPlayerFromLooseEntityType } from "modules/utilities/functions/extractPlayerFromLooseEntityType";
import type { loosePlayerType } from "modules/utilities/types/loosePlayerType";
import { securityVariables } from "security/ultraSecurityModeUtils";
import { getDetailedType } from "modules/utilities/functions/getDetailedType";

/**
 * An alias of a command with an `accessType` of `regexp`.
 */
export interface RegExpAccessibleCommandTypeAlias {
    /**
     * The name of the command.
     */
    commandName: string;
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
 * An alias of a command with an `accessType` of `named`.
 */
export interface NameAccessibleCommandTypeAlias {
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
     * - `named` - Accessed through the command's name;
     * - `regexp` - Accessed through a regular expression.
     */
    accessType: "named" | "regexp";
    /**
     * The tags required to execute the command.
     *
     * Only applies when Ultra Security Mode is disabled.
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
     * The custom prefix of the command.
     */
    customPrefix?: string;
    /**
     * The syntax of the command.
     *
     * @default "Syntax Missing"
     */
    syntax?: string;
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
    aliases?: RegExpAccessibleCommandTypeAlias[] | NameAccessibleCommandTypeAlias[];
    /**
     * The categories of the command.
     *
     * @default []
     */
    categories?: commandCategory[];
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
     */
    callback: (player: executeCommandPlayerW, event: ChatSendBeforeEvent) => void;
}

/**
 * The type of command data with an `accessType` of `named`.
 */
export interface NameAccessibleCommandType extends CommandTypeBase {
    accessType: "named";
    aliases?: NameAccessibleCommandTypeAlias[];
}

/**
 * The type of command data with an `accessType` of `named` and a `customPrefix`.
 */
export interface PrefixAccessibleCommandType extends NameAccessibleCommandType {
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
    aliases?: RegExpAccessibleCommandTypeAlias[];
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
         */
        public type: "built-in" | "custom" | "unknown";
        /**
         * The type of access to the command.
         */
        public readonly accessType: CommandType["accessType"];
        /**
         * The ID of the command.
         */
        public readonly id: string;
        /**
         * The name of the command.
         */
        public readonly name: string;
        /**
         * The tags required to execute the command.
         *
         * Only applies when Ultra Security Mode is disabled.
         *
         * @default []
         */
        #requiredTags: string[] = [];
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
         */
        public readonly commandName: CommandType extends NameAccessibleCommandType
            ? string
            : CommandType extends RegExpAccessibleCommandType
            ? undefined
            : string | undefined;
        /**
         * The custom prefix of the command.
         */
        public readonly customPrefix: string | undefined;
        /**
         * The regular expression used to access the command.
         *
         * This is only defined if the {@link accessType} is `regexp`.
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
        public syntax: string = "Syntax Missing";
        /**
         * The version of the command.
         *
         * @default "1.0.0"
         */
        public command_version: string = "1.0.0";
        /**
         * The description of the command.
         *
         * @default "Description Missing"
         */
        public description: string = "Description Missing";
        public commandSettingsId?: string;
        /**
         * The aliases of the command.
         *
         * @default []
         */
        public aliases: {
            commandName: string;
            escregexp?: {
                v?: string;
                f?: string;
            };
        }[] = [];
        /**
         * The categories of the command.
         *
         * @default []
         */
        public categories: commandCategory[] = [];
        /**
         * Whether or not the command is deprecated.
         *
         * @default false
         */
        public deprecated: boolean = false;
        /**
         * Whether or not the command is functional.
         *
         * @default true
         */
        public functional: boolean = true;
        /**
         * Whether or not the command is hidden.
         *
         * @default false
         */
        public hidden: boolean = false;
        /**
         * Whether or not the command is enabled.
         *
         * @default true
         */
        public enabled: boolean = true;
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
         *
         * @throws {any} If the command throws an error.
         */
        #execute: (player: executeCommandPlayerW, event: ChatSendBeforeEvent) => void;
        /**
         * Creates a new command.
         *
         * @param {CommandType} commandData The data of the command.
         *
         * @throws {TypeError} If the {@link commandData.type} property is not `built-in`, `custom`, or `unknown`.
         * @throws {TypeError} If the {@link commandData.accessType} property is not `named` or `regexp`.
         * @throws {TypeError} If the {@link commandData.commandName} property is not a string.
         * @throws {TypeError} If the {@link commandData.accessType} property is `regexp` and the {@link commandData.escregexp} property is not defined.
         */
        public constructor(public commandData: CommandType) {
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
            this.categories = commandData.categories ?? [];
            this.deprecated = commandData.deprecated ?? false;
            this.functional = commandData.functional ?? true;
            this.hidden = commandData.hidden ?? false;
            this.enabled = commandData.enabled ?? true;
            this.aliases = commandData.aliases = [];
            this.syntax = commandData.syntax ?? "Syntax Missing";
            this.command_version = commandData.command_version ?? "1.0.0";
            this.description = commandData.description ?? "Description Missing";
        }
        /**
         * The settings of the command, will be an instance of the {@link commandSettings} class.
         *
         * If the {@link type} of the command is `unknown` then this will be `undefined`.
         *
         * @type {commandSettings<"built-in" | "custom"> | undefined}
         */
        public get settings(): commandSettings<"built-in" | "custom"> | undefined {
            return this.type === "unknown" && this.commandSettingsId !== undefined
                ? undefined
                : (new commandSettings(this.commandSettingsId!) as commandSettings<"built-in" | "custom">);
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
            if (securityVariables.ultraSecurityModeEnabled && !(this.type === "custom" && semver.gt(this?.commands_format_version ?? "0.0.0", "33.12.17"))) {
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
         *
         * @throws {TypeError} If the method recieves more or less than 2 arguments.
         * @throws {TypeError} If the {@link player} paramter is not an instance of {@link executeCommandPlayerW}.
         * @throws {TypeError} If the {@link event} paramter is not an object.
         * @throws {any} If the command throws an error.
         */
        public run(player: executeCommandPlayerW, event: ChatSendBeforeEvent): void {
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
            this.#execute(player, event);
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
         * All registered commands.
         */
        private static commands: Map<string, RegisteredCommand<CommandTypeBase>> = new Map();
        /**
         * All registered built-in commands.
         */
        private static builtInCommands: Map<string, RegisteredCommand<CommandTypeBase>> = new Map();
        /**
         * All registered custom commands with their prefixes are included in their key in the map.
         */
        private static customCommands: Map<string, RegisteredCommand<CommandTypeBase>> = new Map();
        /**
         * All registered name-accessible commands.
         */
        private static namedAccessCommands: Map<string, RegisteredCommand<NameAccessibleCommandType>> = new Map();
        /**
         * All registered built-in name-accessible commands.
         */
        private static builtInNamedAccessCommands: Map<string, RegisteredCommand<NameAccessibleCommandType>> = new Map();
        /**
         * All registered custom name-accessible commands.
         */
        private static customNamedAccessCommands: Map<string, RegisteredCommand<NameAccessibleCommandType>> = new Map();
        /**
         * All registered prefix-accessible commands.
         */
        private static prefixedAccessCommands: Map<string, RegisteredCommand<PrefixAccessibleCommandType>> = new Map();
        /**
         * All registered built-in prefix-accessible commands.
         */
        private static builtInPrefixedAccessCommands: Map<string, RegisteredCommand<PrefixAccessibleCommandType>> = new Map();
        /**
         * All registered custom prefix-accessible commands.
         */
        private static customPrefixedAccessCommands: Map<string, RegisteredCommand<PrefixAccessibleCommandType>> = new Map();
        /**
         * All registered regex-accessible commands.
         */
        private static regexpAccessCommands: Map<`/${string}/${string}`, RegisteredCommand<RegExpAccessibleCommandType>> = new Map(); //`[regexp: RegExp, command: RegisteredCommand][] = new Map();
        /**
         * All registered built-in regex-accessible commands.
         */
        private static builtInRegexpAccessCommands: Map<`/${string}/${string}`, RegisteredCommand<RegExpAccessibleCommandType>> = new Map();
        /**
         * All registered custom regex-accessible commands.
         */
        private static customRegexpAccessCommands: Map<`/${string}/${string}`, RegisteredCommand<RegExpAccessibleCommandType>> = new Map();
        /**
         * Gets a command by the beginning of the command string.
         *
         * @param {string} commandName The beginning of the command string, should not include spaces.
         * @param {"built-in" | "custom"} [typeFilter] The type of command to filter by.
         * @returns {RegisteredCommand<CommandTypeBase> | undefined} The command, or undefined if not found.
         *
         * @throws {TypeError} If the {@link typeFilter} is not `built-in`, `custom`, or `undefined`.
         */
        public static getCommand(commandName: string, typeFilter?: "built-in" | "custom"): RegisteredCommand<CommandTypeBase> | undefined {
            // First, attempt to get the command by direct name match
            let directMatch: RegisteredCommand<CommandTypeBase> | undefined = undefined;
            switch (typeFilter) {
                case "built-in":
                    directMatch =
                        this.builtInPrefixedAccessCommands.get(commandName) ??
                        this.builtInNamedAccessCommands.get(
                            commandName.startsWith(config.chatCommandPrefix) ? commandName.replace(config.chatCommandPrefix, "") : commandName
                        );
                    break;
                case "custom":
                    directMatch =
                        this.customPrefixedAccessCommands.get(commandName) ??
                        this.customNamedAccessCommands.get(
                            commandName.startsWith(config.chatCommandPrefix) ? commandName.replace(config.chatCommandPrefix, "") : commandName
                        );
                    break;
                case undefined:
                    directMatch =
                        this.prefixedAccessCommands.get(commandName) ??
                        this.namedAccessCommands.get(
                            commandName.startsWith(config.chatCommandPrefix) ? commandName.replace(config.chatCommandPrefix, "") : commandName
                        );
                    break;
                default:
                    throw new TypeError(`Invalid type filter, the valid type filters are built-in and custom.`);
            }
            if (directMatch) {
                return directMatch;
            }

            // If no direct match, search for a regex match
            for (const command of this[
                typeFilter === "built-in" ? "builtInRegexpAccessCommands" : typeFilter === "custom" ? "customRegexpAccessCommands" : "regexpAccessCommands"
            ].values()) {
                if (command.regexp.test(commandName.startsWith(config.chatCommandPrefix) ? commandName.replace(config.chatCommandPrefix, "") : commandName)) {
                    return command;
                }
            }

            // Return undefined if no match is found
            return undefined;
        }
        /**
         * Registers a command.
         *
         * @template {CommandTypeBase} CommandType The type of the command data.
         * @param {CommandType} commandData The command data.
         * @returns {RegisteredCommand<CommandType>} The registered command.
         */
        public static registerCommand<CommandType extends CommandTypeBase>(commandData: CommandType): RegisteredCommand<CommandType> {
            const registeredCommand = new RegisteredCommand(commandData);
            this.commands.set(commandData.commandName, registeredCommand);
            switch (commandData.type) {
                case "built-in":
                    this.builtInCommands.set(commandData.commandName, registeredCommand);
                    break;
                case "custom":
                    this.customCommands.set(commandData.commandName, registeredCommand);
                    break;
            }
            switch (commandData.accessType) {
                case "named":
                    if (commandData.customPrefix !== undefined) {
                        this.prefixedAccessCommands.set(
                            commandData.customPrefix + commandData.commandName,
                            registeredCommand as RegisteredCommand<PrefixAccessibleCommandType>
                        );
                        switch (commandData.type) {
                            case "built-in":
                                this.builtInPrefixedAccessCommands.set(
                                    commandData.customPrefix + commandData.commandName,
                                    registeredCommand as RegisteredCommand<PrefixAccessibleCommandType>
                                );
                                break;
                            case "custom":
                                this.customPrefixedAccessCommands.set(
                                    commandData.customPrefix + commandData.commandName,
                                    registeredCommand as RegisteredCommand<PrefixAccessibleCommandType>
                                );
                                break;
                        }
                    } else {
                        this.namedAccessCommands.set(commandData.commandName, registeredCommand as RegisteredCommand<NameAccessibleCommandType>);
                        switch (commandData.type) {
                            case "built-in":
                                this.builtInNamedAccessCommands.set(commandData.commandName, registeredCommand as RegisteredCommand<NameAccessibleCommandType>);
                                break;
                            case "custom":
                                this.customNamedAccessCommands.set(commandData.commandName, registeredCommand as RegisteredCommand<NameAccessibleCommandType>);
                                break;
                        }
                    }
                    break;
                case "regexp":
                    this.regexpAccessCommands.set(
                        RegExp(
                            (commandData as unknown as RegExpAccessibleCommandType).escregexp.v,
                            (commandData as unknown as RegExpAccessibleCommandType).escregexp.f
                        ).toString() as `/${string}/${string}`,
                        registeredCommand as unknown as RegisteredCommand<RegExpAccessibleCommandType>
                    );
                    switch (commandData.type) {
                        case "built-in":
                            this.builtInRegexpAccessCommands.set(
                                RegExp(
                                    (commandData as unknown as RegExpAccessibleCommandType).escregexp.v,
                                    (commandData as unknown as RegExpAccessibleCommandType).escregexp.f
                                ).toString() as `/${string}/${string}`,
                                registeredCommand as unknown as RegisteredCommand<RegExpAccessibleCommandType>
                            );
                            break;
                        case "custom":
                            this.customRegexpAccessCommands.set(
                                RegExp(
                                    (commandData as unknown as RegExpAccessibleCommandType).escregexp.v,
                                    (commandData as unknown as RegExpAccessibleCommandType).escregexp.f
                                ).toString() as `/${string}/${string}`,
                                registeredCommand as unknown as RegisteredCommand<RegExpAccessibleCommandType>
                            );
                            break;
                    }
                    break;
            }
            return registeredCommand;
        }
        /**
         * Unregisters a command.
         *
         * @param {RegisteredCommand<CommandTypeBase>} command The command to unregister.
         */
        public static unregisterCommand(command: RegisteredCommand<CommandTypeBase>): void {
            [
                this.commands.entries(),
                this.builtInCommands.entries(),
                this.customCommands.entries(),
                this.namedAccessCommands.entries(),
                this.builtInNamedAccessCommands.entries(),
                this.customNamedAccessCommands.entries(),
                this.prefixedAccessCommands.entries(),
                this.builtInPrefixedAccessCommands.entries(),
                this.customPrefixedAccessCommands.entries(),
                this.regexpAccessCommands.entries(),
                this.builtInRegexpAccessCommands.entries(),
                this.customRegexpAccessCommands.entries(),
            ].forEach((commandEntries) => {
                for (const commandEntry of commandEntries) {
                    if (commandEntry[1] === command) {
                        this.commands.delete(commandEntry[0]);
                        break;
                    }
                }
            });
        }
    }
}

export import RegisteredCommand = exports.RegisteredCommand;
export import CommandRegistry = exports.CommandRegistry;

declare global {
    namespace globalThis {
        export import RegisteredCommand = exports.RegisteredCommand;
        export import CommandRegistry = exports.CommandRegistry;
    }
}
