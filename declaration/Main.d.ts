export declare const mainmetaimport: ImportMeta;
export declare const editorStickMenuOpeningAsyncCancelActionNumbers: {
    [id: string]: number;
};
export declare function mainEval(x: string): any;
export declare function indirectMainEval(x: string): any;
export declare function mainRun(x: (...args: any[]) => any, ...args: any[]): any;
export type Mutable<T> = {
    -readonly [P in keyof T]: T[P];
};
export type MutableRequired<T> = {
    -readonly [P in keyof T]-?: T[P];
};
export type ReadonlyPartial<T> = {
    +readonly [P in keyof T]+?: T[P];
};
export type test1a = [name: number, id: `ID:${number}`, hi: "text"];
export type FillOptions1 = {
    /**
     * @remarks The type of the block mask to match.
     */
    matchingBlock?: string;
    /**
     * @remarks The block states of the block mask to match.
     */
    matchingBlockStates?: Record<string, string | number | boolean>;
};
export type FillOptions2 = {
    /**
     * @remarks The type of the block mask to match.
     */
    matchingBlock?: string;
    /**
     * @remarks The block states of the block mask to match.
     */
    matchingBlockStates?: Record<string, string | number | boolean>;
    /**
     * @remarks The shortest the generation can run for before pausing until the next tick.
     */
    minMSBetweenYields?: number;
};
