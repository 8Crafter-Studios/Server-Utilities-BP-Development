import { Entity, Player, world } from "@minecraft/server";
import { ModalFormData, ModalFormResponse } from "@minecraft/server-ui";
import { forceShow } from "modules/ui/functions/forceShow";
import { executeCommandPlayerW } from "modules/commands/classes/executeCommandPlayerW";
import { settings } from "./settings";

export function evalAutoScriptSettings(
    sourceEntitya: Entity | executeCommandPlayerW | Player
) {
    const sourceEntity = sourceEntitya instanceof executeCommandPlayerW
        ? sourceEntitya.player
        : sourceEntitya;
    let form2 = new ModalFormData();
    let players = world.getAllPlayers();
    let targetList = [players[0].nameTag];
    for (const index in players) {
        if (Number(index) != 0) {
            targetList = String([
                String(targetList),
                players[index].nameTag,
            ]).split(",");
        }
    }
    form2.title("§r§0Eval Auto Script Settings (§nDEPRECATED§r§0)");
    form2.textField(
        "evalBeforeEvents:chatSend",
        "JavaScript Script API Code",
        String(world.getDynamicProperty("evalBeforeEvents:chatSend") ?? "")
    );
    form2.textField(
        "evalBeforeEvents:dataDrivenEntityTrggerEvent",
        "JavaScript Script API Code",
        String(
            world.getDynamicProperty(
                "evalBeforeEvents:dataDrivenEntityTriggerEvent"
            ) ?? ""
        )
    );
    form2.textField(
        "evalBeforeEvents:effectAdd",
        "JavaScript Script API Code",
        String(world.getDynamicProperty("evalBeforeEvents:effectAdd") ?? "")
    );
    form2.textField(
        "evalBeforeEvents:entityRemove",
        "JavaScript Script API Code",
        String(world.getDynamicProperty("evalBeforeEvents:entityRemove"))
    );
    form2.textField(
        "evalBeforeEvents:explosion",
        "JavaScript Script API Code",
        String(world.getDynamicProperty("evalBeforeEvents:explosion"))
    );
    form2.textField(
        "evalBeforeEvents:itemDefinitionEvent",
        "JavaScript Script API Code",
        String(
            world.getDynamicProperty("evalBeforeEvents:itemDefinitionEvent") ??
            ""
        )
    );
    form2.textField(
        "evalBeforeEvents:itemUse",
        "JavaScript Script API Code",
        String(world.getDynamicProperty("evalBeforeEvents:itemUse") ?? "")
    );
    form2.textField(
        "evalBeforeEvents:itemUseOn",
        "JavaScript Script API Code",
        String(world.getDynamicProperty("evalBeforeEvents:itemUseOn") ?? "")
    );
    form2.textField(
        "evalBeforeEvents:pistonActivate",
        "JavaScript Script API Code",
        String(
            world.getDynamicProperty("evalBeforeEvents:pistonActivate") ?? ""
        )
    );
    form2.textField(
        "evalBeforeEvents:playerBreakBlock",
        "JavaScript Script API Code",
        String(
            world.getDynamicProperty("evalBeforeEvents:playerBreakBlock") ?? ""
        )
    );
    form2.textField(
        "evalBeforeEvents:playerInteractWithBlock",
        "JavaScript Script API Code",
        String(
            world.getDynamicProperty(
                "evalBeforeEvents:playerInteractWithBlock"
            ) ?? ""
        )
    );
    form2.textField(
        "evalBeforeEvents:playerInteractWithEntity",
        "JavaScript Script API Code",
        String(
            world.getDynamicProperty(
                "evalBeforeEvents:playerInteractWithEntity"
            ) ?? ""
        )
    );
    form2.textField(
        "evalBeforeEvents:playerLeave",
        "JavaScript Script API Code",
        String(world.getDynamicProperty("evalBeforeEvents:playerLeave") ?? "")
    );
    form2.textField(
        "evalBeforeEvents:playerPlaceBlock",
        "JavaScript Script API Code",
        String(
            world.getDynamicProperty("evalBeforeEvents:playerPlaceBlock") ?? ""
        )
    );
    form2.textField(
        "evalAfterEvents:blockExplode",
        "JavaScript Script API Code",
        String(world.getDynamicProperty("evalAfterEvents:blockExplode") ?? "")
    );
    form2.textField(
        "evalAfterEvents:playerLeave",
        "JavaScript Script API Code",
        String(world.getDynamicProperty("evalAfterEvents:playerLeave") ?? "")
    );
    form2.textField(
        "evalAfterEvents:entityDie",
        "JavaScript Script API Code",
        String(world.getDynamicProperty("evalAfterEvents:entityDie") ?? "")
    ); /*
    form2.textField("Slot Number", "Slot Number", "0");
    form2.dropdown("Player Target", String(targetList).split(","), 0)
    form2.dropdown("Player Viewer", String(targetList).split(","), 0)
    form2.toggle("Debug2", false);*/




    form2.submitButton("Save");
    forceShow(form2, sourceEntity as Player)
        .then((to) => {
            let t = to as ModalFormResponse;
            if (t.canceled) {
                settings(sourceEntity);
                return;
            }

            let [
                becs, beddete, beea, beer, bee, beide, beiu, beiuo, bepa, bepbb, bepiwb, bepiwe, bepl, beppb, aebe, aepl, aeed,
            ] = t.formValues;
            world.setDynamicProperty("evalBeforeEvents:chatSend", becs);
            world.setDynamicProperty(
                "evalBeforeEvents:dataDrivenEntityTrggerEvent",
                beddete
            );
            world.setDynamicProperty("evalBeforeEvents:effectAdd", beea);
            world.setDynamicProperty("evalBeforeEvents:entityRemove", beer);
            world.setDynamicProperty("evalBeforeEvents:explosion", bee);
            world.setDynamicProperty(
                "evalBeforeEvents:itemDefinitionEvent",
                beide
            );
            world.setDynamicProperty("evalBeforeEvents:itemUse", beiu);
            world.setDynamicProperty("evalBeforeEvents:itemUseOn", beiuo);
            world.setDynamicProperty("evalBeforeEvents:pistonActivate", bepa);
            world.setDynamicProperty(
                "evalBeforeEvents:playerBreakBlock",
                bepbb
            );
            world.setDynamicProperty(
                "evalBeforeEvents:playerInteractWithBlock",
                bepiwb
            );
            world.setDynamicProperty(
                "evalBeforeEvents:playerInteractWithEntity",
                bepiwe
            );
            world.setDynamicProperty("evalBeforeEvents:playerLeave", bepl);
            world.setDynamicProperty(
                "evalBeforeEvents:playerPlaceBlock",
                beppb
            );
            world.setDynamicProperty("evalAfterEvents:blockExplode", aebe);
            world.setDynamicProperty("evalAfterEvents:playerLeave", aepl);
            world.setDynamicProperty("evalAfterEvents:entityDie", aeed);
            settings(sourceEntity);
        })
        .catch((e) => {
            console.error(e, e.stack);
        });
}
