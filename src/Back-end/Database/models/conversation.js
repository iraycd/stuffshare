'use strict';
module.exports = (sequelize, DataTypes) => {
  var Conversation = sequelize.define('Conversation', {
    ownerUser_id: DataTypes.INTEGER,
    title: DataTypes.STRING
  }, {underscored: true});
  Conversation.associate = function(models) {
    Conversation.belongsTo(models.User)
    // associations can be defined here
  };
  return Conversation;
};