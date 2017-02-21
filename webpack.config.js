// node modules
var path = require('path');

// npm libraries
var HtmlWebpackPlugin = require('html-webpack-plugin');
var StylelintWebpackPlugin = require('stylelint-webpack-plugin');

/**
 * __dirname is current file directory,
 * or the directory this file is in,
 * or the root directory since the config file should be at root
 *
 * note that [current file dir] != [current working dir]
 */
var paths = {
  appBuild: path.resolve(__dirname, 'output'),
  appIndexJs: path.resolve(__dirname, 'src/index'),
  appPublicHtml: path.resolve(__dirname, 'public/index.html'),
  appSrc: path.resolve(__dirname, 'src'),
  bootstrapSass: path.resolve(__dirname, 'node_modules/bootstrap-sass/assets/stylesheets'),
};

/**
 * entry and output are required properties
 *
 * entry tells webpack where to start its graph of dependencies
 * output tells webpack where to emit its bundle
 * modules work per file
 * plugins act on "chunks" of files
 */
var config = {
  entry: paths.appIndexJs,
  output: {
    path: paths.appBuild,
    filename: "myCode.js"
  },
  module: {
    rules: [
      /**
       * load any assets without an assigned loader through url-loader
       * url-loader will fallback onto file-loader if files exceed a
       * given byte size, defined in query.limit
       */
      {
        exclude: [
          /\.html$/,
          /\.(js|jsx)$/,
          /\.(css|scss)$/,
          /\.json$/,
        ],
        use: {
          loader: 'url-loader',
          query: {
            limit: 10000,
            name: 'static/media/[name].[hash:8].[ext]'
          },
        },
      },
      // lints then transpiles all .js files in src/
      {
        test: /\.(js|jsx)$/,
        include: paths.appSrc,
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
          /**
           * specify includePaths for .scss @import
           * @import will search thru these paths before
           * it searches relative paths
           */
          {
            loader: 'sass-loader',
            options: {
              includePaths: paths.bootstrapSass,
            }
          },
        ],
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: 'body',
      template: paths.appPublicHtml,
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
    // CSS linter
    new StylelintWebpackPlugin({
      syntax: 'scss',
    }),
  ],
  resolve: {
    /**
     * including .jsx may not be necessary. React already converts .jsx tempaltes to
     * Javascript code. If errors come up, it may be better to rename all .jsx files
     * to .js, and let Webpack uses its default resolve.extensions.
     */
    extensions: ['.js', '.json', '.jsx', '.css'],
  },
};

module.exports = config;
