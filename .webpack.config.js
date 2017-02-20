const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

/**
 * __dirname is current file directory,
 * or the directory this file is in,
 * or the root directory since the config file should be at root
 *
 * note that [current file dir] != [current working dir]
 */
var DEV = path.resolve(__dirname, 'src');
var OUTPUT = path.resolve(__dirname, 'output');

/**
 * entry and output are required properties
 *
 * entry tells webpack where to start its graph of dependencies
 * output tells webpack where to emit its bundle
 * modules work per file
 * plugins act on "chunks" of files
 */
var config = {
  entry: DEV + "/index.jsx",
  output: {
    path: OUTPUT,
    filename: "myCode.js"
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: DEV,
        use: [
          { loader: 'babel-loader' },
          { loader: 'eslint-loader' },
        ],
      },
      {
        test: /\.(scss|css)$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          // load postcss for autoprefixer
          { loader: 'postcss-loader'},
          { loader: 'sass-loader' },
        ],
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      },
    }),
  ],
};

module.exports = config;
