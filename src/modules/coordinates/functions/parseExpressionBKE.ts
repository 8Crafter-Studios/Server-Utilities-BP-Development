import { approxEqual } from "./approxEqual"
import { approxEquals } from "./approxEquals"
import { approximatelyEqual } from "./approximatelyEqual"
import { approximatelyEquals } from "./approximatelyEquals"
approxEqual
approxEquals
approximatelyEqual
approximatelyEquals
export function parseExpressionBKE(str: string) {
    return (
        wx: number,
        wy: number,
        wz: number,
        x: number,
        y: number,
        z: number,
        ax: number,
        ay: number,
        az: number,
        bx: number,
        by: number,
        bz: number,
        nx: number,
        ny: number,
        nz: number,
        px: number,
        py: number,
        pz: number
    ) => {
        return eval(
            str
                .replaceAll(/(?<!\^)\^(?!\^)/g, "**")
                .replaceAll("^^", "^")
                .replaceAll(/\|([^\|]+)\|/g, "Math.abs($1)")
                .replaceAll(/([0-9en])(?=[xyzXYZ\(])/g, "$1*")
                .replaceAll(/(?<=[xyXYzZ\)])([xyXYzZ\(])/g, "*$1")
                .replaceAll(
                    /(?<=[xyXYzZ\)])((rz|ry|rz|ax|ay|az|bx|by|bz}nx|ny|nz|px|py|pz))/g,
                    "*$1"
                )
                .replaceAll(
                    /(?<!Math\.)(sqrt|cbrt|tan|cotan|abs|acos|acosh|asin|asinh|atan|atan2|atanh|ceil|clz32|cos|cosh|exp|expm1|floor|fround|hypot|imul|log|log1p|log2|log10|max|min|pow|random|round|sign|sin|sinh|tanh|trunc)/g,
                    "Math.$1"
                )
                .replaceAll(/(?<=[0-9enlENLxyXY\)])(Math\.)/g, "*$1")
        );
    };
}
