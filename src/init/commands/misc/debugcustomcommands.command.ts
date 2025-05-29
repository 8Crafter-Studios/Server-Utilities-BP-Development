export const registeredDeubgcustomcommandsCommand = CommandRegistry.registerCommand({
    commandName: "debugcustomcommands",
    aliases: [{ commandName: "debugcustomcommand" }, { commandName: "dcc" }],
    description: "Debugs the custom commands.",
    type: "built-in",
    accessType: "named",
    callback(player, event): void {
        pdcsend(player, {
            message: "debug",
            event,
        });
    },
    formatting_code: "§d",
    requiredTags: ["debug"],
    command_version: "0.0.1",
    category: ["system"],
    ultraSecurityModeSecurityLevel: "admin",
});
