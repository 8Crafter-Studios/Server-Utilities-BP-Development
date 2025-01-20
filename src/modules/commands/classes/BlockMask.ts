import { Block, BlockPermutation, BlockType, BlockTypes } from "@minecraft/server";

export const knownContainerTypes = [
    "minecraft:yellow_shulker_box",
    "minecraft:beacon",
    "minecraft:lime_shulker_box",
    "minecraft:undyed_shulker_box",
    "minecraft:barrel",
    "minecraft:magenta_shulker_box",
    "minecraft:white_shulker_box",
    "minecraft:blast_furnace",
    "minecraft:chest",
    "minecraft:smoker",
    "minecraft:purple_shulker_box",
    "minecraft:orange_shulker_box",
    "minecraft:blue_shulker_box",
    "minecraft:brown_shulker_box",
    "minecraft:pink_shulker_box",
    "minecraft:red_shulker_box",
    "minecraft:jukebox",
    "minecraft:lit_furnace",
    "minecraft:gray_shulker_box",
    "minecraft:light_gray_shulker_box",
    "minecraft:trapped_chest",
    "minecraft:black_shulker_box",
    "minecraft:lit_blast_furnace",
    "minecraft:cyan_shulker_box",
    "minecraft:furnace",
    "minecraft:green_shulker_box",
    "minecraft:hopper",
    "minecraft:lectern",
    "minecraft:light_blue_shulker_box",
    "minecraft:dropper",
    "minecraft:brewing_stand",
    "minecraft:dispenser",
    "minecraft:lit_smoker",
] as const;

