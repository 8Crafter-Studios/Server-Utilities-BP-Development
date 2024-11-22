import type { Vector3, Vector2 } from "@minecraft/server";
import { anglesToDirectionVectorDeg } from "./anglesToDirectionVectorDeg";
import { caretNotation } from "./caretNotation";

export function caretNotationC(
    location: Vector3,
    offset: Vector3,
    rot: Vector2
) {
    return caretNotation(
        location,
        offset,
        anglesToDirectionVectorDeg(rot.x, rot.y)
    );
}
