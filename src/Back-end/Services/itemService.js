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

  async insertCategories({ itemId, categoryId }) {
    await this.unitOfWorkDI.itemCategoryRepository.insert({
      model: {
        item_id: itemId,
        category_id: categoryId
      }
    });
  }

  async deleteCategories({ itemId, categoryId }) {
    return await this.unitOfWorkDI.itemCategoryRepository.deleteCategories({
      item_id: itemId,
      category_id: categoryId
    });
  }
  async getItem({ uids }) {
    let result = await this.toJsonParse(this.unitOfWorkDI.itemRepository.getItem({ uids }));
    return result.map(item => {
      let element = Object.assign({}, item)
      element.categories = {
        old: item.categories
      }
      element.blobs = {
        old: item.blobs
      }
      return element;
    })
  }

  /**
   *
   *
   * @param {{search: SearchItemDTO}}
   * @memberof ItemService
   */
  async searchItem({ search }) {
  //  search.prepareSearch = await this.unitOfWorkDI.textRepository.prepareSearch({ text: search.freetext, wildecard: 1 })
    let result = this.unitOfWorkDI.itemRepository.search({ search });
    return result;
    //  return await this.toJsonParse(this.unitOfWorkDI.itemRepository.getItem({ uids: result, transaction }))
  }
}
