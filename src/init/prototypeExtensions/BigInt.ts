Object.defineProperties(BigInt.prototype, {
    toNumber: {
        value: function toNumber(): number {
            return Number(this);
        },
        configurable: true,
        enumerable: true,
        writable: true,
    },
    toBigInt: {
        value: function toBigInt(): bigint {
            return this;
        },
        configurable: true,
        enumerable: true,
        writable: true,
    },
    toBoolean: {
        value: function toBoolean(): boolean {
            return this % 2n == 1n;
        },
        configurable: true,
        enumerable: true,
        writable: true,
    },
    toRomanNumerals: {
        value: function toRomanNumerals(
            limits: [min: bigint, max: bigint] = [1n, 10n],
            valueFor0n: string = "0"
        ): string {
            if (this > limits[1] || this < limits[0]) {
                return (this as bigint).toString();
            }
            var romanMatrix = [
                [1000n, "M"],
                [900n, "CM"],
                [500n, "D"],
                [400n, "CD"],
                [100n, "C"],
                [90n, "XC"],
                [50n, "L"],
                [40n, "XL"],
                [10n, "X"],
                [9n, "IX"],
                [5n, "V"],
                [4n, "IV"],
                [1n, "I"],
            ] as const;

            function convertToRoman(num: bigint): string {
                if (num === 0n) {
                    return valueFor0n;
                }
                for (var i = 0; i < romanMatrix.length; i++) {
                    if (num >= romanMatrix[i][0]) {
                        return (
                            romanMatrix[i][1] +
                            convertToRoman(num - romanMatrix[i][0])
                        );
                    }
                }
            }
            return (
                ((this as bigint) < 0 ? "-" : "") +
                convertToRoman((this as bigint).toBigInt())
            );
        },
        configurable: true,
        enumerable: true,
        writable: true,
    },
    isEven: {
        value: function isEven(): boolean {
            return this % 2n == 0n;
        },
        configurable: true,
        enumerable: true,
        writable: true,
    },
    isOdd: {
        value: function isOdd(): boolean {
            return this % 2n == 1n;
        },
        configurable: true,
        enumerable: true,
        writable: true,
    } /*,
    floor: {
        value: function (): number{
            return Math.floor(this)
        },
        configurable: true,
        enumerable: true,
        writable: true
    },
    round: {
        value: function (): number{
            return Math.round(this)
        },
        configurable: true,
        enumerable: true,
        writable: true
    },
    ceil: {
        value: function (): number{
            return Math.ceil(this)
        },
        configurable: true,
        enumerable: true,
        writable: true
    }*/,
});
export const exports_5603749806156139082470132985463298047098135609812364098 = void undefined as void;
declare global {
    interface BigInt {
        /** Returns a number representation of an object. */
        toNumber(): number;

        /** Returns a bigint representation of an object. */
        toBigInt(): ReturnType<this["valueOf"]>;

        /** Returns a boolean representation of an object. */
        toBoolean(): boolean;

        toRomanNumerals(
            limits?: [min: bigint, max: bigint],
            valueFor0n?: string
        ): string;

        /** The initial value of Number.prototype.constructor is the standard built-in Number constructor. */
        constructor: Function;

        /**
         * Determines whether an object has a property with the specified name.
         * @param v A property name.
         */
        hasOwnProperty(v: PropertyKey): boolean;
        hasOwnProperty(v: keyof this): boolean;

        /**
         * Determines whether an object exists in another object's prototype chain.
         * @param v Another object whose prototype chain is to be checked.
         */
        isPrototypeOf(v: Object): boolean;

        /**
         * Determines whether a specified property is enumerable.
         * @param v A property name.
         */
        propertyIsEnumerable(v: PropertyKey): boolean;
        propertyIsEnumerable(v: keyof this): boolean;
        __defineGetter__<P extends keyof this>(
            prop: P,
            func: () => any
        ): undefined;
        __defineSetter__<P extends keyof this>(
            prop: P,
            func: (val: any) => void
        ): undefined;
        __defineGetter__<P extends string>(prop: P, func: () => any): undefined;
        __defineSetter__<P extends string>(
            prop: P,
            func: (val: any) => void
        ): undefined;
        __lookupGetter__<P extends keyof this>(
            prop: P
        ): (() => this[P]) | undefined;
        __lookupSetter__<P extends keyof this>(
            prop: P
        ): ((val: this[P]) => void) | undefined;
        get __proto__(): BigInt;
        set __proto__(prototype: Object | null);
    }
}