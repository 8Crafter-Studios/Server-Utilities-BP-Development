import { Player, type Entity } from "@minecraft/server";
import { ProtectedAreas, type AdvancedProtectedAreaCategory } from "init/variables/protectedAreaVariables";
import { executeCommandPlayerW } from "modules/commands/classes/executeCommandPlayerW";
export declare function editCustomAreaCategory(sourceEntitya: Entity | executeCommandPlayerW | Player, categoryID: (typeof ProtectedAreas)["areas"]["advancedAreaCategories"][number]["id"]): Promise<0 | 1>;
export declare function editCustomAreaCategorySettings(sourceEntitya: Entity | executeCommandPlayerW | Player, categoryID: (typeof ProtectedAreas)["areas"]["advancedAreaCategories"][number]["id"]): Promise<0 | 1>;
export declare function editCustomAreaCategorySetting(sourceEntitya: Entity | executeCommandPlayerW | Player, categoryID: (typeof ProtectedAreas)["areas"]["advancedAreaCategories"][number]["id"], setting: Exclude<keyof AdvancedProtectedAreaCategory, "icon_path" | "id" | "enabled">): Promise<0 | 1>;
