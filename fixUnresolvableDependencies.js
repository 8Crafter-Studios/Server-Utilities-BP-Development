import { readFileSync, writeFileSync } from "fs";
let packageLockJSONRaw = readFileSync("./package-lock.json", "utf-8");
packageLockJSONRaw = packageLockJSONRaw.replaceAll(
    /(?<="(?:peerDependencies|dependencies)":\s*\{\s*(?:"[^"]+":\s*"[^"]+",\s*)*?"@minecraft\/server":\s*")\^[0-9]+\.[0-9]+\.[0-9]+(?=")/g,
    "$& || ^2.0.0-beta.1.21.70-stable"
);
writeFileSync("./package-lock.json", packageLockJSONRaw);
