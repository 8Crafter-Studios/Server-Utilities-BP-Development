import { ActionFormData, ModalFormData } from "@minecraft/server-ui";
import { customFormUICodes } from "../constants/customFormUICodes";
import { extractPlayerFromLooseEntityType } from "modules/utilities/functions/extractPlayerFromLooseEntityType";
import { showMessage } from "modules/utilities/functions/showMessage";
import type { loosePlayerType } from "modules/utilities/types/loosePlayerType";
import { forceShow } from "./forceShow";
import type {
    andexdbAfterEvents,
    andexdbBeforeEvents,
    Events_andexdbAfterEvents,
    Events_andexdbBeforeEvents,
    Events_SystemAfterEvents,
    Events_SystemBeforeEvents,
    Events_WorldAfterEvents,
    Events_WorldBeforeEvents,
    SubscribedEventTypeID,
} from "init/classes/events";
import type { System, World } from "@minecraft/server";
import { showActions } from "modules/utilities/functions/showActions";
import moment from "moment";
import { securityVariables } from "security/ultraSecurityModeUtils";

/**
 *
 *
 * @param {loosePlayerType} sourceEntity - The player accessing the menu.
 * @param {number} [pagen] - The page of the menu to go to. Defaults to 0.
 * @param {number} [maxentriesperpage] - How many entries to show per page. Defaults to the value of {@linkcode config.ui.pages.maxPlayersPerManagePlayersPage}.
 * @returns {Promise<0 | 1>} A promise that resolves to `0` if the previous menu should be closed, or `1` if the previous menu should be reopened.
 * @throws {TypeError} If sourceEntity is not an instance of the Player class or an instance of the executeCommandPlayerW class with a Player linked to it.
 */
