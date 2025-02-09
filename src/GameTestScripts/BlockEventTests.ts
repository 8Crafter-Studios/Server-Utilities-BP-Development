// Copyright (c) Microsoft Corporation.  All rights reserved.

import * as GameTest from "@minecraft/server-gametest";
import {
  world,
  ItemStack,
  GameMode,
  Direction,
  ItemType,
  BlockType,
  PlayerBreakBlockAfterEvent,
  Block,
  PlayerPlaceBlockAfterEvent,
  BlockTypes,
  ItemTypes,
} from "@minecraft/server";

function registerBlockBreakTest(gameMode: string, blockType: BlockType, blockBreakTicks: number) {
  GameTest.registerAsync("BlockEventTests", `block_break_event_${gameMode}_${blockType.id}`, async (test) => {
    const spawnLocation = {x: 1, y: 2, z: 3};
    const blockLocation = {x: 2, y: 2, z: 2};

    const player = test.spawnSimulatedPlayer(spawnLocation, `${gameMode}_player`, GameMode[gameMode as GameMode]);

    // Set block
    test.setBlockType(blockType, blockLocation);

    // Listen for block break
    let blockDidBreak = false;
    const listener = (event: PlayerBreakBlockAfterEvent) => {
      // Make sure it's our block that broke
      const locationCorrect = Vector.equals(event.block.location, test.worldBlockLocation(blockLocation));
      const blockTypeCorrect = event.brokenBlockPermutation.type.id == blockType.id;

      if (locationCorrect && blockTypeCorrect) {
        blockDidBreak = true;
      }
    };
    world.afterEvents.playerBreakBlock.subscribe(listener);

    // Start breaking block
    player.lookAtBlock(blockLocation);
    player.breakBlock(blockLocation);

    // Wait for the block to be broken
    await test.idle(blockBreakTicks);

    // Unsubscribe
    world.afterEvents.playerBreakBlock.unsubscribe(listener);

    if (blockDidBreak) {
      test.succeed();
    } else {
      test.fail(`Block event should have fired for block ${blockType.id}`);
    }
  })
    .structureName("Generic:flat_5x5x5")
    .maxTicks(blockBreakTicks + 10)
    .batch(`block_break_event_${gameMode}_${blockType.id}`)
    .tag(GameTest.Tags.suiteDefault);
}

function registerBlockPlaceTest(itemType: ItemType, belowBlock?: BlockType) {
  const registerTest = function (gameMode: string) {
    GameTest.registerAsync("BlockEventTests", `block_place_event_${gameMode}_${itemType.id}`, async (test) => {
      const spawnLocation ={x: 1, y: 2, z: 3};
      const blockLocation = {x: 2, y: 1, z: 2};

      const player = test.spawnSimulatedPlayer(spawnLocation, `${gameMode}_player`, GameMode[gameMode as GameMode]);

      if (belowBlock) {
        // Set bellow block
        test.setBlockType(belowBlock, blockLocation);
      }

      // Listen for block place
      let blockDidPlace = false;
      const listener = (event: PlayerPlaceBlockAfterEvent) => {
        if (Vector.equals(event.block.location, test.worldBlockLocation(Vector.add(blockLocation, {x: 0, y: 1, z: 0})))) {
          blockDidPlace = true;
        }
      };
      world.afterEvents.playerPlaceBlock.subscribe(listener);

      await test.idle(10);

      // Start place block
      player.lookAtBlock(blockLocation);
      player.setItem(new ItemStack(itemType, 1), 0, true);
      player.useItemInSlotOnBlock(0, blockLocation, Direction.Up, {x: 0.5, y: 1, z: 0});

      // Unsubscribe
      world.afterEvents.playerPlaceBlock.unsubscribe(listener);

      if (blockDidPlace) {
        test.succeed();
      } else {
        test.fail(`Block event should have fired for block ${itemType.id}`);
      }
    })
      .structureName("Generic:flat_5x5x5")
      .maxTicks(20)
      .batch(`block_place_event_${gameMode}_${itemType.id}`)
      .tag(GameTest.Tags.suiteDefault);
  };

  registerTest("survival");
  registerTest("creative");
}

// Break Block Tests
registerBlockBreakTest("creative", BlockTypes.get("dirt") as BlockType, 20);
registerBlockBreakTest("survival", BlockTypes.get("dirt") as BlockType, 100);

// Place Block Tests
// Note: These are fired in a bunch of
//  different spots in the code, hence the different
//  items I chose to test
registerBlockPlaceTest(ItemTypes.get("dirt") as ItemType);
registerBlockPlaceTest(ItemTypes.get("bamboo") as ItemType, BlockTypes.get("dirt"));
registerBlockPlaceTest(ItemTypes.get("banner") as ItemType);
registerBlockPlaceTest(ItemTypes.get("bed") as ItemType);
registerBlockPlaceTest(ItemTypes.get("flower_pot") as ItemType);
registerBlockPlaceTest(ItemTypes.get("redstone") as ItemType);
registerBlockPlaceTest(ItemTypes.get("oak_sign") as ItemType);
