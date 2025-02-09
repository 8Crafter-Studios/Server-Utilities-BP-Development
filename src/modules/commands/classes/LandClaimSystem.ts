import { world, Player, type Vector3, type DimensionLocation } from "@minecraft/server";
import { doBoundingBoxesIntersect } from "modules/coordinates/functions/doBoundingBoxesIntersect";
import { LandClaim } from "./LandClaim";

export class LandClaimSystem {
    constructor() { }
    get warnAboutDeniedPermissions() {
        return Boolean(
            world.getDynamicProperty(
                "landClaimSystemSettings:warnAboutDeniedPermissions"
            ) ?? false
        );
    }
    set warnAboutDeniedPermissions(warn: boolean | undefined) {
        world.setDynamicProperty(
            "landClaimSystemSettings:warnAboutDeniedPermissions",
            warn
        );
    }
    static land_claim_format_version = "0.0.1-indev.1";
    static getClaims(claimIds: string[]) {
        let claims = [] as LandClaim[];
        claimIds.forEach((c) => claims.push(LandClaim.get(c)));
        return claims;
    }
    static getAllClaims() {
        let claims = [] as LandClaim[];
        this.getClaimIds().forEach((c) => claims.push(LandClaim.get(c)));
        return claims;
    }
    static getClaimIds() {
        return world
            .getDynamicPropertyIds()
            .filter((v) => v.startsWith("landClaim:"));
    }
    static getLandClaimIdsForPlayer(player: Player | string) {
        return world
            .getDynamicPropertyIds()
            .filter((v) => v.startsWith("landClaim:"))
            .filter(
                (v) => tryget(
                    () => JSONParse(String(world.getDynamicProperty(v)))
                        ?.ownerId
                ) == (typeof player == "string" ? player : player.id)
            );
    }
    static getLandClaimsForPlayer(player: Player | string) {
        return this.getClaims(this.getLandClaimIdsForPlayer(player));
    }
    static testIfPlayerCanDoActionInArea(
        action: "BreakBlock" |
            "PlaceBlock" |
            "InteractWithBlock" |
            "EnterArea" |
            "CreateExplosion",
        player: Player,
        location: DimensionLocation
    ) { }
    static testIfClaimAreaIsAlreadyClaimed(area: {
        min: Vector3;
        max: Vector3;
    }) {
        return this.getAllClaims()
            .map((c) => tryget(() => c.area))
            .filter((c) => !!c)
            .every((c) => !doBoundingBoxesIntersect(area, c));
    }
}
