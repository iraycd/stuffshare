'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query(
        `
        ALTER TABLE Users  ADD language nvarchar(20) NULL
      `
      )
      
  },
  down: (queryInterface, Sequelize) => {

 
      return queryInterface.sequelize.query(
        `
        ALTER TABLE Users  DROP COLUMN language
        `
    )

  }
};