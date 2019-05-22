'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint('Users', 'FK_user_blob_id')

  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(`ALTER TABLE [dbo].[Users]  WITH CHECK ADD  CONSTRAINT [FK_user_blob_id] FOREIGN KEY([blob_id])
        REFERENCES [dbo].[Blobs] ([id])
        `)
  }
};