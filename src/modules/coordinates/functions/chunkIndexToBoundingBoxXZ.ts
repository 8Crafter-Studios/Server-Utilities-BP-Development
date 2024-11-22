import type { Vector2 } from "@minecraft/server";

export function chunkIndexToBoundingBoxXZ(
    chunkIndex: Vector2,
    heightRange: [min: number, max: number] = [-64, 320]
) {
    return {
        from: {
            x: Math.floor(chunkIndex.x * 16),
            y: heightRange[0],
            z: Math.floor(chunkIndex.y * 16),
        },
        to: {
            x: Math.round(chunkIndex.x * 16 + 15),
            y: heightRange[1],
            z: Math.round(chunkIndex.y * 16 + 15),
        },
    };
}
