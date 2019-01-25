"use strict";
import BaseAction from "./baseAction.js";
import LogFileInfrastructure from "./Infrastructure/logFileInfrastructure.js";
import ServerException from "./Exceptions/serverException.js";
import DbTransactionInfrastucture from "./Infrastructure/dbTransactionInfrastucture.js";
import ValidatonInfrastructure from "./Infrastructure/validatonInfrastructure.js";
import PrivilegesInfrastructure from "./Infrastructure/privilegesInfrastructure.js";


export default class BaseCommand extends BaseAction {
  /**
   * Creates an instance of BaseCommand.
   * @param {{ logFileInfrastructureDI:LogFileInfrastructure, dbTransactionInfrastuctureDI : DbTransactionInfrastucture,validationInfrastructureDI:ValidatonInfrastructure,authInfrastructureDI:AuthInfrastucture, privilegesInfrastructureDI:PrivilegesInfrastructure}}
   * @memberof BaseCommand
   */
  constructor({
    logFileInfrastructureDI,
    authInfrastructureDI,
    dbTransactionInfrastuctureDI,
    validationInfrastructureDI,
    privilegesInfrastructureDI,
    dictionaryDI
  }) {
    super({ logFileInfrastructureDI, validationInfrastructureDI, authInfrastructureDI, privilegesInfrastructureDI,dictionaryDI});
    this.dbTransactionInfrastuctureDI = dbTransactionInfrastuctureDI;

  }
  get validation() { }
  
  infrastructureOrder() {
    let infrastructureArray = [
      this.logFileInfrastructureDI,
      this.authInfrastructureDI,
      this.validationInfrastructureDI,
      this.privilegesInfrastructureDI,
      this.dbTransactionInfrastuctureDI
    ];
    return infrastructureArray.reduce((prv, curr, prevIndex) => {
      if (curr == null || typeof curr == "undefined") {
        return prv;
      }
      prv.setNext(curr);
      return curr;
    });
  }
}
