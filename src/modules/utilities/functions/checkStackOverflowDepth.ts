export function checkStackOverflowDepth(i?: number): { depth: number; error: InternalError } {
    var i = i || 1;
    try {
        checkStackOverflowDepth(i + 1);
    } catch (e) {
        if (e instanceof InternalError) {
            return { depth: i, error: e };
        } else {
            throw e;
        }
    }
}
