import { Vector3Builder, Vector3Utils } from "@minecraft/math.js";
import type { Vector3 } from "@minecraft/server";
declare namespace exports {
    /**
     * Utilities operating on Vector3 objects.
     *
     * This is a mixture of the {@link Vector3Builder} and {@link Vector3Utils} classes.
     */
    class Vector extends Vector3Builder implements Vector3Utils {
        /**
         * zero
         *
         * A unit vector representing the value of 0 in all directions (0,0,0)
         *
         * @public
         */
        zero: Vector3;
        /**
         * one
         *
         * A unit vector representing the value of 1 in all directions (1,1,1)
         *
         * @public
         */
        one: Vector3;
        /**
         * up
         *
         * A unit vector representing the world UP direction (0,1,0)
         *
         * @public
         */
        up: Vector3;
        /**
         * down
         *
         * A unit vector representing the world DOWN direction (0,-1,0)
         *
         * @public
         */
        down: Vector3;
        /**
         * north
         *
         * A unit vector representing the world NORTH direction (-1,0,0)
         *   (same as FORWARD)
         *
         * @public
         */
        north: Vector3;
        /**
         * south
         *
         * A unit vector representing the world SOUTH direction (-1,0,0)
         *   (same as BACK)
         *
         * @public
         */
        south: Vector3;
        /**
         * east
         *
         * A unit vector representing the world EAST direction (-1,0,0)
         *   (same as RIGHT)
         *
         * @public
         */
        east: Vector3;
        /**
         * west
         *
         * A unit vector representing the world WEST direction (-1,0,0)
         *   (same as LEFT)
         *
         * @public
         */
        west: Vector3;
        /**
         * right
         *
         * A unit vector representing the world RIGHT direction (1,0,0)
         *
         * @public
         */
        right: Vector3;
        /**
         * left
         *
         * A unit vector representing the world LEFT direction (-1,0,0)
         *
         * @public
         */
        left: Vector3;
        /**
         * back
         *
         * A unit vector representing the world BACK direction (0,0,-1)
         *
         * @public
         */
        back: Vector3;
        /**
         * forward
         *
         * A unit vector representing the world FORWARD direction (0,0,1)
         *
         * @public
         */
        forward: Vector3;
        /**
         * zero
         *
         * A unit vector representing the value of 0 in all directions (0,0,0)
         *
         * @public
         */
        static zero: Vector3;
        /**
         * one
         *
         * A unit vector representing the value of 1 in all directions (1,1,1)
         *
         * @public
         */
        static one: Vector3;
        /**
         * up
         *
         * A unit vector representing the world UP direction (0,1,0)
         *
         * @public
         */
        static up: Vector3;
        /**
         * down
         *
         * A unit vector representing the world DOWN direction (0,-1,0)
         *
         * @public
         */
        static down: Vector3;
        /**
         * north
         *
         * A unit vector representing the world NORTH direction (-1,0,0)
         *   (same as FORWARD)
         *
         * @public
         */
        static north: Vector3;
        /**
         * south
         *
         * A unit vector representing the world SOUTH direction (-1,0,0)
         *   (same as BACK)
         *
         * @public
         */
        static south: Vector3;
        /**
         * east
         *
         * A unit vector representing the world EAST direction (-1,0,0)
         *   (same as RIGHT)
         *
         * @public
         */
        static east: Vector3;
        /**
         * west
         *
         * A unit vector representing the world WEST direction (-1,0,0)
         *   (same as LEFT)
         *
         * @public
         */
        static west: Vector3;
        /**
         * right
         *
         * A unit vector representing the world RIGHT direction (1,0,0)
         *
         * @public
         */
        static right: Vector3;
        /**
         * left
         *
         * A unit vector representing the world LEFT direction (-1,0,0)
         *
         * @public
         */
        static left: Vector3;
        /**
         * back
         *
         * A unit vector representing the world BACK direction (0,0,-1)
         *
         * @public
         */
        static back: Vector3;
        /**
         * forward
         *
         * A unit vector representing the world FORWARD direction (0,0,1)
         *
         * @public
         */
        static forward: Vector3;
        static add: typeof Vector3Utils.add;
        static clamp: typeof Vector3Utils.clamp;
        static cross: typeof Vector3Utils.cross;
        static distance: typeof Vector3Utils.distance;
        static dot: typeof Vector3Utils.dot;
        static equals: typeof Vector3Utils.equals;
        static floor: typeof Vector3Utils.floor;
        static lerp: typeof Vector3Utils.lerp;
        static magnitude: typeof Vector3Utils.magnitude;
        static multiply: typeof Vector3Utils.multiply;
        static normalize: typeof Vector3Utils.normalize;
        static rotateX: typeof Vector3Utils.rotateX;
        static rotateY: typeof Vector3Utils.rotateY;
        static rotateZ: typeof Vector3Utils.rotateZ;
        static scale: typeof Vector3Utils.scale;
        static slerp: typeof Vector3Utils.slerp;
        static subtract: typeof Vector3Utils.subtract;
        /**
         * toString
         *
         * Create a string representation of a vector3
         */
        static toString: typeof Vector3Utils.toString;
    }
}
declare global {
    namespace globalThis {
        export import Vector = exports.Vector;
    }
}
export {};
