'use strict';
module.exports = {
  up: (migration, Sequelize) => {
    return migration.sequelize.query(`CREATE TABLE [dbo].[BlobStore] AS FILETABLE ON [PRIMARY] FILESTREAM_ON [BlobStoreFS]
                                      WITH
                                      (
                                      FILETABLE_DIRECTORY = N'BlobStoreFS', FILETABLE_COLLATE_FILENAME = Polish_CI_AS
                                      )
    `);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('BlobStore');
  }
};