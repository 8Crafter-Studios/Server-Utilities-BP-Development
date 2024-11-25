globalThis.clamp24HoursTo12Hours = function clamp24HoursTo12Hours(
    hours: number
) {
    return twoWayModulo(hours - 1, 12) + 1;
};
