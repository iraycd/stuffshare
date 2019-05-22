'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query(
        `
        ALTER VIEW dbo.V_Users AS
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
              ,blob_id
          FROM [dbo].[Users]
          WHERE is_authorized=1
  `
      )
  },
  down: (queryInterface, Sequelize) => {
    return Promise.resolve()
    
  }
};