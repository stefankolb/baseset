/**
 * ██████╗  █████╗ ███████╗███████╗    ███████╗███████╗████████╗
 * ██╔══██╗██╔══██╗██╔════╝██╔════╝    ██╔════╝██╔════╝╚══██╔══╝
 * ██████╔╝███████║███████╗█████╗      ███████╗█████╗     ██║
 * ██╔══██╗██╔══██║╚════██║██╔══╝      ╚════██║██╔══╝     ██║
 * ██████╔╝██║  ██║███████║███████╗    ███████║███████╗   ██║
 * ╚═════╝ ╚═╝  ╚═╝╚══════╝╚══════╝    ╚══════╝╚══════╝   ╚═╝
 *
 * Webpack configuration for the Electron render process files
 */

// -----------------------------------------------------------------------------
// IMPORTS
// -----------------------------------------------------------------------------

// External/Third-party dependencies
const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// Internal dependencies
require('./env.develop');
const PATHS = require('./paths');


// -----------------------------------------------------------------------------
// CONFIGURATION
// -----------------------------------------------------------------------------

const appName = process.env.npm_package_productName;
const appVersion = process.env.npm_package_version;


// -----------------------------------------------------------------------------
// WEBPACK CONFIGURATION
// -----------------------------------------------------------------------------

module.exports = {
  devtool: 'eval-cheap-module-source-map',

  entry: {
    'index-render': [
      path.join(PATHS.DIRS.SOURCE, PATHS.FILES.JS_PROCESS_RENDER)
    ],
    'theme-default': [
      path.join(PATHS.DIRS.SASS_BASE, PATHS.FILES.THEME_DEFAULT_ROOT)
    ]
  },

  mode: process.env.NODE_ENV,

  module: {
    rules: [
      // Transpile JavaScript
      {
        exclude: [
          /node_modules/
        ],
        include: [
          PATHS.DIRS.SOURCE
        ],
        test: /\.(js|jsx)$/,
        use: {
          loader: 'babel-loader',
          options: {
            ...JSON.parse(fs.readFileSync(path.resolve(__dirname, './../.babelrc')))
          }
        }
      },

      // Compile /Sass/SCSS to CSS
      {
        test: /\.s(c|a)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              sassOptions: {
                includePaths: PATHS.DIRS.SASS_INCLUDE_PATHS
              }
            }
          }
        ]
      }
    ]
  },

  optimization: {
    // @FIXME: This optimization is only needed because webpack-dev-server does
    //         not handle HMR for multiple entry points properly.
    //         see: https://github.com/webpack/webpack-dev-server/issues/2792
    runtimeChunk: 'single'
  },

  output: {
    filename: '[name].js',
    globalObject: 'this',
    path: PATHS.DIRS.BUILD_DEVELOP,
    publicPath: '/'
  },

  plugins: [
    new MiniCssExtractPlugin({
      chunkFilename: '[id].css',
      filename: `${PATHS.DIRS.BUNDLE_ASSETS_STYLES}/[name].css`
    }),
    new HtmlWebpackPlugin({
      inject: true,
      template: path.join(PATHS.DIRS.STATIC, PATHS.FILES.HTML_INDEX),
      templateParameters: {
        /* eslint-disable camelcase */
        app_name: appName,
        app_version: appVersion
        /* eslint-enable */
      }
    })
  ],

  resolve: {
    extensions: [
      '.js',
      '.jsx'
    ]
  },

  target: 'electron-renderer'
};
