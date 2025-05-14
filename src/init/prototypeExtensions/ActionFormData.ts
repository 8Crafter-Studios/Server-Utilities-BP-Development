import { Player, system } from "@minecraft/server";
import { ActionFormData, ActionFormResponse } from "@minecraft/server-ui";

Object.defineProperty(ActionFormData.prototype, "forceShow", {
    value: async function forceShow(
        player: Player,
        timeout?: number
    ): Promise<ActionFormResponse> {
        const timeoutTicks = system.currentTick + (timeout ?? 9999);
        let r: ActionFormResponse;
        while (system.currentTick <= timeoutTicks) {
            r = await (this as ActionFormData).show(player);
            if (r.cancelationReason != "UserBusy" || r.canceled == false) {
                return r;
            }
        }
        return r!;
    },
    configurable: true,
    enumerable: true,
    writable: true,
});
declare module "@minecraft/server-ui" {
    interface ActionFormData {
        /**
         * Forces a form to show even if the player has another form or menu open.
         * If the player has another form or menu open then it will wait until they close it.
         *
         * @param {Player} player The player to show the form to
         * @param {number} [timeout=9999] The number of ticks before the function will give up and return the failed response, it defaults to 9999
         * @returns {Promise<ActionFormResponse>} The response of the form
         */
        forceShow(
            player: Player,
            timeout?: number
        ): Promise<ActionFormResponse>;
    }
}
