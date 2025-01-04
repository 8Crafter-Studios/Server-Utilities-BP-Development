import "init/meta/importToMakeValidModule";
globalThis.cwarn = function cwarn(...data: any[]) {
    console.warn(data);
};
