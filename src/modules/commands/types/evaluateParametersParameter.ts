export type evaluateParametersParameter =
    | {
          /**
           * The type of the parameter.
           */
          type:
              | "presetText"
              | "number"
              | "boolean"
              | "neboolean"
              | "string"
              | "non-booleanString"
              | "json"
              | "Vector"
              | "Vector1"
              | "Vector2"
              | "Vector3"
              | "Vector4"
              | "Vector5"
              | "Vector6"
              | "Vector7"
              | "Vector8"
              | "targetSelector"
              | "blockStates"
              | "blockPattern"
              | "block"
              | "blockMask"
              | "dimension"
              | `-${string}`
              | `f-${string}`;
          /**
           * The maximum length of the parameter.
           *
           * @deprecated This property is unused.
           *
           * @default Infinity
           */
          maxLength?: number;
      }
    | {
          /**
           * The type of the parameter.
           *
           * a
           */
          type: "Vectors";
          /**
           * The number of vectors to expect.
           *
           * @default 3
           */
          vectorCount?: number;
          /**
           * The maximum length of the parameter.
           *
           * @deprecated This property is unused.
           *
           * @default Infinity
           */
          maxLength?: number;
      }
    | {
          /**
           * The type of the parameter.
           */
          type: "ignorableNamedParameter";
          /**
           * The name of the parameter.
           *
           * This will be used for users to provide the parameter.
           *
           * The value users will enter will be formatted as: `${name}${delimeter ?? "="}value` or `${name}${delimeter ?? "="}"value with spaces and escape codes"`
           */
          name: string;
          /**
           * The value type of the parameter.
           *
           * This currently only supports the following types:
           * - `string`
           * - `number`
           * - `boolean`
           *
           * @default "string"
           */
          valueType?: Exclude<evaluateParametersParameter, { type: "ignorableNamedParameter" }>;
          /**
           * The delimeter to use between the name and the value.
           *
           * @default "="
           */
          delimeter?: string;
          /**
           * Whether the name is case sensitive.
           *
           * @default false
           */
          nameIsCaseSensitive?: boolean;
          /**
           * The maximum length of the parameter.
           *
           * @deprecated This property is unused.
           *
           * @default Infinity
           */
          maxLength?: number;
      }
    | "presetText"
    | "number"
    | "boolean"
    | "neboolean"
    | "string"
    | "non-booleanString"
    | "json"
    | "Vector"
    | "Vector1"
    | "Vector2"
    | "Vector3"
    | "Vector4"
    | "Vector5"
    | "Vector6"
    | "Vector7"
    | "Vector8"
    | "targetSelector"
    | "blockStates"
    | "blockPattern"
    | "block"
    | "blockMask"
    | "dimension"
    | `-${string}`
    | `f-${string}`;
