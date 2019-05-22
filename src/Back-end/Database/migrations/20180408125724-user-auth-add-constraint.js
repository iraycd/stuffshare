'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('UserAuths', ['user_id'], {
      type: 'FOREIGN KEY',
      name: 'FK_user_auth_user_id', // useful if using queryInterface.removeConstraint
      references: {
        table: 'Users',
        field: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'no action',
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint('UserAuths', 'FK_user_auth_user_id');
  }
};