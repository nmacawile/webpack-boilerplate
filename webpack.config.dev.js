const path = require('path');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.config');

module.exports = merge(baseConfig, {
  mode: 'development',
  output: {
    path: path.resolve(__dirname, 'dev/assets'),
  },
  devtool: 'source-map',
  devServer: {
    contentBase: 'dev',
    inline: true,
    open: true,
  },
});
