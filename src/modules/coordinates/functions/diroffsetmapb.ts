export function diroffsetmapb(direction: string) {
    return {
        up: Vector.up,
        down: Vector.down,
        east: Vector.east,
        west: Vector.west,
        north: Vector.north,
        south: Vector.south,
    }[direction];
}
