import { BlockPermutation } from "@minecraft/server";
import { selectWeightedElement } from "modules/commands/functions/selectWeightedElement";

function extractCustomPatternTypes(str: string) {
    const patterns = [] as ({
        type: string;
        states?: Record<string, string | number | boolean>;
        weight?: number;
    }[] & { mode: "random" | "sequence"; })[];
    const regex = /(?<=\s|^)([rs]:)?((?:[\"\'])?(?:[a-zA-Z0-9_\-\.]+:)?[a-zA-Z0-9_\-\.]+(?:[\"\'])?(?:[%*]{1,2}\d+)?(?:[\[\{](?:[^\]\}]*)[\]\}])?(?=[,\s]|$))(,(?:[\"\'])?(?:[a-zA-Z0-9_\-\.]+:)?[a-zA-Z0-9_\-\.]+(?:[\"\'])?(?:[%*]{1,2}\d+)?(?:[\[\{](?:[^\]\}]*)[\]\}])?)*/g;
    const regexb = /([rs]:)?(?:[\"\'])?(?:[a-zA-Z0-9_\-\.]+:)?[a-zA-Z0-9_\-\.]+(?:[\"\'])?(?:[%*]{1,2}\d+)?(?:[\[\{](?:[^\]\}]*)[\]\}])?(?=[,\s]|$)/g;
    const matchesa = str.match(regex);
    matchesa.forEach((m) => {
        const matches = m.match(regexb);
        if (matches) {
            let mode: "random" | "sequence" = "random";
            const patternTypes = [] as {
                type: string;
                states?: Record<string, string | number | boolean>;
                weight?: number;
            }[];
            matches.forEach((match, index) => {
                if (index == 0 && !!match.match(/^r:/)) {
                    match = match.slice(2);
                } else if (index == 0 && !!match.match(/^s:/)) {
                    match = match.slice(2);
                    mode = "sequence";
                }
                let type = match.trim();
                let weight: number = null;
                let states: Record<string, string | number | boolean> = null;

                // Extract chance if present
                const weightMatch = type.match(
                    /[%*]{1,2}(\d+)(?=[\s\n]*$|\[|\{)/
                );
                if (!!weightMatch) {
                    weight = parseInt(weightMatch[1]);
                    type = type
                        .replace(/[%*]{1,2}(\d+)(?=[\s\n]*$|\[|\{)/, "")
                        .trim();
                }

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

                patternTypes.push({ type, states, weight });
            });
            patterns.push(Object.assign(patternTypes, { mode: mode }));
        }
    });
    return patterns;
}
function extractCustomPatternType(str: string) {
    const patternTypes = [] as {
        type: string;
        states?: Record<string, string | number | boolean>;
        weight?: number;
    }[] & { mode: "random" | "sequence"; };
    const regex = /(?<=\s|^)([rs]:)?((?:[\"\'])?(?:[a-zA-Z0-9_\-\.]+:)?[a-zA-Z0-9_\-\.]+(?:[\"\'])?(?:[%*]{1,2}\d+)?(?:[\[\{](?:[^\]\}]*)[\]\}])?(?=[,\s]|$))(,(?:[\"\'])?(?:[a-zA-Z0-9_\-\.]+:)?[a-zA-Z0-9_\-\.]+(?:[\"\'])?(?:[%*]{1,2}\d+)?(?:[\[\{](?:[^\]\}]*)[\]\}])?)*/;
    const regexb = /([rs]:)?(?:[\"\'])?(?:[a-zA-Z0-9_\-\.]+:)?[a-zA-Z0-9_\-\.]+(?:[\"\'])?(?:[%*]{1,2}\d+)?(?:[\[\{](?:[^\]\}]*)[\]\}])?(?=[,\s]|$)/g;
    const matches = str.match(regex)[0].match(regexb);
    let mode: "random" | "sequence" = "random";
    if (matches) {
        matches.forEach((match, index) => {
            if (index == 0 && !!match.match(/^r:/)) {
                match = match.slice(2);
            } else if (index == 0 && !!match.match(/^s:/)) {
                match = match.slice(2);
                mode = "sequence";
            }
            let type = match.trim();
            let weight: number = null;
            let states: Record<string, string | number | boolean> = null;

            // Extract chance if present
            const weightMatch = type.match(/[%*]{1,2}(\d+)(?=[\s\n]*$|\[|\{)/);
            if (!!weightMatch) {
                weight = parseInt(weightMatch[1]);
                type = type
                    .replace(/[%*]{1,2}(\d+)(?=[\s\n]*$|\[|\{)/, "")
                    .trim();
            }

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

            patternTypes.push({ type, states, weight });
        });
    }
    return Object.assign(patternTypes, { mode: mode }) as {
        type: string;
        states?: Record<string, string | number | boolean>;
        weight?: number;
    }[] & { mode: "random" | "sequence"; };
}
export class BlockPattern {
    blocks: {
        type: string;
        states?: { [id: string]: string | number | boolean; };
        weight?: number;
        get raw(): string;
        get rawns(): string;
    }[] = [];
    type: "random" | "sequence" = "random";
    constructor(
        blocks: {
            type: string;
            states?: { [id: string]: string | number | boolean; };
            weight?: number;
        }[] = [],
        type: "random" | "sequence" = "random"
    ) {
        (this.blocks = blocks.map((v) => ({
            type: v.type,
            states: v.states,
            weight: v.weight,
            get raw() {
                return `${this.type}${!!this.weight ? `%${this.weight}` : ""}${!!this.states ? `${JSON.stringify(this.states)}` : ""}`;
            },
            get rawns() {
                return `${this.type}${!!this.weight ? `%${this.weight}` : ""}`;
            },
        }))),
            (this.type = type);
    }
    generateBlock(
        generateIndex: number | bigint = 0,
        forceMode?: "random" | "sequence"
    ) {
        return (
            (!!!forceMode && this.type == "random") || forceMode == "random"
                ? selectWeightedElement(this.blocks)
                : this.blocks
                    .map((b) => !!b.weight ? new Array(b.weight).fill(b) : [b]
                    )
                    .flat()[Number(
                        BigInt(generateIndex) %
                        BigInt(
                            this.blocks
                                .map((b) => !!b.weight
                                    ? new Array(b.weight).fill(b)
                                    : [b]
                                )
                                .flat().length
                        )
                    )]
        ) as {
            type: string;
            states?: { [id: string]: string | number | boolean; };
            chance?: number;
        };
    }
    generateBlockP(
        generateIndex: number | bigint = 0,
        forceMode?: "random" | "sequence"
    ) {
        const p = (!!!forceMode && this.type == "random") || forceMode == "random"
            ? selectWeightedElement(this.blocks)
            : this.blocks
                .map((b) => !!b.weight ? new Array(b.weight).fill(b) : [b]
                )
                .flat()[Number(
                    BigInt(generateIndex) %
                    BigInt(
                        this.blocks
                            .map((b) => !!b.weight
                                ? new Array(b.weight).fill(b)
                                : [b]
                            )
                            .flat().length
                    )
                )];
        return BlockPermutation.resolve(p.type, p.states);
    }
    push(
        ...blocks: {
            type: string;
            states?: { [id: string]: string | number | boolean; };
            weight?: number;
        }[]
    ) {
        return this.blocks.push(
            ...blocks.map((v) => ({
                type: v.type,
                states: v.states,
                weight: v.weight,
                get raw() {
                    return `${this.type}${!!this.weight ? `%${this.weight}` : ""}${!!this.states ? `${JSON.stringify(this.states)}` : ""}`;
                },
                get rawns() {
                    return `${this.type}${!!this.weight ? `%${this.weight}` : ""}`;
                },
            }))
        );
    }
    static parse() { }
    static extractRaw(str: string): string {
        return str.match(
            /(?<=\s|^)([rs]:)?((?:[\"\'])?(?:[a-zA-Z0-9_\-\.]+:)?[a-zA-Z0-9_\-\.]+(?:[\"\'])?(?:[%*]{1,2}\d+)?(?:[\[\{](?:[^\]\}]*)[\]\}])?(?=[,\s]|$))(,(?:[\"\'])?(?:[a-zA-Z0-9_\-\.]+:)?[a-zA-Z0-9_\-\.]+(?:[\"\'])?(?:[%*]{1,2}\d+)?(?:[\[\{](?:[^\]\}]*)[\]\}])?)*/
        )[0];
    }
    static extract(str: string, mode?: "random" | "sequence"): BlockPattern {
        return new BlockPattern(
            ...((v) => [v, mode ?? v.mode] as [
                {
                    type: string;
                    states?: Record<string, string | number | boolean>;
                    weight?: number;
                }[],
                "random" | "sequence"
            ])(extractCustomPatternType(str))
        );
    }
    static extractWRaw(
        str: string,
        mode?: "random" | "sequence"
    ): { raw: string; parsed: BlockPattern; } {
        return {
            raw: str.match(
                /(?<=\s|^)([rs]:)?((?:[\"\'])?(?:[a-zA-Z0-9_\-\.]+:)?[a-zA-Z0-9_\-\.]+(?:[\"\'])?(?:[%*]{1,2}\d+)?(?:[\[\{](?:[^\]\}]*)[\]\}])?(?=[,\s]|$))(,(?:[\"\'])?(?:[a-zA-Z0-9_\-\.]+:)?[a-zA-Z0-9_\-\.]+(?:[\"\'])?(?:[%*]{1,2}\d+)?(?:[\[\{](?:[^\]\}]*)[\]\}])?)*/
            )[0],
            parsed: new BlockPattern(
                ...((v) => [v, mode ?? v.mode] as [
                    {
                        type: string;
                        states?: Record<string, string | number | boolean>;
                        weight?: number;
                    }[],
                    "random" | "sequence"
                ])(extractCustomPatternType(str))
            ),
        };
    }
    static extractAllRaw(str: string): string[] {
        return str.match(
            /(?<=\s|^)([rs]:)?((?:[\"\'])?(?:[a-zA-Z0-9_\-\.]+:)?[a-zA-Z0-9_\-\.]+(?:[\"\'])?(?:[%*]{1,2}\d+)?(?:[\[\{](?:[^\]\}]*)[\]\}])?(?=[,\s]|$))(,(?:[\"\'])?(?:[a-zA-Z0-9_\-\.]+:)?[a-zA-Z0-9_\-\.]+(?:[\"\'])?(?:[%*]{1,2}\d+)?(?:[\[\{](?:[^\]\}]*)[\]\}])?)*/g
        );
    }
    static extractAll(
        str: string,
        mode?: "random" | "sequence"
    ): BlockPattern[] {
        return extractCustomPatternTypes(str).map(
            (v) => new BlockPattern(v, mode ?? v.mode)
        );
    }
    static extractAllWRaw(
        str: string,
        mode?: "random" | "sequence"
    ): { raw: string[]; parsed: BlockPattern[]; } {
        return {
            raw: str.match(
                /(?<=\s|^)([rs]:)?((?:[\"\'])?(?:[a-zA-Z0-9_\-\.]+:)?[a-zA-Z0-9_\-\.]+(?:[\"\'])?(?:[%*]{1,2}\d+)?(?:[\[\{](?:[^\]\}]*)[\]\}])?(?=[,\s]|$))(,(?:[\"\'])?(?:[a-zA-Z0-9_\-\.]+:)?[a-zA-Z0-9_\-\.]+(?:[\"\'])?(?:[%*]{1,2}\d+)?(?:[\[\{](?:[^\]\}]*)[\]\}])?)*/g
            ),
            parsed: extractCustomPatternTypes(str).map(
                (v) => new BlockPattern(v, mode ?? v.mode)
            ),
        };
    }
}
