import type { Entity, Player } from "@minecraft/server";


export function despawnEntities(
    targets: (Entity | Player)[],
    enableStrictErrorThrowing: boolean = false,
    disableExtraErrorReporting: boolean = false
) {
    targets.forEach((target) => {
        try {
            target.remove();
        } catch (e) {
            if (enableStrictErrorThrowing) {
                throw e;
            } else if (!disableExtraErrorReporting) {
                console.error(e, e.stack);
            }
        }
    });
}
