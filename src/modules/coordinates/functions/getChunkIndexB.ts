/**
 * @deprecated Use {@link getChunkIndexC} instead.
 * @param x
 * @param z
 * @returns
 */
export function getChunkIndexB(x: number, z: number) { return { x: Math.floor(x / 16), y: Math.floor(z / 16) }; }