export async function manageEventSubscriptions_event<EventTypeID extends SubscribedEventTypeID>(
    sourceEntity: loosePlayerType,
    eventType: EventTypeID,
    pagen: number = 0,
    maxentriesperpage: number = config.ui.pages.maxPlayersPerManagePlayersPage ?? 9,
    search?: {
        value: string;
        caseSensitive?: boolean;
    },
    cachedEntries?: SubscribedEvent<EventTypeID>[]
): Promise<0 | 1> {
    let loadedEventsOfTypeRef: SubscribedEvent<EventTypeID>[] = Events.loadedEvents as any;
    eventType.split(".").forEach((key) => {
        loadedEventsOfTypeRef = loadedEventsOfTypeRef[key as keyof typeof loadedEventsOfTypeRef] as any;
    });
    if (!loadedEventsOfTypeRef) {
        throw new TypeError(`Unsupported event type: ${JSON.stringify(eventType)}.`);
    }
    if (!(loadedEventsOfTypeRef instanceof Array)) {
        throw new TypeError(`Broken event type: ${JSON.stringify(eventType)}. The loaded events list for this event type is not an array.`);
    }
    const player = extractPlayerFromLooseEntityType(sourceEntity);
    [].sort;
    var currentParameters = {
        player,
        pagen,
        maxentriesperpage,
        search,
        cachedEntries,
    };
    while (true) {
        const { player, pagen, maxentriesperpage, search, cachedEntries } = currentParameters;
        const form = new ActionFormData();
        const page = Math.max(0, pagen);
        let displayEntries: SubscribedEvent<EventTypeID>[] = cachedEntries ?? [];
        if (cachedEntries === undefined) {
            displayEntries = loadedEventsOfTypeRef
                .filter((v) =>
                    !!search
                        ? search.caseSensitive == true
                            ? (v.data.metadata.displayName ?? "Untitled Event Subscription").includes(search.value)
                            : (v.data.metadata.displayName ?? "Untitled Event Subscription").toLowerCase().includes(search.value.toLowerCase())
                        : true
                )
                .sort((a: SubscribedEvent<EventTypeID>, b: SubscribedEvent<EventTypeID>) =>
                    (a.data.metadata.displayName ?? "Untitled Event Subscription") > (b.data.metadata.displayName ?? "Untitled Event Subscription")
                        ? 1
                        : (a.data.metadata.displayName ?? "Untitled Event Subscription") < (b.data.metadata.displayName ?? "Untitled Event Subscription")
                        ? -1
                        : (a.creationTime ?? 0) - (b.creationTime ?? 0)
                );
        }
        const numentries = displayEntries.length;
        form.title(
            `${customFormUICodes.action.titles.formStyles.gridMenu}${!!search ? "Search Results" : `Event Subscriptions`} ${Math.min(
                numentries,
                page * maxentriesperpage + 1
            )}-${Math.min(numentries, (page + 1) * maxentriesperpage)} of ${numentries}`
        );
        const numpages = Math.ceil(numentries / maxentriesperpage);
        if (!!search) {
            form.body(
                `\nSearching for: ${JSON.stringify(search.value)}\nCase Sensitive: ${JSON.stringify(
                    search.caseSensitive ?? false
                )}\nEvent subscriptions for: ${eventType}`
            );
        } else {
            form.body(`Event Subscriptions for: ${eventType}`);
        }
        // Navigation and Filters
        form.button(customFormUICodes.action.buttons.positions.left_side_only + "Search", "textures/ui/spyglass_flat");
        form.button(
            customFormUICodes.action.buttons.positions.left_side_only +
                (page != 0 ? "" : customFormUICodes.action.buttons.options.disabled + "§8") +
                "Previous Page",
            "textures/ui/arrow_left"
        );
        form.button(
            customFormUICodes.action.buttons.positions.left_side_only +
                (numpages > 1 ? "" : customFormUICodes.action.buttons.options.disabled + "§8") +
                "Go To Page",
            "textures/ui/page"
        );
        form.button(
            customFormUICodes.action.buttons.positions.left_side_only +
                (page < numpages - 1 ? "" : customFormUICodes.action.buttons.options.disabled + "§8") +
                "Next Page",
            "textures/ui/arrow_right"
        );
        form.button(customFormUICodes.action.buttons.positions.right_side_only + "New Subscription", "textures/ui/color_plus");
        // Padding
        form.button("");
        // Entries
        let displayEntriesB = displayEntries.slice(page * maxentriesperpage, (page + 1) * maxentriesperpage);
        displayEntriesB.forEach((v) => {
            form.button(
                customFormUICodes.action.buttons.positions.main_only + (v.data.metadata.displayName ?? "Untitled Event Subscription"),
                v.data.metadata.displayIcon
            );
        });
        form.button(customFormUICodes.action.buttons.positions.title_bar_only + "Back", "textures/ui/arrow_left");
        form.button(customFormUICodes.action.buttons.positions.title_bar_only + "Close", "textures/ui/crossout");
        form.button(customFormUICodes.action.buttons.positions.title_bar_only + "Refresh", "textures/ui/refresh");
        try {
            const r = await forceShow(form, player);
            if (r.canceled) return 1;

            switch (
                (["search", "previous", "go", "next", "newSubscription", ""] as const)[r.selection] ??
                (!!displayEntriesB[r.selection - 6] ? "entry" : undefined) ??
                (["back", "close", "refresh"] as const)[r.selection - displayEntriesB.length - 6]
            ) {
                case "search":
                    {
                        const r = await tryget(
                            async () =>
                                await new ModalFormData()
                                    .title("Search")
                                    .textField("", "Search", search?.value ?? "")
                                    .toggle("Case Sensitive", search?.caseSensitive ?? false)
                                    .submitButton("Search")
                                    .forceShow(player)
                        );
                        if (!!!r || r.canceled == true) {
                            continue;
                        }
                        currentParameters = {
                            player,
                            pagen: undefined,
                            maxentriesperpage,
                            search: {
                                value: r.formValues[0] as string,
                                caseSensitive: r.formValues[1] as boolean,
                            },
                            cachedEntries: undefined,
                        };
                    }
                    continue;
                case "previous":
                    currentParameters = { player, pagen: Math.max(0, page - 1), maxentriesperpage, search, cachedEntries };
                    continue;
                case "go": {
                    const r = await tryget(
                        async () =>
                            await new ModalFormData()
                                .title("Go To Page")
                                .textField(`Current Page: ${page + 1}\nPage # (Between 1 and ${numpages})`, "Page #")
                                .submitButton("Go To Page")
                                .forceShow(player)
                    );
                    currentParameters = {
                        player,
                        pagen: Math.max(1, Math.min(numpages, (r.formValues?.[0] as string)?.toNumber() ?? page + 1)) - 1,
                        maxentriesperpage,
                        search,
                        cachedEntries: displayEntries,
                    };
                    continue;
                }
                case "next":
                    currentParameters = { player, pagen: Math.min(numpages - 1, page + 1), maxentriesperpage, search, cachedEntries: displayEntries };
                    continue;
                case "newSubscription":
                    if ((await manageEventSubscriptions_event_newSubscription(player, eventType)) === 1) {
                        currentParameters = { player, pagen: page, maxentriesperpage, search, cachedEntries: displayEntries };
                        continue;
                    } else {
                        return 0;
                    }
                case "entry":
                    if ((await manageEventSubscriptions_event_subscription(player, displayEntriesB[r.selection - 6])) === 1) {
                        currentParameters = { player, pagen: page, maxentriesperpage, search, cachedEntries: displayEntries };
                        continue;
                    } else {
                        return 0;
                    }
                case "refresh":
                    currentParameters = { player, pagen: page, maxentriesperpage, search, cachedEntries: undefined };
                    continue;
                case "back":
                    return 1;
                case "close":
                    return 0;
                default:
                    throw new Error(`Invalid selection: ${r.selection}`);
            }
        } catch (e) {
            console.error(e, e.stack);
            // Present the error to the user, and return 1 if they select "Back", and 0 if they select "Close".
            return ((await showMessage(player, "An Error occurred", `An error occurred: ${e}${e?.stack}`, "Back", "Close")).selection !== 1).toNumber();
        }
    }
}

