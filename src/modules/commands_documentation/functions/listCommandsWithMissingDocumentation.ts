import { commandsyntaxes } from "modules/commands_documentation/constants/commandsyntaxes";
import { commandflags } from "modules/commands_documentation/constants/commandflags";
import { helpCommandChatCommandsList } from "modules/commands_documentation/constants/helpCommandChatCommandsList";
import { commanddescriptions } from "modules/commands_documentation/enums/commanddescriptions";
import { commands } from "modules/commands_list/constants/commands";

export function listCommandsWithMissingDocumentation(options: {onlyFunctional?: boolean, onlyNonFunctional?: boolean, onlyNonVersion0?: boolean, onlyVersion0?: boolean, onlyNonDeprecated?: boolean, onlyDeprecated?: boolean} = {}){
    const cmdsWithMissingDocs = [] as {
        commandName: string;
        missingFlagsList?: string;
        syntax: boolean;
        description: boolean;
        flags: boolean;
        list: boolean;
    }[];
    commands.forEach(c=>{
        const out = {
            commandName: c.commandName,
            syntax: false,
            description: false,
            flags: false,
            list: false,
        } as {
            commandName: string;
            missingFlagsList?: string;
            syntax: boolean;
            description: boolean;
            flags: boolean;
            list: boolean;
        };
        if(commandsyntaxes[c.commandName as keyof typeof commandsyntaxes] === undefined){
            out.syntax = true;
        };
        if(commanddescriptions[c.commandName as keyof typeof commanddescriptions] === undefined){
            out.description = true;
        };
        if(/\[-[a-zA-Z0-9]+\]/.test(commandsyntaxes[c.commandName as keyof typeof commandsyntaxes] ?? JSON.stringify(c.formats ?? "") ?? "") && commandflags[c.commandName as keyof typeof commandflags] === undefined){
            out.flags = true;
        }else if(commandflags[c.commandName as keyof typeof commandflags] !== undefined){
            if([...new Set(((commandsyntaxes[c.commandName as keyof typeof commandsyntaxes] as string ?? JSON.stringify(c.formats ?? "") ?? "").match(/(?<=\[-)[a-zA-Z0-9]+(?=\])/g) ?? []).join("").split(""))].some(v=>!(commandflags[c.commandName as keyof typeof commandflags] as string).includes("\n" + v + ": ") || (commandflags[c.commandName as keyof typeof commandflags] as string).startsWith(v + ": "))){
                out.flags = true;
                out.missingFlagsList = [...new Set(((commandsyntaxes[c.commandName as keyof typeof commandsyntaxes] as string ?? JSON.stringify(c.formats ?? "") ?? "").match(/(?<=\[-)[a-zA-Z0-9]+(?=\])/g) ?? []).join("").split(""))].filter(v=>!(commandflags[c.commandName as keyof typeof commandflags] as string).includes("\n" + v + ": ") || (commandflags[c.commandName as keyof typeof commandflags] as string).startsWith(v + ": ")).join("")
            }
        };
        if(!helpCommandChatCommandsList.includes("\n." + (c.commandName.startsWith("\\\\") ? c.commandName.slice(1) : c.commandName) + " ")){
            out.list = true;
        };
        if(!Object.values(out).filter(v=>typeof v === "boolean").every(v=>!v)){
            if((options.onlyFunctional===true ? c.functional===true : options.onlyNonFunctional===true ? c.functional===false : true) && (options.onlyNonVersion0===true ? c.command_version!=="0.0.0" : options.onlyVersion0===true ? c.command_version==="0.0.0" : true) && (options.onlyNonDeprecated===true ? c.deprecated===false : options.onlyDeprecated===true ? c.deprecated===true : true)){
                cmdsWithMissingDocs.push(out);
            }
        };
    });
    return cmdsWithMissingDocs;
}