import { type Vector3, Dimension, BlockPermutation, BlockType, type BlockFillOptions, BlockVolume } from "@minecraft/server";

/**
 * @deprecated
 */
export function fillBlocksB(
    from: Vector3,
    to: Vector3,
    dimension: Dimension,
    block: string | BlockPermutation | BlockType,
    options?: BlockFillOptions
) {
    let mainArray = [] as BlockVolume[];
    let subArray = [] as BlockVolume[];
    Array.from(
        new BlockVolume(from, {
            x: from.x,
            y: from.y,
            z: to.z,
        }).getBlockLocationIterator()
    ).forEach((v) => {
        subArray.push(new BlockVolume(v, { x: to.x, y: v.y, z: v.z }));
    });
    subArray.forEach((v) => {
        Array.from(v.getBlockLocationIterator()).forEach((va) => mainArray.push(new BlockVolume(va, { x: va.x, y: to.y, z: va.z }))
        );
    });
    let counter = 0;
    mainArray.forEach(
        (v) => (counter += dimension
            .fillBlocks(new BlockVolume(v.from, v.to), block, options)
            .getCapacity())
    );
    return counter;
}
