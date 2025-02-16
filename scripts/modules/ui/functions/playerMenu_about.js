import { Entity, Player } from "@minecraft/server";
import { ActionFormData, ActionFormResponse } from "@minecraft/server-ui";
import { forceShow } from "modules/ui/functions/forceShow";
import { executeCommandPlayerW } from "modules/commands/classes/executeCommandPlayerW";
import { showActions } from "modules/utilities/functions/showActions";
import { playerMenu_about_contributors } from "./playerMenu_about_contributors";
export async function playerMenu_about(sourceEntitya) {
    const sourceEntity = sourceEntitya instanceof executeCommandPlayerW ? sourceEntitya.player : sourceEntitya;
    if (!(sourceEntity instanceof Player)) {
        throw new TypeError("Invalid Player. Expected an instance of the Player class, or an instance of the executeCommandPlayerW class with a Player linked to it, but instead got " +
            (typeof sourceEntity == "object"
                ? sourceEntity === null
                    ? "object[null]"
                    : "object[" + (sourceEntity.constructor.name ?? "unknown") + "]"
                : typeof sourceEntity) +
            ".");
    }
    let form = new ActionFormData();
    form.title("About");
    form.body("8Crafter's Debug Sticks, Chat Ranks, Custom UI, and JavaScript Commands/Script REPL and Server Utilities v" + format_version);
    form.button("Links", "textures/ui/external_link");
    form.button("Contributors", "textures/ui/8Crafter");
    form.button("Back", "textures/ui/arrow_left");
    form.button("Close", "textures/ui/crossout");
    return await forceShow(form, sourceEntity)
        .then(async (ra) => {
        let r = ra;
        // This will stop the code when the player closes the form
        if (r.canceled)
            return 1;
        switch (["links", "contributors", "back", "close"][r.selection]) {
            case "links":
                if ((await showActions(sourceEntity, "Links", "§dModBay§r Page/Download Page: §bhttps://modbay.org/mods/1240-8crafters-debug-sticks.html§r\n§aWiki for the Add-On: §bhttps://wiki.8crafter.com/andexdb/§r\n§cMy YouTube Channel: §bhttps://youtube.com/@8crafter§r\n§aMy Website: §bhttps://www.8crafter.com§r\n§dDiscord: §bhttps://discord.gg/rQZ2a4286E§r", ["Back", "textures/ui/arrow_left"], ["Close", "textures/ui/crossout"])).selection == 0) {
                    return await playerMenu_about(sourceEntity);
                }
                else {
                    return 0;
                }
            case "contributors":
                if ((await playerMenu_about_contributors(sourceEntity)) == 1) {
                    return await playerMenu_about(sourceEntity);
                }
                else {
                    return 0;
                }
            case "back":
                return 1;
            case "close":
                return 0;
            default:
                return 1;
        }
    })
        .catch((e) => {
        console.error(e, e.stack);
        return 0;
    });
}
//# sourceMappingURL=playerMenu_about.js.map