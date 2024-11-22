import type { Entity, Player } from "@minecraft/server";
import { ModalFormData, ModalFormResponse } from "@minecraft/server-ui";
import { config } from "Main";
import { forceShow } from "modules/ui/functions/forceShow";
import { executeCommandPlayerW } from "modules/commands/classes/executeCommandPlayerW";
import { moderationSettings } from "./moderationSettings";

export function antispamSettings(
    sourceEntitya: Entity | executeCommandPlayerW | Player
) {
    const sourceEntity = sourceEntitya instanceof executeCommandPlayerW
        ? sourceEntitya.player
        : sourceEntitya;
    let form2 = new ModalFormData();
    form2.title("Anti-Spam Settings [§cExperimental§r]");
    form2.toggle(
        "§l§fAnti-Spam Enabled§r§f",
        config.antiSpamSystem.antispamEnabled
    );
    form2.toggle(
        "§l§fReset Anti-Spam Mute Timer Upon Attempted Message Send While Muted§r§f",
        config.antiSpamSystem
            .restartAntiSpamMuteTimerUponAttemptedMessageSendDuringMute
    );
    form2.textField(
        "§l§fWait time before player can send another chat message in seconds§r§f",
        "60",
        String(config.antiSpamSystem.waitTimeAfterAntispamActivation)
    );
    form2.textField(
        "§f(The anti-spam will only activate if the player sends a number of messages equal to (§bMessage count to trigger anti-spam§f) and those messages each had a delay of at most (§bMaximum time between messages§f) seconds between them)\n§lMaximum time between messages, §r§f",
        "5",
        String(config.antiSpamSystem.maxTimeBewteenMessagesToTriggerAntiSpam)
    );
    form2.slider(
        "§l§fMessage count to trigger anti-spam, defaults to 4§r§f",
        1,
        100,
        1,
        config.antiSpamSystem.antispamTriggerMessageCount
    );
    form2.submitButton("Save");
    forceShow(form2, sourceEntity as Player)
        .then((to) => {
            let t = to as ModalFormResponse;
            if (t.canceled) {
                moderationSettings(sourceEntity);
                return;
            } /*
    GameTest.Test.prototype.spawnSimulatedPlayer({x: 0, y: 0, z: 0})*/ /*
        ${se}GameTest.Test.prototype.spawnSimulatedPlayer({x: 0, y: 0, z: 0})*/



            let [
                antispamEnabled, restartAntiSpamMuteTimerUponAttemptedMessageSendDuringMute, waitTimeAfterAntispamActivation, maxTimeBewteenMessagesToTriggerAntiSpam, antispamTriggerMessageCount,
            ] = t.formValues;
            config.antiSpamSystem.antispamEnabled = antispamEnabled as boolean;
            config.antiSpamSystem.restartAntiSpamMuteTimerUponAttemptedMessageSendDuringMute =
                restartAntiSpamMuteTimerUponAttemptedMessageSendDuringMute as boolean;
            config.antiSpamSystem.waitTimeAfterAntispamActivation = isNaN(
                Number(waitTimeAfterAntispamActivation)
            )
                ? 60
                : Number(waitTimeAfterAntispamActivation);
            config.antiSpamSystem.maxTimeBewteenMessagesToTriggerAntiSpam =
                isNaN(Number(maxTimeBewteenMessagesToTriggerAntiSpam))
                    ? 5
                    : Number(maxTimeBewteenMessagesToTriggerAntiSpam);
            config.antiSpamSystem.antispamTriggerMessageCount = Number(
                antispamTriggerMessageCount
            );
            moderationSettings(sourceEntity);
        })
        .catch((e) => {
            console.error(e, e.stack);
        });
}
