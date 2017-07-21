module.exports = {
    root: true,
    extends: ['scratch', 'scratch/es6', 'scratch/react', 'import'],
    env: {
        browser: true
    },
    globals: {
        process: true
    },
    rules: {
        'import/no-mutable-exports': 'error',
        'import/no-commonjs': 'error',
        'import/no-amd': 'error',
        'import/no-nodejs-modules': 'error'
    }
};
