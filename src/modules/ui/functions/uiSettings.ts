import type { Entity, Player } from "@minecraft/server";
import { ModalFormData, ModalFormResponse } from "@minecraft/server-ui";
import { config } from "Main";
import { forceShow } from "modules/ui/functions/forceShow";
import { executeCommandPlayerW } from "modules/commands/classes/executeCommandPlayerW";
import { settings } from "./settings";

export function uiSettings(
    sourceEntitya: Entity | executeCommandPlayerW | Player
) {
    const sourceEntity = sourceEntitya instanceof executeCommandPlayerW
        ? sourceEntitya.player
        : sourceEntitya;
    let form2 = new ModalFormData();
    ("andexdbSettings:autoEscapeChatMessages");
    ("andexdbSettings:autoURIEscapeChatMessages");
    ("andexdbSettings:allowChatEscapeCodes");
    form2.title("UI Settings");
    form2.textField(
        "§l§fmaxPlayersPerManagePlayersPage§r§f\nThe maximum number of players to display at once on the manage players menu, the default is 10",
        "integer from 1-1000",
        String(config.ui.pages.maxPlayersPerManagePlayersPage)
    );
    form2.toggle(
        "§l§fuseStarWarsReference404Page§r§f\nWhether or not to use the Star Wars reference version of the 404 page, the default is false",
        config.ui.other.useStarWarsReference404Page
    );
    form2.submitButton("Save");
    forceShow(form2, sourceEntity as Player)
        .then((to) => {
            let t = to as ModalFormResponse;
            if (t.canceled) {
                settings(sourceEntity);
                return;
            } /*
    GameTest.Test.prototype.spawnSimulatedPlayer({x: 0, y: 0, z: 0})*/ /*
        ${se}GameTest.Test.prototype.spawnSimulatedPlayer({x: 0, y: 0, z: 0})*/



            let [maxPlayersPerManagePlayersPage, useStarWarsReference404Page] = t.formValues as [
                maxPlayersPerManagePlayersPage: string,
                useStarWarsReference404Page: boolean
            ];
            config.ui.pages.maxPlayersPerManagePlayersPage =
                maxPlayersPerManagePlayersPage.toNumber();
            config.ui.other.useStarWarsReference404Page =
                useStarWarsReference404Page;
            settings(sourceEntity);
        })
        .catch((e) => {
            console.error(e, e.stack);
        });
}
