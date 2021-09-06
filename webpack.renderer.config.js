const rules = require('./webpack.rules.renderer');
const webpack = require("webpack");

module.exports = {
    module: {
        rules,
    },
    resolve: {
        fallback: {
            path: require.resolve('path-browserify'),
        }
    },
    plugins: [
        new webpack.ProvidePlugin({
            'React': 'react',
        }),
        new webpack.IgnorePlugin({
            resourceRegExp: /electron/,
            contextRegExp: /.*/,
        }),
    ]
};
