import type { Player, Vector3 } from "@minecraft/server";
import { ModalFormData, ModalFormResponse } from "@minecraft/server-ui";

/**
 * Imports add-on data by displaying a modal form with the data to the given player.
 *
 * @param player - The player who is opening the UI.
 * @returns A promise that resolves when the modal form is submitted.
 */
export async function importAddOnData(player: Player): Promise<1> {
    const r = await new ModalFormData().title("Import Add-on Data")
        .textField(
            `Data`,
            "Data"
        )
        .submitButton("Done")
        .forceShow(player);
    if(r.canceled) return 1;
    const data = JSON.parse(r.formValues?.[0] as string);
    Object.entries(data).forEach(([id, data]: [id: string, data: string|number|boolean|Vector3]) => world.setDynamicProperty(id, data));
    return 1;
}
