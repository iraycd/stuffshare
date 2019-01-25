'use strict';
module.exports = {
  up: (migration, Sequelize) => {
    return migration.sequelize.query(`
    CREATE TRIGGER dbo.Blobs_DeleteTrigger
    ON dbo.Blobs
    FOR DELETE
    AS
    BEGIN
      DELETE FROM BlobMappers WHERE 
	  id IN ( select deleted.blob_id from deleted
				UNION
			SELECT deleted.blob_thumbmail_id from deleted)
    END;
    `);
  },
  down: (queryInterface, Sequelize) => {

    return queryInterface.sequelize.query(`DROP TRIGGER IF EXISTS Blobs_DeleteTrigger`);

  }
};