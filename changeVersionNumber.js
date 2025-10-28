import { existsSync, readFileSync, writeFileSync } from "fs";
import JSON5 from "json5";
import promptSync from "prompt-sync";

const prompt = promptSync({ sigint: true });

const args = process.argv.slice(2);

if (args.length === 0) {
    throw new SyntaxError("No arguments provided. Use the --help or -h option to see the usage.");
}

if (args.includes("--help") || args.includes("-h")) {
    console.log(`Usage: node changeVersionNumber.js [options]

Options:
--mcversion=<mcversion>, -m=<mcversion>     Specify the new Minecraft version to use.
--mcversionprompt, -mp                  Prompt for the new Minecraft version to use.
--version=<version>, -v=<version>       Specify the new version to use.
--versionprompt, -vp                    Prompt for the new version to use.
--help, -h                              Show this help message.

Paramters:
<mcversion>                             The new Minecraft version to use. Must match the following regex: /^([0-9]+x?|x)\\.([0-9]+x?|x)\\.([0-9]+x?|x)(-[^+]*?)?(\\+\\.*?)?\\+?$/.
<version>                               The new version to use. Must be a valid semver string, the "v" at the beginning is optional.`);
    process.exit(0);
}

let manifestRaw = readFileSync("./manifest.json", "utf-8");

/**
 * @type {import("./manifest.json")}
 */
const manifest = JSON5.parse(manifestRaw);

const originalVersion = manifest.header.version;

const originalMCVersion = manifest.header.name.match(
    /(?<=\(for minecraft bedrock edition )([0-9]+x?|x)\.([0-9]+x?|x)\.([0-9]+x?|x)(\+?|(-[^+]*?)?(\+.*?)?\+?)(?=\))/
)?.[0];

let newMCVersion = "";

if (originalMCVersion === undefined) {
    console.error("\u001B[38;2;255;0;0mCould not find original Minecraft version. Exiting...\u001B[0m");
    process.exit(1);
}

