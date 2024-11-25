import type { Player } from "@minecraft/server";
import type { executeCommandPlayerW } from "modules/commands/classes/executeCommandPlayerW";

globalThis.perror = function perror(
    player: Player | executeCommandPlayerW,
    error: Error,
    prefix: string = "§c"
) {
    player.sendMessage(
        prefix + (tryget(() => error.stringify()) ?? error + " " + error.stack)
    );
};
