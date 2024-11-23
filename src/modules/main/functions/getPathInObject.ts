export function getPathInObject(
    directoryObject: { [k: string]: any; } | any[],
    path: (string | number)[] = ["input"]
) {
    let a: any;
    a = directoryObject;
    path.slice(1).forEach((v) => (a = a[v]));
    return a;
}
