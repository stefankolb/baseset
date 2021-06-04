/**
 * ██████╗  █████╗ ███████╗███████╗    ███████╗███████╗████████╗
 * ██╔══██╗██╔══██╗██╔════╝██╔════╝    ██╔════╝██╔════╝╚══██╔══╝
 * ██████╔╝███████║███████╗█████╗      ███████╗█████╗     ██║
 * ██╔══██╗██╔══██║╚════██║██╔══╝      ╚════██║██╔══╝     ██║
 * ██████╔╝██║  ██║███████║███████╗    ███████║███████╗   ██║
 * ╚═════╝ ╚═╝  ╚═╝╚══════╝╚══════╝    ╚══════╝╚══════╝   ╚═╝
 *
 * Webpack configuration for the Electron main process files
 */

// -----------------------------------------------------------------------------
// IMPORTS
// -----------------------------------------------------------------------------

// External/Third-party dependencies
const path = require('path');
const ElectronReloadPlugin = require('webpack-electron-reload')({
  // @FIXME This is available in PATHS, but plugin does not allow later init :(
  path: path.join(__dirname, './../build/develop/index-main.js')
});

// Internal dependencies
require('./env.develop');
const PATHS = require('./paths');


// -----------------------------------------------------------------------------
// WEBPACK CONFIGURATION
// -----------------------------------------------------------------------------

const isInWatchMode = process.argv.findIndex(item => item === '--watch') > -1;

module.exports = {
  devtool: 'eval-cheap-module-source-map',

  entry: {
    'index-main': [
      path.join(PATHS.DIRS.SOURCE, PATHS.FILES.JS_PROCESS_MAIN)
    ]
  },

  mode: process.env.NODE_ENV,

  module: {
    rules: [
      // Transpile JavaScript
      {
        exclude: [ /node_modules/ ],
        include: PATHS.DIRS.SOURCE,
        test: /\.(js|jsx)$/,
        use: [
          'babel-loader'
        ]
      }
    ]
  },

  output: {
    filename: '[name].js',
    globalObject: 'this',
    path: PATHS.DIRS.BUILD_DEVELOP,
    publicPath: '/'
  },

  plugins: [
    /* eslint-disable no-empty-function */
    ( isInWatchMode ? ElectronReloadPlugin() : () => { } )
    /* eslint-enable no-empty-function */
  ],

  target: 'electron-main'
};
