"use strict";
module.exports = {
  up :(queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query(
        `  
        CREATE TABLE [dbo].[CategoryOptionsLinks](
          id char(36) PRIMARY KEY,
          [category_id] [char](36) NOT NULL,
          [co_id] [char](36) NOT NULL,
          [updated_at] [datetimeoffset](7) NULL,
          [created_at] [datetimeoffset](7) NULL
        ) ON [PRIMARY]
        
        
        ALTER TABLE [dbo].[CategoryOptionsLinks]  WITH CHECK ADD  CONSTRAINT [FK_CategoryOptionsLink_Categories] FOREIGN KEY([category_id])
        REFERENCES [dbo].[Categories] ([id])
        
        
        ALTER TABLE [dbo].[CategoryOptionsLinks] CHECK CONSTRAINT [FK_CategoryOptionsLink_Categories]
        
        
        ALTER TABLE [dbo].[CategoryOptionsLinks]  WITH CHECK ADD  CONSTRAINT [FK_CategoryOptionsLink_CategoryOptions] FOREIGN KEY([co_id])
        REFERENCES [dbo].[CategoryOptions] ([id])
        
        
        ALTER TABLE [dbo].[CategoryOptionsLinks] CHECK CONSTRAINT [FK_CategoryOptionsLink_CategoryOptions]
        
        
        CREATE UNIQUE NONCLUSTERED INDEX [IX_CategoryOptionsLink] ON [dbo].[CategoryOptionsLinks]
        (
          [co_id] ASC,
          [category_id] ASC
        )WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
        
        

        `

      )
  },
  down:(queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query(`
            
      DROP TABLE CategoryOptionsLinks
        
        
    `);
  }
};
