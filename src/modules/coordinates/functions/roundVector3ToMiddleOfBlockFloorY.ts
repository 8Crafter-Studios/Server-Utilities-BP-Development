import type { Vector3 } from "@minecraft/server";

export function roundVector3ToMiddleOfBlockFloorY(vector: Vector3) {
    return {
        x: Math.floor(vector.x) + 0.5,
        y: Math.floor(vector.y),
        z: Math.floor(vector.z) + 0.5,
    };
}
