import type { Vector3 } from "@minecraft/server";
import { LocalTeleportFunctions } from "../../../Main/coordinates";

export function caretNotationD(
    location: Vector3,
    offset: Vector3,
    rot: Vector3
) {
    const { x, y, z } = offset; /*
    const { location } = this */

    const viewDirection = rot;

    const xx = LocalTeleportFunctions.xa(viewDirection, x);
    const yy = LocalTeleportFunctions.ya(viewDirection, y);

    const newPosition = {
        x: location.x + xx.x + yy.x,
        y: location.y + xx.y + yy.y,
        z: location.z + xx.z + yy.z,
    };

    return newPosition;
}
