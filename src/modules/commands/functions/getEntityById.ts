import { getAllEntities } from "modules/commands/functions/getAllEntities";

export function getEntityById(entityId: string | number) {
    return getAllEntities().find((v) => v.id == String(entityId));
}
