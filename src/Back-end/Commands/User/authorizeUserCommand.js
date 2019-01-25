"use strict";
import BaseCommand from "./../../Architecture/baseCommand.js";
import LogFileInfrastructure from "../../Architecture/Infrastructure/logFileInfrastructure.js";
import UserService from "../../Services/userService.js";
import UserDTO from "../../../Shared/DTO/User/UserDTO.js";
import EMAIL_TEMPLATE from "./../../Static/MailsXSLT/index.js";
import CONFIG from "../../config.js";
import MailSender from "../../Architecture/mailSender.js";
import CodeDictionary from "../../Architecture/Dictionary/codeDictionary.js";

/**
 *
 *
 * @export
 * @class CreateUserCommand
 * @extends {BaseCommand}
 */
export default class AuthorizeUserCommand extends BaseCommand {
  /**
   * Creates an instance of CreateUserCommand.
   * @param  {{logFileInfrastructureDI:LogFileInfrastructure ,userServiceDI: UserService,mailSenderDI:MailSender}}
   * @memberof CreateUserCommand
   */
  constructor({ logFileInfrastructureDI, userServiceDI, mailSenderDI }) {
    super({
      logFileInfrastructureDI
    });
    this.mailSenderDI = mailSenderDI;
    this.userServiceDI = userServiceDI;
  }
  init(dto) {
    this.model = Object.assign(new UserDTO(), dto);
  }


  async action() {
    let result = await this.userServiceDI.authorizeUser({
      guid: this.model.uid
    });
    if (result != null) {
      let model = {
        body: {
          name: result.name,
          email: result.email,
          uid: result.uid,
          href: CONFIG.FRONT_END_URL
        }
      };
      this.mailSenderDI.mailSend({
        xslt_file: EMAIL_TEMPLATE.new_user,
        model,
        email_to: model.body.email,
        language: result.language,
        mail_title: new CodeDictionary().get_trans(
          "NEW_USER_TITLE",
          "EMAIL",
          result.language,
          [model.body.name]
        )
      });
    }
  }
}
