import type { ChatSendBeforeEvent, Player } from "@minecraft/server";
import type { command } from "modules/commands/classes/command";
import type { commands } from "modules/commands_list/constants/commands";

export const cmdsmetaimport = import.meta;
//globalThis.modules={main, coords, cmds, bans, uis, playersave, spawnprot, mcMath}
export function cmdsEval(
    x: string,
    eventData?: ChatSendBeforeEvent,
    bypassChatInputRequests?: boolean,
    runreturn?: boolean,
    returnBeforeChatSend?: boolean,
    returnBeforeChatCommandsOrChatSend?: boolean,
    event?: ChatSendBeforeEvent,
    player?: Player,
    sendToPlayers?: Player[],
    newMessage?: string,
    switchTest?: string,
    switchTestB?: string,
    commanda?: command<"built-in"|"custom"|"unknown">|typeof commands[number]|{ type: string; }
) {
    return eval(x);
}
export async function cmdsEvalAsync(
    x: string,
    eventData?: ChatSendBeforeEvent,
    bypassChatInputRequests?: boolean,
    runreturn?: boolean,
    returnBeforeChatSend?: boolean,
    returnBeforeChatCommandsOrChatSend?: boolean,
    event?: ChatSendBeforeEvent,
    player?: Player,
    sendToPlayers?: Player[],
    newMessage?: string,
    switchTest?: string,
    switchTestB?: string,
    commanda?: command<"built-in"|"custom"|"unknown">|typeof commands[number]|{ type: string; }
) {
    return await eval(`(async()=>{${x}})()`);
}
export function indirectCmdsEval(x: string) {
    return eval?.(x);
}
export function cmdsRun(x: (...args: any[]) => any, ...args: any[]) {
    return x(...args);
}
/*
export let abcdefgh = escapeRegExp.arguments*/
//((a: RawMessage)=>{})({rawtext: [{"text": "TPS IS: "}, {"score": {objective: "tps", name: "tps"}}, {"text": "a"}]})
//((a: Player)=>{})(new executeCommandPlayer(getPlayer("Andexter8")))
//world.scoreboard.getObjective("mobdamage").addScore(Player.prototype.scoreboardIdentity, 1)
//world.afterEvents.entityDie.subscribe(event=>{if(event.damageSource?.damagingEntity?.typeId=="minecraft:player"&&((tryget(()=>{let entity = overworld.spawnEntity(event.deadEntity?.typeId, world.getDefaultSpawnLocation()); let r = tryget(()=>entity.runCommand("/execute if entity @s[family=monster] run /scriptevent andexdb:none").successCount); entity.remove(); return r})??0)!=0)){world.scoreboard.getObjective("mobdamage").addScore(event.damageSource.damagingEntity, 1)}else if(event.deadEntity?.typeId=="minecraft:player"){world.scoreboard.getObjective("mobdamage").setScore(event.deadEntity, 0)}})
//world.afterEvents.entityHurt.subscribe(event=>{if(event.hurtEntity.typeId=="minecraft:player"&&((tryget(()=>event.damageSource.damagingEntity.runCommand("/execute if entity @s[family=monster] run /scriptevent andexdb:none").successCount)??0)!=0)){event.hurtEntity.applyDamage((tryget(()=>world.scoreboard.getObjective("mobdamage").getScore(event.hurtEntity))??0)/20)}})


function JSONify(obj: object) {
    var o: object = {};
    for (var i in obj) {
        o['"' + i + '"' as keyof typeof o] = obj[i as keyof typeof obj]; // make the quotes
    }
    return o;
}

const teststssts = true;
//function a<T extends string>(t: flagsMatcherTextC<T>, v: T): asserts t is flagsMatcherTextC<typeof v> {return void undefined};
//a("a", "$123!")

