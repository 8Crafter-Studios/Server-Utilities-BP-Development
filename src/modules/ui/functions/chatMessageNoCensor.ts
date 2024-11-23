import { Entity, Player, system, world } from "@minecraft/server";
import { ModalFormData, ModalFormResponse } from "@minecraft/server-ui";
import { forceShow } from "modules/ui/functions/forceShow";
import { chatMessage } from "modules/chat/functions/chatMessage";
import { executeCommandPlayerW } from "modules/commands/classes/executeCommandPlayerW";

export function chatMessageNoCensor(
    sourceEntitya: Entity | executeCommandPlayerW | Player,
    bypassChatInputRequests = false
) {
    const sourceEntity = sourceEntitya instanceof executeCommandPlayerW
        ? sourceEntitya.player
        : sourceEntitya;
    system.run(() => {
        let form = new ModalFormData();
        let playerList = world.getAllPlayers();
        form.title("Chat");
        form.textField("Chat Message / Command", "Chat Message / Command");
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

                chatMessage(
                    {
                        cancel: false,
                        message: message as string,
                        sender: playerList[asPlayer as number] ??
                            (sourceEntity as Player),
                    },
                    bypassChatInputRequests
                );
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
