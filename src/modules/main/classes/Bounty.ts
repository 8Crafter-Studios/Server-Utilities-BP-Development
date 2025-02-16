import { Player } from "@minecraft/server";
import { MoneySystem } from "ExtraFeatures/money";
import { command } from "modules/commands/classes/command";
import { executeCommandPlayerW } from "modules/commands/classes/executeCommandPlayerW";
import { savedPlayer } from "modules/player_save/classes/savedPlayer";
import { numberFormatter_compact } from "modules/utilities/functions/numberFormatter";

let activeBounties: Bounty[] = [];
let currentId = 0n;

export class Bounty {
    readonly id: bigint;
    playerId: string;
    targetId: string;
    value: bigint;
    creationTime: number;
    valid: boolean = true;
    status: "none"|"deleted"|"claimed"|"canceled" = "none";
    private constructor(playerId: string, targetId: string, creationTime: number = Date.now()) {
        this.playerId = playerId;
        this.targetId = targetId;
        this.creationTime = creationTime;
        Object.defineProperty(this, "id", {
            value: currentId++,
            configurable: true,
            enumerable: true,
            writable: false,
        });
        this.init();
    }
    private async init() {
        activeBounties.push(this);
        Bounty.saveBounties();
    }
    delete() {
        if (this.valid) {
            if(this.status === "none"){
                this.status = "deleted";
            }
            this.valid = false;
            activeBounties.splice(
                activeBounties.findIndex((r) => r === this),
                1
            );
            Bounty.saveBounties();
            return true;
        } else {
            return false;
        }
    }
    cancel() {
        if (this.valid) {
            this.status = "canceled";
            this.delete();
            new MoneySystem(this.playerId as any).addMoney(this.value);
            return true;
        } else {
            return false;
        }
    }
    claim(claimer: Player) {
        if (this.valid) {
            this.status = "claimed";
            this.delete();
            claimer.moneySystem.addMoney(this.value);
            return true;
        } else {
            return false;
        }
    }
    getLinkedTargetSavedPlayer(): savedPlayer | undefined {
        return savedPlayer.getSavedPlayer("player:" + this.targetId);
    }
    getLinkedSourceSavedPlayer(): savedPlayer | undefined {
        return savedPlayer.getSavedPlayer("player:" + this.playerId);
    }
    static loadBounties() {
        activeBounties = JSONB.parse(world.getStringFromDynamicProperties("activeBounties", "[]"));
    }
    static saveBounties() {
        world.saveStringToDynamicProperties(JSONB.stringify(activeBounties), "activeBounties");
    }
    static placeBountyOnPlayer(
        value: bigint,
        playerId: string,
        targetId: string,
        playerDisplayName?: string,
        targetDisplayName?: string,
        silent: boolean = false,
        chargePlayer: boolean = true,
        creationTime: number = Date.now()
    ) {
        if (!!activeBounties.find((r) => r.playerId === playerId && r.targetId === targetId)) {
            throw new Error("Duplicate Bounty");
        }
        if(chargePlayer){
            let playerMoney = new MoneySystem(playerId as any);
            if(playerMoney.money >= value){
                playerMoney.removeMoney(value);
            }else{
                throw new Error("Insufficient Funds");
            }
        }
        if (silent) {
            new Bounty(playerId, targetId, creationTime);
        } else {
            const playerName =
                playerDisplayName ??
                world.getAllPlayers().find((p) => p.id === playerId)?.id ??
                tryget(() => savedPlayer.getSavedPlayer("player:" + playerId)?.id);
            const targetName =
                targetDisplayName ??
                world.getAllPlayers().find((p) => p.id === targetId)?.id ??
                tryget(() => savedPlayer.getSavedPlayer("player:" + targetId)?.id);
            new Bounty(playerId, targetId, creationTime);
            world.sendMessage(`§e${playerName} has just placed a ${numberFormatter_compact(value, true, 0)} bounty on ${targetName}.`);
        }
    }
    static getBountiesFromPlayer(playerId: string): Bounty[] {
        return activeBounties.filter((r) => r.playerId === playerId);
    }
    static getBountiesOnPlayer(targetId: string): Bounty[] {
        return activeBounties.filter((r) => r.targetId === targetId);
    }
    static getMergedBounties(): Bounty[] {
        return activeBounties.filter(b=>b.valid);
    }
    static getAllBounties(): Bounty[] {
        return activeBounties.filter(b=>b.valid);
    }
}

export class TotalBounty {
    readonly targetId: string;
    constructor(targetId: string){
        Object.defineProperty(this, "targetId", {
            value: targetId,
            configurable: true,
            enumerable: true,
            writable: false,
        });
    }
    get totalValue(): bigint {
        let total = 0n;
        this.getBounties().forEach(b=>total += b.value)
        return total;
    }
    getLinkedTargetSavedPlayer(): savedPlayer | undefined {
        return savedPlayer.getSavedPlayer("player:" + this.targetId);
    }
    getBounties(): Bounty[] {
        return Bounty.getBountiesOnPlayer(this.targetId);
    }
    static getTotalBountyOnPlayer(player: { id: string; [k: string | number | symbol ]: any; }): TotalBounty {
        return new TotalBounty(player.id);
    }
    static getAll(): TotalBounty[] {
        const playerIds = [...new Set(Bounty.getAllBounties().map(b=>b.targetId))];
        return playerIds.map(p=>new TotalBounty(p));
    }
    static claimBounty(claimer: Player, targetId: string){
        const totalBounty = new TotalBounty(targetId);
        const applicableBounties = totalBounty.getBounties();
        applicableBounties.forEach(b=>b.claim(claimer));
    }
}

Bounty.loadBounties();
