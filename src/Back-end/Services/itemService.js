import BaseService from "../Architecture/baseService.js";
import CategoryDTO from "./../../Shared/DTO/Categories/CategoryDTO.js";
import CategoryRepository from "./../Repository/categoryRepository.js";
import CategoryHierarchyDTO from "./../../Shared/DTO/Categories/CategoryHierarchyDTO.js";
import SearchItemDTO from './../../Shared/DTO/Item/SearchItemDTO';

/**
 *
 * @export
 * @class ItemService
 * @extends BaseService
 */
export default class ItemService extends BaseService {
  /**
   * Creates an instance of UserService.
   * @param   {{ unitOfWorkDI: UnitOfWork}}
   */
  constructor({ unitOfWorkDI }) {
    super({ unitOfWorkDI, repository: "itemRepository" });
  }

  /**
   *
   *
   * @param {{ id: Number }}
   * @returns
   * @memberof CategoryService
   */

  async insertTag({ item_id, tag_id }) {
    console.log(tag_id)
    await this.unitOfWorkDI.itemRepository.insertTag({
      
        item_id: item_id,
        tag_id: tag_id
      
    });
  }

  async upsertCategoryOption({ model, item_id }) {
    await this.unitOfWorkDI.itemCategoryOptionRepository.upsert({
      model: {
        id: model.id,
        value: model.val,
        co_id: model.element,
        co_temp_id: model.cat_opt_id,
        item_id: item_id,
        col_id: model.col_id
      }
    });
  }
  async deleteTags({ itemId }) {
    return await this.unitOfWorkDI.itemRepository.deleteTags({
      item_id: itemId,
    });
  }
  async getItem({ uids }) {
    let result = await this.toJsonParse(this.unitOfWorkDI.itemRepository.getItem({ uids }));
    return result.map(item => {
      let element = Object.assign({}, item)

      return element;
    })
  }

  async setAsSyncElastic({id})
  {
    return await this.repository.setAsSyncElastic({id})
  }
  /**
   *
   *
   * @param {{search: SearchItemDTO}}
   * @memberof ItemService
   */
  async searchItem({ search }) {
    //  search.prepareSearch = await this.unitOfWorkDI.textRepository.prepareSearch({ text: search.freetext, wildecard: 1 })
    //let result = this.unitOfWorkDI.itemRepository.search({ search });
    return await this.unitOfWorkDI.itemRepository.getAll()
    //  return await this.toJsonParse(this.unitOfWorkDI.itemRepository.getItem({ uids: result, transaction }))
  }
}
