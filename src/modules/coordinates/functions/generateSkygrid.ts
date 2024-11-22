import type { Vector3, Dimension, DimensionLocation } from "@minecraft/server";

export function generateSkygrid(
    from: Vector3,
    to: Vector3,
    gridSize: number,
    dimension?: Dimension,
    placeBlockCallback: (location: DimensionLocation) => any = () => { },
    integrity: number = 100
) {
    const startX = Math.floor(from.x);
    const startY = Math.floor(from.y);
    const startZ = Math.floor(from.z);
    const endX = Math.floor(to.x);
    const endY = Math.floor(to.y);
    const endZ = Math.floor(to.z);

    if ((integrity ?? 100) != 100) {
        for (let x = startX; x <= endX; x += gridSize) {
            for (let y = startY; y <= endY; y += gridSize) {
                for (let z = startZ; z <= endZ; z += gridSize) {
                    if (Math.random() <= (integrity ?? 100) / 100) {
                        placeBlockCallback({
                            x: Math.floor(x),
                            y: Math.floor(y),
                            z: Math.floor(z),
                            dimension: dimension,
                        });
                    }
                }
            }
        }
    } else {
        for (let x = startX; x <= endX; x += gridSize) {
            for (let y = startY; y <= endY; y += gridSize) {
                for (let z = startZ; z <= endZ; z += gridSize) {
                    placeBlockCallback({
                        x: Math.floor(x),
                        y: Math.floor(y),
                        z: Math.floor(z),
                        dimension: dimension,
                    });
                }
            }
        }
    }
}
