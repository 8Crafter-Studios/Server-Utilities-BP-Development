
export async function cycleRGB(
    callback: (current: { r: number; g: number; b: number; }) => any,
    cancel: () => boolean = () => false,
    step: number = 1
) {
    async function nextR(current: { r: number; g: number; b: number; }) {
        if (cancel()) {
            return;
        } else if (current.r >= 256) {
            callback(current);
            await waitTick();
            nextNB(current);
        } else {
            current.r += step;
            callback(current);
            await waitTick();
            nextR(current);
        }
    }
    async function nextG(current: { r: number; g: number; b: number; }) {
        if (cancel()) {
            return;
        } else if (current.g >= 256) {
            callback(current);
            await waitTick();
            nextNR(current);
        } else {
            current.g += step;
            callback(current);
            await waitTick();
            nextG(current);
        }
    }
    async function nextB(current: { r: number; g: number; b: number; }) {
        if (cancel()) {
            return;
        } else if (current.b >= 256) {
            callback(current);
            await waitTick();
            nextNG(current);
        } else {
            current.b += step;
            callback(current);
            await waitTick();
            nextB(current);
        }
    }
    async function nextNR(current: { r: number; g: number; b: number; }) {
        if (cancel()) {
            return;
        } else if (current.r <= 0) {
            callback(current);
            await waitTick();
            nextB(current);
        } else {
            current.r -= step;
            callback(current);
            await waitTick();
            nextNR(current);
        }
    }
    async function nextNG(current: { r: number; g: number; b: number; }) {
        if (cancel()) {
            return;
        } else if (current.g <= 0) {
            callback(current);
            await waitTick();
            nextR(current);
        } else {
            current.g -= step;
            callback(current);
            await waitTick();
            nextNG(current);
        }
    }
    async function nextNB(current: { r: number; g: number; b: number; }) {
        if (cancel()) {
            return;
        } else if (current.b <= 0) {
            callback(current);
            await waitTick();
            nextG(current);
        } else {
            current.b -= step;
            callback(current);
            await waitTick();
            nextNB(current);
        }
    }
    nextR({ r: 0, g: 0, b: 256 });
}
