'use strict';
module.exports = (sequelize, DataTypes) => {
  var UserAuth = sequelize.define('UserAuth', {
    user_id: DataTypes.INTEGER,
    socialUser_id: DataTypes.STRING,
    socialType: DataTypes.INTEGER
  }, {underscored: true});
  UserAuth.associate = function(models) {
    UserAuth.belongsTo(models.User);
    // associations can be defined here
  };
  return UserAuth;
};