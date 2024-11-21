import { world } from "@minecraft/server";

export function roundPlaceNumberObject(object: Object, place: number = Number(world.getDynamicProperty("scriptPrecision") ?? 5)) {
    let newObject: [string, any][];
    newObject = [];
    Object.entries(object).forEach((k, i) => { if (typeof (k[1]) == "number") { newObject.push([k[0], Number(k[1].toFixed(place))]); } else { newObject.push(k); } });
    return Object.fromEntries(newObject);
}
