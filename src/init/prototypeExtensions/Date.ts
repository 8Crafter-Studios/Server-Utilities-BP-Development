/**
 * init/prototypeExtensions/Date.ts
 * This requires that {@link module:init/prototypeExtensions/Number} be imported first.
 * @requires init/prototypeExtensions/Number
 * @module
 * @description This file adds some useful functions and properties to the `Date` prototype.
 */
import { world } from "@minecraft/server";
await (async()=>{if(!("toNumber" in Number.prototype)){
    await import("./Number")
}})()

Object.defineProperties(Date.prototype, {
    timezone: {
        value:
            config.system.timeZone,
        configurable: true,
        enumerable: true,
        writable: true,
    },
    toTimezone: {
        value: function toTimezone(
            UTCHourOffset: string | number | boolean | null | undefined
        ): Date {
            this.timezone = !!UTCHourOffset
                ? UTCHourOffset.toNumber()
                : config.system.timeZone;
            return this;
        },
        configurable: true,
        enumerable: true,
        writable: false,
    },
    toTimezoneDate: {
        value: function (
            UTCHourOffset?: string | number | boolean | null | undefined,
            includeTimeZoneOffset: boolean = false
        ): string {
            return this.formatDate(
                !!UTCHourOffset
                    ? UTCHourOffset.toNumber()
                    : this.timezone ?? config.system.timeZone,
                includeTimeZoneOffset
            );
        },
        configurable: true,
        enumerable: true,
        writable: false,
    },
    toTimezoneDateTime: {
        value: function (
            UTCHourOffset?: string | number | boolean | null | undefined,
            includeMs: boolean = false,
            includeTimeZoneOffset: boolean = false
        ): string {
            return this.formatDateTime(
                !!UTCHourOffset
                    ? UTCHourOffset.toNumber()
                    : this.timezone ?? config.system.timeZone,
                includeMs,
                includeTimeZoneOffset
            );
        },
        configurable: true,
        enumerable: true,
        writable: false,
    },
    toTimezoneTime: {
        value: function (
            UTCHourOffset?: string | number | boolean | null | undefined,
            includeMs: boolean = false,
            includeTimeZoneOffset: boolean = false
        ): string {
            return this.formatDateTime(
                !!UTCHourOffset
                    ? UTCHourOffset.toNumber()
                    : this.timezone ?? config.system.timeZone,
                includeMs,
                includeTimeZoneOffset
            );
        },
        configurable: true,
        enumerable: true,
        writable: false,
    },
    formatTime: {
        value: function formatTime(
            timeZoneOffset: number = this.timezone ?? config.system.timeZone,
            includeMs: boolean = false,
            includeTimeZoneOffset: boolean = false
        ) {
            const dateb = new Date(this.valueOf() + timeZoneOffset * 3600000);
            return `${clamp24HoursTo12Hours(dateb.getUTCHours())
                .toString()
                .padStart(2, "0")}:${dateb
                .getUTCMinutes()
                .toString()
                .padStart(2, "0")}:${dateb
                .getUTCSeconds()
                .toString()
                .padStart(2, "0")}${
                includeMs
                    ? `.${dateb
                          .getUTCMilliseconds()
                          .toString()
                          .padStart(3, "0")}`
                    : ""
            } ${dateb.getUTCHours() > 11 ? "P" : "A"}M${
                includeTimeZoneOffset
                    ? ` UTC${timeZoneOffset < 0 ? "-" : "+"}${Math.abs(
                          timeZoneOffset
                      )}`
                    : ""
            }`;
        },
        configurable: true,
        enumerable: true,
        writable: false,
    },
    formatDateTime: {
        value: function formatDateTime(
            timeZoneOffset: number = this.timezone ?? config.system.timeZone,
            includeMs: boolean = false,
            includeTimeZoneOffset: boolean = false
        ) {
            const dateb = new Date(this.valueOf() + timeZoneOffset * 3600000);
            return `${(dateb.getUTCMonth() + 1)
                .toString()
                .padStart(2, "0")}/${dateb
                .getUTCDate()
                .toString()
                .padStart(2, "0")}/${dateb
                .getUTCFullYear()
                .toString()} ${clamp24HoursTo12Hours(dateb.getUTCHours())
                .toString()
                .padStart(2, "0")}:${dateb
                .getUTCMinutes()
                .toString()
                .padStart(2, "0")}:${dateb
                .getUTCSeconds()
                .toString()
                .padStart(2, "0")}${
                includeMs
                    ? `.${dateb
                          .getUTCMilliseconds()
                          .toString()
                          .padStart(3, "0")}`
                    : ""
            } ${dateb.getUTCHours() > 11 ? "P" : "A"}M${
                includeTimeZoneOffset
                    ? ` UTC${timeZoneOffset < 0 ? "-" : "+"}${Math.abs(
                          timeZoneOffset
                      )}`
                    : ""
            }`;
        },
        configurable: true,
        enumerable: true,
        writable: false,
    },
    formatDate: {
        value: function formatDate(
            timeZoneOffset: number = this.timezone ?? config.system.timeZone,
            includeTimeZoneOffset: boolean = false
        ) {
            const dateb = new Date(this.valueOf() + timeZoneOffset * 3600000);
            return `${(dateb.getUTCMonth() + 1)
                .toString()
                .padStart(2, "0")}/${dateb
                .getUTCDate()
                .toString()
                .padStart(2, "0")}/${dateb.getUTCFullYear().toString()}${
                includeTimeZoneOffset
                    ? ` UTC${timeZoneOffset < 0 ? "-" : "+"}${Math.abs(
                          timeZoneOffset
                      )}`
                    : ""
            }`;
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
         * @since 1.26.0-preview.20+BUILD.2
         * @version 1.0.0
         */
        timezone: number;
        /**
         * Sets the timezone property of this Date object.
         * @since 1.26.0-preview.20+BUILD.2
         * @version 1.0.0
         */
        toTimezone(
            timezone?: number | string | boolean | null | undefined
        ): this;
        /**
         * Formats a date object to a time string formatted as 12:37:01 PM, or if includeMs is set to true, 12:37:01.572 PM.
         * If includeTimeZoneOffset is set to true, then it will add the UTC hour offset to the end of the string, it is formatted like UTC+8 or UTC-7.
         * @since 1.26.0-preview.20+BUILD.2
         * @version 1.1.0
         */
        toTimezoneTime(
            timezone?: number | string | boolean | null | undefined,
            includeMs?: boolean,
            includeTimeZoneOffset?: boolean
        ): string;
        /**
         * Formats a date object to a date time string formatted as 07/21/2024, 12:37:01 PM, or if includeMs is set to true, 07/21/2024, 12:37:01.572 PM.
         * If includeTimeZoneOffset is set to true, then it will add the UTC hour offset to the end of the string, it is formatted like UTC+8 or UTC-7.
         * @since 1.26.0-preview.20+BUILD.2
         * @version 1.1.0
         */
        toTimezoneDateTime(
            timezone?: number | string | boolean | null | undefined,
            includeMs?: boolean,
            includeTimeZoneOffset?: boolean
        ): string;
        /**
         * Formats a date object to a date string formatted as 07/21/2024.
         * If includeTimeZoneOffset is set to true, then it will add the UTC hour offset to the end of the string, it is formatted like UTC+8 or UTC-7.
         * @since 1.26.0-preview.20+BUILD.2
         * @version 1.1.0
         */
        toTimezoneDate(
            timezone?: number | string | boolean | null | undefined,
            includeTimeZoneOffset?: boolean
        ): string;
        /**
         * Formats a date object to a time string formatted as 12:37:01 PM, or if includeMs is set to true, 12:37:01.572 PM.
         * If includeTimeZoneOffset is set to true, then it will add the UTC hour offset to the end of the string, it is formatted like UTC+8 or UTC-7.
         * @since 1.26.0-preview.20+BUILD.2
         * @version 1.2.1
         */
        formatTime(
            timeZoneOffset?: number,
            includeMs?: boolean,
            includeTimeZoneOffset?: boolean
        ): string;
        /**
         * Formats a date object to a date time string formatted as 07/21/2024, 12:37:01 PM, or if includeMs is set to true, 07/21/2024, 12:37:01.572 PM.
         * If includeTimeZoneOffset is set to true, then it will add the UTC hour offset to the end of the string, it is formatted like UTC+8 or UTC-7.
         * @since 1.26.0-preview.20+BUILD.2
         * @version 1.2.1
         */
        formatDateTime(
            timeZoneOffset?: number,
            includeMs?: boolean,
            includeTimeZoneOffset?: boolean
        ): string;
        /**
         * Formats a date object to a date string formatted as 07/21/2024.
         * If includeTimeZoneOffset is set to true, then it will add the UTC hour offset to the end of the string, it is formatted like UTC+8 or UTC-7.
         * @since 1.26.0-preview.20+BUILD.2
         * @version 1.1.0
         */
        formatDate(
            timeZoneOffset?: number,
            includeTimeZoneOffset?: boolean
        ): string;
    }
}