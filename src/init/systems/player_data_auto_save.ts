import { startPlayerDataAutoSave } from "modules/player_save/functions/playerDataAutoSave";

if (config.system.autoSavePlayerData === true) {
    startPlayerDataAutoSave();
}
