import { type Entity } from "@minecraft/server";

export function getStringFromEntityDynamicProperties(entity: Entity, propertyName: string, zeroLengthPlaceholder: string = ""): string {
    if (typeof propertyName != "string") {
        throw (new TypeError(`args[0]: Expected type of string but got type of ${typeof propertyName} instead.`));
    }
    const length = Number(entity.getDynamicProperty(`${propertyName}.length`) ?? 0);
    const data: string[] = [];
    for (let i = 0n; i < length; i++) {
        data.push(entity.getDynamicProperty(`#splitString[${i}]:${propertyName}`) as string);
    }
    return length == 0 ? zeroLengthPlaceholder : data.join("");
}
