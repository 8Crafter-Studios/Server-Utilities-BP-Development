globalThis.cullNull = function cullNull<T extends any[]>(array: T) {
    return array.filter((v) => v !== null);
};
