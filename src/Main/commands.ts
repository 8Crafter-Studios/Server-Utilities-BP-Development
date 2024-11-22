import { Dimension } from "@minecraft/server";
import { ExpireError } from "../modules/errors/classes/ExpireError";
import { TimeoutError } from "../modules/errors/classes/TimeoutError";
import { BlockPattern } from "../modules/commands/classes/BlockPattern";
export const cmdsmetaimport = import.meta;
//globalThis.modules={main, coords, cmds, bans, uis, playersave, spawnprot, mcMath}
export function cmdsEval(
    x: string,
    eventData?,
    bypassChatInputRequests?,
    runreturn?,
    returnBeforeChatSend?,
    returnBeforeChatCommandsOrChatSend?,
    event?,
    player?,
    sendToPlayers?,
    newMessage?,
    switchTest?,
    switchTestB?,
    commanda?
) {
    return eval(x);
}
export function indirectCmdsEval(x: string) {
    return eval?.(x);
}
export function cmdsRun(x: (...args) => any, ...args) {
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
    var o = {};
    for (var i in obj) {
        o['"' + i + '"'] = obj[i]; // make the quotes
    }
    return o;
}

type ZeroToNineCharacters =
    | "0"
    | "1"
    | "2"
    | "3"
    | "4"
    | "5"
    | "6"
    | "7"
    | "8"
    | "9";
type LowercaseLetter =
    | "a"
    | "b"
    | "c"
    | "d"
    | "e"
    | "f"
    | "g"
    | "h"
    | "i"
    | "j"
    | "k"
    | "l"
    | "m"
    | "n"
    | "o"
    | "p"
    | "q"
    | "r"
    | "s"
    | "t"
    | "u"
    | "v"
    | "w"
    | "x"
    | "y"
    | "z";
type UppercaseLetter =
    | "A"
    | "B"
    | "C"
    | "D"
    | "E"
    | "F"
    | "G"
    | "H"
    | "I"
    | "J"
    | "K"
    | "L"
    | "M"
    | "N"
    | "O"
    | "P"
    | "Q"
    | "R"
    | "S"
    | "T"
    | "U"
    | "V"
    | "W"
    | "X"
    | "Y"
    | "Z";
export type flagsMatcherTextA =
    | ZeroToNineCharacters
    | LowercaseLetter
    | UppercaseLetter
    | "!"
    | "@"
    | "#"
    | "$"
    | "%"
    | "^"
    | "&"
    | "*"
    | "<"
    | ">"
    | ","
    | "."
    | "~";
const teststssts = true;
export type flagsMatcherTextB<T extends string> = T extends flagsMatcherTextA
    ? T
    : T extends `${flagsMatcherTextA}${infer R}`
    ? flagsMatcherTextB<R>
    : never;
export type flagsMatcherTextC<T extends string> = T extends flagsMatcherTextA
    ? string
    : T extends `${flagsMatcherTextA}${infer R}`
    ? flagsMatcherTextC<R>
    : never;
