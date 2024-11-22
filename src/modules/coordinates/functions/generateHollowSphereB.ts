import type { Vector3, Dimension, DimensionLocation } from "@minecraft/server";
import { coordinates } from "./coordinates";

export function generateHollowSphereB(
    center: Vector3,
    radius: number,
    thickness: number,
    dimension: Dimension,
    placeBlockCallback: (location: DimensionLocation) => any
) {
    const centerX = center.x;
    const centerY = center.y;
    const centerZ = center.z;
    for (let x = centerX - radius; x <= centerX + radius; x++) {
        for (let y = centerY - radius; y <= centerY + radius; y++) {
            for (let z = centerZ - radius; z <= centerZ + radius; z++) {
                const distance = Math.sqrt(
                    (x - centerX) ** 2 + (y - centerY) ** 2 + (z - centerZ) ** 2
                );
                if (distance >= radius - thickness && distance <= radius) {
                    placeBlockCallback({
                        x: x,
                        y: y,
                        z: z,
                        dimension: dimension,
                    });
                }
            }
        }
    }
    return coordinates;
}
