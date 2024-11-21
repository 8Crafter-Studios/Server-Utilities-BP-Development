import type { Entity, Player, EquipmentSlot, ContainerSlot } from "@minecraft/server";
import { ActionFormData, ActionFormResponse, MessageFormData } from "@minecraft/server-ui";
import { forceShow } from "modules/ui/functions/forceShow";
import { executeCommandPlayerW } from "../../../Main/commands";
import { itemCodePropertyEditor } from "./itemCodePropertyEditor";
import { itemDynamicPropertyEditor } from "./itemDynamicPropertyEditor";
import { itemEditor } from "./itemEditor";
import { newItemInSlot } from "./newItemInSlot";
import { mainMenu } from "./mainMenu";

export async function itemEditorTypeSelection(
    sourceEntitya: Entity | executeCommandPlayerW | Player,
    targetPlayer: Entity | Player,
    item: { slot: number | EquipmentSlot; item: ContainerSlot; },
    selectionItems?: {
        edit?: { f: Function; a?: any[]; };
        editCode?: { f: Function; a?: any[]; };
        editDynamicProperties?: { f: Function; a?: any[]; };
        editEnchantments?: { f: Function; a?: any[]; };
        newItem?: { f: Function; a?: any[]; };
        transfer?: { f: Function; a?: any[]; };
        clone?: { f: Function; a?: any[]; };
        delete?: { f: Function; a?: any[]; };
    },
    backFunction: Function = mainMenu,
    ...functionargs: any
) {
    const sourceEntity = sourceEntitya instanceof executeCommandPlayerW
        ? sourceEntitya.player
        : sourceEntitya;
    let form = new ActionFormData();
    form.title("§eItem Editor §f[§cAlpha§f]");
    form.button(
        (!item.item.hasItem() ? "§c" : "") +
        "Edit Item" /*, "textures/ui/online"*/
    );
    form.button(
        (!item.item.hasItem() || item.item?.isStackable ? "§c" : "") +
        "Edit Code" +
        (item.item?.isStackable
            ? "\n(Item Must Be Non-Stackable)"
            : "") /*, "textures/ui/online"*/
    );
    form.button(
        (!item.item.hasItem() || item.item?.isStackable ? "§c" : "§e") +
        "Edit Dynamic Properties" +
        (item.item?.isStackable
            ? "\n(Item Must Be Non-Stackable)"
            : "") /*, "textures/ui/online"*/
    );
    form.button(
        (!item.item.hasItem() ? "§c" : "§c") +
        "Edit Enchantments" /*, "textures/ui/online"*/
    );
    form.button("New Item" /*, "textures/ui/online"*/);
    form.button(
        (!item.item.hasItem() ? "§c" : "§c") +
        "Transfer Item" /*, "textures/ui/online"*/
    );
    form.button(
        (!item.item.hasItem() ? "§c" : "§c") +
        "Clone Item" /*, "textures/ui/online"*/
    );
    form.button(
        (!item.item.hasItem() ? "§c" : "§c") +
        "Delete Item" /*, "textures/ui/online"*/
    );
    //    form.button("Ban Item"/*, "textures/ui/online"*/);
    form.button("Back");
    let result: any;
    result = undefined;
    return forceShow(form, sourceEntity as Player)
        .then((ra) => {
            let r = ra as ActionFormResponse;
            if (r.canceled) {
                return;
            }
            switch (r.selection) {
                case 0:
                    if (item.item?.hasItem()) {
                        result = !!selectionItems?.edit?.f
                            ? selectionItems?.edit?.f(
                                ...(selectionItems?.edit?.a ?? [
                                    sourceEntity as Player,
                                    sourceEntity as Player,
                                ])
                            )
                            : itemEditor(sourceEntity, targetPlayer, item.item);
                    } else {
                        backFunction(
                            ...(functionargs ?? (sourceEntity as Player))
                        );
                    }
                    break;
                case 1:
                    if (item.item?.hasItem() && !item.item?.isStackable) {
                        result = !!selectionItems?.editCode?.f
                            ? selectionItems?.editCode?.f(
                                ...(selectionItems?.editCode?.a ?? [
                                    sourceEntity as Player,
                                    sourceEntity as Player,
                                ])
                            )
                            : itemCodePropertyEditor(sourceEntity, item.item);
                    } else {
                        backFunction(
                            ...(functionargs.length == 0
                                ? [sourceEntity as Player]
                                : functionargs ?? [sourceEntity as Player])
                        );
                    }
                    break;
                case 2:
                    if (item.item?.hasItem() && !item.item?.isStackable) {
                        result = !!selectionItems?.editDynamicProperties?.f
                            ? selectionItems?.editDynamicProperties?.f(
                                ...(selectionItems?.editDynamicProperties
                                    ?.a ?? [
                                        sourceEntity as Player,
                                        sourceEntity as Player,
                                    ])
                            )
                            : itemDynamicPropertyEditor(
                                sourceEntity,
                                item.item
                            );
                    } else {
                        backFunction(
                            ...(functionargs.length == 0
                                ? [sourceEntity as Player]
                                : functionargs ?? [sourceEntity as Player])
                        );
                    }
                    break;
                case 4:
                    result = !!selectionItems?.editCode?.f
                        ? selectionItems?.editCode?.f(
                            ...(selectionItems?.editCode?.a ?? [
                                sourceEntity as Player,
                                sourceEntity as Player,
                            ])
                        )
                        : newItemInSlot(sourceEntity, item.item);
                    break;
                case 5:
                    result = backFunction(
                        ...(functionargs.length == 0
                            ? [sourceEntity as Player]
                            : functionargs ?? [sourceEntity as Player])
                    );
                    break;
                default:
                    result = backFunction(
                        ...(functionargs.length == 0
                            ? [sourceEntity as Player]
                            : functionargs ?? [sourceEntity as Player])
                    );
            }
            return result;
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
