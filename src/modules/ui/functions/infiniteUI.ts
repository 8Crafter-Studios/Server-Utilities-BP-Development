import type { Player } from "@minecraft/server";
import { ActionFormData } from "@minecraft/server-ui";

export async function infiniteUI(player: Player): Promise<any | Error> {
    return await new ActionFormData()
        .title("Infinite Form")
        .body("You are now trapped in an infinite form.")
        .button("Okay")
        .forceShow(player, Infinity)
        .then(
            () => infiniteUI(player),
            (e) => (console.error(e, e?.stack), e)
        );
}
