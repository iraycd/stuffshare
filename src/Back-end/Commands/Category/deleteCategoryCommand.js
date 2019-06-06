// @ts-nocheck
import BaseCommand from "../../Architecture/baseCommand.js";
import CategoryDTO from "../../../Shared/DTO/Categories/CategoryDTO.js";
import LogFileInfrastructure from "../../Architecture/Infrastructure/logFileInfrastructure.js";
import CategoryService from "../../Services/categoryService.js";
import DbTransactionInfrastucture from "../../Architecture/Infrastructure/dbTransactionInfrastucture.js";
import AuthInfrastucture from "../../Architecture/Infrastructure/authInfrastucture.js";

"use strict";



/**
 * 
 * @export
 * @class DeleteCategoryCommand 
 * @extends BaseCommand
 */
export default class DeleteCategoryCommand extends BaseCommand {
    /**
     * Creates an instance of InsertCategoryCommand.
     * @param  {{logFileInfrastructureDI : LogFileInfrastructure,  categoryServiceDI:CategoryService ,dbTransactionInfrastuctureDI:DbTransactionInfrastucture,authInfrastructureDI:AuthInfrastucture}}
     * @memberof InsertCategoryCommand
     */
    constructor({ logFileInfrastructureDI, categoryServiceDI, dbTransactionInfrastuctureDI, authInfrastructureDI }) {
        super({ logFileInfrastructureDI, dbTransactionInfrastuctureDI, authInfrastructureDI });
        this.categoryServiceDI = categoryServiceDI

    };
    init(dto) {
        this.model = Object.assign(new CategoryDTO(), dto);
    }
    async action() {
       await this.categoryServiceDI.setContext(this.context).removeCategory({ id:this.model.id });

    }
};
