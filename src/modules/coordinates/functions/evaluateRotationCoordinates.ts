import type { Vector2 } from "@minecraft/server";

export function evaluateRotationCoordinates(
    x: string,
    y: string,
    rotation: Vector2
) {
    let coordinates = rotation;
    [x, y].forEach((v, i) => {
        if (v.startsWith("~")) {
            if (v.length == 1) {
            } else {
                let crds = [coordinates.x, coordinates.y] as [number, number];
                crds[i] = crds[i as 0 | 1] + Number(v.slice(1));
                coordinates = { x: crds[0], y: crds[1] };
            }
        }
    });
    [x, y].forEach((v, i) => {
        if (v.startsWith("*")) {
            if (v.length == 1) {
                let crds = [coordinates.x, coordinates.y] as [number, number];
                let crdsb = [rotation.x, rotation.y] as [number, number];
                crds[i] = crdsb[i as 0 | 1];
                coordinates = { x: crds[0], y: crds[1] };
            } else {
                let crds = [coordinates.x, coordinates.y] as [number, number];
                let crdsb = [rotation.x, rotation.y] as [number, number];
                crds[i] = crdsb[i as 0 | 1] + Number(v.slice(1));
                coordinates = { x: crds[0], y: crds[1] };
            }
        }
    });
    [x, y].forEach((v, i) => {
        if (v.startsWith("~")) {
        } else {
            if (v.startsWith("^")) {
            } else {
                if (v.startsWith("*")) {
                } else {
                    let crds = [coordinates.x, coordinates.y] as [number, number];
                    crds[i] = Number(v.slice(0));
                    coordinates = { x: crds[0], y: crds[1] };
                }
            }
        }
    });
    return coordinates;
}
