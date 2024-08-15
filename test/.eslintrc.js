module.exports = {
    extends: ['scratch/react', 'scratch/es6', 'plugin:jest/recommended'],
    env: {
        browser: true,
        jest: true
    },
    plugins: ['jest'],
    rules: {
        'react/prop-types': 0
    }
};
