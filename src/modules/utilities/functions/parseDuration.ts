/**
 * Parses a duration string and converts it to milliseconds.
 *
 * The duration string can contain multiple time units, such as "1h 30m" or "2 days 3 hours".
 * Supported time units are:
 * - ms, s, sec, secs, second, seconds
 * - m, min, mins, minute, minutes
 * - h, hr, hrs, hour, hours
 * - d, day, days
 * - w, wk, wks, week, weeks
 * - mo, month, months
 * - y, yr, yrs, year, years
 *
 * @param {string} durationString - The duration string to parse.
 * @returns {number} The total duration in milliseconds.
 * @throws {SyntaxError} Throws a syntax error if an unknown time unit is encountered.
 * @throws {SyntaxError} Throws a syntax error if no valid duration is found inside of the duration string.
 */
export function parseDuration(durationString: string): number {
    const units: { [key: string]: number } = {
        ms: 1,
        milliseconds: 1,
        s: 1000,
        sec: 1000,
        secs: 1000,
        second: 1000,
        seconds: 1000,
        m: 60000,
        min: 60000,
        mins: 60000,
        minute: 60000,
        minutes: 60000,
        h: 3600000,
        hr: 3600000,
        hrs: 3600000,
        hour: 3600000,
        hours: 3600000,
        d: 86400000,
        day: 86400000,
        days: 86400000,
        w: 604800000,
        wk: 604800000,
        wks: 604800000,
        week: 604800000,
        weeks: 604800000,
        mo: 2629800000,
        month: 2629800000,
        months: 2629800000,
        y: 31557600000,
        yr: 31557600000,
        yrs: 31557600000,
        year: 31557600000,
        years: 31557600000,
    };

    const extractionRegex = /([\d,]+\.?[\d,]*)\s?(\w+)(\s*([\d,]+\.?[\d,]*)\s?(\w+))*/;
    const extractedString = durationString.match(extractionRegex)?.[0];
    if (extractedString === undefined) {
        throw new SyntaxError("Invalid duration string.");
    }
    const regex = /([\d,]+\.?[\d,]*)\s*(\w+)/g;
    let match;
    let totalMilliseconds = 0;

    while ((match = regex.exec(extractedString)) !== null) {
        const value = parseFloat(match[1]!.replaceAll(",", ""));
        const unit = match[2]!.toLowerCase();
        if (units[unit] !== undefined) {
            totalMilliseconds += value * units[unit];
        } else {
            throw new SyntaxError(`Unknown time unit: ${unit}`);
        }
    }

    return totalMilliseconds;
}

