import type { Block, Entity, Player, BlockInventoryComponent, EntityInventoryComponent } from "@minecraft/server";
export declare function getInventory<T extends Block | Entity | Player>(containerBlockPlayerOrEntity: T): T extends Block ? BlockInventoryComponent : EntityInventoryComponent;
