import type { Vector3 } from "@minecraft/server";

export function testIsWithinRanges(
    blockvolumes: {
        from: { x: number; y: number; z: number; };
        to: { x: number; y: number; z: number; };
    }[],
    location: Vector3
) {
    let withinRange = false;
    blockvolumes.forEach((blockvolume) => {
        if (((blockvolume.from.x >= location.x &&
            location.x >= blockvolume.to.x) ||
            (blockvolume.to.x >= location.x &&
                location.x >= blockvolume.from.x)) &&
            ((blockvolume.from.y >= location.y &&
                location.y >= blockvolume.to.y) ||
                (blockvolume.to.y >= location.y &&
                    location.y >= blockvolume.from.y)) &&
            ((blockvolume.from.z >= location.z &&
                location.z >= blockvolume.to.z) ||
                (blockvolume.to.z >= location.z &&
                    location.z >= blockvolume.from.z))) {
            withinRange = true;
        }
    });
    return withinRange;
}
