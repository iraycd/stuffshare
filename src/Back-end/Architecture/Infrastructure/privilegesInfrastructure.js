"use strict";

import BaseInfrastracture from './../baseInfrastructure.js';
import Enums from './../../../Shared/BaseObjects/EnumsValues.js'
import ServerException from '../Exceptions/serverException.js';

export default class PrivilegesInfrastructure extends BaseInfrastracture {
    constructor() {
        super();
    };

    async executeLayer(action) {
        console.log(action.privileges)
        for (var i = 0; i < action.privileges.length; i++) {
            // do something

            let result = await action.privileges[i].bind(action)()
            if (!result) {
                throw (new ServerException()).throw({ code: 'PRIVILEGES_INVALID_ERROR', type: Enums.CODE.ERROR });
            }
        }

        return action;
    }

}
