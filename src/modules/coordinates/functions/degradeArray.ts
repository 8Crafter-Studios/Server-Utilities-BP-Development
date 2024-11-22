import { shuffle } from "modules/utilities/functions/shuffle";

export function degradeArray(
    array: any[] /*, mode: "removeElements"|"changeTextOfStrings"|"corruptElements"|"removeElementsAndSubElements"*/,
    integrity: number,
    seed?: number
) {
    return shuffle([...array]).slice(
        0,
        array.length * Math.min(array.length, integrity / 100)
    );
}
