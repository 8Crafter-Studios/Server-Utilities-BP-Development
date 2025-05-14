import "init/meta/importToMakeValidModule";
globalThis.cullNull = function cullNull<T extends any[] | readonly any[]>(array: T) {
    return array.filter((v) => v !== null);
};
