module.exports = {
    root: true,
    extends: ['scratch', 'scratch/node'],
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
