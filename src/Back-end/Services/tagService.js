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
export default class TagService extends BaseService {
  /**
   * Creates an instance of UserService.
   * @param   {{ unitOfWorkDI: UnitOfWork}}
   */
  constructor({ unitOfWorkDI }) {
    super({ unitOfWorkDI, repository: "tagRepository" });
  }

  async insertUniq({ newTags }) {
    let inserted = await newTags.map(async item => {
      return await this.unitOfWorkDI.tagRepository.insertUniq({ tag: item.label, id: item.id })
    })
    let result = await Promise.all(inserted);
    console.log(result);
    return result;
  }

}
