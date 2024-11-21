import { Entity, Player } from "@minecraft/server";
import { executeCommandPlayerW } from "../../../Main/commands";
export declare function onlinePlayerSelector(sourceEntitya: Entity | executeCommandPlayerW | Player, backFunction?: Function, ...functionargs: any): Promise<Player | undefined>;
