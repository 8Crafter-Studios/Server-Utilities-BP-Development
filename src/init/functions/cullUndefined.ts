import "init/meta/importToMakeValidModule";
globalThis.cullUndefined = function cullUndefined<T extends any[] | readonly any[]>(array: T) {
    return array.filter((v) => v !== undefined);
};
