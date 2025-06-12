export let generatorProgressIndex = 0;

export function generatorProgressIdGenerator(): `generatorId${number}Time${number}` {
    let id = `generatorId${generatorProgressIndex}Time${Date.now()}` as const;
    generatorProgressIndex = (generatorProgressIndex + 1) % 32767;
    return id;
}
