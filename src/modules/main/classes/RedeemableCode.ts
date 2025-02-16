import { StructureSaveMode, type Dimension, type DimensionLocation, type ItemStack } from "@minecraft/server";
import { getSuperUniqueID } from "modules/utilities/functions/getSuperUniqueID";

let codes: RedeemableCode[] = [];

export class RedeemableCode {
    code: string;
    readonly id: string;

    constructor(code: string) {
        if (!!codes.find((c) => c.code === code)) {
            throw new Error("Duplicate Code");
        }
        this.code = code;
        Object.defineProperty(this, "id", {
            value: getSuperUniqueID(),
            configurable: true,
            enumerable: false,
        });
    }
    save() {
        codes = codes.filter((c) => c.code !== this.code);
        codes.push(this);
        RedeemableCode.saveCodes();
    }
    remove() {
        codes = codes.filter((c) => c.code !== this.code);
        RedeemableCode.saveCodes();
        world.structureManager.delete("redeemableCodeItem:" + this.id);
    }
    getItem(loadLocation: DimensionLocation): ItemStack {
        world.structureManager.place("redeemableCodeItem:" + this.id, loadLocation.dimension, Vector.add(loadLocation, { x: 0, y: 10, z: 0 }), {
            includeBlocks: false,
            includeEntities: true,
        });
        const entity = loadLocation.dimension
            .getEntitiesAtBlockLocation(Vector.add(loadLocation, { x: 0, y: 10, z: 0 }))
            .find((v) => tryget(() => String(v.getDynamicProperty("andexdb:saved_item_save_id"))) == this.id);
        if (!!!entity) {
            throw new ReferenceError(
                `No entity with a andexdb:saved_item_save_id dynamic property set to ${this.id} was found inside of the specified structure.`
            );
        }
        const itemStack = entity.getComponent("inventory").container.getItem(0);
        entity.remove();
        return itemStack;
    }
    setItem(item: ItemStack, saveLocation: DimensionLocation): void {
        /**
         * This makes the script temporarily teleport the other entities away so that when it saves the storage entity, it can't save and possibly duplicate other entities.
         */
        var otherEntities =
            tryget(() => saveLocation.dimension.getEntitiesAtBlockLocation(Vector.add(saveLocation, { x: 0, y: 10, z: 0 })).filter((v) => v.id != entity.id)) ??
            [];
        var locs = otherEntities.map((v) => v.location);
        const entity = saveLocation.dimension.spawnEntity("andexdb:saved_item", {
            x: Math.floor(saveLocation.x) + 0.5,
            y: Math.floor(saveLocation.y) + 0.5,
            z: Math.floor(saveLocation.z) + 0.5,
        });
        entity.setDynamicProperty("andexdb:saved_item_save_id", this.id);
        entity.getComponent("inventory").container.setItem(0, item);
        otherEntities.forEach((v) => tryrun(() => v.teleport(Vector.add(v.location, { x: 0, y: 50, z: 0 }))));
        try {
            world.structureManager.createFromWorld(
                "redeemableCodeItem:" + this.id,
                saveLocation.dimension,
                {
                    x: Math.floor(saveLocation.x),
                    y: Math.floor(saveLocation.y),
                    z: Math.floor(saveLocation.z),
                },
                {
                    x: Math.floor(saveLocation.x),
                    y: Math.floor(saveLocation.y),
                    z: Math.floor(saveLocation.z),
                },
                {
                    includeBlocks: false,
                    includeEntities: true,
                    saveMode: StructureSaveMode.World,
                }
            );
        } catch (e) {
            console.error(e, e.stack);
        }
        try {
            entity.remove();
        } catch (e) {
            console.error(e, e.stack);
        }
        otherEntities.forEach((v, i) => tryrun(() => v.teleport(locs[i], { keepVelocity: false })));
    }
    static addCode(code: string, item: ItemStack, saveLocation: DimensionLocation) {
        const newCode = new RedeemableCode(code);
        newCode.setItem(item, saveLocation);
        newCode.save();
    }
    static removeCode(code: string) {
        codes = codes.filter((c) => c.code !== code);
        RedeemableCode.saveCodes();
    }
    static loadCodes() {
        codes = tryget(() => JSONB.parse(world.getStringFromDynamicProperties("redeemableCodes", "[]"))) ?? [];
    }
    static saveCodes() {
        world.saveStringToDynamicProperties("redeemableCodes", JSONB.stringify(codes), true);
    }
}

RedeemableCode.loadCodes();
