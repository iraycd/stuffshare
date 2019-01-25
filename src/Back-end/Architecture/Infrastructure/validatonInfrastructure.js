"use strict";

import BaseInfrastracture from './../baseInfrastructure.js';
import Enums from './../../../Shared/BaseObjects/EnumsValues.js'
import ServerException from '../Exceptions/serverException.js';

export default class ValidatonInfrastructure extends BaseInfrastracture {
    constructor() {
        super();
        this.validationChain = [];
        this.invalidMessages = [];
    };
  
    addInvalid(invalidMessage) {
        this.invalidMessages.push(invalidMessage);
    }
    addArrayInvalid(...invalidMessage) {
        console.log('invalid', invalidMessage);
        invalidMessage.map(item => {
            this.invalidMessages.push(item);
        })
    }
    async executeLayer(action) {

        let arrayResults = action.validation.map(async (item) => {
            
            try {
                
                return await item.bind(action)()
            } catch (err) {
                console.log(err);
                this.addInvalid(err);
            }
        });
        await Promise.all(arrayResults)
        console.log('invalid message '+ this.invalidMessages.length)
        if ( this.invalidMessages.length > 0)
            throw (new ServerException()).throw({ code: 'VALIDATION_INVALID_ERROR', type: Enums.CODE.ERROR, validations: this.invalidMessages });

        console.log('Valid')
        return action;
    }
     addToValid(validateFunc) {
        return this.validationChain.push(validateFunc);
    }
}
