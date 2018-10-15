module.exports = {
    extends: ['scratch', 'scratch/node'],
    rules: {
        'no-warning-comments': [0, {
            terms: ['todo'],
            location: 'start'
        }]
    }
};
