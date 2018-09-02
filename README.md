# Webpack boilerplate

## Features

- CSS and Sass loader
- CSS Autoprefixer
- CSS Optimizer
- Linter settings (ESLint, Airbnb style)
- Transpiler with usage-based polyfills (Babel 7)
- Sourcemaps
- Separate configs for dev and prod environments
- Automatic build (watch mode)
- Automatic browser reload (Webpack Dev Server)
- HTML loader

## Initialization

Install `webpack`

```sh
npm init -y
npm install webpack webpack-cli -D
```

Create `src` and `dist` folders

```sh
mkdir src dist
```

Create `index.js` inside `src` folder

```sh
touch src/index.js
```

Add `release` script to `package.json`

```json
"release": "webpack"
```

## CSS and Sass handler

Install CSS related packages

```sh
npm install css-loader mini-css-extract-plugin optimize-css-assets-webpack-plugin postcss-loader autoprefixer sass-loader node-sass -D
```

Create `webpack.config.js` in the root project directory

**webpack.config.js**

```js
const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
  mode: 'production',
  output: { path: path.resolve(__dirname, 'dist/assets') },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true,
      }),
      new OptimizeCSSAssetsPlugin({}),
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.s?css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
    ],
  },
};
```

Create `postcss.config.js` in the root directory

```js
module.exports = {
  plugins: [require('autoprefixer')],
};
```

## JS transpiler

Install `babel` and its dependencies

```sh
npm install babel-loader @babel/core @babel/preset-env -D
```

Add to `module.rules` of `webpack.config.js`

```js
{
  test: /\.js$/,
  exclude: /(node_modules|bower_components)/,
  use: {
    loader: 'babel-loader',
    options: {
      presets: [['@babel/preset-env', { useBuiltIns: 'usage' }]],
    },
  },
},
```

## JS lint

Install and initialize `eslint`

```sh
npm install eslint -D
eslint --init
```

Add `lint` script  to `package.json`

```json
"lint": "eslint src/index.js"
```

## HTML loader

Install `html-webpack-plugin`

```sh
npm install html-webpack-plugin -D
```

Add to the top of `webpack.config.js`

```js
const HtmlWebpackPlugin = require('html-webpack-plugin');
```

Add to `plugins` in `webpack.config.js`

```js
new HtmlWebpackPlugin({ 
  filename: '../index.html',
  template: 'src/index.html',
  title: 'App',
  meta: {
    viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no',
  },
}),
```

Create `index.html` in `src` folder

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title><%= htmlWebpackPlugin.options.title %></title>
  </head>
  <body>
    <!-- All content goes here -->
  </body>
</html>
```

## Development env config

Install `webpack-merge` and `webpack-dev-server`

```sh
npm install webpack-merge webpack-dev-server -D
```

Create `dev` folder

```sh
mkdir dev
```

Create `webpack.config.dev.js` in the root directory

```js
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
```

Add `build`, `watch` and `devServer` scripts to `package.json`

```json
"build": "webpack --config webpack.config.dev.js",
"watch": "webpack --config webpack.config.dev.js -w",
"devServer": "webpack-dev-server --config webpack.dev.config.js"
```

