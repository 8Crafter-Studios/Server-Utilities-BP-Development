import { Player, type Entity } from "@minecraft/server";
import { ProtectedAreas, type AdvancedProtectedAreaCategory } from "init/variables/protectedAreaVariables";
import { executeCommandPlayerW } from "modules/commands/classes/executeCommandPlayerW";
export declare function editCustomAreaCategory(sourceEntitya: Entity | executeCommandPlayerW | Player, categoryID: (typeof ProtectedAreas)["areas"]["advancedAreaCategories"][number]["id"]): Promise<0 | 1>;
/**
 * Duplicates a custom protected area category.
 * @param sourceEntitya The source entity, which can be an instance of `Entity`, `executeCommandPlayerW`, or `Player`.
 * @param categoryID The ID of the category to duplicate.
 * @returns A promise that resolves to 0 if the previous menu should be closed, 1 if the prvious menu should be reopened, or 2 if the menu before the previous menu should be reopened.
 *
 * The function performs the following steps:
 * 1. Validates the number of arguments and the type of the source entity.
 * 2. Checks if the player has the necessary permissions to create a custom protected area category.
 * 3. Checks if the category with the provided ID exists.
 * 4. Asks the player for a name for the new category.
 * 5. Duplicates the category with the provided ID.
 * 6. Calls `editCustomAreaCategory` to allow further editing of the newly created category.
 */
export declare function duplicateCustomAreaCategory(sourceEntitya: Entity | executeCommandPlayerW | Player, categoryID: (typeof ProtectedAreas)["areas"]["advancedAreaCategories"][number]["id"]): Promise<0 | 1 | 2>;
export declare function editCustomAreaCategorySettings(sourceEntitya: Entity | executeCommandPlayerW | Player, categoryID: (typeof ProtectedAreas)["areas"]["advancedAreaCategories"][number]["id"]): Promise<0 | 1>;
export declare function editCustomAreaCategorySetting(sourceEntitya: Entity | executeCommandPlayerW | Player, categoryID: (typeof ProtectedAreas)["areas"]["advancedAreaCategories"][number]["id"], setting: Exclude<keyof AdvancedProtectedAreaCategory, "icon_path" | "id" | "enabled">): Promise<0 | 1>;
