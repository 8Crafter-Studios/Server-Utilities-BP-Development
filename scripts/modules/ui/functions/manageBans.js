import { Entity, Player, world } from "@minecraft/server";
import { ActionFormData, ActionFormResponse, ModalFormData, ModalFormResponse, MessageFormData } from "@minecraft/server-ui";
import { format_version } from "Main";
import { forceShow } from "modules/ui/functions/forceShow";
import { ban, ban_format_version } from "../../../Main/ban";
import { executeCommandPlayerW } from "../../../Main/commands";
import { mainMenu } from "./mainMenu";
export function manageBans(sourceEntitya, backMenuFunction = mainMenu) {
    const sourceEntity = sourceEntitya instanceof executeCommandPlayerW
        ? sourceEntitya.player
        : sourceEntitya;
    let form6 = new ActionFormData();
    form6.title("Manage Bans");
    ban.getValidBans().idBans.forEach((p) => {
        form6.button(`${p.playerId}\nValid`, "textures/ui/online");
    });
    ban.getExpiredBans().idBans.forEach((p) => {
        form6.button(`${p.playerId}\nExpired`, "textures/ui/Ping_Offline_Red");
    });
    ban.getValidBans().nameBans.forEach((p) => {
        form6.button(`${p.playerName}\nValid`, "textures/ui/online");
    });
    ban.getExpiredBans().nameBans.forEach((p) => {
        form6.button(`${p.playerName}\nExpired`, "textures/ui/Ping_Offline_Red");
    });
    let banList = ban
        .getValidBans()
        .idBans.concat(ban.getExpiredBans().idBans)
        .concat(ban.getValidBans().nameBans)
        .concat(ban.getExpiredBans().nameBans);
    form6.button("Add ID Ban");
    form6.button("Add Name Ban");
    form6.button("Back");
    forceShow(form6, sourceEntity)
        .then((ga) => {
        let g = ga;
        if (g.canceled) {
            backMenuFunction(sourceEntity);
            return;
        }
        switch (g.selection) {
            case banList.length:
                let form5 = new ModalFormData();
                form5.title(`Add ID Ban`);
                form5.textField("Player UUID\nThis is the uuid of the player. ", "Integer");
                form5.textField("Ban Time (In Minutes)", "Decimal");
                form5.textField("Reason", "JavaScript Object ex. `\nDate: ${new Date(D\nate\n.now()).toLo\ncaleString()}`", '"§cYOU HAVE BEEN BANNED BY THE BAN HAMMER\\nBanned By: {bannedByName}\\nBanned Until: {unbanDate}\\nBanned On: {banDate}\\nTime Remaining: {timeRemaining}"');
                form5.submitButton("Ban");
                forceShow(form5, sourceEntity)
                    .then((ha) => {
                    let h = ha;
                    if (h.canceled) {
                        return;
                    }
                    ban.saveBan({
                        removeAfterBanExpires: false,
                        ban_format_version: ban_format_version,
                        banDate: Date.now(),
                        playerId: String(h.formValues[0]),
                        originalPlayerName: undefined,
                        type: "id",
                        bannedById: sourceEntity.id,
                        bannedByName: sourceEntity?.name ??
                            sourceEntity?.nameTag,
                        banId: "banId:" +
                            Date.now() +
                            ":" +
                            String(h.formValues[0]),
                        unbanDate: Number(h.formValues[1]) * 60000 +
                            Date.now(),
                        format_version: format_version,
                        reason: String(h.formValues[2]),
                    });
                    backMenuFunction(sourceEntity);
                })
                    .catch((e) => {
                    let formError = new MessageFormData();
                    formError.body(e + e.stack);
                    formError.title("Error");
                    formError.button1("Done");
                    forceShow(formError, sourceEntity).then(() => {
                        return e;
                    });
                });
                break;
            case banList.length + 1:
                let form6 = new ModalFormData();
                form6.title(`Add Name Ban`);
                form6.textField("Player Name\nThis is the name of the player. ", "String");
                form6.textField("Ban Time (In Minutes)", "Decimal");
                form6.textField("Reason", "JavaScript Object ex. `Date:\n ${new\n Date(Date.now()).to\nLoca\nleString()}`", '"§cYOU HAVE BEEN BANNED BY THE BAN HAMMER\\nBanned By: {bannedByName}\\nBanned Until: {unbanDate}\\nBanned On: {banDate}\\nTime Remaining: {timeRemaining}"');
                form6.submitButton("Ban");
                forceShow(form6, sourceEntity)
                    .then((ha) => {
                    let h = ha;
                    if (h.canceled) {
                        return;
                    }
                    ban.saveBan({
                        removeAfterBanExpires: false,
                        ban_format_version: ban_format_version,
                        banDate: Date.now(),
                        originalPlayerId: undefined,
                        playerName: String(h.formValues[0]),
                        type: "name",
                        bannedById: sourceEntity.id,
                        bannedByName: sourceEntity?.name ??
                            sourceEntity?.nameTag,
                        banId: "ban:" +
                            Date.now() +
                            ":" +
                            String(h.formValues[0]),
                        unbanDate: Number(h.formValues[1]) * 60000 +
                            Date.now(),
                        format_version: format_version,
                        reason: String(h.formValues[2]),
                    });
                    backMenuFunction(sourceEntity);
                })
                    .catch((e) => {
                    let formError = new MessageFormData();
                    formError.body(e + e.stack);
                    formError.title("Error");
                    formError.button1("Done");
                    forceShow(formError, sourceEntity).then(() => {
                        return e;
                    });
                });
                break;
            case banList.length + 2:
                backMenuFunction(sourceEntity);
                break; /*
    case banList.length+3:
    backMenuFunction(sourceEntity)
    break
    case banList.length+4:
    backMenuFunction(sourceEntity)*/
                break;
            default:
                let form4 = new ActionFormData();
                form4.title(`Manage Ban`);
                let ba = banList[g.selection];
                let timeRemaining = ba.timeRemaining;
                form4.body(`§bformat_version: §e${ba.format_version}\n§r§bban_format_version: §e${ba.ban_format_version}\n§r§bbanId: §6${ba.banId}\n§r§btype: §a${ba.type}\ntimeRemaining: ${timeRemaining.days}d, ${timeRemaining.hours}h ${timeRemaining.minutes}m ${timeRemaining.seconds}s ${timeRemaining.milliseconds}ms\n§r§bbanDate: §q${new Date(Number(ba.banDate) +
                    Number(sourceEntity.getDynamicProperty("andexdbPersonalSettings:timeZone") ??
                        world.getDynamicProperty("andexdbSettings:timeZone") ??
                        0) *
                        3600000).toLocaleString() +
                    (Number(sourceEntity.getDynamicProperty("andexdbPersonalSettings:timeZone") ??
                        world.getDynamicProperty("andexdbSettings:timeZone") ??
                        0) < 0
                        ? " GMT"
                        : " GMT+") +
                    Number(sourceEntity.getDynamicProperty("andexdbPersonalSettings:timeZone") ??
                        world.getDynamicProperty("andexdbSettings:timeZone") ??
                        0)}\n§r§bunbanDate: §q${new Date(Number(ba.unbanDate) +
                    Number(sourceEntity.getDynamicProperty("andexdbPersonalSettings:timeZone") ??
                        world.getDynamicProperty("andexdbSettings:timeZone") ??
                        0) *
                        3600000).toLocaleString() +
                    (Number(sourceEntity.getDynamicProperty("andexdbPersonalSettings:timeZone") ??
                        world.getDynamicProperty("andexdbSettings:timeZone") ??
                        0) < 0
                        ? " GMT"
                        : " GMT+") +
                    Number(sourceEntity.getDynamicProperty("andexdbPersonalSettings:timeZone") ??
                        world.getDynamicProperty("andexdbSettings:timeZone") ??
                        0)}\n§r§b${ba.type == "id" ? "playerId" : "originalPlayerId"}: §6${ba.type == "id" ? ba.playerId : ba.originalPlayerId}\n§r§b${ba.type == "id"
                    ? "originalPlayerName"
                    : "playerName"}: §6${ba.type == "id"
                    ? ba.originalPlayerName
                    : ba.playerName}\n§r§bbannedByName: §a${ba.bannedByName}\n§r§bbannedById: §6${ba.bannedById}\n§r§bremoveAfterBanExpires: §d${ba.removeAfterBanExpires}\n§r§breason: §r§f${ba.reason}\n§r§b${
                /*JSON.stringify(banList[g.selection]).replaceAll(/(?<!\\)(?![},:](\"|{\"))\"/g, "§r§f\"")*/ ""}`);
                form4.button("Unban");
                form4.button("Back");
                forceShow(form4, sourceEntity)
                    .then((ha) => {
                    let h = ha;
                    if (h.canceled) {
                        return;
                    }
                    if (h.selection == 0) {
                        banList[g.selection].remove();
                        backMenuFunction(sourceEntity);
                    }
                    if (h.selection == 1) {
                        backMenuFunction(sourceEntity);
                    }
                })
                    .catch((e) => {
                    let formError = new MessageFormData();
                    formError.body(e + e.stack);
                    formError.title("Error");
                    formError.button1("Done");
                    forceShow(formError, sourceEntity).then(() => {
                        return e;
                    });
                });
        }
    })
        .catch((e) => {
        let formError = new MessageFormData();
        formError.body(e + e.stack);
        formError.title("Error");
        formError.button1("Done");
        forceShow(formError, sourceEntity).then(() => {
            return e;
        });
    });
}
//# sourceMappingURL=manageBans.js.map