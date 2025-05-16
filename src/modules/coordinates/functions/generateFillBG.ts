import { type Vector3, Dimension, type DimensionLocation, system } from "@minecraft/server";
import { generatorProgress } from "modules/coordinates/constants/generatorProgress";

export function* generateFillBG(
    begin: Vector3,
    end: Vector3,
    dimension: Dimension,
    generatorProgressId: string,
    minMSBetweenYields: number = 2000,
    placeBlockCallback: (
        location: DimensionLocation,
        index: bigint
    ) => any = () => { },
    onComplete: () => any = () => { },
    integrity: number = 100
) {
    try {
        generatorProgress[generatorProgressId] = {
            done: false,
            startTick: system.currentTick,
            startTime: Date.now(),
            containsUnloadedChunks: false,
        };
        var msSinceLastYieldStart = Date.now();
        var index = 0n;
        if (integrity != 100) {
            for (let x = Math.min(begin.x, end.x); x <= Math.max(begin.x, end.x); x++) {
                for (let y = Math.min(begin.y, end.y); y <= Math.max(begin.y, end.y); y++) {
                    for (let z = Math.min(begin.z, end.z); z <= Math.max(begin.z, end.z); z++) {
                        if (Math.random() <= integrity / 100) {
                            placeBlockCallback(
                                { x: x, y: y, z: z, dimension: dimension },
                                index
                            );
                        }
                        index++;
                    }
                    if (Date.now() - msSinceLastYieldStart >=
                        minMSBetweenYields) {
                        msSinceLastYieldStart = Date.now();
                        yield undefined! as void;
                    }
                }
                if (Date.now() - msSinceLastYieldStart >= minMSBetweenYields) {
                    msSinceLastYieldStart = Date.now();
                    yield undefined! as void;
                }
            }
        } else {
            for (let x = Math.min(begin.x, end.x); x <= Math.max(begin.x, end.x); x++) {
                for (let y = Math.min(begin.y, end.y); y <= Math.max(begin.y, end.y); y++) {
                    for (let z = Math.min(begin.z, end.z); z <= Math.max(begin.z, end.z); z++) {
                        placeBlockCallback(
                            { x: x, y: y, z: z, dimension: dimension },
                            index
                        );
                        index++;
                    }
                    if (Date.now() - msSinceLastYieldStart >=
                        minMSBetweenYields) {
                        msSinceLastYieldStart = Date.now();
                        yield undefined! as void;
                    }
                }
                if (Date.now() - msSinceLastYieldStart >= minMSBetweenYields) {
                    msSinceLastYieldStart = Date.now();
                    yield undefined! as void;
                }
            }
        }
        onComplete();
        generatorProgress[generatorProgressId].endTick = system.currentTick;
        generatorProgress[generatorProgressId].endTime = Date.now();
        generatorProgress[generatorProgressId].done = true;
        return;
    } catch (e) {
        generatorProgress[generatorProgressId].endTick = system.currentTick;
        generatorProgress[generatorProgressId].endTime = Date.now();
        generatorProgress[generatorProgressId].done = true;
        throw e;
    }
}
