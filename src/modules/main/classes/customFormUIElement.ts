import { customElementTypeIds } from "modules/ui/functions/customElementTypeIds";

export class customFormUIElement {
    index: number;
    type: string;
    args: string[];
    code: string;
    typeIndex: number;
    constructor(index: number, type: string, args: string[]) {
        this.index = index;
        this.type = type;
        this.args = args;
        this.code = this.type + "(" + this.args.join(", ") + ")";
        this.typeIndex = customElementTypeIds.findIndex(
            (value, index) => value == this.type
        );
    }
}
