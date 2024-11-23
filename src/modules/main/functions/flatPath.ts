export function flatPath(
    directoryObject: { [k: string]: any; },
    startingPath: string[] = ["input"]
) {
    function flatPathArray(
        a: any[],
        currentPath: string[] = ["input"]
    ): {
        path: string[];
        name: string;
        index?: number;
        arrayindex?: number;
        objectindex?: number;
        [k: string]: any;
    }[] {
        return [
            { path: currentPath, name: currentPath[currentPath.length - 1] },
            a.flatMap((v, i) => v instanceof Array
                ? flatPathArray(v, [...currentPath, String(i)])
                : typeof v == "object"
                    ? (v as any)?.notPathable == true
                        ? {
                            path: [...currentPath, String(i)],
                            name: v?.name ?? String(i),
                            index: i,
                            arrayindex: i,
                            notPathable: true,
                        }
                        : flatPathObject(v, [...currentPath, String(i)])
                    : {
                        path: [...currentPath, String(i)],
                        name: String(i),
                        index: i,
                        arrayindex: i,
                    }
            ),
        ] as {
            path: string[];
            name: string;
            index?: number;
            arrayindex?: number;
            objectindex?: number;
            [k: string]: any;
        }[];
    }
    function flatPathObject(
        o: { [k: string]: any; },
        currentPath: string[] = ["input"]
    ): {
        path: string[];
        name: string;
        index?: number;
        arrayindex?: number;
        objectindex?: number;
        [k: string]: any;
    }[] {
        return [
            { path: currentPath, name: currentPath[currentPath.length - 1] },
            Object.entries(o).flatMap((v, i) => v[1] instanceof Array
                ? flatPathArray(v[1], [...currentPath, v[0]])[0]
                : typeof v[1] == "object"
                    ? (v[1] as any)?.notPathable == true
                        ? {
                            path: [...currentPath, v[0]],
                            name: v[0],
                            index: i,
                            objectindex: i,
                            notPathable: true,
                        }
                        : flatPathObject(v[1], [...currentPath, v[0]])
                    : {
                        path: [...currentPath, v[0]],
                        name: v[0],
                        index: i,
                        objectindex: i,
                    }
            ),
        ] as {
            path: string[];
            name: string;
            index?: number;
            arrayindex?: number;
            objectindex?: number;
            [k: string]: any;
        }[];
    }
    return flatPathObject(directoryObject, startingPath);
}
