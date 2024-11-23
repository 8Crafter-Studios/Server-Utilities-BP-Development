import type { Entity, Player } from "@minecraft/server";
import type { executeCommandPlayerW } from "modules/commands/classes/executeCommandPlayerW";

export function getEquipment(
    containerBlockPlayerOrEntity: Entity | executeCommandPlayerW | Player
) {
    return containerBlockPlayerOrEntity.getComponent("equippable");
}
