import {
    Vector3Builder,
    Vector3Utils,
    VECTOR3_ZERO,
    VECTOR3_ONE,
    VECTOR3_UP,
    VECTOR3_DOWN,
    VECTOR3_NORTH,
    VECTOR3_SOUTH,
    VECTOR3_EAST,
    VECTOR3_WEST,
    VECTOR3_RIGHT,
    VECTOR3_LEFT,
    VECTOR3_BACK,
    VECTOR3_FORWARD,
} from "@minecraft/math.js";
import type { Vector3 } from "@minecraft/server";

namespace exports {
    /**
     * Utilities operating on Vector3 objects.
     *
     * This is a mixture of the {@link Vector3Builder} and {@link Vector3Utils} classes.
     */
    export class Vector extends Vector3Builder implements Vector3Utils {
        /**
         * zero
         *
         * A unit vector representing the value of 0 in all directions (0,0,0)
         *
         * @public
         */
        public zero: {x: 0, y: 0, z: 0} & Vector3 = VECTOR3_ZERO as { x: 0; y: 0; z: 0 };
        /**
         * one
         *
         * A unit vector representing the value of 1 in all directions (1,1,1)
         *
         * @public
         */
        public one: {x: 1, y: 1, z: 1} & Vector3 = VECTOR3_ONE as { x: 1; y: 1; z: 1 };
        /**
         * up
         *
         * A unit vector representing the world UP direction (0,1,0)
         *
         * @public
         */
        public up: {x: 0, y: 1, z: 0} & Vector3 = VECTOR3_UP as { x: 0; y: 1; z: 0 };
        /**
         * down
         *
         * A unit vector representing the world DOWN direction (0,-1,0)
         *
         * @public
         */
        public down: {x: 0, y: -1, z: 0} & Vector3 = VECTOR3_DOWN as { x: 0; y: -1; z: 0 };
        /**
         * north
         *
         * A unit vector representing the world NORTH direction (0,0,1)
         *   (same as FORWARD)
         *
         * @public
         */
        public north: {x: 0, y: 0, z: 1} & Vector3 = VECTOR3_NORTH as { x: 0; y: 0; z: 1 };
        /**
         * south
         *
         * A unit vector representing the world SOUTH direction (0,0,-1)
         *   (same as BACK)
         *
         * @public
         */
        public south: {x: 0, y: 0, z: -1} & Vector3 = VECTOR3_SOUTH as { x: 0; y: 0; z: -1 };
        /**
         * east
         *
         * A unit vector representing the world EAST direction (1,0,0)
         *   (same as RIGHT)
         *
         * @public
         */
        public east: {x: 1, y: 0, z: 0} & Vector3 = VECTOR3_EAST as { x: 1; y: 0; z: 0 };
        /**
         * west
         *
         * A unit vector representing the world WEST direction (-1,0,0)
         *   (same as LEFT)
         *
         * @public
         */
        public west: {x: -1, y: 0, z: 0} & Vector3 = VECTOR3_WEST as { x: -1; y: 0; z: 0 };
        /**
         * right
         *
         * A unit vector representing the world RIGHT direction (1,0,0)
         *
         * @public
         */
        public right: {x: 1, y: 0, z: 0} & Vector3 = VECTOR3_RIGHT as { x: 1; y: 0; z: 0 };
        /**
         * left
         *
         * A unit vector representing the world LEFT direction (-1,0,0)
         *
         * @public
         */
        public left: {x: -1, y: 0, z: 0} & Vector3 = VECTOR3_LEFT as { x: -1; y: 0; z: 0 };
        /**
         * back
         *
         * A unit vector representing the world BACK direction (0,0,-1)
         *
         * @public
         */
        public back: {x: 0, y: 0, z: -1} & Vector3 = VECTOR3_BACK as { x: 0; y: 0; z: -1 };
        /**
         * forward
         *
         * A unit vector representing the world FORWARD direction (0,0,1)
         *
         * @public
         */
        public forward: {x: 0, y: 0, z: 1} & Vector3 = VECTOR3_FORWARD as { x: 0; y: 0; z: 1 };
        /**
         * zero
         *
         * A unit vector representing the value of 0 in all directions (0,0,0)
         *
         * @public
         */
        public static zero: {x: 0, y: 0, z: 0} & Vector3 = VECTOR3_ZERO as { x: 0; y: 0; z: 0 };
        /**
         * one
         *
         * A unit vector representing the value of 1 in all directions (1,1,1)
         *
         * @public
         */
        public static one: {x: 1, y: 1, z: 1} & Vector3 = VECTOR3_ONE as { x: 1; y: 1; z: 1 };
        /**
         * up
         *
         * A unit vector representing the world UP direction (0,1,0)
         *
         * @public
         */
        public static up: {x: 0, y: 1, z: 0} & Vector3 = VECTOR3_UP as { x: 0; y: 1; z: 0 };
        /**
         * down
         *
         * A unit vector representing the world DOWN direction (0,-1,0)
         *
         * @public
         */
        public static down: {x: 0, y: -1, z: 0} & Vector3 = VECTOR3_DOWN as { x: 0; y: -1; z: 0 };
        /**
         * north
         *
         * A unit vector representing the world NORTH direction (0,0,1)
         *   (same as FORWARD)
         *
         * @public
         */
        public static north: {x: 0, y: 0, z: 1} & Vector3 = VECTOR3_NORTH as { x: 0; y: 0; z: 1 };
        /**
         * south
         *
         * A unit vector representing the world SOUTH direction (0,0,-1)
         *   (same as BACK)
         *
         * @public
         */
        public static south: {x: 0, y: 0, z: -1} & Vector3 = VECTOR3_SOUTH as { x: 0; y: 0; z: -1 };
        /**
         * east
         *
         * A unit vector representing the world EAST direction (1,0,0)
         *   (same as RIGHT)
         *
         * @public
         */
        public static east: {x: 1, y: 0, z: 0} & Vector3 = VECTOR3_EAST as { x: 1; y: 0; z: 0 };
        /**
         * west
         *
         * A unit vector representing the world WEST direction (-1,0,0)
         *   (same as LEFT)
         *
         * @public
         */
        public static west: {x: -1, y: 0, z: 0} & Vector3 = VECTOR3_WEST as { x: -1; y: 0; z: 0 };
        /**
         * right
         *
         * A unit vector representing the world RIGHT direction (1,0,0)
         *
         * @public
         */
        public static right: {x: 1, y: 0, z: 0} & Vector3 = VECTOR3_RIGHT as { x: 1; y: 0; z: 0 };
        /**
         * left
         *
         * A unit vector representing the world LEFT direction (-1,0,0)
         *
         * @public
         */
        public static left: {x: -1, y: 0, z: 0} & Vector3 = VECTOR3_LEFT as { x: -1; y: 0; z: 0 };
        /**
         * back
         *
         * A unit vector representing the world BACK direction (0,0,-1)
         *
         * @public
         */
        public static back: {x: 0, y: 0, z: -1} & Vector3 = VECTOR3_BACK as { x: 0; y: 0; z: -1 };
        /**
         * forward
         *
         * A unit vector representing the world FORWARD direction (0,0,1)
         *
         * @public
         */
        public static forward: {x: 0, y: 0, z: 1} & Vector3 = VECTOR3_FORWARD as { x: 0; y: 0; z: 1 };
        public static add = Vector3Utils.add;
        public static clamp = Vector3Utils.clamp;
        public static cross = Vector3Utils.cross;
        public static distance = Vector3Utils.distance;
        public static dot = Vector3Utils.dot;
        public static equals = Vector3Utils.equals;
        public static floor = Vector3Utils.floor;
        public static lerp = Vector3Utils.lerp;
        public static magnitude = Vector3Utils.magnitude;
        public static multiply = Vector3Utils.multiply;
        public static normalize = Vector3Utils.normalize;
        public static rotateX = Vector3Utils.rotateX;
        public static rotateY = Vector3Utils.rotateY;
        public static rotateZ = Vector3Utils.rotateZ;
        public static scale = Vector3Utils.scale;
        public static slerp = Vector3Utils.slerp;
        public static subtract = Vector3Utils.subtract;
        /**
         * toString
         *
         * Create a string representation of a vector3
         */
        public static override toString = Vector3Utils.toString;
    }
}

Object.defineProperty(globalThis, "Vector", {
    value: exports.Vector,
    enumerable: true,
    configurable: true,
    writable: false,
});

declare global {
    namespace globalThis {
        export import Vector = exports.Vector;
    }
}
