"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize
    .query(
      `

      ALTER TRIGGER Blobs_DeleteTrigger
      ON Blobs
      FOR DELETE
      AS
      UPDATE 
      Users 
     SET blob_id=NULL
     WHERE blob_id IN (SELECT deleted.id from deleted  )
     ;

  DELETE FROM BlobMappers WHERE 
  id IN ( select deleted.blob_id from deleted
    UNION
  SELECT deleted.blob_thumbmail_id from deleted)

    `

    )
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize
    .query(` ALTER TRIGGER Blobs_DeleteTrigger
    ON Blobs
    FOR DELETE
    AS
   
    DELETE FROM BlobMappers WHERE 
    id IN ( select deleted.blob_id from deleted
      UNION
    SELECT deleted.blob_thumbmail_id from deleted)
    `);
  }
};
