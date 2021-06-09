/**
 * ██████╗  █████╗ ███████╗███████╗    ███████╗███████╗████████╗
 * ██╔══██╗██╔══██╗██╔════╝██╔════╝    ██╔════╝██╔════╝╚══██╔══╝
 * ██████╔╝███████║███████╗█████╗      ███████╗█████╗     ██║
 * ██╔══██╗██╔══██║╚════██║██╔══╝      ╚════██║██╔══╝     ██║
 * ██████╔╝██║  ██║███████║███████╗    ███████║███████╗   ██║
 * ╚═════╝ ╚═╝  ╚═╝╚══════╝╚══════╝    ╚══════╝╚══════╝   ╚═╝
 */

/* eslint-disable jsdoc/no-undefined-types */

// -----------------------------------------------------------------------------
// IMPORTS
// -----------------------------------------------------------------------------

// External/Third-party dependencies
import { Model } from 'sequelize';


// -----------------------------------------------------------------------------
// SEASON MODEL
// -----------------------------------------------------------------------------

/**
 * Model definition for a season
 *
 * @param {Sequelize} sequelize A Sequelize instance
 * @param {object} DataTypes Sequelize data types
 * @returns {Sequelize.Model} The Season model
 */
export default (sequelize, DataTypes) => {
  class Season extends Model {

    static associate(models) {
      Season.belongsTo(models.League, {
        foreignKey: 'league_id'
      });
    }

  }

  Season.init({
    name: {
      allowNull: false,
      type: DataTypes.STRING
    }
  }, {
    modelName: 'Season',
    sequelize,
    tableName: 'seasons'
  });

  return Season;
};
