import { ultraExtractIntArrayB } from "./ultraExtractIntArrayB";

export function ultraExtractIntArray(arry: string, revivement: string = "-1") {
    return ultraExtractIntArrayB(arry, (revivement = "-1"))
        .replaceAll(" ", "")
        .slice(1, -1)
        .split(",")
        .map((v) => Number.parseInt(v, 36));
}
