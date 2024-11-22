import { BlockTypes } from "@minecraft/server";

export class BlockMask {
    private blocksList: {
        type: string;
        states?: { [id: string]: string | number | boolean; };
        get raw(): string;
        get rawns(): string;
    }[] = [];
    private hasStates: boolean;
    private blockTypeIds: string[];
    get blocks(): {
        type: string;
        states?: { [id: string]: string | number | boolean; };
        get raw(): string;
        get rawns(): string;
    }[] {
        return this.blocksList;
    }
    set blocks(
        blocks: {
            type: string;
            states?: { [id: string]: string | number | boolean; };
        }[]
    ) {
        this.blocksList = blocks.map((v) => ({
            type: v.type,
            states: v.states,
            get raw() {
                return `${this.type}${!!this.states ? `${JSON.stringify(this.states)}` : ""}`;
            },
            get rawns() {
                return `${this.type}`;
            },
        }));
        this.hasStates = !!blocks.find((v) => !!v.states);
        [...new Set((this.blockTypeIds = blocks.map((v) => v.type)))];
    }
    get includesStates() {
        return this.hasStates;
    }
    get blockTypes() {
        return this.blockTypeIds;
    }
    evaluateIds() {
        this.blocksList = cullEmpty(
            this.blocksList.map((v) => v.type == "none"
                ? undefined
                : v.type == "any"
                    ? undefined
                    : {
                        type: v.type == "keep"
                            ? "minecraft:air"
                            : tryget(() => BlockTypes.get(v.type).id) ??
                            v.type,
                        states: v.states,
                        get raw() {
                            return `${this.type}${!!this.states
                                    ? `${JSON.stringify(this.states)}`
                                    : ""}`;
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
            states?: { [id: string]: string | number | boolean; };
        }[] = []
    ) {
        this.blocksList = blocks.map((v) => ({
            type: v.type,
            states: v.states,
            get raw() {
                return `${this.type}${!!this.states ? `${JSON.stringify(this.states)}` : ""}`;
            },
            get rawns() {
                return `${this.type}`;
            },
        }));
        this.hasStates = !!blocks.find((v) => !!v.states);
        [...new Set((this.blockTypeIds = blocks.map((v) => v.type)))];
    }
    push(
        ...blocks: {
            type: string;
            states?: { [id: string]: string | number | boolean; };
        }[]
    ) {
        this.hasStates = this.hasStates || !!blocks.find((v) => !!v.states);
        [
            ...new Set(
                (this.blockTypeIds = [...this.blocksList, ...blocks].map(
                    (v) => v.type
                ))
            ),
        ];
        return this.blocksList.push(
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
    static parse() { }
    static extractRaw(str: string): string | null {
        return str.match(
            /(?<=\s|^)([rs]:)?((?:[\"\'])?(?:[a-zA-Z0-9_\-\.]+:)?[a-zA-Z0-9_\-\.]+(?:[\"\'])?(?:[\[\{](?:[^\]\}]*)[\]\}])?(?=[,\s]|$))(,(?:[\"\'])?(?:[a-zA-Z0-9_\-\.]+:)?[a-zA-Z0-9_\-\.]+(?:[\"\'])?(?:[%*]{1,2}\d+)?(?:[\[\{](?:[^\]\}]*)[\]\}])?)*/
        )[0];
    }
    static extract(
        str: string,
        extraIdParsingEnabled: boolean = true
    ): BlockMask {
        return new BlockMask(
            extraIdParsingEnabled
                ? cullEmpty(
                    extractCustomMaskType(str).map((v) => v.type == "none"
                        ? undefined
                        : v.type == "any"
                            ? undefined
                            : {
                                type: v.type == "keep" ? "air" : v.type,
                                states: v.states,
                            }
                    )
                )
                : extractCustomMaskType(str)
        );
    }
    static extractWRaw(
        str: string,
        extraIdParsingEnabled: boolean = true
    ): { raw: string; parsed: BlockMask; } {
        return {
            raw: str.match(
                /(?<=\s|^)([rs]:)?((?:[\"\'])?(?:[a-zA-Z0-9_\-\.]+:)?[a-zA-Z0-9_\-\.]+(?:[\"\'])?(?:[\[\{](?:[^\]\}]*)[\]\}])?(?=[,\s]|$))(,(?:[\"\'])?(?:[a-zA-Z0-9_\-\.]+:)?[a-zA-Z0-9_\-\.]+(?:[\"\'])?(?:[\[\{](?:[^\]\}]*)[\]\}])?)*/
            )[0],
            parsed: new BlockMask(
                extraIdParsingEnabled
                    ? cullEmpty(
                        extractCustomMaskType(str).map((v) => v.type == "none"
                            ? undefined
                            : v.type == "any"
                                ? undefined
                                : {
                                    type: v.type == "keep" ? "air" : v.type,
                                    states: v.states,
                                }
                        )
                    )
                    : extractCustomMaskType(str)
            ),
        };
    }
    static extractAllRaw(str: string): string[] | null {
        return str.match(
            /(?<=\s|^)([rs]:)?((?:[\"\'])?(?:[a-zA-Z0-9_\-\.]+:)?[a-zA-Z0-9_\-\.]+(?:[\"\'])?(?:[\[\{](?:[^\]\}]*)[\]\}])?(?=[,\s]|$))(,(?:[\"\'])?(?:[a-zA-Z0-9_\-\.]+:)?[a-zA-Z0-9_\-\.]+(?:[\"\'])?(?:[\[\{](?:[^\]\}]*)[\]\}])?)*/g
        );
    }
    static extractAll(
        str: string,
        extraIdParsingEnabled: boolean = true
    ): BlockMask[] {
        return extractCustomMaskTypes(str).map((v) => new BlockMask(v));
    }
    static extractAllWRaw(
        str: string,
        extraIdParsingEnabled: boolean = true
    ): { raw: string[]; parsed: BlockMask[]; } {
        return {
            raw: str.match(
                /(?<=\s|^)([rs]:)?((?:[\"\'])?(?:[a-zA-Z0-9_\-\.]+:)?[a-zA-Z0-9_\-\.]+(?:[\"\'])?(?:[\[\{](?:[^\]\}]*)[\]\}])?(?=[,\s]|$))(,(?:[\"\'])?(?:[a-zA-Z0-9_\-\.]+:)?[a-zA-Z0-9_\-\.]+(?:[\"\'])?(?:[\[\{](?:[^\]\}]*)[\]\}])?)*/g
            ),
            parsed: extractCustomMaskTypes(str).map(
                (v) => new BlockMask(
                    extraIdParsingEnabled
                        ? cullEmpty(
                            v.map((v) => v.type == "none"
                                ? undefined
                                : v.type == "any"
                                    ? undefined
                                    : {
                                        type: v.type == "keep"
                                            ? "air"
                                            : v.type,
                                        states: v.states,
                                    }
                            )
                        )
                        : extraIdParsingEnabled
                            ? extractCustomMaskType(str).map((v) => v.type == "none"
                                ? undefined
                                : v.type == "any"
                                    ? undefined
                                    : {
                                        type: v.type == "keep"
                                            ? "air"
                                            : v.type,
                                        states: v.states,
                                    }
                            )
                            : v
                )
            ),
        };
    }
}
function extractCustomMaskType(str: string) {
    const maskTypes = [] as {
        type: string;
        states?: Record<string, string | number | boolean>;
    }[];
    const regex = /(?<=\s|^)([rs]:)?((?:[\"\'])?(?:[a-zA-Z0-9_\-\.]+:)?[a-zA-Z0-9_\-\.]+(?:[\"\'])?(?:[\[\{](?:[^\]\}]*)[\]\}])?(?=[,\s]|$))(,(?:[\"\'])?(?:[a-zA-Z0-9_\-\.]+:)?[a-zA-Z0-9_\-\.]+(?:[\"\'])?(?:[\[\{](?:[^\]\}]*)[\]\}])?)*/;
    const regexb = /([rs]:)?(?:[\"\'])?(?:[a-zA-Z0-9_\-\.]+:)?[a-zA-Z0-9_\-\.]+(?:[\"\'])?(?:[\[\{](?:[^\]\}]*)[\]\}])?(?=[,\s]|$)/g;
    const matches = str.match(regex)[0].match(regexb);
    if (matches) {
        matches.forEach((match, index) => {
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
    return maskTypes as {
        type: string;
        states?: Record<string, string | number | boolean>;
    }[];
}
function extractCustomMaskTypes(str: string) {
    const patterns = [] as {
        type: string;
        states?: Record<string, string | number | boolean>;
    }[][];
    const regex = /(?<=\s|^)([rs]:)?((?:[\"\'])?(?:[a-zA-Z0-9_\-\.]+:)?[a-zA-Z0-9_\-\.]+(?:[\"\'])?(?:[\[\{](?:[^\]\}]*)[\]\}])?(?=[,\s]|$))(,(?:[\"\'])?(?:[a-zA-Z0-9_\-\.]+:)?[a-zA-Z0-9_\-\.]+(?:[\"\'])?(?:[\[\{](?:[^\]\}]*)[\]\}])?)*/g;
    const regexb = /([rs]:)?(?:[\"\'])?(?:[a-zA-Z0-9_\-\.]+:)?[a-zA-Z0-9_\-\.]+(?:[\"\'])?(?:[\[\{](?:[^\]\}]*)[\]\}])?(?=[,\s]|$)/g;
    const matchesa = str.match(regex);
    matchesa.forEach((m) => {
        const matches = m.match(regexb);
        if (matches) {
            const patternTypes = [] as {
                type: string;
                states?: Record<string, string | number | boolean>;
            }[];
            matches.forEach((match, index) => {
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

                patternTypes.push({
                    type: tryget(() => BlockTypes.get(type).id) ?? type,
                    states,
                });
            });
            patterns.push(patternTypes);
        }
    });
    return patterns;
}
