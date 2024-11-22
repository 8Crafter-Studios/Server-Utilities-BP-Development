import type { Vector3 } from "@minecraft/server";

/**
 * @deprecated Use {@link getChunkIndexC} instead.
 * @param location
 * @returns
 */
export function getChunkIndex(location: Vector3) { return { x: Math.floor(location.x / 16), y: Math.floor(location.z / 16) }; }
