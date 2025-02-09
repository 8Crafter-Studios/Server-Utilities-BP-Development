import { extractIntArrayG } from "./extractIntArrayG";

export async function unsuperCompressG<T extends { block_indices: string; }>(nbt: T): Promise<Omit<T, "block_indices"> & { block_indices: number[]; }> {
    return Object.assign(nbt, {
        block_indices: await extractIntArrayG(nbt.block_indices),
    });
}
