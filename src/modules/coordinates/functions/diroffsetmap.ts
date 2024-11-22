import type { Direction } from "@minecraft/server";
import { Vector } from "init/classes/Vector";

export function diroffsetmap(direction: Direction) {
    return {
        Up: Vector.up,
        Down: Vector.down,
        East: Vector.east,
        West: Vector.west,
        North: Vector.north,
        South: Vector.south,
    }[direction];
}
