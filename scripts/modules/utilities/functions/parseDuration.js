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
export function parseDuration(durationString) {
    const units = {
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
    const extractionRegex = /(\d+\.?\d*)\s?(\w+)(\s*(\d+\.?\d*)\s?(\w+))*/;
    const extractedString = durationString.match(extractionRegex)?.[0];
    if (extractedString === null) {
        throw new SyntaxError("Invalid duration string.");
    }
    const regex = /(\d+\.?\d*)\s*(\w+)/g;
    let match;
    let totalMilliseconds = 0;
    while ((match = regex.exec(extractedString)) !== null) {
        const value = parseFloat(match[1]);
        const unit = match[2].toLowerCase();
        if (units[unit] !== undefined) {
            totalMilliseconds += value * units[unit];
        }
        else {
            throw new SyntaxError(`Unknown time unit: ${unit}`);
        }
    }
    return totalMilliseconds;
}
//# sourceMappingURL=parseDuration.js.map