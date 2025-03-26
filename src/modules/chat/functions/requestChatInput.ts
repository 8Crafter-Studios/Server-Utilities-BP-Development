import { Player, type RawMessage, system } from "@minecraft/server";
import { currentlyRequestedChatInput } from "modules/chat/constants/currentlyRequestedChatInput";
import { idGenerator } from "modules/commands/functions/idGenerator";

export async function requestChatInput(player: Player, requestMessage?: string | RawMessage | (string | RawMessage)[]) {
    let id = idGenerator();
    !!requestMessage ? player.sendMessage(requestMessage) : undefined;
    !!!currentlyRequestedChatInput[player.id] ? currentlyRequestedChatInput[player.id] = { anyInput: { [id]: { time: Date.now(), id: id, request: requestMessage } }, conditionalInput: {} } : currentlyRequestedChatInput[player.id].anyInput[id] = { time: Date.now(), id: id, request: requestMessage };
    return new Promise((resolve: (value: string) => void, reject: (error: Error) => void) => {
        function a() {
            if (!player.isValid) { delete currentlyRequestedChatInput[player.id]; reject(new ReferenceError("The player that the input was requested from is no longer valid, most likely the have left the game.")); return; }; if (!!!currentlyRequestedChatInput[player.id].anyInput[id].input) {
                system.run(() => {
                    a();
                });
            } else { let input = currentlyRequestedChatInput[player.id].anyInput[id].input as string; delete currentlyRequestedChatInput[player.id].anyInput[id]; resolve(input); }
        }
        a();
    });
}
