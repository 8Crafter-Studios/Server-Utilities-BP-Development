import { commands } from "../../../Main/commands_list";
export function getAllBuiltInCommandsCategories() {
    let set = new Set();
    commands
        .map((v) => v.category)
        .forEach((v) => typeof v == "string" ? set.add(v) : v.forEach((v) => set.add(v)));
    return [...set];
}
//# sourceMappingURL=getAllBuiltInCommandsCategories.js.map