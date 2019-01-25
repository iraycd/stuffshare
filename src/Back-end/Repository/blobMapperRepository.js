import BaseRepository from "../Architecture/baseRepository.js";
import SequelizeDB from "../Database/models/index.js";

/**
 *
 * @export
 * @class BlobRepository
 * @extends BlobMapperRepository
 */
export default class BlobMapperRepository extends BaseRepository {
  /**
   *Creates an instance of CategoryRepository.
   * @param {{sequelizeDI:SequelizeDB}}
   * @memberof BlobMapperRepository
   */
  constructor({ sequelizeDI }) {
    super(sequelizeDI.BlobMapper);
    this.sequelizeDI = sequelizeDI;
  }

}
