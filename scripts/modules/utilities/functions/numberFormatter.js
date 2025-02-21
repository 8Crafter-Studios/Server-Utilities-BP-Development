export function numberFormatter_compact(number, isMoney, compressedDigitsNumDecimalsOptions = { 3: 0, 2: 1, 1: 2 }, decimalPlaces = 0) {
    // Convert the number to a Decimal instance with 1000 precision and a rounding mode of always rounding down.
    let dec = new (Decimal.clone({ precision: 1000, rounding: 1 }))(String(number));
    const negative = dec.lessThan(0);
    dec = dec.abs();
    const map = [
        { suffix: "Vg", threshold: 10n ** 63n },
        { suffix: "NDc", threshold: 10n ** 60n },
        { suffix: "ODc", threshold: 10n ** 57n },
        { suffix: "SpDc", threshold: 10n ** 54n },
        { suffix: "SxDc", threshold: 10n ** 51n },
        { suffix: "QiDc", threshold: 10n ** 48n },
        { suffix: "QaDc", threshold: 10n ** 45n },
        { suffix: "TDc", threshold: 10n ** 42n },
        { suffix: "DDc", threshold: 10n ** 39n },
        { suffix: "UDc", threshold: 10n ** 36n },
        { suffix: "Dc", threshold: 10n ** 33n },
        { suffix: "No", threshold: 10n ** 30n },
        { suffix: "Oc", threshold: 10n ** 27n },
        { suffix: "Sp", threshold: 10n ** 24n },
        { suffix: "Sx", threshold: 10n ** 21n },
        { suffix: "Qi", threshold: 10n ** 18n },
        { suffix: "Qa", threshold: 10n ** 15n },
        { suffix: "T", threshold: 10n ** 12n },
        { suffix: "B", threshold: 10n ** 9n },
        { suffix: "M", threshold: 10n ** 6n },
        { suffix: "K", threshold: 10n ** 3n },
        { suffix: "", threshold: 1n },
    ];
    const found = map.find((x) => dec.greaterThanOrEqualTo(x.threshold.toString()));
    if (found) {
        const dec2 = dec.div(found.threshold.toString());
        const formatted = dec2.toFixed(found.threshold === 1n
            ? decimalPlaces
            : dec2.greaterThanOrEqualTo(100)
                ? compressedDigitsNumDecimalsOptions[3] ?? 0
                : dec2.greaterThanOrEqualTo(10)
                    ? compressedDigitsNumDecimalsOptions[2] ?? 1
                    : compressedDigitsNumDecimalsOptions[3] ?? 2) + found.suffix;
        return (negative ? "-" : "") + (isMoney ? "$" : "") + formatted;
    }
    return (negative ? "-" : "") + (isMoney ? "$" : "") + dec.toFixed(decimalPlaces);
}
export function numberFormatter(number, options, decimalPlaces = 0) {
    let str = new (Decimal.clone({ precision: 1000 }))(String(number)).toFixed(decimalPlaces);
    if (options.prefixWithDollarSign) {
        if (str.startsWith("-")) {
            str = "-$" + str.slice(1);
        }
        else {
            str = "$" + str;
        }
    }
    if (options.addCommaSeparators) {
        const strs = str.split(".");
        strs[0] = strs[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        str = strs.join(".");
    }
    return str;
}
//# sourceMappingURL=numberFormatter.js.map