import BaseRepository from "../Architecture/baseRepository.js";
import SequelizeDB from "../Database/models/index.js";
import SearchItemDTO from './../../Shared/DTO/Item/SearchItemDTO.js';
/**
 *
 * @export
 * @class BlobRepository
 * @extends ItemCategoryOptionRepository
 */
export default class ItemCategoryOptionRepository extends BaseRepository {
  /**
   *Creates an instance of CategoryRepository.
   * @param {{sequelizeDI:SequelizeDB}}
   * @memberof ItemCategoryOptionRepository
   */
  constructor({ sequelizeDI }) {
    super(sequelizeDI.ItemCategoryOption);
    this.sequelizeDI = sequelizeDI;
  }

}
