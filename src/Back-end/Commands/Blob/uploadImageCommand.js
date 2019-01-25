"use strict";
import BaseCommand from "./../../Architecture/baseCommand.js";
import LogFileInfrastructure from "../../Architecture/Infrastructure/logFileInfrastructure.js";
import UserService from "../../Services/userService.js";
import BaseDTO from "../../../Shared/BaseObjects/baseDTO.js";
import AuthInfrastucture from "../../Architecture/Infrastructure/authInfrastucture.js";
import BlobBase64DTO from "../../../Shared/DTO/Blob/BlobBase64DTO";
import fs from "fs";
import BlobService from "../../Services/blobService.js";
import ServerException from "../../Architecture/Exceptions/serverException.js";
import CONFIG from "../../config.js";
import ValidationException from "../../Architecture/Exceptions/validationExceptions.js";
import ValidatonInfrastructure from "../../Architecture/Infrastructure/validatonInfrastructure.js";
import DbTransactionInfrastucture from "../../Architecture/Infrastructure/dbTransactionInfrastucture.js";
import BlobValidators from "../../Validators/blobValidators.js";


/**
 *
 *
 * @export
 * @class CreateUserCommand
 * @extends {BaseCommand}
 */
export default class UploadImageCommand extends BaseCommand {
  /**
   * Creates an instance of CreateUserCommand.
   * @param  {{logFileInfrastructureDI:LogFileInfrastructure ,dbTransactionInfrastuctureDI:DbTransactionInfrastucture,authInfrastructureDI:AuthInfrastucture,blobServiceDI:BlobService,validationInfrastructureDI:ValidatonInfrastructure }}
   * @memberof CreateUserCommand
   */
  constructor({
    logFileInfrastructureDI,
    authInfrastructureDI,
    blobServiceDI,
    dbTransactionInfrastuctureDI,
    validationInfrastructureDI
  }) {
    super({
      logFileInfrastructureDI,
      authInfrastructureDI,
      dbTransactionInfrastuctureDI,
      validationInfrastructureDI
    });
    this.blobServiceDI = blobServiceDI;
  }
  init(dto) {
    this.model = Object.assign(new BlobBase64DTO(), dto);
  }

  get validation() {
    return [
      ()=>{return BlobValidators.checkUploadedFileType.bind(this)(this.model)},
      ()=>{return BlobValidators.getSizeOfUplodedFile.bind(this)(this.model)},
      ()=>{return BlobValidators.countOfUsersImages.bind(this)()}];
  }


  async action() {
    let result = await this.blobServiceDI.setContext(this.context).uploadUserImage({
      blob: this.model,
    });
  }
}
