export type FilterKey<T, K extends (keyof any)[] | keyof any> = {
    [P in keyof T as K extends (keyof any)[]
        ? P extends number
            ? `${P}` extends `${VerifyConstraint<K[number], string | number>}`
                ? never
                : P
            : P extends (K[number] extends number ? `${K[number]}` : K[number])
            ? never
            : P
        : P extends number
        ? `${P}` extends `${VerifyConstraint<K, string | number>}`
            ? never
            : P
        : P extends (K extends number ? `${K}` : K)
        ? never
        : P]: T[P] extends object ? (T[P] extends (...args: any[]) => any ? T[P] : FilterKey<T[P], K>) : T[P];
};

export type ReplaceTypeOfKey<T, K extends (keyof any)[] | keyof any, U> = {
    [P in keyof T]: K extends (keyof any)[]
        ? P extends number
            ? `${P}` extends `${VerifyConstraint<K[number], string | number>}`
                ? U
                : T[P] extends object
                ? T[P] extends (...args: any[]) => any
                    ? T[P]
                    : ReplaceTypeOfKey<T[P], K, U>
                : T[P]
            : P extends (K[number] extends number ? `${K[number]}` : K[number])
            ? U
            : T[P] extends object
            ? T[P] extends (...args: any[]) => any
                ? T[P]
                : ReplaceTypeOfKey<T[P], K, U>
            : T[P]
        : P extends number
        ? `${P}` extends `${VerifyConstraint<K, string | number>}`
            ? U
            : T[P] extends object
            ? T[P] extends (...args: any[]) => any
                ? T[P]
                : ReplaceTypeOfKey<T[P], K, U>
            : T[P]
        : P extends (K extends number ? `${K}` : K)
        ? U
        : T[P] extends object
        ? T[P] extends (...args: any[]) => any
            ? T[P]
            : ReplaceTypeOfKey<T[P], K, U>
        : T[P];
};

// let a: ReplaceTypeOfKey<{a: 1, bb: 2, c: {a: 1, bb: 2, 1: 3}}, ["a", "bb"], 5>

export type PropertyNamesWithPath<T> = T extends object
    ? {
          [K in string & keyof T]: T[K] extends Date | undefined
              ? K // Stop recursion on Date
              : T[K] extends Array<infer A> | undefined
              ? K | `${K & string}.${PropertyNamesWithPath<A>}` // On arrays, continue with the parameterized type
              : K | `${K & string}.${PropertyNamesWithPath<T[K]>}`;
      }[string & keyof T]
    : never;

export type PropertyNamesInner<T, U = keyof T> = T extends object
    ? {
          [K in U & keyof T]: T[K] extends Date | undefined
              ? K // Stop recursion on Date
              : T[K] extends Array<infer A> | undefined
              ? K | PropertyNamesInner<A> // On arrays, continue with the parameterized type
              : K | PropertyNamesInner<T[K]>;
      }[U & keyof T]
    : never;

export type PropertyNames<T, U = string | number> = VerifyConstraint<PropertyNamesInner<T, U>, U>;

export type VerifyConstraint<T, U> = T extends U ? T : never;

// type ab<T> = T extends (infer B)[] ? B[] : never;

// type ac<A, T extends LooseAutocompleteB<string | number, PropertyNames<A, string | number>>[]> = T extends (infer B)[] ? B[] : never;

// type ad<A, T extends PropertyNames<T>[]> = T extends [infer a, ...infer _] ? a : never;

// const a: VerifyConstraint<1|{a: 3}|5|"a"|9|{}, string|number> = 1

// function aaaaaaaaaaaaaaaa<T extends Exclude<number, 9>>(numberLiteral: T extends 9 ? never : T){};
// aaaaaaaaaaaaaaaa(6 as const);

/**
 * Recursively filters out a specified property from an object or array of objects.
 *
 * @template {T} T - The type of the object.
 * @template {K extends ((number & PropertyNames<T, number|string>)|(string & (PropertyNames<T, number|string> | `${PropertyNames<T, number|string>}`)))[]} K - The type of the key to remove, which extends a loose autocomplete of string or number.
 *
 * @param {T} obj - The object or array of objects to filter.
 * @param {K} keyToRemove - The key of the property to remove.
 * @param {{useKeysInsteadOfGetOwnPropertyNames?: boolean}} [options] - Optional settings.
 * @param {boolean} [options.useKeysInsteadOfGetOwnPropertyNames] - If true, uses `Object.keys` instead of `Object.getOwnPropertyNames` to get the properties of the object. Defaults to false.
 * @param {boolean} [options.force] - If true, it forces the function to filter the properties of the value passed into the obj parameter, even if it is not an object. Defaults to false.
 * @param {boolean} [options.onlyEnumerable] - If true, it forces the function to only do recursive checking on enumerable properties. Defaults to false.
 * @param {boolean} [options.onlyNonFunctions] - If true, it forces the function to only do recursive checking on non-function properties. Defaults to true.
 * @param {boolean} [options.onlyNonProto] - If true, it forces the function to only do recursive checking on properties that are not in the __proto__ property. Defaults to true.
 *
 * @returns {FilterKey<T, K>} - The filtered object or array of objects without the specified property.
 */
