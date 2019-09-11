"use strict";
module.exports = {
  up :(queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query(
        `  
        ALTER TABLE [dbo].[Items]  WITH CHECK ADD  CONSTRAINT [FK_Items_Categories] FOREIGN KEY([category_id])
        REFERENCES [dbo].[Categories] ([id])
        
        

        `

      )
  },
  down:(queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query(`
            
    
      
      ALTER TABLE [dbo].[Items] DROP CONSTRAINT [FK_Items_Categories]
      
              
        
    `);
  }
};
