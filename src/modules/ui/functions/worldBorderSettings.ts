import type { Entity, Player } from "@minecraft/server";
import { ModalFormData } from "@minecraft/server-ui";
import { config } from "init/classes/config";
import { forceShow } from "modules/ui/functions/forceShow";
import { executeCommandPlayerW } from "modules/commands/classes/executeCommandPlayerW";
import { worldBorderSettingsDimensionSelector } from "./worldBorderSettingsDimensionSelector";

export function worldBorderSettings(
    sourceEntitya: Entity | executeCommandPlayerW | Player,
    dimension: number = 0
) {
    const sourceEntity = sourceEntitya instanceof executeCommandPlayerW
        ? sourceEntitya.player
        : sourceEntitya;
    let form2 = new ModalFormData();
    const configobj = config.worldBorder[dimensionse[dimension]];
    form2.title(
        `${["Overworld", "Nether", "The End"][dimension]} World Border Settings`
    );
    form2.toggle(
        `§l§fEnabled§r§f\nWhether or not the ${["overworld", "nether", "the end"][dimension]} world border is enabled, default is false`,
        configobj.enabled
    );
    form2.toggle(
        `§l§fPrevent World Interaction§r§f\nWhether or not to prevent players form interacting with the world when outside of the ${["overworld", "nether", "the end"][dimension]} world border, default is false`,
        configobj.preventWorldInteractionOutsideBorder
    );
    form2.toggle(
        `§l§fShow Red Screen Outline For When Outside Border§r§f\nWhether or not to show a red outline around the screen for players that are outside of the ${["overworld", "nether", "the end"][dimension]} world border, default is true`,
        configobj.showRedScreenOutlineWhenOutsideBorder
    );
    form2.toggle(
        `§l§fShow Border Particles§r§f\nWhether or not to show border particles on the boundaries of the ${["overworld", "nether", "the end"][dimension]} world border, default is true`,
        configobj.showBorderParticles
    ); /*
    form2.toggle(`§l§fWarn Players With Actionbar§r§f\nWhether or not to show a warning in the actionbar when the player in outside of the world border, default is false`, configobj.showActionbarWarningWhenOutsideBorder)
    form2.toggle(`§l§fWarn Players In Chat§r§f\nWhether or not to show a warning in the chat when the player in outside of the world border, default is false`, configobj.warnPlayersInChat)*/


    form2.dropdown(
        `§l§fMode§r§f\nThe mode of the world border, default is Yeet Players`,
        ["Teleport Players", "Yeet Players", "Damage Players"],
        configobj.mode
    );
    form2.textField(
        `§l§fFrom§r§f\nThe first corner of the world border, each of the values in this should be smaller than their corresponding values in the "To" property, default is "-29999984 -29999984"`,
        "x z",
        `${configobj.from.x} ${configobj.from.z}`
    );
    form2.textField(
        `§l§fTo§r§f\nThe first corner of the world border, each of the values in this should be larger than their corresponding values in the "From" property, default is "29999984 29999984"`,
        "x z",
        `${configobj.to.x} ${configobj.to.z}`
    );
    form2.textField(
        `§l§fTint Intensity§r§f\nThe intensity of the screen tint that appears when you are outside of the world border (this value controls the intensity by changing how many particles will spawn), the default is 1`,
        "float",
        String(configobj.tintIntensity)
    );
    form2.textField(
        `§l§fBuffer§r§f\n(§cONLY APPLIES TO DAMAGE MODE§f)\nThe distance outside of the border that a player must be to start taking damage, the default is 5`,
        "float",
        String(configobj.buffer)
    );
    form2.textField(
        `§l§fDamage§r§f\n(§cONLY APPLIES TO DAMAGE MODE§f)\nThe amount of damage to apply, the default is 1`,
        "float",
        String(configobj.damage)
    );
    form2.textField(
        `§l§fHorizontal Knockback§r§f\n(§bONLY APPLIES TO YEET MODE§f)\nThe amount of horizontal knockback to apply, the default is 2.5`,
        "float",
        String(configobj.knockbackH)
    );
    form2.textField(
        `§l§fVertical Knockback§r§f\n(§bONLY APPLIES TO YEET MODE§f)\nThe amount of vertical knockback to apply, the default is 1.25`,
        "float",
        String(configobj.knockbackV)
    );
    form2.submitButton("Save");
    forceShow(form2, sourceEntity as Player)
        .then((t) => {
            if (t.canceled) {
                worldBorderSettingsDimensionSelector(sourceEntity);
                return;
            } /*
    GameTest.Test.prototype.spawnSimulatedPlayer({x: 0, y: 0, z: 0})*/ /*
        ${se}GameTest.Test.prototype.spawnSimulatedPlayer({x: 0, y: 0, z: 0})*/



            let [
                enabled, preventWorldInteraction, showRedScreenOutlineWhenOutsideBorder, showBorderParticles /*, showActionbarWarningWhenOutsideBorder, warnPlayersInChat*/, mode, from, to, tintIntensity, buffer, damage, knockbackH, knockbackV,
            ] = t.formValues as [
                enabled: boolean,
                preventWorldInteraction: boolean,
                showRedScreenOutlineWhenOutsideBorder: boolean,
                showBorderParticles: boolean /*, showActionbarWarningWhenOutsideBorder: boolean, warnPlayersInChat: boolean*/,
                mode: 0 | 1 | 2,
                from: `${number | null} ${number | null}` | "",
                to: `${number | null} ${number | null}` | "",
                tintIntensity: `${number}` | "",
                buffer: string,
                damage: string,
                knockbackH: string,
                knockbackV: string
            ];
            configobj.enabled = enabled;
            configobj.preventWorldInteractionOutsideBorder =
                preventWorldInteraction;
            configobj.showRedScreenOutlineWhenOutsideBorder =
                showRedScreenOutlineWhenOutsideBorder;
            configobj.showBorderParticles = showBorderParticles; /*
    configobj.showActionbarWarningWhenOutsideBorder=showActionbarWarningWhenOutsideBorder
    configobj.warnPlayersInChat=warnPlayersInChat*/


            configobj.mode = mode;
            configobj.from =
                from == ""
                    ? undefined
                    : {
                        x: JSON.parse(from.split(" ")[0]),
                        z: JSON.parse(from.split(" ")[1]),
                    };
            configobj.to =
                to == ""
                    ? undefined
                    : {
                        x: JSON.parse(to.split(" ")[0]),
                        z: JSON.parse(to.split(" ")[1]),
                    };
            configobj.tintIntensity =
                tintIntensity == "" ? undefined : Number(tintIntensity);
            configobj.buffer = buffer == "" ? undefined : Number(buffer);
            configobj.damage = damage == "" ? undefined : Number(damage);
            configobj.knockbackH =
                knockbackH == "" ? undefined : Number(knockbackH);
            configobj.knockbackV =
                knockbackV == "" ? undefined : Number(knockbackV);
            worldBorderSettingsDimensionSelector(sourceEntity);
        })
        .catch((e) => {
            console.error(e, e.stack);
        });
}
