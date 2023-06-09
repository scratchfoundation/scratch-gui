module.exports = {
    extends: ['plugin:jest/recommended'],
    env: {
        browser: true,
        jest: true,
        node: true,
    },
    plugins: ['jest'],
    rules: {
        'react/prop-types': 0,
        'require-atomic-updates': 'warn',
    }
};
