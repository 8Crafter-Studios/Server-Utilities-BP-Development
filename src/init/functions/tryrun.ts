import "init/meta/importToMakeValidModule";
globalThis.tryrun = function tryrun(callbackfn: () => any) {
    try {
        callbackfn();
    } catch { }
};
