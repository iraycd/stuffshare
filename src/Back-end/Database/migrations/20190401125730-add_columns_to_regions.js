'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query(
        `
        ALTER TABLE Regions  ALTER COLUMN country_id INTEGER  NULL
        ALTER TABLE Regions      ADD [uid]  BIGINT  NULL
        ALTER TABLE Regions    ADD name_clob nvarchar(max) NULL
        ALTER TABLE Regions    ADD name_clear nvarchar(255)  NULL


      `
      )
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(
      `
      ALTER TABLE Regions 
      ALTER COLUMN country_id INTEGER NOT NULL
      ALTER TABLE Regions  DROP COLUMN [uid]
      ALTER TABLE Regions    DROP COLUMN name_clob 
      ALTER TABLE Regions    DROP COLUMN name_clear 



  `
    )
  }
};