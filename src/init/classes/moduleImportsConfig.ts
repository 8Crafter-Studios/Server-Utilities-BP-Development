import {
    moduleOptionalImportPathMap,
    optionalModuleObjectImportFilePaths,
    type optionalModuleObjectImportFilePathsImportMap,
} from "../../directoryTree";
import { type Mutable } from "../types";
import { getStringFromDynamicProperties } from "modules/utilities/functions/getStringFromDynamicProperties";
import { saveStringToDynamicProperties } from "modules/utilities/functions/saveStringToDynamicProperties";
// ${se}import("modules/utilities/functions/getStringFromDynamicProperties").then(m=>dsend(m.getStringFromDynamicProperties("moduleImportsConfigData")))
type moduleImportNamesToModuleImportsConfigObjectMapper<
    valueTypes extends any
> = {
    [K in keyof Mutable<
        typeof optionalModuleObjectImportFilePaths
    > as K extends number
        ? (typeof optionalModuleObjectImportFilePaths)[K]
        : never]: valueTypes;
};
type moduleOptionalImportPathMapObjectMapper<
    module extends moduleNameForModuleImportsConfig,
    valueTypes extends any
> = {
    [K in keyof Mutable<
        (typeof moduleOptionalImportPathMap)[module]
    > as K extends number
        ? (typeof moduleOptionalImportPathMap)[module][K]
        : never]: valueTypes;
};
type moduleNameForModuleImportsConfig =
    keyof typeof moduleOptionalImportPathMap;
export const moduleNamesForModuleImportsConfigList = [
    "ban",
    "block_generation_utilities",
    "chat",
    "command_utilities",
    "commands",
    "commands_documentation",
    "commands_list",
    "coordinates",
    "errors",
    "main",
    "player_save",
    "spawn_protection",
    "ui",
    "utilities",
] as const;

export const moduleNamesForModuleImportsConfigListDisplay = [
    { name: "ban", icon: "" },
    { name: "block_generation_utilities", icon: "" },
    { name: "chat", icon: "" },
    { name: "command_utilities", icon: "" },
    { name: "commands", icon: "" },
    { name: "commands_documentation", icon: "" },
    { name: "commands_list", icon: "" },
    { name: "coordinates", icon: "" },
    { name: "errors", icon: "" },
    { name: "main", icon: "" },
    { name: "player_save", icon: "" },
    { name: "spawn_protection", icon: "" },
    { name: "ui", icon: "" },
    { name: "utilities", icon: "" },
] as const;

/**
 * A class containing configuration detailing which functions, classes, and constants from the modules to import into their respective properties on the global modules object.
 */

