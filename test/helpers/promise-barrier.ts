/**
 * Make a Promise-based "barrier" that can be resolved or rejected externally.
 * @example
 * const foo = makePromiseBarrier();
 * setTimeout(() => foo.resolve(42), 10000);
 * const fortyTwo = await foo;
 * @returns A promise with 'resolve' and 'reject' methods added.
 */
const makePromiseBarrier = function (): Promise<unknown> {
    let newMethods;
    const promise = new Promise((resolve, reject) => {
        newMethods = {resolve, reject};
    });
    return Object.assign(promise, newMethods);
};

export default makePromiseBarrier;
