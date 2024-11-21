import { Player, system } from "@minecraft/server";
import { uiManager, ActionFormData } from "@minecraft/server-ui";

export function infiniteUIv4(
    player: Player,
    interval: number = 1,
    title: string = "Infinite Form",
    body: string = "You are now trapped in an infinite form.",
    button: string = "Okay"
): number {
    return system.runInterval(async () => {
        uiManager.closeAllForms(player);
        await new ActionFormData()
            .title(title)
            .body(body)
            .button(button)
            .forceShow(player, interval);
        uiManager.closeAllForms(player);
        await new ActionFormData()
            .title(title)
            .body(body)
            .button(button)
            .forceShow(player, interval);
        uiManager.closeAllForms(player);
        await new ActionFormData()
            .title(title)
            .body(body)
            .button(button)
            .forceShow(player, interval);
        uiManager.closeAllForms(player);
        await new ActionFormData()
            .title(title)
            .body(body)
            .button(button)
            .forceShow(player, interval);
        uiManager.closeAllForms(player);
        return await new ActionFormData()
            .title(title)
            .body(body)
            .button(button)
            .forceShow(player, interval);
    }, interval);
}
