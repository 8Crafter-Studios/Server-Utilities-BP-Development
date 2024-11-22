import type {
    EntityType,
    DimensionLocation,
    Vector2,
    EntityProjectileComponent,
    ProjectileShootOptions,
} from "@minecraft/server";
import { v3Multiply } from "Main";
import { caretNotationC } from "modules/coordinates/functions/caretNotationC";
import { VECTOR3_ZERO, VECTOR3_FORWARD } from "@minecraft/math";

export function shootProjectileB(
    entityType: string | EntityType,
    location: DimensionLocation,
    rotation: Vector2,
    power: number,
    shootOptions: ProjectileShootOptions = {},
    setProjectileComponentPropertiesCallbackFn: (
        entityProjectileComponent: EntityProjectileComponent
    ) => any = (a) => {}
) {
    let entityProjectileComponent = location.dimension
        .spawnEntity(String(entityType), location)
        .getComponent("projectile");
    try {
        setProjectileComponentPropertiesCallbackFn(entityProjectileComponent);
    } catch (e) {
        console.error(e, e.stack);
    }
    entityProjectileComponent?.shoot(
        caretNotationC(
            VECTOR3_ZERO,
            v3Multiply(VECTOR3_FORWARD, power),
            rotation
        ),
        shootOptions
    );
}
