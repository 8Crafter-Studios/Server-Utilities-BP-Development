import { executeCommandPlayerW } from "../../../Main/commands";
export function entityController(sourceEntitya) {
    const sourceEntity = sourceEntitya instanceof executeCommandPlayerW
        ? sourceEntitya.player
        : sourceEntitya;
}
//# sourceMappingURL=entityController.js.map