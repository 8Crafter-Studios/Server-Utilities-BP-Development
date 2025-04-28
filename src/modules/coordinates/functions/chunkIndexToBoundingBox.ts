import type { Vector2 } from "@minecraft/server";

/**
 * @deprecated Use {@link chunkIndexToBoundingBoxXZ} instead.
 * @param chunkIndex
 * @param heightRange
 * @returns
 */
export function chunkIndexToBoundingBox(chunkIndex: Vector2, heightRange: [min: number, max: number] = [-64, 319]) { return { from: { x: Math.floor(chunkIndex.x * 16), y: heightRange[0], z: Math.floor(chunkIndex.y * 16) }, to: { x: Math.round((chunkIndex.x * 16) + 15), y: heightRange[1], z: Math.round((chunkIndex.y * 16) + 15) } }; }