/**
 * A menu to create a new event subscription.
 *
 * @param {loosePlayerType} sourceEntity - The player viewing the UI.
 * @returns {Promise<0 | 1>} A promise that resolves to `0` if the previous menu should be closed, or `1` if the previous menu should be reopened.
 * @throws {TypeError} If sourceEntity is not an instance of the Player class or an instance of the executeCommandPlayerW class with a Player linked to it.
 * @throws {TypeError} If the event type is unsupported.
 */
export async function manageEventSubscriptions_event_newSubscription<EventTypeID extends SubscribedEventTypeID>(
    sourceEntity: loosePlayerType,
    eventType: EventTypeID
): Promise<0 | 1> {
    let eventRef:
        | Events_SystemBeforeEvents[keyof Events_SystemBeforeEvents]
        | Events_SystemAfterEvents[keyof Events_SystemAfterEvents]
        | Events_WorldBeforeEvents[keyof Events_WorldBeforeEvents]
        | Events_WorldAfterEvents[keyof Events_WorldAfterEvents]
        | Events_andexdbBeforeEvents[keyof Events_andexdbBeforeEvents]
        | Events_andexdbAfterEvents[keyof Events_andexdbAfterEvents] = { system: Events.system, world: Events.world, andexdb: Events.andexdb } as any;
    eventType.split(".").forEach((key) => {
        eventRef = eventRef[key as keyof typeof eventRef] as any;
    });
    if (!eventRef) {
        throw new TypeError(`Unsupported event type: ${JSON.stringify(eventType)}.`);
    }
    const player = extractPlayerFromLooseEntityType(sourceEntity);
    const defaultOptions = {
        displayName: "",
        iconPath: "",
        code: "",
        enabled: true,
    };
    while (true) {
        const form = new ModalFormData();
        form.textField("Display Name", "string", defaultOptions.displayName);
        form.textField("Icon Path", "texture path", defaultOptions.iconPath);
        form.textField("Code\nex. (event)=>{event.cancel=true}", "JavaScript", defaultOptions.code);
        form.toggle("Enabled", defaultOptions.enabled);
        form.submitButton("Subscribe");
        const r = await form.forceShow(player);
        if (r.canceled) return 1 as const;
        try {
            const subscription = eventRef.subscribe(r.formValues![2] as string);
            subscription.data.enabled = r.formValues![3] as boolean;
            if (!subscription.data.enabled) {
                subscription.deinitialize();
            }
            subscription.data.metadata.displayName = r.formValues![0] as string;
            subscription.data.metadata.displayIcon = r.formValues![1] as string;
            Events.save();
            return 1;
        } catch (e) {
            if ((await showMessage(player, "An Error occurred", `An error occurred: ${e}${e?.stack}`, "Back", "Close")).selection !== 1) {
                defaultOptions.displayName = r.formValues![0] as string;
                defaultOptions.iconPath = r.formValues![1] as string;
                defaultOptions.code = r.formValues![2] as string;
                defaultOptions.enabled = r.formValues![3] as boolean;
                continue;
            } else {
                return 0;
            }
        }
    }
}

