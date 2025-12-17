import { readFileSync, writeFileSync } from "fs";
let packageLockJSONRaw: string = readFileSync("./package-lock.json", "utf-8");
const mcServerVersion: string | undefined = packageLockJSONRaw.match(/"@minecraft\/server": "(\^\d+\.\d+\.\d+-beta.\d+.\d+.\d+-stable)"/)?.[1];
packageLockJSONRaw = packageLockJSONRaw.replaceAll(
    /(?<="(?:peerDependencies|dependencies)":\s*\{\s*(?:"[^"]+":\s*"[^"]+",\s*)*?"@minecraft\/server":\s*")\^[0-9]+\.[0-9]+\.[0-9]+(?:\s*\|\|\s*\^[0-9]+\.[0-9]+\.[0-9]+)?(?=")/g,
    "$& || " + (mcServerVersion ?? "^2.1.0-beta.1.21.70-stable")
);
writeFileSync("./package-lock.json", packageLockJSONRaw);
