import { type DimensionLocation, Player, type Vector3, world } from "@minecraft/server";
import { getPlayerById } from "init/functions/getPlayerById";
import { HomeSystem } from "./HomeSystem";

/**
 * Represents a home for the home system.
 */
export class Home {
    /**
     * The location and dimension of the home.
     */
    location: DimensionLocation;
    /**
     * The name of the home.
     */
    name: string;
    /**
     * The ID of the owner of the home.
     */
    ownerId: string;
    /**
     * The name of the owner of the home.
     */
    ownerName?: string;
    /**
     * The save ID of the home.
     */
    saveId: string;
    /**
     * The version of the add-on that this home was saved with.
     */
    format_version?: string;
    /**
     * The format version the home system was on when this home was saved.
     */
    home_format_version?: string;
    /**
     * Creates an instance of the `Home` class.
     * @param {object} home The home to create.
     * @param {DimensionLocation} home.location The location and dimension of the home.
     * @param {string} home.name The name of the home.
     * @param {Player} [home.owner] The owner of the home.
     * @param {string} [home.ownerId] The ID of the owner of the home.
     * @param {string} [home.ownerName] The name of the owner of the home.
     * @param {string} home.saveId The save ID of the home.
     * @param {string} [home.format_version] The version of the add-on that this home was saved with.
     * @param {string} [home.home_format_version] The format version the home system was on when this home was saved.
     * @returns The created home.
     */
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
    /**
     * Returns the owner of the home if they are online, otherwise returns undefined.
     * @returns {Player | undefined} The owner of the home if they are online, otherwise returns undefined.
     */
    get owner(): Player | undefined {
        return getPlayerById(this.ownerId);
    }
    /**
     * Checks if the owner of the home is online.
     * @returns {boolean} True if the owner of the home is online, false otherwise.
     */
    get isOwnerOnline(): boolean {
        return !!world.getAllPlayers().find((p) => p.id == this.ownerId);
    }
    /**
     * Checks if the home is saved.
     * @returns {boolean} True if the home is saved, false otherwise.
     */
    get isSaved(): boolean {
        return !!world.getDynamicProperty(this.saveId);
    }
    /**
     * Converts the home to a JSON object.
     * @returns {{ location: Vector3 & { dimension: string; }; name: string; ownerId: string; ownerName: string; format_version: string; home_format_version: string; }} The JSON object representing this home.
     */
    toJSON(): { location: Vector3 & { dimension: string; }; name: string; ownerId: string; ownerName: string; format_version: string; home_format_version: string; } {
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
    /**
     * Saves the home.
     * @param {Partial<ReturnType<Home["toJSON"]>>} [otherDataToChange = {}] Additional data to add to the home.
     * @param {boolean} [keepOldFormatVersion = false] If set to true, the format version won't be set to the current version.
     */
    save(otherDataToChange: Partial<ReturnType<Home["toJSON"]>> = {}, keepOldFormatVersion: boolean = false): void {
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
    /**
     * Removes the home.
     */
    remove(): void {
        world.setDynamicProperty(this.saveId);
    }
    /**
     * Gets the home with the given save ID.
     * @param {string} homeId The save ID of the home.
     * @returns {Home} The home with the given save ID.
     */
    static get(homeId: string): Home {
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
    /**
     * Deletes the home with the given save ID.
     *
     * This function just deletes the world dynamic property with the given ID.
     *
     * @param {string} homeId The save ID of the home to delete.
     */
    static delete(homeId: string): void {
        world.setDynamicProperty(homeId);
    }
}
