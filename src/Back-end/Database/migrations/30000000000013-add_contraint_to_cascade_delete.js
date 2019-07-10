"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query(
        `  
        
ALTER TABLE [dbo].[CategoryOptionsTemplates] DROP CONSTRAINT [FK_co_id_cot_id]

ALTER TABLE [dbo].[CategoryOptionsTemplates]  WITH CHECK ADD  CONSTRAINT [FK_co_id_cot_id] FOREIGN KEY([co_id])
REFERENCES [dbo].[CategoryOptions] ([id])
ON DELETE CASCADE
    `

      )
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query(`
            
 
     
ALTER TABLE [dbo].[CategoryOptionsTemplates] DROP CONSTRAINT [FK_co_id_cot_id]


ALTER TABLE [dbo].[CategoryOptionsTemplates]  WITH CHECK ADD  CONSTRAINT [FK_co_id_cot_id] FOREIGN KEY([co_id])
REFERENCES [dbo].[CategoryOptions] ([id])
        
      
        
      
        
    `);
  }
};
