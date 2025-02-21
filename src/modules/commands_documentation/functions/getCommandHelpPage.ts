import type { Player, Entity } from "@minecraft/server";
import type { command_formats_type_list } from "modules/commands/types/command_formats_type_list";
import { command } from "modules/commands/classes/command";
import type { executeCommandPlayerW } from "modules/commands/classes/executeCommandPlayerW";
import { commandflags } from "modules/commands_documentation/constants/commandflags";
import { commandsyntaxes } from "modules/commands_documentation/constants/commandsyntaxes";
import { commanddescriptions } from "modules/commands_documentation/enums/commanddescriptions";

export function getCommandHelpPage(commandName: string, player?: Player | executeCommandPlayerW | Entity) {
    let cmd = command.get(((commandName.slice(0, command.dp.length) == command.dp) && (commandName.slice(command.dp.length, command.dp.length + 1) != "\\")) ? commandName.slice(1) : commandName, "built-in");
    return !!!commanddescriptions[cmd.commandName as keyof typeof commanddescriptions] && !!!commandsyntaxes[cmd.commandName as keyof typeof commandsyntaxes] && !!!commandflags[cmd.commandName as keyof typeof commandflags] && !!!cmd.command_version && !cmd.isHidden
        ? `§cError: Unknown command "${cmd.commandName}§r§c", check that the command exists, if it does then there is just no help info for it, if you specified an alias of a command try using the full name of the command instead.`
        : `§e${cmd.commandName}${(cmd.aliases?.length ?? 0) != 0 ? ` (also ${cmd.aliases.map((v) => v.commandName).join(", ")})` : ""}:\n${commanddescriptions[cmd.commandName as keyof typeof commanddescriptions] ?? cmd.description}§r\nUsage:\n- ${(
            commandsyntaxes[cmd.currentCommandName as keyof typeof commandsyntaxes] ?? commandsyntaxes[cmd.commandName as keyof typeof commandsyntaxes]?.replaceAll((cmd.commandName.startsWith("\\\\") ? command.dp + cmd.commandName.slice(1) : command.dp + cmd.commandName) + " ", (cmd.currentCommandName.startsWith("\\\\") ? command.dp + cmd.currentCommandName.slice(1) : command.dp + cmd.currentCommandName) + " ") ?? tryget(() => (cmd.formats as { format: string | command_formats_type_list; description?: string; }[])?.["map"](v => !!v?.format ? v.format : v).join(" ")) ?? (typeof cmd.formats == "string" ? cmd.formats : undefined) ?? "missing"
        )
            .split("\n")
            .join("§r\n- ")}${!!!commandflags[cmd.currentCommandName as keyof typeof commandflags]
            ? ""
            : "\nFlags:\n" + commandflags[cmd.currentCommandName as keyof typeof commandflags].split("\n").join("§r\n")}${!!!cmd.command_version
            ? ""
            : "\nVersion: " + cmd.formatting_code + cmd.command_version}§r\nType: ${cmd.type}§r\n${!cmd.settings.enabled
            ? "§cDISABLED"
            : "§aENABLED"}${!cmd.isDeprecated
            ? ""
            : "\n§cThis command is deprecated!"}${cmd.isFunctional
            ? ""
            : "\n§cThis command is not functional!"}${!!player
            ? cmd.testCanPlayerUseCommand(player)
                ? ""
                : "\n§cYou do not have permission to use this command!"
            : ""}`;
}
