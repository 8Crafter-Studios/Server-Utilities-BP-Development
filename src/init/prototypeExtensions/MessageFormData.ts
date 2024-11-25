import { Player, system } from "@minecraft/server";
import {
    MessageFormData,
    type MessageFormResponse,
} from "@minecraft/server-ui";

Object.defineProperty(MessageFormData.prototype, "forceShow", {
    value: async function forceShow(
        player: Player,
        timeout?: number
    ): Promise<MessageFormResponse> {
        const timeoutTicks = system.currentTick + (timeout ?? 9999);
        while (system.currentTick <= timeoutTicks) {
            const r = await (this as MessageFormData).show(player as any);
            if (r.cancelationReason != "UserBusy" || r.canceled == false) {
                return r as any;
            }
        }
    },
    configurable: true,
    enumerable: true,
    writable: true,
});
declare module "@minecraft/server-ui" {
    interface MessageFormData {
        /**
         * Forces a form to show even if the player has another form or menu open.
         * If the player has another form or menu open then it will wait until they close it.
         * @param {Player} player The player to show the form to
         * @param {number} timeout The number of ticks before the function will give up and throw an error, it defaults to 9999
         * @returns {MessageFormResponse|undefined} The response of the form
         */
        forceShow(
            player: Player,
            timeout?: number
        ): Promise<MessageFormResponse>;
    }
}
