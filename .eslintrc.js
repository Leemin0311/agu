module.exports = {
    parser: 'babel-eslint',
    extends: ['airbnb', 'prettier', 'plugin:compat/recommended', 'eslint:recommended', 'react-app'],
    env: {
        browser: true,
        node: true,
        es6: true,
        mocha: true,
        jest: true,
        jasmine: true,
    },
    globals: {
        APP_TYPE: true,
        page: true,
    },
    rules: {
        'jsx-a11y/alt-text': 0,
        'react/jsx-filename-extension': [1, { extensions: ['.js'] }],
        'react/jsx-wrap-multilines': 0,
        'react/no-array-index-key': 0,
        'react/prop-types': 0,
        'react/forbid-prop-types': 0,
        'react/jsx-one-expression-per-line': 0,
        'react/jsx-indent-props': [2, 4],
        'react/jsx-indent': [2, 4],
        'import/no-unresolved': [2, { ignore: ['^@/', '^umi/'] }],
        'import/no-extraneous-dependencies': [
            2,
            {
                optionalDependencies: true,
                devDependencies: ['**/tests/**.js', '/mock/**/**.js', '**/**.test.js'],
            },
        ],
        'jsx-a11y/no-noninteractive-element-interactions': 0,
        'jsx-a11y/click-events-have-key-events': 0,
        'jsx-a11y/no-static-element-interactions': 0,
        'jsx-a11y/anchor-is-valid': 0,
        'linebreak-style': 0,
        indent: ['error', 4, { SwitchCase: 1 }],
        'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
        'no-param-reassign': ['error', { props: false }],
        semi: ['error', 'always'],
        'no-console': [
            'error',
            {
                allow: ['info', 'warn', 'error', 'time', 'timeEnd'],
            },
        ],
        'no-unused-vars': ['error'],
        'no-restricted-globals': 0,
        'import/no-unresolved': 0,
        'import/prefer-default-export': 0
    },
    settings: {
        polyfills: ['fetch', 'promises', 'url'],
    },
    plugins: ['react'],
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 2018,
        sourceType: 'module',
    },
};
