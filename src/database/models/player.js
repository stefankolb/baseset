/**
 * ██████╗  █████╗ ███████╗███████╗    ███████╗███████╗████████╗
 * ██╔══██╗██╔══██╗██╔════╝██╔════╝    ██╔════╝██╔════╝╚══██╔══╝
 * ██████╔╝███████║███████╗█████╗      ███████╗█████╗     ██║
 * ██╔══██╗██╔══██║╚════██║██╔══╝      ╚════██║██╔══╝     ██║
 * ██████╔╝██║  ██║███████║███████╗    ███████║███████╗   ██║
 * ╚═════╝ ╚═╝  ╚═╝╚══════╝╚══════╝    ╚══════╝╚══════╝   ╚═╝
 */

/* eslint-disable sort-keys, jsdoc/no-undefined-types */

// -----------------------------------------------------------------------------
// IMPORTS
// -----------------------------------------------------------------------------

// External/Third-party dependencies
import { Model } from 'sequelize';


// -----------------------------------------------------------------------------
// PLAYER MODEL
// -----------------------------------------------------------------------------

/**
 * Model definition for a single player
 *
 * @param {Sequelize} sequelize A Sequelize instance
 * @param {object} DataTypes Sequelize data types
 * @returns {Sequelize.Model} The Player model
 */
export default (sequelize, DataTypes) => {
  class Player extends Model {

    static associate(models) {
      Player.belongsTo(models.Team, {
        foreignKey: 'team_id'
      });
    }

  }

  Player.init({
    firstName: {
      allowNull: false,
      type: DataTypes.STRING
    },
    middleName: {
      type: DataTypes.STRING
    },
    lastName: {
      allowNull: false,
      type: DataTypes.STRING
    },
    suffix: {
      type: DataTypes.STRING
    },
    jerseyNo: {
      allowNull: false,
      type: DataTypes.INTEGER
    }
  }, {
    modelName: 'Player',
    sequelize,
    tableName: 'players'
  });

  return Player;
};
