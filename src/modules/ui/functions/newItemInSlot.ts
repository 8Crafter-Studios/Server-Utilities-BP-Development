import { Entity, Player, ContainerSlot, ItemStack } from "@minecraft/server";
import { ModalFormData, ModalFormResponse, MessageFormData } from "@minecraft/server-ui";
import { forceShow } from "modules/ui/functions/forceShow";
import { executeCommandPlayerW } from "modules/commands/classes/executeCommandPlayerW";

export function newItemInSlot(
    sourceEntitya: Entity | executeCommandPlayerW | Player,
    item: ContainerSlot
) {
    const sourceEntity = sourceEntitya instanceof executeCommandPlayerW
        ? sourceEntitya.player!
        : sourceEntitya;
    let form = new ModalFormData();
    form.title("New Item");
    form.textField("Item Type", "Item Id", {defaultValue: "minecraft:grass_block"});
    form.textField("Count", "int", {defaultValue: "1"});
    form.submitButton("Create Item");
    forceShow(form, sourceEntity as Player)
        .then((ra) => {
            let r = ra as ModalFormResponse;
            if (r.canceled) {
                return;
            }
            let [type, count] = r.formValues!;
            try {
                item.setItem(new ItemStack(String(type), Number(count)));
            } catch (e) {
                console.error(e, e.stack);
            }
        })
        .catch((e) => {
            let formError = new MessageFormData();
            formError.body(e + e.stack);
            formError.title("Error");
            formError.button1("Done");
            forceShow(formError, sourceEntity as Player).then(() => {
                return e;
            });
        });
}
