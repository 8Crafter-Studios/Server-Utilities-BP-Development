import { Player, Entity, Dimension } from "@minecraft/server";
import { type command_formats_type_list } from "modules/commands/types/command_formats_type_list";
import { type evaluateParametersArgumentTypes } from "modules/commands/types/evaluateParametersArgumentTypes";
import { type commandCategory } from "modules/commands/types/commandCategory";
import { commandSettings } from "modules/commands/classes/commandSettings";
import { executeCommandPlayerW } from "modules/commands/classes/executeCommandPlayerW";
export declare class command {
    type: "built-in" | "custom" | "unknown";
    commandName: string;
    currentCommandName: string;
    parameters?: {
        name: string;
        internalType?: evaluateParametersArgumentTypes;
        type?: "string" | "integer" | "float" | "decimal" | "hexadecimal" | "binary" | "triary" | "base64" | "unicode" | "letter" | "regexp" | "text" | "message" | "any" | "customjson" | "escapablestring" | "boolean" | "array" | "number" | "object" | "javascript" | "json" | "identifier" | "targetselector" | "none" | string;
        displayType?: "string" | "str" | "integer" | "int" | "float" | "flt" | "decimal" | "dec" | "hexadecimal" | "hex" | "binary" | "bin" | "triary" | "tri" | "base64" | "b64" | "unicode" | "uni" | "letter" | "let" | "regexp" | "regex" | "text" | "txt" | "message" | "msg" | "anything" | "any" | "customJSON" | "cJSON" | "escapableString" | "escString" | "escStr" | "boolean" | "bool" | "array" | "arry" | "number" | "num" | "object" | "obj" | "JavaScript" | "JS" | "JavaScriptObjectNotation" | "JSON" | "identifier" | "id" | "uuid" | "UUID" | "xuid" | "XUID" | "cuid" | "CUID" | "targetSelector" | "target" | "" | "none" | string;
        evaluationType?: string;
    }[];
    escregexp?: {
        v: string;
        f?: string;
    };
    currentescregexp?: {
        v: string;
        f?: string;
    };
    selectedalias?: {
        index: number;
        alias: {
            commandName: string;
            escregexp?: {
                v: string;
                f?: string;
            };
            regexp: RegExp;
            aliasTo?: string;
        };
    };
    command_version?: string | number;
    formats: command_formats_type_list;
    description?: string;
    format_version: string | number;
    commands_format_version: string | number;
    customCommandId?: string;
    commandSettingsId: string;
    formatting_code: string;
    customCommandType?: "commands" | "javascript";
    customCommandPrefix?: string;
    customCommandParametersEnabled?: boolean;
    customCommandCodeLines?: number;
    customCommandParametersList?: evaluateParametersArgumentTypes[];
    category?: string | string[];
    categories?: string[];
    constructor(command: {
        type: "built-in" | "custom" | "unknown";
        formatting_code?: string;
        category?: string | string[];
        customCommandParametersList?: evaluateParametersArgumentTypes[];
        customCommandCodeLines?: number;
        customCommandParametersEnabled?: boolean;
        customCommandPrefix?: string;
        customCommandType?: "commands" | "javascript";
        customCommandId?: string;
        commandSettingsId?: string;
        command_version?: string | number;
        commandName: string;
        description?: string;
        escregexp?: {
            v: string;
            f?: string;
        };
        formats?: command_formats_type_list;
        format_version?: string | number;
        commands_format_version?: string | number;
    } | command);
    get isHidden(): boolean;
    get isDeprecated(): boolean;
    get isFunctional(): boolean;
    get releaseStage(): string;
    get regexp(): RegExp;
    get currentregexp(): RegExp;
    get aliases(): {
        commandName: string;
        escregexp?: {
            v: string;
            f?: string;
        };
        regexp: RegExp;
        aliasTo?: string;
    }[];
    get settings(): commandSettings;
    get code(): string[];
    save(): string;
    remove(): void;
    testCanPlayerUseCommand(player: Player | executeCommandPlayerW | Entity): boolean;
    run(commandstring: string, executor: Player | executeCommandPlayerW | Entity | Dimension, player?: Player | executeCommandPlayerW, event?: Object): void;
    static get(commandName: string, type?: "built-in" | "custom" | "unknown"): command;
    static findBuiltIn(commandString: string, returnCommandInsteadOfAlias?: boolean): {
        type: "custom" | "unknown" | "built-in";
        requiredTags: string[];
        formatting_code: string;
        commandName: string;
        escregexp: {
            v: string;
            f?: string;
        };
        formats: command_formats_type_list;
        command_version: string;
        description: string;
        commandSettingsId: string;
        aliases?: {
            commandName: string;
            escregexp?: {
                v?: string;
                f?: string;
            };
        }[];
        category?: commandCategory | commandCategory[];
        deprecated?: boolean;
        functional?: boolean;
        hidden?: boolean;
        enabled?: boolean;
    } | {
        index: number;
        alias: {
            commandName: string;
            escregexp?: {
                v: string;
                f?: string;
            };
            regexp: RegExp;
            aliasTo?: string;
        };
        aliasTo: {
            type: "custom" | "unknown" | "built-in";
            requiredTags: string[];
            formatting_code: string;
            commandName: string;
            escregexp: {
                v: string;
                f?: string;
            };
            formats: command_formats_type_list;
            command_version: string;
            description: string;
            commandSettingsId: string;
            aliases?: {
                commandName: string;
                escregexp?: {
                    v?: string;
                    f?: string;
                };
            }[];
            category?: commandCategory | commandCategory[];
            deprecated?: boolean;
            functional?: boolean;
            hidden?: boolean;
            enabled?: boolean;
        };
    };
    static getDefaultCommands(noSort?: boolean): command[];
    static getDefaultCommandsOfCategory(category: commandCategory, noSort?: boolean): command[];
    static getDefaultCommandsOfCategory(category: string, noSort?: boolean): command[];
    static getCommandAliases(): {
        [k: string]: {
            commandName: string;
            escregexp?: {
                v: string;
                f?: string;
            };
            regexp: RegExp;
            aliasTo?: string;
        }[];
    };
    static getCustomCommands(noSort?: boolean): command[];
    static get defaultPrefix(): string;
    static get dp(): string;
}
