import { type Entity } from "@minecraft/server";
import { splitUpStringData } from "./splitUpStringData";

export function saveStringToEntityDynamicProperties(entity: Entity, string: string, propertyName: string, clearOldProperties: boolean = true, chunkSize: number | bigint = 32760) {
    if (typeof propertyName != "string") {
        throw (new TypeError(`args[1]: Expected type of string but got type of ${typeof propertyName} instead.`));
    }
    if (typeof clearOldProperties != "boolean") {
        throw (new TypeError(`args[2]: Expected type of boolean but got type of ${typeof clearOldProperties} instead.`));
    }
    if (clearOldProperties) {
        const length = Number(entity.getDynamicProperty(`${propertyName}.length`) ?? 0);
        for (let i = 0n; i < length; i++) {
            entity.setDynamicProperty(`#splitString[${i}]:${propertyName}`);
        }
    }
    const data = splitUpStringData(string, chunkSize);
    data.forEach((s, i) => {
        entity.setDynamicProperty(`#splitString[${i}]:${propertyName}`, s);
    });
    entity.setDynamicProperty(`${propertyName}.length`, data.length);
}
