"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('Countries', ['continent_id'], {
      type: 'FOREIGN KEY',
      name: 'FK_countries_continents_id', // useful if using queryInterface.removeConstraint
      references: {
        table: 'Continents',
        field: 'id',
      },
      onDelete: 'no action',
      onUpdate: 'no action',
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint('Countries', 'FK_countries_continents_id')
  }
};
