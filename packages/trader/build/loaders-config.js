const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

const IS_RELEASE =
    process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging' || process.env.NODE_ENV === 'test';

const js_loaders = [
    {
        loader: '@deriv/shared/src/loaders/deriv-account-loader.js',
    },
    {
        loader: 'babel-loader',
        options: {
            cacheDirectory: true,
            rootMode: 'upward',
        },
    },
];

const html_loaders = [
    {
        loader: 'html-loader',
    },
];

const file_loaders = [
    {
        loader: 'file-loader',
        options: {
            name: '[path][name].[ext]',
        },
    },
];

const svg_file_loaders = [
    {
        loader: 'file-loader',
        options: {
            name: '[path][name].[ext]',
            outputPath: 'images/',
            publicPath: '../images/',
            esModule: false,
        },
    },
];

const svg_loaders = [
    {
        loader: 'babel-loader',
        options: {
            cacheDirectory: true,
            rootMode: 'upward',
            presets: ['@babel/preset-react', '@babel/preset-typescript'],
        },
    },
    {
        loader: 'react-svg-loader',
        options: {
            jsx: true,
            svgo: {
                plugins: [
                    { removeTitle: false },
                    { removeUselessStrokeAndFill: false },
                    { removeUknownsAndDefaults: false },
                    { removeViewBox: false },
                    { removeEmptyAttrs: false },
                    { removeHiddenElems: false },
                    { removeEmptyText: false },
                    { removeEmptyContainers: false },
                    { removeUnusedNS: false },
                    { removeDesc: false },
                    { removeMetadata: false },
                    { removeComments: false },
                    { removeDoctype: false },
                    { removeXMLProcInst: false },
                    { removeEditorsNSData: false },
                    { removeXMLNS: false },
                    { removeDimensions: false },
                    { removeAttrs: false },
                    { removeElementsByAttr: false },
                    { removeStyleElement: false },
                    { removeScriptElement: false },
                ],
                floatPrecision: 2,
                multipass: true,
            },
            svgoConfig: {
                plugins: [
                    {
                        name: 'preset-default',
                        params: {
                            overrides: {
                                removeViewBox: false,
                                removeUnknownsAndDefaults: false,
                                removeUselessStrokeAndFill: false,
                            },
                        },
                    },
                ],
            },
        },
    },
];

const css_loaders = [
    {
        loader: MiniCssExtractPlugin.loader,
    },
    {
        loader: 'css-loader',
        options: {
            sourceMap: !IS_RELEASE,
        },
    },
    {
        loader: 'postcss-loader',
        options: {
            sourceMap: !IS_RELEASE,
            postcssOptions: {
                config: path.resolve(__dirname),
            },
        },
    },
    {
        loader: 'resolve-url-loader',
        options: {
            sourceMap: true,
            keepQuery: true,
        },
    },
    {
        loader: 'sass-loader',
        options: {
            sourceMap: !IS_RELEASE,
        },
    },
    {
        loader: 'sass-resources-loader',
        options: {
            resources: require('@deriv/shared/src/styles/index.js'),
        },
    },
];

module.exports = {
    js_loaders,
    html_loaders,
    file_loaders,
    svg_loaders,
    svg_file_loaders,
    css_loaders,
    IS_RELEASE,
};
