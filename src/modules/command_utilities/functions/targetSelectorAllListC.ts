import { Entity, Player, world } from "@minecraft/server";

export function targetSelectorAllListC(
  selector: string,
  filters: string,
  position: string,
  sourceEntityCommandExecution?: Entity | Player
) {
  let scoreboardUUID = Math.round(Math.random() * 1000 + 500);
  if (sourceEntityCommandExecution == undefined) {
    world
      .getAllPlayers()[0]
      .runCommand(
        "/execute positioned " +
        position +
        " as " +
        selector +
        filters +
        " at @s run /scoreboard players set @s andexdbDebug " +
        scoreboardUUID
      );
  } else {
    sourceEntityCommandExecution.runCommand(
      "/execute positioned " +
      position +
      " as " +
      selector +
      filters +
      " at @s run /scoreboard players set @s andexdbDebug " +
      scoreboardUUID
    );
  }
  let selectedEntity: Entity[];
  selectedEntity = [];
  for (let i in world.scoreboard.getObjective("andexdbDebug")!?.getScores()) {
    try {
      selectedEntity.push(
        world.scoreboard
          .getObjective("andexdbDebug")
          ?.getScores()
          .filter((score) => score.score == scoreboardUUID)[i].participant.getEntity()!
      );
    } catch (e) { }
  }
  if (sourceEntityCommandExecution == undefined) {
    world
      .getAllPlayers()[0]
      .runCommand(
        "/execute positioned " +
        position +
        " as " +
        selector +
        filters +
        " at @s run /scoreboard players set @s andexdbDebug 0"
      );
  } else {
    sourceEntityCommandExecution.runCommand(
      "/execute as " +
      selector +
      filters +
      " at @s run /scoreboard players set @s andexdbDebug 0"
    );
  }
  return selectedEntity;
}
