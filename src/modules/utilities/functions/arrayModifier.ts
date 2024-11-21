/**
 * @deprecated
 */
export function arrayModifier<T>(sourcearray: T[], callbackfn: (value: T, index: number, array: T[]) => any, overwrite: boolean = false) {
    if (overwrite) {
        sourcearray.forEach((v, i, a) => {
            sourcearray[i] = callbackfn(v, i, a);
        });
        return sourcearray;
    } else {
        let newarray: any[];
        newarray = [];
        sourcearray.forEach((v, i, a) => {
            newarray[i] = callbackfn(v, i, a);
        });
        return newarray;
    }
}
;
