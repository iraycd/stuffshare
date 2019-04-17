"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('Subregions', ['region_id'], {
      type: 'FOREIGN KEY',
      name: 'FK_subregion_region_id', // useful if using queryInterface.removeConstraint
      references: {
        table: 'Regions',
        field: 'id',
      },
      onDelete: 'no action',
      onUpdate: 'no action',
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint('Subregions', 'FK_subregion_region_id')
  }
};
