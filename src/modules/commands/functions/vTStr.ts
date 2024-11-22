import type { Vector2, Vector3 } from "@minecraft/server";

export function vTStr(vector: Vector2 | Vector3) {
    return !!(vector as Vector3).z
        ? `${vector.x} ${vector.y} ${(vector as Vector3).z}`
        : `${vector.x} ${vector.y}`;
}
