import { type Vector3, Dimension, type DimensionLocation, system } from "@minecraft/server";
import { generatorProgress } from "modules/coordinates/constants/generatorProgress";

export function* generateHollowSphereBG(
    center: Vector3,
    radius: number,
    thickness: number,
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
        const centerX = center.x;
        const centerY = center.y;
        const centerZ = center.z;
        generatorProgress[generatorProgressId] = {
            done: false,
            startTick: system.currentTick,
            startTime: Date.now(),
            containsUnloadedChunks: false,
        };
        var index = 0n;
        var msSinceLastYieldStart = Date.now();
        if (integrity != 100) {
            for (let x = centerX - radius; x <= centerX + radius; x++) {
                for (let y = centerY - radius; y <= centerY + radius; y++) {
                    for (let z = centerZ - radius; z <= centerZ + radius; z++) {
                        const distance = Math.sqrt(
                            (x - centerX) ** 2 +
                            (y - centerY) ** 2 +
                            (z - centerZ) ** 2
                        );
                        if (distance >= radius - thickness &&
                            distance <= radius) {
                            if (Math.random() <= integrity / 100) {
                                placeBlockCallback(
                                    { x: x, y: y, z: z, dimension: dimension },
                                    index
                                );
                            }
                            index++;
                        }
                    }
                    if (Date.now() - msSinceLastYieldStart >=
                        minMSBetweenYields) {
                        msSinceLastYieldStart = Date.now();
                        yield undefined as void;
                    }
                }
                if (Date.now() - msSinceLastYieldStart >= minMSBetweenYields) {
                    msSinceLastYieldStart = Date.now();
                    yield undefined as void;
                }
            }
        } else {
            for (let x = centerX - radius; x <= centerX + radius; x++) {
                for (let y = centerY - radius; y <= centerY + radius; y++) {
                    for (let z = centerZ - radius; z <= centerZ + radius; z++) {
                        const distance = Math.sqrt(
                            (x - centerX) ** 2 +
                            (y - centerY) ** 2 +
                            (z - centerZ) ** 2
                        );
                        if (distance >= radius - thickness &&
                            distance <= radius) {
                            placeBlockCallback(
                                { x: x, y: y, z: z, dimension: dimension },
                                index
                            );
                            index++;
                        }
                    }
                    if (Date.now() - msSinceLastYieldStart >=
                        minMSBetweenYields) {
                        msSinceLastYieldStart = Date.now();
                        yield undefined as void;
                    }
                }
                if (Date.now() - msSinceLastYieldStart >= minMSBetweenYields) {
                    msSinceLastYieldStart = Date.now();
                    yield undefined as void;
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
