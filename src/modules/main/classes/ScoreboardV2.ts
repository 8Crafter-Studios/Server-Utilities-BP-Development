import { DisplaySlotId, Entity, Scoreboard, ScoreboardIdentity, ScoreboardObjective, ScoreboardScoreInfo, world, type ScoreboardObjectiveDisplayOptions } from "@minecraft/server";
import { savedPlayer } from "modules/player_save/classes/savedPlayer";
import * as ipc from "ipc";
import { deleteStringFromDynamicProperties } from "modules/utilities/functions/deleteStringFromDynamicProperties";

export class ScoreboardV2 {
    static addObjective(objectiveId: string, displayName?: string): ScoreboardV2Objective {
        return ScoreboardV2Objective.new(objectiveId, displayName);
    }
    static getObjective(objectiveId: string): ScoreboardV2Objective | undefined {
        return ScoreboardV2Objective.get(objectiveId);
    }
    static getObjectives(): ScoreboardV2Objective[] {
        return cullUndefined(world.getDynamicPropertyIds().filter(s=>s.startsWith("scoreboardV2:")).map(v=>ScoreboardV2Objective.get(v.slice(13, -7))));
    }
    static getObjectiveIds(): string[] {
        return this.getObjectives().map(v=>v.id);
    }
    static removeObjective(objectiveId: ScoreboardV2Objective | string): boolean {
        const objective = objectiveId instanceof ScoreboardV2Objective ? objectiveId : new ScoreboardV2Objective(objectiveId);
        if(objective.isValid()){
            objective.delete();
            return true;
        }else{
            return false;
        }
    }
}
export class ScoreboardV2Objective {
    displayName?: string;
    id: string;
    private scores: {[playerId: string]: bigint} = {};
    constructor(id: string){
        this.id = id;
        if(this.isValid()){
            this.load();
        }
    }
    addScore(participant: string, scoreToAdd: bigint): bigint {
        this.scores[participant] ??= 0n;
        this.scores[participant] += scoreToAdd;
        this.save();
        return this.scores[participant];
    }
    getParticipants(): string[] {
        throw new Error("Method not implemented.");
    }
    getScore(participant: string): bigint | undefined {
        return this.scores[participant];
    }
    getScores(): {participant: string, score: bigint}[] {
        return Object.entries(this.scores).map(s=>({participant: s[0], score: s[1]}));
    }
    hasParticipant(participant: string): boolean {
        return this.scores[participant] !== undefined;
    }
    isValid(): boolean {
        return (world.getStringFromDynamicProperties("scoreboardV2:" + this.id) ?? "") !== "";
    }
    transferFromScoreboard(scoreboard: ScoreboardObjective){
        const players = savedPlayer.getSavedPlayers().filter(p=>p.scoreboardIdentity !== undefined).map(p=>([p, tryget(()=>world.scoreboard.getParticipants().find(pa=>pa?.id === p.scoreboardIdentity))] as [player: savedPlayer, identity: ScoreboardIdentity])).filter(p=>p[1] !== undefined);
        players.forEach(p=>{
            const score = scoreboard.getScore(p[1])
            if(score !== undefined){
                this.addScore(p[0].id, score.toBigInt());
                scoreboard.removeParticipant(p[1])
            }
        })
    }
    removeParticipant(participant: string): boolean {
        let successful = this.scores[participant] !== undefined;
        delete this.scores[participant];
        if(this.scores[participant] !== undefined){
            successful = false;
        }
        this.save();
        return successful;
    }
    setScore(participant: string, score: bigint): void {
        this.scores[participant] = score;
        this.save();
    }
    private save(): void {
        world.saveStringToDynamicProperties(JSONB.stringify(this.toJSON()), "scoreboardV2:" + this.id, true);
    }
    /**
     * @throws Throws if the scoreboard has not been saved.
     */
    private load(): void {
        const data = JSONB.parse(world.getStringFromDynamicProperties("scoreboardV2:" + this.id));
        this.id = data.id;
        this.displayName = data.displayName;
        this.scores = data.scores();
    }
    delete(): void {
        deleteStringFromDynamicProperties("scoreboardV2:" + this.id);
    }
    toJSON(){
        return {id: this.id, displayName: this.displayName, scores: this.scores};
    }
    static get(objectiveId: string): ScoreboardV2Objective | undefined {
        const objective = new ScoreboardV2Objective(objectiveId);
        if(objective.isValid()){
            return objective;
        }else{
            return undefined;
        }
    }
    static new(objectiveId: string, displayName: string = objectiveId): ScoreboardV2Objective {
        const objective = new ScoreboardV2Objective(objectiveId);
        if(objective.isValid()){
            throw new Error("Duplicate Objective ID");
        }else{
            objective.displayName = displayName;
            objective.save();
            return objective;
        }
    }
    
}

