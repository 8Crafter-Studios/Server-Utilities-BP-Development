import { world } from "@minecraft/server";

export function rotate3d(points: [x: number, y: number, z: number], pitchDeg: number, rollDeg: number, yawDeg: number): [x: number, y: number, z: number] {
    let pitchRad: number = pitchDeg * (Math.PI / 180);
    let rollRad: number = rollDeg * (Math.PI / 180);
    let yawRad: number = yawDeg * (Math.PI / 180);
    let cosa: number = Math.cos(yawRad);
    let sina: number = Math.sin(yawRad);
    let cosb: number = Math.cos(pitchRad);
    let sinb: number = Math.sin(pitchRad);
    let cosc: number = Math.cos(rollRad);
    let sinc: number = Math.sin(rollRad);
    let Axx: number = cosa * cosb;
    let Axy: number = cosa * sinb * sinc - sina * cosc;
    let Axz: number = cosa * sinb * cosc + sina * sinc;
    let Ayx: number = sina * cosb;
    let Ayy: number = sina * sinb * sinc + cosa * cosc;
    let Ayz: number = sina * sinb * cosc - cosa * sinc;
    let Azx: number = -sinb;
    let Azy: number = cosb * sinc;
    let Azz: number = cosb * cosc;
    let px: number = points[0];
    let py: number = points[1];
    let pz: number = points[2];
    points[0] = Number((Axx * px + Axy * py + Axz * pz).toFixed(Number(world.getDynamicProperty("scriptPrecision") ?? 10)));
    points[1] = Number((Ayx * px + Ayy * py + Ayz * pz).toFixed(Number(world.getDynamicProperty("scriptPrecision") ?? 10)));
    points[2] = Number((Azx * px + Azy * py + Azz * pz).toFixed(Number(world.getDynamicProperty("scriptPrecision") ?? 10)));
    return points;
}
