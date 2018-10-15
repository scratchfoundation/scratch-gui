module.exports = {
    extends: ['scratch'], // no ES6
    env: {
        worker: true
    },
    globals: {
        Scratch: true
    },
    rules: {
        'no-warning-comments': [0, {
            terms: ['todo'],
            location: 'start'
        }]
    }
};