/**
 * Manages an event subscription.
 *
 * @param {loosePlayerType} sourceEntity - The player viewing the UI.
 * @returns {Promise<0 | 1>} A promise that resolves to `0` if the previous menu should be closed, or `1` if the previous menu should be reopened.
 * @throws {TypeError} If sourceEntity is not an instance of the Player class or an instance of the executeCommandPlayerW class with a Player linked to it.
 */
export async function manageEventSubscriptions_event_subscription<EventTypeID extends SubscribedEventTypeID>(
    sourceEntity: loosePlayerType,
    subscription: SubscribedEvent<EventTypeID>
): Promise<0 | 1> {
    const player = extractPlayerFromLooseEntityType(sourceEntity);
    const timeZone = player.timeZone;
    while (true) {
        try {
            const form = new ActionFormData();
            form.title(`${customFormUICodes.action.titles.formStyles.medium}Manage Event Subscription`);
            form.body(
                `Display Name: ${subscription.data.metadata.displayName ?? "Untitled Event Subscription"}\nEvent Type: ${
                    subscription.data.eventType
                }\nCreation Date: ${
                    formatDateTime(new Date(subscription.creationTime), timeZone) + " UTC" + (timeZone > 0 || Object.is(timeZone, 0) ? "+" : "") + timeZone
                } (${moment(subscription.creationTime).fromNow(false)})`
            );
            form.button(customFormUICodes.action.buttons.positions.main_only + "Settings", "textures/ui/icon_setting");
            form.button(customFormUICodes.action.buttons.positions.main_only + "Edit Code", "textures/ui/pencil_edit_icon");
            form.button(
                customFormUICodes.action.buttons.positions.main_only + (subscription.data.enabled ? "§aEnabled" : "§cDisabled"),
                subscription.data.enabled ? "textures/ui/toggle_on" : "textures/ui/toggle_off"
            );
            form.button(customFormUICodes.action.buttons.positions.title_bar_only + "Back", "textures/ui/arrow_left");
            form.button(customFormUICodes.action.buttons.positions.title_bar_only + "Close", "textures/ui/crossout");
            form.button(customFormUICodes.action.buttons.positions.title_bar_only + "Refresh", "textures/ui/refresh");
            form.button(customFormUICodes.action.buttons.positions.title_bar_only + "Raw Data", "textures/ui/debug_glyph_color");
            const r = await form.forceShow(player);
            if (r.canceled) return 1 as const;
            switch ((["settings", "editCode", "toggle", "back", "close", "refresh", "rawData"] as const)[r.selection]) {
                case "settings":
                    if ((await manageEventSubscriptions_event_subscription_settings(player, subscription)) === 1) {
                        continue;
                    } else {
                        return 0;
                    }
                case "editCode":
                    if ((await manageEventSubscriptions_event_subscription_editCode(player, subscription)) === 1) {
                        continue;
                    } else {
                        return 0;
                    }
                case "toggle":
                    subscription.data.enabled = !subscription.data.enabled;
                    Events.save();
                    continue;
                case "back":
                    return 1;
                case "close":
                    return 0;
                case "refresh":
                    continue;
                case "rawData":
                    if (
                        (
                            await showActions(
                                player,
                                customFormUICodes.action.titles.formStyles.medium + "Raw Data",
                                JSONB.stringify(subscription, undefined, 4),
                                [customFormUICodes.action.buttons.positions.main_only + "Done"],
                                [customFormUICodes.action.buttons.positions.title_bar_only + "Back", "textures/ui/arrow_left"],
                                [customFormUICodes.action.buttons.positions.title_bar_only + "Close", "textures/ui/crossout"]
                            )
                        ).selection !== 2
                    ) {
                        continue;
                    } else {
                        return 0;
                    }
                default:
                    throw new Error("Invalid selection: " + r.selection);
            }
        } catch (e) {
            console.error(e, e.stack);
            // Present the error to the user, and return 1 if they select "Back", and 0 if they select "Close".
            return ((await showMessage(player, "An Error occurred", `An error occurred: ${e}${e?.stack}`, "Back", "Close")).selection !== 1).toNumber();
        }
    }
}

