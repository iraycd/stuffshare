'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'Blobs',
      'order',
      Sequelize.INTEGER
    ).then(item => {
      return queryInterface.addColumn(
        'Blobs',
        'status',
        Sequelize.INTEGER
      )
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Blobs', 'order').then(item => {
      queryInterface.removeColumn('Blobs', 'status')
    })
  }
};