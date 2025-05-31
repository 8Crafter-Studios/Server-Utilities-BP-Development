import { Dimension, Entity, type Vector3 } from "@minecraft/server";

/**
 * An interface that represents a saved WorldEdit selection.
 */
export interface SavedWorldEditSelection {
    /**
     * The first corner of the saved selection.
     *
     * @type {Vector3}
     */
    pos1: Vector3;
    /**
     * The second corner of the saved selection.
     *
     * @type {Vector3}
     */
    pos2: Vector3;
    /**
     * The dimension of the saved selection.
     *
     * @type {(typeof dimensionsd)[number]}
     */
    dimension: (typeof dimensionsd)[number];
}

/**
 * An interface that represents the JSON data of a WorldEdit selection.
 */
export interface WorldEditSelectionJSONData {
    /**
     * The first corner of the current selection.
     *
     * @type {Vector3}
     */
    pos1: Vector3;
    /**
     * The second corner of the current selection.
     *
     * @type {Vector3}
     */
    pos2: Vector3;
    /**
     * The smallest corner of the current selection.
     *
     * @type {Vector3}
     */
    minPos: Vector3;
    /**
     * The largest corner of the current selection.
     *
     * @type {Vector3}
     */
    maxPos: Vector3;
    /**
     * The dimension of the current selection.
     *
     * @type {(typeof dimensionsd)[number]}
     */
    dimension: (typeof dimensionsd)[number];
    /**
     * The saved selections for the current player.
     *
     * @type {{[selectionID: string]: SavedWorldEditSelection}}
     */
    savedSelections: { [selectionID: string]: SavedWorldEditSelection };
}

namespace exports {
    /**
     * A class that represents a WorldEdit selection for a player.
     */
    export class WorldEditSelection {
        /**
         * The player that this selection is for.
         *
         * @type {Entity}
         */
        public readonly player: Entity;
        /**
         * Gets the WorldEdit selection for the given player.
         *
         * @param {Entity} player The player that this selection is for.
         */
        public constructor(player: Entity) {
            this.player = player;
        }
        /**
         * The first corner of the current selection.
         *
         * It is stored in the player's `pos1` dynamic property.
         *
         * @type {Vector3 | undefined}
         */
        public get pos1(): Vector3 | undefined {
            return this.player.getDynamicProperty("pos1") as Vector3 | undefined;
        }
        public set pos1(value: Vector3 | undefined) {
            this.player.setDynamicProperty("pos1", value);
        }
        /**
         * The second corner of the current selection.
         *
         * It is stored in the player's `pos2` dynamic property.
         *
         * @type {Vector3 | undefined}
         */
        public get pos2(): Vector3 | undefined {
            return this.player.getDynamicProperty("pos2") as Vector3 | undefined;
        }
        public set pos2(value: Vector3 | undefined) {
            this.player.setDynamicProperty("pos2", value);
        }
        /**
         * The currently selected dimension.
         *
         * It is stored in the player's `posD` dynamic property.
         *
         * @type {Dimension | undefined}
         */
        public get dimension(): Dimension | undefined {
            let value = this.player.getDynamicProperty("posD") as (typeof dimensionsd)[number] | undefined;
            if (!!!value) {
                return undefined;
            }
            return tryget(() => world.getDimension(value)) ?? undefined;
        }
        public set dimension(value: string | Dimension | undefined) {
            let outValue: (typeof dimensionsd)[number] | undefined = undefined;
            if (!!value) {
                if (value instanceof Dimension) {
                    outValue = value.id as (typeof dimensionsd)[number];
                } else if (dimensionsd.includes(value as any)) {
                    outValue = value as (typeof dimensionsd)[number];
                } else if (dimensionse.includes(value as any)) {
                    outValue = ("minecraft:" + value) as (typeof dimensionsd)[number];
                } else {
                    throw new TypeError("Invalid dimension: " + value);
                }
            }
            this.player.setDynamicProperty("posD", outValue);
        }
        /**
         * The smallest corner of the selection.
         *
         * It gets the minimum values of each of the vectors of the `pos1` and `pos2` properties.
         *
         * @type {Vector3 | undefined}
         */
        public get minPos(): Vector3 | undefined {
            const p1 = this.pos1;
            const p2 = this.pos2;
            if (p1 === undefined || p2 === undefined) return undefined;
            return {
                x: Math.min(p1.x, p2.x),
                y: Math.min(p1.y, p2.y),
                z: Math.min(p1.z, p2.z),
            } as Vector3;
        }
        /**
         * The largest corner of the selection.
         *
         * It gets the maximum values of each of the vectors of the `pos1` and `pos2` properties.
         *
         * @type {Vector3 | undefined}
         */
        public get maxPos(): Vector3 | undefined {
            const p1 = this.pos1;
            const p2 = this.pos2;
            if (p1 === undefined || p2 === undefined) return undefined;
            return {
                x: Math.max(p1.x, p2.x),
                y: Math.max(p1.y, p2.y),
                z: Math.max(p1.z, p2.z),
            } as Vector3;
        }
        /**
         * Gets the IDs of all saved selections for this player.
         *
         * @returns {string[]} The IDs of all saved selections.
         */
        public getSavedSelectionIds(): string[] {
            return this.player
                .getDynamicPropertyIds()
                .filter((v) => v.startsWith("savedSelection:"))
                .map((v) => v.slice(15));
        }
        /**
         * Gets all saved selections for this player.
         *
         * @returns {{[selectionID: string]: SavedWorldEditSelection}} The saved selections.
         * @throws {SyntaxError} If any of the saved selections are not valid JSON.
         */
        public getSavedSelections(): { [selectionID: string]: SavedWorldEditSelection } {
            return Object.fromEntries(
                cullUndefined(
                    this.getSavedSelectionIds().map((selectionID) => {
                        if (!!!this.player.getDynamicProperty("savedSelection:" + selectionID)) {
                            return undefined;
                        }
                        return [selectionID, JSON.parse(String(this.player.getDynamicProperty("savedSelection:" + selectionID))) as SavedWorldEditSelection];
                    })
                )
            );
        }
        /**
         * Gets a saved selection from the player's saved selection list.
         *
         * @param {string} selectionID The ID of the selection to get.
         * @returns {SavedWorldEditSelection | undefined} The saved selection, or undefined if it doesn't exist.
         * @throws {SyntaxError} If the saved selection is not valid JSON.
         */
        public getSavedSelection(selectionID: string): SavedWorldEditSelection | undefined {
            if (!!!this.player.getDynamicProperty("savedSelection:" + selectionID)) {
                return undefined;
            }
            return JSON.parse(String(this.player.getDynamicProperty("savedSelection:" + selectionID))) as SavedWorldEditSelection;
        }
        /**
         * Removes a saved selection from the player's saved selection list.
         *
         * @param {string} selectionID The ID of the selection to remove.
         * @returns {boolean} True if the selection was removed, false if it didn't exist.
         * @throws {TypeError} If the {@link selectionID} is not a string.
         */
        public removeSavedSelection(selectionID: string): boolean {
            if (!!!this.player.getDynamicProperty("savedSelection:" + selectionID)) {
                return false;
            }
            this.player.setDynamicProperty("savedSelection:" + selectionID);
            return true;
        }
        /**
         * Saves the current selection to the player's saved selection list.
         *
         * @param {string} selectionID The ID to save the selection under.
         * @param {SavedWorldEditSelection} value The selection to save.
         * @throws {TypeError} If the value is not a valid selection.
         */
        public saveSelection(
            selectionID: string,
            value: SavedWorldEditSelection = {
                pos1: this.pos1 ? this.pos1 : (()=>{throw new TypeError("[WorldEditSelection.prototype::saveSelection] this.pos1 must be defined to save a selection.")})(),
                pos2: this.pos2 ? this.pos2 : (()=>{throw new TypeError("[WorldEditSelection.prototype::saveSelection] this.pos2 must be defined to save a selection.")})(),
                dimension: this.dimension ? this.dimension.id as (typeof dimensionsd)[number] : (()=>{throw new TypeError("[WorldEditSelection.prototype::saveSelection] this.dimension must be defined to save a selection.")})(),
            }
        ): void {
            if (
                !testForObjectTypeExtension(value, {
                    pos1: {
                        x: "number",
                        y: "number",
                        z: "number",
                    },
                    pos2: {
                        x: "number",
                        y: "number",
                        z: "number",
                    },
                    dimension: "string",
                })
            ) {
                throw new TypeError(
                    `Invalid value type, expected {pos1: Vector3, pos2: Vector3, dimension: ${dimensionsd.map((s) => JSON.stringify(s)).join(" | ")}}`
                );
            }
            this.player.setDynamicProperty("savedSelection:" + selectionID, JSON.stringify(value));
        }
        /**
         * Gets the JSON data of the linked player's world edit selection.
         *
         * @returns {WorldEditSelectionJSONData} The JSON data of the world edit selection.
         */
        public toJSON(): WorldEditSelectionJSONData {
            return {
                pos1: this.pos1!,
                pos2: this.pos2!,
                minPos: this.minPos!,
                maxPos: this.maxPos!,
                dimension: this.dimension!.id as (typeof dimensionsd)[number],
                savedSelections: this.getSavedSelections(),
            };
        }
    }
}

