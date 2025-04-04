globalThis.catchtry = function catchtry<
    TT extends unknown,
    CT extends unknown,
    FT extends unknown
>(
    trycallbackfn: () => TT,
    catchcallbackfn: (e: Error) => CT = (e) => console.error(e, e?.stack) as CT,
    finallycallbackfn: (
        v: TT | ReturnType<typeof catchcallbackfn> | undefined
    ) => FT = (v: TT | ReturnType<typeof catchcallbackfn> | undefined) => {
        return v as FT;
    }
): TT | CT | FT | undefined {
    let v: any;
    v = undefined;
    try {
        v = trycallbackfn();
    } catch (e) {
        v = catchcallbackfn(e) ?? v;
    } finally {
        return finallycallbackfn(v) ?? v;
    }
};

export {};
