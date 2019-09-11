"use strict";
module.exports = {
  up :(queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query(
        `  
        CREATE TABLE [dbo].[ItemCategoryOptions](
          id char(36) PRIMARY KEY,
          item_id char(36) NOT NULL,
          co_id char(36) NOT NULL,
          category_id char(36) NOT NULL,
          co_temp_id  char(36) NOT NULL,
          value nvarchar(1000) NOT NULL,
          [updated_at] [datetimeoffset](7) NULL,
          [created_at] [datetimeoffset](7) NULL
        ) ON [PRIMARY]
        
        
        
        

        `

      )
  },
  down:(queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query(`
            
      DROP TABLE ItemCategoryOptions
        
        
    `);
  }
};