/**
 * Manages an event subscription's settings.
 *
 * @param {loosePlayerType} sourceEntity - The player viewing the UI.
 * @returns {Promise<0 | 1>} A promise that resolves to `0` if the previous menu should be closed, or `1` if the previous menu should be reopened.
 * @throws {TypeError} If sourceEntity is not an instance of the Player class or an instance of the executeCommandPlayerW class with a Player linked to it.
 */
export async function manageEventSubscriptions_event_subscription_settings<EventTypeID extends SubscribedEventTypeID>(
    sourceEntity: loosePlayerType,
    subscription: SubscribedEvent<EventTypeID>
): Promise<1> {
    const player = extractPlayerFromLooseEntityType(sourceEntity);
    const form = new ModalFormData();
    form.textField("Display Name", "string", subscription.data.metadata.displayName);
    form.textField("Icon Path", "texture path", subscription.data.metadata.displayIcon);
    form.submitButton("Save");
    const r = await form.forceShow(player);
    if (r.canceled) return 1 as const;
    if ((r.formValues![0] as string) !== "") {
        subscription.data.metadata.displayName = r.formValues?.[0] as string;
    } else {
        delete subscription.data.metadata.displayName;
    }
    if ((r.formValues![1] as string) !== "") {
        subscription.data.metadata.displayIcon = r.formValues?.[1] as string;
    } else {
        delete subscription.data.metadata.displayIcon;
    }
    Events.save();
    return 1;
}

/**
 * Manages an event subscription's code.
 *
 * @param {loosePlayerType} sourceEntity - The player viewing the UI.
 * @returns {Promise<0 | 1>} A promise that resolves to `0` if the previous menu should be closed, or `1` if the previous menu should be reopened.
 * @throws {TypeError} If sourceEntity is not an instance of the Player class or an instance of the executeCommandPlayerW class with a Player linked to it.
 */
export async function manageEventSubscriptions_event_subscription_editCode<EventTypeID extends SubscribedEventTypeID>(
    sourceEntity: loosePlayerType,
    subscription: SubscribedEvent<EventTypeID>
): Promise<1> {
    const player = extractPlayerFromLooseEntityType(sourceEntity);
    const form = new ModalFormData();
    form.textField("Code", "JavaScript", subscription.data.code);
    form.submitButton("Save");
    const r = await form.forceShow(player);
    if (r.canceled) return 1 as const;
    subscription.data.code = r.formValues?.[0] as string;
    Events.save();
    return 1;
}

/**
 * Manages event subscriptions.
 *
 * @param {loosePlayerType} sourceEntity - The player viewing the UI.
 * @returns {Promise<0 | 1>} A promise that resolves to `0` if the previous menu should be closed, or `1` if the previous menu should be reopened.
 * @throws {TypeError} If sourceEntity is not an instance of the Player class or an instance of the executeCommandPlayerW class with a Player linked to it.
 */
