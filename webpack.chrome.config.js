const path = require('path');
const webpack = require("webpack");
const CopyWebpackPlugin = require('copy-webpack-plugin');

const rules = require('./webpack.rules.renderer');

module.exports = {
  devtool: 'cheap-module-source-map',
  module: {
    rules,
  },
  entry: {
    background: './src/ChromeExt/background.js',
    renderer: './src/ChromeExt/renderer.js',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '.webpack-chrome'),
  },
  resolve: {
    fallback: {
      path: require.resolve('path-browserify'),
    }
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns:
        [
          {
            from: path.resolve(__dirname, 'static'),
            to: path.resolve(__dirname, '.webpack-chrome/static')
          },
          {
            from: path.resolve(__dirname, 'src/ChromeExt/manifest.json'),
            to: path.resolve(__dirname, '.webpack-chrome/')
          },
          {
            from: path.resolve(__dirname, 'src/ChromeExt/popup.html'),
            to: path.resolve(__dirname, '.webpack-chrome/')
          },
          {
            from: path.resolve(__dirname, 'src/ChromeExt/rules.json'),
            to: path.resolve(__dirname, '.webpack-chrome/')
          },
        ]
    }),
    new webpack.ProvidePlugin({
      'React': 'react',
    }),
  ]
};