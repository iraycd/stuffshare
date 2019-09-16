import BaseRepository from "../Architecture/baseRepository.js";
import SequelizeDB from "../Database/models/index.js";
import SearchItemDTO from './../../Shared/DTO/Item/SearchItemDTO.js';
/**
 *
 * @export
 * @class BlobRepository
 * @extends TagRepository
 */
export default class TagRepository extends BaseRepository {
  /**
   *Creates an instance of CategoryRepository.
   * @param {{sequelizeDI:SequelizeDB}}
   * @memberof TagRepository
   */
  constructor({ sequelizeDI }) {
    super(sequelizeDI.Tag);
    this.sequelizeDI = sequelizeDI;
  }



  async insertUniq({ tag, id, transaction }) {

    let item = await this.entityDAO.findOne(
      { where: { tag: this.toStr(tag.trim()) } },
      { transaction: this.getTran({ transaction }) }
    );
    if (item != null) {
      return item.dataValues.id
    }

    this.insert({ model: { id: id, tag: tag }, tranaction: transaction })
    return id;

  }
}



