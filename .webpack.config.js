const webpack = require('webpack');
const path = require('path');

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
      { test: /\.(js|jsx)$/, use: 'babel-loader' },
    ]
  }
};

module.exports = config;
