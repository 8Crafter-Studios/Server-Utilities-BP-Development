export function stringify(
    object: Object | any[],
    entriesmode: boolean | 1 | 0 = 0,
    escapedarrayorobjecttag: boolean | 1 | 0 = 0,
    objectifyinfinity: boolean | 1 | 0 = 0,
    objectifynan: boolean | 1 | 0 = 0,
    objectifyundefined: boolean | 1 | 0 = 0,
    objectifynull: boolean | 1 | 0 = 0,
    recursivemode: boolean | 1 | 0 = 0
): string | [string, any][] | { [k: string]: any; } {
    let entries = Object.entries(object);
    entries.forEach((v, i) => {
        if (v[1] instanceof Array) {
            entries[i]![1] = stringify(v[1], entriesmode, escapedarrayorobjecttag, objectifyinfinity, objectifynan, objectifynull, objectifyundefined, 1);
        } else if (v[1] instanceof Object) {
            entries[i]![1] = stringify(v[1], entriesmode, escapedarrayorobjecttag, objectifyinfinity, objectifynan, objectifynull, objectifyundefined, 1);
        } else if (v[1] instanceof Function) {
            entries[i]![1] = { escval: (v[1] as Function).toString() };
        } else if (v[1] == Infinity && Boolean(objectifyinfinity)) {
            entries[i]![1] = { escval: "Infinity" };
        } else if (v[1] == -Infinity && Boolean(objectifyinfinity)) {
            entries[i]![1] = { escval: "-Infinity" };
        } else if (Number.isNaN(v[1]) && Boolean(objectifynan)) {
            entries[i]![1] = { escval: "NaN" };
        } else if (v[1] == undefined && Boolean(objectifyundefined)) {
            entries[i]![1] = { escval: "undefined" };
        } else if (v[1] == null && Boolean(objectifynull)) {
            entries[i]![1] = { escval: "null" };
        }
    });
    return recursivemode
        ? Boolean(escapedarrayorobjecttag) && ((object instanceof Array && !Boolean(entriesmode)) || (object instanceof Object && Boolean(entriesmode)))
            ? Boolean(entriesmode)
                ? { escobj: entries }
                : { escarray: Object.fromEntries(entries) }
            : Boolean(entriesmode)
            ? entries
            : Object.fromEntries(entries)
        : JSONStringify(Boolean(entriesmode) ? entries : Object.fromEntries(entries), true);
}
