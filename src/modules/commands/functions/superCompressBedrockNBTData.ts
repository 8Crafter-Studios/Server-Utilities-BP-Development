import { compressIntArray } from "./compressIntArray";

export function superCompressBedrockNBTData(parsedNBT: { structure: { block_indices: number[][]; palette: { default: { block_palette: any; }; }; }; size: any; [k: string|number|symbol]: any; }) {
    return {
        block_indices: compressIntArray(parsedNBT.structure.block_indices[0]),
        block_palette: parsedNBT.structure.palette.default.block_palette,
        nbt_type: "supercmprbnbt" as "supercmprbnbt",
        size: parsedNBT.size,
    };
}
