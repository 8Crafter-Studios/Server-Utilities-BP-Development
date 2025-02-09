import { approxEqual } from "./approxEqual"
import { approxEquals } from "./approxEquals"
import { approximatelyEqual } from "./approximatelyEqual"
import { approximatelyEquals } from "./approximatelyEquals"
approxEqual
approxEquals
approximatelyEqual
approximatelyEquals
export function parseExpressionBR(str: string) {
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
        return eval(str);
    };
}
