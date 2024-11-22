import type { Vector3 } from "@minecraft/server";

export function VSTR(vector1: Vector3, vector2: Vector3) {
    return {
        from: {
            x: Math.min(vector1.x, vector2.x),
            y: Math.min(vector1.y, vector2.y),
            z: Math.min(vector1.z, vector2.z),
        },
        to: {
            x: Math.max(vector1.x, vector2.x),
            y: Math.max(vector1.y, vector2.y),
            z: Math.max(vector1.z, vector2.z),
        },
    };
}
