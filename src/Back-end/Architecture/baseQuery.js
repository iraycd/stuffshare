"use strict";
import BaseAction from "./baseAction.js";

export default class BaseQuery extends BaseAction {
  // we can set other DbInfrastracture as more extend  CQRS pattern
  constructor({ logFileInfrastructureDI, validationInfrastructureDI, authInfrastructureDI, privilegesInfrastructureDI }) {
    super({ logFileInfrastructureDI, validationInfrastructureDI, authInfrastructureDI, privilegesInfrastructureDI });
  }

  infrastructureOrder() {
    let infrastructureArray = [
      this.logFileInfrastructureDI,
      this.authInfrastructureDI,
      this.privilegesInfrastructureDI
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
