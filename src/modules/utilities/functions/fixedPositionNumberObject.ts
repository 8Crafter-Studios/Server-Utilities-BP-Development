import { world } from "@minecraft/server";

export function fixedPositionNumberObject(object: Object, decimals: number = Number(world.getDynamicProperty("scriptPrecision") ?? 5)) {
    let newObject: [string, any][];
    newObject = [];
    Object.entries(object).forEach((k, i) => { if (typeof (k[1]) == "number") { newObject.push([k[0], k[1].toFixed(decimals)]); } else { newObject.push(k); } });
    return Object.fromEntries(newObject);
}
