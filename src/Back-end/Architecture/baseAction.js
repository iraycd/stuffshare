import LogFileInfrastructure from "./Infrastructure/logFileInfrastructure.js";
import ServerException from "./Exceptions/serverException.js";
import ValidatonInfrastructure from "./Infrastructure/validatonInfrastructure.js";
import AuthInfrastucture from "./Infrastructure/authInfrastucture.js";
import PrivilegesInfrastructure from "./Infrastructure/privilegesInfrastructure.js";

("use strict");

export default class BaseAction {
  /**
   * Creates an instance of BaseAction.
   * @param  {{ logFileInfrastructureDI:LogFileInfrastructure ,validationInfrastructureDI:ValidatonInfrastructure,authInfrastructureDI:AuthInfrastucture,privilegesInfrastructure:PrivilegesInfrastructure}}
   * @memberof BaseAction
   */
  constructor({
    logFileInfrastructureDI,
    validationInfrastructureDI,
    authInfrastructureDI,
    privilegesInfrastructureDI,
    dictionaryDI
  }) {
    this.model = {};
    this.dictionaryDI=dictionaryDI
    this.context = {
      language: '',
      user: {
        id: undefined,
        uid: undefined
      }
    };
    this.token = '';
    this.logFileInfrastructureDI = logFileInfrastructureDI;
    this.validationInfrastructureDI = validationInfrastructureDI;
    this.privilegesInfrastructureDI = privilegesInfrastructureDI;
    this.authInfrastructureDI = authInfrastructureDI;
  }
  init(dto) {
    this.model = dto;
  }
  async action() {
    throw (new ServerException()).throw({ code: "VIRTUAL" });
  }
  async checkDTO(model) {
    let validationResult = await model.validation(this.model);
    if (validationResult.length > 0) {
      this.validationInfrastructureDI.addArrayInvalid(...validationResult);
    }
  }

  infrastructureOrder() {
    throw new ServerException().throw({ code: "VIRTUAL" });
  }

  get privileges() { return [() => { return false; }] }

  async run() {
    this.infrastructureOrder();
    return await this.logFileInfrastructureDI.runChain(this);
  }
}
