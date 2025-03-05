import { Player } from "@minecraft/server";
import { ProtectedAreas } from "init/variables/protectedAreaVariables";
/**
 *
 * @todo Make this menu have pages.
 * @param player
 * @param prefix
 * @returns
 */
export declare function editAreasForCustomCategory(player: Player, prefix: (typeof ProtectedAreas)["areas"]["advancedAreaCategories"][number]["id"]): Promise<0 | 1>;
