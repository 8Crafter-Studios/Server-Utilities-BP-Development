import type { Vector3, Vector2 } from "@minecraft/server";
import { evaluateCoordinates } from "./evaluateCoordinates";

export function coordinates(
    coordinateText: string,
    startingPosition: Vector3,
    rotation: Vector2
) {
    let location = { x: NaN, y: NaN, z: NaN };
    try {
        location = evaluateCoordinates(
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
