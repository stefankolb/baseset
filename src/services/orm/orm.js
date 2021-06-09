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
import Sequelize from 'sequelize';
import sqlite3 from 'sqlite3';

// Internal dependencies
import { ERROR } from '~/constants';
import AppError from '~/AppError';
import log from '~utils/logger/logger';


// -----------------------------------------------------------------------------
// CONFIGURATION
// -----------------------------------------------------------------------------

/**
 * Tag for this module, e.g. for log output
 *
 * @type {string}
 * @default
 */
const TAG = 'service/orm';

/**
 * Path to a database storage for later use
 *
 * @type {string|null}
 */
let storedPath = null;

/**
 * Reeference to both the Sequelize class as well as an instance of this class
 *
 * @type {object}
 */
const orm = {
  Sequelize: null, // Reference to Sequelize's static methods
  sequelize: null // Reference to our sequelize instance
};


// -----------------------------------------------------------------------------
// ORM
// -----------------------------------------------------------------------------

/**
 * Returns the currently stored references to both the Sequelize class as well
 * as our Sequelize instance
 *
 * @returns {object} References to Sequelize
 */
export const getORM = () => orm;


/**
 * Initializes a Sequelize instance and uses the provided path as storage point
 *
 * @param {string} path A path for a storage/database
 * @returns {object} References to Sequelize and a sequelize instance, if
 * initialization was successful
 */
export const initORM = path => {
  // If we already have a reference to a Sequelize instance, use it
  if (orm.sequelize && orm.Sequelize) {
    return orm;
  }

  // Validate path to database file
  path = path || storedPath;
  if (!path) {
    log.error(ERROR.ORM.ORM_INIT_NO_PATH, { tag: TAG });
    return null;
  }

  orm.sequelize = new Sequelize('database', null, null, {
    dialect: 'sqlite',
    dialectModule: sqlite3,
    storage: path
  });
  orm.Sequelize = Sequelize;

  storedPath = path;

  return orm;
};


/**
 * Loads all ORM models and syncs these models with the SQLite database.
 *
 * NOTE: This approach is only valid during (inital) development. For a
 * production build, we need to switch to Sequelize's migration mechanism.
 *
 * @returns {Promise<undefined|AppError>} Nothing if init is successfull;
 * AppError if init was not successfull
 */
export const initORMModels = () => new Promise((resolve, reject) => {
  if (!orm.sequelize || !orm.Sequelize) {
    reject(new AppError(ERROR.ORM.ORM_NOT_INITIALIZED, {
      tag: TAG
    }));
    return;
  }

  log.info('Initializing ORM data models', { tag: TAG });
  try {
    Promise.all([
      require('~database/models/brand').default(orm.sequelize, orm.Sequelize.DataTypes),
      require('~database/models/card').default(orm.sequelize, orm.Sequelize.DataTypes),
      require('~database/models/league').default(orm.sequelize, orm.Sequelize.DataTypes),
      require('~database/models/manufacturer').default(orm.sequelize, orm.Sequelize.DataTypes),
      require('~database/models/player').default(orm.sequelize, orm.Sequelize.DataTypes),
      require('~database/models/season').default(orm.sequelize, orm.Sequelize.DataTypes),
      require('~database/models/series').default(orm.sequelize, orm.Sequelize.DataTypes),
      require('~database/models/team').default(orm.sequelize, orm.Sequelize.DataTypes)
    ]).then(
      models => {
        // Create model associations
        models.forEach(model => {
          if (model.associate) {
            model.associate(orm.sequelize.models);
          }
        });

        // Sync the generated model with the database
        orm.sequelize.sync({
          force: true
        }).then(
          () => {
            log.info('Successfully initialized ORM and synced with database', {
              tag: TAG
            });
            resolve();
          },
          e => {
            reject(new AppError(ERROR.ORM.SYNC_FAILED, {
              detail: e,
              tag: TAG
            }));
          }
        );
      },
      e => {
        reject(new AppError(ERROR.ORM.MODEL_LOAD_FAILED, {
          detail: e,
          tag: TAG
        }));
      }
    );
  } catch (e) {
    reject(new AppError(ERROR.ORM.MODEL_LOAD_FAILED, {
      detail: { originalError: e },
      tag: TAG
    }));
  }
});
