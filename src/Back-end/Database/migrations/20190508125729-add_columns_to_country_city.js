'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query(
        `
        ALTER TABLE Countries    ADD countryCode nvarchar(10) NULL
        ALTER TABLE Cities    ADD country_id char(36)  NULL
     


      `
      )
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(
      `
      ALTER TABLE Countries    DROP COLUMN countryCode
      ALTER TABLE Cities    DROP COLUMN country_id
   



  `
    )
  }
};