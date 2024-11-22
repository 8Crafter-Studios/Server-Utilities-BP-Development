import type { Entity, Block, Vector3 } from "@minecraft/server";
import { evaluateCoordinatesB } from "./evaluateCoordinatesB";

export function coordinatesE(
    coordinateText: string,
    source: Entity | Block,
    rotation: Vector3
) {
    let location = { x: NaN, y: NaN, z: NaN };
    let startingPosition = source?.location ?? { x: 0, y: 0, z: 0 };
    try {
        location = evaluateCoordinatesB(
            coordinateText
                .split("~")
                .join(" ~")
                .split("^")
                .join(" ^")
                .split("*")
                .join(" *")
                .replaceAll("  ", " ")
                .trimStart()
                .split(" ")[0]
                .replaceAll(" ", ""),
            coordinateText
                .split("~")
                .join(" ~")
                .split("^")
                .join(" ^")
                .split("*")
                .join(" *")
                .replaceAll("  ", " ")
                .trimStart()
                .split(" ")[1]
                .replaceAll(" ", ""),
            coordinateText
                .split("~")
                .join(" ~")
                .split("^")
                .join(" ^")
                .split("*")
                .join(" *")
                .replaceAll("  ", " ")
                .trimStart()
                .split(" ")[2]
                .replaceAll(" ", ""),
            startingPosition,
            rotation
        );
    } catch (e) {
        console.error(e, e.stack);
    }
    return location;
}
