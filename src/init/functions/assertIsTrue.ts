export function assertIsTrue(value: any, key?: string): asserts value is true {
    if (value !== true) {
        throw new Error(`${key ?? "The expression"} did not evaluate true. It instead evaluated to ${value}.`);
    }
}
Object.defineProperty(globalThis, "assertIsTrue", {
    value: assertIsTrue,
    configurable: false,
    enumerable: true,
    writable: false,
});
declare global {
    const assertIsTrue: typeof import("./assertIsTrue").assertIsTrue;
}
