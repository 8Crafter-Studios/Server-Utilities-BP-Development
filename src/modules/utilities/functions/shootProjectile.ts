import type {
    EntityType,
    DimensionLocation,
    Vector3,
    EntityProjectileComponent,
    ProjectileShootOptions,
} from "@minecraft/server";

export function shootProjectile(
    entityType: string | EntityType,
    location: DimensionLocation,
    velocity: Vector3,
    shootOptions: ProjectileShootOptions = {},
    setProjectileComponentPropertiesCallbackFn: (
        EntityProjectileComponent: EntityProjectileComponent
    ) => any = (a) => {}
) {
    let entityProjectileComponent = location.dimension
        .spawnEntity(String(entityType), location)
        .getComponent("projectile")!;
    try {
        setProjectileComponentPropertiesCallbackFn(entityProjectileComponent);
    } catch (e) {
        console.error(e, e.stack);
    }
    entityProjectileComponent?.shoot(velocity, shootOptions);
}
