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
// CARD MODEL
// -----------------------------------------------------------------------------

/**
 * Model definition for a single card
 *
 * @param {Sequelize} sequelize A Sequelize instance
 * @param {object} DataTypes Sequelize data types
 * @returns {Sequelize.Model} The Card model
 */
export default (sequelize, DataTypes) => {
  class Card extends Model {

    static associate(models) {
      Card.belongsTo(models.Player, {
        foreignKey: 'player_id'
      });
      Card.belongsTo(models.Series, {
        foreignKey: 'series_id'
      });
    }

  }

  Card.init({
    number: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    count: {
      defaultValue: 1,
      type: DataTypes.INTEGER
    }
  }, {
    modelName: 'Card',
    sequelize,
    tableName: 'cards'
  });

  return Card;
};
