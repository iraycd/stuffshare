'use strict';
module.exports = {
  up: (migration, Sequelize) => {
    return migration.sequelize.query(`
      CREATE TRIGGER dbo.BlobMapper_DeleteTrigger
      ON dbo.BlobMappers
      FOR DELETE
      AS
      BEGIN
        DELETE FROM BlobStore WHERE 
      stream_id IN ( select deleted.stream_id from deleted)
      END;
    `);
  },
  down: (queryInterface, Sequelize) => {

    return queryInterface.sequelize.query(`DROP TRIGGER IF EXISTS BlobMapper_DeleteTrigger`);

  }
};