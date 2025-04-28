import type { BoundingBox, Vector2, VectorXZ } from "@minecraft/server";

export function chunkIndexToBoundingBoxXZ(
    chunkIndex: VectorXZ,
    heightRange: [min: number, max: number] = [-64, 320]
): BoundingBox {
    return {
        min: {
            x: Math.floor(chunkIndex.x * 16),
            y: heightRange[0],
            z: Math.floor(chunkIndex.z * 16),
        },
        max: {
            x: Math.round(chunkIndex.x * 16 + 15),
            y: heightRange[1],
            z: Math.round(chunkIndex.z * 16 + 15),
        },
    };
}
