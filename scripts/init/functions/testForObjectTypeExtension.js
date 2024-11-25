globalThis.testForObjectTypeExtension = function testForObjectTypeExtension(objectToTest, base) {
    return Object.entries(base).every((v) => Object.keys(objectToTest).includes(v[0])
        ? v[1].startsWith("[object ")
            ? Object.entries(objectToTest).find((c) => c[0] == v[0])[1]
                ?.constructor?.name == v[1].slice(8, -1)
            : typeof Object.entries(objectToTest).find((c) => c[0] == v[0])[1] == v[1]
        : false);
};
//# sourceMappingURL=testForObjectTypeExtension.js.map