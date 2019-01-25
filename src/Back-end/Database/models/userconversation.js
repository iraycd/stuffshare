'use strict';
module.exports = (sequelize, DataTypes) => {
  var UserConversation = sequelize.define('UserConversation', {
    user_id: DataTypes.INTEGER,
    conversation_id: DataTypes.INTEGER
  }, {underscored: true});
  UserConversation.associate = function(models) {
    // associations can be defined here
  };
  return UserConversation;
};