'use strict';
import { Model } from 'sequelize';

/**
 * 
 * @export
 * @class CategoryHierarchy
 * @extends Sequelize.Model
 */
export default class CategoryHierarchy extends Model {

  /**
   * 
   * @static
   * @param  {any} sequelize 
   * @param  {any} DataTypes 
   * @return {CategoryHierarchy|Model}
   * @memberof Users
   */
  static init(sequelize, DataTypes) {
    return super.init(
      {
        category_child_id: DataTypes.INTEGER,
        category_parent_id: DataTypes.INTEGER
      },
      { sequelize }
    );
  }
  static associate(models) {
    CategoryHierarchy.hasOne(models.Category, { as: "category_parent", targetKey: 'category_parent_id', foreignKey: "id" });
    CategoryHierarchy.hasMany(models.Category, { as: "category_children", targetKey: 'category_child_id', foreignKey: "id" });
  }
}






/*
'use strict';



module.exports = (sequelize, DataTypes) => {
  var CategoryHierarchy = sequelize.define('CategoryHierarchy', {
   
  }, {underscored: true});
  CategoryHierarchy.associate = function (models) {
   // CategoryHierarchy.hasOne(models.Category, { as: "category_parent",targetKey: 'category_id_parent', foreignKey: "id" });
    CategoryHierarchy.hasOne(models.Category, { as: "category_parent",targetKey: 'category_parent_id', foreignKey: "id" });
    CategoryHierarchy.hasMany(models.Category, { as: "category_children",targetKey: 'category_child_id', foreignKey: "id" });
  };
  return CategoryHierarchy;
};

*/