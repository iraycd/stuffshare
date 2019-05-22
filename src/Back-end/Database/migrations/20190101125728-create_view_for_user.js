'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query(
        `
        CREATE VIEW dbo.V_Users AS
        SELECT [id]
              ,[name]
              ,[surname]
              ,[email]
              ,[phone]
              ,[birthDate]
              ,[longitude]
              ,[latitude]
              ,[created_at]
              ,[updated_at]
              ,[relogin_require]
              ,[language]
          FROM [dbo].[Users]
          WHERE is_authorized=1
  `
      )
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(
      `
        DROP VIEW dbo.V_Users
      
  `
    )
  }
};