export function assertIsDefined<T>(value: T): asserts value is NonNullable<T> {
    if (value === undefined || value === null) {
        throw new Error(`${value} is not defined`);
    }
}
Object.defineProperty(globalThis, "assertIsDefined", {
    value: assertIsDefined,
    configurable: false,
    enumerable: true,
    writable: false,
});
declare global {
    const assertIsDefined: typeof import("./assertIsDefined").assertIsDefined;
}
