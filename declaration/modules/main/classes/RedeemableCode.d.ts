import { type DimensionLocation, type ItemStack } from "@minecraft/server";
export declare class RedeemableCode {
    code: string;
    readonly id: string;
    constructor(code: string);
    save(): void;
    remove(): void;
    getItem(loadLocation: DimensionLocation): ItemStack;
    setItem(item: ItemStack, saveLocation: DimensionLocation): void;
    static addCode(code: string, item: ItemStack, saveLocation: DimensionLocation): void;
    static removeCode(code: string): void;
    static loadCodes(): void;
    static saveCodes(): void;
}
