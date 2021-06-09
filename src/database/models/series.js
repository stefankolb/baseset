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
// SERIES MODEL
// -----------------------------------------------------------------------------

/**
 * Model definition for a series
 *
 * @param {Sequelize} sequelize A Sequelize instance
 * @param {object} DataTypes Sequelize data types
 * @returns {Sequelize.Model} The Series model
 */
export default (sequelize, DataTypes) => {
  class Series extends Model {

    static associate(models) {
      Series.belongsTo(models.Brand, {
        foreignKey: 'brand_id'
      });
    }

  }

  Series.init({
    name: {
      allowNull: false,
      type: DataTypes.STRING
    },
    ratio: {
      defaultValue: '1',
      type: DataTypes.REAL
    }
  }, {
    modelName: 'Series',
    sequelize,
    tableName: 'series'
  });

  return Series;
};
