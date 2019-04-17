'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query(
        `
        ALTER TABLE Cities  ALTER COLUMN region_id INTEGER  NULL
        ALTER TABLE Cities      ADD [uid]  BIGINT  NULL
        ALTER TABLE Cities    ADD name_clob nvarchar(max) NULL
        ALTER TABLE Cities    ADD subregion_id INTEGER  NULL
        ALTER TABLE Cities    ADD population bigint  NULL
        ALTER TABLE Cities    ADD name_clear nvarchar(255)  NULL



      `
      )
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(
      `
      ALTER TABLE Cities 
      ALTER COLUMN region_id INTEGER NOT NULL
      ALTER TABLE Cities  DROP COLUMN [uid]
      ALTER TABLE Cities    DROP COLUMN name_clob 
      ALTER TABLE Cities    DROP COLUMN subregion_id
      ALTER TABLE Cities    DROP COLUMN population  
      ALTER TABLE Cities    DROP COLUMN name_clear



  `
    )
  }
};