import { ultraExtractIntArray } from "./ultraExtractIntArray";

export function unultraCompress<T extends { block_indices: string; }>(nbt: T): Omit<T, "block_indices"> & { block_indices: number[]; } {
    return Object.assign(nbt, {
        block_indices: ultraExtractIntArray(nbt.block_indices),
    });
}
