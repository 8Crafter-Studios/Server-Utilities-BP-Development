import type { Dimension } from "@minecraft/server";
import { BlockMask } from "modules/commands/classes/BlockMask";
import { BlockPattern } from "modules/commands/classes/BlockPattern";
import { parseBlockMatcherType } from "modules/commands/functions/parseBlockMatcherType";
import { getParametersFromString } from "modules/utilities/functions/getParametersFromString";
import type {
    evaluateParametersParameter,
    objectEvaluateParametersParameter as objectEvaluateParametersParameter,
    stringEvaluateParametersParameter,
} from "modules/commands/types/evaluateParametersParameter";
import { extractSelectors } from "./extractSelectors";

/**
 * The result of the {@link evaluateParameters} function.
 *
 * @template {evaluateParametersParameter[] | [evaluateParametersParameter]} T The paramter types.
 * @template {boolean} UOAT If the old args return type should be used. Default is false.
 *
 * @remarks
 * If the {@link UOAT} type parameter is set to true, the {@link args | args} property uses {@link EvaluateParemtersResultArgs_basic} instead of {@link EvaluateParemtersResultArgs_v2}.
 */
export interface EvalutateParamtersResult<T extends evaluateParametersParameter[] | [evaluateParametersParameter], UOAT extends boolean = false> {
    /**
     * The original parameters.
     *
     * @type {T}
     */
    params: T;
    /**
     * The rest of the commandstring paramter, that was not matched to any parameters.
     *
     * @type {string}
     */
    extra: string;
    /**
     * The evaluated parameters.
     */
    args: UOAT extends true ? EvaluateParemtersResultArgs_basic<T> : {} extends this["argsK"] ? this["argsT"] : this["argsK"] & this["argsT"];
    /**
     * The evaluated parameters, but with just the tuple type, and not the object intersection.
     *
     * The actual value is exactly the same as {@link args}, it is only the type that is different.
     *
     * Use this if you want to spread it into another tuple.
     *
     * @type {UOAT extends true ? EvaluateParemtersResultArgs_basic<T> : EvaluateParemtersResultArgs_v2_TupleOnly<T>}
     */
    get argsT(): UOAT extends true ? EvaluateParemtersResultArgs_basic<T> : EvaluateParemtersResultArgs_v2_TupleOnly<T>;
    /**
     * The evaluated parameters, but with just the object type, and not the tuple intersection.
     *
     * The actual value is exactly the same as {@link args}, it is only the type that is different.
     *
     * @type {UOAT extends true ? EvaluateParemtersResultArgs_basic<T> : EvaluateParemtersResultArgs_v2_KeyedOnly<T>}
     */
    get argsK(): UOAT extends true ? EvaluateParemtersResultArgs_basic<T> : EvaluateParemtersResultArgs_v2_KeyedOnly<T>;
    /**
     * Any errors that occurred.
     *
     * @type {[Error, any][]}
     *
     * @default []
     */
    err: [Error, any][];
}

/**
 * Maps a parameter type to a type that can be used in the {@link EvalutateParamtersResult} object.
 *
 * @template {evaluateParametersParameter[] | [evaluateParametersParameter]} T The paramter types.
 */
