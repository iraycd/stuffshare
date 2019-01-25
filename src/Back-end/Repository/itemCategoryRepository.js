import BaseRepository from "../Architecture/baseRepository.js";
import SequelizeDB from "../Database/models/index.js";

/**
 *
 * @export
 * @class BlobRepository
 * @extends ItemRepository
 */
export default class ItemCategoryRepository extends BaseRepository {
  /**
   *Creates an instance of CategoryRepository.
   * @param {{sequelizeDI:SequelizeDB}}
   * @memberof ItemCategoryRepository
   */
  constructor({ sequelizeDI }) {
    super(sequelizeDI.ItemCategory);
    this.sequelizeDI = sequelizeDI;
  }
  deleteCategories({ item_id, category_id,transaction }) {
    return this.entityDAO.destroy({
      where: {
        item_id: this.toStr(item_id),
        category_id: this.toStr(category_id)
      },
      transaction: this.getTran({ transaction })
    });
  }
}
