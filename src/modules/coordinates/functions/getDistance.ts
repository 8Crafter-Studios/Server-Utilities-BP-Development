import type { Vector3 } from "@minecraft/server";

export function getDistance(point1: Vector3, point2: Vector3) {
    const deltaX = point2.x - point1.x;
    const deltaY = point2.y - point1.y;
    const deltaZ = point2.z - point1.z;

    return Math.sqrt(deltaX ** 2 + deltaY ** 2 + deltaZ ** 2);
}
