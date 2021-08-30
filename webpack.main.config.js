const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  /**
   * This is the main entry point for your application, it's the first file
   * that runs in the main process.
   */
  entry: './src/Application/main.js',
  devtool: 'eval',
  // Put your normal webpack config below here
  module: {
    rules: require('./webpack.rules'),
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns:
        [
          {
            from: path.resolve(__dirname, 'static'),
            to: path.resolve(__dirname, '.webpack/static')
          },
        ]
    }),
  ]
};
