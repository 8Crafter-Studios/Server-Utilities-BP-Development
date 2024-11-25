import { system } from "@minecraft/server";
globalThis.completeGenerator = async function completeGenerator(g, maxTimePerTick = 1500, whileConditions = true) {
    let lastYieldTime = Date.now(); // Initialize the last yield time
    let finalResult;
    let returnResult;
    while (whileConditions) {
        const result = g.next();
        if (!result.done) {
            finalResult = result.value;
            if (Date.now() - lastYieldTime >= maxTimePerTick) {
                lastYieldTime = Date.now();
                await new Promise((resolve) => system.run(() => resolve(void null)));
            }
        }
        else {
            returnResult = result.value;
            break;
        }
    }
    return { yield: finalResult, return: returnResult };
};
//# sourceMappingURL=completeGenerator.js.map