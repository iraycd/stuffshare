import BaseService from "../Architecture/baseService.js";
import CategoryDTO from "./../../Shared/DTO/Categories/CategoryDTO.js";
import CategoryRepository from "./../Repository/categoryRepository.js";
import CategoryHierarchyDTO from "./../../Shared/DTO/Categories/CategoryHierarchyDTO.js";

/**
 *
 * @export
 * @class CategoryService
 * @extends BaseService
 */
export default class CategoryService extends BaseService {
  /**
   * Creates an instance of UserService.
   * @param   {{ unitOfWorkDI: UnitOfWork, categoryRepositoryDI:CategoryRepository}}
   */
  constructor({ unitOfWorkDI, categoryRepositoryDI }) {
    super({ unitOfWorkDI, repository: "categoryRepository" });
  }

  /**
   *
   *
   * @param {{ id: Number }}
   * @returns
   * @memberof CategoryService
   */
  async getCategoryTree({ id }) {
    return await this.toJsonParse(
      this.unitOfWorkDI.categoryRepository.getCategoryTree({ id })
    );
  }

  //CHECK privileges , status , if user have access to this category
  /**
   *
   *
   * @param {{model:CategoryDTO}}
   * @memberof CategoryService
   */
  async newCategory({ model }) {
    model.status = 0;
    let result = await this.toJsonParse(
      this.unitOfWorkDI.categoryRepository.insert({ model })
    );
    let obj = new CategoryHierarchyDTO();
    if (model.CategoryHierarchy && model.CategoryHierarchy.category_parent_id) {
      obj.category_parent_id = model.CategoryHierarchy.category_parent_id;
      obj.category_child_id = result.id;
      await this.unitOfWorkDI.categoryHierarchyRepository.insert({
        model: obj
      });
    }
    return result;
  }

  async removeCategory({ id }) {
    await this.unitOfWorkDI.categoryRepository.removeCategory({ id });
  }

  async setAsVerified({id}){
    await this.unitOfWorkDI.categoryRepository.setAsVerified({ id });
  }

  ///move to guids
}
