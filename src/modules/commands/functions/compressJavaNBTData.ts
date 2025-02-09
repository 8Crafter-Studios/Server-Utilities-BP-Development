export function compressJavaNBTData(parsedNBT: { size: number[]; blocks: any[]; palette: any[]; }) {
    var block_indices = "-1,"
        .repeat(parsedNBT.size[0] * parsedNBT.size[1] * parsedNBT.size[2])
        .slice(0, -1)
        .split(",")
        .map((v) => Number(v));
    parsedNBT.blocks.forEach((b, i: number) => b != -1
        ? (block_indices[b.pos[0] +
            b.pos[2] * parsedNBT.size[0] +
            b.pos[1] * parsedNBT.size[0] * parsedNBT.size[2]] = b.state)
        : undefined
    );
    return {
        block_indices: block_indices,
        block_palette: parsedNBT.palette.map((v: { Name: any; Properties: any; }) => ({
            name: v.Name,
            states: v.Properties,
        })),
        nbt_type: "cmprsnbt" as "cmprsnbt",
        size: parsedNBT.size,
    };
}
