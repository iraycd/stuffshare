"use strict";
module.exports = {
  up :(queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query(
        `  
        ALTER TABLE dbo.Blobs ADD  blob_min_id char(36)

        ALTER TABLE [dbo].[Blobs]  WITH CHECK ADD  CONSTRAINT [FK_blob_min_migrate] FOREIGN KEY([blob_min_id])
        REFERENCES [dbo].[BlobMappers] ([id])




        

        `

      )
  },
  down:(queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query(`
            
    
      
      ALTER TABLE [dbo].[Blobs] DROP CONSTRAINT [FK_blob_min_migrate]
      
      ALTER TABLE dbo.Blobs DROP COLUMN blob_min_id

      
              
        
    `);
  }
};
