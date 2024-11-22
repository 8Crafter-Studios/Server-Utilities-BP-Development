import type { Vector2 } from "@minecraft/server";

/**
 * @deprecated
 * @param location
 * @returns
 */
export function getChunkIndexC(location: Vector2) { return { x: Math.floor(location.x / 16), y: Math.floor(location.y / 16) }; }
