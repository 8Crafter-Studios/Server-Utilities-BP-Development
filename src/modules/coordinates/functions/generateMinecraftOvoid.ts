import type { Vector3, Dimension, DimensionLocation } from "@minecraft/server";

export function generateMinecraftOvoid(
    center: Vector3,
    radius: Vector3,
    offset: Vector3,
    thickness: number,
    dimension?: Dimension,
    placeBlockCallback: (location: DimensionLocation) => any = () => { },
    integrity: number = 100
) {
    const innerRadiusX = radius.x - thickness;
    const innerRadiusY = radius.y - thickness;
    const innerRadiusZ = radius.z - thickness;
    const outerRadiusX = radius.x + offset.x;
    const outerRadiusY = radius.y + offset.y;
    const outerRadiusZ = radius.z + offset.z;

    for (let x = Math.floor(center.x - outerRadiusX); x <= Math.ceil(center.x + outerRadiusX); x++) {
        for (let y = Math.floor(center.y - outerRadiusY); y <= Math.ceil(center.y + outerRadiusY); y++) {
            for (let z = Math.floor(center.z - outerRadiusZ); z <= Math.ceil(center.z + outerRadiusZ); z++) {
                const distanceSquared = ((x - center.x) / outerRadiusX) ** 2 +
                    ((y - center.y) / outerRadiusY) ** 2 +
                    ((z - center.z) / outerRadiusZ) ** 2;

                if (distanceSquared <= 1 &&
                    distanceSquared >= (innerRadiusX / outerRadiusX) ** 2 &&
                    distanceSquared >= (innerRadiusY / outerRadiusY) ** 2 &&
                    distanceSquared >= (innerRadiusZ / outerRadiusZ) ** 2) {
                    placeBlockCallback({
                        x: x,
                        y: y,
                        z: z,
                        dimension: dimension!,
                    });
                }
            }
        }
    }
}
