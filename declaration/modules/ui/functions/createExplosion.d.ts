import { Entity, Player, Dimension, type ExplosionOptions } from "@minecraft/server";
import { executeCommandPlayerW } from "../../../Main/commands";
export declare function createExplosion(sourceEntitya: Entity | executeCommandPlayerW | Player, parameterDefaults?: {
    x?: number;
    y?: number;
    z?: number;
    dimension?: Dimension;
    radius?: number;
    explosionOptions?: ExplosionOptions;
    source?: string;
}): void;
