'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query(
        `
        ALTER TABLE Countries    ADD longitude float NULL
        ALTER TABLE Countries    ADD latitude float  NULL
     


      `
      )
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(
      `
  
      ALTER TABLE Countries    DROP COLUMN latitude  
      ALTER TABLE Countries    DROP COLUMN longitude



  `
    )
  }
};