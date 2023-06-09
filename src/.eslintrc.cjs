module.exports = {
    env: {
        browser: true,
        node: false,
    },
    globals: {
        process: true
    },
    rules: {
        'import/no-nodejs-modules': 'error',
    },
    overrides: [
        {
            files: ['*.js', '*.jsx'],
            rules: {
                'no-prototype-builtins': 'off', // relatively new rule that we don't comply with yet
            }
        }
    ],
};
