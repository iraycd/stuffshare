'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('UserConversations', ['user_id'], {
      type: 'FOREIGN KEY',
      name: 'FK_conversation_user_member', // useful if using queryInterface.removeConstraint
      references: {
        table: 'Users',
        field: 'id',
      },
      onDelete: 'no action',
      onUpdate: 'no action',
    }).then(item=>{
      queryInterface.addConstraint('UserConversations', ['conversation_id'], {
        type: 'FOREIGN KEY',
        name: 'FK_conversation_link_user', // useful if using queryInterface.removeConstraint
        references: {
          table: 'Conversations',
          field: 'id',
        },
        onDelete: 'no action',
        onUpdate: 'no action',
      })
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint('UserConversations', 'FK_conversation_user_member').then(item=>{
      queryInterface.removeConstraint('UserConversations', 'FK_conversation_link_user')
    })
  }
};