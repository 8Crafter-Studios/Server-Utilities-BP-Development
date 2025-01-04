import "init/meta/importToMakeValidModule";
globalThis.twoWayModulo = function twoWayModulo(
    number: number,
    modulo: number
) {
    if (number < 0) {
        return modulo + (number % modulo);
    } else {
        return number % modulo;
    }
};
