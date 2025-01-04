import { Dimension, Entity, type Vector3 } from "@minecraft/server";

export class WorldEditSelection {
    readonly player: Entity;
    constructor(player: Entity) {
        this.player = player;
    }
    get pos1() {
        return this.player.getDynamicProperty("pos1") as Vector3 | undefined;
    }
    set pos1(value: Vector3) {
        this.player.setDynamicProperty("pos1", value);
    }
    get pos2() {
        return this.player.getDynamicProperty("pos2") as Vector3 | undefined;
    }
    set pos2(value: Vector3) {
        this.player.setDynamicProperty("pos2", value);
    }
    get dimension(): Dimension | undefined {
        let value = this.player.getDynamicProperty("posD") as
            | (typeof dimensionsd)[number]
            | undefined;
        if (!!!value) {
            return undefined;
        }
        return world.getDimension(value);
    }
    get minPos() {
        return {
            x: Math.min(this.pos1.x, this.pos2.x),
            y: Math.min(this.pos1.y, this.pos2.y),
            z: Math.min(this.pos1.z, this.pos2.z),
        } as Vector3;
    }
    get maxPos() {
        return {
            x: Math.max(this.pos1.x, this.pos2.x),
            y: Math.max(this.pos1.y, this.pos2.y),
            z: Math.max(this.pos1.z, this.pos2.z),
        } as Vector3;
    }
    set dimension(value: string | Dimension) {
        let outValue: (typeof dimensionsd)[number] | undefined = undefined;
        if (!!value) {
            if (value instanceof Dimension) {
                outValue = value.id as (typeof dimensionsd)[number];
            } else if (dimensionsd.includes(value as any)) {
                outValue = value as (typeof dimensionsd)[number];
            } else if (dimensionse.includes(value as any)) {
                outValue = ("minecraft:" +
                    value) as (typeof dimensionsd)[number];
            } else {
                throw new TypeError("Invalid dimension: " + value);
            }
        }
        this.player.setDynamicProperty("posD", outValue);
    }
    getSavedSelectionIds() {
        return this.player
            .getDynamicPropertyIds()
            .filter((v) => v.startsWith("savedSelection:"))
            .map((v) => v.slice(15));
    }
    getSavedSelection(selectionID: string) {
        if (
            !!!this.player.getDynamicProperty("savedSelection:" + selectionID)
        ) {
            return undefined;
        }
        return JSON.parse(
            String(
                this.player.getDynamicProperty("savedSelection:" + selectionID)
            )
        ) as {
            pos1: Vector3;
            pos2: Vector3;
            dimension: (typeof dimensionsd)[number];
        };
    }
    removeSavedSelection(selectionID: string) {
        if (
            !!!this.player.getDynamicProperty("savedSelection:" + selectionID)
        ) {
            return false;
        }
        this.player.setDynamicProperty("savedSelection:" + selectionID);
        return true;
    }
    saveSelection(
        selectionID: string,
        value: {
            pos1: Vector3;
            pos2: Vector3;
            dimension: (typeof dimensionsd)[number];
        } = {
            pos1: this.pos1,
            pos2: this.pos2,
            dimension: this.dimension.id as (typeof dimensionsd)[number],
        }
    ) {
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
                `Invalid value type, expected {pos1: Vector3, pos2: Vector3, dimension: ${dimensionsd
                    .map((s) => JSON.stringify(s))
                    .join(" | ")}}`
            );
        }
        this.player.setDynamicProperty(
            "savedSelection:" + selectionID,
            JSON.stringify(value)
        );
    }
    toJSON() {
        return {};
    }
}

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
        world.setDynamicProperty(`customUI:${formId}`, `${t.formValues[0]}|${t.formValues[1]}`)
        let elementValues = t.formValues.slice(2, -2)
        console.warn(elementValues)
        elementValues.forEach((v, i)=>{switch(i % 5){
            case 0: world.setDynamicProperty(`customUIElement:${formId}|${form.indexList[Math.floor(i / 5)]}`, `${customElementTypeIds[Number(elementValues[i])]}|${elementValues.slice(i+1, i+4).join("|")}`); break;
            case 4: if(Boolean(v)==true){world.setDynamicProperty(`customUIElement:${formId}|${form.indexList[Math.floor(i / 5)]}`)}; break;
        }});
        if (t.formValues[t.formValues.length-2]){world.setDynamicProperty(`customUIElement:${formId}|${(Number(t.formValues[t.formValues.length-1]) ?? ((form.indexList[form.indexList.length-1] ?? -1)+1))}`, ""); }
}).catch(e => {
    console.error(e, e.stack);
});}*/

Object.defineProperty(globalThis, "PlayerPermissions", {
    value: PlayerPermissions,
    enumerable: true,
    configurable: true,
    writable: false,
});

declare global {
    namespace globalThis {
        const WorldEditSelection: typeof import("./WorldEditSelection").WorldEditSelection;
    }
}
