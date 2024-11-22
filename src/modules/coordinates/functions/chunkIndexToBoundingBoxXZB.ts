import type { Vector2 } from "@minecraft/server";

export function chunkIndexToBoundingBoxXZB(
    chunkIndex: Vector2,
    heightRange: { min: number; max: number; } = { min: -64, max: 320 }
) {
    return {
        from: {
            x: Math.floor(chunkIndex.x * 16),
            y: heightRange.min,
            z: Math.floor(chunkIndex.y * 16),
        },
        to: {
            x: Math.round(chunkIndex.x * 16 + 15),
            y: heightRange.max,
            z: Math.round(chunkIndex.y * 16 + 15),
        },
    };
}