export type EvaluateParamtersParamterTypeMapper<T extends evaluateParametersParameter> = T extends "presetText"
    ? string | undefined
    : T extends "number"
    ? number | undefined
    : T extends "boolean"
    ? boolean | undefined
    : T extends "neboolean"
    ? boolean | undefined
    : T extends "string"
    ? string | undefined
    : T extends "non-booleanString"
    ? string | undefined
    : T extends "json"
    ? any | undefined
    : T extends "Vector"
    ? string | undefined
    : T extends "Vector1"
    ? string | undefined
    : T extends "Vector2"
    ? string | undefined
    : T extends "Vector3"
    ? string | undefined
    : T extends "Vector4"
    ? string | undefined
    : T extends "Vector5"
    ? string | undefined
    : T extends "Vector6"
    ? string | undefined
    : T extends "Vector7"
    ? string | undefined
    : T extends "Vector8"
    ? string | undefined
    : T extends "Vectors"
    ? string | undefined
    : T extends "targetSelector"
    ? string | undefined
    : T extends "blockStates"
    ? { [id: string]: string | number | boolean } | undefined
    : T extends "blockPattern"
    ? BlockPattern | undefined
    : T extends "block"
    ?
          | {
                id: string;
                states?: { [id: string]: string | number | boolean };
            }
          | undefined
    : T extends "blockMask"
    ? BlockMask | undefined
    : T extends "dimension"
    ? Dimension | undefined
    : T extends `-${string}`
    ? string
    : T extends `f-${string}`
    ? T extends `f-${infer Flags}`
        ? { [key in Split<Flags>[number]]: boolean }
        : never
    : T extends { type: "number"; key?: infer PK extends string }
    ? number | undefined
    : T extends { type: "boolean"; key?: infer PK extends string }
    ? boolean | undefined
    : T extends { type: "neboolean"; key?: infer PK extends string }
    ? boolean | undefined
    : T extends { type: "string"; key?: infer PK extends string }
    ? string | undefined
    : T extends { type: "presetText"; key?: infer PK extends string }
    ? string | undefined
    : T extends { type: "non-booleanString"; key?: infer PK extends string }
    ? string | undefined
    : T extends { type: "json" }
    ? any | undefined
    : T extends { type: "Vector" }
    ? string | undefined
    : T extends { type: "Vector1" }
    ? string | undefined
    : T extends { type: "Vector2" }
    ? string | undefined
    : T extends { type: "Vector3" }
    ? string | undefined
    : T extends { type: "Vector4" }
    ? string | undefined
    : T extends { type: "Vector5" }
    ? string | undefined
    : T extends { type: "Vector6" }
    ? string | undefined
    : T extends { type: "Vector7" }
    ? string | undefined
    : T extends { type: "Vector8" }
    ? string | undefined
    : T extends { type: "Vectors" }
    ? string | undefined
    : T extends { type: "targetSelector" }
    ? string | undefined
    : T extends { type: "blockStates" }
    ? { [id: string]: string | number | boolean } | undefined
    : T extends { type: "blockPattern" }
    ? BlockPattern | undefined
    : T extends { type: "block" }
    ?
          | {
                id: string;
                states?: { [id: string]: string | number | boolean };
            }
          | undefined
    : T extends { type: "blockMask" }
    ? BlockMask | undefined
    : T extends { type: "dimension" }
    ? Dimension | undefined
    : T extends { type: `-${string}` }
    ? string
    : T extends { type: `f-${string}` }
    ? T extends { type: `f-${infer Flags}` }
        ? { [key in Split<Flags>[number]]: boolean }
        : never
    : T extends { type: `ignorableNamedParameter` }
    ? T extends {
          type: `ignorableNamedParameter`;
          key?: infer PK extends string;
          name: infer Name;
          valueType?: infer ValueType extends Exclude<evaluateParametersParameter, { type: "ignorableNamedParameter" }>;
          delimeter?: infer Delimeter;
      }
        ?
              | (ValueType extends undefined
                    ? string
                    : ValueType extends "string"
                    ? string
                    : ValueType extends "number"
                    ? number
                    : ValueType extends "boolean"
                    ? boolean
                    : never)
              | null
              | undefined
        : never
    : any | undefined;

/**
 * The evaluated parameters from the {@link evaluateParameters} function.
 *
 * @template {evaluateParametersParameter[] | [evaluateParametersParameter]} T The paramter types.
 *
 * @deprecated This type is deprectated, use {@link EvaluateParemtersResultArgs_v2} instead.
 */
export type EvaluateParemtersResultArgs_basic<T extends evaluateParametersParameter[]> = {
    [Index in keyof T]: EvaluateParamtersParamterTypeMapper<T[Index]>;
};

// declare let evaluateParemtersResultArgs_basic_type_test: EvaluateParemtersResultArgs_basic<["number", { type: "string"; key: "a" }, "boolean"]>;
// evaluateParemtersResultArgs_basic_type_test;

// declare let evaluateParemtersResultArgs_v2_type_test: EvaluateParemtersResultArgs_v2<["number", { type: "string"; key: "a" }, "boolean"], true, true>;
// const b = evaluateParemtersResultArgs_v2_type_test;

/**
 * The evaluated parameters from the {@link evaluateParameters} function.
 *
 * This is similar to {@link EvaluateParemtersResultArgs_basic} but separates the paramter types that have a key property, and maps then to use that key as their property key in the resulting args object, and removing them from the tuple, including shifting the following non-keyed arguments' indices so that the keyed argument does leave a gap in their indices.
 *
 * @template {evaluateParametersParameter[] | [evaluateParametersParameter]} T The paramter types.
 * @template {boolean} INK If the non-keyed arguments should be included in the resulting args object.
 * @template {boolean} IK If the keyed arguments should be included in the resulting args object.
 * @template {ExcludeFromTuple<T, objectEvaluateParametersParameter & { key: string }>} NK The non-keyed paramter types.
 * @template {ExcludeFromTuple<T, ExcludeFromTuple<T, objectEvaluateParametersParameter & { key: string }>>} K The keyed paramter types.
 *
 * @deprecated This should avoid being used as it will has too many calculations and will be missing the keyed properties if there are too many paramters.
 */
export type EvaluateParemtersResultArgs_v2<
    T extends evaluateParametersParameter[] | [evaluateParametersParameter],
    INK extends boolean = true,
    IK extends boolean = true,
    NK extends [...evaluateParametersParameter[]] = ExcludeFromTuple<T, objectEvaluateParametersParameter & { key: string }>,
    K extends [...(objectEvaluateParametersParameter & { key: string })[]] = ExcludeFromTuple<T, NK[keyof NK]> extends [
        ...(objectEvaluateParametersParameter & { key: string })[]
    ]
        ? ExcludeFromTuple<T, NK[keyof NK]>
        : [...(objectEvaluateParametersParameter & { key: string })[]]
> = [] extends K
    ? INK extends true
        ? {
              [Index in keyof NK]: EvaluateParamtersParamterTypeMapper<NK[Index]>;
          }
        : unknown
    : (IK extends true
          ? {
                [Key in K[number]["key"] extends string ? K[number]["key"] : never]: EvaluateParamtersParamterTypeMapper<
                    Exclude<K[number], Exclude<K[number], { key: Key }>>
                >;
            }
          : unknown) &
          (INK extends true
              ? {
                    [Index in keyof NK]: EvaluateParamtersParamterTypeMapper<NK[Index]>;
                }
              : unknown);

