"use strict";
import { Model } from "sequelize";

/**
 *
 * @export
 * @class Item
 * @extends Sequelize.Model
 */
export default class CategoryOptionsLink extends Model {
  /**
   *
   * @static
   * @param  {any} sequelize
   * @param  {any} DataTypes
   * @return {Region|Model}
   * @memberof CategoryOption
   */
  static init(sequelize, DataTypes) {
    return super.init(
      {
        id: {
          type: DataTypes.UUID,
          primaryKey: true,
          autoIncrement: false,
          defaultValue: sequelize.UUIDV4

        },
        co_id: {
          type: DataTypes.UUID,
          allowNull: true
        },
        category_id: {
          type: DataTypes.UUID,
          allowNull: true
        },
        is_require: {
          type: DataTypes.BOOLEAN,
          allowNull: true
        }, order: {
          type: DataTypes.INTEGER,
          allowNull: true
        }, is_searchable: {
          type: DataTypes.BOOLEAN,
          allowNull: true
        }, limit_of: {
          type: DataTypes.INTEGER,
          allowNull: true
        },
        is_on_pin_map: {
          type: DataTypes.BOOLEAN,
          allowNull: true
        },
        is_on_map:{
          type: DataTypes.BOOLEAN,
          allowNull: true
        },
        is_form_hidden:{
          type: DataTypes.BOOLEAN,
          allowNull: true
        }
  
      },
      { sequelize }
    );
  }
  static associate(models) {
    CategoryOptionsLink.belongsTo(models.Category, { as: "category", targetKey: 'id', foreignKey: "category_id" });
    CategoryOptionsLink.belongsTo(models.CategoryOption, { as: "catOption", targetKey: 'id', foreignKey: "co_id" });


  }
}
