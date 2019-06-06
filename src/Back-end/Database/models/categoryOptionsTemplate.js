"use strict";
import { Model } from "sequelize";

/**
 *
 * @export
 * @class Item
 * @extends Sequelize.Model
 */
export default class CategoryOptionsTemplate extends Model {
  /**
   *
   * @static
   * @param  {any} sequelize
   * @param  {any} DataTypes
   * @return {Region|Model}
   * @memberof CategoryOptionsTemplate
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
          type: DataTypes.UUID
        },
        cott_id:{
          type: DataTypes.UUID
        },
        value: {
          type: DataTypes.STRING,
        }, 
         value_pl: {
          type: DataTypes.STRING,
        }, 
        value_us:{
          type: DataTypes.STRING,
  
        },
        value_de:{
          type: DataTypes.STRING,
  
        },
        value_ru:{
          type: DataTypes.STRING,
  
        },
        value_fr:{
          type: DataTypes.STRING,
  
        },value_es:{
          type: DataTypes.STRING,
  
        },
        value_no:{
          type: DataTypes.STRING,
  
        },
        value_zh_cn:{
          type: DataTypes.STRING,
        },
        placeholder: {
          type: DataTypes.STRING,
        }, 
         placeholder_pl: {
          type: DataTypes.STRING,
        }, 
        placeholder_us:{
          type: DataTypes.STRING,
  
        },
        placeholder_de:{
          type: DataTypes.STRING,
  
        },
        placeholder_ru:{
          type: DataTypes.STRING,
  
        },
        placeholder_fr:{
          type: DataTypes.STRING,
  
        },placeholder_es:{
          type: DataTypes.STRING,
  
        },
        placeholder_no:{
          type: DataTypes.STRING,
  
        },
        placeholder_zh_cn:{
          type: DataTypes.STRING,
        }
        ,status: {
          type: DataTypes.BOOLEAN,
        },
        order: {
          type: DataTypes.INTEGER,
        }
        
   
        
      },
      { sequelize }
    );
  }
  static associate(models) {
   /* Item.belongsToMany(models.Category, {
      through: {
        model: models.ItemCategory,
        targetKey: "id",
        foreignKey: "continent_id"
      },
      as: "continents",
      targetKey: "id",
      foreignKey: "item_id"
    });
    
    Item.hasMany(models.Blob, {
      as: "blobs",
      targetKey: "id",
      foreignKey: "item_id"
    });
    //  Item.belongsTo(models.User);
    // Item.hasMany(models.ItemCategory)
    //  Blob.belongsTo(models.User);*/
  }
}

/*


module.exports = (sequelize, DataTypes) => {
  var Item = sequelize.define('Item', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING(1024),
      allowNull: false,
    },
    user_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    clobSearch: DataTypes.TEXT,
    clobSearch_pl: DataTypes.TEXT,
    clobSearch_us: DataTypes.TEXT
  }, {underscored: true});
  Item.associate = function(models) {
    Item.belongsTo(models.User);
    Item.hasMany(models.ItemCategory)
    // associations can be defined here
  };
  return Item;
};*/
