'use strict';
module.exports = (sequelize, DataTypes) => {
  var ConversationMessages = sequelize.define('ConversationMessages', {
    conversation_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    message: DataTypes.STRING
  }, {underscored: true});
  ConversationMessages.associate = function(models) {
    // associations can be defined here
  };
  return ConversationMessages;
};