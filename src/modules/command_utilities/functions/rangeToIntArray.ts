export function rangeToIntArray(range: [number, number]) {
    let array = [] as number[];
    for (let i = range[0]; i < range[1]; i++) {
        array.push(i);
    }
    return array;
}
