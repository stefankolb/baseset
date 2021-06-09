/**
 * ██████╗  █████╗ ███████╗███████╗    ███████╗███████╗████████╗
 * ██╔══██╗██╔══██╗██╔════╝██╔════╝    ██╔════╝██╔════╝╚══██╔══╝
 * ██████╔╝███████║███████╗█████╗      ███████╗█████╗     ██║
 * ██╔══██╗██╔══██║╚════██║██╔══╝      ╚════██║██╔══╝     ██║
 * ██████╔╝██║  ██║███████║███████╗    ███████║███████╗   ██║
 * ╚═════╝ ╚═╝  ╚═╝╚══════╝╚══════╝    ╚══════╝╚══════╝   ╚═╝
 */

/**
 * @module constants
 *
 * @description
 * Fixed/Constant values to be used throughout the whole application.
 */


// -----------------------------------------------------------------------------
// APPLICATION CONFIG
// -----------------------------------------------------------------------------

/**
 * Application related constants
 *
 * @property {string} APP_VERSION
 *           The version of the application (see `package.json`)
 * @property {string} DB_FILE
 *           The name of the default database file
 * @property {string} DB_NAME
 *           The name of the default database
 * @property {string} DB_PATH
 *           The path to the database folder within userData
 * @property {number} DB_VERSION
 *           The database internal version
 */
export const APP = Object.freeze({
  APP_VERSION: process.env.npm_package_version,

  DB_FILE: 'baseset.sqlite',
  DB_NAME: 'baseset',
  DB_PATH: '/',
  DB_VERSION: 1
});


// -----------------------------------------------------------------------------
// ERROR MESSAGES
// -----------------------------------------------------------------------------

/**
 * Error related constants
 *
 * @property {object} APP
 *           Application related errors
 * @property {object} ORM
 *           ORM/Database related errors
 */
export const ERROR = Object.freeze({
  APP: {
    INIT_FAIL: 'Failed to initialize the app'
  },

  ORM: {
    MODEL_LOAD_FAILED: 'Loading models failed',
    ORM_INIT_NO_PATH: 'No path to storage/database has been provided',
    ORM_NOT_INITIALIZED: 'ORM has not been initialized',
    SYNC_FAILED: 'Syncing the ORM with the database failed'
  }
});