export class moduleImportsConfig {
    static overrideOptions = [
        "none",
        "disableAll",
        "enableAll",
        "enableAllNonDeprecated",
    ] as const;
    /**
     * @remarks overrides all other options, including overrides for specific modules
     * @todo Make the deprecated list.
     */
    static get override(): (typeof this.overrideOptions)[number] {
        const option = gwdp("moduleImportsConfig:override") as any;
        if (option == "disableAll") {
            return "disableAll";
        } else if (option == "enableAll") {
            return "enableAll";
        } else if (option == "enableAllNonDeprecated") {
            return "enableAllNonDeprecated";
        } else {
            return "none";
        }
    }
    static set override(
        option: (typeof this.overrideOptions)[number] | undefined | null
    ) {
        swdp(
            "moduleImportsConfig:override",
            [
                "none",
                "disableAll",
                "enableAll",
                "enableAllNonDeprecated",
            ].includes(option as any)
                ? option
                : "none"
        );
    }
    static get moduleOverrides() {
        return {
            get ban() {
                const option = gwdp(
                    "moduleImportsConfig:moduleOverride.ban"
                ) as any;
                if (option == "disableAll") {
                    return "disableAll";
                } else if (option == "enableAll") {
                    return "enableAll";
                } else if (option == "enableAllNonDeprecated") {
                    return "enableAllNonDeprecated";
                } else {
                    return "none";
                }
            },
            set ban(
                option:
                    | "none"
                    | "disableAll"
                    | "enableAll"
                    | "enableAllNonDeprecated"
                    | undefined
                    | null
            ) {
                swdp(
                    "moduleImportsConfig:moduleOverride.ban",
                    [
                        "none",
                        "disableAll",
                        "enableAll",
                        "enableAllNonDeprecated",
                    ].includes(option as any)
                        ? option
                        : "none"
                );
            },
            get block_generation_utilities() {
                const option = gwdp(
                    "moduleImportsConfig:moduleOverride.block_generation_utilities"
                ) as any;
                if (option == "disableAll") {
                    return "disableAll";
                } else if (option == "enableAll") {
                    return "enableAll";
                } else if (option == "enableAllNonDeprecated") {
                    return "enableAllNonDeprecated";
                } else {
                    return "none";
                }
            },
            set block_generation_utilities(
                option:
                    | "none"
                    | "disableAll"
                    | "enableAll"
                    | "enableAllNonDeprecated"
                    | undefined
                    | null
            ) {
                swdp(
                    "moduleImportsConfig:moduleOverride.block_generation_utilities",
                    [
                        "none",
                        "disableAll",
                        "enableAll",
                        "enableAllNonDeprecated",
                    ].includes(option as any)
                        ? option
                        : "none"
                );
            },
            get chat() {
                const option = gwdp(
                    "moduleImportsConfig:moduleOverride.chat"
                ) as any;
                if (option == "disableAll") {
                    return "disableAll";
                } else if (option == "enableAll") {
                    return "enableAll";
                } else if (option == "enableAllNonDeprecated") {
                    return "enableAllNonDeprecated";
                } else {
                    return "none";
                }
            },
            set chat(
                option:
                    | "none"
                    | "disableAll"
                    | "enableAll"
                    | "enableAllNonDeprecated"
                    | undefined
                    | null
            ) {
                swdp(
                    "moduleImportsConfig:moduleOverride.chat",
                    [
                        "none",
                        "disableAll",
                        "enableAll",
                        "enableAllNonDeprecated",
                    ].includes(option as any)
                        ? option
                        : "none"
                );
            },
            get command_utilities() {
                const option = gwdp(
                    "moduleImportsConfig:moduleOverride.command_utilities"
                ) as any;
                if (option == "disableAll") {
                    return "disableAll";
                } else if (option == "enableAll") {
                    return "enableAll";
                } else if (option == "enableAllNonDeprecated") {
                    return "enableAllNonDeprecated";
                } else {
                    return "none";
                }
            },
            set command_utilities(
                option:
                    | "none"
                    | "disableAll"
                    | "enableAll"
                    | "enableAllNonDeprecated"
                    | undefined
                    | null
            ) {
                swdp(
                    "moduleImportsConfig:moduleOverride.command_utilities",
                    [
                        "none",
                        "disableAll",
                        "enableAll",
                        "enableAllNonDeprecated",
                    ].includes(option as any)
                        ? option
                        : "none"
                );
            },
            get commands() {
                const option = gwdp(
                    "moduleImportsConfig:moduleOverride.commands"
                ) as any;
                if (option == "disableAll") {
                    return "disableAll";
                } else if (option == "enableAll") {
                    return "enableAll";
                } else if (option == "enableAllNonDeprecated") {
                    return "enableAllNonDeprecated";
                } else {
                    return "none";
                }
            },
            set commands(
                option:
                    | "none"
                    | "disableAll"
                    | "enableAll"
                    | "enableAllNonDeprecated"
                    | undefined
                    | null
            ) {
                swdp(
                    "moduleImportsConfig:moduleOverride.commands",
                    [
                        "none",
                        "disableAll",
                        "enableAll",
                        "enableAllNonDeprecated",
                    ].includes(option as any)
                        ? option
                        : "none"
                );
            },
            get commands_documentation() {
                const option = gwdp(
                    "moduleImportsConfig:moduleOverride.commands_documentation"
                ) as any;
                if (option == "disableAll") {
                    return "disableAll";
                } else if (option == "enableAll") {
                    return "enableAll";
                } else if (option == "enableAllNonDeprecated") {
                    return "enableAllNonDeprecated";
                } else {
                    return "none";
                }
            },
            set commands_documentation(
                option:
                    | "none"
                    | "disableAll"
                    | "enableAll"
                    | "enableAllNonDeprecated"
                    | undefined
                    | null
            ) {
                swdp(
                    "moduleImportsConfig:moduleOverride.commands_documentation",
                    [
                        "none",
                        "disableAll",
                        "enableAll",
                        "enableAllNonDeprecated",
                    ].includes(option as any)
                        ? option
                        : "none"
                );
            },
            get commands_list() {
                const option = gwdp(
                    "moduleImportsConfig:moduleOverride.commands_list"
                ) as any;
                if (option == "disableAll") {
                    return "disableAll";
                } else if (option == "enableAll") {
                    return "enableAll";
                } else if (option == "enableAllNonDeprecated") {
                    return "enableAllNonDeprecated";
                } else {
                    return "none";
                }
            },
            set commands_list(
                option:
                    | "none"
                    | "disableAll"
                    | "enableAll"
                    | "enableAllNonDeprecated"
                    | undefined
                    | null
            ) {
                swdp(
                    "moduleImportsConfig:moduleOverride.commands_list",
                    [
                        "none",
                        "disableAll",
                        "enableAll",
                        "enableAllNonDeprecated",
                    ].includes(option as any)
                        ? option
                        : "none"
                );
            },
            get coordinates() {
                const option = gwdp(
                    "moduleImportsConfig:moduleOverride.coordinates"
                ) as any;
                if (option == "disableAll") {
                    return "disableAll";
                } else if (option == "enableAll") {
                    return "enableAll";
                } else if (option == "enableAllNonDeprecated") {
                    return "enableAllNonDeprecated";
                } else {
                    return "none";
                }
            },
            set coordinates(
                option:
                    | "none"
                    | "disableAll"
                    | "enableAll"
                    | "enableAllNonDeprecated"
                    | undefined
                    | null
            ) {
                swdp(
                    "moduleImportsConfig:moduleOverride.coordinates",
                    [
                        "none",
                        "disableAll",
                        "enableAll",
                        "enableAllNonDeprecated",
                    ].includes(option as any)
                        ? option
                        : "none"
                );
            },
            get errors() {
                const option = gwdp(
                    "moduleImportsConfig:moduleOverride.errors"
                ) as any;
                if (option == "disableAll") {
                    return "disableAll";
                } else if (option == "enableAll") {
                    return "enableAll";
                } else if (option == "enableAllNonDeprecated") {
                    return "enableAllNonDeprecated";
                } else {
                    return "none";
                }
            },
            set errors(
                option:
                    | "none"
                    | "disableAll"
                    | "enableAll"
                    | "enableAllNonDeprecated"
                    | undefined
                    | null
            ) {
                swdp(
                    "moduleImportsConfig:moduleOverride.errors",
                    [
                        "none",
                        "disableAll",
                        "enableAll",
                        "enableAllNonDeprecated",
                    ].includes(option as any)
                        ? option
                        : "none"
                );
            },
            get main() {
                const option = gwdp(
                    "moduleImportsConfig:moduleOverride.main"
                ) as any;
                if (option == "disableAll") {
                    return "disableAll";
                } else if (option == "enableAll") {
                    return "enableAll";
                } else if (option == "enableAllNonDeprecated") {
                    return "enableAllNonDeprecated";
                } else {
                    return "none";
                }
            },
            set main(
                option:
                    | "none"
                    | "disableAll"
                    | "enableAll"
                    | "enableAllNonDeprecated"
                    | undefined
                    | null
            ) {
                swdp(
                    "moduleImportsConfig:moduleOverride.main",
                    [
                        "none",
                        "disableAll",
                        "enableAll",
                        "enableAllNonDeprecated",
                    ].includes(option as any)
                        ? option
                        : "none"
                );
            },
            get player_save() {
                const option = gwdp(
                    "moduleImportsConfig:moduleOverride.player_save"
                ) as any;
                if (option == "disableAll") {
                    return "disableAll";
                } else if (option == "enableAll") {
                    return "enableAll";
                } else if (option == "enableAllNonDeprecated") {
                    return "enableAllNonDeprecated";
                } else {
                    return "none";
                }
            },
            set player_save(
                option:
                    | "none"
                    | "disableAll"
                    | "enableAll"
                    | "enableAllNonDeprecated"
                    | undefined
                    | null
            ) {
                swdp(
                    "moduleImportsConfig:moduleOverride.player_save",
                    [
                        "none",
                        "disableAll",
                        "enableAll",
                        "enableAllNonDeprecated",
                    ].includes(option as any)
                        ? option
                        : "none"
                );
            },
            get spawn_protection() {
                const option = gwdp(
                    "moduleImportsConfig:moduleOverride.spawn_protection"
                ) as any;
                if (option == "disableAll") {
                    return "disableAll";
                } else if (option == "enableAll") {
                    return "enableAll";
                } else if (option == "enableAllNonDeprecated") {
                    return "enableAllNonDeprecated";
                } else {
                    return "none";
                }
            },
            set spawn_protection(
                option:
                    | "none"
                    | "disableAll"
                    | "enableAll"
                    | "enableAllNonDeprecated"
                    | undefined
                    | null
            ) {
                swdp(
                    "moduleImportsConfig:moduleOverride.spawn_protection",
                    [
                        "none",
                        "disableAll",
                        "enableAll",
                        "enableAllNonDeprecated",
                    ].includes(option as any)
                        ? option
                        : "none"
                );
            },
            get ui() {
                const option = gwdp(
                    "moduleImportsConfig:moduleOverride.ui"
                ) as any;
                if (option == "disableAll") {
                    return "disableAll";
                } else if (option == "enableAll") {
                    return "enableAll";
                } else if (option == "enableAllNonDeprecated") {
                    return "enableAllNonDeprecated";
                } else {
                    return "none";
                }
            },
            set ui(
                option:
                    | "none"
                    | "disableAll"
                    | "enableAll"
                    | "enableAllNonDeprecated"
                    | undefined
                    | null
            ) {
                swdp(
                    "moduleImportsConfig:moduleOverride.ui",
                    [
                        "none",
                        "disableAll",
                        "enableAll",
                        "enableAllNonDeprecated",
                    ].includes(option as any)
                        ? option
                        : "none"
                );
            },
            get utilities() {
                const option = gwdp(
                    "moduleImportsConfig:moduleOverride.utilities"
                ) as any;
                if (option == "disableAll") {
                    return "disableAll";
                } else if (option == "enableAll") {
                    return "enableAll";
                } else if (option == "enableAllNonDeprecated") {
                    return "enableAllNonDeprecated";
                } else {
                    return "none";
                }
            },
            set utilities(
                option:
                    | "none"
                    | "disableAll"
                    | "enableAll"
                    | "enableAllNonDeprecated"
                    | undefined
                    | null
            ) {
                swdp(
                    "moduleImportsConfig:moduleOverride.utilities",
                    [
                        "none",
                        "disableAll",
                        "enableAll",
                        "enableAllNonDeprecated",
                    ].includes(option as any)
                        ? option
                        : "none"
                );
            },
        };
    }
    static get default(): moduleImportNamesToModuleImportsConfigObjectMapper<0> {
        return Object.fromEntries(
            optionalModuleObjectImportFilePaths.map((s) => [s, 0 as 0])
        ) as moduleImportNamesToModuleImportsConfigObjectMapper<0>;
    }
    /**
     *
     * @param filePath The path of the file, should be a value in the {@link optionalModuleObjectImportFilePaths} array.
     * @returns {boolean} A boolean representing whether or not the file is deprecated.
     * @todo Make a way for it to check if the file is deprecated, besides just checking if the path contains "/deprecated/".
     */
    static isFileDeprecated(
        filePath: keyof moduleImportNamesToModuleImportsConfigObjectMapper<unknown>
    ): boolean {
        this.assertIsValidModuleImport(
            filePath,
            "[moduleImportsConfig::isFileDeprecated::Args[0]]"
        );
        if (filePath.includes("/deprecated/")) {
            return true;
        } else {
            return false;
        }
    }
    static reset(): void {
        this.setJSON(this.default);
    }
    static toJSON(): moduleImportNamesToModuleImportsConfigObjectMapper<0 | 1> {
        return Object.assign(this.default, Object.fromEntries(Object.entries(JSON.parse(
            getStringFromDynamicProperties("moduleImportsConfigData", "null")
        ) ?? {}).filter((f) => optionalModuleObjectImportFilePaths.includes(f[0] as any)))) as moduleImportNamesToModuleImportsConfigObjectMapper<
            0 | 1
        >;
    }
    static toJSON_module(
        module: moduleNameForModuleImportsConfig
    ): Partial<moduleImportNamesToModuleImportsConfigObjectMapper<0 | 1>> {
        let string = getStringFromDynamicProperties("moduleImportsConfigData");
        return Object.assign(Object.fromEntries(moduleOptionalImportPathMap[module].map(v=>[v, 0])), Object.fromEntries(
            (
                Object.entries(
                    JSON.parse(
                        string == "" ? JSON.stringify(this.default) : string
                    ) as moduleImportNamesToModuleImportsConfigObjectMapper<
                        0 | 1
                    >
                ) as [
                    keyof moduleImportNamesToModuleImportsConfigObjectMapper<
                        0 | 1
                    >,
                    0 | 1
                ][]
            ).filter((f) => f[0].startsWith(`BP/scripts/modules/${module}/`) && moduleOptionalImportPathMap[module].includes(f[0] as never))
        )) as Partial<moduleImportNamesToModuleImportsConfigObjectMapper<0 | 1>>;
    }
    static setJSON(
        json: moduleImportNamesToModuleImportsConfigObjectMapper<0 | 1>
    ): void {
        saveStringToDynamicProperties(
            JSON.stringify(json),
            "moduleImportsConfigData"
        );
    }
    static get(
        filePath: keyof moduleImportNamesToModuleImportsConfigObjectMapper<unknown>
    ) {
        this.assertIsValidModuleImport(
            filePath,
            "[moduleImportsConfig::get::Args[0]]"
        );
        return this.toJSON()[filePath].toBoolean();
    }
    static set(
        filePath: keyof moduleImportNamesToModuleImportsConfigObjectMapper<unknown>,
        enabled: "0" | "1" | boolean | 0 | 1 = 0
    ): asserts enabled is "0" | "1" | boolean | 0 | 1 {
        if (![0, 1].includes(enabled.toNumber())) {
            throw new SyntaxError(
                `[moduleImportsConfig::set::Args[0]]: Expected a boolean, 0, or 1, but got ${JSON.stringify(
                    enabled
                )} instead.`
            );
        }
        this.assertIsValidModuleImport(
            filePath,
            "[moduleImportsConfig::set::Args[0]]"
        );
        return this.setJSON(
            Object.assign(this.toJSON(), { [filePath]: enabled.toNumber() })
        );
    }
    static enableAll(): void {
        return this.setJSON(
            Object.fromEntries(
                Object.entries(this.toJSON()).map((s) => [s[0], 1])
            ) as any
        );
    }
    static enableAllDeprecated(): void {
        return this.setJSON(
            Object.fromEntries(
                Object.entries(this.toJSON()).map((s) => [
                    s[0],
                    this.isFileDeprecated(s[0] as any) ? 1 : s[1],
                ])
            ) as any
        );
    }
    static enableAllNonDeprecated(): void {
        return this.setJSON(
            Object.fromEntries(
                Object.entries(this.toJSON()).map((s) => [
                    s[0],
                    this.isFileDeprecated(s[0] as any) ? s[1] : 1,
                ])
            ) as any
        );
    }
    static disableAll(): void {
        return this.setJSON(
            Object.fromEntries(
                Object.entries(this.toJSON()).map((s) => [s[0], 0])
            ) as any
        );
    }
    static disableAllDeprecated(): void {
        return this.setJSON(
            Object.fromEntries(
                Object.entries(this.toJSON()).map((s) => [
                    s[0],
                    this.isFileDeprecated(s[0] as any) ? 0 : s[1],
                ])
            ) as any
        );
    }
    static disableAllNonDeprecated(): void {
        return this.setJSON(
            Object.fromEntries(
                Object.entries(this.toJSON()).map((s) => [
                    s[0],
                    this.isFileDeprecated(s[0] as any) ? s[1] : 0,
                ])
            ) as any
        );
    }
    static assertIsValidModuleImport(
        filePath: string,
        argIndex?: string
    ): asserts filePath is keyof moduleImportNamesToModuleImportsConfigObjectMapper<unknown> {
        if (!optionalModuleObjectImportFilePaths.includes(filePath as any)) {
            throw new SyntaxError(
                `${!!argIndex ? argIndex + ": " : ""}${JSON.stringify(
                    filePath
                )} is not a valid module object import file path.`
            );
        }
    }
    static async forceImport<M extends moduleNameForModuleImportsConfig>(
        module: M
    ): Promise<{
        [K in keyof moduleOptionalImportPathMapObjectMapper<M, unknown> &
            keyof optionalModuleObjectImportFilePathsImportMap]?: optionalModuleObjectImportFilePathsImportMap[K];
    }> {
        return Object.fromEntries(
            await Object.entries(this.toJSON_module(module)).mapAsync(
                async function importFile(v) {
                    return [v[0], await import(v[0].slice(11))] as [
                        keyof moduleOptionalImportPathMapObjectMapper<
                            M,
                            unknown
                        > &
                            keyof optionalModuleObjectImportFilePathsImportMap,
                        optionalModuleObjectImportFilePathsImportMap[keyof moduleOptionalImportPathMapObjectMapper<
                            M,
                            unknown
                        > &
                            keyof optionalModuleObjectImportFilePathsImportMap]
                    ][];
                }
            )
        );
    }
    static async import<M extends moduleNameForModuleImportsConfig>(
        module: M
    ): Promise<
        Partial<
            UnionToIntersection<
                optionalModuleObjectImportFilePathsImportMap[(typeof moduleOptionalImportPathMap)[M][number]]
            >
        >
    > {
        switch (true) {
            case this.override == "none" &&
                this.moduleOverrides[module] == "none":
                return Object.fromEntries(
                    (
                        await Object.entries(this.toJSON_module(module))
                            .filter((v) => v[1].toBoolean())
                            .mapAsync(async function importFile(v) {
                                return Object.entries(
                                    await import(v[0].slice(11))
                                );
                            })
                    ).flat()
                ) as UnionToIntersection<
                    optionalModuleObjectImportFilePathsImportMap[(typeof moduleOptionalImportPathMap)[M][number]]
                >;
                break;
            case this.override == "none" &&
                this.moduleOverrides[module] == "disableAll":
            case this.override == "disableAll":
                return {} as UnionToIntersection<
                    optionalModuleObjectImportFilePathsImportMap[(typeof moduleOptionalImportPathMap)[M][number]]
                >;
                break;
            case this.override == "none" &&
                this.moduleOverrides[module] == "enableAll":
            case this.override == "enableAll":
                return Object.fromEntries(
                    (
                        await Object.entries(
                            this.toJSON_module(module)
                        ).mapAsync(async function importFile(v) {
                            return Object.entries(await import(v[0].slice(11)));
                        })
                    ).flat()
                ) as UnionToIntersection<
                    optionalModuleObjectImportFilePathsImportMap[(typeof moduleOptionalImportPathMap)[M][number]]
                >;
                break;
            case this.override == "none" &&
                this.moduleOverrides[module] == "enableAllNonDeprecated":
            case this.override == "enableAllNonDeprecated":
                return Object.fromEntries(
                    (
                        await Object.entries(this.toJSON_module(module))
                            .filter((v) => !this.isFileDeprecated(v[0] as any))
                            .mapAsync(async function importFile(v) {
                                return Object.entries(
                                    await import(v[0].slice(11))
                                );
                            })
                    ).flat()
                ) as UnionToIntersection<
                    optionalModuleObjectImportFilePathsImportMap[(typeof moduleOptionalImportPathMap)[M][number]]
                >;
                break;
            default:
                // #Error Code: 0x1000;
                throw new InternalError(
                    "Something went wrong and the switch case for [moduleImportsConfig::import] has reached an unreachable state. Please notify 8Crafter of this error, you can do this through 8Crafter's discord server or email. Make sure to include the following error code: 0x1000"
                );
                break;
        }
    }
    static async importSeparatedIntoPaths<
        M extends moduleNameForModuleImportsConfig
    >(
        module: M
    ): Promise<{
        [K in keyof moduleOptionalImportPathMapObjectMapper<M, unknown> &
            keyof optionalModuleObjectImportFilePathsImportMap]?: optionalModuleObjectImportFilePathsImportMap[K];
    }> {
        switch (true) {
            case this.override == "none" &&
                this.moduleOverrides[module] == "none":
                return Object.fromEntries(
                    await Object.entries(this.toJSON_module(module))
                        .filter((v) => v[1].toBoolean())
                        .mapAsync(async function importFile(v) {
                            return [
                                v[0],
                                await import(v[0].slice(11)),
                            ] as [keyof moduleOptionalImportPathMapObjectMapper<M, unknown> & keyof optionalModuleObjectImportFilePathsImportMap, optionalModuleObjectImportFilePathsImportMap[keyof moduleOptionalImportPathMapObjectMapper<M, unknown> & keyof optionalModuleObjectImportFilePathsImportMap]][];
                        })
                );
                break;
            case this.override == "none" &&
                this.moduleOverrides[module] == "disableAll":
            case this.override == "disableAll":
                return {};
                break;
            case this.override == "none" &&
                this.moduleOverrides[module] == "enableAll":
            case this.override == "enableAll":
                return Object.fromEntries(
                    await Object.entries(this.toJSON_module(module)).mapAsync(
                        async function importFile(v) {
                            return [v[0], await import(v[0].slice(11))] as [
                                keyof moduleOptionalImportPathMapObjectMapper<
                                    M,
                                    unknown
                                > &
                                    keyof optionalModuleObjectImportFilePathsImportMap,
                                optionalModuleObjectImportFilePathsImportMap[keyof moduleOptionalImportPathMapObjectMapper<
                                    M,
                                    unknown
                                > &
                                    keyof optionalModuleObjectImportFilePathsImportMap]
                            ][];
                        }
                    )
                );
                break;
            case this.override == "none" &&
                this.moduleOverrides[module] == "enableAllNonDeprecated":
            case this.override == "enableAllNonDeprecated":
                return Object.fromEntries(
                    await Object.entries(this.toJSON_module(module))
                        .filter((v) => this.isFileDeprecated(v[0] as any))
                        .mapAsync(async function importFile(v) {
                            return [
                                v[0],
                                await import(v[0].slice(11)),
                            ] as [keyof moduleOptionalImportPathMapObjectMapper<M, unknown> & keyof optionalModuleObjectImportFilePathsImportMap, optionalModuleObjectImportFilePathsImportMap[keyof moduleOptionalImportPathMapObjectMapper<M, unknown> & keyof optionalModuleObjectImportFilePathsImportMap]][];
                        })
                );
                break;
            default:
                // #Error Code: 0x1000;
                throw new InternalError(
                    "Something went wrong and the switch case for [moduleImportsConfig::import] has reached an unreachable state. Please notify 8Crafter of this error, you can do this through 8Crafter's discord server or email. Make sure to include the following error code: 0x1000"
                );
                break;
        }
    }
}
/*
// asserts operator test
let a: any = 2
a
moduleImportsConfig.set("a", a)
a
 */
Object.defineProperties(globalThis, {
    moduleImportsConfig: {
        value: moduleImportsConfig,
        configurable: true,
        enumerable: true,
        writable: false,
    },
});
// await moduleImportsConfig.import("command_utilities");

/* let a: {[key in typeof moduleOptionalImportPathMap["ban"][number]]: optionalModuleObjectImportFilePathsImportMap[key]}
let b: UnionToIntersection<optionalModuleObjectImportFilePathsImportMap[typeof moduleOptionalImportPathMap["ban"][number]]>
a
b */
