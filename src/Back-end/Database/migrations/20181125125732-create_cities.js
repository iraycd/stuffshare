"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Cities', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      region_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      latitude:{
        type: Sequelize.FLOAT

      },
      longitude:{
        type: Sequelize.FLOAT

      },
      status: {
        type: Sequelize.STRING,
        allowNull: false,
      }
      
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Cities');
  }
};
