import { Entity, world } from "@minecraft/server";
import { savedPlayer } from "modules/player_save/classes/savedPlayer";

export class MoneySystem {
    playerID: `${number}`;
    get money() {
        if (
            world.scoreboard
                .getObjective(config.moneySystem.scoreboardName)
                ?.getParticipants()
                .find((v) => tryget(() => v.getEntity()?.id) == this.playerID) == undefined
        ) {
            const player = world.getAllPlayers().find((v) => v.id == this.playerID);
            if (player != undefined) {
                world.scoreboard.getObjective(config.moneySystem.scoreboardName)?.addScore(player, 0);
            }
        }
        if (config.moneySystem.useScoreboardBasedMoneySystem) {
            try {
                return (
                    world.scoreboard
                        .getObjective(config.moneySystem.scoreboardName)
                        ?.getScore(
                            world.scoreboard.getParticipants().find((v) => tryget(() => v.getEntity()?.id) == this.playerID) ??
                                (world.scoreboard
                                    .getParticipants()
                                    .find((v) => v.id == savedPlayer.getSavedPlayer("player:" + this.playerID).scoreboardIdentity) as any)
                        )
                        ?.toBigInt() ?? 0n
                );
            } catch {
                return 0n;
            }
        } else {
            return String(world.getDynamicProperty(`playerMoney:${this.playerID}`)).toBigInt() ?? 0n;
        }
    }
    addMoney(amount: number | bigint) {
        if (
            world.scoreboard
                .getObjective(config.moneySystem.scoreboardName)
                ?.getParticipants()
                .find((v) => tryget(() => v.getEntity()?.id) == this.playerID) == undefined
        ) {
            const player = world.getAllPlayers().find((v) => v.id == this.playerID);
            if (player != undefined) {
                world.scoreboard.getObjective(config.moneySystem.scoreboardName)?.addScore(player, 0);
            }
        }
        if (config.moneySystem.useScoreboardBasedMoneySystem) {
            try {
                world.scoreboard
                    .getObjective(config.moneySystem.scoreboardName)
                    ?.setScore(
                        world.scoreboard.getParticipants().find((v) => tryget(() => v.getEntity()?.id) == this.playerID) ??
                            world.scoreboard.getParticipants().find((v) => v.id == savedPlayer.getSavedPlayer("player:" + this.playerID).scoreboardIdentity) as any,
                        Math.min((this.money + amount.toBigInt()).toNumber(), 2147483647)
                    );
            } catch {}
        } else {
            world.setDynamicProperty(`playerMoney:${this.playerID}`, (this.money + amount.toBigInt()).toString());
            try {
                world.scoreboard
                    .getObjective(config.moneySystem.scoreboardName)
                    ?.setScore(
                        world.scoreboard.getParticipants().find((v) => tryget(() => v.getEntity()?.id) == this.playerID) ??
                            world.scoreboard.getParticipants().find((v) => v.id == savedPlayer.getSavedPlayer("player:" + this.playerID).scoreboardIdentity) as any,
                        Math.min(this.money.toNumber(), 2000000000)
                    );
            } catch {}
        }
    }
    removeMoney(amount: number | bigint) {
        if (
            world.scoreboard
                .getObjective(config.moneySystem.scoreboardName)
                ?.getParticipants()
                .find((v) => tryget(() => v.getEntity()?.id) == this.playerID) == undefined
        ) {
            if (world.getAllPlayers().find((v) => v.id == this.playerID) != undefined) {
                world.scoreboard.getObjective(config.moneySystem.scoreboardName)?.addScore(
                    world.getAllPlayers().find((v) => v.id == this.playerID) as any,
                    0
                );
            }
        }
        if (config.moneySystem.useScoreboardBasedMoneySystem) {
            try {
                world.scoreboard
                    .getObjective(config.moneySystem.scoreboardName)
                    ?.setScore(
                        world.scoreboard.getParticipants().find((v) => tryget(() => v.getEntity()?.id) == this.playerID) ??
                            world.scoreboard.getParticipants().find((v) => v.id == savedPlayer.getSavedPlayer("player:" + this.playerID).scoreboardIdentity) as any,
                        Math.min((this.money - amount.toBigInt()).toNumber(), 2147483647)
                    );
            } catch {}
        } else {
            world.setDynamicProperty(`playerMoney:${this.playerID}`, (this.money - amount.toBigInt()).toString());
            try {
                world.scoreboard
                    .getObjective(config.moneySystem.scoreboardName)
                    ?.setScore(
                        world.scoreboard.getParticipants().find((v) => tryget(() => v.getEntity()?.id) == this.playerID) ??
                            world.scoreboard.getParticipants().find((v) => v.id == savedPlayer.getSavedPlayer("player:" + this.playerID).scoreboardIdentity) as any,
                        Math.min(this.money.toNumber(), 2000000000)
                    );
            } catch {}
        }
    }
    setMoney(amount: number | bigint = 0) {
        if (
            world.scoreboard
                .getObjective(config.moneySystem.scoreboardName)
                ?.getParticipants()
                .find((v) => tryget(() => v.getEntity()?.id) == this.playerID) == undefined
        ) {
            const player = world.getAllPlayers().find((v) => v.id == this.playerID);
            if (player != undefined) {
                world.scoreboard.getObjective(config.moneySystem.scoreboardName)?.addScore(
                    player,
                    0
                );
            }
        }
        if (config.moneySystem.useScoreboardBasedMoneySystem) {
            try {
                world.scoreboard
                    .getObjective(config.moneySystem.scoreboardName)
                    ?.setScore(
                        world.scoreboard.getParticipants().find((v) => tryget(() => v.getEntity()?.id) == this.playerID) ??
                            world.scoreboard.getParticipants().find((v) => v.id == savedPlayer.getSavedPlayer("player:" + this.playerID).scoreboardIdentity) as any,
                        Math.min(amount.toNumber(), 2147483647)
                    );
            } catch {}
        } else {
            world.setDynamicProperty(`playerMoney:${this.playerID}`, amount.toBigInt().toString());
            try {
                world.scoreboard
                    .getObjective(config.moneySystem.scoreboardName)
                    ?.setScore(
                        world.scoreboard.getParticipants().find((v) => tryget(() => v.getEntity()?.id) == this.playerID) ??
                            world.scoreboard.getParticipants().find((v) => v.id == savedPlayer.getSavedPlayer("player:" + this.playerID).scoreboardIdentity) as any,
                        Math.min(amount.toNumber(), 2000000000)
                    );
            } catch {}
        }
    }
    constructor(playerID: `${number}`) {
        this.playerID = playerID;
        if (
            world.scoreboard
                .getObjective(config.moneySystem.scoreboardName)
                ?.getParticipants()
                .find((v) => tryget(() => v.getEntity()?.id) == this.playerID) == undefined
        ) {
            const player = world.getAllPlayers().find((v) => v.id == this.playerID);
            if (player != undefined) {
                world.scoreboard.getObjective(config.moneySystem.scoreboardName)?.addScore(
                    player,
                    0
                );
            }
        }
    }
    static get(player: `${number}` | Entity | { id: string | `${number}` } | number | bigint | string) {
        return new MoneySystem(
            typeof player == "string"
                ? (player as `${number}`)
                : typeof player == "number"
                ? (player.toString() as `${number}`)
                : typeof player == "bigint"
                ? (player.toString() as `${number}`)
                : (player.id as `${number}`)
        );
    }
}
