'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('Regions', ['country_id'], {
      type: 'FOREIGN KEY',
      name: 'FK_region_country_id', // useful if using queryInterface.removeConstraint
      references: {
        table: 'Countries',
        field: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'no action',
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint('Regions', 'FK_region_country_id');
  }
};