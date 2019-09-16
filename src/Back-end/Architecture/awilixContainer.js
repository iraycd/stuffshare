"use strict";
import  awilix from 'awilix';
import LogFileInfrastructure from './Infrastructure/logFileInfrastructure.js';
import ValidatonInfrastructure from './Infrastructure/validatonInfrastructure.js';
import BaseAction from './baseAction.js' 
import BaseCommand from './baseCommand.js'
import BaseQuery from './baseQuery.js'
import Logger from './logConfig.js'
import DbTransactionInfrastucture from './Infrastructure/dbTransactionInfrastucture.js';
import AuthInfrastucture from './Infrastructure/authInfrastucture.js';
import MailSender from './mailSender.js';
import PrivilegesInfrastructure from './Infrastructure/privilegesInfrastructure.js';
import CodeDictionary from './Dictionary/codeDictionary.js';
import ClosingInfrastructure from './Infrastructure/closingInfrastructure.js';


const { createContainer, asValue, asClass } = awilix;
let ContainerAwlix = createContainer();

let containerDI = {
    logFileInfrastructureDI: asClass(LogFileInfrastructure),
    validationInfrastructureDI: asClass(ValidatonInfrastructure),
    authInfrastructureDI : asClass(AuthInfrastucture),
    dbTransactionInfrastuctureDI:asClass(DbTransactionInfrastucture),
    closingInfrastructureDI:asClass(ClosingInfrastructure),
    //ACTIONS list 
    baseAction: asClass(BaseAction),
    baseCommand: asClass(BaseCommand),
    baseQuery: asClass(BaseQuery),
    loggerDI:asValue(Logger),
    mailSenderDI:asClass(MailSender),
    dictionaryDI:asClass(CodeDictionary),
    privilegesInfrastructureDI:asClass(PrivilegesInfrastructure)
    
}


ContainerAwlix.register(containerDI);

export default ContainerAwlix