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
// TEAM MODEL
// -----------------------------------------------------------------------------

/**
 * Model definition for a team
 *
 * @param {Sequelize} sequelize A Sequelize instance
 * @param {object} DataTypes Sequelize data types
 * @returns {Sequelize.Model} The Team model
 */
export default (sequelize, DataTypes) => {
  class Team extends Model {

    static associate(models) {
      Team.belongsTo(models.League, {
        foreignKey: 'league_id'
      });
    }

  }

  Team.init({
    name: {
      allowNull: false,
      type: DataTypes.STRING
    }
  }, {
    modelName: 'Team',
    sequelize,
    tableName: 'teams'
  });

  return Team;
};