export function filterProperties<
    T,
    K extends ((number & PropertyNames<T, number | string>) | (string & (PropertyNames<T, number | string> | `${PropertyNames<T, number | string>}`)))[]
>(
    obj: T,
    keyToRemove: K,
    options?: { useKeysInsteadOfGetOwnPropertyNames?: boolean; force?: boolean; onlyEnumerable?: boolean; onlyNonFunctions?: boolean; onlyNonProto?: boolean }
): FilterKey<T, K> {
    if (Array.isArray(obj)) {
        return obj.map((item) => filterProperties(item as T, keyToRemove, options)) as any;
    } else if ((options?.force ?? false) || (obj !== null && typeof obj === "object") || typeof obj === "function") {
        return Object[options?.useKeysInsteadOfGetOwnPropertyNames ?? false ? "keys" : "getOwnPropertyNames"](obj!).reduce((acc, key) => {
            if (!keyToRemove.includes(key as K[number])) {
                let value = undefined;
                if (options?.onlyEnumerable ?? false) {
                    value =
                        Object.getOwnPropertyDescriptor(obj, key)?.enumerable === false
                            ? obj[key as keyof typeof obj]
                            : filterProperties(obj[key as keyof typeof obj] as T, keyToRemove, options);
                } else if (options?.onlyNonFunctions ?? true) {
                    value = ["function", "undefined"].includes(typeof obj[key as keyof typeof obj])
                        ? obj[key as keyof typeof obj]
                        : filterProperties(obj[key as keyof typeof obj] as T, keyToRemove, options);
                } else if ((options?.onlyNonProto ?? true) && obj?.__proto__ !== undefined) {
                    value = Object.getOwnPropertyDescriptors(obj).hasOwnProperty(key)
                        ? obj[key as keyof typeof obj]
                        : filterProperties(obj[key as keyof typeof obj] as T, keyToRemove, options);
                } else {
                    value = filterProperties(obj[key as keyof typeof obj] as T, keyToRemove, options);
                }
                acc[key] = value;
            }
            return acc;
        }, {} as any);
    }
    return obj as any;
}
export function filterPropertiesB<T, K extends LooseAutocompleteB<string | number, PropertyNames<T>>>(
    obj: T,
    keyToRemove: K,
    options?: { useKeysInsteadOfGetOwnPropertyNames?: boolean; force?: boolean; onlyEnumerable?: boolean; onlyNonFunctions?: boolean; onlyNonProto?: boolean }
): FilterKey<T, K> {
    if (Array.isArray(obj)) {
        return obj.map((item) => filterPropertiesB(item, keyToRemove)) as any;
    } else if ((options?.force ?? false) || (obj !== null && typeof obj === "object") || typeof obj === "function") {
        return Object[options?.useKeysInsteadOfGetOwnPropertyNames ?? false ? "keys" : "getOwnPropertyNames"](obj!).reduce((acc, key) => {
            if (key !== keyToRemove) {
                let value = undefined;
                if (options?.onlyEnumerable ?? false) {
                    value =
                        Object.getOwnPropertyDescriptor(obj, key)?.enumerable === false
                            ? obj[key as keyof typeof obj]
                            : filterPropertiesB(obj[key as keyof typeof obj] as any, keyToRemove);
                } else if (options?.onlyNonFunctions ?? true) {
                    value = ["function", "undefined"].includes(typeof obj[key as keyof typeof obj])
                        ? obj[key as keyof typeof obj]
                        : filterPropertiesB(obj[key as keyof typeof obj] as any, keyToRemove);
                } else if ((options?.onlyNonProto ?? true) && obj?.__proto__ !== undefined) {
                    value = Object.getOwnPropertyDescriptors(obj).hasOwnProperty(key)
                        ? obj[key as keyof typeof obj]
                        : filterPropertiesB(obj[key as keyof typeof obj] as any, keyToRemove);
                } else {
                    value = filterPropertiesB(obj[key as keyof typeof obj] as any, keyToRemove);
                }
                acc[key] = value;
            }
            return acc;
        }, {} as any);
    }
    return obj as any;
}
// filterProperties({a: 1, bb: 2, c: {a: 1, bb: 2, 1: 3}}, "a").c;