export function parseDurationRelative(durationString: string, relativeTo: number = Date.now()): number {
    const date = new Date(relativeTo);
    const units: { [key: string]: (multiplier: number) => any } = {
        ms(multiplier: number) {
            date.setMilliseconds(date.getMilliseconds() + multiplier);
        },
        milliseconds(multiplier: number) {
            date.setMilliseconds(date.getMilliseconds() + multiplier);
        },
        s(multiplier: number) {
            date.setSeconds(date.getSeconds() + multiplier);
        },
        sec(multiplier: number) {
            date.setSeconds(date.getSeconds() + multiplier);
        },
        secs(multiplier: number) {
            date.setSeconds(date.getSeconds() + multiplier);
        },
        second(multiplier: number) {
            date.setSeconds(date.getSeconds() + multiplier);
        },
        seconds(multiplier: number) {
            date.setSeconds(date.getSeconds() + multiplier);
        },
        m(multiplier: number) {
            date.setMinutes(date.getMinutes() + multiplier);
        },
        min(multiplier: number) {
            date.setMinutes(date.getMinutes() + multiplier);
        },
        mins(multiplier: number) {
            date.setMinutes(date.getMinutes() + multiplier);
        },
        minute(multiplier: number) {
            date.setMinutes(date.getMinutes() + multiplier);
        },
        minutes(multiplier: number) {
            date.setMinutes(date.getMinutes() + multiplier);
        },
        h(multiplier: number) {
            date.setHours(date.getHours() + multiplier);
        },
        hr(multiplier: number) {
            date.setHours(date.getHours() + multiplier);
        },
        hrs(multiplier: number) {
            date.setHours(date.getHours() + multiplier);
        },
        hour(multiplier: number) {
            date.setHours(date.getHours() + multiplier);
        },
        hours(multiplier: number) {
            date.setHours(date.getHours() + multiplier);
        },
        d(multiplier: number) {
            date.setDate(date.getDate() + multiplier);
        },
        day(multiplier: number) {
            date.setDate(date.getDate() + multiplier);
        },
        days(multiplier: number) {
            date.setDate(date.getDate() + multiplier);
        },
        w(multiplier: number) {
            date.setDate(date.getDate() + multiplier);
        },
        wk(multiplier: number) {
            date.setDate(date.getDate() + multiplier);
        },
        wks(multiplier: number) {
            date.setDate(date.getDate() + multiplier);
        },
        week(multiplier: number) {
            date.setDate(date.getDate() + multiplier);
        },
        weeks(multiplier: number) {
            date.setDate(date.getDate() + multiplier);
        },
        mo(multiplier: number) {
            date.setMonth(date.getMonth() + multiplier);
        },
        month(multiplier: number) {
            date.setMonth(date.getMonth() + multiplier);
        },
        months(multiplier: number) {
            date.setMonth(date.getMonth() + multiplier);
        },
        y(multiplier: number) {
            date.setFullYear(date.getFullYear() + multiplier);
        },
        yr(multiplier: number) {
            date.setFullYear(date.getFullYear() + multiplier);
        },
        yrs(multiplier: number) {
            date.setFullYear(date.getFullYear() + multiplier);
        },
        year(multiplier: number) {
            date.setFullYear(date.getFullYear() + multiplier);
        },
        years(multiplier: number) {
            date.setFullYear(date.getFullYear() + multiplier);
        },
        de(multiplier: number) {
            date.setFullYear(date.getFullYear() + multiplier * 10);
        },
        dec(multiplier: number) {
            date.setFullYear(date.getFullYear() + multiplier * 10);
        },
        decs(multiplier: number) {
            date.setFullYear(date.getFullYear() + multiplier * 10);
        },
        decade(multiplier: number) {
            date.setFullYear(date.getFullYear() + multiplier * 10);
        },
        decades(multiplier: number) {
            date.setFullYear(date.getFullYear() + multiplier * 10);
        },
        ce(multiplier: number) {
            date.setFullYear(date.getFullYear() + multiplier * 100);
        },
        cent(multiplier: number) {
            date.setFullYear(date.getFullYear() + multiplier * 100);
        },
        cents(multiplier: number) {
            date.setFullYear(date.getFullYear() + multiplier * 100);
        },
        century(multiplier: number) {
            date.setFullYear(date.getFullYear() + multiplier * 100);
        },
        centries(multiplier: number) {
            date.setFullYear(date.getFullYear() + multiplier * 100);
        },
        mi(multiplier: number) {
            date.setFullYear(date.getFullYear() + multiplier * 1000);
        },
        mill(multiplier: number) {
            date.setFullYear(date.getFullYear() + multiplier * 1000);
        },
        millennium(multiplier: number) {
            date.setFullYear(date.getFullYear() + multiplier * 1000);
        },
        millennia(multiplier: number) {
            date.setFullYear(date.getFullYear() + multiplier * 1000);
        },
        millenniums(multiplier: number) {
            date.setFullYear(date.getFullYear() + multiplier * 1000);
        },
    };

    const extractionRegex = /([\d,]+\.?[\d,]*)\s?(\w+)(\s*([\d,]+\.?[\d,]*)\s?(\w+))*/;
    const extractedString = durationString.match(extractionRegex)?.[0];
    if (extractedString === undefined) {
        throw new SyntaxError("Invalid duration string.");
    }
    const regex = /([\d,]+\.?[\d,]*)\s*(\w+)/g;
    let match;

    while ((match = regex.exec(extractedString)) !== null) {
        const value = parseFloat(match[1]!.replaceAll(",", ""));
        const unit = match[2]!.toLowerCase();
        if (units[unit] !== undefined) {
            units[unit](value);
        } else {
            throw new SyntaxError(`Unknown time unit: ${unit}`);
        }
    }

    return date.getTime() - relativeTo;
}

