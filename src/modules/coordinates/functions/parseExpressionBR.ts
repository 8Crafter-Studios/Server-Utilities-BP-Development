export function parseExpressionBR(str: string) {
    return (
        wx,
        wy,
        wz,
        x,
        y,
        z,
        ax,
        ay,
        az,
        bx,
        by,
        bz,
        nx,
        ny,
        nz,
        px,
        py,
        pz
    ) => {
        return eval(str);
    };
}
