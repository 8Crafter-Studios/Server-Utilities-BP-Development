export declare function numberFormatter_compact(number: string | number | bigint | boolean, isMoney: boolean, compressedDigitsNumDecimalsOptions?: {
    /**
     * How many decimals there should be when there are 3 digits.
     *
     * @default 0
     */
    3?: number;
    /**
     * How many decimals there should be when there are 2 digits.
     *
     * @default 1
     */
    2?: number;
    /**
     * How many decimals there should be when there is 1 digit.
     *
     * @default 2
     */
    1?: number;
}, decimalPlaces?: number): string;
export declare function numberFormatter(number: string | number | bigint | boolean, options: {
    prefixWithDollarSign: boolean;
    addCommaSeparators: boolean;
}, decimalPlaces?: number): string;
