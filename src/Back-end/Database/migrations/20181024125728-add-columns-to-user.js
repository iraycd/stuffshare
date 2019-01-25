'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'Users',
      'relogin_require',
      Sequelize.BOOLEAN
    ).then(item => {
      return queryInterface.addColumn(
        'Users',
        'refresh_token',
        Sequelize.UUID
      )
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Users', 'relogin_require').then(item => {
      queryInterface.removeColumn('Users', 'refresh_token')
    })
  }
};