
export function parseJSONifiedNBTData(nbt: { block_indices: number[]; block_palette: { name: any; states: any; }[]; nbt_type: "cmprsnbt"; size: number[]; }) {
    function parseObject(object: {[k: string|number|symbol]: any}): any {
        switch (object.type) {
            case "compound":
                return Object.fromEntries(
                    Object.entries(object.value).map((t): any => [
                        t[0],
                        parseObject(t[1]!),
                    ])
                );
                break;
            case "list":
                return object.value instanceof Array
                    ? object.value.map((v: any) => parseList(v))
                    : parseList(object.value);
                break;
            case "int":
                return object.value;
                break;
            case "string":
                return object.value;
                break;
            case "byte":
                return Boolean(object.value);
                break;
            case "end":
                return object.value;
                break;
            default:
                return object;
        }
    }
    function parseList(object: { type: any; value: any[]; map: (arg0: (t: any) => any) => any; }): any {
        switch (object.type) {
            case "compound":
                return object.value.map((t: { [s: string]: unknown; } | ArrayLike<unknown>) => Object.fromEntries(
                    Object.entries(t).map((t) => [t[0], parseObject(t[1]!)])
                )
                );
                break;
            case "list":
                return object.value.map((t: any) => parseList(t));
                break;
            case "int":
                return object.value;
                break;
            case "string":
                return object.value;
                break;
            case "byte":
                return Boolean(object.value);
                break;
            case "end":
                return object.value;
                break;
            default:
                let a = undefined;
                try {
                    a = object.map((t: any) => parseList(t));
                } catch {
                    a = object;
                }
                return a;
        }
    }
    return parseObject(nbt);
}
