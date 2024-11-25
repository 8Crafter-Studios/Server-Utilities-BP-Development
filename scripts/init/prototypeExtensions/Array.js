Object.defineProperty(Array.prototype, "forEachB", {
    value: function forEachB(callbackfn, thisArg) {
        this.forEach((v, i, a) => {
            Object.defineProperty(function b() {
                callbackfn(v, i, a);
            }, "name", { value: `Array[${i}]` })();
        }, thisArg);
    },
});
export const exports_5603749806156139082470132985463298047098135609812364098 = undefined;
//# sourceMappingURL=Array.js.map