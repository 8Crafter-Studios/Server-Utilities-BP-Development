import type { Vector3 } from "@minecraft/server";


export function* generateMathExpression(
    expression: (
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
    ) => boolean,
    generateCallback: (location: {
        x: number;
        y: number;
        z: number;
        rx: number;
        ry: number;
        rz: number;
        ax: number;
        ay: number;
        az: number;
        bx: number;
        by: number;
        bz: number;
        nx: number;
        ny: number;
        nz: number;
        px: number;
        py: number;
        pz: number;
        count: bigint;
        index: bigint;
    }) => any,
    from: Vector3,
    to: Vector3,
    pos1: Vector3,
    pos2: Vector3,
    step = 1
): Generator<void, bigint, unknown> {
    var count = 0n;
    var index = 0n;
    for (let x = Math.min(from.x, to.x); x <= Math.max(from.x, to.x); x += step) {
        for (let y = Math.min(from.y, to.y); y <= Math.max(from.y, to.y); y += step) {
            for (let z = Math.min(from.z, to.z); z <= Math.max(from.z, to.z); z += step) {
                if (expression(
                    x,
                    y,
                    z,
                    x - (from.x + to.x) / 2,
                    y - (from.y + to.y) / 2,
                    z - (from.z + to.z) / 2,
                    pos1.x,
                    pos1.y,
                    pos1.z,
                    pos2.x,
                    pos2.y,
                    pos2.z,
                    Math.min(from.x, to.x),
                    Math.min(from.y, to.y),
                    Math.min(from.z, to.z),
                    Math.max(from.x, to.x),
                    Math.max(from.y, to.y),
                    Math.max(from.z, to.z)
                )) {
                    generateCallback({
                        x: x,
                        y: y,
                        z: z,
                        rx: x - (from.x + to.x) / 2,
                        ry: y - (from.y + to.y) / 2,
                        rz: z - (from.z + to.z) / 2,
                        ax: pos1.x,
                        ay: pos1.y,
                        az: pos1.z,
                        bx: pos2.x,
                        by: pos2.y,
                        bz: pos2.z,
                        nx: Math.min(from.x, to.x),
                        ny: Math.min(from.y, to.y),
                        nz: Math.min(from.z, to.z),
                        px: Math.max(from.x, to.x),
                        py: Math.max(from.y, to.y),
                        pz: Math.max(from.z, to.z),
                        count,
                        index,
                    });
                    count++;
                }
                index++;
                yield void null;
            }
        }
    }

    return count;
}
