'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query(
        `
        ALTER TABLE Users  ADD blob_id char(36) NULL
      `
      ).then(succ => {
        return queryInterface.sequelize.query(`ALTER TABLE [dbo].[Users]  WITH CHECK ADD  CONSTRAINT [FK_user_blob_id] FOREIGN KEY([blob_id])
        REFERENCES [dbo].[Blobs] ([id])
        `)
      }
      )
  },
  down: (queryInterface, Sequelize) => {

 
      return queryInterface.sequelize.query(
        `ALTER TABLE [dbo].[Users] DROP CONSTRAINT [FK_user_blob_id]
        `
    ).then(succ=>{
      return queryInterface.sequelize.query(
        `ALTER TABLE [dbo].[Users] DROP COLUMN blob_id
        `
    )
    })

  }
};