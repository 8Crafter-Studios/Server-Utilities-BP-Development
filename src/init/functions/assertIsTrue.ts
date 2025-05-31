namespace exports {
    /**
     * Asserts that a value is `true`.
     *
     * @template T The type of the value to check.
     * @param {T} value The value to check.
     * @returns {asserts value is NonNullable<T>} Asserts that the value is `true`.
     *
     * @throws {Error} If the value is not `true`.
     */
    export function assertIsTrue(value: any, key?: string): asserts value is true {
        if (value !== true) {
            throw new Error(`${key ?? "The expression"} did not evaluate to true. It instead evaluated to ${value}.`);
        }
    }
}

export import assertIsTrue = exports.assertIsTrue;

Object.defineProperty(globalThis, "assertIsTrue", {
    value: assertIsTrue,
    configurable: false,
    enumerable: true,
    writable: false,
});

declare global {
    namespace globalThis {
        export import assertIsTrue = exports.assertIsTrue;
    }
}
