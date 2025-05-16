import type { Vector3, Dimension } from "@minecraft/server";

export function getGroundSolidBlock(
    location: Vector3,
    dimension: Dimension,
    onlySolid: boolean = false
) {
    let block = dimension.getBlock({
        x: location.x,
        y: Math.max(
            Math.min(location.y, dimension.heightRange.max),
            dimension.heightRange.min
        ),
        z: location.z,
    });
    if(!block) return undefined;
    while (block && block.y >= dimension.heightRange.min) {
        if (onlySolid ? !block.isSolid : block.isAir) {
            block = block.below(1);
        } else {
            return block;
        }
    }
    return undefined;
}
