"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query(
        `
      ALTER TABLE [dbo].[CategoryHierarchies] DROP CONSTRAINT [FK_cat_hierarchy]
      

      ALTER TABLE [dbo].[CategoryHierarchies]  WITH CHECK ADD  CONSTRAINT [FK_cat_hierarchy] FOREIGN KEY([category_child_id])
      REFERENCES [dbo].[Categories] ([id])
      

    `

      )
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query(`
            
    ALTER TABLE [dbo].[CategoryHierarchies] DROP CONSTRAINT [FK_cat_hierarchy]
      

      ALTER TABLE [dbo].[CategoryHierarchies]  WITH CHECK ADD  CONSTRAINT [FK_cat_hierarchy] FOREIGN KEY([category_child_id])
      REFERENCES [dbo].[Categories] ([id])
        
      
        
    `);
  }
};