export async function manageEventSubscriptions(sourceEntity: loosePlayerType): Promise<0 | 1> {
    const player = extractPlayerFromLooseEntityType(sourceEntity);
    while (true) {
        try {
            if (securityVariables.ultraSecurityModeEnabled) {
                if (
                    securityVariables.testPlayerForPermission(player, "andexdb.accessAdvancedSettings") == false ||
                    securityVariables.testPlayerForPermission(player, "andexdb.useScriptEval") == false
                ) {
                    const r = await showMessage(
                        player,
                        "Access Denied (403)",
                        "You do not have permission to access this menu. You need the following permission to access this menu: andexdb.accessAdvancedSettings, andexdb.useScriptEval.",
                        "Back",
                        "Cancel"
                    );
                    if (r.canceled || r.selection == 0) {
                        return 1;
                    } else {
                        return 0;
                    }
                }
            }
            const form = new ActionFormData();
            form.title(customFormUICodes.action.titles.formStyles.medium + "Manage Event Subscriptions");
            const eventCategories: (keyof typeof Events.loadedEvents)[] = Object.keys(Events.loadedEvents) as (keyof typeof Events.loadedEvents)[];
            eventCategories.forEach((e) => form.button(customFormUICodes.action.buttons.positions.main_only + e));
            form.button(customFormUICodes.action.buttons.positions.title_bar_only + "Back", "textures/ui/arrow_left");
            form.button(customFormUICodes.action.buttons.positions.title_bar_only + "Close", "textures/ui/crossout");
            form.button(
                customFormUICodes.action.buttons.positions.title_bar_only +
                    "Reload Subscriptions\n§o§7Clears the list of currently loaded event subscriptions and loads the saved event subscriptions.§r",
                "textures/ui/reload_red"
            );
            form.button(
                customFormUICodes.action.buttons.positions.title_bar_only + "Reinitialize Subscriptions\n§o§7Reloads the code of all event subscriptions.§r",
                "textures/ui/reload_black"
            );
            const r = await form.forceShow(player);
            if (r.canceled) return 1 as const;
            switch (
                (!!eventCategories[r.selection] ? "category" : undefined) ??
                (["back", "close", "reloadSubscriptions", "reinitializeSubscriptions"] as const)[r.selection - eventCategories.length]
            ) {
                case "category":
                    if ((await manageEventSubscriptions_category_selectBeforeOrAfterEvents(player, eventCategories[r.selection])) === 1) {
                        continue;
                    } else {
                        return 0;
                    }
                case "back":
                    return 1;
                case "close":
                    return 0;
                case "reloadSubscriptions":
                    if (
                        (
                            await showMessage(
                                player,
                                "Are you sure?",
                                "Are you sure you want to reload the list of currently loaded event subscriptions and load the saved event subscriptions?\nAny unsaved changes will be lost.\nThis action cannot be undone.",
                                "Cancel",
                                "Reload"
                            )
                        ).selection === 1
                    ) {
                        Events.load(true, true);
                        if (
                            (
                                await showMessage(
                                    player,
                                    "Subscriptions Reloaded",
                                    "Successfully reloaded the list of currently loaded event subscriptions and loaded the saved event subscriptions.",
                                    "Back",
                                    "Close"
                                )
                            ).selection !== 1
                        ) {
                            continue;
                        } else {
                            return 0;
                        }
                    } else {
                        continue;
                    }
                case "reinitializeSubscriptions":
                    Events.reinitialize();
                    continue;
                default:
                    throw new Error("Invalid selection: " + r.selection);
            }
        } catch (e) {
            console.error(e, e.stack);
            // Present the error to the user, and return 1 if they select "Back", and 0 if they select "Close".
            return ((await showMessage(player, "An Error occurred", `An error occurred: ${e}${e?.stack}`, "Back", "Close")).selection !== 1).toNumber();
        }
    }
}

/**
 * Prompts whether to manage event subscriptions for the before or after events of an event category.
 *
 * @template {keyof typeof Events.loadedEvents} Category The category of events to manage.
 * @param {loosePlayerType} sourceEntity - The player viewing the UI.
 * @returns {Promise<0 | 1>} A promise that resolves to `0` if the previous menu should be closed, or `1` if the previous menu should be reopened.
 * @throws {TypeError} If sourceEntity is not an instance of the Player class or an instance of the executeCommandPlayerW class with a Player linked to it.
 */
export async function manageEventSubscriptions_category_selectBeforeOrAfterEvents<Category extends keyof typeof Events.loadedEvents>(
    sourceEntity: loosePlayerType,
    category: Category
): Promise<0 | 1> {
    const player = extractPlayerFromLooseEntityType(sourceEntity);
    while (true) {
        try {
            const form = new ActionFormData();
            form.title(customFormUICodes.action.titles.formStyles.medium + "Manage Event Subscriptions");
            form.button(customFormUICodes.action.buttons.positions.main_only + "Before Events");
            form.button(customFormUICodes.action.buttons.positions.main_only + "After Events");
            form.button(customFormUICodes.action.buttons.positions.title_bar_only + "Back", "textures/ui/arrow_left");
            form.button(customFormUICodes.action.buttons.positions.title_bar_only + "Close", "textures/ui/crossout");
            form.button(customFormUICodes.action.buttons.positions.title_bar_only + "Refresh", "textures/ui/refresh");
            const r = await form.forceShow(player);
            if (r.canceled) return 1 as const;
            switch ((["beforeEvents", "afterEvents", "back", "close", "refresh"] as const)[r.selection]) {
                case "beforeEvents":
                    if ((await manageEventSubscriptions_category(player, category, "beforeEvents")) === 1) {
                        continue;
                    } else {
                        return 0;
                    }
                case "afterEvents":
                    if ((await manageEventSubscriptions_category(player, category, "afterEvents")) === 1) {
                        continue;
                    } else {
                        return 0;
                    }
                case "back":
                    return 1;
                case "close":
                    return 0;
                default:
                    throw new Error("Invalid selection: " + r.selection);
            }
        } catch (e) {
            console.error(e, e.stack);
            // Present the error to the user, and return 1 if they select "Back", and 0 if they select "Close".
            return ((await showMessage(player, "An Error occurred", `An error occurred: ${e}${e?.stack}`, "Back", "Close")).selection !== 1).toNumber();
        }
    }
}

