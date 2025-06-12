import { compressIntArray } from "./compressIntArray";

export function superCompressJavaNBTData(parsedNBT: { size: number[]; blocks: any[]; palette: any[]; [k: string | number | symbol]: any }): {
    block_indices: string;
    block_palette: { name: any; states: any }[];
    nbt_type: "supercmprsnbt";
    size: number[];
} {
    var block_indices = "-1,"
        .repeat(parsedNBT.size[0]! * parsedNBT.size[1]! * parsedNBT.size[2]!)
        .slice(0, -1)
        .split(",")
        .map((v) => Number(v));
    parsedNBT.blocks.forEach((b: -1 | { [k: string | number | symbol]: any }, i: any) =>
        b != -1 ? (block_indices[b.pos[0] + b.pos[2] * parsedNBT.size[0]! + b.pos[1] * parsedNBT.size[0]! * parsedNBT.size[2]!] = b.state) : undefined
    );
    return {
        block_indices: compressIntArray(block_indices),
        block_palette: parsedNBT.palette.map((v: { Name: any; Properties: any }) => ({
            name: v.Name,
            states: v.Properties,
        })),
        nbt_type: "supercmprsnbt" as "supercmprsnbt",
        size: parsedNBT.size,
    };
}
