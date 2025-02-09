import { detectNBTDataType } from "./detectNBTDataType";


export function setNBTDataType(NBTData: { nbt_type?: any; type?: string; [k: string|number|symbol]: any; }) {
    return !!NBTData.nbt_type
        ? NBTData
        : Object.assign(NBTData, { nbt_type: detectNBTDataType(NBTData) });
}
