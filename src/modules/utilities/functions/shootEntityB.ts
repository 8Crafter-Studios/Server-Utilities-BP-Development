import type {
    EntityType,
    DimensionLocation,
    Vector2,
    Entity,
} from "@minecraft/server";
import { v3Multiply } from "Main";
import { caretNotationC } from "../../../Main/coordinates";
import { VECTOR3_ZERO, VECTOR3_FORWARD } from "@minecraft/math";

export function shootEntityB(
    entityType: string | EntityType,
    location: DimensionLocation,
    rotation: Vector2,
    power: number,
    setProjectileComponentPropertiesCallbackFn: (entity: Entity) => any = (
        a
    ) => {}
) {
    let entity = location.dimension.spawnEntity(String(entityType), location);
    try {
        setProjectileComponentPropertiesCallbackFn(entity);
    } catch (e) {
        console.error(e, e.stack);
    }
    entity.applyImpulse(
        caretNotationC(
            VECTOR3_ZERO,
            v3Multiply(VECTOR3_FORWARD, power),
            rotation
        )
    );
}
