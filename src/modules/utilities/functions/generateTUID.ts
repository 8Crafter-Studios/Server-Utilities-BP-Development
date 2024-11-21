import { toBase } from "./toBase";

export function generateTUID() { return toBase(Date.now()); }
