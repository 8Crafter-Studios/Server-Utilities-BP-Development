import type { Block, Entity, Player, BlockInventoryComponent, EntityInventoryComponent } from "@minecraft/server";

export function getInventory<T extends Block | Entity | Player>(
    containerBlockPlayerOrEntity: T
) {
    return (
        containerBlockPlayerOrEntity instanceof Block
            ? containerBlockPlayerOrEntity.getComponent("inventory")
            : (containerBlockPlayerOrEntity as Entity | Player).getComponent(
                "inventory"
            )
    ) as T extends Block ? BlockInventoryComponent : EntityInventoryComponent;
}
