import type { command_formats_type_list } from "modules/commands/types/command_formats_type_list";
import type { commandCategory } from "modules/commands/types/commandCategory";
export declare const commands: {
    type: "built-in";
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
    category?: commandCategory | (commandCategory)[];
    deprecated?: boolean;
    functional?: boolean;
    hidden?: boolean;
    enabled?: boolean;
}[];
