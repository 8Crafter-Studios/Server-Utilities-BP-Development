export function strToFlt(string: string, radix: number = 10) {
    return Number(
        string
            .split(".")
            .map((v) => String(Number.parseInt(v, radix)))
            .join(".")
    );
}
