import { Entity, Player, system, world } from "@minecraft/server";
import { ModalFormData, ModalFormResponse } from "@minecraft/server-ui";
import { forceShow } from "modules/ui/functions/forceShow";
import { executeCommandPlayerW, chatCommands } from "../../../Main/commands";

export function chatCommandRunner(
    sourceEntitya: Entity | executeCommandPlayerW | Player
) {
    const sourceEntity = sourceEntitya instanceof executeCommandPlayerW
        ? sourceEntitya.player
        : sourceEntitya;
    system.run(() => {
        let form = new ModalFormData();
        let playerList = world.getAllPlayers();
        form.title("Chat Command Runner");
        form.textField("Chat Command", "Chat Command");
        form.dropdown(
            "As Player",
            playerList.map((p) => p.name),
            playerList.indexOf(sourceEntity as Player)
        );
        form.submitButton("Run Chat Command");
        forceShow(form, sourceEntity as any)
            .then((ra) => {
                let r = ra as ModalFormResponse;
                // This will stop the code when the player closes the form
                if (r.canceled) return;
                // This will assign every input their own variable
                let [message, asPlayer] = r.formValues; /*
        console.warn(r.formValues);*/

                chatCommands({
                    returnBeforeChatSend: false,
                    player: playerList[asPlayer as number] ??
                        (sourceEntity as Player),
                    newMessage: message as string,
                    event: {
                        cancel: false,
                        message: message as string,
                        sender: playerList[asPlayer as number] ??
                            (sourceEntity as Player),
                    },
                    eventData: {
                        cancel: false,
                        message: message as string,
                        sender: playerList[asPlayer as number] ??
                            (sourceEntity as Player),
                    },
                    fromExecute: true,
                });
                // Do something
            })
            .catch((e) => {
                console.error(e, e.stack);
            });
    }); /*
    try { (sourceEntity).runCommand(String("/scriptevent andexdb:commandRunner hisa")); }
    // Do something
catch(e) {
    console.error(e, e.stack);
};*/





}
