Object.defineProperties(Boolean.prototype, {
    /*
    toString: {
        value: function (): "true"|"false"{
            return this.valueOf()?"true":"false"
        },
        configurable: true,
        enumerable: true,
        writable: true
    },*/
    toNumber: {
        value: function (): 0 | 1 {
            return +this as 0 | 1;
        },
        configurable: true,
        enumerable: true,
        writable: true,
    },
    toBigInt: {
        value: function (): 0n | 1n {
            return BigInt(+this) as 0n | 1n;
        },
        configurable: true,
        enumerable: true,
        writable: true,
    },
    toBoolean: {
        value: function (): boolean {
            return this;
        },
        configurable: true,
        enumerable: true,
        writable: true,
    },
    toFormattedString: {
        value: function (): "§aTrue" | "§cFalse" {
            return this.valueOf() ? "§aTrue" : "§cFalse";
        },
        configurable: true,
        enumerable: true,
        writable: true,
    },
    toFormattedStringB: {
        value: function (): "§2True" | "§4False" {
            return this.valueOf() ? "§2True" : "§4False";
        },
        configurable: true,
        enumerable: true,
        writable: true,
    },
    toFormattedStringED: {
        value: function (): "§aEnabled" | "§cDisabled" {
            return this.valueOf() ? "§aEnabled" : "§cDisabled";
        },
        configurable: true,
        enumerable: true,
        writable: true,
    },
    toFormattedStringEDB: {
        value: function (): "§2Enabled" | "§4Disabled" {
            return this.valueOf() ? "§2Enabled" : "§4Disabled";
        },
        configurable: true,
        enumerable: true,
        writable: true,
    },
    toFormattedStringIO: {
        value: function (): "§aON" | "§cOFF" {
            return this.valueOf() ? "§aON" : "§cOFF";
        },
        configurable: true,
        enumerable: true,
        writable: true,
    },
    toFormattedStringIOB: {
        value: function (): "§2ON" | "§4OFF" {
            return this.valueOf() ? "§2ON" : "§4OFF";
        },
        configurable: true,
        enumerable: true,
        writable: true,
    },
    toFormattedStringIOL: {
        value: function (): "§aOn" | "§cOff" {
            return this.valueOf() ? "§aOn" : "§cOff";
        },
        configurable: true,
        enumerable: true,
        writable: true,
    },
    toFormattedStringIOLB: {
        value: function (): "§2On" | "§4Off" {
            return this.valueOf() ? "§2On" : "§4Off";
        },
        configurable: true,
        enumerable: true,
        writable: true,
    },
    toFormattedStringYN: {
        value: function (): "§aYes" | "§cNo" {
            return this.valueOf() ? "§aYes" : "§cNo";
        },
        configurable: true,
        enumerable: true,
        writable: true,
    },
    toFormattedStringYNB: {
        value: function (): "§2Yes" | "§4No" {
            return this.valueOf() ? "§2Yes" : "§4No";
        },
        configurable: true,
        enumerable: true,
        writable: true,
    },
});
export const exports_5603749806156139082470132985463298047098135609812364098: undefined =
    undefined;
declare global {
    interface Boolean {
        toFormattedString(): "§aTrue" | "§cFalse";
        toFormattedStringB(): "§2True" | "§4False";
        toFormattedStringED(): "§aEnabled" | "§cDisabled";
        toFormattedStringEDB(): "§2Enabled" | "§4Disabled";
        toFormattedStringIO(): "§aON" | "§cOFF";
        toFormattedStringIOB(): "§2ON" | "§4OFF";
        toFormattedStringIOL(): "§aOn" | "§cOff";
        toFormattedStringIOLB(): "§2On" | "§4Off";
        toFormattedStringYN(): "§aYes" | "§cNo";
        toFormattedStringYNB(): "§2Yes" | "§4No";

        /** Returns a number representation of an object. */
        toNumber(): 0 | 1;

        /** Returns a number representation of an object. */
        toBigInt(): 0n | 1n;

        /** Returns a boolean representation of an object. */
        toBoolean(): boolean;

        /** The initial value of Boolean.prototype.constructor is the standard built-in Boolean constructor. */
        constructor: Function;

        /** Returns a string representation of an object. */
        toString(): "true" | "false";

        /** Returns a date converted to a string using the current locale. */
        toLocaleString(): string;

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
        get __proto__(): Boolean;
        set __proto__(prototype: Object | null);
    }
}