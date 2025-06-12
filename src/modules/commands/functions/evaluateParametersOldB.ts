import type { Dimension } from "@minecraft/server";
import { BlockPattern } from "modules/commands/classes/BlockPattern";
import { getParametersFromString } from "modules/utilities/functions/getParametersFromString";
import type { evaluateParametersParameter } from "modules/commands/types/evaluateParametersParameter";
import { extractSelectors } from "./extractSelectors";

/**
 * @deprecated
 */
export function evaluateParametersOldB<
    T extends evaluateParametersParameter[] | [evaluateParametersParameter]
>(
    commandstring: string,
    parameters: T
): {
    params: T;
    extra: string;
    args: {
        [Index in keyof T]: T[Index] extends "presetText" ? string | undefined : T[Index] extends "number" ? number | undefined : T[Index] extends "boolean" ? boolean | undefined : T[Index] extends "neboolean" ? boolean | undefined : T[Index] extends "string" ? string | undefined : T[Index] extends "non-booleanString" ? string | undefined : T[Index] extends "json" ? any | undefined : T[Index] extends "Vector" ? string | undefined : T[Index] extends "Vector1" ? string | undefined : T[Index] extends "Vector2" ? string | undefined : T[Index] extends "Vector3" ? string | undefined : T[Index] extends "Vector4" ? string | undefined : T[Index] extends "Vector5" ? string | undefined : T[Index] extends "Vector6" ? string | undefined : T[Index] extends "Vector7" ? string | undefined : T[Index] extends "Vector8" ? string | undefined : T[Index] extends "Vectors" ? string | undefined : T[Index] extends "targetSelector" ? string | undefined : T[Index] extends "blockStates" ? { [id: string]: string | number | boolean; } | undefined : T[Index] extends "blockPattern" ? BlockPattern | undefined : T[Index] extends "dimension" ? Dimension | undefined : T[Index] extends `-${string}` ? string : T[Index] extends `f-${string}` ? {
            "0"?: boolean;
            "1"?: boolean;
            "2"?: boolean;
            "3"?: boolean;
            "4"?: boolean;
            "5"?: boolean;
            "6"?: boolean;
            "7"?: boolean;
            "8"?: boolean;
            "9"?: boolean;
            a?: boolean;
            b?: boolean;
            c?: boolean;
            d?: boolean;
            e?: boolean;
            f?: boolean;
            g?: boolean;
            h?: boolean;
            i?: boolean;
            j?: boolean;
            k?: boolean;
            l?: boolean;
            m?: boolean;
            n?: boolean;
            o?: boolean;
            p?: boolean;
            q?: boolean;
            r?: boolean;
            s?: boolean;
            t?: boolean;
            u?: boolean;
            v?: boolean;
            w?: boolean;
            x?: boolean;
            y?: boolean;
            z?: boolean;
            A?: boolean;
            B?: boolean;
            C?: boolean;
            D?: boolean;
            E?: boolean;
            F?: boolean;
            G?: boolean;
            H?: boolean;
            I?: boolean;
            J?: boolean;
            K?: boolean;
            L?: boolean;
            M?: boolean;
            N?: boolean;
            O?: boolean;
            P?: boolean;
            Q?: boolean;
            R?: boolean;
            S?: boolean;
            T?: boolean;
            U?: boolean;
            V?: boolean;
            W?: boolean;
            X?: boolean;
            Y?: boolean;
            Z?: boolean;
            "!"?: boolean;
            "@"?: boolean;
            "#"?: boolean;
            $?: boolean;
            "%"?: boolean;
            "^"?: boolean;
            "&"?: boolean;
            "*"?: boolean;
            "<"?: boolean;
            ">"?: boolean;
            ","?: boolean;
            "."?: boolean;
            "~"?: boolean;
        } : T[Index] extends { type: "number"; } ? number | undefined : T[Index] extends { type: "boolean"; } ? boolean | undefined : T[Index] extends { type: "neboolean"; } ? boolean | undefined : T[Index] extends { type: "string"; } ? string | undefined : T[Index] extends { type: "presetText"; } ? string | undefined : T[Index] extends { type: "non-booleanString"; } ? string | undefined : T[Index] extends { type: "json"; } ? any | undefined : T[Index] extends { type: "Vector"; } ? string | undefined : T[Index] extends { type: "Vector1"; } ? string | undefined : T[Index] extends { type: "Vector2"; } ? string | undefined : T[Index] extends { type: "Vector3"; } ? string | undefined : T[Index] extends { type: "Vector4"; } ? string | undefined : T[Index] extends { type: "Vector5"; } ? string | undefined : T[Index] extends { type: "Vector6"; } ? string | undefined : T[Index] extends { type: "Vector7"; } ? string | undefined : T[Index] extends { type: "Vector8"; } ? string | undefined : T[Index] extends { type: "Vectors"; } ? string | undefined : T[Index] extends { type: "targetSelector"; } ? string | undefined : T[Index] extends { type: "blockStates"; } ? { [id: string]: string | number | boolean; } | undefined : T[Index] extends { type: "blockPattern"; } ? BlockPattern | undefined : T[Index] extends { type: "dimension"; } ? Dimension | undefined : T[Index] extends { type: `-${string}`; } ? string : T[Index] extends { type: `f-${string}`; } ? {
            "0"?: boolean;
            "1"?: boolean;
            "2"?: boolean;
            "3"?: boolean;
            "4"?: boolean;
            "5"?: boolean;
            "6"?: boolean;
            "7"?: boolean;
            "8"?: boolean;
            "9"?: boolean;
            a?: boolean;
            b?: boolean;
            c?: boolean;
            d?: boolean;
            e?: boolean;
            f?: boolean;
            g?: boolean;
            h?: boolean;
            i?: boolean;
            j?: boolean;
            k?: boolean;
            l?: boolean;
            m?: boolean;
            n?: boolean;
            o?: boolean;
            p?: boolean;
            q?: boolean;
            r?: boolean;
            s?: boolean;
            t?: boolean;
            u?: boolean;
            v?: boolean;
            w?: boolean;
            x?: boolean;
            y?: boolean;
            z?: boolean;
            A?: boolean;
            B?: boolean;
            C?: boolean;
            D?: boolean;
            E?: boolean;
            F?: boolean;
            G?: boolean;
            H?: boolean;
            I?: boolean;
            J?: boolean;
            K?: boolean;
            L?: boolean;
            M?: boolean;
            N?: boolean;
            O?: boolean;
            P?: boolean;
            Q?: boolean;
            R?: boolean;
            S?: boolean;
            T?: boolean;
            U?: boolean;
            V?: boolean;
            W?: boolean;
            X?: boolean;
            Y?: boolean;
            Z?: boolean;
            "!"?: boolean;
            "@"?: boolean;
            "#"?: boolean;
            $?: boolean;
            "%"?: boolean;
            "^"?: boolean;
            "&"?: boolean;
            "*"?: boolean;
            "<"?: boolean;
            ">"?: boolean;
            ","?: boolean;
            "."?: boolean;
            "~"?: boolean;
        } : any | undefined;
    };
    err: [Error, any][];
} {
    let argumentsa = [] as any[];
    let ea = [] as [Error, any][];
    let paramEval = commandstring as string; /*
    let parametersb = []
    if(typeof parameters[0] == "string"){parametersb = parameters.map(v=>({type: v}))}else{parametersb = parameters}*/


    parameters
        .map((v) => typeof v == "string"
            ? (v as any) == "Vectors"
                ? ({
                    type: v,
                    vectorCount: 3,
                    maxLength: undefined,
                } as unknown as {
                    type: "Vectors";
                    vectorCount?: number;
                    maxLength?: number;
                })
                : { type: v, vectorCount: undefined as undefined, maxLength: undefined as undefined }
            : v?.type == "Vectors"
                ? (v as {
                    type: "Vectors";
                    vectorCount?: number;
                    maxLength?: number;
                })
                : (v as unknown as {
                    type: typeof v;
                    vectorCount?: number;
                    maxLength?: number;
                })
        )
        .forEach((p, i) => {
            if (paramEval.trim() == "") {
                if (!!(p.type as string).match(/^-[a-zA-Z0-9!@#$%^&*<>,.~]+$/)) {
                    argumentsa.push("");
                } else if (!!(p.type as string).match(/^f-[a-zA-Z0-9!@#$%^&*<>,.~]+$/)) {
                    argumentsa.push(
                        Object.fromEntries(
                            (p.type as string)
                                .slice(2)
                                .split("")
                                .map((v) => [v, false])
                        )
                    );
                } else {
                    argumentsa.push(null);
                    return;
                }
            } else {
                if (p.type == "presetText") {
                    argumentsa.push(paramEval.trimStart().split(" ")[0]);
                    paramEval = paramEval
                        .trimStart()
                        .split(" ")
                        .slice(1)
                        .join(" ");
                } else {
                    if (p.type == "number") {
                        argumentsa.push(
                            Number(paramEval.trimStart().split(" ")[0])
                        );
                        paramEval = paramEval
                            .trimStart()
                            .split(" ")
                            .slice(1)
                            .join(" ");
                    } else {
                        if (p.type == "boolean") {
                            argumentsa.push(
                                paramEval.trimStart().split(" ")[0]?.trim?.() ==
                                    ""
                                    ? undefined
                                    : Boolean(
                                        JSON.parse(
                                            paramEval
                                                .trimStart()
                                                .split(" ")[0]!
                                                .replace(/^t$/i, "true")
                                                .replace(/^f$/i, "false")
                                                .replace(/^true$/i, "true")
                                                .replace(/^false$/i, "false")
                                        )
                                    )
                            );
                            paramEval = paramEval
                                .trimStart()
                                .split(" ")
                                .slice(1)
                                .join(" ");
                        } else {
                            if (p.type == "neboolean") {
                                try {
                                    argumentsa.push(
                                        paramEval
                                            .trimStart()
                                            .split(" ")[0]
                                            ?.trim?.() == ""
                                            ? undefined
                                            : Boolean(
                                                JSON.parse(
                                                    paramEval
                                                        .trimStart()
                                                        .split(" ")[0]!
                                                        .replace(
                                                            /^t$/i,
                                                            "true"
                                                        )
                                                        .replace(
                                                            /^f$/i,
                                                            "false"
                                                        )
                                                        .replace(
                                                            /^true$/i,
                                                            "true"
                                                        )
                                                        .replace(
                                                            /^false$/i,
                                                            "false"
                                                        )
                                                )
                                            )
                                    );
                                    paramEval = paramEval
                                        .trimStart()
                                        .split(" ")
                                        .slice(1)
                                        .join(" ");
                                } catch {
                                    argumentsa.push(undefined);
                                }
                            } else {
                                if (p.type == "string") {
                                    if (paramEval.trimStart().startsWith('"')) {
                                        let value = getParametersFromString(
                                            paramEval.trimStart()
                                        ).resultsincludingunmodified[0];
                                        paramEval =
                                            paramEval
                                                .trimStart()
                                                .slice(value?.s?.length! + 1) ??
                                            "";
                                        try {
                                            argumentsa.push(value?.v);
                                        } catch (e) {
                                            ea.push([e, e.stack]);
                                            argumentsa.push(null);
                                        }
                                    } else {
                                        argumentsa.push(
                                            paramEval.trimStart().split(" ")[0]
                                        );
                                        paramEval = paramEval
                                            .trimStart()
                                            .split(" ")
                                            .slice(1)
                                            .join(" ");
                                    }
                                } else {
                                    if (p.type == "non-booleanString") {
                                        if ([
                                            "true",
                                            "false",
                                            "t",
                                            "f",
                                            "1",
                                            "0",
                                        ].includes(
                                            paramEval
                                                .trimStart()
                                                .split(" ")[0]!
                                                .toLowerCase()
                                        )) {
                                            argumentsa.push(undefined);
                                        } else if (paramEval
                                            .trimStart()
                                            .startsWith('"')) {
                                            let value = getParametersFromString(
                                                paramEval.trimStart()
                                            ).resultsincludingunmodified[0];
                                            paramEval =
                                                paramEval
                                                    .trimStart()
                                                    .slice(
                                                        value?.s?.length! + 1
                                                    ) ?? "";
                                            try {
                                                argumentsa.push(value?.v);
                                            } catch (e) {
                                                ea.push([e, e.stack]);
                                                argumentsa.push(null);
                                            }
                                        } else {
                                            argumentsa.push(
                                                paramEval
                                                    .trimStart()
                                                    .split(" ")[0]
                                            );
                                            paramEval = paramEval
                                                .trimStart()
                                                .split(" ")
                                                .slice(1)
                                                .join(" ");
                                        } //1870//7018
                                    } else {
                                        if (!!(p.type as string).match(
                                            /^-[a-zA-Z0-9!@#$%^&*<>,.~]+$/
                                        )) {
                                            if (!!paramEval
                                                .trimStart()
                                                .match(
                                                    new RegExp(
                                                        `(?<=^\\-)(${(
                                                            p.type as string
                                                        )
                                                            .slice(1)
                                                            .split("")
                                                            .join(
                                                                "|"
                                                            )})+(?=$|\\s)`
                                                    )
                                                )) {
                                                let value = paramEval
                                                    .trimStart()
                                                    .match(
                                                        new RegExp(
                                                            `(?<=^\\-)(${(
                                                                p.type as string
                                                            )
                                                                .slice(1)
                                                                .split("")
                                                                .join(
                                                                    "|"
                                                                )})+(?=$|\\s)`
                                                        )
                                                    )![0];
                                                paramEval =
                                                    paramEval
                                                        .trimStart()
                                                        .slice(
                                                            paramEval
                                                                .trimStart()
                                                                .indexOf(
                                                                    value
                                                                ) + value.length
                                                        ) ?? "";
                                                try {
                                                    argumentsa.push(value);
                                                } catch (e) {
                                                    argumentsa.push("");
                                                    ea.push([e, e.stack]);
                                                }
                                            } else {
                                                argumentsa.push("");
                                            }
                                        } else {
                                            if (!!(p.type as string).match(
                                                /^f-[a-zA-Z0-9!@#$%^&*<>,.~]+$/
                                            )) {
                                                if (!!paramEval
                                                    .trimStart()
                                                    .match(
                                                        new RegExp(
                                                            `(?<=^\\-)(${(
                                                                p.type as string
                                                            )
                                                                .slice(2)
                                                                .split("")
                                                                .join(
                                                                    "|"
                                                                )})+(?=$|\\s)`
                                                        )
                                                    )) {
                                                    let value = paramEval
                                                        .trimStart()
                                                        .match(
                                                            new RegExp(
                                                                `(?<=^\\-)(${(
                                                                    p.type as string
                                                                )
                                                                    .slice(2)
                                                                    .split("")
                                                                    .join(
                                                                        "|"
                                                                    )})+(?=$|\\s)`
                                                            )
                                                        )![0];
                                                    paramEval =
                                                        paramEval
                                                            .trimStart()
                                                            .slice(
                                                                paramEval
                                                                    .trimStart()
                                                                    .indexOf(
                                                                        value
                                                                    ) +
                                                                value.length
                                                            ) ?? "";
                                                    try {
                                                        argumentsa.push(
                                                            Object.fromEntries(
                                                                (
                                                                    p.type as string
                                                                )
                                                                    .slice(2)
                                                                    .split("")
                                                                    .map(
                                                                        (v) => [
                                                                            v,
                                                                            value.includes(
                                                                                v
                                                                            ),
                                                                        ]
                                                                    )
                                                            )
                                                        );
                                                    } catch (e) {
                                                        argumentsa.push(
                                                            Object.fromEntries(
                                                                (
                                                                    p.type as string
                                                                )
                                                                    .slice(2)
                                                                    .split("")
                                                                    .map(
                                                                        (v) => [
                                                                            v,
                                                                            false,
                                                                        ]
                                                                    )
                                                            )
                                                        );
                                                        ea.push([e, e.stack]);
                                                    }
                                                } else {
                                                    argumentsa.push(
                                                        Object.fromEntries(
                                                            (p.type as string)
                                                                .slice(2)
                                                                .split("")
                                                                .map((v) => [
                                                                    v,
                                                                    false,
                                                                ])
                                                        )
                                                    );
                                                }
                                            } else {
                                                if (p.type == "json") {
                                                    let value = getParametersFromString(
                                                        paramEval.trimStart()
                                                    )
                                                        .resultsincludingunmodified[0];
                                                    paramEval =
                                                        paramEval
                                                            .trimStart()
                                                            .slice(
                                                                value?.s
                                                                    ?.length! + 1
                                                            ) ?? "";
                                                    try {
                                                        argumentsa.push(
                                                            value?.v ??
                                                            JSONParse(
                                                                value?.s ??
                                                                paramEval,
                                                                true
                                                            )
                                                        );
                                                    } catch (e) {
                                                        ea.push([e, e.stack]);
                                                        argumentsa.push(null);
                                                    }
                                                } else {
                                                    if (p.type == "blockStates") {
                                                        if (paramEval.indexOf(
                                                            "["
                                                        ) == -1 &&
                                                            paramEval.indexOf(
                                                                "{"
                                                            ) == -1) {
                                                            argumentsa.push(
                                                                undefined
                                                            );
                                                        } else if ((paramEval.indexOf(
                                                            "["
                                                        ) == -1
                                                            ? Infinity
                                                            : paramEval.indexOf(
                                                                "["
                                                            )) <
                                                            (paramEval.indexOf(
                                                                "{"
                                                            ) == -1
                                                                ? Infinity
                                                                : paramEval.indexOf(
                                                                    "{"
                                                                ))) {
                                                            let value = getParametersFromString(
                                                                paramEval
                                                                    .replaceAll(
                                                                        "=",
                                                                        ":"
                                                                    )
                                                                    .replaceAll(
                                                                        "[",
                                                                        "{"
                                                                    )
                                                                    .replaceAll(
                                                                        "]",
                                                                        "}"
                                                                    )
                                                            )
                                                                .resultsincludingunmodified[0];
                                                            paramEval =
                                                                paramEval.slice(
                                                                    value?.s
                                                                        ?.length! +
                                                                    1
                                                                ) ?? "";
                                                            try {
                                                                argumentsa.push(
                                                                    value?.v ??
                                                                    JSONParse(
                                                                        value?.s ??
                                                                        "undefined",
                                                                        true
                                                                    )
                                                                );
                                                            } catch (e) {
                                                                ea.push([
                                                                    e,
                                                                    e.stack,
                                                                ]);
                                                                argumentsa.push(
                                                                    null
                                                                );
                                                            }
                                                        } else {
                                                            let value = getParametersFromString(
                                                                paramEval
                                                            )
                                                                .resultsincludingunmodified[0];
                                                            paramEval =
                                                                paramEval.slice(
                                                                    value?.s
                                                                        ?.length! +
                                                                    1
                                                                ) ?? "";
                                                            try {
                                                                argumentsa.push(
                                                                    value?.v ??
                                                                    JSONParse(
                                                                        value?.s ??
                                                                        "undefined",
                                                                        true
                                                                    )
                                                                );
                                                            } catch (e) {
                                                                ea.push([
                                                                    e,
                                                                    e.stack,
                                                                ]);
                                                                argumentsa.push(
                                                                    null
                                                                );
                                                            }
                                                        }
                                                    } else {
                                                        if (p.type ==
                                                            "blockPattern") {
                                                            const ep = BlockPattern.extractWRaw(
                                                                paramEval.trimStart()
                                                            );
                                                            paramEval =
                                                                paramEval.slice(
                                                                    paramEval.indexOf(
                                                                        ep.raw!
                                                                    ) +
                                                                    ep.raw!
                                                                        .length
                                                                ) ?? "";
                                                            try {
                                                                argumentsa.push(
                                                                    ep.parsed
                                                                );
                                                            } catch (e) {
                                                                ea.push([
                                                                    e,
                                                                    e.stack,
                                                                ]);
                                                                argumentsa.push(
                                                                    null
                                                                );
                                                            }
                                                        } else {
                                                            if (p.type ==
                                                                "targetSelector") {
                                                                if (!paramEval
                                                                    .trimStart()
                                                                    .startsWith(
                                                                        "@"
                                                                    )) {
                                                                    if (paramEval
                                                                        .trimStart()
                                                                        .startsWith(
                                                                            '"'
                                                                        )) {
                                                                        let value = getParametersFromString(
                                                                            paramEval.trimStart()
                                                                        )
                                                                            .resultsincludingunmodified[0];
                                                                        paramEval =
                                                                            paramEval
                                                                                .trimStart()
                                                                                .slice(
                                                                                    value
                                                                                        ?.s
                                                                                        ?.length
                                                                                ) ??
                                                                            "";
                                                                        paramEval =
                                                                            paramEval.slice(
                                                                                +(
                                                                                    paramEval[0] ==
                                                                                    " "
                                                                                )
                                                                            ) ??
                                                                            "";
                                                                        try {
                                                                            argumentsa.push(
                                                                                !!!value?.v
                                                                                    ? undefined
                                                                                    : '"' +
                                                                                    value?.v +
                                                                                    '"'
                                                                            );
                                                                        } catch (e) {
                                                                            ea.push(
                                                                                [
                                                                                    e,
                                                                                    e.stack,
                                                                                ]
                                                                            );
                                                                        }
                                                                    } else {
                                                                        argumentsa.push(
                                                                            paramEval.split(
                                                                                " "
                                                                            )[0]
                                                                        );
                                                                        return paramEval
                                                                            .split(
                                                                                " "
                                                                            )
                                                                            .slice(
                                                                                1
                                                                            )
                                                                            .join(
                                                                                " "
                                                                            );
                                                                    }
                                                                } else {
                                                                    let value = extractSelectors(
                                                                        paramEval
                                                                    )[0];
                                                                    paramEval =
                                                                        paramEval.slice(
                                                                            paramEval.indexOf(
                                                                                value!
                                                                            ) +
                                                                            value?.length!
                                                                        ) ?? "";
                                                                    try {
                                                                        argumentsa.push(
                                                                            value
                                                                        );
                                                                    } catch (e) {
                                                                        ea.push(
                                                                            [
                                                                                e,
                                                                                e.stack,
                                                                            ]
                                                                        );
                                                                        argumentsa.push(
                                                                            null
                                                                        );
                                                                    }
                                                                }
                                                            } else {
                                                                if (p.type ==
                                                                    "Vector" ||
                                                                    (p?.type ??
                                                                        p) ==
                                                                    "Vector1") {
                                                                    let value = paramEval.match(
                                                                        /(?<!(?<!^([^"]*["][^"]*)+)(([^"]*(?<!([^\\])(\\\\)*?\\)"){2})*([^"]*(?<!([^\\])(\\\\)*?\\)")[^"]*)(((?<=[\s\~\!\^\%\&\*\d])|^)[\~\!\^\%\&\*]([\-\+]?\d+(\.\d+)?)?|((?<=\s)|^)[\-\+]?\d+(\.\d+)?)(?!([^"]*(?<!([^\\])(\\\\)*?\\)")[^"]*(([^"]*(?<!([^\\])(\\\\)*?\\)"){2})*(?!([^"]*["][^"]*)+$))/g
                                                                    )?.[0]!;
                                                                    paramEval =
                                                                        paramEval.slice(
                                                                            paramEval.indexOf(
                                                                                value
                                                                            ) +
                                                                            value?.length
                                                                        ) ?? "";
                                                                    if (paramEval.startsWith(
                                                                        " "
                                                                    )) {
                                                                        paramEval =
                                                                            paramEval.slice(
                                                                                1
                                                                            ) ??
                                                                            "";
                                                                    }
                                                                    try {
                                                                        argumentsa.push(
                                                                            value
                                                                        );
                                                                    } catch (e) {
                                                                        ea.push(
                                                                            [
                                                                                e,
                                                                                e.stack,
                                                                            ]
                                                                        );
                                                                        argumentsa.push(
                                                                            null
                                                                        );
                                                                    }
                                                                } else {
                                                                    if (!!(
                                                                        p.type as string
                                                                    ).match(
                                                                        /^Vector[2-8]$/
                                                                    )) {
                                                                        let value = paramEval.match(
                                                                            new RegExp(
                                                                                String.raw`(?<!(?<!^([^"]*["][^"]*)+)(([^"]*(?<!([^\\])(\\\\)*?\\)"){2})*([^"]*(?<!([^\\])(\\\\)*?\\)")[^"]*)(((((?<=[\s\~\!\^\%\&\*\d])|^)[\~\!\^\%\&\*](?:[\-\+]?\d+(\.\d+)?)?)|(((?<=\s)|^)[\-\+]?\d+(\.\d+)?))\s*?){${(
                                                                                    p.type as string
                                                                                ).slice(
                                                                                    6
                                                                                )}}(?!([^"]*(?<!([^\\])(\\\\)*?\\)")[^"]*(([^"]*(?<!([^\\])(\\\\)*?\\)"){2})*(?!([^"]*["][^"]*)+$))`
                                                                            )
                                                                        )?.[0]!;
                                                                        paramEval =
                                                                            paramEval.slice(
                                                                                paramEval.indexOf(
                                                                                    value
                                                                                ) +
                                                                                value?.length
                                                                            ) ??
                                                                            "";
                                                                        if (paramEval.startsWith(
                                                                            " "
                                                                        )) {
                                                                            paramEval =
                                                                                paramEval.slice(
                                                                                    1
                                                                                ) ??
                                                                                "";
                                                                        }
                                                                        try {
                                                                            argumentsa.push(
                                                                                value
                                                                            );
                                                                        } catch (e) {
                                                                            ea.push(
                                                                                [
                                                                                    e,
                                                                                    e.stack,
                                                                                ]
                                                                            );
                                                                            argumentsa.push(
                                                                                null
                                                                            );
                                                                        }
                                                                    } else {
                                                                        if (p.type ==
                                                                            "Vectors") {
                                                                            let value = paramEval.match(
                                                                                new RegExp(
                                                                                    String.raw`(?<!(?<!^([^"]*["][^"]*)+)(([^"]*(?<!([^\\])(\\\\)*?\\)"){2})*([^"]*(?<!([^\\])(\\\\)*?\\)")[^"]*)(((((?<=[\s\~\!\^\%\&\*\d])|^)[\~\!\^\%\&\*](?:[\-\+]?\d+(\.\d+)?)?)|(((?<=\s)|^)[\-\+]?\d+(\.\d+)?))\s*?){${p.vectorCount ??
                                                                                        3}}(?!([^"]*(?<!([^\\])(\\\\)*?\\)")[^"]*(([^"]*(?<!([^\\])(\\\\)*?\\)"){2})*(?!([^"]*["][^"]*)+$))`
                                                                                )
                                                                            )?.[0]!;
                                                                            paramEval =
                                                                                paramEval.slice(
                                                                                    paramEval.indexOf(
                                                                                        value
                                                                                    ) +
                                                                                    value?.length
                                                                                ) ??
                                                                                "";
                                                                            if (paramEval.startsWith(
                                                                                " "
                                                                            )) {
                                                                                paramEval =
                                                                                    paramEval.slice(
                                                                                        1
                                                                                    ) ??
                                                                                    "";
                                                                            }
                                                                            try {
                                                                                argumentsa.push(
                                                                                    value
                                                                                );
                                                                            } catch (e) {
                                                                                ea.push(
                                                                                    [
                                                                                        e,
                                                                                        e.stack,
                                                                                    ]
                                                                                );
                                                                                argumentsa.push(
                                                                                    null
                                                                                );
                                                                            }
                                                                        } else {
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        });
    return {
        params: parameters,
        extra: paramEval,
        args: argumentsa as any,
        err: ea,
    };
}
