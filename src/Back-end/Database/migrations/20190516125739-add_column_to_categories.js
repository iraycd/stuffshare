"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize
    .query(
      `
      ALTER TABLE Categories ADD [uid] char(36) NULL;

    `

    )
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize
    .query('ALTER TABLE Categories DROP COLUMN uid;');
  }
};
