Object.defineProperties(Array.prototype, {
    forEachB: {
        value: function forEachB<T>(
            callbackfn: (value: T, index: number, array: T[]) => void,
            thisArg?: any
        ): void {
            (this as Array<T>).forEach((v, i, a) => {
                Object.defineProperty(
                    function b() {
                        callbackfn(v, i, a);
                    },
                    "name",
                    { value: `Array[${i}]` }
                )();
            }, thisArg);
        },
        configurable: true,
        enumerable: false,
        writable: false,
    },
    mapAsync: {
        value: async function mapAsync<T, U>(
            callbackfn: (value: T, index: number, array: T[]) => U,
            thisArg?: any
        ) {
            const out: Awaited<U>[] = [];
            const array = this as Array<T>;
            let i = 0;
            for (const v of array) {
                out[i] = await callbackfn.bind(thisArg)(v, i, array);
                i++;
            }
            return out;
        },
        configurable: true,
        enumerable: false,
        writable: false,
    },
    awaitEach: {
        value: async function awaitEach<T>() {
            const out: Awaited<T>[] = [];
            const array = this as Array<T>;
            let i = 0;
            for await(let v of array) {
                out[i] = v;
                i++;
            }
            return out;
        },
        configurable: true,
        enumerable: false,
        writable: false,
    },
    randomElement: {
        value: function randomElement<T>(): T {
            return this[Math.floor(Math.random() * this.length)];
        },
        configurable: true,
        enumerable: false,
        writable: false,
    },
});
export const exports_5603749806156139082470132985463298047098135609812364098: undefined =
    undefined;
declare global {
    interface Array<T> {
        /**
         * Performs the specified action for each element in an array and will include the current index in any errors.
         *
         * @param callbackfn  A function that accepts up to three arguments. forEach calls the callbackfn function one time for each element in the array.
         * @param thisArg  An object to which the this keyword can refer in the callbackfn function. If thisArg is omitted, undefined is used as the this value.
         */
        forEachB(
            callbackfn: (value: T, index: number, array: T[]) => void,
            thisArg?: any
        ): void;
        /**
         * Calls a defined async callback function on each element of an array, and returns an array that contains the awaited results.
         *
         * @async
         * @param callbackfn An async function that accepts up to three arguments. The map method calls and awaits the completion of the async callbackfn function one time for each element in the array.
         * @param thisArg An object to which the this keyword can refer in the callbackfn function. If thisArg is omitted, undefined is used as the this value.
         */
        mapAsync<U>(
            callbackfn: (value: T, index: number, array: T[]) => U,
            thisArg?: any
        ): Promise<Awaited<U>[]>;
        /**
         * Awaits each element in the array.
         *
         * @async
         * @returns {Promise<Awaited<T>[]>} The awaited array elements.
         */
        awaitEach(
        ): Promise<Awaited<T>[]>;
        /**
         * Returns a random element from the array.
         *
         * @returns {T[number]} The random element.
         */
        randomElement(): T;
    }
}
