"use strict";

import BaseQuery from '../../Architecture/baseQuery.js';
import CategoryDTO from '../../../Shared/DTO/Categories/CategoryDTO.js';


export default class GetCategoryTreeQuery extends BaseQuery {

    constructor({ logFileInfrastructureDI, categoryServiceDI }) {
        super({ logFileInfrastructureDI });

        this.categoryServiceDI = categoryServiceDI;
    };
    init(dto) {
        this.model = Object.assign(new CategoryDTO(), dto);
    }
    async action() {
        return await this.categoryServiceDI.getCategoryTree({ id: this.model.id,parent:this.model.parent })

    }
};
