import { customElementTypeIds } from "modules/ui/functions/customElementTypeIds";

export class customFormUIElement {
    index: number;
    type: String;
    args: String[];
    code: String;
    typeIndex: number;
    constructor(index: number, type: String, args: String[]) {
        this.index = index;
        this.type = type;
        this.args = args;
        this.code = this.type + "(" + this.args.join(", ") + ")";
        this.typeIndex = customElementTypeIds.findIndex(
            (value, index) => value == this.type
        );
    }
}
