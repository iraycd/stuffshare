import SequelizeDB from "../Database/models/index.js";

"use strict";


/**
 * 
 * @export
 * @class BaseUnitOfWork
 */
export default class BaseUnitOfWork {
    constructor() {
        this.sequelize = SequelizeDB;
        this.repositories = {};
    }
    setContext({ context }) {
        Object.keys(this.repositories).map(item => {
            this.repositories[String(item)].setContext({context});
        })
    }
    async setTransaction({ transaction }) {
        this.transaction = transaction;
        Object.keys(this.repositories).map(item => {
            this.repositories[String(item)].setTransaction({ transaction: transaction });
        })

    }
    async startTransaction() {
        let transaction = await this.sequelize.sequelize.transaction();

        return transaction;
    };
    async commit({ transaction }) {
        return await transaction.commit();
    }
    async rollback({ transaction }) {

        return await transaction.rollback();
    }

};

