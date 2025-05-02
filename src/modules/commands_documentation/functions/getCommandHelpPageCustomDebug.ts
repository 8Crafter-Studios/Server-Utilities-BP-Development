import type { Player, Entity } from "@minecraft/server";
import { command } from "modules/commands/classes/command";
import type { executeCommandPlayerW } from "modules/commands/classes/executeCommandPlayerW";
import { commandflags } from "modules/commands_documentation/constants/commandflags";
import { commandsyntaxes } from "modules/commands_documentation/constants/commandsyntaxes";
import { commanddescriptions } from "modules/commands_documentation/enums/commanddescriptions";

export function getCommandHelpPageCustomDebug(commandName: string, player?: Player | executeCommandPlayerW | Entity, spacing: number = 0) {
    let cmd = command.get(
        commandName.slice(0, command.dp.length) == command.dp && commandName.slice(command.dp.length, command.dp.length + 1) != "\\"
            ? commandName.slice(1)
            : commandName,
        "custom"
    );
    return !cmd.settings.isSaved
        ? `§cError: Unknown custom command "${cmd.commandName}§r§c", check that the command exists, if it does then there is just no help info for it.`
        : `§e${cmd.commandName}:\n${commanddescriptions[cmd.commandName as keyof typeof commanddescriptions]}§r\nUsage:\n- ${(
              commandsyntaxes[cmd.currentCommandName as keyof typeof commandsyntaxes] ?? "missing"
          )
              .split("\n")
              .join("§r\n- ")}${
              !!!commandflags[cmd.currentCommandName as keyof typeof commandflags]
                  ? ""
                  : "§r\nFlags:\n" + commandflags[cmd.currentCommandName as keyof typeof commandflags].split("\n").join("§r\n")
          }${!!!cmd.command_version ? "" : "§r\nVersion: " + cmd.formatting_code + cmd.command_version}${
              !!!cmd.category ? "" : "§r\nCategories: " + JSON.stringify(cmd.categories)
          }${
              !!!cmd.settings
                  ? ""
                  : "§r\nRaw Settings: " +
                    JSON.stringify(
                        Object.fromEntries(
                            Object.entries(cmd.settings).map((v) => (v[0] == "formatting_code" ? [v[0], v[1]["replaceAll"]("§", "\uF019")] : v))
                        ),
                        (k, v) => {
                            if (typeof v == "string") {
                                return "§r" + v + "§r";
                            } else {
                                return v;
                            }
                        },
                        spacing
                    )
          }${
              !!!cmd
                  ? ""
                  : "§r\nRaw Command Data: " +
                    JSON.stringify(
                        Object.fromEntries(Object.entries(cmd).map((v) => (v[0] == "formatting_code" ? [v[0], v[1]["replaceAll"]("§", "\uF019")] : v))),
                        (k, v) => {
                            if (typeof v == "string") {
                                return "§r" + v + "§r";
                            } else {
                                return v;
                            }
                        },
                        spacing
                    )
          }§r\nType: ${cmd.type}§r\n${!cmd.settings.enabled ? "§cDISABLED" : "§aENABLED"}${
              !!player ? (cmd.testCanPlayerUseCommand(player) ? "" : "\n§cYou do not have permission to use this command!") : ""
          }`;
}
