export function getSuperUniqueID(): `${number}_${number}_${number}` {
    return `${Date.now()}_${Math.round(Math.random() * 100000)}_${Math.round(Math.random() * 100000)}` as const;
}
