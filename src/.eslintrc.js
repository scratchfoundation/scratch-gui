const path = require('path');
module.exports = {
    root: true,
    extends: ['scratch', 'scratch/es6', 'scratch/react', 'plugin:import/errors'],
    env: {
        browser: true
    },
    globals: {
        process: true
    },
    rules: {
        // BEGIN: these caused trouble after upgrading eslint-plugin-react from 7.24.0 to 7.33.2
        'react/forbid-prop-types': 'off',
        'react/no-unknown-property': 'off',
        // END: these caused trouble after upgrading eslint-plugin-react from 7.24.0 to 7.33.2
        'no-warning-comments': 'off',
        'import/no-mutable-exports': 'error',
        'import/no-commonjs': 'error',
        'import/no-amd': 'error',
        'import/no-nodejs-modules': 'error',
        'react/jsx-no-literals': 'error',
        'no-confusing-arrow': ['error', {
            allowParens: true
        }]
    },
    overrides: [
        {
            files: ['**/.eslintrc.js'],
            env: {
                node: true
            },
            rules: {
                'import/no-commonjs': 'off'
            }
        }
    ],
    settings: {
        'react': {
            version: '16.2' // Prevent 16.3 lifecycle method errors
        },
        'import/resolver': {
            webpack: {
                config: path.resolve(__dirname, '../webpack.config.js')
            }
        }
    }
};
