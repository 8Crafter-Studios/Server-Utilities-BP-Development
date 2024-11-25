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
declare global {
    type Mutable<T> = {
        -readonly [P in keyof T]: T[P];
    };
    type MutableRequired<T> = {
        -readonly [P in keyof T]-?: T[P];
    };
    type ReadonlyPartial<T> = {
        +readonly [P in keyof T]+?: T[P];
    };
    type test1a = [name: number, id: `ID:${number}`, hi: "text"];
}
