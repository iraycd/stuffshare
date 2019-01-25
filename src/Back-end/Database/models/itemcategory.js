'use strict';

import { Model } from 'sequelize';



export default class ItemCategory extends Model {

  /**
   * 
   * @static
   * @param  {any} sequelize 
   * @param  {any} DataTypes 
   * @return {ItemCategory|Model}
   * @memberof ItemCategory
   */
  static init(sequelize, DataTypes) {
    return super.init(
      {
        item_id: DataTypes.INTEGER,
        category_id: DataTypes.INTEGER,
        is_visible:DataTypes.INTEGER
      },
      { sequelize }
    );
  }
  static associate(models) {
  //  ItemCategory.belongsTo(models.Item);
    //  Blob.belongsTo(models.User);
  }
}

/*
module.exports = (sequelize, DataTypes) => {
  var ItemCategory = sequelize.define('ItemCategory', {
    item_id: DataTypes.INTEGER,
    category_id: DataTypes.INTEGER
  }, {underscored: true});
  ItemCategory.associate = function(models) {

    ItemCategory.belongsTo(models.Item);
   //  ItemCategory.hasMany(models.Category)
    // associations can be defined here
  };
  return ItemCategory;
};
*/