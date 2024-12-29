import { world } from "@minecraft/server";
import { command, command as commandClass } from "modules/commands/classes/command";
import { command_settings_format_version } from "modules/commands/constants/command_settings_format_version";
import type { command_formats_type_list } from "modules/commands/types/command_formats_type_list";
import { commands } from "modules/commands_list/constants/commands";

export class commandSettings<T extends "built-in" | "custom" | "unknown" = "unknown"> {
    type: T;
    commandName: string;
    customCommandId?: string;
    commandSettingsId: string;
    command?: command<T>;
    defaultSettings?: T extends "built-in" | "unknown" ? {
        type: T;
        requiredTags: string[];
        formatting_code: string;
        commandName: string;
        escregexp: { v: string; };
        formats: command_formats_type_list;
        command_version: string;
        description: string;
        commandSettingsId: string;
        deprecated?: boolean;
        functional?: boolean;
        hidden?: boolean;
        enabled?: boolean;
    } : {
        type: T;
        requiredTags: string[];
        formatting_code?: any;
        commandName: string;
        escregexp?: any;
        formats?: any;
        command_version: string;
        description?: any;
        commandSettingsId: string;
        deprecated?: any;
        functional?: any;
        hidden?: any;
        enabled?: any;
    };
    #unsaved_props = {};
    constructor(commandSettingsId: string, command?: command<T>) {
        this.type = (commandSettingsId.startsWith("built-inCommandSettings:")
            ? "built-in"
            : commandSettingsId.startsWith("customCommandSettings:")
                ? "custom"
                : "unknown") as T;
        this.commandName = commandSettingsId.startsWith(
            "built-inCommandSettings:"
        )
            ? commandSettingsId.slice(24)
            : commandSettingsId.startsWith("customCommandSettings:")
                ? commandSettingsId.slice(22)
                : commandSettingsId;
        this.commandName =
            this.commandName.slice(0, commandClass.dp.length) ==
                commandClass.dp &&
                this.commandName.slice(
                    commandClass.dp.length,
                    commandClass.dp.length + 1
                ) != "\\"
                ? "\\" + this.commandName
                : this.commandName;
        this.commandSettingsId = commandSettingsId;
        this.customCommandId =
            this.type == "custom"
                ? command?.customCommandId ??
                "customCommand:" + this.commandName
                : undefined;
        this.command = command;
        this.defaultSettings =
            this.type == "built-in" || this.type == "unknown"
                ? commands.find((v) => v.commandName == this.commandName) as unknown as typeof this.defaultSettings
                : {
                    type: "custom",
                    requiredTags: ["canUseChatCommands"],
                    commandName: this.commandName,
                    customCommandId: this.customCommandId,
                    commandSettingsId: this.commandSettingsId,
                    enabled: true,
                    requiredPermissionLevel: 0,
                    requiresOp: false,
                    settings_version: this.settings_version,
                } as unknown as typeof this.defaultSettings;
    }
    get parsed() {
        return JSONParse(
            String(world.getDynamicProperty(this.commandSettingsId))
        );
    }
    get enabled() {
        return (
            (this?.parsed?.enabled as boolean) ??
            this?.defaultSettings?.enabled ??
            true
        );
    }
    set enabled(enabled) {
        this.save({enabled});
    }
    get requiredTags() {
        return (
            (this?.parsed?.requiredTags as string[]) ??
            this?.defaultSettings?.requiredTags ?? ["canUseChatCommands"]
        );
    }
    set requiredTags(requiredTags) {
        this.save({requiredTags});
    }
    get requiredPermissionLevel() {
        return (this?.parsed?.requiredPermissionLevel as string | number) ?? 0;
    }
    set requiredPermissionLevel(
        requiredPermissionLevel: string | number | undefined
    ) {
        this.save({requiredPermissionLevel});
    }
    get requiresOp() {
        return (this?.parsed?.requiresOp as boolean) ?? false;
    }
    set requiresOp(requiresOp) {
        this.save({requiresOp});
    } /*
    get description(){return this?.parsed?.description ?? true}*/

    get settings_version() {
        return (
            this?.parsed?.settings_version ?? command_settings_format_version
        );
    }
    get isSaved() {
        return world.getDynamicProperty(this.commandSettingsId) != undefined;
    }
    toJSON() {
        return Object.assign(
            JSONParse(JSONStringify(this.defaultSettings ?? {})),
            {
                type: this.type,
                commandName: this.commandName,
                customCommandId: this.customCommandId,
                commandSettingsId: this.commandSettingsId,
                enabled: this.enabled,
                requiredTags: this.requiredTags,
                requiredPermissionLevel: this.requiredPermissionLevel,
                requiresOp: this.requiresOp,
                settings_version: this.settings_version,
            }
        );
    }
    save(
        settings?: {
            type: "built-in" | "custom" | "unknown";
            commandName: string;
            customCommandId: string;
            commandSettingsId: string;
            enabled: boolean;
            requiredTags: string[];
            requiredPermissionLevel: string | number;
            requiresOp: boolean;
            settings_version: any;
        } |
            Object
    ) {
        world.setDynamicProperty(
            this.commandSettingsId,
            JSONStringify(
                Object.assign(
                    JSONParse(
                        JSONStringify(
                            this.defaultSettings ?? {
                                type: this.type,
                                commandName: this.commandName,
                                customCommandId: this.customCommandId,
                                commandSettingsId: this.commandSettingsId,
                                enabled: this.enabled,
                                requiredTags: this.requiredTags,
                                requiredPermissionLevel: this.requiredPermissionLevel,
                                requiresOp: this.requiresOp,
                                settings_version: this.settings_version,
                            }
                        )
                    ),
                    settings ?? {}
                )
            )
        );
    }
    remove() {
        world.setDynamicProperty(this.commandSettingsId);
    }
}
