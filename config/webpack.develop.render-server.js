/**
 * ██████╗  █████╗ ███████╗███████╗    ███████╗███████╗████████╗
 * ██╔══██╗██╔══██╗██╔════╝██╔════╝    ██╔════╝██╔════╝╚══██╔══╝
 * ██████╔╝███████║███████╗█████╗      ███████╗█████╗     ██║
 * ██╔══██╗██╔══██║╚════██║██╔══╝      ╚════██║██╔══╝     ██║
 * ██████╔╝██║  ██║███████║███████╗    ███████║███████╗   ██║
 * ╚═════╝ ╚═╝  ╚═╝╚══════╝╚══════╝    ╚══════╝╚══════╝   ╚═╝
 *
 * Webpack configuration for development server
 */

// -----------------------------------------------------------------------------
// IMPORTS
// -----------------------------------------------------------------------------

// External/Third-party dependencies
const fs = require('fs');
const path = require('path');

// Internal dependencies
const PATHS = require('./paths');
const webpackConfig = require('./webpack.develop.render');


// -----------------------------------------------------------------------------
// CONFIGURATION
// -----------------------------------------------------------------------------

const host = process.env.HOST || '127.0.0.1';
const port = parseInt(process.env.PORT, 10) || 3000;


// -----------------------------------------------------------------------------
// DEV SERVER CONFIGURATION
// -----------------------------------------------------------------------------

module.exports = Object.assign({}, webpackConfig, {
  devServer: {
    contentBase: PATHS.DIRS.STATIC,
    host: host,
    hot: true,
    https: {
      // Certificates created with mkcert
      cert: fs.readFileSync(path.resolve(__dirname, './127.0.0.1.pem')),
      key: fs.readFileSync(path.resolve(__dirname, './127.0.0.1-key.pem'))
    },
    port: port,
    publicPath: webpackConfig.output.publicPath
  }
});
