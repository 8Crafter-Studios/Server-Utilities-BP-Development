import type { Player, RawMessage } from "@minecraft/server";
import { MessageFormData } from "@minecraft/server-ui";
import { forceShow } from "../../../modules/ui/functions/forceShow";

export async function showMessage(player: Player, title?: RawMessage | string, body?: string, button1?: string, button2?: string) {
    const form = new MessageFormData;
    if (!!title) { form.title(title); }
    if (!!body) { form.body(body); }
    if (!!button1) { form.button1(button1); }
    if (!!button2) { form.button2(button2); }
    return forceShow(form, player);
}
