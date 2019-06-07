"use strict";

import BaseQuery from '../../Architecture/baseQuery.js';
import CategoryDTO from '../../../Shared/DTO/Categories/CategoryDTO.js';
import CategoryService from '../../Services/categoryService.js';
import CategoryOptionService from '../../Services/categoryOptionService.js';




export default class GetCategoryOptionsTypeQuery extends BaseQuery {
  /**
     * Creates an instance of GetDictionariesQuery.
     * @param  {{ logFileInfrastructureDI:LogFileInfrastructure,categoryOptionServiceDI:CategoryOptionService }}
     * @memberof GetCategoryOptionsTypeQuery
     */
    constructor({ logFileInfrastructureDI, categoryOptionServiceDI }) {
        super({ logFileInfrastructureDI });
        this.categoryOptionServiceDI = categoryOptionServiceDI;
    };
    init(dto) {
        this.model = Object.assign(new CategoryDTO(), dto);
    }
  
    async action() {
        let result = await this.categoryOptionServiceDI.setContext(this.context).getType({  });
        //return this.list_to_tree(result)
        return result;
    }
};
