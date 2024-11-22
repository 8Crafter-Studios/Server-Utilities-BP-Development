import type { Vector3 } from "@minecraft/server";

export function generateCircleCoordinatesB(
    center: Vector3,
    radius: number,
    axis: "x" |
        "y" |
        "z" |
        "ns" |
        "sn" |
        "ew" |
        "we" |
        "ud" |
        "du" |
        "X" |
        "Y" |
        "Z" |
        "NS" |
        "SN" |
        "EW" |
        "WE" |
        "UD" |
        "DU"
) {
    const coordinates = [] as Vector3[];
    const diameter = radius * 2;

    if (axis.toLowerCase() == "y" ||
        axis.toLowerCase() == "ud" ||
        axis.toLowerCase() == "du") {
        for (let x = -radius; x <= radius; x++) {
            for (let z = -radius; z <= radius; z++) {
                if (x * x + z * z <= radius * radius) {
                    const blockX = center.x + x;
                    const blockZ = center.z + z;
                    coordinates.push({ x: blockX, y: center.y, z: blockZ });
                }
            }
        }
    } else if (axis.toLowerCase() == "x" ||
        axis.toLowerCase() == "ew" ||
        axis.toLowerCase() == "we") {
        for (let y = -radius; y <= radius; y++) {
            for (let z = -radius; z <= radius; z++) {
                if (y * y + z * z <= radius * radius) {
                    const blockY = center.y + y;
                    const blockZ = center.z + z;
                    coordinates.push({ x: center.x, y: blockY, z: blockZ });
                }
            }
        }
    } else if (axis.toLowerCase() == "z" ||
        axis.toLowerCase() == "ns" ||
        axis.toLowerCase() == "sn") {
        for (let x = -radius; x <= radius; x++) {
            for (let y = -radius; y <= radius; y++) {
                if (x * x + y * y <= radius * radius) {
                    const blockX = center.x + x;
                    const blockY = center.y + y;
                    coordinates.push({ x: blockX, y: blockY, z: center.z });
                }
            }
        }
    }

    return coordinates as Vector3[];
}
