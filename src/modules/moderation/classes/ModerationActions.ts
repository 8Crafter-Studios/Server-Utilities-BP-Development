import moment from "moment";
import { getStringFromDynamicProperties } from "modules/utilities/functions/getStringFromDynamicProperties";
import { saveStringToDynamicProperties } from "modules/utilities/functions/saveStringToDynamicProperties";

export let mutes: { [playerName: string]: muteData } = {};

export interface muteData {
    unmuteDate: number | null;
    muteDate: number;
    mutedById: string | null;
    mutedByName: string | null;
    reason: string | null;
}

export class ModerationActions {
    static mutePlayer(
        playerName: string,
        options?: {
            unmuteDate?: number;
            muteDate?: number;
            mutedById?: string;
            mutedByName?: string;
            reason?: string;
        }
    ): void {
        mutes[playerName] = {
            muteDate: options?.muteDate ?? Date.now(),
            unmuteDate: options?.unmuteDate ?? null,
            mutedById: options?.mutedById ?? null,
            mutedByName: options?.mutedByName ?? null,
            reason: options?.reason ?? null,
        };
        this.saveMutes();
    }
    static unmutePlayer(playerName: string): void {
        delete mutes[playerName];
        this.saveMutes();
    }
    static getMuteData(playerName: string): muteData | null {
        if (!!mutes[playerName]) return mutes[playerName];
        return null;
    }
    static getAllMutes(): { [playerName: string]: muteData; } {
        return mutes;
    }
    static testForMutedPlayer(playerName: string): boolean {
        if (!!mutes[playerName]) {
            if(mutes[playerName].unmuteDate === null || mutes[playerName].unmuteDate > Date.now()) return true;
            delete mutes[playerName];
            this.saveMutes();
            return false;
        }
        return false;
    }
    static testForPermanentlyMutedPlayer(playerName: string): boolean {
        if (!!mutes[playerName]) {
            if(mutes[playerName].unmuteDate === null) return true;
            if(mutes[playerName].unmuteDate > Date.now()) return false;
            delete mutes[playerName];
            this.saveMutes();
            return false;
        }
        return false;
    }
    static playerTimeUntilUnmute(playerName: string): number | null {
        if (!!mutes[playerName]) {
            if (mutes[playerName].unmuteDate === null) return Infinity;
            if (mutes[playerName].unmuteDate > Date.now()) return mutes[playerName].unmuteDate - Date.now();
            delete mutes[playerName];
            this.saveMutes();
            return null;
        }
        return null;
    }
    static playerTimeUntilUnmuteFormatted(playerName: string): string | null {
        if (!!mutes[playerName]) {
            if (mutes[playerName].unmuteDate === null) return "forever";
            if (mutes[playerName].unmuteDate > Date.now()) return moment(mutes[playerName].unmuteDate).preciseDiff(moment());
            delete mutes[playerName];
            this.saveMutes();
            return null;
        }
        return null;
    }
    static playerMuteDuration(playerName: string): number | null {
        if (!!mutes[playerName]) {
            if (mutes[playerName].unmuteDate === null) return Infinity;
            if (mutes[playerName].unmuteDate > Date.now()) return mutes[playerName].unmuteDate - mutes[playerName].muteDate;
            delete mutes[playerName];
            this.saveMutes();
            return null;
        }
        return null;
    }
    static playerMuteDurationFormatted(playerName: string): string | null {
        if (!!mutes[playerName]) {
            if (mutes[playerName].unmuteDate === null) return "permanent";
            if (mutes[playerName].unmuteDate > Date.now()) return moment(mutes[playerName].unmuteDate).preciseDiff(moment(mutes[playerName].muteDate));
            delete mutes[playerName];
            this.saveMutes();
            return null;
        }
        return null;
    }

    static saveMutes(): void {
        try {
            saveStringToDynamicProperties(JSON.stringify(mutes), "mutes");
        } catch (e) {
            console.error("§cError saving mutes:", e, e.stack);
        }
    }
    static refreshMutes(): void {
        try {
            mutes = JSON.parse(getStringFromDynamicProperties("mutes", "{}"));
        } catch (e) {
            console.error("§cError parsing mutes:", e, e.stack);
        }
    }
}

ModerationActions.refreshMutes();
