export function selectWeightedElement<T extends { weight?: number; [k: string]: any }>(items: T[], weightProp?: "weight"): T;
export function selectWeightedElement<T extends { [k in K]?: number } & { [k: string]: any }, K extends keyof T>(items: T[], weightProp: K): T;
export function selectWeightedElement<T extends { [k in K]?: number } & { [k: string]: any }, K extends keyof T>(items: T[], weightProp: K): T {
    let total = items.reduce((acc, item) => acc + (item[weightProp ?? "weight"] ?? 1), 0);
    let threshold = Math.random() * total;

    for (let item of items) {
        threshold -= item[weightProp ?? "weight"] ?? 1;
        if (threshold < 0) {
            return item;
        }
    }

    throw new Error("No item selected");
}
