import { type DimensionLocation, Player, world } from "@minecraft/server";
import { getPlayerById } from "modules/commands/functions/getPlayerById";
import { HomeSystem } from "./HomeSystem";

export class Home {
    location: DimensionLocation;
    name: string;
    ownerId: string;
    ownerName?: string;
    saveId: string;
    format_version?: string;
    home_format_version?: string;
    constructor(home: {
        location: DimensionLocation;
        name: string;
        owner?: Player;
        ownerId?: string;
        ownerName?: string;
        saveId: string;
        format_version?: string;
        home_format_version?: string;
    }) {
        this.location = home.location;
        this.name = home.name;
        this.ownerId = home.ownerId ?? home.owner?.id;
        this.ownerName = home.ownerName ?? home.owner?.name;
        this.saveId = home.saveId;
        this.format_version = home.format_version ?? format_version;
        this.home_format_version =
            home.home_format_version ?? HomeSystem.home_format_version;
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
            location: Object.assign(this.location, {
                dimension: this.location.dimension.id,
            }),
            name: this.name,
            ownerId: this.ownerId,
            ownerName: this.ownerName,
            format_version: this.format_version ?? format_version,
            home_format_version: this.home_format_version ?? HomeSystem.home_format_version,
        };
    }
    save(otherDataToChange: any = {}, keepOldFormatVersion: boolean = false) {
        world.setDynamicProperty(
            this.saveId,
            JSONStringify(
                Object.assign(
                    Object.assign(
                        Object.assign(
                            JSONParse(
                                String(
                                    world.getDynamicProperty(this.saveId) ??
                                    "{}"
                                )
                            ) ?? {},
                            this.toJSON()
                        ),
                        otherDataToChange
                    ),
                    keepOldFormatVersion
                        ? {}
                        : {
                            format_version,
                            home_format_version: HomeSystem.home_format_version,
                        }
                )
            )
        );
    }
    remove() {
        world.setDynamicProperty(this.saveId);
    }
    static get(homeId: string) {
        return !!world.getDynamicProperty(homeId)
            ? new Home(
                Object.assign(
                    JSONParse(String(world.getDynamicProperty(homeId))),
                    {
                        saveId: homeId,
                        location: Object.assign(
                            JSONParse(
                                String(world.getDynamicProperty(homeId))
                            ).location,
                            {
                                dimension: world.getDimension(
                                    JSONParse(
                                        String(
                                            world.getDynamicProperty(homeId)
                                        )
                                    ).location.dimension
                                ),
                            }
                        ),
                    }
                )
            )
            : undefined;
    }
    static delete(homeId: string) {
        world.setDynamicProperty(homeId);
    }
}
