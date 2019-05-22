


'use strict';
import { Model } from 'sequelize';

/**
 * 
 * @export
 * @class BlobMapper
 * @extends Sequelize.Model
 */
export default class BlobMapper extends Model {

  /**
   * 
   * @static
   * @param  {any} sequelize 
   * @param  {any} DataTypes 
   * @return {BlobMapper|Model}
   * @memberof Blob
   */
  static init(sequelize, DataTypes) {
    return super.init(
      {
        id: {
          type: DataTypes.UUID,
          primaryKey: true,
          autoIncrement: false,
          defaultValue: sequelize.UUIDV4

        }
      },
      { sequelize }
    );
  }
  static associate(models) {
    //BlobMapper.belongsTo(models.Blobs, { foreignKey: "blob_thumbmail_id" });
    //BlobMapper.belongsTo(models.Blobs, { foreignKey: "blob_id" })
  }
}


/*'use strict';
module.exports = (sequelize, DataTypes) => {
  var BlobMapper = sequelize.define('BlobMappers', {
    stream_guid: DataTypes.STRING(50),
  }, {underscored: true});

  BlobMapper.associate = function(models) {
    BlobMapper.hasOne(models.Blobs,{foreignKey:"blob_id_thumbmail"});
    BlobMapper.hasOne(models.Blobs,{foreignKey:"blob_id"})
    // associations can be defined here
  };
  return BlobMapper;
};

*/