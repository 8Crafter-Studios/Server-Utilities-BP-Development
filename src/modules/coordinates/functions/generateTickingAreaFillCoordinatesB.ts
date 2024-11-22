import { CompoundBlockVolume, Dimension, type DimensionLocation, BlockVolume } from "@minecraft/server";
import { vTStr } from "modules/commands/functions/vTStr";

export function generateTickingAreaFillCoordinatesB(
    area: CompoundBlockVolume,
    dimension: Dimension,
    spawnEntityCallback: (
        location: DimensionLocation,
        locations: DimensionLocation[],
        index: number
    ) => any = (l, e, i) => {
        try {
            let name = `generateTickingAreaFillCoordinates${Date.now()}EntityTickingArea${i}`;
            l.dimension.runCommand(
                `summon andexdb:tickingarea_6 ${name} ${vTStr(l)}`
            );
            e.push(l);
        } catch (e) {
            console.warn(e, e.stack);
        }
    }
) {
    const locations = [] as DimensionLocation[];
    //${se}let b = new CompoundBlockVolume(); b.pushVolume({volume: new BlockVolume(Vector.one, Vector.multiply(Vector.one, 20)), action: 0}); bsend(b.getBlockLocationIterator()?.next()?.value);
    for (let x = 0; !!(() => {
        for (const c of area.getBlockLocationIterator()) {
            return c;
        }
    })(); x++) {
        let a = (() => {
            for (const c of area.getBlockLocationIterator()) {
                return c;
            }
        })();
        area.pushVolume({
            volume: new BlockVolume(
                { x: a.x - 64, y: area.getMin().y, z: a.z - 64 },
                { x: a.x + 64, y: area.getMax().y, z: a.z + 64 }
            ),
            action: 1,
        });
        spawnEntityCallback(
            Object.assign(a, { dimension: dimension, y: 320 }),
            locations,
            x
        );
    }
    return locations;
}
