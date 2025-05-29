import { Player } from "@minecraft/server";
import { executeCommandPlayerW } from "./executeCommandPlayerW";

/**
 * Represents a player for the `\execute` command.
 */
export class executeCommandPlayer extends executeCommandPlayerW implements Pick<Player, "id" | "name"> {
    public get id() {
        return this.player?.id!;
    }
    public get name() {
        return this.player?.name!;
    }
}
