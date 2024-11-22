import { type Vector3, Dimension, world, Player } from "@minecraft/server";
import { getPlayerById } from "modules/commands/functions/getPlayerById";
import { LandClaimSystem } from "./LandClaimSystem";

export class LandClaim {
    area: { min: Vector3; max: Vector3; };
    dimension: Dimension;
    name: string;
    ownerId: string;
    ownerName?: string;
    saveId: string;
    format_version: string = format_version;
    land_claim_format_version: string = LandClaimSystem.land_claim_format_version;
    defaultPermissions: {
        breakBlocks: boolean;
        placeBlocks: boolean;
        interactWithBlocks: boolean;
        enterArea: boolean;
    } = {
            breakBlocks: false,
            placeBlocks: false,
            interactWithBlocks: false,
            enterArea: true,
        };
    customPermissions: {
        [playerId: string]: {
            playerName?: string;
            breakBlocks: boolean;
            placeBlocks: boolean;
            interactWithBlocks: boolean;
            enterArea: boolean;
        };
    } = {};
    constructor(claim: {
        saveId: string;
        area: { min: Vector3; max: Vector3; };
        dimension: string | Dimension;
        name: string;
        ownerId: string;
        format_version?: string;
        land_claim_format_version?: string;
        defaultPermissions?: {
            breakBlocks?: boolean;
            placeBlocks?: boolean;
            interactWithBlocks?: boolean;
            enterArea?: boolean;
        };
        customPermissions?: {
            [playerId: string]: {
                playerName?: string;
                breakBlocks: boolean;
                placeBlocks: boolean;
                interactWithBlocks: boolean;
                enterArea: boolean;
            };
        };
    }) {
        this.area = claim.area;
        this.dimension =
            typeof claim.dimension == "string"
                ? world.getDimension(claim.dimension)
                : claim.dimension;
        this.name = claim.name;
        this.ownerId = claim.ownerId;
        this.defaultPermissions = Object.assign(
            {
                breakBlocks: false,
                placeBlocks: false,
                interactWithBlocks: false,
                enterArea: true,
            },
            claim.defaultPermissions ?? {
                breakBlocks: false,
                placeBlocks: false,
                interactWithBlocks: false,
                enterArea: true,
            }
        );
        this.customPermissions = claim.customPermissions ?? {};
        this.saveId = claim.saveId;
    }
    get owner() {
        return getPlayerById(this.ownerId);
    }
    get isOwnerOnline() {
        return !!world.getAllPlayers().find((p) => p.id == this.ownerId);
    }
    get isSaved() {
        return !!world.getDynamicProperty(this.saveId);
    }
    toJSON() {
        return {
            area: this.area,
            dimension: this.dimension.id,
            name: this.name,
            ownerId: this.ownerId,
            ownerName: this.ownerName,
            defaultPermissions: this.defaultPermissions,
            customPermissions: this.customPermissions,
            format_version: this.format_version ?? format_version,
            land_claim_format_version: this.land_claim_format_version ??
                LandClaimSystem.land_claim_format_version,
        };
    }
    setPermissions(
        permissions: {
            playerName?: string;
            breakBlocks: boolean;
            placeBlocks: boolean;
            interactWithBlocks: boolean;
            enterArea: boolean;
        },
        playerOrPlayerId: Player | string,
        playerName?: string
    ) {
        this.customPermissions[typeof playerOrPlayerId == "string"
            ? playerOrPlayerId
            : playerOrPlayerId.id] = Object.assign(permissions, {
                playerName: permissions.playerName ??
                    (typeof playerOrPlayerId == "string"
                        ? playerName
                        : playerOrPlayerId.name),
            });
    }
    save(otherDataToChange: any, keepOldFormatVersion: boolean = false) {
        world.setDynamicProperty(
            this.saveId,
            Object.assign(
                Object.assign(
                    Object.assign(
                        world.getDynamicProperty(this.saveId) ?? {},
                        this.toJSON()
                    ),
                    otherDataToChange
                ),
                keepOldFormatVersion
                    ? {}
                    : {
                        format_version,
                        land_claim_format_version: LandClaimSystem.land_claim_format_version,
                    }
            )
        );
    }
    remove() {
        world.setDynamicProperty(this.saveId); /*; this=undefined*/
    }
    static get(claimId: string) {
        return !!world.getDynamicProperty(claimId)
            ? new LandClaim(
                Object.assign(
                    JSONParse(String(world.getDynamicProperty(claimId))),
                    { saveId: claimId }
                )
            )
            : undefined;
    }
    static delete(claimId: string) {
        world.setDynamicProperty(claimId);
    }
}
