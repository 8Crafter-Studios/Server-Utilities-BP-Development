Object.defineProperty(Array.prototype, "forEachB", {
    value: function forEachB<T>(
        callbackfn: (value: T, index: number, array: T[]) => void,
        thisArg?: any
    ) {
        this.forEach((v, i, a) => {
            Object.defineProperty(
                function b() {
                    callbackfn(v, i, a);
                },
                "name",
                { value: `Array[${i}]` }
            )();
        }, thisArg);
    },
});
export const exports_5603749806156139082470132985463298047098135609812364098 =
    undefined;
declare global {
    interface Array<T> {
        /**
         * Performs the specified action for each element in an array and will include the current index in any errors.
         * @param callbackfn  A function that accepts up to three arguments. forEach calls the callbackfn function one time for each element in the array.
         * @param thisArg  An object to which the this keyword can refer in the callbackfn function. If thisArg is omitted, undefined is used as the this value.
         */
        forEachB(
            callbackfn: (value: T, index: number, array: T[]) => void,
            thisArg?: any
        ): void;
    }
}