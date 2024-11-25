Object.defineProperties(Number.prototype, {
    toNumber: {
        value: function toNumber(): number {
            return this;
        },
        configurable: true,
        enumerable: true,
        writable: true,
    },
    toBigInt: {
        value: function toBigInt(): bigint {
            return BigInt(this);
        },
        configurable: true,
        enumerable: true,
        writable: true,
    },
    toBoolean: {
        value: function toBoolean(): boolean {
            return Number.isNaN(this) ? false : (this % 2).round() == 1;
        },
        configurable: true,
        enumerable: true,
        writable: true,
    },
    toRomanNumerals: {
        value: function toRomanNumerals(
            limits: [min: number, max: number] = [1, 10],
            valueFor0: string = "0"
        ): string {
            if (
                this > limits[1] ||
                this < limits[0] ||
                !(this as number).isInteger() ||
                (this as number).isNaN()
            ) {
                return (this as number).toString();
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
                    return valueFor0;
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
                ((this as number) < 0 ? "-" : "") +
                convertToRoman((this as number).toBigInt())
            );
        },
        configurable: true,
        enumerable: true,
        writable: true,
    },
    isNaN: {
        value: function isNaN(): boolean {
            return Number.isNaN(this);
        },
        configurable: true,
        enumerable: true,
        writable: true,
    },
    isFinite: {
        value: function isFinite(): boolean {
            return Number.isFinite(this);
        },
        configurable: true,
        enumerable: true,
        writable: true,
    },
    isInteger: {
        value: function isInteger(): boolean {
            return Number.isInteger(this);
        },
        configurable: true,
        enumerable: true,
        writable: true,
    },
    isSafeInteger: {
        value: function isSafeInteger(): boolean {
            return Number.isSafeInteger(this);
        },
        configurable: true,
        enumerable: true,
        writable: true,
    },
    isEven: {
        value: function isEven(): boolean {
            return Number.isNaN(this) ? false : (this % 2).round() == 0;
        },
        configurable: true,
        enumerable: true,
        writable: true,
    },
    isOdd: {
        value: function isOdd(): boolean {
            return Number.isNaN(this) ? false : (this % 2).round() == 1;
        },
        configurable: true,
        enumerable: true,
        writable: true,
    },
    floor: {
        value: function (): number {
            return Math.floor(this);
        },
        configurable: true,
        enumerable: true,
        writable: true,
    },
    round: {
        value: function (): number {
            return Math.round(this);
        },
        configurable: true,
        enumerable: true,
        writable: true,
    },
    ceil: {
        value: function (): number {
            return Math.ceil(this);
        },
        configurable: true,
        enumerable: true,
        writable: true,
    },
});
export const exports_5603749806156139082470132985463298047098135609812364098 =
    undefined;
declare global {
    interface Number {
        /** Returns a number representation of an object. */
        toNumber(): ReturnType<this["valueOf"]>;

        /** Returns a bigint representation of an object. */
        toBigInt(): bigint;

        /** Returns a boolean representation of an object. */
        toBoolean(): boolean;

        toRomanNumerals(
            limits?: [min: number, max: number],
            valueFor0?: string
        ): string;

        /** Returns whether or not the number is NaN. */
        isNaN(): boolean;

        /** Returns whether or not the number is finite. */
        isFinite(): boolean;

        /** Returns whether or not the number is an integer. */
        isInteger(): boolean;

        /** Returns whether or not the number is a safe integer. */
        isSafeInteger(): boolean;

        /** Returns whether or not the number is even. */
        isEven(): boolean;

        /** Returns whether or not the number is odd. */
        isOdd(): boolean;

        /** Runs the Math.floor() function on the number. */
        floor(): number;

        /** Runs the Math.round() function on the number. */
        round(): number;

        /** Runs the Math.ceil() function on the number. */
        ceil(): number;

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
        get __proto__(): Number;
        set __proto__(prototype: Object | null);
    }
}