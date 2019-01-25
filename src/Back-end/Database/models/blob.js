
'use strict';
import { Model } from 'sequelize';

/**
 * 
 * @export
 * @class Blob
 * @extends Sequelize.Model
 */
export default class Blob extends Model {

  /**
   * 
   * @static
   * @param  {any} sequelize 
   * @param  {any} DataTypes 
   * @return {Blob|Model}
   * @memberof Blob
   */
  static init(sequelize, DataTypes) {
    return super.init(
      {
        blob_id: DataTypes.INTEGER,
        item_id: DataTypes.INTEGER,
        blob_thumbmail_id: DataTypes.INTEGER,
        user_id: {
          type: DataTypes.INTEGER
        },
        order:DataTypes.INTEGER,
        status:DataTypes.INTEGER
      },
      { sequelize }
    );
  }
  static associate(models) {
    Blob.belongsTo(models.BlobMapper, { as: "blob_item", targetKey: 'id', foreignKey: "blob_id" });
    Blob.belongsTo(models.BlobMapper, { as: "blob_thumbmail", targetKey: 'id', foreignKey: "blob_thumbmail_id" });
    //  Blob.belongsTo(models.User);
  }
}





/*
'use strict';
module.exports = (sequelize, DataTypes) => {
  var Blob = sequelize.define('Blobs', {
    blob_id: DataTypes.INTEGER,
    item_id: DataTypes.INTEGER,
    blob_id_thumbmail: DataTypes.INTEGER,
    user_id:{
      type: DataTypes.INTEGER
    },
  }, {underscored: true});
  Blob.associate = function(models) {
    // associations can be defined here
    console.log(models);
    Blob.belongsTo(models.BlobMappers);
    Blob.belongsTo(models.Item);
    Blob.belongsTo(models.User);
  };
  return Blob;
};

*/