export function splitRange([min, max]: [number, number], size: number) {
    const result = [] as [number, number][];
    let start = min;

    while (start <= max) {
        const end = Math.min(start + size - 1, max);
        result.push([start, end]);
        start = end + 1;
    }

    return result;
}
