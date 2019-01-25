"use strict";
import BaseCommand from "./../../Architecture/baseCommand.js";
import LogFileInfrastructure from "../../Architecture/Infrastructure/logFileInfrastructure.js";
import UserService from "../../Services/userService.js";
import UserDTO from "../../../Shared/DTO/User/UserDTO.js";
import EMAIL_TEMPLATE from "./../../Static/MailsXSLT/index.js";
import CONFIG from "../../config.js";
import MailSender from "../../Architecture/mailSender.js";
import CodeDictionary from "../../Architecture/Dictionary/codeDictionary.js";
import UserLoginInternalDTO from "../../../Shared/DTO/User/UserLoginInternalDTO.js";

/**
 *
 *
 * @export
 * @class ChangePasswordCommand
 * @extends {BaseCommand}
 */
export default class ChangePasswordCommand extends BaseCommand {
  /**
   * Creates an instance of CreateUserCommand.
   * @param  {{logFileInfrastructureDI:LogFileInfrastructure ,userServiceDI: UserService,authInfrastructureDI:AuthInfrastucture }}
   * @memberof ChangePasswordCommand
   */
  constructor({
    logFileInfrastructureDI,
    userServiceDI,
    mailSenderDI,
    authInfrastructureDI
  }) {
    super({
      logFileInfrastructureDI,
      authInfrastructureDI
    });
    this.mailSenderDI = mailSenderDI;
    this.userServiceDI = userServiceDI;
  }
  init(dto) {
    this.model = Object.assign(new UserLoginInternalDTO(), dto);
  }

  get validation() {
    return [
      ()=>{this.checkDTO.bind(this)(this.model)}];
  }

  async action() {
    await this.userServiceDI
      .setContext(this.context)
      .changePassword({
        user: this.context.user,
        password: this.model.password
      });
  }
}
