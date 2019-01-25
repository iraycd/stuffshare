'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('ConversationMessages', ['conversation_id'], {
      type: 'FOREIGN KEY',
      name: 'FK_message_conversation', // useful if using queryInterface.removeConstraint
      references: {
        table: 'Conversations',
        field: 'id',
      },
      onDelete: 'no action',
      onUpdate: 'no action',
    }).then(item=>{
      return queryInterface.addConstraint('ConversationMessages', ['user_id'], {
        type: 'FOREIGN KEY',
        name: 'FK_message_user', // useful if using queryInterface.removeConstraint
        references: {
          table: 'Users',
          field: 'id',
        },
        onDelete: 'no action',
        onUpdate: 'no action',
      })
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint('ConversationMessages', 'FK_message_conversation').then(item=>{
      return   queryInterface.removeConstraint('ConversationMessages', 'FK_message_user')
    })
  }
};