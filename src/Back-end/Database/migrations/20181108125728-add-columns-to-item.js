'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'Items',
      'uid',
      Sequelize.UUID
    )
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Items', 'uid')
  }
};