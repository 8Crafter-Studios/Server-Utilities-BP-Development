export const generateMinecraftSphereBGProgress = {} as {
    [k: string]: {
        done: boolean;
        startTick: number;
        endTick?: number;
        startTime: number;
        endTime?: number;
        containsUnloadedChunks: boolean;
    };
};
