import type { Entity, Player } from "@minecraft/server";
import { executeCommandPlayerW } from "../../../Main/commands";

export function entityController(
    sourceEntitya: Entity | executeCommandPlayerW | Player
) {
    const sourceEntity = sourceEntitya instanceof executeCommandPlayerW
        ? sourceEntitya.player
        : sourceEntitya;
}
