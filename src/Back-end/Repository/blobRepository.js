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

  getByGuids({ ids, transaction }) {
    console.log('getByGuids')
    return this.sequelizeDI.sequelize.query(
      `
        select blob,type,id
        from openjson(
            (	SELECT blobs.* FROM (
                select TOP ${ids.length} file_stream as blob,file_type as type, BlobMappers.id
                from BlobStore
                JOIN BlobMappers ON BlobMappers.stream_id = BlobStore.stream_id
                WHERE id IN (:ids)
               ) as blobs
                for json auto
            )
        ) with(blob varchar(max),type varchar(10), id varchar(100))
    `,
      {
        replacements: { ids: ids },
        transaction: this.getTran({ transaction }),
        type: this.sequelizeDI.sequelize.QueryTypes.SELECT
      }
    );

  }
  insertFile({ id, path, name, transaction }) {
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
         (id, stream_id,created_at,updated_at)    
         SELECT '${id}' , stream_id,GETDATE(),GETDATE()
         FROM @result;   
        DELETE @result   
        SET NOCOUNT OFF
        SELECT TOP 1 id,id  FROM BlobMappers
        WHERE id = '${id}'
        SET NOCOUNT ON`,
      {
        logging: false,
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

  getUnverified({
    pagination,
    transaction
  }) {
    return this.entityDAO.findAll({
      where: {
        status: 0
      },
      limit: Number(pagination.size), offset: Number(pagination.page),
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
  
  verifyImage({
    blob, transaction
  }) {
    return this.entityDAO.update(
      {
        status: 1
      },
      {
        where: { id: this.toStr(blob.id) },
        transaction: this.getTran({ transaction })
      }
    );
  }
}
