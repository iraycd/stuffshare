"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.sequelize
      .query(
        `  
        ALTER TABLE [dbo].[Tags] ADD  CONSTRAINT [IX_Tags] UNIQUE NONCLUSTERED 
        (
          [tag] ASC
        )WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
        
        
        `

      )

  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query(`

      ALTER TABLE [dbo].[Tags] DROP CONSTRAINT [IX_Tags]

      
`)
  }
};
