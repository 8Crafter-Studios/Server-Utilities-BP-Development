import { EquipmentSlot, type Container, type EntityEquippableComponent, type PlayerCursorInventoryComponent, type ItemStack } from "@minecraft/server";

export function getItemFromParsedSlot<
    Options extends { container?: Container; equipment?: EntityEquippableComponent; cursor?: PlayerCursorInventoryComponent; selectedSlotIndex?: number }
>(
    slot: "~" | "cursor" | EquipmentSlot | number,
    options: Options
):
    | (Options["cursor"] extends PlayerCursorInventoryComponent ? ItemStack | undefined : undefined)
    | (Options["container"] extends Container ? ItemStack | undefined : undefined)
    | (Options["equipment"] extends EntityEquippableComponent ? ItemStack | undefined : undefined)
    | undefined {
    if (typeof slot == "string") {
        const trimmedSlot = slot.trim().toLowerCase();
        if (trimmedSlot === "~") {
            if (options.selectedSlotIndex) {
                return options.container?.getItem(Number(options.selectedSlotIndex)) as any;
            } else {
                return options.equipment?.getEquipment(EquipmentSlot.Mainhand) as any;
            }
        } else if (trimmedSlot === "cursor") {
            return options.cursor as any;
        } else {
            if (options.equipment) {
                switch (trimmedSlot) {
                    case "head":
                        return options.equipment?.getEquipment(EquipmentSlot.Head) as any;
                    case "chest":
                        return options.equipment?.getEquipment(EquipmentSlot.Chest) as any;
                    case "legs":
                        return options.equipment?.getEquipment(EquipmentSlot.Legs) as any;
                    case "feet":
                        return options.equipment?.getEquipment(EquipmentSlot.Feet) as any;
                    case "mainhand":
                        return options.equipment?.getEquipment(EquipmentSlot.Mainhand) as any;
                    case "offhand":
                        return options.equipment?.getEquipment(EquipmentSlot.Offhand) as any;
                }
            }
            if (Number.isNaN(Number(slot))) {
                return options.container?.getItem(Number(slot)) as any;
            } else {
                return undefined;
            }
        }
    } else if (typeof slot == "number") {
        return options?.container?.getItem(Number(slot)) as any;
    } else if (!Number.isNaN(Number(slot))) {
        return options?.container?.getItem(Number(slot)) as any;
    } else {
        return undefined;
    }
}
