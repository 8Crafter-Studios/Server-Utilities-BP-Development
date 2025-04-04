globalThis.tryrun = function tryrun(callbackfn: () => any) {
    try {
        callbackfn();
    } catch { }
};

export {};
