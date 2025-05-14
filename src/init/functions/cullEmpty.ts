import "init/meta/importToMakeValidModule";
globalThis.cullEmpty = function cullEmpty<T extends any[] | readonly any[]>(array: T) {
    return array.filter((v) => v!=undefined);
};
