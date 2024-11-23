import { command } from "modules/commands/classes/command";
import type { command_formats_type_list } from "modules/commands/types/command_formats_type_list";
export declare class commandSettings {
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
        escregexp: {
            v: string;
        };
        formats: command_formats_type_list;
        command_version: string;
        description: string;
        commandSettingsId: string;
        deprecated?: boolean;
        functional?: boolean;
        hidden?: boolean;
        enabled?: boolean;
    };
    constructor(commandSettingsId: string, command?: command);
    get parsed(): any;
    get enabled(): boolean;
    set enabled(enabled: boolean);
    get requiredTags(): string[];
    set requiredTags(requiredTags: string[]);
    get requiredPermissionLevel(): string | number | undefined;
    set requiredPermissionLevel(requiredPermissionLevel: string | number | undefined);
    get requiresOp(): boolean;
    set requiresOp(requiresOp: boolean);
    get settings_version(): any;
    get isSaved(): boolean;
    toJSON(): any;
    save(settings?: {
        type: "built-in" | "custom" | "unknown";
        commandName: string;
        customCommandId: string;
        commandSettingsId: string;
        enabled: boolean;
        requiredTags: string[];
        requiredPermissionLevel: string | number;
        requiresOp: boolean;
        settings_version: any;
    } | Object): void;
    remove(): void;
}
