"use strict";
import { Model } from "sequelize";
/**
 *
 * @export
 * @class Users
 * @extends Sequelize.Model
 */
export default class V_User extends Model {
  /**
   *
   * @static
   * @param  {any} sequelize
   * @param  {any} DataTypes
   * @return {V_User|Model}
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
        name: {
          type: DataTypes.STRING,
          allowNull: false
        },
        surname: {
          type: DataTypes.STRING,
          allowNull: false
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true
        },
        phone: {
          type: DataTypes.STRING,
          allowNull: false
        },
        birthDate: {
          type: DataTypes.DATEONLY,
          allowNull: false
        },

        longitude: DataTypes.FLOAT,
        latitude: DataTypes.FLOAT,
        relogin_require: DataTypes.BOOLEAN,
        language: DataTypes.STRING,
        blob_id: DataTypes.UUID,
        is_admin: DataTypes.BOOLEAN,
        is_root: DataTypes.BOOLEAN,
        zipcode: DataTypes.STRING,
        address: DataTypes.STRING,
        city_id: DataTypes.UUID,
        country_id: DataTypes.UUID,
        city: DataTypes.STRING

      },
      { sequelize }
    );
  }
  static associate(models) {
    // V_User.hasOne(models.Blob, { as: "blob_profile", targetKey: 'blob_id', foreignKey: "id" });
    V_User.belongsTo(models.Blob, { as: "blob_profile", targetKey: 'id', foreignKey: "blob_id" });

    // Users.hasMany(models.UserAuth)
  }
}

/*
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    surname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    salt: DataTypes.STRING,
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    birthDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    uid: {
      type: DataTypes.UUID,
      defaultValue: sequelize.UUIDV4
    },
    is_authorized: DataTypes.BOOLEAN,
    passwordHash: DataTypes.STRING,
    city: DataTypes.STRING,
    city_id: DataTypes.INTEGER,
    adress: DataTypes.STRING,
    country: DataTypes.STRING,
    country_id: DataTypes.INTEGER,
    longitude: DataTypes.FLOAT,
    latitude: DataTypes.FLOAT,
    relogin_require:DataTypes.BOOLEAN,
    refresh_token:  DataTypes.UUID

  }, {underscored: true});
  User.associate = function (models) {
    //User.hasMany(models.Item);
    User.hasMany(models.UserAuth)
    // associations can be defined here
  };
  return User;
};
*/
