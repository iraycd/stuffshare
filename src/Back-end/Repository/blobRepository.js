import BaseRepository from "../Architecture/baseRepository.js";
import SequelizeDB from "../Database/models/index.js";
import fs from 'fs';
/**
 *
 * @export
 * @class BlobRepository
 * @extends BaseRepository
 */
export default class BlobRepository extends BaseRepository {
  /**
   *Creates an instance of CategoryRepository.
   * @param {{sequelizeDI:SequelizeDB}}
   * @memberof BlobRepository
   */
  constructor({ sequelizeDI }) {
    super(sequelizeDI.Blob);
    this.sequelizeDI = sequelizeDI;
  }

  getByGuids({ uids, transaction }) {
    return this.sequelizeDI.sequelize.query(
      `
        select blob,type,uid
        from openjson(
            (	SELECT blobs.* FROM (
                select TOP ${uids.length} file_stream as blob,file_type as type, BlobMappers.uid
                from BlobStore
                JOIN BlobMappers ON BlobMappers.stream_id = BlobStore.stream_id
                WHERE uid IN (:uids)
               ) as blobs
                for json auto
            )
        ) with(blob varchar(max),type varchar(10), uid varchar(100))
    `,
      {
        replacements: { uids: uids },
        transaction: this.getTran({ transaction }),
        type: this.sequelizeDI.sequelize.QueryTypes.SELECT
      }
    );

  }
  insertFile({ uid, path, name, transaction }) {
    var blob = fs.readFileSync(path);
    return this.sequelizeDI.sequelize.query(
      `SET NOCOUNT ON
        DECLARE @result TABLE 
        (
         stream_id nvarchar(50)
        )
        DECLARE @file varbinary(max);
        SET @file = (select blob
        from openjson(
            (	SELECT blobs.* FROM (
                select :blob as blob
               ) as blobs
                for json auto
            )
        ) with(blob varbinary(max)))

        INSERT INTO [BlobStore]([file_stream], [name]) 
        OUTPUT 
         CONVERT(nvarchar(50),inserted.stream_id)
         INTO @result
        Values (
          @file
         ,'${name}')
         
        INSERT INTO dbo.BlobMappers
         (uid, stream_id,created_at,updated_at)    
         SELECT '${uid}' , stream_id,GETDATE(),GETDATE()
         FROM @result;
         SET NOCOUNT OFF
        SELECT TOP 1 id,uid  FROM BlobMappers
        WHERE uid = '${uid}'
        SET NOCOUNT ON
        DELETE @result`,
      {

        replacements: { blob: blob },
        transaction: this.getTran({ transaction }),
        type: this.sequelizeDI.sequelize.QueryTypes.SELECT,

      }
    );

  }
  getBlobs({ userId, itemId, transaction }) {
    return this.entityDAO.findAll({
      where: {
        user_id: this.toStr(userId),
        item_id: this.toStr(itemId),
        status: (this.userId == userId ? [1, 0] : 1)
      },
      include: [
        {
          model: this.sequelizeDI.BlobMapper,
          as: "blob_item",
          required: true
        },
        {
          model: this.sequelizeDI.BlobMapper,
          as: "blob_thumbmail",
          required: true
        }
      ],
      transaction: this.getTran({ transaction })
    })
  }
}
