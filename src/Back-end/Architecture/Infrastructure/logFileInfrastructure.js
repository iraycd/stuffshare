"use strict";

import BaseInfrastracture from './../baseInfrastructure.js';
import Logger from './../logConfig.js';

export default class LogFileInfrastructure extends BaseInfrastracture {
    constructor() {
        super();
       
    };
    async executeLayer(action) {
    
        console.log(`#########################${String(action.constructor).split('extends')[0].replace('class','')}###############################################################`)
        Logger.info(action.model);
         return await action;
    }
    async successLayer(dtoObject) {
        console.log('####################################################################################################################')
      
        return this;
    }
    async errorHandling(err, action) {
        err.dictionaryID=undefined;
       
        //Checking type of exception...
        Logger.error(err);
        err.error.error=undefined;
    }

}