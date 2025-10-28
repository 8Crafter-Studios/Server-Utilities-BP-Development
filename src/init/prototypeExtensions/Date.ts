/**
 * init/prototypeExtensions/Date.ts
 * This requires that {@link module:init/prototypeExtensions/Number} be imported first.
 * @requires init/prototypeExtensions/Number
 * @module
 * @description This file adds some useful functions and properties to the `Date` prototype.
 */
import { TimeOfDay, world } from "@minecraft/server";
await (async (): Promise<void> => {
    if (!("toNumber" in Number.prototype)) {
        await import("./Number");
    }
})();

Object.defineProperties(Date.prototype, {
    timezone: {
        value: config.system.timeZone,
        configurable: true,
        enumerable: true,
        writable: true,
    },
    toTimezone: {
        value: function toTimezone(this: Date, UTCHourOffset: string | number | boolean | null | undefined): Date {
            this.timezone = UTCHourOffset?.toNumber() ?? config.system.timeZone;
            return this;
        },
        configurable: true,
        enumerable: true,
        writable: false,
    },
    toTimezoneDate: {
        value: function (this: Date, UTCHourOffset?: string | number | boolean | null | undefined, includeTimeZoneOffset: boolean = false): string {
            return this.formatDate(UTCHourOffset?.toNumber() ?? this.timezone ?? config.system.timeZone, includeTimeZoneOffset);
        },
        configurable: true,
        enumerable: true,
        writable: false,
    },
    toTimezoneDateTime: {
        value: function (
            this: Date,
            UTCHourOffset?: string | number | boolean | null | undefined,
            includeMs: boolean = false,
            includeTimeZoneOffset: boolean = false
        ): string {
            return this.formatDateTime(UTCHourOffset?.toNumber() ?? this.timezone ?? config.system.timeZone, includeMs, includeTimeZoneOffset);
        },
        configurable: true,
        enumerable: true,
        writable: false,
    },
    toTimezoneTime: {
        value: function (
            this: Date,
            UTCHourOffset?: string | number | boolean | null | undefined,
            includeMs: boolean = false,
            includeTimeZoneOffset: boolean = false
        ): string {
            return this.formatDateTime(UTCHourOffset?.toNumber() ?? this.timezone ?? config.system.timeZone, includeMs, includeTimeZoneOffset);
        },
        configurable: true,
        enumerable: true,
        writable: false,
    },
    formatTime: {
        value: function formatTime(
            this: Date,
            timeZoneOffset: number = this.timezone ?? config.system.timeZone,
            includeMs: boolean = false,
            includeTimeZoneOffset: boolean = false
        ): string {
            const dateB = new Date(this.valueOf() + timeZoneOffset * 3600000);
            return `${clamp24HoursTo12Hours(dateB.getUTCHours()).toString().padStart(2, "0")}:${dateB.getUTCMinutes().toString().padStart(2, "0")}:${dateB
                .getUTCSeconds()
                .toString()
                .padStart(2, "0")}${includeMs ? `.${dateB.getUTCMilliseconds().toString().padStart(3, "0")}` : ""} ${dateB.getUTCHours() > 11 ? "P" : "A"}M${
                includeTimeZoneOffset ? ` UTC${timeZoneOffset < 0 ? "-" : "+"}${Math.abs(timeZoneOffset)}` : ""
            }`;
        },
        configurable: true,
        enumerable: true,
        writable: false,
    },
    formatDateTime: {
        value: function formatDateTime(
            this: Date,
            timeZoneOffset: number = this.timezone ?? config.system.timeZone,
            includeMs: boolean = false,
            includeTimeZoneOffset: boolean = false
        ): string {
            const dateB = new Date(this.valueOf() + timeZoneOffset * 3600000);
            return `${(dateB.getUTCMonth() + 1).toString().padStart(2, "0")}/${dateB.getUTCDate().toString().padStart(2, "0")}/${dateB
                .getUTCFullYear()
                .toString()} ${clamp24HoursTo12Hours(dateB.getUTCHours()).toString().padStart(2, "0")}:${dateB
                .getUTCMinutes()
                .toString()
                .padStart(2, "0")}:${dateB.getUTCSeconds().toString().padStart(2, "0")}${
                includeMs ? `.${dateB.getUTCMilliseconds().toString().padStart(3, "0")}` : ""
            } ${dateB.getUTCHours() > 11 ? "P" : "A"}M${includeTimeZoneOffset ? ` UTC${timeZoneOffset < 0 ? "-" : "+"}${Math.abs(timeZoneOffset)}` : ""}`;
        },
        configurable: true,
        enumerable: true,
        writable: false,
    },
    formatDate: {
        value: function formatDate(
            this: Date,
            timeZoneOffset: number = this.timezone ?? config.system.timeZone,
            includeTimeZoneOffset: boolean = false
        ): string {
            const dateB = new Date(this.valueOf() + timeZoneOffset * 3600000);
            return `${(dateB.getUTCMonth() + 1).toString().padStart(2, "0")}/${dateB.getUTCDate().toString().padStart(2, "0")}/${dateB
                .getUTCFullYear()
                .toString()}${includeTimeZoneOffset ? ` UTC${timeZoneOffset < 0 ? "-" : "+"}${Math.abs(timeZoneOffset)}` : ""}`;
        },
        configurable: true,
        enumerable: true,
        writable: false,
    },
    toTimeOfDay: {
        value: function toTimeOfDay(this: Date, UTCHourOffset?: string | number | boolean | null | undefined, floor: boolean = true): number {
            const dateB = new Date(this.valueOf() + ((UTCHourOffset ?? this.timezone ?? config.system.timeZone)?.toNumber() ?? 0) * 3600000);
            const dateC = new Date(
                1970,
                0,
                1,
                // Subtract 6 from the hours because a time of day of 0 in Minecraft is 6 AM.
                twoWayModulo(dateB.getUTCHours() - 6, 24),
                dateB.getUTCMinutes(),
                dateB.getUTCSeconds(),
                dateB.getUTCMilliseconds()
            );
            const timeOfDay: number = dateC.valueOf() / 3600;
            return floor ? Math.floor(timeOfDay) : timeOfDay;
        },
        configurable: true,
        enumerable: true,
        writable: false,
    },
});

