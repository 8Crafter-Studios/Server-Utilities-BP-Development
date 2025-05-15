import { type Vector3, Dimension, type DimensionLocation, system } from "@minecraft/server";
import { generatorProgress } from "modules/coordinates/constants/generatorProgress";

export function* generateMinecraftCircleOutlineBG(
    center: Vector3,
    radius: number,
    thickness: number,
    generatorProgressId: string,
    dimension?: Dimension,
    placeBlockCallback: (location: DimensionLocation) => any = () => { },
    options?: { integrity?: number; minMSBetweenYields?: number; }
) {
    try {
        const innerRadius = radius - thickness;
        const outerRadius = radius;
        generatorProgress[generatorProgressId] = {
            done: false,
            startTick: system.currentTick,
            startTime: Date.now(),
            containsUnloadedChunks: false,
        };
        var msSinceLastYieldStart = Date.now();

        if ((options?.integrity ?? 100) != 100) {
            for (let x = Math.floor(center.x - outerRadius); x <= Math.ceil(center.x + outerRadius); x++) {
                for (let z = Math.floor(center.z - outerRadius); z <= Math.ceil(center.z + outerRadius); z++) {
                    const distanceSquared = (x - center.x) ** 2 + (z - center.z) ** 2;

                    if (distanceSquared <= outerRadius ** 2 &&
                        distanceSquared >= innerRadius ** 2) {
                        if (Math.random() <=
                            (options?.integrity ?? 100) / 100) {
                            placeBlockCallback({
                                x: x,
                                y: center.y,
                                z: z,
                                dimension: dimension!,
                            });
                        }
                    }
                    if (Date.now() - msSinceLastYieldStart >=
                        (options?.minMSBetweenYields ?? 2000)) {
                        msSinceLastYieldStart = Date.now();
                        yield undefined as void;
                    }
                }
                if (Date.now() - msSinceLastYieldStart >=
                    (options?.minMSBetweenYields ?? 2000)) {
                    msSinceLastYieldStart = Date.now();
                    yield undefined as void;
                }
            }
        } else {
            for (let x = Math.floor(center.x - outerRadius); x <= Math.ceil(center.x + outerRadius); x++) {
                for (let z = Math.floor(center.z - outerRadius); z <= Math.ceil(center.z + outerRadius); z++) {
                    const distanceSquared = (x - center.x) ** 2 + (z - center.z) ** 2;

                    if (distanceSquared <= outerRadius ** 2 &&
                        distanceSquared >= innerRadius ** 2) {
                        placeBlockCallback({
                            x: x,
                            y: center.y,
                            z: z,
                            dimension: dimension!,
                        });
                    }
                    if (Date.now() - msSinceLastYieldStart >=
                        (options?.minMSBetweenYields ?? 2000)) {
                        msSinceLastYieldStart = Date.now();
                        yield undefined as void;
                    }
                }
                if (Date.now() - msSinceLastYieldStart >=
                    (options?.minMSBetweenYields ?? 2000)) {
                    msSinceLastYieldStart = Date.now();
                    yield undefined as void;
                }
            }
        }
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
