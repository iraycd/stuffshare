"use strict";

import BaseQuery from '../../Architecture/baseQuery.js';
import CategoryDTO from '../../../Shared/DTO/Categories/CategoryDTO.js';
import CategoryService from '../../Services/categoryService.js';
import CategoryOptionService from '../../Services/categoryOptionService.js';
import CategoryOptionsDTO from '../../../Shared/DTO/CategoryOptions/CategoryOptionsDTO.js';




export default class GetAllCategoriesOptionQuery extends BaseQuery {
  /**
     * Creates an instance of GetDictionariesQuery.
     * @param  {{ logFileInfrastructureDI:LogFileInfrastructure,categoryOptionServiceDI:CategoryOptionService,categoryServiceDI:CategoryService }}
     * @memberof GetCategoryOptionsTypeQuery
     */
    constructor({ logFileInfrastructureDI, categoryOptionServiceDI,categoryServiceDI }) {
        super({ logFileInfrastructureDI });
        this.categoryOptionServiceDI = categoryOptionServiceDI;
    };
    init(dto) {
        this.model =  dto;
    }
  
    async action() {
      //  let categories = await this.categoryServiceDI.setContext(this.context).getCategoriesParents({ ids: this.model.id })
       // console.log(categories)
       //let ids = categories.map(item=>{return item.id});
        let result = await this.categoryOptionServiceDI.setContext(this.context).getAllCategoriesOption({id:this.model.id});
        //return this.list_to_tree(result)
        return result;
    }
};
