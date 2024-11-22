export function getType(areaGroup: string, type: number) {
    return areaGroup
        .split("|")
        .filter((q) => q.split(", ")[6] == String(type))
        .join("|");
}
