import type { Block } from "@minecraft/server";
import { clearContainer } from "modules/command_utilities/functions/clearContainer";

export function clearAllContainerBlocks(blocks: Block[]): Block[] {
    blocks.forEach((v) => clearContainer(v.getComponent("inventory")?.container));
    return blocks;
}
