"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.sequelize
      .query(
        `  
      ALTER TABLE Items
        ADD is_elastic_sync bit NULL
        `

      )

  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query(`

      ALTER TABLE Items
      DROP COLUMN is_elastic_sync

      
`)
  }
};
