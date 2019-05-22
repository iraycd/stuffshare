'use strict';
module.exports = {
  up: (migration, Sequelize) => {
    return migration.sequelize.query(`
    CREATE TABLE [dbo].[BlobMappers](
      [id] [char](36) NOT NULL,
      [stream_id] [uniqueidentifier] NOT NULL,
      [created_at] [datetimeoffset](7) NOT NULL,
      [updated_at] [datetimeoffset](7) NOT NULL,
     CONSTRAINT [PK_BlobMappers] PRIMARY KEY CLUSTERED 
    (
      [id] ASC
    )WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
    ) ON [PRIMARY]
   
    
    ALTER TABLE [dbo].[BlobMappers]  WITH CHECK ADD  CONSTRAINT [FK_BlobMapper_BlobStore] FOREIGN KEY([stream_id])
    REFERENCES [dbo].[BlobStore] ([stream_id])
    ON DELETE CASCADE
   
    ALTER TABLE [dbo].[BlobMappers] CHECK CONSTRAINT [FK_BlobMapper_BlobStore]

    `);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint('BlobMappers','FK_BlobMapper_BlobStore').then(item=>{
      return queryInterface.dropTable('BlobMappers');
      
    })
  }
};