/**
 * Manages event subscriptions for an event category.
 *
 * @param {loosePlayerType} sourceEntity - The player viewing the UI.
 * @returns {Promise<0 | 1>} A promise that resolves to `0` if the previous menu should be closed, or `1` if the previous menu should be reopened.
 * @throws {TypeError} If sourceEntity is not an instance of the Player class or an instance of the executeCommandPlayerW class with a Player linked to it.
 */
export async function manageEventSubscriptions_category<
    Category extends keyof typeof Events.loadedEvents,
    BeforeOrAfter extends "beforeEvents" | "afterEvents" = "beforeEvents"
>(sourceEntity: loosePlayerType, category: Category, beforeOrAfter: BeforeOrAfter): Promise<0 | 1> {
    const player = extractPlayerFromLooseEntityType(sourceEntity);
    while (true) {
        try {
            const form = new ActionFormData();
            form.title(`${customFormUICodes.action.titles.formStyles.medium}Manage Event Subscriptions: ${category}.${beforeOrAfter}`);
            const events: (
                | keyof System["beforeEvents"]
                | keyof System["afterEvents"]
                | keyof World["beforeEvents"]
                | keyof World["afterEvents"]
                | keyof andexdbBeforeEvents
                | keyof andexdbAfterEvents
            )[] = Object.keys(Events.loadedEvents[category][beforeOrAfter]) as (
                | keyof System["beforeEvents"]
                | keyof System["afterEvents"]
                | keyof World["beforeEvents"]
                | keyof World["afterEvents"]
                | keyof andexdbBeforeEvents
                | keyof andexdbAfterEvents
            )[];
            
            events.forEach((e) => {
                const length: number = (Events.loadedEvents[category][beforeOrAfter][e as keyof typeof Events.loadedEvents[Category][BeforeOrAfter]] as SubscribedEvent<SubscribedEventTypeID>[]).length;
                form.button(`${customFormUICodes.action.buttons.positions.main_only}${e}\n${length > 1 ? `${length} Subscriptions` : length === 1 ? "1 Subscription" : "No Subscriptions"}`);
            });
            form.button(customFormUICodes.action.buttons.positions.title_bar_only + "Back", "textures/ui/arrow_left");
            form.button(customFormUICodes.action.buttons.positions.title_bar_only + "Close", "textures/ui/crossout");
            form.button(customFormUICodes.action.buttons.positions.title_bar_only + "Refresh", "textures/ui/refresh");
            const r = await form.forceShow(player);
            if (r.canceled) return 1 as const;
            switch ((!!events[r.selection] ? "event" : undefined) ?? (["back", "close", "refresh"] as const)[r.selection - events.length]) {
                case "event":
                    if ((await manageEventSubscriptions_event(player, `${category}.${beforeOrAfter}.${events[r.selection]}` as SubscribedEventTypeID)) === 1) {
                        continue;
                    } else {
                        return 0;
                    }
                case "back":
                    return 1;
                case "close":
                    return 0;
                default:
                    throw new Error("Invalid selection: " + r.selection);
            }
        } catch (e) {
            console.error(e, e.stack);
            // Present the error to the user, and return 1 if they select "Back", and 0 if they select "Close".
            return ((await showMessage(player, "An Error occurred", `An error occurred: ${e}${e?.stack}`, "Back", "Close")).selection !== 1).toNumber();
        }
    }
}