ipc.IPC.handle("andexdbRequestScoreboardV2ObjectiveIds", ipc.PROTO.Optional(ipc.PROTO.Undefined), ipc.PROTO.Array(ipc.PROTO.String), ()=>{
    return ScoreboardV2.getObjectiveIds();
});

ipc.IPC.handle("andexdbRequestScoreboardV2AddObjective", ipc.PROTO.Object({objectiveID: ipc.PROTO.String, displayName: ipc.PROTO.Optional(ipc.PROTO.String)}), ipc.PROTO.Void, v=>{
    ScoreboardV2.addObjective(v.objectiveID, v.displayName);
});

ipc.IPC.handle("andexdbRequestScoreboardV2GetObjective", ipc.PROTO.Object({objectiveID: ipc.PROTO.String}), ipc.PROTO.Object({id: ipc.PROTO.String, displayName: ipc.PROTO.Optional(ipc.PROTO.String), scores: ipc.PROTO.Array(ipc.PROTO.Tuple(ipc.PROTO.String, ipc.PROTO.String))}), v=>{
    const data = ScoreboardV2.getObjective(v.objectiveID)!.toJSON();
    return {
        id: data.id,
        displayName: data.displayName,
        scores: Object.entries(data.scores).map(v=>[v[0], v[1].toString()] as [playerID: string, score: string])
    }
});

ipc.IPC.handle("andexdbRequestScoreboardV2RemoveObjective", ipc.PROTO.Object({objectiveID: ipc.PROTO.String}), ipc.PROTO.Boolean, v=>{
    return ScoreboardV2.removeObjective(v.objectiveID);
});

ipc.IPC.handle("andexdbRequestScoreboardV2GetScore", ipc.PROTO.Object({playerID: ipc.PROTO.String, objectiveID: ipc.PROTO.String}), ipc.PROTO.Object({playerID: ipc.PROTO.String, objectiveID: ipc.PROTO.String, money: ipc.PROTO.String}), v=>{
    return {
        playerID: v.playerID,
        objectiveID: v.objectiveID,
        money: ScoreboardV2.getObjective(v.objectiveID)!.getScore(v.playerID)!.toString(),
    };
});

ipc.IPC.handle("andexdbRequestScoreboardV2SetScore", ipc.PROTO.Object({playerID: ipc.PROTO.String, objectiveID: ipc.PROTO.String, money: ipc.PROTO.String}), ipc.PROTO.Boolean, v=>{
    ScoreboardV2.getObjective(v.objectiveID)!.setScore(v.playerID, BigInt(v.money));
    return true;
});

ipc.IPC.handle("andexdbRequestScoreboardV2AddScore", ipc.PROTO.Object({playerID: ipc.PROTO.String, objectiveID: ipc.PROTO.String, money: ipc.PROTO.String}), ipc.PROTO.Boolean, v=>{
    ScoreboardV2.getObjective(v.objectiveID)!.addScore(v.playerID, BigInt(v.money));
    return true;
});

ipc.IPC.handle("andexdbRequestScoreboardV2RemoveScore", ipc.PROTO.Object({playerID: ipc.PROTO.String, objectiveID: ipc.PROTO.String, money: ipc.PROTO.String}), ipc.PROTO.Boolean, v=>{
    ScoreboardV2.getObjective(v.objectiveID)!.addScore(v.playerID, -BigInt(v.money));
    return true;
});
