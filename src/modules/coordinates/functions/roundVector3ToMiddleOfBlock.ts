import type { Vector3 } from "@minecraft/server";

export function roundVector3ToMiddleOfBlock(vector: Vector3): Vector3 {
    return {
        x: Math.floor(vector.x) + 0.5,
        y: Math.floor(vector.y) + 0.5,
        z: Math.floor(vector.z) + 0.5,
    };
}
