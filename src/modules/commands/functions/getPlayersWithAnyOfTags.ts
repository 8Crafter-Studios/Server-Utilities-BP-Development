import { world } from "@minecraft/server";

export function getPlayersWithAnyOfTags(tags: string | string[]) {
    return tags instanceof Array
        ? world.getAllPlayers().filter((p) => tags.some((t) => p.hasTag(t)))
        : world.getAllPlayers().filter((p) => p.hasTag(tags));
}
