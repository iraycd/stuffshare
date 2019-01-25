import BaseRepository from "../Architecture/baseRepository.js";
import SequelizeDB from "../Database/models/index.js";

/**
 *
 * @export
 * @class BlobRepository
 * @extends TextRepository
 */
export default class TextRepository extends BaseRepository {
  /**
   *Creates an instance of CategoryRepository.
   * @param {{sequelizeDI:SequelizeDB}}
   * @memberof BlobMapperRepository
   */
  constructor({ sequelizeDI }) {
    super(sequelizeDI.BlobMapper);
    this.sequelizeDI = sequelizeDI;
  }

  prepareSearch({ text, wildecard = 0, transaction }) {
    return this.sequelizeDI.sequelize.query(
      `
      SELECT TOP 1 dbo.prepareSearch(:text,:wildecard) as freetext
      `,
      {
        replacements: {
          text: text,
          wildecard: wildecard
        },
        transaction: this.getTran({ transaction }),
        type: this.sequelizeDI.sequelize.QueryTypes.SELECT
      }
    );
  }

}
