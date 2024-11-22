import {
    Dimension,
    type Vector3,
    Entity,
    system,
    type VectorXZ,
} from "@minecraft/server";
import { getChunkIndexD } from "../modules/coordinates/functions/getChunkIndexD";
import { anglesToDirectionVectorDeg } from "../modules/coordinates/functions/anglesToDirectionVectorDeg";
import { undoClipboard } from "../modules/coordinates/classes/undoClipboard";

// LocalTeleport (Caret Notation ^^^)
export interface ILocalTeleport {
    sway_1: number;
    heave_2: number;
    surge_3: number;
}
export const LocalTeleportFunctions = {
    norm: ({ x, y, z }: Vector3, s: number) => {
        const l = Math.hypot(x, y, z);
        return {
            x: s * (x / l),
            y: s * (y / l),
            z: s * (z / l),
        };
    },

    xa: ({ x, y, z }: Vector3, s: number) => {
        const m = Math.hypot(x, z);
        const a = {
            x: z,
            y: 0,
            z: -x,
        };

        return LocalTeleportFunctions.norm(a, s);
    },

    ya: ({ x, y, z }: Vector3, s: number) => {
        const m = Math.hypot(x, z);

        const a = {
            x: (x / m) * -y,
            y: m,
            z: (z / m) * -y,
        };

        return LocalTeleportFunctions.norm(a, s);
    },

    za: (a: Vector3, s: number) => {
        return LocalTeleportFunctions.norm(a, s);
    },
};
Object.defineProperty(String.prototype, "localTeleport", {
    value: function (localTeleport: ILocalTeleport) {
        const { sway_1, heave_2, surge_3 } = localTeleport;
        const { location } = this;
        const viewDirection = this.getViewDirection();

        const xx = LocalTeleportFunctions.xa(viewDirection, sway_1);
        const yy = LocalTeleportFunctions.ya(viewDirection, heave_2);
        const zz = LocalTeleportFunctions.za(viewDirection, surge_3);

        const newPosition = {
            x: location.x + xx.x + yy.x + zz.x,
            y: location.y + xx.y + yy.y + zz.y,
            z: location.z + xx.z + yy.z + zz.z,
        };

        this.teleport(newPosition);
    },
});
Object.defineProperties(Entity.prototype, {
    directionvector: {
        get: function directionvector() {
            return anglesToDirectionVectorDeg(this.rotx, this.roty) as Vector3;
        },
        configurable: true,
        enumerable: true,
    },
    chunkIndex: {
        get: function chunkIndex(): VectorXZ {
            return getChunkIndexD(this.xz);
        },
        configurable: true,
        enumerable: true,
    },
});
system.runTimeout(() => undoClipboard.cullItemsMissingStructure(), 50);
export interface DimensionVolumeArea {
    dimension: Dimension;
    from: Vector3;
    to: Vector3;
}
export interface Vector4 {
    w: number;
    x: number;
    y: number;
    z: number;
}
export interface Vector5 {
    v: number;
    w: number;
    x: number;
    y: number;
    z: number;
}
export interface RotationLocation {
    rotX: number;
    rotY: number;
    x: number;
    y: number;
    z: number;
}
export interface DimensionRotationLocation {
    dimension: Dimension;
    rotX: number;
    rotY: number;
    x: number;
    y: number;
    z: number;
}
 /*

Entity.prototype.localTeleport = function (localTeleport: ILocalTeleport) { 
    const { sway_1, heave_2, surge_3 } = localTeleport 
    const { location } = this 
    const viewDirection = this.getViewDirection()

    const xx = LocalTeleportFunctions.xa(viewDirection, sway_1) 
    const yy = LocalTeleportFunctions.ya(viewDirection, heave_2) 
    const zz = LocalTeleportFunctions.za(viewDirection, surge_3) 

    const newPosition = { 
            x: location.x + xx.x + yy.x + zz.x, 
            y: location.y + xx.y + yy.y + zz.y, 
            z: location.z + xx.z + yy.z + zz.z 
    } 

    this.teleport(newPosition) 
}*/
/*
Math.asin*/
/*
export function drawCircleOutline(ctx, centerX, centerY, radius, thickness, color) {
    const numSegments = 100; // Number of segments for drawing the circle
    const step = (2 * Math.PI) / numSegments;

    for (let i = 0; i < numSegments; i++) {
        const angle = i * step;
        const x1 = centerX + radius * Math.cos(angle);
        const y1 = centerY + radius * Math.sin(angle);

        // Calculate the new radius for the outline
        const newRadius = radius + thickness;

        const x2 = centerX + newRadius * Math.cos(angle);
        const y2 = centerY + newRadius * Math.sin(angle);

        // Draw a line segment between (x1, y1) and (x2, y2)
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = color;
        ctx.stroke();
    }
}*/

/*
declare global {
    class Entity {
        localTeleport(localTeleport: ILocalTeleport): void;
    }}; */
