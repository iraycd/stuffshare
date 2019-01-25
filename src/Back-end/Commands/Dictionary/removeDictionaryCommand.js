import BaseCommand from "../../Architecture/baseCommand.js";
import DictionaryDTO from "../../../Shared/DTO/Dictionary/DictionaryDTO.js";

("use strict");



export default class RemoveDictionaryCommand extends BaseCommand {
  constructor({
    logFileInfrastructureDI,
    validationInfrastructureDI,
    authInfrastructureDI
  }) {
    super({
      logFileInfrastructureDI,
      validationInfrastructureDI,
      authInfrastructureDI
    });

  }
  init(dto) {
    this.model = Object.assign(new DictionaryDTO(), dto);
  }
  get validation() {
    return [()=>{return checkDTO.bind(this)()}];
  }


  async action() {
    //   throw this.serverExceptionDI.throw({ code: 'CANNOT_REMOVE', type: Enums.CODE.ERROR_GLOBAL });
    this.dictionaryDI.remove(this.model.code, this.model.type);
  }
}
