'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'ItemCategories',
      'is_visible',
      Sequelize.BOOLEAN
    )
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('ItemCategories', 'is_visible')
  }
};