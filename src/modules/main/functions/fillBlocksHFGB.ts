import { type Vector3, Dimension, type DimensionLocation, BlockPermutation, system, UnloadedChunksError } from "@minecraft/server";
import { clearContainer } from "modules/command_utilities/functions/clearContainer";
import { testBlockForMatch } from "modules/commands/functions/testBlockForMatch";
import { generatorProgress } from "modules/coordinates/constants/generatorProgress";
import { generateFillBG } from "modules/coordinates/functions/generateFillBG";
import { generatorProgressIdGenerator } from "modules/coordinates/functions/generatorProgressIdGenerator";
import type { fillBlocksHFGBM } from "./fillBlocksHFGBM"

/**
 * Generates a fill.
 * @deprecated Legacy function. Superceeded by {@link fillBlocksHFGBM}.
 * @async
 * @param {Vector3} begin The location of a corner of the area to fill in.
 * @param {Vector3} end The location of the opposite corner of the area to fill in.
 * @param {Dimension} dimension The dimension to generate the fill in.
 * @param block The function to determine the BlockPermutation to generate.
 * @param options Optional extra options for the fill generation execution.
 * @param options.matchingBlock The type of the block mask to match.
 * @param options.matchingBlockStates The block states of the block mask to match.
 * @param options.minMSBetweenYields The shortest the generation can run for before pausing until the next tick.
 * @param replacemode Whether or not to clear container blocks before replacing them.
 * @param integrity The integrity of the fill generation.
 * @returns A promise that resolves with the details of the fill generation once the fill generation is complete.
 */
export async function fillBlocksHFGB(
    begin: Vector3,
    end: Vector3,
    dimension: Dimension,
    block: (location: DimensionLocation, index: bigint) => BlockPermutation,
    options?: {
        matchingBlock?: string;
        matchingBlockStates?: Record<string, string | number | boolean>;
        minMSBetweenYields?: number;
    },
    replacemode: boolean = false,
    integrity: number = 100
) {
    let counter = 0;
    const id = generatorProgressIdGenerator();
    if (!!!options?.matchingBlock) {
        if (replacemode) {
            system.runJob(
                generateFillBG(
                    begin,
                    end,
                    dimension,
                    id,
                    options?.minMSBetweenYields ?? 2000,
                    (v, index) => {
                        try {
                            if (!!v.dimension
                                .getBlock(v)
                                ?.getComponent("inventory")) {
                                clearContainer(
                                    v.dimension
                                        .getBlock(v)
                                        ?.getComponent("inventory")?.container
                                );
                            }
                            v.dimension
                                .getBlock(v)
                                ?.setPermutation(block(v, index));
                            counter++;
                        } catch (e) {
                            if (e instanceof TypeError ||
                                e instanceof UnloadedChunksError) {
                                generatorProgress[id]!.containsUnloadedChunks =
                                    true;
                            }
                        }
                    },
                    undefined,
                    integrity
                )
            );
        } else {
            system.runJob(
                generateFillBG(
                    begin,
                    end,
                    dimension,
                    id,
                    options?.minMSBetweenYields ?? 2000,
                    (v, index) => {
                        try {
                            v.dimension
                                .getBlock(v)
                                ?.setPermutation(block(v, index));
                            counter++;
                        } catch (e) {
                            if (e instanceof TypeError ||
                                e instanceof UnloadedChunksError) {
                                generatorProgress[id]!.containsUnloadedChunks =
                                    true;
                            }
                        }
                    },
                    undefined,
                    integrity
                )
            );
        }
    } else {
        let currentBlock = undefined! as BlockPermutation;
        if (replacemode) {
            system.runJob(
                generateFillBG(
                    begin,
                    end,
                    dimension,
                    id,
                    options?.minMSBetweenYields ?? 2000,
                    (v, index) => {
                        currentBlock = block(v, index);
                        try {
                            if (!!options?.matchingBlockStates
                                ? testBlockForMatch(
                                    v.dimension.getBlock(v),
                                    {
                                        id: options?.matchingBlock,
                                        states: options?.matchingBlockStates,
                                    }
                                )
                                : options?.matchingBlock ==
                                v.dimension.getBlock(v)?.typeId) {
                                if (!!v.dimension
                                    .getBlock(v)
                                    ?.getComponent("inventory")) {
                                    clearContainer(
                                        v.dimension
                                            .getBlock(v)
                                            ?.getComponent("inventory")?.container
                                    );
                                }
                                v.dimension
                                    .getBlock(v)
                                    ?.setPermutation(currentBlock);
                                counter++;
                            }
                        } catch (e) {
                            if (e instanceof TypeError ||
                                e instanceof UnloadedChunksError) {
                                generatorProgress[id]!.containsUnloadedChunks =
                                    true;
                            }
                        }
                    },
                    undefined,
                    integrity
                )
            );
        } else {
            system.runJob(
                generateFillBG(
                    begin,
                    end,
                    dimension,
                    id,
                    options?.minMSBetweenYields ?? 2000,
                    (v, index) => {
                        currentBlock = block(v, index);
                        try {
                            if (!!options?.matchingBlockStates
                                ? testBlockForMatch(
                                    v.dimension.getBlock(v),
                                    {
                                        id: options?.matchingBlock,
                                        states: options?.matchingBlockStates,
                                    }
                                )
                                : options?.matchingBlock ==
                                v.dimension.getBlock(v)?.typeId) {
                                v.dimension
                                    .getBlock(v)
                                    ?.setPermutation(currentBlock);
                                counter++;
                            }
                        } catch (e) {
                            if (e instanceof TypeError ||
                                e instanceof UnloadedChunksError) {
                                generatorProgress[id]!.containsUnloadedChunks =
                                    true;
                            }
                        }
                    },
                    undefined,
                    integrity
                )
            );
        }
    }
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
