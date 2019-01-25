"use strict";
import BaseCommand from "./../../Architecture/baseCommand.js";
import LogFileInfrastructure from "../../Architecture/Infrastructure/logFileInfrastructure.js";
import UserService from "../../Services/userService.js";
import UserDTO from "../../../Shared/DTO/User/UserDTO.js";




/**
 * 
 * 
 * @export
 * @class CreateUserCommand
 * @extends {BaseCommand}
 */
export default class GenRefreshTokenCommand extends BaseCommand {
  /**
   * Creates an instance of CreateUserCommand.
   * @param  {{logFileInfrastructureDI:LogFileInfrastructure ,userServiceDI: UserService}}
   * @memberof CreateUserCommand
   */
  constructor({
    logFileInfrastructureDI,
    userServiceDI

  }) {
    super({
      logFileInfrastructureDI

    });
    this.userServiceDI = userServiceDI;
  }
  init(dto) {
    this.model = Object.assign(new UserDTO(), dto);
  }

  get validation() {
    return [()=>{this.checkDTO.bind(this)()}];
  }

  async action() {
    await this.userServiceDI.genRefreshToken({ guid: this.model.uid });
  }
}
