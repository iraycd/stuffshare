'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query(
        `
        ALTER TABLE Cities    ADD countryCode nvarchar(10) NULL
     


      `
      )
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(
      `
      ALTER TABLE Cities    DROP COLUMN countryCode
   
  `
    )
  }
};