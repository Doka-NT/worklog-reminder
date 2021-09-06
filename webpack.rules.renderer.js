const rules = require('./webpack.rules');

rules.push({
    test: /\.css$/,
    use: [
        { loader: 'style-loader' },
        {
            loader: 'css-loader'
        },
    ],
});

rules.push({
    test: /\.less$/,
    use: [
        {
            loader: "style-loader"
        },
        {
            loader: "css-loader",
        },
        {
            loader: "less-loader"
        }
    ]
});

rules.push({
    test: /\.html$/i,
    loader: 'html-loader',
});

rules.push({
    test: /\.m?js$/,
    exclude: /(node_modules|bower_components)/,
    use: {
        loader: "babel-loader"
    }
});

module.exports = rules;