export type Mutable<T> = {
    -readonly [P in keyof T]: T[P];
}; // Remove readonly    
export type MutableRequired<T> = {
    -readonly [P in keyof T]-?: T[P];
}; // Remove readonly and ?
export type ReadonlyPartial<T> = {
    +readonly [P in keyof T]+?: T[P];
}; // Add readonly and ?
export type test1a = [name: number, id: `ID:${number}`, hi: "text"];
declare global {
    type Mutable<T> = {
        -readonly [P in keyof T]: T[P];
    }; // Remove readonly    
    type MutableRequired<T> = {
        -readonly [P in keyof T]-?: T[P];
    }; // Remove readonly and ?
    type ReadonlyPartial<T> = {
        +readonly [P in keyof T]+?: T[P];
    }; // Add readonly and ?
    type test1a = [name: number, id: `ID:${number}`, hi: "text"];
}
