import type { BoundingBox, Vector2, VectorXZ } from "@minecraft/server";

export function chunkIndexToBoundingBoxXZB(
    chunkIndex: VectorXZ,
    heightRange: { min: number; max: number; } = { min: -64, max: 320 }
): BoundingBox {
    return {
        min: {
            x: Math.floor(chunkIndex.x * 16),
            y: heightRange.min,
            z: Math.floor(chunkIndex.z * 16),
        },
        max: {
            x: Math.round(chunkIndex.x * 16 + 15),
            y: heightRange.max,
            z: Math.round(chunkIndex.z * 16 + 15),
        },
    };
}
