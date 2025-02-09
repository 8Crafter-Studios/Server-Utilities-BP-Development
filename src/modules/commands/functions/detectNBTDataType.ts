export function detectNBTDataType(NBTData: { nbt_type?: any; type?: string; [k: string|number|symbol]: any; }) {
    return !!NBTData.nbt_type
        ? NBTData.nbt_type
        : NBTData.hasOwnProperty("blocks")
            ? "snbt"
            : NBTData.hasOwnProperty("structure")
                ? "bnbt"
                : NBTData?.type == "compound"
                    ? "rawuenbt"
                    : "unknownt";
}
