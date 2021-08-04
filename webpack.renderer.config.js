const rules = require('./webpack.rules');
const webpack = require("webpack");

rules.push({
    test: /\.css$/,
    use: [{loader: 'style-loader'}, {loader: 'css-loader'}],
});

rules.push({
    test: /\.html$/i,
    loader: 'html-loader',
})

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
        new webpack.IgnorePlugin({
            resourceRegExp: /electron/,
            contextRegExp: /.*/,
        }),
    ]
};
