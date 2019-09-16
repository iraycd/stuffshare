"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.sequelize
      .query(
        `  
        CREATE TABLE [dbo].[Tags](
          id char(36) PRIMARY KEY,
          tag nvarchar(150),
          [updated_at] [datetimeoffset](7) NULL,
          [created_at] [datetimeoffset](7) NULL
        ) ON [PRIMARY]
        
        CREATE TABLE [dbo].[ItemTags](
          id char(36) PRIMARY KEY,
          item_id char(36) NOT NULL,
          tag_id char(36) NOT NULL,
          [updated_at] [datetimeoffset](7) NULL,
          [created_at] [datetimeoffset](7) NULL
        ) ON [PRIMARY]

        `

      )

  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query(`

      DROP TABLE Tags 

      DROP TABLE ItemTags 

      
`)
  }
};
