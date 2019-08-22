// @ts-nocheck
import BaseCommand from "../../Architecture/baseCommand.js";
import LogFileInfrastructure from "../../Architecture/Infrastructure/logFileInfrastructure.js";
import CategoryService from "../../Services/categoryService.js";
import DbTransactionInfrastucture from "../../Architecture/Infrastructure/dbTransactionInfrastucture.js";
import AuthInfrastucture from "../../Architecture/Infrastructure/authInfrastucture.js";
import CategoryOptionService from "../../Services/categoryOptionService.js";
import CategoryOptionsLinkDTO from './../../../Shared/DTO/CategoryOptions/CategoryOptionsLinkDTO.js'
"use strict";



/**
 * 
 * @export
 * @class DeleteCategoryCommand 
 * @extends BaseCommand
 */
export default class UpsertCategoryOptionsLinkCommand extends BaseCommand {
    /**
     * Creates an instance of InsertCategoryCommand.
     * @param  {{logFileInfrastructureDI : LogFileInfrastructure,  categoryOptionServiceDI:CategoryOptionService ,authInfrastructureDI:AuthInfrastucture}}
     * @memberof InsertCategoryCommand
     */
    constructor({ logFileInfrastructureDI, categoryOptionServiceDI, authInfrastructureDI }) {
        super({ logFileInfrastructureDI, authInfrastructureDI });
        this.categoryOptionServiceDI = categoryOptionServiceDI

    };
    init(dto) {
        this.model = Object.assign(new CategoryOptionsLinkDTO(), dto);
    }
    async action() {
        console.log(this.model);
        await this.categoryOptionServiceDI.setContext(this.context).upsertToCategory({ model: this.model });

    }
};
