import type { RGB as mcRGB } from "@minecraft/server";
import type { RGB as ColorCoreRGB } from "color-core";

export function mcRGBToColorCoreRGB(rgba: mcRGB): ColorCoreRGB {
    return { r: rgba.red * 255, g: rgba.green * 255, b: rgba.blue * 255 };
}
