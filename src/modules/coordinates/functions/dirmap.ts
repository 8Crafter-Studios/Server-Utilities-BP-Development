import type { Direction } from "@minecraft/server";

export function dirmap(
    direction: Direction
): "above" | "below" | "east" | "west" | "north" | "south" {
    return {
        Up: "above",
        Down: "below",
        East: "east",
        West: "west",
        North: "north",
        South: "south",
    }[direction] as "above" | "below" | "east" | "west" | "north" | "south";
}
