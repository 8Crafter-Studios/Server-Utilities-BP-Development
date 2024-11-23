import type { Vector3, Dimension } from "@minecraft/server";

export function getNextTopSolidBlockBelowPosition(
    location: Vector3,
    dimension: Dimension,
    onlySolid: boolean = false,
    allowLiquidAbove: boolean = true,
    allowNonSolidBlocksAbove: boolean = false,
    allowLiquidBelow: boolean = false
) {
    let block = tryget(() => dimension.getBlock(location));
    let readyToSearch = !(onlySolid
        ? !block.isSolid
        : (block.isLiquid && allowLiquidAbove) ||
        (block.isSolid && allowNonSolidBlocksAbove) ||
        block.isAir);
    while (block.y <= dimension.heightRange.max) {
        if (((block.isLiquid && allowLiquidAbove) ||
            (block.isSolid && allowNonSolidBlocksAbove) ||
            block.isAir) &&
            !readyToSearch) {
            block = block.below(1);
        } else {
            if ((onlySolid
                ? !block.isSolid
                : (block.isLiquid && allowLiquidAbove) ||
                (block.isSolid && allowNonSolidBlocksAbove) ||
                block.isAir) &&
                readyToSearch &&
                (onlySolid
                    ? block.below(1).isSolid
                    : !(
                        (!allowLiquidBelow
                            ? block.below(1).isLiquid
                            : false) || block.below(1).isAir
                    ))) {
                return block;
            } else {
                block = block.below(1);
            }
        }
        readyToSearch = readyToSearch
            ? true
            : !(onlySolid
                ? !block.isSolid
                : (block.isLiquid && allowLiquidAbove) ||
                (block.isSolid && allowNonSolidBlocksAbove) ||
                block.isAir);
    }
    return undefined;
}
