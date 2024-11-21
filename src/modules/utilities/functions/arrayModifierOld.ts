/**
 * @deprecated
 */
export function arrayModifierOld(array: any[], callbackfn: (value: any, index: number, array: any[]) => any) { array.forEach((v, i, a) => { array[i] = callbackfn(v, i, a); }); return array; }
