import { Entity, Player, system, world } from "@minecraft/server";
import { ModalFormData, ModalFormResponse } from "@minecraft/server-ui";
import { forceShow } from "modules/ui/functions/forceShow";
import { chatSend } from "modules/chat/functions/chatSend";
import { executeCommandPlayerW } from "modules/commands/classes/executeCommandPlayerW";

export function chatSendNoCensor(
    sourceEntitya: Entity | executeCommandPlayerW | Player
) {
    const sourceEntity = sourceEntitya instanceof executeCommandPlayerW
        ? sourceEntitya.player
        : sourceEntitya;
    system.run(() => {
        let form = new ModalFormData();
        let playerList = world.getAllPlayers();
        form.title("Chat");
        form.textField("Chat Message", "Chat Message");
        form.dropdown(
            "As Player",
            playerList.map((p) => p.name),
            playerList.indexOf(sourceEntity as Player)
        );
        form.submitButton("Send");
        forceShow(form, sourceEntity as any)
            .then((ra) => {
                let r = ra as ModalFormResponse;
                // This will stop the code when the player closes the form
                if (r.canceled) return;
                // This will assign every input their own variable
                let [message, asPlayer] = r.formValues; /*
        console.warn(r.formValues);*/

                chatSend({
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