export class BlockMask {
    #blocksList: {
        type: string;
        states?: { [id: string]: string | number | boolean };
        get raw(): string;
        get rawns(): string;
    }[] = [];
    #hasStates: boolean;
    #blockTypeIds: string[];
    /**
     * "include" will make it only select blocks included in the block mask
     * "exclude" will make it only select blocks that are not included in the block mask
     */
    type: "include" | "exclude" = "include";
    get blocks(): {
        type: string;
        states?: { [id: string]: string | number | boolean };
        get raw(): string;
        get rawns(): string;
    }[] {
        return this.#blocksList;
    }
    set blocks(
        blocks: {
            type: string;
            states?: { [id: string]: string | number | boolean };
        }[]
    ) {
        this.#blocksList = blocks.map((v) => ({
            type: v.type,
            states: v.states,
            get raw() {
                return `${this.type}${!!this.states ? `${JSON.stringify(this.states)}` : ""}`;
            },
            get rawns() {
                return `${this.type}`;
            },
        }));
        this.#hasStates = !!blocks.find((v) => !!v.states);
        [...new Set((this.#blockTypeIds = blocks.map((v) => v.type)))];
    }
    get includesStates() {
        return this.#hasStates;
    }
    get blockTypes() {
        return this.#blockTypeIds;
    }
    evaluateIds() {
        this.#blocksList = cullEmpty(
            this.#blocksList.map((v) =>
                v.type == "none"
                    ? undefined
                    : v.type == "any"
                    ? undefined
                    : {
                          type: v.type == "keep" ? "minecraft:air" : tryget(() => BlockTypes.get(v.type).id) ?? v.type,
                          states: v.states,
                          get raw() {
                              return `${this.type}${!!this.states ? `${JSON.stringify(this.states)}` : ""}`;
                          },
                          get rawns() {
                              return `${this.type}`;
                          },
                      }
            )
        );
    }
    constructor(
        blocks: {
            type: string;
            states?: { [id: string]: string | number | boolean };
        }[] = [],
        type: "include" | "exclude" = "include"
    ) {
        this.#blocksList = blocks.map((v) => ({
            type: v.type,
            states: v.states,
            get raw() {
                return `${this.type}${!!this.states ? `${JSON.stringify(this.states)}` : ""}`;
            },
            get rawns() {
                return `${this.type}`;
            },
        }));
        this.type = type;
        this.#hasStates = !!blocks.find((v) => !!v.states);
        this.#blockTypeIds = [...new Set(blocks.map((v) => v.type))];
    }
    push(
        ...blocks: {
            type: string;
            states?: { [id: string]: string | number | boolean };
        }[]
    ) {
        this.#hasStates = this.#hasStates || !!blocks.find((v) => !!v.states);
        [...new Set((this.#blockTypeIds = [...this.#blocksList, ...blocks].map((v) => v.type)))];
        return this.#blocksList.push(
            ...blocks.map((v) => ({
                type: v.type,
                states: v.states,
                get raw() {
                    return `${this.type}${!!this.states ? `${JSON.stringify(this.states)}` : ""}`;
                },
                get rawns() {
                    return `${this.type}`;
                },
            }))
        );
    }
    testIfMatches(
        block: Block | BlockPermutation | BlockType | { type: BlockType | string; states?: Record<string, boolean | number | string> } | string,
        mode: typeof this.type = this.type
    ) {
        if (this.#blocksList.length == 0) {
            return true;
        }
        if (block instanceof Block) {
            let resultFound =
                this.#blocksList.find((b) => {
                    switch (b.type) {
                        case "isAir":
                            if (block.isAir) {
                                if (b.states != undefined) {
                                    return BlockMask.testForStatesMatch(block.permutation.getAllStates(), b.states);
                                } else {
                                    return true;
                                }
                            } else {
                                return false;
                            }
                        case "isLiquid":
                            if (block.isLiquid) {
                                if (b.states != undefined) {
                                    return BlockMask.testForStatesMatch(block.permutation.getAllStates(), b.states);
                                } else {
                                    return true;
                                }
                            } else {
                                return false;
                            }
                        case "isSolid":
                            if (block.isSolid) {
                                if (b.states != undefined) {
                                    return BlockMask.testForStatesMatch(block.permutation.getAllStates(), b.states);
                                } else {
                                    return true;
                                }
                            } else {
                                return false;
                            }
                        case "isValid":
                            if (block.isValid()) {
                                if (b.states != undefined) {
                                    return BlockMask.testForStatesMatch(block.permutation.getAllStates(), b.states);
                                } else {
                                    return true;
                                }
                            } else {
                                return false;
                            }
                        case "isWaterlogged":
                            if (block.isWaterlogged) {
                                if (b.states != undefined) {
                                    return BlockMask.testForStatesMatch(block.permutation.getAllStates(), b.states);
                                } else {
                                    return true;
                                }
                            } else {
                                return false;
                            }
                        case "canBeWaterlogged":
                        case "isWaterloggable":
                        case "waterloggable":
                            if (block.type.canBeWaterlogged) {
                                if (b.states != undefined) {
                                    return BlockMask.testForStatesMatch(block.permutation.getAllStates(), b.states);
                                } else {
                                    return true;
                                }
                            } else {
                                return false;
                            }
                        case "keep":
                            if (block.typeId == "minecraft:air") {
                                if (b.states != undefined) {
                                    return BlockMask.testForStatesMatch(block.permutation.getAllStates(), b.states);
                                } else {
                                    return true;
                                }
                            } else {
                                return false;
                            }
                        case "containers":
                            if (block.getComponent("inventory") != undefined) {
                                if (b.states != undefined) {
                                    return BlockMask.testForStatesMatch(block.permutation.getAllStates(), b.states);
                                } else {
                                    return true;
                                }
                            } else {
                                return false;
                            }
                        case "none":
                            return this.#blocksList.find((bb) => (bb?.type ?? "none") != "none") != undefined;
                        case "true":
                            return true;
                        case "false":
                            return false;
                        default:
                            if (block.typeId == (tryget(() => BlockTypes.get(b.type).id) ?? "invalid")) {
                                if (b.states != undefined) {
                                    return BlockMask.testForStatesMatch(block.permutation.getAllStates(), b.states);
                                } else {
                                    return true;
                                }
                            } else {
                                return false;
                            }
                    }
                }) != undefined;
            return mode == "exclude" ? !resultFound : resultFound;
        }
        if (block instanceof BlockPermutation) {
            let resultFound =
                this.#blocksList.find((b) => {
                    switch (b.type) {
                        // only works for the regular vanilla air block when using a BlockPermutation as the parameter
                        case "isAir":
                            if (block.type.id == "minecraft:air") {
                                if (b.states != undefined) {
                                    return BlockMask.testForStatesMatch(block.getAllStates(), b.states);
                                } else {
                                    return true;
                                }
                            } else {
                                return false;
                            }
                        // only works for the regular vanilla water, flowing water, lava, and flowing lava blocks when using a BlockPermutation as the parameter
                        case "isLiquid":
                            if (["minecraft:water", "minecraft:flowing_water", "minecraft:lava", "minecraft:flowing_lava"].includes(block.type.id)) {
                                if (b.states != undefined) {
                                    return BlockMask.testForStatesMatch(block.getAllStates(), b.states);
                                } else {
                                    return true;
                                }
                            } else {
                                return false;
                            }
                        // does not work when using a BlockPermutation as the parameter
                        case "isSolid":
                            return false;
                        // does not work when using a BlockPermutation as the parameter
                        case "isValid":
                            return false;
                        // does not work when using a BlockPermutation as the parameter
                        case "isWaterlogged":
                            return false;
                        case "canBeWaterlogged":
                        case "isWaterloggable":
                        case "waterloggable":
                            if (block.type.canBeWaterlogged) {
                                if (b.states != undefined) {
                                    return BlockMask.testForStatesMatch(block.getAllStates(), b.states);
                                } else {
                                    return true;
                                }
                            } else {
                                return false;
                            }
                        case "keep":
                            if (block.type.id == "minecraft:air") {
                                if (b.states != undefined) {
                                    return BlockMask.testForStatesMatch(block.getAllStates(), b.states);
                                } else {
                                    return true;
                                }
                            } else {
                                return false;
                            }
                        // only works for some container types when using a BlockPermutation as the parameter
                        case "containers":
                            if (knownContainerTypes.includes(block.type.id as any)) {
                                if (b.states != undefined) {
                                    return BlockMask.testForStatesMatch(block.getAllStates(), b.states);
                                } else {
                                    return true;
                                }
                            } else {
                                return false;
                            }
                        case "none":
                            return this.#blocksList.find((bb) => (bb?.type ?? "none") != "none") != undefined;
                        case "true":
                            return true;
                        case "false":
                            return false;
                        default:
                            if (block.type.id == (tryget(() => BlockTypes.get(b.type).id) ?? "invalid")) {
                                if (b.states != undefined) {
                                    return BlockMask.testForStatesMatch(block.getAllStates(), b.states);
                                } else {
                                    return true;
                                }
                            } else {
                                return false;
                            }
                    }
                }) != undefined;
            return mode == "exclude" ? !resultFound : resultFound;
        }
        if (block instanceof BlockType) {
            let resultFound =
                this.#blocksList.find((b) => {
                    switch (b.type) {
                        // only works for the regular vanilla air block when using a BlockType as the parameter
                        case "isAir":
                            if (block.id == "minecraft:air") {
                                return true;
                            } else {
                                return false;
                            }
                        // only works for the regular vanilla water, flowing water, lava, and flowing lava blocks when using a BlockType as the parameter
                        case "isLiquid":
                            if (["minecraft:water", "minecraft:flowing_water", "minecraft:lava", "minecraft:flowing_lava"].includes(block.id)) {
                                return true;
                            } else {
                                return false;
                            }
                        // does not work when using a BlockType as the parameter
                        case "isSolid":
                            return false;
                        // does not work when using a BlockType as the parameter
                        case "isValid":
                            return false;
                        // does not work when using a BlockType as the parameter
                        case "isWaterlogged":
                            return false;
                        case "canBeWaterlogged":
                        case "isWaterloggable":
                        case "waterloggable":
                            if (block.canBeWaterlogged) {
                                return true;
                            } else {
                                return false;
                            }
                        case "keep":
                            if (block.id == "minecraft:air") {
                                return true;
                            } else {
                                return false;
                            }
                        // only works for some container types when using a BlockType as the parameter
                        case "containers":
                            if (knownContainerTypes.includes( block.id as any)) {
                                return true;
                            } else {
                                return false;
                            }
                        case "none":
                            return this.#blocksList.find((bb) => (bb?.type ?? "none") != "none") != undefined;
                        case "true":
                            return true;
                        case "false":
                            return false;
                        default:
                            if (block.id == (tryget(() => BlockTypes.get(b.type).id) ?? "invalid")) {
                                return true;
                            } else {
                                return false;
                            }
                    }
                }) != undefined;
            return mode == "exclude" ? !resultFound : resultFound;
        }
        if (typeof block == "string") {
            let resultFound =
                this.#blocksList.find((b) => {
                    switch (b.type) {
                        // only works for the regular vanilla air block when using a BlockType as the parameter
                        case "isAir":
                            if (block == "minecraft:air") {
                                return true;
                            } else {
                                return false;
                            }
                        // only works for the regular vanilla water, flowing water, lava, and flowing lava blocks when using a BlockType as the parameter
                        case "isLiquid":
                            if (["minecraft:water", "minecraft:flowing_water", "minecraft:lava", "minecraft:flowing_lava"].includes(block)) {
                                return true;
                            } else {
                                return false;
                            }
                        // does not work when using a BlockType as the parameter
                        case "isSolid":
                            return false;
                        // does not work when using a BlockType as the parameter
                        case "isValid":
                            return false;
                        // does not work when using a BlockType as the parameter
                        case "isWaterlogged":
                            return false;
                        // does not work when using a BlockType as the parameter
                        case "canBeWaterlogged":
                        case "isWaterloggable":
                        case "waterloggable":
                            if (tryget(()=>BlockTypes.get(block).canBeWaterlogged) ?? false) {
                                return true;
                            } else {
                                return false;
                            }
                        case "keep":
                            if (block == "minecraft:air") {
                                return true;
                            } else {
                                return false;
                            }
                        // only works for some container types when using a BlockType as the parameter
                        case "containers":
                            if (knownContainerTypes.includes( block as any)) {
                                return true;
                            } else {
                                return false;
                            }
                        case "none":
                            return this.#blocksList.find((bb) => (bb?.type ?? "none") != "none") != undefined;
                        case "true":
                            return true;
                        case "false":
                            return false;
                        default:
                            if (block == (tryget(() => BlockTypes.get(b.type).id) ?? "invalid")) {
                                return true;
                            } else {
                                return false;
                            }
                    }
                }) != undefined;
            return mode == "exclude" ? !resultFound : resultFound;
        }
        if (typeof block == "object") {
            let resultFound =
                this.#blocksList.find((b) => {
                    switch (b.type) {
                        // only works for the regular vanilla air block when using a BlockPermutation as the parameter
                        case "isAir":
                            if ((block.type instanceof BlockType ? block.type.id : block.type) == "minecraft:air") {
                                if (b.states != undefined && block.states != undefined) {
                                    return BlockMask.testForStatesMatch(block.states, b.states);
                                } else {
                                    return true;
                                }
                            } else {
                                return false;
                            }
                        // only works for the regular vanilla water, flowing water, lava, and flowing lava blocks when using a BlockPermutation as the parameter
                        case "isLiquid":
                            if (["minecraft:water", "minecraft:flowing_water", "minecraft:lava", "minecraft:flowing_lava"].includes(block.type instanceof BlockType ? block.type.id : block.type)) {
                                if (b.states != undefined && block.states != undefined) {
                                    return BlockMask.testForStatesMatch(block.states, b.states);
                                } else {
                                    return true;
                                }
                            } else {
                                return false;
                            }
                        // does not work when using a BlockPermutation as the parameter
                        case "isSolid":
                            return false;
                        // does not work when using a BlockPermutation as the parameter
                        case "isValid":
                            return false;
                        // does not work when using a BlockPermutation as the parameter
                        case "isWaterlogged":
                            return false;
                        case "canBeWaterlogged":
                        case "isWaterloggable":
                        case "waterloggable":
                            if (tryget(()=>block.type instanceof BlockType ? block.type : BlockTypes.get(block.type).canBeWaterlogged) ?? false) {
                                if (b.states != undefined && block.states != undefined) {
                                    return BlockMask.testForStatesMatch(block.states, b.states);
                                } else {
                                    return true;
                                }
                            } else {
                                return false;
                            }
                        case "keep":
                            if ((block.type instanceof BlockType ? block.type.id : block.type) == "minecraft:air") {
                                if (b.states != undefined && block.states != undefined) {
                                    return BlockMask.testForStatesMatch(block.states, b.states);
                                } else {
                                    return true;
                                }
                            } else {
                                return false;
                            }
                        // only works for some container types when using a BlockPermutation as the parameter
                        case "containers":
                            if (knownContainerTypes.includes((block.type instanceof BlockType ? block.type.id : block.type) as any)) {
                                if (b.states != undefined && block.states != undefined) {
                                    return BlockMask.testForStatesMatch(block.states, b.states);
                                } else {
                                    return true;
                                }
                            } else {
                                return false;
                            }
                        case "none":
                            return this.#blocksList.find((bb) => (bb?.type ?? "none") != "none") != undefined;
                        case "true":
                            return true;
                        case "false":
                            return false;
                        default:
                            if ((block.type instanceof BlockType ? block.type.id : block.type) == (tryget(() => BlockTypes.get(b.type).id) ?? "invalid")) {
                                if (b.states != undefined && block.states != undefined) {
                                    return BlockMask.testForStatesMatch(block.states, b.states);
                                } else {
                                    return true;
                                }
                            } else {
                                return false;
                            }
                    }
                }) != undefined;
            return mode == "exclude" ? !resultFound : resultFound;
        }
    }
    static testForStatesMatch(states: Record<string, boolean | number | string>, statesMask: Record<string, boolean | number | string>) {
        return testForObjectExtension(states, statesMask);
    }
    static parse() {}
    static extractRaw(str: string): string | null {
        return str.match(
            /(?<=\s|^)([ie]:)?((?:[\"\'])?(?:[a-zA-Z0-9_\-\.]+:)?[a-zA-Z0-9_\-\.]+(?:[\"\'])?(?:[\[\{](?:[^\]\}]*)[\]\}])?(?=[,\s]|$))(,(?:[\"\'])?(?:[a-zA-Z0-9_\-\.]+:)?[a-zA-Z0-9_\-\.]+(?:[\"\'])?(?:[%*]{1,2}\d+)?(?:[\[\{](?:[^\]\}]*)[\]\}])?)*/
        )[0];
    }
    static extract(str: string, extraIdParsingEnabled: boolean = true): BlockMask {
        if(extraIdParsingEnabled){
            const result = extractCustomMaskType(str);
            const out = cullEmpty(
                result.map((v) =>
                    v.type == "none"
                        ? undefined
                        : v.type == "any"
                        ? undefined
                        : {
                              type: v.type == "keep" ? "air" : v.type,
                              states: v.states,
                          }
                )
            );
            return new BlockMask(out, result.mode);
        }else{
            const result = extractCustomMaskType(str);
            return new BlockMask(result, result.mode);
        }
    }
    static extractWRaw(str: string, extraIdParsingEnabled: boolean = true): { raw: string; parsed: BlockMask } {
        let result: {
            type: string;
            states?: Record<string, string | number | boolean>;
        }[];
        let mode: "include" | "exclude" = "include";
        if(extraIdParsingEnabled){
            const r = extractCustomMaskType(str);
            result = cullEmpty(
                r.map((v) =>
                    v.type == "none"
                        ? undefined
                        : v.type == "any"
                        ? undefined
                        : {
                              type: v.type == "keep" ? "air" : v.type,
                              states: v.states,
                          }
                )
            );
            mode = r.mode;
        }else{
            const r = extractCustomMaskType(str);
            result = r;
            mode = r.mode;
        }
        return {
            raw: str.match(
                /(?<=\s|^)([ie]:)?((?:[\"\'])?(?:[a-zA-Z0-9_\-\.]+:)?[a-zA-Z0-9_\-\.]+(?:[\"\'])?(?:[\[\{](?:[^\]\}]*)[\]\}])?(?=[,\s]|$))(,(?:[\"\'])?(?:[a-zA-Z0-9_\-\.]+:)?[a-zA-Z0-9_\-\.]+(?:[\"\'])?(?:[\[\{](?:[^\]\}]*)[\]\}])?)*/
            )[0],
            parsed: extraIdParsingEnabled
                    ? new BlockMask(result, mode)
                    : new BlockMask(result, mode),
        };
    }
    static extractAllRaw(str: string): string[] | null {
        return str.match(
            /(?<=\s|^)([ie]:)?((?:[\"\'])?(?:[a-zA-Z0-9_\-\.]+:)?[a-zA-Z0-9_\-\.]+(?:[\"\'])?(?:[\[\{](?:[^\]\}]*)[\]\}])?(?=[,\s]|$))(,(?:[\"\'])?(?:[a-zA-Z0-9_\-\.]+:)?[a-zA-Z0-9_\-\.]+(?:[\"\'])?(?:[\[\{](?:[^\]\}]*)[\]\}])?)*/g
        );
    }
    static extractAll(str: string, extraIdParsingEnabled: boolean = true): BlockMask[] {
        return extractCustomMaskTypes(str).map((v) => new BlockMask(v, v.mode));
    }
    static extractAllWRaw(str: string, extraIdParsingEnabled: boolean = true): { raw: string[]; parsed: BlockMask[] } {
        return {
            raw: str.match(
                /(?<=\s|^)([ie]:)?((?:[\"\'])?(?:[a-zA-Z0-9_\-\.]+:)?[a-zA-Z0-9_\-\.]+(?:[\"\'])?(?:[\[\{](?:[^\]\}]*)[\]\}])?(?=[,\s]|$))(,(?:[\"\'])?(?:[a-zA-Z0-9_\-\.]+:)?[a-zA-Z0-9_\-\.]+(?:[\"\'])?(?:[\[\{](?:[^\]\}]*)[\]\}])?)*/g
            ),
            parsed: extractCustomMaskTypes(str).map(
                (v) =>
                    new BlockMask(
                        extraIdParsingEnabled
                            ? cullEmpty(
                                  v.map((v) =>
                                      v.type == "none"
                                          ? undefined
                                          : v.type == "any"
                                          ? undefined
                                          : {
                                                type: v.type == "keep" ? "air" : v.type,
                                                states: v.states,
                                            }
                                  )
                              )
                            : v,
                        v.mode
                    )
            ),
        };
    }
}
function extractCustomMaskType(str: string) {
    const maskTypes = [] as {
        type: string;
        states?: Record<string, string | number | boolean>;
    }[] & { mode: "include" | "exclude" };
    const regex =
        /(?<=\s|^)([ie]:)?((?:[\"\'])?(?:[a-zA-Z0-9_\-\.]+:)?[a-zA-Z0-9_\-\.]+(?:[\"\'])?(?:[\[\{](?:[^\]\}]*)[\]\}])?(?=[,\s]|$))(,(?:[\"\'])?(?:[a-zA-Z0-9_\-\.]+:)?[a-zA-Z0-9_\-\.]+(?:[\"\'])?(?:[\[\{](?:[^\]\}]*)[\]\}])?)*/;
    const regexb = /([ie]:)?(?:[\"\'])?(?:[a-zA-Z0-9_\-\.]+:)?[a-zA-Z0-9_\-\.]+(?:[\"\'])?(?:[\[\{](?:[^\]\}]*)[\]\}])?(?=[,\s]|$)/g;
    const matches = str.match(regex)[0].match(regexb);
    let mode: "include" | "exclude" = "include";
    if (matches) {
        matches.forEach((match, index) => {
            if (index == 0 && !!match.match(/^i:/)) {
                match = match.slice(2);
            } else if (index == 0 && !!match.match(/^e:/)) {
                match = match.slice(2);
                mode = "exclude";
            }
            let type = match.trim();
            let states = null;

            // Extract states if present
            const statesMatch = type.match(/[\[\{]([^\]\}]*)[\]\}]/);
            if (!!statesMatch) {
                const statesStr = statesMatch[1];
                try {
                    states = JSON.parse(statesMatch[0].replace(/'/g, '"'));
                } catch (error) {
                    // States couldn't be parsed as JSON, parse as key-value pairs
                    states = {};
                    const keyValuePairs = statesStr.split(",");
                    keyValuePairs.forEach((pair) => {
                        const keyValue = pair.trim().split("=");
                        const key = keyValue[0].trim().slice(1, -1);
                        let value = keyValue[1].trim() as any;
                        // Convert value to number or boolean if possible
                        if (!isNaN(value)) {
                            value = parseFloat(value);
                        } else if (value.toLowerCase() === "true") {
                            value = true;
                        } else if (value.toLowerCase() === "false") {
                            value = false;
                        }
                        states[key] = value;
                    });
                }
                // Remove states from the type
                type = type.replace(/[\[\{][^\]\}]*[\]\}]/, "").trim();
            }

            // Extract chance if present
            const stringMatch = type.match(/^["']([^"]+)["']$/);
            if (!!stringMatch) {
                type = stringMatch[1].trim() /*.escapeCharactersB()*/;
            }

            maskTypes.push({
                type: tryget(() => BlockTypes.get(type).id) ?? type,
                states,
            });
        });
    }
    return Object.assign(maskTypes, { mode }) as {
        type: string;
        states?: Record<string, string | number | boolean>;
    }[] & { mode: "include" | "exclude" };
}
function extractCustomMaskTypes(str: string) {
    const masks = [] as ({
        type: string;
        states?: Record<string, string | number | boolean>;
    }[] & { mode: "include" | "exclude" })[];
    const regex =
        /(?<=\s|^)([ie]:)?((?:[\"\'])?(?:[a-zA-Z0-9_\-\.]+:)?[a-zA-Z0-9_\-\.]+(?:[\"\'])?(?:[\[\{](?:[^\]\}]*)[\]\}])?(?=[,\s]|$))(,(?:[\"\'])?(?:[a-zA-Z0-9_\-\.]+:)?[a-zA-Z0-9_\-\.]+(?:[\"\'])?(?:[\[\{](?:[^\]\}]*)[\]\}])?)*/g;
    const regexb = /([ie]:)?(?:[\"\'])?(?:[a-zA-Z0-9_\-\.]+:)?[a-zA-Z0-9_\-\.]+(?:[\"\'])?(?:[\[\{](?:[^\]\}]*)[\]\}])?(?=[,\s]|$)/g;
    const matchesa = str.match(regex);
    matchesa.forEach((m) => {
        const matches = m.match(regexb);
        if (matches) {
            let mode: "include" | "exclude" = "include";
            const maskTypes = [] as {
                type: string;
                states?: Record<string, string | number | boolean>;
            }[];
            matches.forEach((match, index) => {
                if (index == 0 && !!match.match(/^i:/)) {
                    match = match.slice(2);
                } else if (index == 0 && !!match.match(/^e:/)) {
                    match = match.slice(2);
                    mode = "exclude";
                }
                let type = match.trim();
                let states: Record<string, string | number | boolean> = null;

                // Extract states if present
                const statesMatch = type.match(/[\[\{]([^\]\}]*)[\]\}]/);
                if (!!statesMatch) {
                    const statesStr = statesMatch[1];
                    try {
                        states = JSON.parse(statesMatch[0].replace(/'/g, '"'));
                    } catch (error) {
                        // States couldn't be parsed as JSON, parse as key-value pairs
                        states = {};
                        const keyValuePairs = statesStr.split(",");
                        keyValuePairs.forEach((pair) => {
                            const keyValue = pair.trim().split("=");
                            const key = keyValue[0].trim().slice(1, -1);
                            let value = keyValue[1].trim() as any;
                            // Convert value to number or boolean if possible
                            if (!isNaN(value)) {
                                value = parseFloat(value);
                            } else if (value.toLowerCase() === "true") {
                                value = true;
                            } else if (value.toLowerCase() === "false") {
                                value = false;
                            }
                            states[key] = value;
                        });
                    }
                    // Remove states from the type
                    type = type.replace(/[\[\{][^\]\}]*[\]\}]/, "").trim();
                }

                // Extract chance if present
                const stringMatch = type.match(/^["']([^"]+)["']$/);
                if (!!stringMatch) {
                    type = stringMatch[1].trim() /*.escapeCharactersB()*/;
                }

                maskTypes.push({
                    type: tryget(() => BlockTypes.get(type).id) ?? type,
                    states,
                });
            });
            masks.push(Object.assign(maskTypes, { mode: mode }));
        }
    });
    return masks;
}
