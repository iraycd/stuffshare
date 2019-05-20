"use strict";
import BaseCommand from "./../../Architecture/baseCommand.js";
import LogFileInfrastructure from "../../Architecture/Infrastructure/logFileInfrastructure.js";
import UserService from "../../Services/userService.js";
import BaseDTO from "../../../Shared/BaseObjects/baseDTO.js";
import AuthInfrastucture from "../../Architecture/Infrastructure/authInfrastucture.js";
import MailSender from "../../Architecture/mailSender.js";
import CONFIG from "../../config.js";
import CodeDictionary from "../../Architecture/Dictionary/codeDictionary.js";
import EMAIL_TEMPLATE from "../../Static/MailsXSLT/index.js"
import { URL } from "url";

/**
 * 
 * 
 * @export
 * @class RemoveUserCommand
 * @extends {BaseCommand}
 */
export default class RemoveUserCommand extends BaseCommand {
  /**
   * Creates an instance of CreateUserCommand.
   * @param  {{logFileInfrastructureDI:LogFileInfrastructure ,userServiceDI: UserService ,authInfrastructureDI:AuthInfrastucture,mailSenderDI:MailSender }}
   * @memberof RemoveUserCommand
   */
  constructor({
    logFileInfrastructureDI,
    userServiceDI,
    authInfrastructureDI,
    mailSenderDI
  }) {
    super({
      logFileInfrastructureDI,
      authInfrastructureDI
    });
    this.mailSenderDI = mailSenderDI;
    this.userServiceDI = userServiceDI;
  }
  init(dto) {
    this.model = Object.assign(new BaseDTO(), dto);
  }

  get validation() {
    return [];
  }

  async action() {
    await this.userServiceDI.setContext(this.context).delete({ model: this.context.user });
    let model = {
      body: {
        name: this.context.user.name,
        email: this.context.user.email,
        href: (new URL(this.referer)).origin//this.referer,//CONFIG.FRONT_END_URL,
      }
    };
    console.log(this.referer);
    this.mailSenderDI.mailSend({
      xslt_file: EMAIL_TEMPLATE.remove_user,
      model,
      email_to: model.body.email,
      language: this.context.language,
      mail_title: new CodeDictionary().get_trans("REMOVE_USER_TITLE", "EMAIL",  this.context.language)

    });
  }
}
