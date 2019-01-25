"use strict";
import BaseCommand from "./../../Architecture/baseCommand.js";
import LogFileInfrastructure from "../../Architecture/Infrastructure/logFileInfrastructure.js";
import UserService from "../../Services/userService.js";
import BaseDTO from "../../../Shared/BaseObjects/baseDTO.js";
import AuthInfrastucture from "../../Architecture/Infrastructure/authInfrastucture.js";


/**
 * 
 * 
 * @export
 * @class CreateUserCommand
 * @extends {BaseCommand}
 */
export default class LogOutCommand extends BaseCommand {
  /**
   * Creates an instance of CreateUserCommand.
   * @param  {{logFileInfrastructureDI:LogFileInfrastructure ,userServiceDI: UserService ,authInfrastructureDI:AuthInfrastucture }}
   * @memberof CreateUserCommand
   */
  constructor({
    logFileInfrastructureDI,
    userServiceDI,
    authInfrastructureDI
  }) {
    super({
      logFileInfrastructureDI,
      authInfrastructureDI
    });
    this.userServiceDI = userServiceDI;
  }
  init(dto) {
    this.model = Object.assign(new BaseDTO(), dto);
  }

  get validation() {
    return [];
  }

  async action() {
    await this.userServiceDI.setContext(this.context).logOut({id:this.context.user.id});
  }
}
