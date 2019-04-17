"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('RegionHierarchy', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_parent: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      id_child: {
        type: Sequelize.STRING,
        allowNull: false,
      }
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('RegionHierarchy');
  }
};
