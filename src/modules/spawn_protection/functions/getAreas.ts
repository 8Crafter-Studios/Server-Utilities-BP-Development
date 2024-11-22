import { world, type Vector3 } from "@minecraft/server";

export function getAreas(prefix: string) {
    let a = world.getDynamicPropertyIds().filter((dpi) => (dpi.startsWith(prefix)));
    a.forEach((aelement) => { tryrun(() => { String(world.setDynamicProperty("v2:" + aelement, ((v) => (JSON.stringify({ from: { x: Number(v[0]), y: Number(v[1]), z: Number(v[2]) }, to: { x: Number(v[3]), y: Number(v[4]), z: Number(v[5]) }, dimension: 0, mode: Number(v[6]) == 1 ? 1 : 0, icon_path: String(v[7] ?? "") })))(String(world.getDynamicProperty(aelement)).split(",")))); world.setDynamicProperty(aelement); }); });
    let c = world.getDynamicPropertyIds().filter((dpi) => (dpi.startsWith("v2:" + prefix)));
    let d = c.map(v => tryget(() => JSON.parse(String(world.getDynamicProperty(v))))) as { dimension: number; from: Vector3; to: Vector3; mode: 0 | 1; icon_path?: string; }[];
    d.forEach(v => v.mode == 1 ? undefined : v.mode == 0 ? undefined : v.mode = 0);
    return { positive: d.filter(v => v.mode == 0), negative: d.filter(v => v.mode == 1) };

}
