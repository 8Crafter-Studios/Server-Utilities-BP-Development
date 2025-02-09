Object.defineProperty(String.prototype, "escapeCharacters", {
    value: function (
        js: boolean,
        unicode: boolean,
        nullchar: number,
        uri: boolean,
        quotes: boolean,
        general: boolean,
        colon: boolean,
        x: boolean,
        s: boolean
    ) {
        //:Get primitive copy of string:
        var str = this.valueOf(); /*
        console.warn(unescape(str))*/

        //:Append Characters To End:
        if (js == true) {
            try {
                str = eval("`" + str.replaceAll("`", "\\`") + "`");
            } catch (e) {
                console.error(e, e.stack);
            }
        }
        if (general == true) {
            str = str.replaceAll("\\n", "\n");
            str = str.replaceAll("\\f", "\f");
            str = str.replaceAll("\\r", "\r");
            str = str.replaceAll("\\t", "\t");
            str = str.replaceAll("\\v", "\v");
            str = str.replaceAll("\\b", "\b");
            str = str.replaceAll("\\l", "\u2028");
            str = str.replaceAll("\\p", "\u2029");
        }
        if (quotes == true) {
            str = str.replaceAll("\\qd", '"');
            str = str.replaceAll("\\qs", "'");
        }
        if (colon == true) {
            str = str.replaceAll("\\cs", ";");
            str = str.replaceAll("\\cf", ":");
        }
        if (x == true) {
            str = str.replaceAll("\\x", "");
        }
        if (s == true) {
            str = str.replaceAll("\\s", "");
        }
        if (nullchar == 1) {
            str = str.replaceAll("\\0", "\0");
        }
        if (nullchar == 2) {
            str = str.replaceAll("\\0", "");
        }
        if (unicode == true) {
            let strarray = ("t" + str).split("\\u");
            strarray.forEach((values, index) => {
                /*console.warn(/[0-9A-F]{2}/i.test(values.slice(0, 6))); */
                if (
                    /[01][0-9x][0-9A-F]{4}/i.test(values.slice(0, 6)) &&
                    index !== 0
                ) {
                    /*
            console.warn((values.slice(0, 6))); */
                    strarray[index] =
                        String.fromCodePoint(Number(values.slice(0, 6))) +
                        values.slice(6);
                } else {
                    if (
                        /[+][0-9]{7}/i.test(values.slice(0, 8)) &&
                        index !== 0
                    ) {
                        strarray[index] =
                            String.fromCodePoint(Number(values.slice(1, 8))) +
                            values.slice(8);
                    } else {
                        if (
                            /[+][0-9]{6}/i.test(values.slice(0, 7)) &&
                            index !== 0
                        ) {
                            strarray[index] =
                                String.fromCodePoint(
                                    Number(values.slice(1, 7))
                                ) + values.slice(7);
                        } else {
                            if (
                                /[+][0-9]{5}/i.test(values.slice(0, 6)) &&
                                index !== 0
                            ) {
                                strarray[index] =
                                    String.fromCodePoint(
                                        Number(values.slice(1, 6))
                                    ) + values.slice(6);
                            } else {
                                if (
                                    /[+][0-9]{4}/i.test(values.slice(0, 5)) &&
                                    index !== 0
                                ) {
                                    strarray[index] =
                                        String.fromCodePoint(
                                            Number(values.slice(1, 5))
                                        ) + values.slice(5);
                                } else {
                                    if (
                                        /[+][0-9]{3}/i.test(
                                            values.slice(0, 4)
                                        ) &&
                                        index !== 0
                                    ) {
                                        strarray[index] =
                                            String.fromCodePoint(
                                                Number(values.slice(1, 4))
                                            ) + values.slice(4);
                                    } else {
                                        if (
                                            /[+][0-9]{2}/i.test(
                                                values.slice(0, 3)
                                            ) &&
                                            index !== 0
                                        ) {
                                            strarray[index] =
                                                String.fromCodePoint(
                                                    Number(values.slice(1, 3))
                                                ) + values.slice(3);
                                        } else {
                                            if (
                                                /[+][0-9]{1}/i.test(
                                                    values.slice(0, 2)
                                                ) &&
                                                index !== 0
                                            ) {
                                                strarray[index] =
                                                    String.fromCodePoint(
                                                        Number(
                                                            values.slice(1, 2)
                                                        )
                                                    ) + values.slice(2);
                                            } else {
                                                if (index !== 0) {
                                                    strarray[index] =
                                                        "\\u" + values.slice(0);
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            });
            str = strarray.join("").slice(1);
        }
        if (uri == true) {
            str = unescape(str);
        }

        //:Return modified copy:
        return str;
    },
    configurable: true,
    enumerable: true,
    writable: true,
});
Object.defineProperty(String.prototype, "escapeCharactersB", {
    value: function (
        js: boolean,
        unicode: boolean,
        nullchar: number,
        uri: boolean,
        quotes: boolean,
        general: boolean,
        colon: boolean,
        x: boolean,
        s: boolean
    ) {
        //:Get primitive copy of string:
        var str: string = this.valueOf(); /*
        console.warn(unescape(str))*/
        var eb: Error[];
        eb = undefined;

        //:Append Characters To End:
        if (js == true) {
            try {
                str = eval("`" + str.replaceAll("`", "\\`") + "`");
            } catch (e) {
                eb.push(e);
                console.error(e, e.stack);
            }
        }
        if (general == true) {
            str = str.replaceAll("\\n", "\n");
            str = str.replaceAll("\\f", "\f");
            str = str.replaceAll("\\r", "\r");
            str = str.replaceAll("\\t", "\t");
            str = str.replaceAll("\\v", "\v");
            str = str.replaceAll("\\b", "\b");
            str = str.replaceAll("\\l", "\u2028");
            str = str.replaceAll("\\p", "\u2029");
        }
        if (quotes == true) {
            str = str.replaceAll("\\qd", '"');
            str = str.replaceAll("\\qs", "'");
        }
        if (colon == true) {
            str = str.replaceAll("\\cs", ";");
            str = str.replaceAll("\\cf", ":");
        }
        if (x == true) {
            str = str.replaceAll("\\x", "");
        }
        if (s == true) {
            str = str.replaceAll("\\s", "");
        }
        if (nullchar == 1) {
            str = str.replaceAll("\\0", "\0");
        }
        if (nullchar == 2) {
            str = str.replaceAll("\\0", "");
        }
        if (unicode == true) {
            let strarray = ("t" + str).split("\\u");
            strarray.forEach((values, index) => {
                /*console.warn(/[0-9A-F]{2}/i.test(values.slice(0, 6))); */
                if (
                    /[01][0-9x][0-9A-F]{4}/i.test(values.slice(0, 6)) &&
                    index !== 0
                ) {
                    /*
            console.warn((values.slice(0, 6))); */
                    strarray[index] =
                        String.fromCodePoint(Number(values.slice(0, 6))) +
                        values.slice(6);
                } else {
                    if (
                        /[+][0-9]{7}/i.test(values.slice(0, 8)) &&
                        index !== 0
                    ) {
                        strarray[index] =
                            String.fromCodePoint(Number(values.slice(1, 8))) +
                            values.slice(8);
                    } else {
                        if (
                            /[+][0-9]{6}/i.test(values.slice(0, 7)) &&
                            index !== 0
                        ) {
                            strarray[index] =
                                String.fromCodePoint(
                                    Number(values.slice(1, 7))
                                ) + values.slice(7);
                        } else {
                            if (
                                /[+][0-9]{5}/i.test(values.slice(0, 6)) &&
                                index !== 0
                            ) {
                                strarray[index] =
                                    String.fromCodePoint(
                                        Number(values.slice(1, 6))
                                    ) + values.slice(6);
                            } else {
                                if (
                                    /[+][0-9]{4}/i.test(values.slice(0, 5)) &&
                                    index !== 0
                                ) {
                                    strarray[index] =
                                        String.fromCodePoint(
                                            Number(values.slice(1, 5))
                                        ) + values.slice(5);
                                } else {
                                    if (
                                        /[+][0-9]{3}/i.test(
                                            values.slice(0, 4)
                                        ) &&
                                        index !== 0
                                    ) {
                                        strarray[index] =
                                            String.fromCodePoint(
                                                Number(values.slice(1, 4))
                                            ) + values.slice(4);
                                    } else {
                                        if (
                                            /[+][0-9]{2}/i.test(
                                                values.slice(0, 3)
                                            ) &&
                                            index !== 0
                                        ) {
                                            strarray[index] =
                                                String.fromCodePoint(
                                                    Number(values.slice(1, 3))
                                                ) + values.slice(3);
                                        } else {
                                            if (
                                                /[+][0-9]{1}/i.test(
                                                    values.slice(0, 2)
                                                ) &&
                                                index !== 0
                                            ) {
                                                strarray[index] =
                                                    String.fromCodePoint(
                                                        Number(
                                                            values.slice(1, 2)
                                                        )
                                                    ) + values.slice(2);
                                            } else {
                                                if (index !== 0) {
                                                    strarray[index] =
                                                        "\\u" + values.slice(0);
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            });
            str = strarray.join("").slice(1);
        }
        if (uri == true) {
            str = unescape(str);
        }

        //:Return modified copy:
        return { v: str, e: eb };
    },
    configurable: true,
    enumerable: true,
    writable: true,
});
Object.defineProperties(String.prototype, {
    toNumber: {
        value: function (): number | undefined {
            var str: string = this;
            return Number.isNaN(Number(str))
                ? str.toLowerCase() == "infinity"
                    ? Infinity
                    : str.toLowerCase() == "-infinity"
                    ? -Infinity
                    : undefined
                : Number(str);
        },
        configurable: true,
        enumerable: true,
        writable: true,
    },
    toBigInt: {
        value: function toBigInt(): bigint | undefined {
            var str: string = this;
            return Number.isNaN(Number(str)) ? undefined : BigInt(this);
        },
        configurable: true,
        enumerable: true,
        writable: true,
    },
    toBoolean: {
        value: function (): boolean {
            var simplified: string = this.toLowerCase().trim();
            var numberified: number | undefined = simplified.toNumber();
            return simplified.startsWith("t")
                ? true
                : simplified.startsWith("f")
                ? false
                : simplified.startsWith("y")
                ? true
                : simplified.startsWith("n")
                ? false
                : !!numberified
                ? numberified.toBoolean()
                : Boolean(simplified);
        },
        configurable: true,
        enumerable: true,
        writable: true,
    },
});
export const exports_5603749806156139082470132985463298047098135609812364098: undefined =
    undefined;
declare global {
    interface String {
        escapeCharacters(
            js?: boolean,
            unicode?: boolean,
            nullchar?: number,
            uri?: boolean,
            quotes?: boolean,
            general?: boolean,
            colon?: boolean,
            x?: boolean,
            s?: boolean
        ): string;
        escapeCharactersB(
            js?: boolean,
            unicode?: boolean,
            nullchar?: number,
            uri?: boolean,
            quotes?: boolean,
            general?: boolean,
            colon?: boolean,
            x?: boolean,
            s?: boolean
        ): { v: string; e?: Error[] };

        /** Returns a number representation of an object. */
        toNumber(): number | undefined;

        /** Returns a bigint representation of an object. */
        toBigInt(): bigint | undefined;

        /** Returns a boolean representation of an object. */
        toBoolean(): boolean;

        /** The initial value of String.prototype.constructor is the standard built-in String constructor. */
        constructor: Function;

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
        get __proto__(): String;
        set __proto__(prototype: Object | null);
    }
}