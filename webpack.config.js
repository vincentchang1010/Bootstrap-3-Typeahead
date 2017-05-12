/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
const path = require('path');
const webpack = require('webpack');

const TransferWebpackPlugin = require('transfer-webpack-plugin');

// default config(production)
const babelRule = {
  test: /\.js(x?)$/,
  loader: 'babel-loader',
  // exclude: /(node_modules|bower_components)/,
  query: {
    presets: ['es2015', 'es2017'],
    plugins: ['transform-class-properties', 'transform-object-rest-spread'],
  },
};

const cssRule = {
  test: /\.css$/,
  use: [
    { loader: 'style-loader/url' },
    { loader: 'file-loader' }
  ],
};

const eslintRule = {
  test: /\.js(x?)$/,
  enforce: 'pre',
  loader: 'eslint-loader',
  include: `${__dirname}`,
  exclude: /min\.js$/,
  options: {
    quiet: true,
    emitWarning: false,
    emitError: false,
    failOnWarning: false,
    failOnError: false,
  },
};

const config = {
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
    }),
    new TransferWebpackPlugin([
      // { from: 'css', to: 'css' },
      // { from: 'examples', to: 'examples' },
      // { from: 'fonts', to: 'fonts' },
      // { from: 'img', to: 'img' },
      // { from: 'locales', to: 'locales' },
    ], path.resolve(__dirname, 'src')),
  ],
  entry: {
    main: './src/main.js',
    ['bootstrap3-typeahead']: './src/bootstrap3-typeahead.js',
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    publicPath: '/',
    filename: '[name].min.js',
    // sourceMapFilename: 'index-bundle.map',
  },
  // devtool: 'source-map',
  module: {
    rules: [
      eslintRule,
      babelRule,
      cssRule,
    ],
  },
  resolve: {
    // extensions: ['.js'],
  },
};


config.devServer = {
  port: 7001,
  contentBase: './src',
  historyApiFallback: {
    index: './index.html',
  },
  hot: true,
  inline: true,
  proxy: {},

};

module.exports = config;
