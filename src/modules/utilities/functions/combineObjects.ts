export function combineObjects(obj1: object, obj2: object) { return Object.fromEntries(Object.entries(obj1).concat(Object.entries(obj2))); }
