import { world } from "@minecraft/server";
import { command, commandClass } from "modules/commands/classes/command";
import { command_settings_format_version } from "modules/commands/constants/command_settings_format_version";
import type { command_formats_type_list } from "Main/command_formats_type_list";
import { commands } from "../../../Main/commands_list";

export class commandSettings {
    type: "built-in" | "custom" | "unknown";
    commandName: string;
    customCommandId?: string;
    commandSettingsId: string;
    command?: command;
    defaultSettings?: {
        type: "built-in" | "custom" | "unknown";
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
    };
    constructor(commandSettingsId: string, command?: command) {
        this.type = commandSettingsId.startsWith("built-inCommandSettings:")
            ? "built-in"
            : commandSettingsId.startsWith("customCommandSettings:")
                ? "custom"
                : "unknown";
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
                ? commands.find((v) => v.commandName == this.commandName)
                : undefined;
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
        this.enabled = enabled;
    }
    get requiredTags() {
        return (
            (this?.parsed?.requiredTags as string[]) ??
            this.defaultSettings.requiredTags ?? ["canUseChatCommands"]
        );
    }
    set requiredTags(requiredTags) {
        this.requiredTags = requiredTags;
    }
    get requiredPermissionLevel() {
        return (this?.parsed?.requiredPermissionLevel as string | number) ?? 0;
    }
    set requiredPermissionLevel(
        requiredPermissionLevel: string | number | undefined
    ) {
        this.requiredPermissionLevel = requiredPermissionLevel;
    }
    get requiresOp() {
        return (this?.parsed?.requiresOp as boolean) ?? false;
    }
    set requiresOp(requiresOp) {
        this.requiresOp = requiresOp;
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
