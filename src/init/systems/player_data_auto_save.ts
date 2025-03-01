import { startPlayerDataAutoSave } from "modules/player_save/functions/playerDataAutoSave";

if (Boolean(world.getDynamicProperty("andexdbSettings:autoSavePlayerData") ?? true) === true) {
    startPlayerDataAutoSave();
}
