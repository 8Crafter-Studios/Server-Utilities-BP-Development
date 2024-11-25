globalThis.cullUndefined = function cullUndefined<T extends any[]>(array: T) {
    return array.filter((v) => v !== undefined);
};
