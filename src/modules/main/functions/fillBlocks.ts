import { type Vector3, Dimension, BlockPermutation, BlockType, type BlockFillOptions, BlockVolume } from "@minecraft/server";

/**
 * @deprecated
 */
export function fillBlocks(
    from: Vector3,
    to: Vector3,
    dimension: Dimension,
    block: string | BlockPermutation | BlockType,
    options?: BlockFillOptions
) {
    let mainArray = [] as BlockVolume[];
    let subArray = [] as Vector3[];
    Array.from(new BlockVolume(from, to).getBlockLocationIterator()).forEach(
        (v) => {
            if (subArray.length <= new BlockVolume(from, to).getSpan().x) {
                subArray.push(v);
            } else {
                mainArray.push(
                    new BlockVolume(
                        {
                            x: subArray.sort((a, b) => a.x - b.x)[0]!.x,
                            y: subArray.sort((a, b) => a.y - b.y)[0]!.y,
                            z: subArray.sort((a, b) => a.z - b.z)[0]!.z,
                        },
                        {
                            x: subArray.sort((a, b) => b.x - a.x)[0]!.x,
                            y: subArray.sort((a, b) => b.y - a.y)[0]!.y,
                            z: subArray.sort((a, b) => b.z - a.z)[0]!.z,
                        }
                    )
                );
            }
        }
    );
    let counter = 0;
    mainArray.forEach(
        (v) => (counter += dimension
            .fillBlocks(new BlockVolume(v.from, v.to), block, options)
            .getCapacity())
    );
    return counter;
}
