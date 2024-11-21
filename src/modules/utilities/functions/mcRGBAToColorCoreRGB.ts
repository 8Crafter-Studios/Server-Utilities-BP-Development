import type { RGBA as mcRGBA } from "@minecraft/server";
import type { RGB as ColorCoreRGB } from "color-core";

export function mcRGBAToColorCoreRGB(rgba: mcRGBA): ColorCoreRGB {
    return {
        r: rgba.red * 255,
        g: rgba.green * 255,
        b: rgba.blue * 255,
        a: rgba.alpha,
    };
}
