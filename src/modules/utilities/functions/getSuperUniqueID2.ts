export function getSuperUniqueID2(depth: number = 2) {
    let id = `${Date.now()}`;
    for (let i = 0; i < depth; i++) {
        id += `_${Math.round(Math.random() * 100000)}`;
    }
    return id;
}
