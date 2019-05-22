'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query(
        `
        ALTER TABLE Countries    ADD [uid]  BIGINT  NULL
        ALTER TABLE Countries    ADD name_clob nvarchar(max) NULL
        ALTER TABLE Countries    ADD name_clear nvarchar(255)  NULL


      `
      )
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(
      `
      ALTER TABLE Countries  DROP COLUMN [uid]
      ALTER TABLE Countries    DROP COLUMN name_clob 
      ALTER TABLE Countries    DROP  COLUMN name_clear


  `
    )
  }
};