'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('Cities', ['region_id'], {
      type: 'FOREIGN KEY',
      name: 'FK_cities_region_id', // useful if using queryInterface.removeConstraint
      references: {
        table: 'Regions',
        field: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'no action',
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint('Cities', 'FK_cities_region_id')
  }
};