//function a<T extends string>(t: flagsMatcherTextC<T>, v: T): asserts t is flagsMatcherTextC<typeof v> {return void undefined};
//a("a", "$123!")
export type evaluateParametersTypeMap = {
    presetText: string;
    number: number;
    boolean: boolean | undefined;
    neboolean: boolean | undefined;
    string: string | undefined;
    "non-booleanString": string | undefined;
    json: any;
    Vector: string | undefined;
    Vector1: string | undefined;
    Vector2: string | undefined;
    Vector3: string | undefined;
    Vector4: string | undefined;
    Vector5: string | undefined;
    Vector6: string | undefined;
    Vector7: string | undefined;
    Vector8: string | undefined;
    Vectors: string | undefined;
    targetSelector: string | undefined;
    blockStates:
        | { [id: string]: string | number | boolean | undefined }
        | undefined;
    blockPattern: BlockPattern | undefined;
    block: { id: string; states?: string } | undefined;
};
type evaluateParametersTypeMapper<Tuple extends [...any[]]> = {
    [Index in keyof Tuple]: Tuple[Index] extends "presetText"
        ? string | undefined
        : Tuple[Index] extends "number"
        ? number | undefined
        : Tuple[Index] extends "boolean"
        ? boolean | undefined
        : Tuple[Index] extends "neboolean"
        ? boolean | undefined
        : Tuple[Index] extends "string"
        ? string | undefined
        : Tuple[Index] extends "non-booleanString"
        ? string | undefined
        : Tuple[Index] extends "json"
        ? any | undefined
        : Tuple[Index] extends "Vector"
        ? string | undefined
        : Tuple[Index] extends "Vector1"
        ? string | undefined
        : Tuple[Index] extends "Vector2"
        ? string | undefined
        : Tuple[Index] extends "Vector3"
        ? string | undefined
        : Tuple[Index] extends "Vector4"
        ? string | undefined
        : Tuple[Index] extends "Vector5"
        ? string | undefined
        : Tuple[Index] extends "Vector6"
        ? string | undefined
        : Tuple[Index] extends "Vector7"
        ? string | undefined
        : Tuple[Index] extends "Vector8"
        ? string | undefined
        : Tuple[Index] extends "Vectors"
        ? string | undefined
        : Tuple[Index] extends "targetSelector"
        ? string | undefined
        : Tuple[Index] extends "blockStates"
        ? { [id: string]: string | number | boolean } | undefined
        : Tuple[Index] extends "blockPattern"
        ? BlockPattern | undefined
        : Tuple[Index] extends "dimension"
        ? Dimension | undefined
        : Tuple[Index] extends `-${string}`
        ? string
        : Tuple[Index] extends `f-${string}`
        ? {
              "0"?: boolean;
              "1"?: boolean;
              "2"?: boolean;
              "3"?: boolean;
              "4"?: boolean;
              "5"?: boolean;
              "6"?: boolean;
              "7"?: boolean;
              "8"?: boolean;
              "9"?: boolean;
              a?: boolean;
              b?: boolean;
              c?: boolean;
              d?: boolean;
              e?: boolean;
              f?: boolean;
              g?: boolean;
              h?: boolean;
              i?: boolean;
              j?: boolean;
              k?: boolean;
              l?: boolean;
              m?: boolean;
              n?: boolean;
              o?: boolean;
              p?: boolean;
              q?: boolean;
              r?: boolean;
              s?: boolean;
              t?: boolean;
              u?: boolean;
              v?: boolean;
              w?: boolean;
              x?: boolean;
              y?: boolean;
              z?: boolean;
              A?: boolean;
              B?: boolean;
              C?: boolean;
              D?: boolean;
              E?: boolean;
              F?: boolean;
              G?: boolean;
              H?: boolean;
              I?: boolean;
              J?: boolean;
              K?: boolean;
              L?: boolean;
              M?: boolean;
              N?: boolean;
              O?: boolean;
              P?: boolean;
              Q?: boolean;
              R?: boolean;
              S?: boolean;
              T?: boolean;
              U?: boolean;
              V?: boolean;
              W?: boolean;
              X?: boolean;
              Y?: boolean;
              Z?: boolean;
              "!"?: boolean;
              "@"?: boolean;
              "#"?: boolean;
              $?: boolean;
              "%"?: boolean;
              "^"?: boolean;
              "&"?: boolean;
              "*"?: boolean;
              "<"?: boolean;
              ">"?: boolean;
              ","?: boolean;
              "."?: boolean;
              "~"?: boolean;
          }
        : Tuple[Index] extends { type: "number" }
        ? number | undefined
        : Tuple[Index] extends { type: "boolean" }
        ? boolean | undefined
        : Tuple[Index] extends { type: "neboolean" }
        ? boolean | undefined
        : Tuple[Index] extends { type: "string" }
        ? string | undefined
        : Tuple[Index] extends { type: "non-booleanString" }
        ? string | undefined
        : Tuple[Index] extends { type: "json" }
        ? any | undefined
        : Tuple[Index] extends { type: "Vector" }
        ? string | undefined
        : Tuple[Index] extends { type: "Vector1" }
        ? string | undefined
        : Tuple[Index] extends { type: "Vector2" }
        ? string | undefined
        : Tuple[Index] extends { type: "Vector3" }
        ? string | undefined
        : Tuple[Index] extends { type: "Vector4" }
        ? string | undefined
        : Tuple[Index] extends { type: "Vector5" }
        ? string | undefined
        : Tuple[Index] extends { type: "Vector6" }
        ? string | undefined
        : Tuple[Index] extends { type: "Vector7" }
        ? string | undefined
        : Tuple[Index] extends { type: "Vector8" }
        ? string | undefined
        : Tuple[Index] extends { type: "Vectors" }
        ? string | undefined
        : Tuple[Index] extends { type: "targetSelector" }
        ? string | undefined
        : Tuple[Index] extends { type: "blockStates" }
        ? { [id: string]: string | number | boolean } | undefined
        : Tuple[Index] extends { type: "blockPattern" }
        ? BlockPattern | undefined
        : Tuple[Index] extends { type: "dimension" }
        ? Dimension | undefined
        : Tuple[Index] extends { type: `-${string}` }
        ? string
        : Tuple[Index] extends { type: `f-${string}` }
        ? {
              "0"?: boolean;
              "1"?: boolean;
              "2"?: boolean;
              "3"?: boolean;
              "4"?: boolean;
              "5"?: boolean;
              "6"?: boolean;
              "7"?: boolean;
              "8"?: boolean;
              "9"?: boolean;
              a?: boolean;
              b?: boolean;
              c?: boolean;
              d?: boolean;
              e?: boolean;
              f?: boolean;
              g?: boolean;
              h?: boolean;
              i?: boolean;
              j?: boolean;
              k?: boolean;
              l?: boolean;
              m?: boolean;
              n?: boolean;
              o?: boolean;
              p?: boolean;
              q?: boolean;
              r?: boolean;
              s?: boolean;
              t?: boolean;
              u?: boolean;
              v?: boolean;
              w?: boolean;
              x?: boolean;
              y?: boolean;
              z?: boolean;
              A?: boolean;
              B?: boolean;
              C?: boolean;
              D?: boolean;
              E?: boolean;
              F?: boolean;
              G?: boolean;
              H?: boolean;
              I?: boolean;
              J?: boolean;
              K?: boolean;
              L?: boolean;
              M?: boolean;
              N?: boolean;
              O?: boolean;
              P?: boolean;
              Q?: boolean;
              R?: boolean;
              S?: boolean;
              T?: boolean;
              U?: boolean;
              V?: boolean;
              W?: boolean;
              X?: boolean;
              Y?: boolean;
              Z?: boolean;
              "!"?: boolean;
              "@"?: boolean;
              "#"?: boolean;
              $?: boolean;
              "%"?: boolean;
              "^"?: boolean;
              "&"?: boolean;
              "*"?: boolean;
              "<"?: boolean;
              ">"?: boolean;
              ","?: boolean;
              "."?: boolean;
              "~"?: boolean;
          }
        : any | undefined;
} & { length: Tuple["length"] };
export type evaluateParametersParameterTypes =
    | "presetText"
    | "number"
    | "boolean"
    | "neboolean"
    | "string"
    | "non-booleanString"
    | "json"
    | "Vector"
    | "Vector1"
    | "Vector2"
    | "Vector3"
    | "Vector4"
    | "Vector5"
    | "Vector6"
    | "Vector7"
    | "Vector8"
    | "Vectors"
    | "targetSelector"
    | "blockStates"
    | "blockPattern"
    | "block"
    | "dimension"
    | `-${string}`
    | `f-${string}`;
export type evaluateParametersParameter =
    | {
          type:
              | "presetText"
              | "number"
              | "boolean"
              | "neboolean"
              | "string"
              | "non-booleanString"
              | "json"
              | "Vector"
              | "Vector1"
              | "Vector2"
              | "Vector3"
              | "Vector4"
              | "Vector5"
              | "Vector6"
              | "Vector7"
              | "Vector8"
              | "targetSelector"
              | "blockStates"
              | "blockPattern"
              | "block"
              | "blockMask"
              | "dimension"
              | `-${string}`
              | `f-${string}`;
          maxLength?: number;
      }
    | { type: "Vectors"; vectorCount?: number; maxLength?: number }
    | "presetText"
    | "number"
    | "boolean"
    | "neboolean"
    | "string"
    | "non-booleanString"
    | "json"
    | "Vector"
    | "Vector1"
    | "Vector2"
    | "Vector3"
    | "Vector4"
    | "Vector5"
    | "Vector6"
    | "Vector7"
    | "Vector8"
    | "targetSelector"
    | "blockStates"
    | "blockPattern"
    | "block"
    | "blockMask"
    | "dimension"
    | `-${string}`
    | `f-${string}`;


