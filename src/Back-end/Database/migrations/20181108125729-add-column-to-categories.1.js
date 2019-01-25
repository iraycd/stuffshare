'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'Categories',
      'status',
      Sequelize.INTEGER
    )
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Categories', 'status')
  }
};