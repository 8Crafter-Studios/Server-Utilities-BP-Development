import type { Vector3 } from "@minecraft/server";

export function v3Multiply(a: Vector3, b: number | Vector3) {
    return typeof b == "object"
        ? { x: a.x * b.x, y: a.y * b.y, z: a.z * b.z }
        : { x: a.x * b, y: a.y * b, z: a.z * b };
}
