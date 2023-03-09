export const getAllStaticMethodNames = (givenClass) => {
    // eslint-disable-next-line arrow-parens
    const staticMethodNames = Object.getOwnPropertyNames(givenClass).filter((prop) => typeof givenClass[prop] === 'function');

    return staticMethodNames;
};
