"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('Cities', ['country_id'], {
      type: 'FOREIGN KEY',
      name: 'FK_cities_country_id', // useful if using queryInterface.removeConstraint
      references: {
        table: 'Countries',
        field: 'id',
      },
      onDelete: 'no action',
      onUpdate: 'no action',
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint('Cities', 'FK_cities_country_id')
  }
};
