module.exports = {
    root: true,
    extends: ['eslint-config-scratch', 'eslint-config-scratch/react','scratch', 'scratch/node', 'scratch/es6'],
    parser: '@babel/eslint-parser',
    parserOptions: {
        requireConfigFile: false,
        babelOptions: {
            presets: ['@babel/preset-react']
        }
    },
    env: {
        browser: true
    },
    rules: {
        'react/jsx-no-bind': 'off',
        'react/jsx-indent': 'off',
        'react/jsx-indent-props': 'off',
        'react/jsx-closing-bracket-location': 'off',
        'react/prop-types': 'off',
        'react/jsx-wrap-multilines': 'off'
    }
};




