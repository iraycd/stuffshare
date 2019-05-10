import ServerException from "./Exceptions/serverException";
import { inspect } from 'util' // or directly

"use strict";

export default class BaseInfrastracture {
    constructor() {

        this.nextElement = null;
    };
    getNext() {
        return this.nextElement;
    };
    setNext(nextElement) {
        if (nextElement instanceof BaseInfrastracture) {
            this.nextElement = nextElement;
        } else {
            throw new ServerException().throw({ code: 'THIS_IS_NOT_INFRASTRACTURE' });
        }
    };
    async executeLayer(dtoObject) {
        throw new ServerException().throw({ code: 'VIRTUAL' });
    };
    //Write test for checking order of running functions
    async runChain(action) {
        let result = action;
        try {
            result = await this.executeLayer(result);

            if (this.nextElement == null) {
                result = await result.action.bind(action)();
            } else {
                result = await this.nextElement.runChain(result);
            }
            await this.successLayer(result);
        } catch (err) {
            //     console.log(err);  

            await this.errorHandling(err, result);
            throw err;
        } finally {

            await this.dispose();
        }
        return result;

    }

    async successLayer(dtoObject) {
        return this;
    }
    dispose() {
        delete this;
    }
    async errorHandling(err, dtoObject) {

    };

};


