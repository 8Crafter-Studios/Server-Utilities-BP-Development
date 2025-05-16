import { Player, system } from "@minecraft/server";
import type { ModalFormData, ActionFormData, MessageFormData, ModalFormResponse, ActionFormResponse, MessageFormResponse } from "@minecraft/server-ui";

/**
 * Forces a form to show even if the player has another form or menu open.
 *
 * If the player has another form or menu open then it will wait until they close it.
 *
 * @param {ModalFormData|ActionFormData|MessageFormData} form The form to show
 * @param {Player} player The player to show the form to
 * @param {number} timeout The number of ticks before the function will give up and return the failed response, it defaults to 9999
 * @returns {ModalFormResponse|ActionFormResponse|MessageFormResponse} The response of the form
 */
export async function forceShow<T extends ModalFormData | ActionFormData | MessageFormData>(
    form: T,
    player: Player,
    timeout?: number
): Promise<T extends ModalFormData ? ModalFormResponse : T extends ActionFormData ? ActionFormResponse : MessageFormResponse> {
    const timeoutTicks = system.currentTick + (timeout ?? 9999);
    let r: T extends ModalFormData ? ModalFormResponse : T extends ActionFormData ? ActionFormResponse : MessageFormResponse;
    while (system.currentTick <= timeoutTicks) {
        r = (await form.show(player)) as T extends ModalFormData ? ModalFormResponse : T extends ActionFormData ? ActionFormResponse : MessageFormResponse;
        if (r.cancelationReason != "UserBusy" || r.canceled == false) {
            return r;
        }
    }
    return r!;
}

