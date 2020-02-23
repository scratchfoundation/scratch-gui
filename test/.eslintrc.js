module.exports = {
    extends: ['scratch/react', 'scratch/es6', 'plugin:jest/recommended'],
    env: {
        browser: true,
        jest: true
    },
    plugins: ['jest'],
    rules: {
        'react/prop-types': 0,
        'no-warning-comments': [0, {
            terms: ['todo'],
            location: 'start'
        }],
        'jest/valid-describe': 0
    }
};
