"use strict";

import BaseQuery from '../../Architecture/baseQuery.js';
import CategoryDTO from '../../../Shared/DTO/Categories/CategoryDTO.js';
import CategoryService from '../../Services/categoryService.js';


export default class GetCategoriesAllQuery extends BaseQuery {
  /**
     * Creates an instance of GetDictionariesQuery.
     * @param  {{ logFileInfrastructureDI:LogFileInfrastructure,categoryServiceDI:CategoryService }}
     * @memberof GetCategoryFreetextQuery
     */
    constructor({ logFileInfrastructureDI, categoryServiceDI }) {
        super({ logFileInfrastructureDI });
        this.categoryServiceDI = categoryServiceDI;
    };
    init(dto) {
        this.model = Object.assign(new CategoryDTO(), dto);
    }
  
    async action() {
        let result = await this.categoryServiceDI.setContext(this.context).getAllCategoriesFlat({ model: this.model });
        //return this.list_to_tree(result)
        return result;
    }
};
