globalThis.tryget = function tryget<T>(callbackfn: () => T): T | undefined {
    try {
        return callbackfn() as T | undefined;
    } catch { }
};

export {};