export function formatDuration(startTime: number, endTime: number, options?: { includeMilliseconds?: boolean }): string {
    if(startTime === endTime){
        return (options?.includeMilliseconds ?? true) ? "0 milliseconds" : "0 seconds";
    }
    const startDate = new Date(startTime);
    const endDate = new Date(endTime);

    const years = endDate.getFullYear() - startDate.getFullYear();
    const months = endDate.getMonth() - startDate.getMonth() + years * 12;
    const weeks = Math.floor((endDate.getTime() - startDate.getTime()) / (7 * 24 * 60 * 60 * 1000));
    const days = Math.floor((endDate.getTime() - startDate.getTime()) / (24 * 60 * 60 * 1000));
    const hours = Math.floor((endDate.getTime() - startDate.getTime()) / (60 * 60 * 1000));
    const minutes = Math.floor((endDate.getTime() - startDate.getTime()) / (60 * 1000));
    const seconds = Math.floor((endDate.getTime() - startDate.getTime()) / 1000);
    const milliseconds = endDate.getTime() - startDate.getTime();

    const parts: string[] = [];

    if (years > 0) parts.push(`${years} year${years !== 1 ? "s" : ""}`);
    if (months > 0) parts.push(`${months % 12} month${months % 12 !== 1 ? "s" : ""}`);
    if (weeks > 0) parts.push(`${weeks % 4} week${weeks % 4 !== 1 ? "s" : ""}`);
    if (days > 0) parts.push(`${days % 7} day${days % 7 !== 1 ? "s" : ""}`);
    if (hours > 0) parts.push(`${hours % 24} hour${hours % 24 !== 1 ? "s" : ""}`);
    if (minutes > 0) parts.push(`${minutes % 60} minute${minutes % 60 !== 1 ? "s" : ""}`);
    if (seconds > 0) parts.push(`${seconds % 60} second${seconds % 60 !== 1 ? "s" : ""}`);
    if (milliseconds > 0 && (options?.includeMilliseconds ?? true)) parts.push(`${milliseconds % 1000} millisecond${milliseconds % 1000 !== 1 ? "s" : ""}`);

    return parts.join(" ");
}

export function formatDuration_compact(startTime: number, endTime: number, options?: { includeMilliseconds?: boolean }): string {
    if(startTime === endTime){
        return (options?.includeMilliseconds ?? true) ? "0ms" : "0s";
    }
    const startDate = new Date(startTime);
    const endDate = new Date(endTime);

    const years = endDate.getFullYear() - startDate.getFullYear();
    const months = endDate.getMonth() - startDate.getMonth() + years * 12;
    const weeks = Math.floor((endDate.getTime() - startDate.getTime()) / (7 * 24 * 60 * 60 * 1000));
    const days = Math.floor((endDate.getTime() - startDate.getTime()) / (24 * 60 * 60 * 1000));
    const hours = Math.floor((endDate.getTime() - startDate.getTime()) / (60 * 60 * 1000));
    const minutes = Math.floor((endDate.getTime() - startDate.getTime()) / (60 * 1000));
    const seconds = Math.floor((endDate.getTime() - startDate.getTime()) / 1000);
    const milliseconds = endDate.getTime() - startDate.getTime();

    const parts: string[] = [];

    if (years > 0) parts.push(`${years}y`);
    if (months > 0) parts.push(`${months % 12}mo`);
    if (weeks > 0) parts.push(`${weeks % 4}w`);
    if (days > 0) parts.push(`${days % 7}d`);
    if (hours > 0) parts.push(`${hours % 24}h`);
    if (minutes > 0) parts.push(`${minutes % 60}m`);
    if (seconds > 0) parts.push(`${seconds % 60}s`);
    if (milliseconds > 0 && (options?.includeMilliseconds ?? true)) parts.push(`${milliseconds % 1000}ms`);

    return parts.join(" ");
}
