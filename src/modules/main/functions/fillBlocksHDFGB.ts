import { type Vector3, Dimension, system, LocationInUnloadedChunkError } from "@minecraft/server";
import { generatorProgress } from "modules/coordinates/constants/generatorProgress";
import { generateFillBG } from "modules/coordinates/functions/generateFillBG";
import { generatorProgressIdGenerator } from "modules/coordinates/functions/generatorProgressIdGenerator";
import type { fillDrain } from "modules/block_generation_utilities/functions/fillDrain"

/**
 * Generates a drain fill.
 * @deprecated Legacy function. Superceeded by {@link fillDrain}.
 * @async
 * @param {Vector3} begin The location of a corner of the area to drain.
 * @param {Vector3} end The location of the opposite corner of the area to drain.
 * @param {Dimension} dimension The dimension to generate the drain fill in.
 * @param options Optional extra options for the fill generation execution.
 * @param options.minMSBetweenYields The shortest the generation can run for before pausing until the next tick.
 * @param integrity The integrity of the drain fill generation.
 * @returns A promise that resolves with the details of the drain fill generation once the drain fill generation is complete.
 */
export async function fillBlocksHDFGB(
    begin: Vector3,
    end: Vector3,
    dimension: Dimension,
    options?: { minMSBetweenYields?: number; },
    integrity: number = 100
) {
    let counter = 0;
    const id = generatorProgressIdGenerator();
    system.runJob(
        generateFillBG(
            begin,
            end,
            dimension,
            id,
            options?.minMSBetweenYields ?? 2000,
            (v) => {
                try {
                    if ([
                        "minecraft:water",
                        "minecraft:flowing_water",
                        "minecraft:lava",
                        "minecraft:flowing_lava",
                    ].includes(v.dimension.getBlock(v)!?.typeId)) {
                        v.dimension.getBlock(v)?.setType("minecraft:air");
                        counter++;
                    } else if (v.dimension.getBlock(v)?.canContainLiquid(modules.mcServer.LiquidType.Water) == true &&
                        v.dimension.getBlock(v)?.isWaterlogged) {
                        v.dimension.getBlock(v)?.setWaterlogged(false);
                        counter++;
                    }
                } catch (e) {
                    if (e instanceof TypeError ||
                        e instanceof LocationInUnloadedChunkError) {
                        generatorProgress[id]!.containsUnloadedChunks = true;
                    }
                }
            },
            undefined,
            integrity
        )
    );
    return new Promise(
        (
            resolve: (value: {
                counter: number;
                completionData: {
                    done: boolean;
                    startTick: number;
                    endTick?: number;
                    startTime: number;
                    endTime?: number;
                    containsUnloadedChunks?: boolean;
                };
            }) => void,
            reject
        ) => {
            function a() {
                if (generatorProgress[id]?.done !== true) {
                    system.run(() => {
                        a();
                    });
                } else {
                    let returns = generatorProgress[id];
                    delete generatorProgress[id];
                    resolve({ counter: counter, completionData: returns });
                }
            }
            a();
        }
    );
}
