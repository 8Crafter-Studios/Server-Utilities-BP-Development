import { patternList } from "./patternList";

export const patternFunctionList = {
    rainbow: (ib: number) => patternList.rainbow[ib % patternList.rainbow.length],
    randomrainbow: (ib: number, offset: number) => patternList.rainbow[(ib + offset) % patternList.rainbow.length],
    shuffledrainbow: () => patternList.rainbow[Math.floor(Math.random() * patternList.rainbow.length)],
    bluegradient: (ib: number) => patternList.blue[ib % patternList.blue.length],
    randombluegradient: (ib: number, offset: number) => patternList.blue[(ib + offset) % patternList.blue.length],
    shuffledbluegradient: () => patternList.blue[Math.floor(Math.random() * patternList.blue.length)],
    yellowgradient: (ib: number) => patternList.yellow[ib % patternList.yellow.length],
    randomyellowgradient: (ib: number, offset: number) => patternList.yellow[(ib + offset) % patternList.yellow.length],
    shuffledyellowgradient: () => patternList.yellow[Math.floor(Math.random() * patternList.yellow.length)],
    blackgradient: (ib: number) => patternList.black[ib % patternList.black.length],
    randomblackgradient: (ib: number, offset: number) => patternList.black[(ib + offset) % patternList.black.length],
    shuffledblackgradient: () => patternList.black[Math.floor(Math.random() * patternList.black.length)],
    graygradient: (ib: number) => patternList.gray[ib % patternList.gray.length],
    randomgraygradient: (ib: number, offset: number) => patternList.gray[(ib + offset) % patternList.gray.length],
    shuffledgraygradient: () => patternList.gray[Math.floor(Math.random() * patternList.gray.length)],
    purplegradient: (ib: number) => patternList.purple[ib % patternList.purple.length],
    randompurplegradient: (ib: number, offset: number) => patternList.purple[(ib + offset) % patternList.purple.length],
    shuffledpurplegradient: () => patternList.purple[Math.floor(Math.random() * patternList.purple.length)]
};
