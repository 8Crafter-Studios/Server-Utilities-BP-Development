
export const compareArraysB = (array1: any[], array2: any[]) => array1.length === array2.length &&
    array1.sort().every((value, index) => value === array2.sort()[index]);