if (args.some((arg) => arg.startsWith("--mcversion="))) {
    newMCVersion =
        args
            .find((arg) => arg.startsWith("--mcversion="))
            ?.replace(/^--mcversion="?v?/, "")
            .replace(/"?$/, "") ?? "";

    if (newMCVersion === "") {
        console.error("\u001B[38;2;255;0;0mNo new supported Minecraft version provided.\u001B[0m");
        process.exit(1);
    }
} else if (args.some((arg) => arg.startsWith("-m="))) {
    newMCVersion =
        args
            .find((arg) => arg.startsWith("-m="))
            ?.replace(/^-m="?v?/, "")
            .replace(/"?$/, "") ?? "";

    if (newMCVersion === "") {
        console.error("\u001B[38;2;255;0;0mNo new supported Minecraft version provided.\u001B[0m");
        process.exit(1);
    }
} else if (args.some((arg) => arg === "-mp") || args.some((arg) => arg === "--mcversionprompt")) {
    newMCVersion =
        prompt("\u001B[38;2;0;255;255mEnter new supported Minecraft version: \u001B[38;2;0;255;128m")
            ?.replace(/^-m="?v?/, "")
            .replace(/"?$/, "") ?? "";

    if (newMCVersion === "") {
        console.error("\u001B[38;2;255;0;0mNo new supported Minecraft version provided.\u001B[0m");
        process.exit(1);
    }
}

if (newMCVersion !== "" && !/^([0-9]+x?|x)\.([0-9]+x?|x)\.([0-9]+x?|x)(\+?|(-[^+]*?)?(\+.*?)?\+?)$/.test(newMCVersion)) {
    console.error("Invalid new supported Minecraft version: \u001B[38;2;0;255;128mv" + newMCVersion);
    process.exit(1);
}

let newVersion = "";

if (args.some((arg) => arg.startsWith("--version="))) {
    newVersion =
        args
            .find((arg) => arg.startsWith("--version="))
            ?.replace(/^--version="?v?/, "")
            .replace(/"?$/, "") ?? "";

    if (newVersion === "") {
        console.error("\u001B[38;2;255;0;0mNo new version number provided.\u001B[0m");
        process.exit(1);
    }
} else if (args.some((arg) => arg.startsWith("-v="))) {
    newVersion =
        args
            .find((arg) => arg.startsWith("-v="))
            ?.replace(/^-v="?v?/, "")
            .replace(/"?$/, "") ?? "";

    if (newVersion === "") {
        console.error("\u001B[38;2;255;0;0mNo new version number provided.\u001B[0m");
        process.exit(1);
    }
} else if (args.some((arg) => arg === "-vp") || args.some((arg) => arg === "--versionprompt")) {
    newVersion = prompt("\u001B[38;2;0;255;255mEnter new version number: \u001B[38;2;0;255;128m").replace(/^v/, "");

    if (newVersion === "") {
        console.error("\u001B[38;2;255;0;0mNo new version number provided.\u001B[0m");
        process.exit(1);
    }
}

if (newVersion === originalVersion && newMCVersion === originalMCVersion) {
    console.error(
        "\u001B[38;2;255;0;0mBoth the new version number and the new supported Minecraft version number are the same as the original version numbers. Exiting...\u001B[0m"
    );
    process.exit(1);
}

if (newVersion === originalVersion && newMCVersion === "") {
    console.error(
        "\u001B[38;2;255;0;0mNew version number is the same as the original version number and new supported Minecraft version number is not provided. Exiting...\u001B[0m"
    );
    process.exit(1);
}

if (newVersion === "" && newMCVersion === originalMCVersion) {
    console.error(
        "\u001B[38;2;255;0;0mNew supported Minecraft version number is the same as the original supported Minecraft version number and new version number is not provided. Exiting...\u001B[0m"
    );
    process.exit(1);
}

if (newVersion === originalVersion) {
    console.warn(
        "\u001B[38;2;255;255;0mWARNING: New version number is the same as the original version number. This version number will not be changed.\u001B[0m"
    );
}

if (newMCVersion === originalMCVersion) {
    console.warn(
        "\u001B[38;2;255;255;0mWARNING: New supported Minecraft version number is the same as the original supported Minecraft version number. This supported Minecraft version number will not be changed.\u001B[0m"
    );
}

if (newVersion === "" && newMCVersion === "") {
    console.error("\u001B[38;2;255;0;0mNo new version number or supported Minecraft version number provided. Exiting...\u001B[0m");
    process.exit(1);
}

if (newVersion !== "" && !/^[0-9]+\.[0-9]+\.[0-9]+(-[^+]*)?(\+.*)?$/.test(newVersion)) {
    console.error("\u001B[38;2;255;0;0mSyntax Error: Invalid new version number: \u001B[38;2;0;255;128mv" + newVersion + "\u001B[0m");
    process.exit(1);
}

let packageJSONRaw = readFileSync("./package.json", "utf-8");
let packageLockJSONRaw = readFileSync("./package-lock.json", "utf-8");
let packageLockJSONNodeModulesRaw = readFileSync("./node_modules/.package-lock.json", "utf-8");
let rawInitializeMainGlobalVariablesFileTS = readFileSync("./src/initializeMainGlobalVariables.ts", "utf-8");
let rawInitializeMainGlobalVariablesFileJS = readFileSync("./scripts/initializeMainGlobalVariables.js", "utf-8");
let rawInitializeMainGlobalVariablesFileDTS = readFileSync("./scripts/initializeMainGlobalVariables.d.ts", "utf-8");
let packageJSONEditorEditionRaw = existsSync("../BP Editor Edition/package.json") ? readFileSync("../BP Editor Edition/package.json", "utf-8") : undefined;
let packageLockEditorEditionJSONRaw = existsSync("../BP Editor Edition/package-lock.json")
    ? readFileSync("../BP Editor Edition/package-lock.json", "utf-8")
    : undefined;
let manifestEditorEditionRaw = existsSync("../BP Editor Edition/manifest.json") ? readFileSync("../BP Editor Edition/manifest.json", "utf-8") : undefined;

if (newVersion !== "") {
    if (!packageJSONRaw.includes('"version": "' + originalVersion + '"')) {
        console.warn(
            `\u001B[38;2;255;255;0mWARNING: ./package.json does not contain the original version number: \u001B[38;2;0;255;128mv${originalVersion}\u001B[38;2;255;255;0m. Detected Version: \u001B[38;2;0;255;128mv${
                packageJSONRaw.match(/(?<="version": ")[0-9]+\.[0-9]+\.[0-9]+(-[^+]*?)?(\+.*?)?(?=")/)?.[0] ?? "\u001B[38;2;255;0;0mNot Found"
            }\u001B[38;2;255;255;0m.`
        );
    }
    if (!packageLockJSONRaw.includes('"version": "' + originalVersion + '"')) {
        console.warn(
            `\u001B[38;2;255;255;0mWARNING: ./package-lock.json does not contain the original version number: \u001B[38;2;0;255;128mv${originalVersion}\u001B[38;2;255;255;0m. Detected Version: \u001B[38;2;0;255;128mv${
                packageLockJSONRaw.match(/(?<="version": ")[0-9]+\.[0-9]+\.[0-9]+(-[^+]*?)?(\+.*?)?(?=")/)?.[0] ?? "\u001B[38;2;255;0;0mNot Found"
            }\u001B[38;2;255;255;0m.`
        );
    }
    if (packageJSONEditorEditionRaw !== undefined && !packageJSONRaw.includes('"version": "' + originalVersion + '"')) {
        console.warn(
            `\u001B[38;2;255;255;0mWARNING: ./package.json does not contain the original version number: \u001B[38;2;0;255;128mv${originalVersion}\u001B[38;2;255;255;0m. Detected Version: \u001B[38;2;0;255;128mv${
                packageJSONRaw.match(/(?<="version": ")[0-9]+\.[0-9]+\.[0-9]+(-[^+]*?)?(\+.*?)?(?=")/)?.[0] ?? "\u001B[38;2;255;0;0mNot Found"
            }\u001B[38;2;255;255;0m.`
        );
    }
    if (packageLockEditorEditionJSONRaw !== undefined && !packageLockJSONRaw.includes('"version": "' + originalVersion + '"')) {
        console.warn(
            `\u001B[38;2;255;255;0mWARNING: ./package-lock.json does not contain the original version number: \u001B[38;2;0;255;128mv${originalVersion}\u001B[38;2;255;255;0m. Detected Version: \u001B[38;2;0;255;128mv${
                packageLockJSONRaw.match(/(?<="version": ")[0-9]+\.[0-9]+\.[0-9]+(-[^+]*?)?(\+.*?)?(?=")/)?.[0] ?? "\u001B[38;2;255;0;0mNot Found"
            }\u001B[38;2;255;255;0m.`
        );
    }
    if (!packageLockJSONNodeModulesRaw.includes('"version": "' + originalVersion + '"')) {
        console.warn(
            `\u001B[38;2;255;255;0mWARNING: ./node_modules/.package-lock.json does not contain the original version number: \u001B[38;2;0;255;128mv${originalVersion}\u001B[38;2;255;255;0m. Detected Version: \u001B[38;2;0;255;128mv${
                packageLockJSONNodeModulesRaw.match(/(?<="version": ")[0-9]+\.[0-9]+\.[0-9]+(-[^+]*?)?(\+.*?)?(?=")/)?.[0] ?? "\u001B[38;2;255;0;0mNot Found"
            }\u001B[38;2;255;255;0m.\u001B[0m`
        );
    }
    if (!rawInitializeMainGlobalVariablesFileTS.includes('export const current_format_version = "' + originalVersion + '";')) {
        console.warn(
            `\u001B[38;2;255;255;0mWARNING: ./src/initializeMainGlobalVariables.ts does not contain the original version number: \u001B[38;2;0;255;128mv${originalVersion}\u001B[38;2;255;255;0m. Detected Version: \u001B[38;2;0;255;128mv${
                rawInitializeMainGlobalVariablesFileTS.match(
                    /(?<=export const current_format_version = ")[0-9]+\.[0-9]+\.[0-9]+(-[^+]*?)?(\+.*?)?(?=";)/
                )?.[0] ?? "\u001B[38;2;255;0;0mNot Found"
            }\u001B[38;2;255;255;0m.\u001B[0m`
        );
    }
    if (!rawInitializeMainGlobalVariablesFileJS.includes('mainGlobalVariables.current_format_version = "' + originalVersion + '";')) {
        console.warn(
            `\u001B[38;2;255;255;0mWARNING: ./scripts/initializeMainGlobalVariables.js does not contain the original version number: \u001B[38;2;0;255;128mv${originalVersion}\u001B[38;2;255;255;0m. Detected Version: \u001B[38;2;0;255;128mv${
                rawInitializeMainGlobalVariablesFileJS.match(
                    /(?<=mainGlobalVariables.current_format_version = ")[0-9]+\.[0-9]+\.[0-9]+(-[^+]*?)?(\+.*?)?(?=";)/
                )?.[0] ?? "\u001B[38;2;255;0;0mNot Found"
            }\u001B[38;2;255;255;0m.\u001B[0m`
        );
    }
    if (!rawInitializeMainGlobalVariablesFileDTS.includes('const current_format_version = "' + originalVersion + '";')) {
        console.warn(
            `\u001B[38;2;255;255;0mWARNING: ./scripts/initializeMainGlobalVariables.d.ts does not contain the original version number: \u001B[38;2;0;255;128mv${originalVersion}\u001B[38;2;255;255;0m. Detected Version: \u001B[38;2;0;255;128mv${
                rawInitializeMainGlobalVariablesFileDTS.match(/(?<=const current_format_version = ")[0-9]+\.[0-9]+\.[0-9]+(-[^+]*?)?(\+.*?)?(?=";)/)?.[0] ??
                "\u001B[38;2;255;0;0mNot Found"
            }\u001B[38;2;255;255;0m.\u001B[0m`
        );
    }

    manifestRaw = manifestRaw.replaceAll(originalVersion, newVersion);
    packageJSONRaw = packageJSONRaw.replace('"version": "' + originalVersion + '"', '"version": "' + newVersion + '"');
    packageLockJSONRaw = packageLockJSONRaw.replace('"version": "' + originalVersion + '"', '"version": "' + newVersion + '"');
    if (packageJSONEditorEditionRaw !== undefined)
        packageJSONEditorEditionRaw = packageJSONEditorEditionRaw.replace('"version": "' + originalVersion + '"', '"version": "' + newVersion + '"');
    if (packageLockEditorEditionJSONRaw !== undefined)
        packageLockEditorEditionJSONRaw = packageLockEditorEditionJSONRaw.replace('"version": "' + originalVersion + '"', '"version": "' + newVersion + '"');
    if (manifestEditorEditionRaw !== undefined) manifestEditorEditionRaw = manifestEditorEditionRaw.replaceAll(originalVersion, newVersion);
    packageLockJSONNodeModulesRaw = packageLockJSONNodeModulesRaw.replace('"version": "' + originalVersion + '"', '"version": "' + newVersion + '"');
    rawInitializeMainGlobalVariablesFileTS = rawInitializeMainGlobalVariablesFileTS.replace(
        'export const current_format_version = "' + originalVersion + '";',
        'export const current_format_version = "' + newVersion + '";'
    );
    rawInitializeMainGlobalVariablesFileJS = rawInitializeMainGlobalVariablesFileJS.replace(
        'mainGlobalVariables.current_format_version = "' + originalVersion + '";',
        'mainGlobalVariables.current_format_version = "' + newVersion + '";'
    );
    rawInitializeMainGlobalVariablesFileDTS = rawInitializeMainGlobalVariablesFileDTS.replace(
        'const current_format_version = "' + originalVersion + '";',
        'const current_format_version = "' + newVersion + '";'
    );
}

if (newMCVersion !== "") {
    if (!rawInitializeMainGlobalVariablesFileTS.includes('export const current_supported_minecraft_version = "' + originalMCVersion + '";')) {
        console.warn(
            `\u001B[38;2;255;255;0mWARNING: ./src/initializeMainGlobalVariables.ts does not contain the original supported Minecraft version number: \u001B[38;2;0;255;128mv${originalMCVersion}\u001B[38;2;255;255;0m. Detected Version: \u001B[38;2;0;255;128m${
                rawInitializeMainGlobalVariablesFileTS.match(
                    /(?<=export const current_supported_minecraft_version = ")([0-9]+x?|x)\.([0-9]+x?|x)\.([0-9]+x?|x)(\+?|(-[^+]*?)?(\+.*?)?\+?)(?=";)/
                )?.[0] ?? "\u001B[38;2;255;0;0mNot Found"
            }\u001B[38;2;255;255;0m.\u001B[0m`
        );
    }
    if (!rawInitializeMainGlobalVariablesFileJS.includes('mainGlobalVariables.current_supported_minecraft_version = "' + originalMCVersion + '";')) {
        console.warn(
            `\u001B[38;2;255;255;0mWARNING: ./scripts/initializeMainGlobalVariables.js does not contain the original supported Minecraft version number: \u001B[38;2;0;255;128mv${originalMCVersion}\u001B[38;2;255;255;0m. Detected Version: \u001B[38;2;0;255;128m${
                rawInitializeMainGlobalVariablesFileJS.match(
                    /(?<=mainGlobaLVariables.current_supported_minecraft_version = ")([0-9]+x?|x)\.([0-9]+x?|x)\.([0-9]+x?|x)(\+?|(-[^+]*?)?(\+.*?)?\+?)(?=";)/
                )?.[0] ?? "\u001B[38;2;255;0;0mNot Found"
            }\u001B[38;2;255;255;0m.\u001B[0m`
        );
    }
    if (!rawInitializeMainGlobalVariablesFileDTS.includes('const current_supported_minecraft_version = "' + originalMCVersion + '";')) {
        console.warn(
            `\u001B[38;2;255;255;0mWARNING: ./scripts/initializeMainGlobalVariables.d.ts does not contain the original supported Minecraft version number: \u001B[38;2;0;255;128mv${originalMCVersion}\u001B[38;2;255;255;0m. Detected Version: \u001B[38;2;0;255;128m${
                rawInitializeMainGlobalVariablesFileDTS.match(
                    /(?<=const current_supported_minecraft_version = ")([0-9]+x?|x)\.([0-9]+x?|x)\.([0-9]+x?|x)(\+?|(-[^+]*?)?(\+.*?)?\+?)(?=";)/
                )?.[0] ?? "\u001B[38;2;255;0;0mNot Found"
            }\u001B[38;2;255;255;0m.\u001B[0m`
        );
    }

    manifestRaw = manifestRaw.replaceAll("(for minecraft bedrock edition " + originalMCVersion + ")", "(for minecraft bedrock edition " + newMCVersion + ")");
    if (manifestEditorEditionRaw !== undefined)
        manifestEditorEditionRaw = manifestEditorEditionRaw.replaceAll(
            "(for minecraft bedrock edition " + originalMCVersion + ")",
            "(for minecraft bedrock edition " + newMCVersion + ")"
        );
    rawInitializeMainGlobalVariablesFileTS = rawInitializeMainGlobalVariablesFileTS.replace(
        'export const current_supported_minecraft_version = "' + originalMCVersion + '";',
        'export const current_supported_minecraft_version = "' + newMCVersion + '";'
    );
    rawInitializeMainGlobalVariablesFileJS = rawInitializeMainGlobalVariablesFileJS.replace(
        'mainGlobalVariables.current_supported_minecraft_version = "' + originalMCVersion + '";',
        'mainGlobalVariables.current_supported_minecraft_version = "' + newMCVersion + '";'
    );
    rawInitializeMainGlobalVariablesFileDTS = rawInitializeMainGlobalVariablesFileDTS.replace(
        'const current_supported_minecraft_version = "' + originalMCVersion + '";',
        'const current_supported_minecraft_version = "' + newMCVersion + '";'
    );
}

writeFileSync("./manifest.json", manifestRaw);
writeFileSync("./package.json", packageJSONRaw);
writeFileSync("./package-lock.json", packageLockJSONRaw);
writeFileSync("./node_modules/.package-lock.json", packageLockJSONNodeModulesRaw);
writeFileSync("./src/initializeMainGlobalVariables.ts", rawInitializeMainGlobalVariablesFileTS);
writeFileSync("./scripts/initializeMainGlobalVariables.js", rawInitializeMainGlobalVariablesFileJS);
writeFileSync("./scripts/initializeMainGlobalVariables.d.ts", rawInitializeMainGlobalVariablesFileDTS);
if (packageJSONEditorEditionRaw !== undefined) writeFileSync("../BP Editor Edition/package.json", packageJSONEditorEditionRaw);
if (packageLockEditorEditionJSONRaw !== undefined) writeFileSync("../BP Editor Edition/package-lock.json", packageLockEditorEditionJSONRaw);
if (manifestEditorEditionRaw !== undefined) writeFileSync("../BP Editor Edition/manifest.json", manifestEditorEditionRaw);

console.log(
    `\u001B[38;2;0;255;0m${
        newVersion !== "" && newVersion !== originalVersion
            ? `Successfully changed version number from \u001B[38;2;255;0;0mv${originalVersion}\u001B[38;2;0;255;0m to \u001B[38;2;0;255;255mv${newVersion}\u001B[38;2;0;255;0m. `
            : ""
    }${
        newMCVersion !== "" && newMCVersion !== originalMCVersion
            ? `Successfully changed supported Minecraft version number from \u001B[38;2;255;0;0mv${originalMCVersion}\u001B[38;2;0;255;0m to \u001B[38;2;0;255;255mv${newMCVersion}\u001B[38;2;0;255;0m.`
            : ""
    }\u001B[0m`
);
