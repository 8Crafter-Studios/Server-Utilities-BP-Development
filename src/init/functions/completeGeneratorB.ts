import { system } from "@minecraft/server";

globalThis.completeGeneratorB = async function completeGeneratorB<
    T,
    TReturn,
    TNext
>(
    g: Generator<T, TReturn, TNext>,
    maxTimePerTick = 1500,
    whileConditions = true
) {
    let lastYieldTime = Date.now();
    var yieldResults = [] as T[];
    let returnResult: TReturn;
    while (whileConditions) {
        const result = g.next();
        if (!result.done) {
            yieldResults.push(result.value as T);
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
    return { yield: yieldResults, return: returnResult };
};
