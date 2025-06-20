module.exports = {
    globals: {
        Blockly: false,
        trackJs: false,
        jest: false,
        dataLayer: false,
        goog: false,
        google: false,
        gapi: false,
        __webpack_public_path__: false,
    },
    extends: [
        'airbnb-base',
        'prettier'
    ],
    settings: {
        'import/resolver': {
            webpack: { config: require('./webpack.config.js')({}) },
        },
    },
    plugins: ['simple-import-sort'],
    rules: {
        'simple-import-sort/imports': 'warn',
        'simple-import-sort/exports': 'warn',
    },
    overrides: [
        {
            files: ['**/*.js', '**/*.ts', '**/*.tsx', '**/*.jsx'],
            rules: {
                'simple-import-sort/imports': [
                    'warn',
                    {
                        groups: [
                            [
                                'public-path',
                                '^react$',
                                '^[a-z]',
                                '^@',
                                '^~',
                                '^Components',
                                '^Constants',
                                '^Utils',
                                '^Types',
                                '^Stores',
                                '^\.\.(?!/?$)',
                                '^\.\./?$',
                                '^\./(?=.*/)(?!/?$)',
                                '^\.(?!/?$)',
                                '^\./?$',
                                '^.+\.s?css$',
                                '^\u0000',
                                '\s*',
                            ],
                        ],
                    },
                ],
                'prettier/prettier': 'warn',
            },
        },
    ],
};
