export function customModulo(dividend: number, min: number, max: number, inclusive: number | boolean = false) {
    inclusive = Number(inclusive);
    max += inclusive;
    if (min >= max) {
        throw new Error('Invalid range: min value must be less than max value');
    }

    if (!Number.isFinite(dividend)) {
        return dividend;
    }

    if (dividend < min) {
        const range = max - min;
        return customModulo(dividend + range, min, max);
    }

    if (dividend >= max) {
        const range = max - min;
        return customModulo(dividend - range, min, max);
    }

    return dividend;
}
