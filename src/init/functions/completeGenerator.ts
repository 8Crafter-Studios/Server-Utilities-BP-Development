import { system } from "@minecraft/server";

globalThis.completeGenerator = async function completeGenerator<
    T,
    TReturn,
    TNext
>(
    g: Generator<T, TReturn, TNext>,
    maxTimePerTick = 1500,
    whileConditions: boolean | number | string | Function = true
) {
    let lastYieldTime = Date.now(); // Initialize the last yield time
    let finalResult: T;
    let returnResult: TReturn;
    while (whileConditions) {
        const result = g.next();
        if (!result.done) {
            finalResult = result.value as T;
            if (Date.now() - lastYieldTime >= maxTimePerTick) {
                lastYieldTime = Date.now();
                await new Promise((resolve) => system.run(() => resolve(void null))
                );
            }
        } else {
            returnResult = result.value;
            break;
        }
    }
    return { yield: finalResult, return: returnResult };
};
