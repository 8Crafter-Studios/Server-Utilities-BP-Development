import type { Direction } from "@minecraft/server";

export function dirreversemap<T extends "above" | "below" | "east" | "west" | "north" | "south">(
    direction: T
): T extends "above"
    ? "below"
    : T extends "below"
    ? "above"
    : T extends "east"
    ? "west"
    : T extends "west"
    ? "east"
    : T extends "north"
    ? "south"
    : T extends "south"
    ? "north"
    : never {
    return (
        {
            above: "below",
            below: "above",
            east: "west",
            west: "east",
            north: "south",
            south: "north",
        } as const
    )[direction.toLocaleLowerCase()] as T extends "above"
        ? "below"
        : T extends "below"
        ? "above"
        : T extends "east"
        ? "west"
        : T extends "west"
        ? "east"
        : T extends "north"
        ? "south"
        : T extends "south"
        ? "north"
        : never;
}
