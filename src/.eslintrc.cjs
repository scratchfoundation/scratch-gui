const path = require('path');
module.exports = {
    root: true,
    extends: ['scratch', 'scratch/es6', 'scratch/react', 'plugin:import/errors'],
    parser: '@typescript-eslint/parser',
    plugins: [
        '@typescript-eslint',
        'eslint-plugin-tsdoc'
    ],
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
        'import/no-nodejs-modules': 'error',
        'react/jsx-no-literals': 'error',
        'no-confusing-arrow': ['error', {
            'allowParens': true
        }],
        'comma-dangle': 'off',
        'no-prototype-builtins': 'off', // relatively new rule that we don't comply with yet
        'no-use-before-define': 'off', // doesn't work correctly with TS parser
        '@typescript-eslint/no-use-before-define': 'error', // replacement for plain 'no-use-before-define'
    },
    overrides: [
        {
            files: ['*.ts', '*.tsx'],
            rules: {
                'tsdoc/syntax': 'warn',
                'valid-jsdoc': 'off'
            }
        }
    ],
    settings: {
        react: {
            version: '16.2' // Prevent 16.3 lifecycle method errors
        },
        'import/resolver': {
            webpack: {
                config: path.resolve(__dirname, '../webpack.config.js')
            }
        }
    }
};
