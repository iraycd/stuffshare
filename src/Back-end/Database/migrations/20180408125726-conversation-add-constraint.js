'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('Conversations', ['ownerUser_id'], {
      type: 'FOREIGN KEY',
      name: 'FK_conversation_user', // useful if using queryInterface.removeConstraint
      references: {
        table: 'Users',
        field: 'id',
      },
      onDelete: 'no action',
      onUpdate: 'no action',
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint('Conversations', 'FK_conversation_user')
  }
};