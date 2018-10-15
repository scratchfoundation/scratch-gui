module.exports = {
    extends: ['scratch/react', 'scratch/es6'],
    env: {
        browser: true,
        jest: true
    },
    rules: {
        'react/prop-types': 0,
        'no-warning-comments': [0, {
            terms: ['todo'],
            location: 'start'
        }]
    }
};
