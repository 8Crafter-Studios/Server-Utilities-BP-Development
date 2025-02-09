import { extractIntArray } from "./extractIntArray";

export function unsuperCompress<T extends { block_indices: string; }>(nbt: T): Omit<T, "block_indices"> & { block_indices: number[]; } {
    return Object.assign(nbt as Omit<T, "block_indices">, {
        block_indices: extractIntArray(nbt.block_indices),
    });
}