Object.defineProperties(Date, {
    fromTimeOfDay: {
        value: function fromTimeOfDay(
            this: typeof Date,
            timeOfDay: number,
            baseTime: Date | number = Date.now(),
            UTCHourOffset?: string | number | boolean | null | undefined
        ): Date {
            const timeOfDayMs: number = timeOfDay * 3600;
            return new Date(
                baseTime.valueOf() -
                    // Reset base time to the start of the day.
                    Math.abs(baseTime.valueOf() % 86400000) +
                    // Apply the time of day offset.
                    timeOfDayMs +
                    // Apply the UTC hour offset.
                    (UTCHourOffset?.toNumber() ?? config.system.timeZone) * 3600000
            );
        },
        configurable: true,
        enumerable: true,
        writable: false,
    },
});

declare global {
    interface Date {
        /**
         * The timezone, specified as the hours offset from UTC.
         *
         * @since 1.26.0-preview.20+BUILD.2
         * @version 1.0.0
         */
        timezone: number;
        /**
         * Sets the timezone property of this Date object.
         *
         * @param timezone The timezone, specified as the hours offset from UTC.
         * @returns This Date object.
         *
         * @since 1.26.0-preview.20+BUILD.2
         * @version 1.0.1
         */
        toTimezone(timezone?: number | string | boolean | null | undefined): this;
        /**
         * Formats a date object to a time string formatted as 12:37:01 PM, or if includeMs is set to true, 12:37:01.572 PM.
         * If includeTimeZoneOffset is set to true, then it will add the UTC hour offset to the end of the string, it is formatted like UTC+8 or UTC-7.
         *
         * @param timeZoneOffset The UTC hour offset to apply to the date. If not provided, the current UTC hour offset will be used.
         * @param includeMs Whether to include milliseconds in the date time string. Defaults to `false`.
         * @param includeTimeZoneOffset Whether to include the UTC hour offset to the end of the string, it is formatted like UTC+8 or UTC-7. Defaults to `false`.
         * @returns A string representing the time.
         *
         * @since 1.26.0-preview.20+BUILD.2
         * @version 1.1.1
         */
        toTimezoneTime(timezone?: number | string | boolean | null | undefined, includeMs?: boolean, includeTimeZoneOffset?: boolean): string;
        /**
         * Formats a date object to a date time string formatted as 07/21/2024, 12:37:01 PM, or if includeMs is set to true, 07/21/2024, 12:37:01.572 PM.
         * If includeTimeZoneOffset is set to true, then it will add the UTC hour offset to the end of the string, it is formatted like UTC+8 or UTC-7.
         *
         * @param timeZoneOffset The UTC hour offset to apply to the date. If not provided, the current UTC hour offset will be used.
         * @param includeMs Whether to include milliseconds in the date time string. Defaults to `false`.
         * @param includeTimeZoneOffset Whether to include the UTC hour offset to the end of the string, it is formatted like UTC+8 or UTC-7. Defaults to `false`.
         * @returns A string representing the date time.
         *
         * @since 1.26.0-preview.20+BUILD.2
         * @version 1.1.1
         */
        toTimezoneDateTime(timezone?: number | string | boolean | null | undefined, includeMs?: boolean, includeTimeZoneOffset?: boolean): string;
        /**
         * Formats a date object to a date string formatted as 07/21/2024.
         * If includeTimeZoneOffset is set to true, then it will add the UTC hour offset to the end of the string, it is formatted like UTC+8 or UTC-7.
         *
         * @param timeZoneOffset The UTC hour offset to apply to the date. If not provided, the current UTC hour offset will be used.
         * @param includeTimeZoneOffset Whether to include the UTC hour offset to the end of the string, it is formatted like UTC+8 or UTC-7. Defaults to `false`.
         * @returns A string representing the date.
         *
         * @since 1.26.0-preview.20+BUILD.2
         * @version 1.1.1
         */
        toTimezoneDate(timezone?: number | string | boolean | null | undefined, includeTimeZoneOffset?: boolean): string;
        /**
         * Formats a date object to a time string formatted as 12:37:01 PM, or if includeMs is set to true, 12:37:01.572 PM.
         * If includeTimeZoneOffset is set to true, then it will add the UTC hour offset to the end of the string, it is formatted like UTC+8 or UTC-7.
         *
         * @param timeZoneOffset The UTC hour offset to apply to the date. If not provided, the current UTC hour offset will be used.
         * @param includeMs Whether to include milliseconds in the time string. Defaults to `false`.
         * @param includeTimeZoneOffset Whether to include the UTC hour offset to the end of the string, it is formatted like UTC+8 or UTC-7. Defaults to `false`.
         * @returns A string representing the time.
         *
         * @since 1.26.0-preview.20+BUILD.2
         * @version 1.2.2
         */
        formatTime(timeZoneOffset?: number, includeMs?: boolean, includeTimeZoneOffset?: boolean): string;
        /**
         * Formats a date object to a date time string formatted as 07/21/2024, 12:37:01 PM, or if includeMs is set to true, 07/21/2024, 12:37:01.572 PM.
         * If includeTimeZoneOffset is set to true, then it will add the UTC hour offset to the end of the string, it is formatted like UTC+8 or UTC-7.
         *
         * @param timeZoneOffset The UTC hour offset to apply to the date. If not provided, the current UTC hour offset will be used.
         * @param includeMs Whether to include milliseconds in the date time string. Defaults to `false`.
         * @param includeTimeZoneOffset Whether to include the UTC hour offset to the end of the string, it is formatted like UTC+8 or UTC-7. Defaults to `false`.
         * @returns A string representing the date time.
         *
         * @since 1.26.0-preview.20+BUILD.2
         * @version 1.2.2
         */
        formatDateTime(timeZoneOffset?: number, includeMs?: boolean, includeTimeZoneOffset?: boolean): string;
        /**
         * Formats a date object to a date string formatted as 07/21/2024.
         * If includeTimeZoneOffset is set to true, then it will add the UTC hour offset to the end of the string, it is formatted like UTC+8 or UTC-7.
         *
         * @param timeZoneOffset The UTC hour offset to apply to the date. If not provided, the current UTC hour offset will be used.
         * @param includeTimeZoneOffset Whether to include the UTC hour offset to the end of the string, it is formatted like UTC+8 or UTC-7. Defaults to `false`.
         * @returns A string representing the date.
         *
         * @since 1.26.0-preview.20+BUILD.2
         * @version 1.1.1
         */
        formatDate(timeZoneOffset?: number, includeTimeZoneOffset?: boolean): string;
        /**
         * Converts a date to a Minecraft time of day value.
         *
         * @param UTCHourOffset The UTC hour offset to apply to the date. If not provided, the current UTC hour offset will be used.
         * @param floor Whether to floor the time of day to an integer. Defaults to `true`.
         * @returns An integer representing the time of day in Minecraft, between 0 (inclusive) and 24000 (exclusive).
         *
         * @since 1.41.0-preview.20+BUILD.1
         * @version 1.0.0
         */
        toTimeOfDay(UTCHourOffset?: string | number | boolean | null | undefined, floor?: boolean): number;
    }
    interface DateConstructor {
        /**
         * Creates a new Date object from a Minecraft time of day value.
         *
         * @param timeOfDay The time of day in Minecraft, between 0 (inclusive) and 24000 (exclusive).
         * @param baseTime The base date to use for the conversion. If not provided, the current date will be used.
         * @param UTCHourOffset The UTC hour offset to apply to the date. If not provided, the current UTC hour offset will be used.
         * @returns A new Date object representing the time of day in Minecraft.
         *
         * @since 1.41.0-preview.20+BUILD.1
         * @version 1.0.0
         */
        fromTimeOfDay(timeOfDay: number, baseTime?: Date | number, UTCHourOffset?: string | number | boolean | null | undefined): Date;
    }
}
