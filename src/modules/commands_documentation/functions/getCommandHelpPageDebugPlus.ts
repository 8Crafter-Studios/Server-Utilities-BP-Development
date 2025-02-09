import type { Player, Entity } from "@minecraft/server";
import { command } from "modules/commands/classes/command";
import type { executeCommandPlayerW } from "modules/commands/classes/executeCommandPlayerW";
import { commandflags } from "modules/commands_documentation/constants/commandflags";
import { commandsyntaxes } from "modules/commands_documentation/constants/commandsyntaxes";
import { commanddescriptions } from "modules/commands_documentation/enums/commanddescriptions";

export function getCommandHelpPageDebugPlus(commandName: string, player?: Player | executeCommandPlayerW | Entity, spacing: number = 0) {
    let cmd = command.get(((commandName.slice(0, command.dp.length) == command.dp) && (commandName.slice(command.dp.length, command.dp.length + 1) != "\\")) ? commandName.slice(1) : commandName, "built-in");
    return !!!commanddescriptions[cmd.commandName as keyof typeof commanddescriptions] && !!!commandsyntaxes[cmd.commandName as keyof typeof commandsyntaxes] && !!!commandflags[cmd.commandName as keyof typeof commandflags] && !!!cmd.command_version
        ? `§cError: Unknown command "${cmd.commandName}§r§c", check that the command exists, if it does then there is just no help info for it, if you specified an alias of a command try using the full name of the command instead.`
        : `§e${cmd.commandName}${(cmd.aliases?.length ?? 0) != 0 ? ` (also ${cmd.aliases.map((v) => v.commandName).join(", ")})` : ""}:\n${commanddescriptions[cmd.commandName as keyof typeof commanddescriptions]}§r\nUsage:\n- ${(
            commandsyntaxes[cmd.currentCommandName as keyof typeof commandsyntaxes] ?? "missing"
        )
            .split("\n")
            .join("§r\n- ")}${!!!commandflags[cmd.currentCommandName as keyof typeof commandflags]
            ? ""
            : "§r\nFlags:\n" + commandflags[cmd.currentCommandName as keyof typeof commandflags].split("\n").join("§r\n")}${!!!cmd.command_version
            ? ""
            : "§r\nVersion: " + cmd.formatting_code + cmd.command_version}${!!!cmd.category
            ? ""
            : "§r\nCategories: " + JSON.stringify(cmd.categories, (k, v) => { if (typeof v == "string") { return "§r" + v + "§r"; } else { return v; } })}${!!!cmd.settings?.defaultSettings
            ? ""
            : "§r\nBuilt-In Raw Command Data: " + JSON.stringify(Object.fromEntries(Object.entries(cmd.settings.defaultSettings).map(v => v[0] == "formatting_code" ? [v[0], v[1]["replaceAll"]("§", "\uF019")] : v)), (k, v) => { if (typeof v == "string") { return "§r" + v + "§r"; } else { return v; } }, spacing)}${!!!cmd.settings
            ? ""
            : "§r\nRaw Settings: " + JSON.stringify(Object.fromEntries(Object.entries(cmd.settings).map(v => v[0] == "formatting_code" ? [v[0], v[1]["replaceAll"]("§", "\uF019")] : v)), (k, v) => { if (typeof v == "string") { return "§r" + v + "§r"; } else { return v; } }, spacing)}§r\nType: ${cmd.type}§r\n${!cmd.settings.enabled
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
