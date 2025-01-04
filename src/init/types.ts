export type Mutable<T> = {
    -readonly [P in keyof T]: T[P];
}; // Remove readonly
export type MutableRequired<T> = {
    -readonly [P in keyof T]-?: T[P];
}; // Remove readonly and ?
export type ReadonlyPartial<T> = {
    +readonly [P in keyof T]+?: T[P];
}; // Add readonly and ?
export type UnionToIntersection<U> = (U extends any ? (x: U) => void : never) extends (x: infer I) => void ? I : never;
export type PushFront<TailT extends any[], HeadT> = ((head: HeadT, ...tail: TailT) => void) extends (...arr: infer ArrT) => void ? ArrT : never;
/* export type NoRepetition<U extends string, ResultT extends any[] = []> = {
    [k in U]: PushFront<ResultT, k> | NoRepetition<Exclude<U, k>, PushFront<ResultT, k>>;
}[U]; */

export type NoRepetition<U extends string, ResultT extends any[] = []> = ResultT | {
    [k in U]: NoRepetition<Exclude<U, k>, [k, ...ResultT]>
}[U];

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
    type UnionToIntersection<U> = (U extends any ? (x: U) => void : never) extends (x: infer I) => void ? I : never;
    type test1a = [name: number, id: `ID:${number}`, hi: "text"];
    type PushFront<TailT extends any[], HeadT> = ((head: HeadT, ...tail: TailT) => void) extends (...arr: infer ArrT) => void ? ArrT : never;
    /* type NoRepetition<U extends string, ResultT extends any[] = []> = {
        [k in U]: PushFront<ResultT, k> | NoRepetition<Exclude<U, k>, PushFront<ResultT, k>>;
    }[U]; */
    type NoRepetition<U extends string, ResultT extends any[] = []> = ResultT | {
        [k in U]: NoRepetition<Exclude<U, k>, [k, ...ResultT]>
    }[U];
}
