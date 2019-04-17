"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Continents', {
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
      name_clear: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      uid: {
        type: Sequelize.INTEGER,
        allowNull: true,
      }
    }).then(item=>{
      return queryInterface.sequelize
        .query(
          `
          ALTER TABLE Continents    ADD name_clob nvarchar(max) NULL

        `
        )
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Continents');
  }
};
