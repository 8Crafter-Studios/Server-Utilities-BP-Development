
export function sOSATSA(stringOrStringArray: string | string[]): string[] {
    return typeof stringOrStringArray == "string"
        ? [stringOrStringArray]
        : stringOrStringArray;
}
