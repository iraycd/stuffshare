"use strict";

import BaseInfrastracture from './../baseInfrastructure.js';
import BaseUnitOfWork from '../baseUnitOfWork.js';


export default class DbTransactionInfrastucture extends BaseInfrastracture {
/**
 * Creates an instance of DbTransactionInfrastucture.
 * @param   {{ unitOfWorkDI:BaseUnitOfWork }} 
 * @memberof DbTransactionInfrastucture
 */
constructor({ unitOfWorkDI }) {
        super();
        this.unitOfWorkDI = unitOfWorkDI;
        this.transaction = null;

    };
    async successLayer(dtoObject) {
        return await this.unitOfWorkDI.commit({ transaction: this.transaction });
    }
    async executeLayer(action) {
        console.log("DB transaction")
        
        this.transaction = await this.unitOfWorkDI.startTransaction();
        await this.unitOfWorkDI.setTransaction({ transaction: this.transaction });
        return await action;

    }
    async errorHandling(err, action) {

        return await this.unitOfWorkDI.rollback({ transaction: this.transaction });

    }

}