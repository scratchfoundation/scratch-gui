const path = require('path');
module.exports = {
    root: true,
    extends: ['scratch', 'scratch/es6', 'scratch/react', 'plugin:import/errors'],
    env: {
        node: true,
    },
    rules: {
        'import/no-commonjs': 'error',
        'react/jsx-no-literals': 'error',
        'react/jsx-filename-extension': [
            'error',
            {
                extensions: ['.jsx', '.tsx']
            }
        ],
        'import/no-mutable-exports': 'error',
        'import/no-amd': 'error',
        'no-confusing-arrow': ['error', {
            allowParens: true
        }],
        'comma-dangle': 'off',
    },
    settings: {
        'import/extensions': [
            '.cjs',
            '.js',
            '.jsx',
            '.mjs',
            '.ts',
            '.tsx',
        ],
        'import/resolver': {
            webpack: {
                config: path.resolve('webpack.config.js')
            }
        },
        'react': {
            version: '16.2' // Prevent 16.3 lifecycle method errors
        },
    },
    overrides: [
        {
            files: ['*.cjs'],
            rules: {
                'import/no-commonjs': 'off'
            }
        },
        {
            files: ['*.ts', '*.tsx'],
            extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
            parser: '@typescript-eslint/parser',
            plugins: [
                '@typescript-eslint',
                'eslint-plugin-tsdoc'
            ],
            rules: {
                'tsdoc/syntax': 'warn',
                'valid-jsdoc': 'off',
                'no-use-before-define': 'off', // doesn't work correctly with TS parser
                '@typescript-eslint/no-use-before-define': 'error', // replacement for plain 'no-use-before-define'
            }
        }
    ]
};
