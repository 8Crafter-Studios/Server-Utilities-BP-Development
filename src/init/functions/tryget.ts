globalThis.tryget = function tryget<T>(callbackfn: () => T) {
    try {
        return callbackfn() as T | undefined;
    } catch { }
};

export {};
