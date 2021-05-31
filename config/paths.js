/**
 * ██████╗  █████╗ ███████╗███████╗    ███████╗███████╗████████╗
 * ██╔══██╗██╔══██╗██╔════╝██╔════╝    ██╔════╝██╔════╝╚══██╔══╝
 * ██████╔╝███████║███████╗█████╗      ███████╗█████╗     ██║
 * ██╔══██╗██╔══██║╚════██║██╔══╝      ╚════██║██╔══╝     ██║
 * ██████╔╝██║  ██║███████║███████╗    ███████║███████╗   ██║
 * ╚═════╝ ╚═╝  ╚═╝╚══════╝╚══════╝    ╚══════╝╚══════╝   ╚═╝
 */

// -----------------------------------------------------------------------------
// IMPORTS
// -----------------------------------------------------------------------------

// External/Third-party dependencies
const path = require('path');


// -----------------------------------------------------------------------------
// DIRECTORIES/FOLDERS
// -----------------------------------------------------------------------------

const DIRS = {
  BUILD_DEVELOP: path.resolve(__dirname, './../build/develop'),

  BUNDLE_ASSETS: 'assets',
  BUNDLE_ASSETS_FONTS: 'assets/fonts',
  BUNDLE_ASSETS_ICONS: 'assets/icons',
  BUNDLE_ASSETS_IMAGES: 'assets/images',
  BUNDLE_ASSETS_STYLES: 'assets/styles',

  SASS_BASE: path.resolve(__dirname, './../src/sass'),
  SASS_INCLUDE_PATHS: [
    path.resolve(__dirname, './../src/sass/**'),
    path.resolve(__dirname, './../node_modules/normalize-scss/sass')
  ],

  SOURCE: path.resolve(__dirname, './../src/'),
  STATIC: path.resolve(__dirname, './../static')
};


// -----------------------------------------------------------------------------
// FILES
// -----------------------------------------------------------------------------

const FILES = {
  HTML_INDEX: 'index.html',

  JS_PROCESS_MAIN: 'index-main.js',
  JS_PROCESS_RENDER: 'index-render.js',

  THEME_DEFAULT_ROOT: 'theme-default.scss',
  THEME_DEFAULT_VARS: 'theme-default-variables.scss'
};


// -----------------------------------------------------------------------------
// EXPORTS
// -----------------------------------------------------------------------------

module.exports = {
  DIRS,
  FILES
};
