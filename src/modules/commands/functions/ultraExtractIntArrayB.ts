
export function ultraExtractIntArrayB(s: string, revivement: string = "-1") {
    s = s
        .replaceAll(/,(?=[,\]\^])/g, "," + revivement)
        .replace(/\[(?=[,\^])/, "[" + revivement);
    Array.from(s.matchAll(/([\-\+]?[a-zA-Z0-9]+)\^([a-zA-Z0-9]+)/g)).forEach(
        (v) => (s = s.replace(
            v[0],
            (v[1] + ",").repeat(Number.parseInt(v[2], 36)).slice(0, -1)
        ))
    );
    return s;
}
