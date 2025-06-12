export function splitRange([min, max]: [min: number, max: number], size: number): [min: number, max: number][] {
    const result: [min: number, max: number][] = [];
    let start: number = min;

    while (start <= max) {
        const end = Math.min(start + size - 1, max);
        result.push([start, end]);
        start = end + 1;
    }

    return result;
}
