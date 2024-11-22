export function fltToStr(float: number, radix: number = 10) {
    return String(float)
        .split(".")
        .map((v) => Number(v).toString(radix))
        .join(".");
}
