Object.defineProperty(Error.prototype, "stringify", {
    value: function stringify() {
        return this + " " + this.stack;
    },
    configurable: true,
    enumerable: true,
    writable: true,
});
export const exports_5603749806156139082470132985463298047098135609812364098 = void undefined as void;
declare global {
    interface Error {
        stringify(): string;
    }
}