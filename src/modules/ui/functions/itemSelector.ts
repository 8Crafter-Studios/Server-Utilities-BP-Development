import { Entity, Player, EquipmentSlot, ContainerSlot } from "@minecraft/server";
import { ActionFormData, MessageFormData } from "@minecraft/server-ui";
import { forceShow } from "modules/ui/functions/forceShow";
import { executeCommandPlayerW } from "modules/commands/classes/executeCommandPlayerW";
import { customFormUICodes } from "../constants/customFormUICodes";

export async function itemSelector<
    FuncType extends (...args: any) => FuncReturnType,
    FuncReturnType extends any = void
>(
    sourceEntitya: Entity | executeCommandPlayerW | Player,
    targetPlayer: Entity | Player,
    backFunction?: FuncType,
    ...functionargs: any
): Promise<{
    slot: number | EquipmentSlot;
    item: ContainerSlot;
} | FuncReturnType | undefined> {
    const sourceEntity = sourceEntitya instanceof executeCommandPlayerW
        ? sourceEntitya.player!
        : sourceEntitya;
    let form = new ActionFormData();
    form.title(customFormUICodes.action.titles.formStyles.fullscreen + "Select Item");
    let itemsList = [] as {
        slot: number | EquipmentSlot;
        item: ContainerSlot;
    }[];
    for (let i = 0; i < (targetPlayer.getComponent("inventory")?.inventorySize ?? 0); i++) {
        itemsList.push({
            slot: i,
            item: targetPlayer.getComponent("inventory")!.container.getSlot(i),
        });
    }
    let equipmentList = [] as {
        slot: number | EquipmentSlot;
        item: ContainerSlot;
    }[];
    for (let i = 0; i < 6; i++) {
        equipmentList.push({
            slot: [
                EquipmentSlot.Mainhand,
                EquipmentSlot.Offhand,
                EquipmentSlot.Head,
                EquipmentSlot.Chest,
                EquipmentSlot.Legs,
                EquipmentSlot.Feet,
            ][i]!,
            item: targetPlayer
                .getComponent("equippable")!
                ?.getEquipmentSlot(
                    [
                        EquipmentSlot.Mainhand,
                        EquipmentSlot.Offhand,
                        EquipmentSlot.Head,
                        EquipmentSlot.Chest,
                        EquipmentSlot.Legs,
                        EquipmentSlot.Feet,
                    ][i]!
                ),
        });
    }
    let slotsList = equipmentList.concat(itemsList);
    slotsList.forEach((p) => {
        if (p.item.hasItem()) {
            form.button(
                `${customFormUICodes.action.buttons.positions.main_only}${p?.slot}: ${p?.item?.typeId}\n${p?.item?.amount}; ${p?.item?.nameTag}` /*, "textures/ui/online"*/
            );
        } else {
            form.button(`${customFormUICodes.action.buttons.positions.main_only}${p?.slot}: empty\n0; ` /*, "textures/ui/online"*/);
        }
    });
    form.button(customFormUICodes.action.buttons.positions.title_bar_only + "Back");
    let r = await forceShow(form, sourceEntity as Player);
    try {
        if (r.canceled) {
            return undefined;
        }
        switch (r.selection) {
            case slotsList.length:
                return (backFunction ?? (()=>{}))(
                    ...(functionargs.length == 0
                        ? [sourceEntity as Player]
                        : functionargs ?? [sourceEntity as Player])
                ) as any;
                break;
            default:
                return slotsList[r.selection!]!;
        }
    } catch (e) {
        let formError = new MessageFormData();
        formError.body(e + e.stack);
        formError.title("Error");
        formError.button1("Done");
        await forceShow(formError, sourceEntity as Player);
        return e;
    }
}