/**
 * The evaluated parameters from the {@link evaluateParameters} function.
 *
 * This is similar to {@link EvaluateParemtersResultArgs_basic} but separates the paramter types that have a key property, and maps then to use that key as their property key in the resulting args object, and removing them from the tuple, including shifting the following non-keyed arguments' indices so that the keyed argument does leave a gap in their indices.
 *
 * This only returns the tuple part of the evaluated parameters, not the keyed properties.
 *
 * @template {evaluateParametersParameter[] | [evaluateParametersParameter]} T The paramter types.
 * @template {ExcludeFromTuple<T, objectEvaluateParametersParameter & { key: string }>} NK The non-keyed paramter types.
 */
export type EvaluateParemtersResultArgs_v2_TupleOnly<
    T extends evaluateParametersParameter[] | [evaluateParametersParameter],
    NK extends [...evaluateParametersParameter[]] = ExcludeFromTuple<T, objectEvaluateParametersParameter & { key: string }>
> = {
    [Index in keyof NK]: EvaluateParamtersParamterTypeMapper<NK[Index]>;
};

/**
 * The evaluated parameters from the {@link evaluateParameters} function.
 *
 * This is similar to {@link EvaluateParemtersResultArgs_basic} but separates the paramter types that have a key property, and maps then to use that key as their property key in the resulting args object, and removing them from the tuple, including shifting the following non-keyed arguments' indices so that the keyed argument does leave a gap in their indices.
 *
 * This only returns the keyed properties of the evaluated parameters, not the tuple part.
 *
 * @template {evaluateParametersParameter[] | [evaluateParametersParameter]} T The paramter types.
 * @template {IncludeFromTuple<T, objectEvaluateParametersParameter & { key: string }>} K The keyed paramter types.
 */
export type EvaluateParemtersResultArgs_v2_KeyedOnly<
    T extends evaluateParametersParameter[] | [evaluateParametersParameter],
    K extends (objectEvaluateParametersParameter & { key: string })[] = IncludeFromTuple<T, objectEvaluateParametersParameter & { key: string }> extends [
        ...(objectEvaluateParametersParameter & { key: string })[]
    ]
        ? IncludeFromTuple<T, objectEvaluateParametersParameter & { key: string }>
        : [...(objectEvaluateParametersParameter & { key: string })[]]
> = {
    [Key in K[number]["key"]]: EvaluateParamtersParamterTypeMapper<IncludeFromTuple<K, { key: Key }>[number]>;
};

/**
 * Evaluates the parameters of a command string.
 *
 * @template {evaluateParametersParameter[] | [evaluateParametersParameter]} T The paramter types.
 * @template {boolean} UOAT If the old args return type should be used. Default is false.
 * @param {string} commandstring The command string to evaluate.
 * @param {T} parameters The parameters to evaluate.
 * @param {UOAT} useOldNamedIgnorableParametersType If the old args return type should be used. Default is false.
 * @returns {EvalutateParamtersResult<T>} The evaluated parameters.
 */
