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
  async getCategoryTree({ id ,parent}) {
    return await this.toJsonParse(
      this.unitOfWorkDI.categoryRepository.getCategoryTree({ ids: [id],parent:parent })
    );
  }

  /**
   *
   *
   * @param {{search,isFor}}
   * @memberof CategoryService
   */
  async getCategoryFreetext({ search, isFor }) {
    let result = await this.unitOfWorkDI.categoryRepository.getCategoryFreetext({ search, isFor })

    return result;
  }

  async getAllCategoriesFlat({ model}) {
    let result = await this.unitOfWorkDI.categoryRepository.getAllCategoriesFlat({model})

    return result;
  }
  /**
  *
  *
  * @param {{model:CategoryDTO}}
  * @memberof CategoryService
  */
  async getCategoryFreetextCategory({ model }) {
    let result = await this.getCategoryFreetext({ search: model.category });
    console.log(result);
    if (result.length > 0) {
      let ids = result.map(item => { return item.KEY });
      console.log(ids);
      return await this.unitOfWorkDI.categoryRepository.getCategoryTree({ ids: ids })

    } else {
      return []
    }

  }
  //CHECK privileges , status , if user have access to this category
  /**
   *
   *
   * @param {{model:CategoryDTO}}
   * @memberof CategoryService
   */
  async newCategory({ model }) {
   // if (!this.context.user.is_admin) {
   //   model.status = 0;
    //}
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
    let related = await this.unitOfWorkDI.categoryRepository.getCategoryRelated({ id: id });

    let idList = related.map(item => {
      return item.id;
    })
    return await this.unitOfWorkDI.categoryRepository.removeCategory({ id: idList });

  }
  async getCategoriesParents({ ids }) {
    return await  this.unitOfWorkDI.categoryRepository.getCategoriesParents({ ids: ids })
    

  }
  async setAsVerified({ id, status }) {
    let related = await this.unitOfWorkDI.categoryRepository.getCategoryRelated({ id: id });
    let promises = related.map(item => {
      return this.unitOfWorkDI.categoryRepository.setAsVerified({ id: item.id, status });
    })
    return await Promise.all(promises);
  }
  async setParent({ id, status, idParent }) {
    let parent = {
      status: status
    }
    if (idParent != null) {
      parent = await this.getById({ id: idParent });
    }
    await this.setAsVerified({ id: id, status: parent.status }),

      await Promise.all([
        this.unitOfWorkDI.categoryHierarchyRepository.removeParent({ id }),
        this.unitOfWorkDI.categoryHierarchyRepository.insert({ model: { category_child_id: id, category_parent_id: idParent } })

      ]);


  }

  ///move to guids
}
