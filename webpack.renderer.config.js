const rules = require('./webpack.rules');
const webpack = require("webpack");

rules.push({
    test: /\.css$/,
    use: [
        { loader: 'style-loader' },
        { loader: 'css-loader' },
    ],
});

rules.push({
    test: /\.html$/i,
    loader: 'html-loader',
})

rules.push({
    test: /\.m?js$/,
    exclude: /(node_modules|bower_components)/,
    use: {
        loader: "babel-loader"
    }
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
        new webpack.ProvidePlugin({
            'React': 'react',
        }),
        new webpack.IgnorePlugin({
            resourceRegExp: /electron/,
            contextRegExp: /.*/,
        }),
    ]
};
