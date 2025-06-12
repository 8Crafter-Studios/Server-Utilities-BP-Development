import type { Vector3 } from "@minecraft/server";
import { caretNotation } from "./caretNotation";

export function evaluateCoordinatesB(
    x: string,
    y: string,
    z: string,
    startingPosition: Vector3,
    rotation: Vector3
) {
    let coordinates = startingPosition;
    [x, y, z].forEach((v, i) => {
        if (v.startsWith("^")) {
            if (v.length == 1) {
            } else {
                let crds = [0, 0, 0] as [number, number, number];
                crds[i] = Number(v.slice(1));
                coordinates = caretNotation(
                    coordinates,
                    { x: crds[0], y: crds[1], z: crds[2] },
                    rotation
                );
            }
        }
    });
    [x, y, z].forEach((v, i) => {
        if (v.startsWith("~")) {
            if (v.length == 1) {
            } else {
                let crds = [coordinates.x, coordinates.y, coordinates.z] as [number, number, number];
                crds[i] = crds[i as 0 | 1 | 2] + Number(v.slice(1));
                coordinates = { x: crds[0], y: crds[1], z: crds[2] };
            }
        }
    });
    [x, y, z].forEach((v, i) => {
        if (v.startsWith("*")) {
            if (v.length == 1) {
                let crds = [coordinates.x, coordinates.y, coordinates.z] as [number, number, number];
                let crdsb = [
                    startingPosition.x,
                    startingPosition.y,
                    startingPosition.z,
                ] as [number, number, number];
                crds[i] = crdsb[i as 0 | 1 | 2];
                coordinates = { x: crds[0], y: crds[1], z: crds[2] };
            } else {
                let crds = [coordinates.x, coordinates.y, coordinates.z] as [number, number, number];
                let crdsb = [
                    startingPosition.x,
                    startingPosition.y,
                    startingPosition.z,
                ] as [number, number, number];
                crds[i] = crdsb[i as 0 | 1 | 2] + Number(v.slice(1));
                coordinates = { x: crds[0], y: crds[1], z: crds[2] };
            }
        }
    });
    [x, y, z].forEach((v, i) => {
        if (v.startsWith("~")) {
        } else {
            if (v.startsWith("^")) {
            } else {
                if (v.startsWith("*")) {
                } else {
                    let crds = [coordinates.x, coordinates.y, coordinates.z] as [number, number, number];
                    crds[i] = Number(v.slice(0));
                    coordinates = { x: crds[0], y: crds[1], z: crds[2] };
                }
            }
        }
    });
    return coordinates;
}
