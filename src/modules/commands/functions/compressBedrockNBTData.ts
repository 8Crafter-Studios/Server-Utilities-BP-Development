export function compressBedrockNBTData(parsedNBT: { structure: { block_indices: any[]; palette: { default: { block_palette: any; }; }; }; size: any; }) {
    return {
        block_indices: parsedNBT.structure.block_indices[0],
        block_palette: parsedNBT.structure.palette.default.block_palette,
        nbt_type: "cmprbnbt" as "cmprbnbt",
        size: parsedNBT.size,
    };
}
