import type { EntityType, DimensionLocation, Vector3, Entity } from "@minecraft/server";

export function shootEntity(entityType: string | EntityType, location: DimensionLocation, velocity: Vector3, setProjectileComponentPropertiesCallbackFn: (entity: Entity) => any = (a) => { }) { let entity = location.dimension.spawnEntity(String(entityType), location); try { setProjectileComponentPropertiesCallbackFn(entity); } catch (e) { console.error(e, e.stack); }; entity.applyImpulse(velocity); }
;
