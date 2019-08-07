"use strict";
import BaseCommand from "./../../Architecture/baseCommand.js";
import LogFileInfrastructure from "../../Architecture/Infrastructure/logFileInfrastructure.js";
import UserService from "../../Services/userService.js";
import BaseDTO from "../../../Shared/BaseObjects/baseDTO.js";
import AuthInfrastucture from "../../Architecture/Infrastructure/authInfrastucture.js";
import UserDTO from "../../../Shared/DTO/User/UserDTO.js";

/**
 *
 *
 * @export
 * @class CreateUserCommand
 * @extends {BaseCommand}
 */
export default class SetCoordinatesCommand extends BaseCommand {
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
    this.model = Object.assign(new UserDTO(), dto);
  }

  get validation() {
    return [];
  }

  async action() {
    await this.userServiceDI
      .setContext(this.context)
      .setCoordinates({
        longitude: this.model.longitude,
        latitude: this.model.latitude,
        zipcode:this.model.zipcode,
        address:this.model.address,
        city_id:this.model.city_id,
        city: this.model.city,
        country_id:this.model.country_id
      });
  }
}
