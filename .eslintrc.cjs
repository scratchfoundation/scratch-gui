const path = require('path');
module.exports = {
    root: true,
    extends: ['eslint:recommended'],
    env: {
        es6: true,
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
            // "legacy" rules for JS
            files: ['*.cjs', '*.js', '*.jsx', '*.mjs'],
            extends: ['scratch', 'scratch/es6', 'scratch/react', 'plugin:import/errors'],
            rules: {
                'comma-dangle': 'off',
                'no-confusing-arrow': ['error', {
                    allowParens: true
                }],
            }
        },
        {
            // "new" rules for TypeScript
            files: ['*.ts', '*.tsx'],
            extends: ['plugin:@typescript-eslint/recommended'],
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
