import { EquipmentSlot, type Container, type EntityEquippableComponent, type PlayerCursorInventoryComponent, type ContainerSlot } from "@minecraft/server";

export function getSlotFromParsedSlot<
    Options extends { container?: Container; equipment?: EntityEquippableComponent; cursor?: PlayerCursorInventoryComponent; selectedSlotIndex?: number }
>(
    slot: "~" | "cursor" | EquipmentSlot | number,
    options: Options
):
    | (Options["cursor"] extends PlayerCursorInventoryComponent ? PlayerCursorInventoryComponent : undefined)
    | (Options["container"] extends Container ? ContainerSlot : undefined)
    | (Options["equipment"] extends EntityEquippableComponent ? ContainerSlot : undefined)
    | undefined {
    if (typeof slot == "string") {
        const trimmedSlot = slot.trim().toLowerCase();
        if (trimmedSlot === "~") {
            if (options.selectedSlotIndex) {
                return options.container?.getSlot(Number(options.selectedSlotIndex)) as any;
            } else {
                return options.equipment?.getEquipmentSlot(EquipmentSlot.Mainhand) as any;
            }
        } else if (trimmedSlot === "cursor") {
            return options.cursor as any;
        } else {
            if (options.equipment) {
                switch (trimmedSlot) {
                    case "head":
                        return options.equipment?.getEquipmentSlot(EquipmentSlot.Head) as any;
                    case "chest":
                        return options.equipment?.getEquipmentSlot(EquipmentSlot.Chest) as any;
                    case "legs":
                        return options.equipment?.getEquipmentSlot(EquipmentSlot.Legs) as any;
                    case "feet":
                        return options.equipment?.getEquipmentSlot(EquipmentSlot.Feet) as any;
                    case "mainhand":
                        return options.equipment?.getEquipmentSlot(EquipmentSlot.Mainhand) as any;
                    case "offhand":
                        return options.equipment?.getEquipmentSlot(EquipmentSlot.Offhand) as any;
                }
            }
            if (Number.isNaN(Number(slot))) {
                return options.container?.getSlot(Number(slot)) as any;
            } else {
                return undefined;
            }
        }
    } else if (typeof slot == "number") {
        return options?.container?.getSlot(Number(slot)) as any;
    } else if (!Number.isNaN(Number(slot))) {
        return options?.container?.getSlot(Number(slot)) as any;
    } else {
        return undefined;
    }
}
