export function shuffle<T>(array: T[]): T[] {
    var m: number = array.length,
        t: T,
        i: number;
    while (m) {
        i = Math.floor(Math.random() * m--);
        t = array[m]!;
        array[m] = array[i]!;
        array[i] = t;
    }
    return array as T[];
}
