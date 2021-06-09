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
// BRAND MODEL
// -----------------------------------------------------------------------------

/**
 * Model definition for a brand
 *
 * @param {Sequelize} sequelize A Sequelize instance
 * @param {object} DataTypes Sequelize data types
 * @returns {Sequelize.Model} The Brand model
 */
export default (sequelize, DataTypes) => {
  class Brand extends Model {

    static associate(models) {
      Brand.belongsTo(models.Manufacturer, {
        foreignKey: 'manufacturer_id'
      });
    }

  }

  Brand.init({
    name: {
      allowNull: false,
      type: DataTypes.STRING
    }
  }, {
    modelName: 'Brand',
    sequelize,
    tableName: 'brands'
  });

  return Brand;
};