export import WorldEditSelection = exports.WorldEditSelection;

Object.defineProperties(Entity.prototype, {
    worldEditSelection: {
        get: function worldEditSelection(): WorldEditSelection {
            return new WorldEditSelection(this as Entity);
        },
        configurable: true,
        enumerable: true,
    },
}); /*
export function customFormUIEditor(sourceEntity: Entity|Player){
    let form2 = new ModalFormData();
    let players = world.getAllPlayers();
    let targetList = [players[0].nameTag]
    for (const index in players) {
        if (Number(index) != 0) {
        targetList = String([String(targetList), players[index].nameTag]).split(",");
        }
    }
    let formId = event.message ?? "test1234"
    let form = editCustomFormUI(formId)
    forceShow(form.form, (event.sourceEntity as Player)).then(to => {
        let t = (to as ModalFormResponse)
        if (t.canceled) return;
        world.setDynamicProperty(`customUI:${formId}`, `${t.formValues![0]}|${t.formValues![1]}`)
        let elementValues = t.formValues.slice(2, -2)
        console.warn(elementValues)
        elementValues.forEach((v, i)=>{switch(i % 5){
            case 0: world.setDynamicProperty(`customUIElement:${formId}|${form.indexList[Math.floor(i / 5)]}`, `${customElementTypeIds[Number(elementValues[i])]}|${elementValues.slice(i+1, i+4).join("|")}`); break;
            case 4: if(Boolean(v)==true){world.setDynamicProperty(`customUIElement:${formId}|${form.indexList[Math.floor(i / 5)]}`)}; break;
        }});
        if (t.formValues![t.formValues.length-2]){world.setDynamicProperty(`customUIElement:${formId}|${(Number(t.formValues![t.formValues.length-1]) ?? ((form.indexList[form.indexList.length-1] ?? -1)+1))}`, ""); }
}).catch(e => {
    console.error(e, e.stack);
});}*/

Object.defineProperty(globalThis, "WorldEditSelection", {
    value: exports.WorldEditSelection,
    enumerable: true,
    configurable: true,
    writable: false,
});

declare global {
    namespace globalThis {
        export import WorldEditSelection = exports.WorldEditSelection;
    }
}
