'use strict';
import { Model } from 'sequelize';

/**
 * 
 * @export
 * @class Category
 * @extends Sequelize.Model
 */
export default class Category extends Model {

  /**
   * 
   * @static
   * @param  {any} sequelize 
   * @param  {any} DataTypes 
   * @return {Category|Model}
   * @memberof Users
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
        category: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        category_pl: DataTypes.STRING,
        category_us: DataTypes.STRING,
        category_de: DataTypes.STRING,
        category_ru: DataTypes.STRING,
        category_fr: DataTypes.STRING,
        category_es: DataTypes.STRING,
        category_no: DataTypes.STRING,
        category_zh_cn: DataTypes.STRING,
        status: DataTypes.INTEGER,
        forThing: DataTypes.INTEGER,
        forSell: DataTypes.INTEGER,
        forEvent: DataTypes.INTEGER,
        icon: DataTypes.STRING


      },
      { sequelize }
    );
  }
  static associate(models) {
  //  Category.belongsTo(models.CategoryHierarchy, { as: "category_parent", targetKey: 'category_child_id', foreignKey: "id" });
    Category.belongsToMany(models.Category, {
      through: { model: models.CategoryHierarchy },
      as: 'category_children',
      targetKey: 'id',
      foreignKey: "category_parent_id"
    });

    Category.belongsToMany(models.Category, {
      through: { model: models.CategoryHierarchy },
      as: 'category_parent',
      targetKey: 'id',
      foreignKey: "category_child_id"
    });
  }
}


/*


module.exports = (sequelize, DataTypes) => {
  var Category = sequelize.define('Category', {
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category_pl: DataTypes.STRING,
    category_us: DataTypes.STRING
  }, { underscored: true });
  Category.associate = function (models) {

    Category.belongsTo(models.CategoryHierarchy, { as: "category_parent", targetKey: 'category_child_id', foreignKey: "id" });
    Category.belongsToMany(models.Category, {
      through: { model: models.CategoryHierarchy },
      as: 'category_children',
      targetKey: 'id',
      foreignKey: "category_parent_id"
    });
  };

  return Category;
};

*/