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
import DbTransactionInfrastucture from "../../Architecture/Infrastructure/dbTransactionInfrastucture.js";

/**
 *
 *
 * @export
 * @class ForgotPasswordCommand
 * @extends {BaseCommand}
 */
export default class ForgotPasswordCommand extends BaseCommand {
  /**
   * Creates an instance of CreateUserCommand.
   * @param  {{logFileInfrastructureDI:LogFileInfrastructure ,userServiceDI: UserService,mailSenderDI:MailSender,dbTransactionInfrastuctureDI:DbTransactionInfrastucture}}
   * @memberof ForgotPasswordCommand
   */
  constructor({
    logFileInfrastructureDI,
    userServiceDI,
    mailSenderDI,
    dbTransactionInfrastuctureDI
  }) {
    super({
      logFileInfrastructureDI,
      dbTransactionInfrastuctureDI
    });
    this.mailSenderDI = mailSenderDI;
    this.userServiceDI = userServiceDI;
  }
  init(dto) {
    this.model = Object.assign(new UserDTO(), dto);
  }

  get validation() {
    return [];
  }
  //////////////////ROLLBACK IF Mail will not send
  async action() {
    let result = await this.userServiceDI.forgotPassword({
      uid: this.model.uid
    });
    if (result != null) {
      let model = {
        body: {
          email: result.email,
          password: result.password,
          href: CONFIG.FRONT_END_URL,
          name: result.name
        }
      };
      await this.mailSenderDI.mailSend({
        xslt_file: EMAIL_TEMPLATE.forgot_password_step_2,
        model,
        email_to: result.email,
        language: result.language,
        mail_title: new CodeDictionary().get_trans(
          "FORGOT_PASSWORD",
          "EMAIL",
          result.language
        )
      });
    }
  }
}
