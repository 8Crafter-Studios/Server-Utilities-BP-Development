import { extractIntArrayBGenerator } from "./extractIntArrayBGenerator";

export async function extractIntArrayG(
    arry: string,
    revivement: string = "-1",
    maxTimePerTick: number = 1500
) {
    return (
        await completeGenerator(
            extractIntArrayBGenerator(arry, revivement, maxTimePerTick),
            maxTimePerTick - 250
        )
    ).return
        .replaceAll(" ", "")
        .slice(1, -1)
        .split(",")
        .map((v) => Number.parseInt(v, 36));
}
