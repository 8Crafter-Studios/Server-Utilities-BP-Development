import { customFormUIElement } from "modules/main/classes/customFormUIElement";
import { strToCustomFormUIElement } from "modules/main/functions/strToCustomFormUIElement";

export function arrayToElementList(ids: String[], array: String[]) {
    let a: customFormUIElement[];
    a = [];
    array.forEach((ax, az) => {
        a[az] = strToCustomFormUIElement(
            Number(ids[az]!.split("|")[1]) + "|" + ax
        );
    });
    return a.sort((a, b) => a.index - b.index);
}
