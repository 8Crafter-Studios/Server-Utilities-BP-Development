import type { Vector3, Dimension } from "@minecraft/server";

export function getTopSolidBlock(
    location: Vector3,
    dimension: Dimension,
    onlySolid: boolean = false
) {
    let block = dimension.getBlock({
        x: location.x,
        y: dimension.heightRange.max,
        z: location.z,
    })!;
    while (block.y >= dimension.heightRange.min) {
        if (onlySolid ? !block.isSolid : block.isAir) {
            block = block.below(1)!;
        } else {
            return block;
        }
    }
    return undefined;
}