export function evaluateParameters<T extends evaluateParametersParameter[] | [evaluateParametersParameter], UOAT extends boolean = false>(
    commandstring: string,
    parameters: T,
    useOldNamedIgnorableParametersType: UOAT = false as UOAT
): EvalutateParamtersResult<T, UOAT> {
    let argumentsa: UOAT extends true
        ? EvaluateParemtersResultArgs_basic<T>
        : EvaluateParemtersResultArgs_v2_KeyedOnly<T> & EvaluateParemtersResultArgs_v2_TupleOnly<T> = [] as {} as UOAT extends true
        ? EvaluateParemtersResultArgs_basic<T>
        : EvaluateParemtersResultArgs_v2_KeyedOnly<T> & EvaluateParemtersResultArgs_v2_TupleOnly<T>;
    if (!useOldNamedIgnorableParametersType) {
        Object.defineProperty(argumentsa, "toJSON", { value: () => Object.fromEntries(Object.entries(argumentsa as {})) });
    }
    const addValueToArgumentsA = useOldNamedIgnorableParametersType
        ? function addValueToArgumentsA(key: any, value: any) {
              (argumentsa as EvaluateParemtersResultArgs_basic<T>).push(value);
          }
        : function addValueToArgumentsA(key: Exclude<T[number], stringEvaluateParametersParameter>["key"] | undefined, value: any) {
              if (key === undefined) {
                  (argumentsa as EvaluateParemtersResultArgs_basic<T>).push(value);
              } else {
                  (argumentsa as EvaluateParemtersResultArgs_v2_KeyedOnly<T> & EvaluateParemtersResultArgs_v2_TupleOnly<T>)[
                      key as keyof (EvaluateParemtersResultArgs_v2_KeyedOnly<T> & EvaluateParemtersResultArgs_v2_TupleOnly<T>)
                  ] = value;
              }
          };
    let ea: [Error, any][] = [] as [Error, any][];
    let paramEval: string = commandstring; /*
    let parametersb = []
    if(typeof parameters[0] == "string"){parametersb = parameters.map(v=>({type: v}))}else{parametersb = parameters}*/
    const namedIgnorableParameters = new EvaluateParameters_NamedIgnorableParamaters(parameters);

    parameters
        .map((v) =>
            typeof v === "string"
                ? (v as any) === "Vectors"
                    ? ({
                          type: v,
                          key: undefined,
                          vectorCount: 3,
                          maxLength: undefined,
                      } as unknown as {
                          type: "Vectors";
                          key: undefined;
                          vectorCount?: number;
                          maxLength?: number;
                      })
                    : { type: v, key: undefined as undefined, vectorCount: undefined as undefined, maxLength: undefined as undefined }
                : v?.type == "Vectors"
                ? (v as {
                      type: "Vectors";
                      key?: string;
                      vectorCount?: number;
                      maxLength?: number;
                  })
                : v?.type === "ignorableNamedParameter"
                ? v
                : (v as unknown as {
                      type: typeof v;
                      key?: string;
                      vectorCount?: number;
                      maxLength?: number;
                  })
        )
        .forEach((p, i) => {
            switch (true) {
                case paramEval.trim() == "":
                    {
                        if (!!(p.type as string).match(/^-[a-zA-Z0-9!@#$%^&*<>,.~]+$/)) {
                            addValueToArgumentsA(p.key, "");
                        } else if (!!(p.type as string).match(/^f-[a-zA-Z0-9!@#$%^&*<>,.~]+$/)) {
                            addValueToArgumentsA(
                                p.key,
                                Object.fromEntries(
                                    (p.type as string)
                                        .slice(2)
                                        .split("")
                                        .map((v) => [v, false])
                                )
                            );
                        } else {
                            addValueToArgumentsA(p.key, null);
                        }
                        return;
                    }
                    break;
                case p.type == "presetText":
                    {
                        addValueToArgumentsA(p.key, paramEval.trimStart().split(" ")[0]);
                        paramEval = paramEval.trimStart().split(" ").slice(1).join(" ");
                    }
                    break;
                case p.type == "number":
                    {
                        addValueToArgumentsA(p.key, Number(paramEval.trimStart().split(" ")[0]));
                        paramEval = paramEval.trimStart().split(" ").slice(1).join(" ");
                    }
                    break;
                case p.type == "boolean":
                    {
                        addValueToArgumentsA(
                            p.key,
                            paramEval.trimStart().split(" ")[0]?.trim?.() == ""
                                ? undefined
                                : Boolean(
                                      JSON.parse(
                                          paramEval
                                              .trimStart()
                                              .split(" ")[0]
                                              .replace(/^t$/i, "true")
                                              .replace(/^f$/i, "false")
                                              .replace(/^true$/i, "true")
                                              .replace(/^false$/i, "false")
                                      )
                                  )
                        );
                        paramEval = paramEval.trimStart().split(" ").slice(1).join(" ");
                    }
                    break;
                case p.type == "neboolean":
                    {
                        try {
                            addValueToArgumentsA(
                                p.key,
                                paramEval.trimStart().split(" ")[0]?.trim?.() == ""
                                    ? undefined
                                    : Boolean(
                                          JSON.parse(
                                              paramEval
                                                  .trimStart()
                                                  .split(" ")[0]
                                                  .replace(/^t$/i, "true")
                                                  .replace(/^f$/i, "false")
                                                  .replace(/^true$/i, "true")
                                                  .replace(/^false$/i, "false")
                                          )
                                      )
                            );
                            paramEval = paramEval.trimStart().split(" ").slice(1).join(" ");
                        } catch {
                            addValueToArgumentsA(p.key, undefined);
                        }
                    }
                    break;
                case p.type == "string":
                    {
                        if (paramEval.trimStart().startsWith('""')) {
                            addValueToArgumentsA(p.key, "");
                            paramEval = paramEval.trimStart().slice(2);
                        } else if (paramEval.trimStart().startsWith('"')) {
                            let value = getParametersFromString(paramEval.trimStart()).resultsincludingunmodified[0];
                            paramEval = paramEval.trimStart().slice(value?.s?.length + 1) ?? "";
                            try {
                                addValueToArgumentsA(p.key, value?.v);
                            } catch (e) {
                                ea.push([e, e.stack]);
                                addValueToArgumentsA(p.key, null);
                            }
                        } else {
                            addValueToArgumentsA(p.key, paramEval.trimStart().split(" ")[0]);
                            paramEval = paramEval.trimStart().split(" ").slice(1).join(" ");
                        }
                    }
                    break;
                case p.type == "non-booleanString":
                    {
                        if (["true", "false", "t", "f", "1", "0"].includes(paramEval.trimStart().split(" ")[0].toLowerCase())) {
                            addValueToArgumentsA(p.key, undefined);
                        } else if (paramEval.trimStart().startsWith('"')) {
                            let value = getParametersFromString(paramEval.trimStart()).resultsincludingunmodified[0];
                            paramEval = paramEval.trimStart().slice(value?.s?.length + 1) ?? "";
                            try {
                                addValueToArgumentsA(p.key, value?.v);
                            } catch (e) {
                                ea.push([e, e.stack]);
                                addValueToArgumentsA(p.key, null);
                            }
                        } else {
                            addValueToArgumentsA(p.key, paramEval.trimStart().split(" ")[0]);
                            paramEval = paramEval.trimStart().split(" ").slice(1).join(" ");
                        } //1870//7018
                    }
                    break;
                case !!(p.type as string).match(/^-[a-zA-Z0-9!@#$%^&*<>,.~]+$/):
                    {
                        if (!!paramEval.trimStart().match(new RegExp(`(?<=^\\-)(${(p.type as string).slice(1).split("").join("|")})+(?=$|\\s)`))) {
                            let value = paramEval.trimStart().match(new RegExp(`(?<=^\\-)(${(p.type as string).slice(1).split("").join("|")})+(?=$|\\s)`))[0];
                            paramEval = paramEval.trimStart().slice(paramEval.trimStart().indexOf(value) + value.length) ?? "";
                            try {
                                addValueToArgumentsA(p.key, value);
                            } catch (e) {
                                addValueToArgumentsA(p.key, "");
                                ea.push([e, e.stack]);
                            }
                        } else {
                            addValueToArgumentsA(p.key, "");
                        }
                    }
                    break;
                case !!(p.type as string).match(/^f-[a-zA-Z0-9!@#$%^&*<>,.~]+$/):
                    {
                        if (!!paramEval.trimStart().match(new RegExp(`(?<=^\\-)(${(p.type as string).slice(2).split("").join("|")})+(?=$|\\s)`))) {
                            let value = paramEval.trimStart().match(new RegExp(`(?<=^\\-)(${(p.type as string).slice(2).split("").join("|")})+(?=$|\\s)`))[0];
                            paramEval = paramEval.trimStart().slice(paramEval.trimStart().indexOf(value) + value.length) ?? "";
                            try {
                                addValueToArgumentsA(
                                    p.key,
                                    Object.fromEntries(
                                        (p.type as string)
                                            .slice(2)
                                            .split("")
                                            .map((v) => [v, value.includes(v)])
                                    )
                                );
                            } catch (e) {
                                addValueToArgumentsA(
                                    p.key,
                                    Object.fromEntries(
                                        (p.type as string)
                                            .slice(2)
                                            .split("")
                                            .map((v) => [v, false])
                                    )
                                );
                                ea.push([e, e.stack]);
                            }
                        } else {
                            addValueToArgumentsA(
                                p.key,
                                Object.fromEntries(
                                    (p.type as string)
                                        .slice(2)
                                        .split("")
                                        .map((v) => [v, false])
                                )
                            );
                        }
                    }
                    break;
                case p.type == "json":
                    {
                        let value = getParametersFromString(paramEval.trimStart()).resultsincludingunmodified[0];
                        paramEval = paramEval.trimStart().slice(value?.s?.length + 1) ?? "";
                        try {
                            addValueToArgumentsA(p.key, value?.v ?? JSONParse(value?.s ?? paramEval, true));
                        } catch (e) {
                            ea.push([e, e.stack]);
                            addValueToArgumentsA(p.key, null);
                        }
                    }
                    break;
                case p.type == "blockStates":
                    {
                        if (paramEval.indexOf("[") == -1 && paramEval.indexOf("{") == -1) {
                            addValueToArgumentsA(p.key, undefined);
                        } else if (
                            (paramEval.indexOf("[") == -1 ? Infinity : paramEval.indexOf("[")) <
                            (paramEval.indexOf("{") == -1 ? Infinity : paramEval.indexOf("{"))
                        ) {
                            let value = getParametersFromString(paramEval.replaceAll("=", ":").replaceAll("[", "{").replaceAll("]", "}"))
                                .resultsincludingunmodified[0];
                            paramEval = paramEval.slice(value?.s?.length + 1) ?? "";
                            try {
                                addValueToArgumentsA(p.key, value?.v ?? JSONParse(value?.s ?? "undefined", true));
                            } catch (e) {
                                ea.push([e, e.stack]);
                                addValueToArgumentsA(p.key, null);
                            }
                        } else {
                            let value = getParametersFromString(paramEval).resultsincludingunmodified[0];
                            paramEval = paramEval.slice(value?.s?.length + 1) ?? "";
                            try {
                                addValueToArgumentsA(p.key, value?.v ?? JSONParse(value?.s ?? "undefined", true));
                            } catch (e) {
                                ea.push([e, e.stack]);
                                addValueToArgumentsA(p.key, null);
                            }
                        }
                    }
                    break;
                case p.type == "blockPattern":
                    {
                        const ep = BlockPattern.extractWRaw(paramEval.trimStart());
                        paramEval = paramEval.slice(paramEval.indexOf(ep.raw) + ep.raw.length) ?? "";
                        try {
                            addValueToArgumentsA(p.key, ep.parsed);
                        } catch (e) {
                            ea.push([e, e.stack]);
                            addValueToArgumentsA(p.key, null);
                        }
                    }
                    break;
                case p.type == "block":
                    {
                        const ep = parseBlockMatcherType(paramEval.trimStart());
                        paramEval = paramEval.slice(paramEval.indexOf(ep.raw) + ep.raw.length) ?? "";
                        try {
                            addValueToArgumentsA(p.key, ep.block);
                        } catch (e) {
                            ea.push([e, e.stack]);
                            addValueToArgumentsA(p.key, null);
                        }
                    }
                    break;
                case p.type == "blockMask":
                    {
                        const ep = BlockMask.extractWRaw(paramEval.trimStart());
                        paramEval = paramEval.slice(paramEval.indexOf(ep.raw) + ep.raw.length) ?? "";
                        try {
                            addValueToArgumentsA(p.key, ep.parsed);
                        } catch (e) {
                            ea.push([e, e.stack]);
                            addValueToArgumentsA(p.key, null);
                        }
                    }
                    break;
                case p.type == "targetSelector":
                    {
                        if (!paramEval.trimStart().startsWith("@")) {
                            if (paramEval.trimStart().startsWith('"')) {
                                let value = getParametersFromString(paramEval.trimStart()).resultsincludingunmodified[0];
                                paramEval = paramEval.trimStart().slice(value?.s?.length) ?? "";
                                paramEval = paramEval.slice(+(paramEval[0] == " ")) ?? "";
                                try {
                                    addValueToArgumentsA(p.key, !!!value?.v ? undefined : '"' + value?.v + '"');
                                } catch (e) {
                                    ea.push([e, e.stack]);
                                    addValueToArgumentsA(p.key, null);
                                }
                            } else {
                                addValueToArgumentsA(p.key, paramEval.trimStart().split(" ")[0]);
                                paramEval = paramEval.trimStart().split(" ").slice(1).join(" ").trimStart();
                            }
                        } else {
                            if (!!paramEval.trimStart().match(/^@[a-zA-Z]\s*(?![\s\[])/)) {
                                let value = paramEval.trimStart().match(/^@[seapvrc]/)[0];
                                paramEval = paramEval.slice(paramEval.indexOf(value) + value?.length) ?? "";
                                try {
                                    addValueToArgumentsA(p.key, value);
                                } catch (e) {
                                    ea.push([e, e.stack]);
                                    addValueToArgumentsA(p.key, null);
                                }
                            } else {
                                let value = extractSelectors(paramEval)[0];
                                paramEval = paramEval.slice(paramEval.indexOf(value) + value?.length) ?? "";
                                try {
                                    addValueToArgumentsA(p.key, value);
                                } catch (e) {
                                    ea.push([e, e.stack]);
                                    addValueToArgumentsA(p.key, null);
                                }
                            }
                        }
                    }
                    break;
                case p.type == "Vector" || (p?.type ?? p) == "Vector1":
                    {
                        let value = paramEval.match(
                            /(?<!(?<!^([^"]*["][^"]*)+)(([^"]*(?<!([^\\])(\\\\)*?\\)"){2})*([^"]*(?<!([^\\])(\\\\)*?\\)")[^"]*)(((?<=[\s\~\!\^\%\&\*\d])|^)[\~\!\^\%\&\*]([\-\+]?\d+(\.\d+)?)?|((?<=\s)|^)[\-\+]?\d+(\.\d+)?)(?!([^"]*(?<!([^\\])(\\\\)*?\\)")[^"]*(([^"]*(?<!([^\\])(\\\\)*?\\)"){2})*(?!([^"]*["][^"]*)+$))/g
                        )?.[0];
                        paramEval = paramEval.slice(paramEval.indexOf(value) + value?.length) ?? "";
                        if (paramEval.startsWith(" ")) {
                            paramEval = paramEval.slice(1) ?? "";
                        }
                        try {
                            addValueToArgumentsA(p.key, value);
                        } catch (e) {
                            ea.push([e, e.stack]);
                            addValueToArgumentsA(p.key, null);
                        }
                    }
                    break;
                case !!(p.type as string).match(/^Vector[2-8]$/):
                    {
                        let value = paramEval.match(
                            new RegExp(
                                String.raw`(?<!(?<!^([^"]*["][^"]*)+)(([^"]*(?<!([^\\])(\\\\)*?\\)"){2})*([^"]*(?<!([^\\])(\\\\)*?\\)")[^"]*)(((((?<=[\s\~\!\^\%\&\*\d])|^)[\~\!\^\%\&\*](?:[\-\+]?\d+(\.\d+)?)?)|(((?<=\s)|^)[\-\+]?\d+(\.\d+)?))\s*?){${(
                                    p.type as string
                                ).slice(6)}}(?!([^"]*(?<!([^\\])(\\\\)*?\\)")[^"]*(([^"]*(?<!([^\\])(\\\\)*?\\)"){2})*(?!([^"]*["][^"]*)+$))`
                            )
                        )?.[0];
                        paramEval = paramEval.slice(paramEval.indexOf(value) + value?.length) ?? "";
                        if (paramEval.startsWith(" ")) {
                            paramEval = paramEval.slice(1) ?? "";
                        }
                        try {
                            addValueToArgumentsA(p.key, value);
                        } catch (e) {
                            ea.push([e, e.stack]);
                            addValueToArgumentsA(p.key, null);
                        }
                    }
                    break;
                case p.type == "Vectors":
                    {
                        let value = paramEval.match(
                            new RegExp(
                                String.raw`(?<!(?<!^([^"]*["][^"]*)+)(([^"]*(?<!([^\\])(\\\\)*?\\)"){2})*([^"]*(?<!([^\\])(\\\\)*?\\)")[^"]*)(((((?<=[\s\~\!\^\%\&\*\d])|^)[\~\!\^\%\&\*](?:[\-\+]?\d+(\.\d+)?)?)|(((?<=\s)|^)[\-\+]?\d+(\.\d+)?))\s*?){${
                                    p.vectorCount ?? 3
                                }}(?!([^"]*(?<!([^\\])(\\\\)*?\\)")[^"]*(([^"]*(?<!([^\\])(\\\\)*?\\)"){2})*(?!([^"]*["][^"]*)+$))`
                            )
                        )?.[0];
                        paramEval = paramEval.slice(paramEval.indexOf(value) + value?.length) ?? "";
                        if (paramEval.startsWith(" ")) {
                            paramEval = paramEval.slice(1) ?? "";
                        }
                        try {
                            addValueToArgumentsA(p.key, value);
                        } catch (e) {
                            ea.push([e, e.stack]);
                            addValueToArgumentsA(p.key, null);
                        }
                    }
                    break;
                case p.type == "ignorableNamedParameter":
                    {
                        // Push the named ignorable paramter class instance to the array, it will be replaced with the actual value later.
                        addValueToArgumentsA(p.key, namedIgnorableParameters.parameters[i]);
                        /**
                         * The named ignorable parameter class instance that matches the value of this paramter, or undefined if there is no match.
                         *
                         * @type {EvaluateParameters_NamedIgnorableParamater | undefined}
                         */
                        const parameter: EvaluateParameters_NamedIgnorableParamater | undefined = namedIgnorableParameters
                            .getValidNamedParametersForIndex(i)
                            .find((p) =>
                                p
                                    ? p.nameIsCaseSensitive
                                        ? paramEval.trimStart().startsWith(`${p.name}${p.delimeter}`)
                                        : paramEval.trimStart().toLowerCase().startsWith(`${p.name}${p.delimeter}`.toLowerCase())
                                    : false
                            );
                        if (parameter) {
                            paramEval = paramEval.trimStart().slice(`${parameter.name}${parameter.delimeter ?? "="}`.length);
                            /**
                             * The value type of the named ignorable parameter class instance that matches the value of this paramter.
                             *
                             * @type {typeof parameter.valueType}
                             */
                            const valueType: typeof parameter.valueType =
                                typeof parameter.valueType === "string" ? { type: parameter.valueType } : parameter.valueType;
                            switch (valueType.type) {
                                case "string":
                                    if (paramEval.startsWith('""')) {
                                        parameter.value = "";
                                        paramEval = paramEval.slice(2);
                                    } else if (paramEval.startsWith('"')) {
                                        let value = getParametersFromString(paramEval).resultsincludingunmodified[0];
                                        paramEval = paramEval.slice(value?.s?.length + 1) ?? "";
                                        try {
                                            parameter.value = value?.v;
                                        } catch (e) {
                                            ea.push([e, e.stack]);
                                            parameter.value = null;
                                        }
                                    } else {
                                        parameter.value = paramEval.split(" ")[0];
                                        paramEval = paramEval.split(" ").slice(1).join(" ");
                                    }
                                    break;
                                case "number":
                                    parameter.value = Number(paramEval.split(" ")[0]);
                                    paramEval = paramEval.split(" ").slice(1).join(" ");
                                    break;
                                case "boolean":
                                    parameter.value =
                                        paramEval.split(" ")[0]?.trim?.() == ""
                                            ? undefined
                                            : Boolean(
                                                  JSON.parse(
                                                      paramEval
                                                          .split(" ")[0]
                                                          .replace(/^t$/i, "true")
                                                          .replace(/^f$/i, "false")
                                                          .replace(/^true$/i, "true")
                                                          .replace(/^false$/i, "false")
                                                  )
                                              );
                                    paramEval = paramEval.split(" ").slice(1).join(" ");
                                    break;
                                default:
                                    throw new TypeError(`Unsupported value type: ${JSON.stringify(p.valueType)}`);
                            }
                        }
                    }
                    break;
                default:
                    throw new TypeError(`Unsupported parameter type: ${JSON.stringify(p)}`);
            }
        });
    namedIgnorableParameters.applyDetectedValuesToArgsObject<T, UOAT>(argumentsa);
    return {
        params: parameters,
        extra: paramEval,
        args: argumentsa as any,
        get argsT() {
            return argumentsa as any;
        },
        get argsK() {
            return argumentsa as any;
        },
        err: ea,
    };
}

/**
 * Stores the found named ignorable parameters.
 *
 * This is used for the {@link evaluateParameters} function to allow changing the order of named ignorable parameters that are defined next to each other.
 */
export class EvaluateParameters_NamedIgnorableParamaters {
    /**
     * The found named ignorable parameters, with their original indexes, and indexes of parameters than are not named ignorable paramters having a value of `undefined`.
     *
     * @type {(EvaluateParameters_NamedIgnorableParamater | undefined)[]}
     */
    public parameters: (EvaluateParameters_NamedIgnorableParamater | undefined)[];
    /**
     * Creates a new instance of the {@link EvaluateParameters_NamedIgnorableParamaters} class.
     *
     * @param {evaluateParametersParameter[]} parameters The parameters to extract named ignorable parameters from.
     */
    public constructor(parameters: evaluateParametersParameter[]) {
        this.parameters = parameters.map((v) => {
            if (typeof v === "object" ? v?.type !== "ignorableNamedParameter" : true) {
                return undefined;
            } else {
                return new EvaluateParameters_NamedIgnorableParamater(
                    v as Exclude<evaluateParametersParameter, Exclude<evaluateParametersParameter, { type: "ignorableNamedParameter" }>>
                );
            }
        });
    }
    /**
     * Gets the sibling named ignorable parameters for an index.
     *
     * @param {number} index The index to get the named ignorable parameters for.
     * @returns {EvaluateParameters_NamedIgnorableParamater[]} The named ignorable parameters for the index.
     * @throws {RangeError} If the index is less than 0 or greater than or equal to the number of parameters.
     *
     * @description
     * It splits up the list of ignorable parameters into chunks, separated by indexes of parameters that are not ignorable parameters.
     *
     * It then returns the chunk that the index is in.
     */
    public getValidNamedParametersForIndex(index: number): EvaluateParameters_NamedIgnorableParamater[] {
        if (index < 0) {
            throw new RangeError("Index must be greater than or equal to 0.");
        }
        if (index >= this.parameters.length) {
            throw new RangeError("Index must be less than the number of parameters.");
        }
        const endIndex: number = this.parameters.indexOf(undefined, index);
        return this.parameters.slice(index, endIndex === -1 ? this.parameters.length : endIndex) as EvaluateParameters_NamedIgnorableParamater[];
    }
    /**
     * Applies the detected values to the args object.
     *
     * This function mutates the object passed in to the {@link args} parameter.
     *
     * @template {evaluateParametersParameter[] | [evaluateParametersParameter]} T The paramter types.
     * @template {boolean} UOAT If the old args return type should be used. Default is false.
     * @param {ReturnType<typeof evaluateParameters<evaluateParametersParameter[], UOAT>>["args"]} args The args array to apply the detected values to.
     */
    public applyDetectedValuesToArgsObject<T extends evaluateParametersParameter[] | [evaluateParametersParameter], UOAT extends boolean = false>(
        args: UOAT extends true
            ? EvaluateParemtersResultArgs_basic<T>
            : EvaluateParemtersResultArgs_v2_KeyedOnly<T> & EvaluateParemtersResultArgs_v2_TupleOnly<T>
    ): void {
        for (const key in Object.keys(args)) {
            if (args[key] instanceof EvaluateParameters_NamedIgnorableParamater) {
                args[key] = args[key].value;
            }
        }
    }
}

/**
 * An ignorable named parameter.
 *
 * This is used for the {@link evaluateParameters} function to allow changing the order of named ignorable parameters that are defined next to each other.
 */
export class EvaluateParameters_NamedIgnorableParamater
    implements Exclude<evaluateParametersParameter, Exclude<evaluateParametersParameter, { type: "ignorableNamedParameter" }>>
{
    public name: Exclude<evaluateParametersParameter, Exclude<evaluateParametersParameter, { type: "ignorableNamedParameter" }>>["name"];
    public valueType: Exclude<evaluateParametersParameter, Exclude<evaluateParametersParameter, { type: "ignorableNamedParameter" }>>["valueType"];
    public delimeter: Exclude<evaluateParametersParameter, Exclude<evaluateParametersParameter, { type: "ignorableNamedParameter" }>>["delimeter"];
    public nameIsCaseSensitive: Exclude<
        evaluateParametersParameter,
        Exclude<evaluateParametersParameter, { type: "ignorableNamedParameter" }>
    >["nameIsCaseSensitive"];
    public type: "ignorableNamedParameter" = "ignorableNamedParameter";
    public key?: string;
    /**
     * The detected value of the parameter fron the command string.
     *
     * @type {EvaluateParamtersParamterTypeMapper<Exclude<objectEvaluateParametersParameter, Exclude<objectEvaluateParametersParameter, { type: "ignorableNamedParameter" }>>> | null}
     *
     * @default null
     */
    public value: EvaluateParamtersParamterTypeMapper<
        Exclude<objectEvaluateParametersParameter, Exclude<objectEvaluateParametersParameter, { type: "ignorableNamedParameter" }>>
    > | null = null;
    /**
     * Creates a new instance of the {@link EvaluateParameters_NamedIgnorableParamater} class.
     *
     * @param {Exclude<evaluateParametersParameter, Exclude<evaluateParametersParameter, { type: "ignorableNamedParameter" }>>} parameter The named ignorable parameter.
     */
    public constructor(parameter: Exclude<evaluateParametersParameter, Exclude<evaluateParametersParameter, { type: "ignorableNamedParameter" }>>) {
        this.name = parameter.name;
        this.valueType = parameter.valueType ?? "string";
        this.delimeter = parameter.delimeter ?? "=";
        this.nameIsCaseSensitive = parameter.nameIsCaseSensitive ?? false;
        this.key = parameter.key;
    }
}
