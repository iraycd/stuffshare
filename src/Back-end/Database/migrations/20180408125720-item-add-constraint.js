'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('Items',['user_id'],{
      type: 'FOREIGN KEY',
      name: 'FK_user_id_items', // useful if using queryInterface.removeConstraint
      references: {
        table: 'Users',
        field: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'no action',
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint('Items','FK_user_id_items');
  }
};