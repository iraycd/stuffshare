// @ts-nocheck

import bcrypt from "bcryptjs";
import uuidv4 from "uuid/v4";
import BaseService from "../Architecture/baseService.js";
import UserDTO from "../../Shared/DTO/User/UserDTO.js";
import UnitOfWork from "../unitOfWork.js";
import ServerException from "../Architecture/Exceptions/serverException.js";
import UserRepository from "../Repository/userRepository.js";
import UserRegisterInternalDTO from "../../Shared/DTO/User/UserRegisterInternalDTO.js";
import UserLoginInternalDTO from "../../Shared/DTO/User/UserLoginInternalDTO.js";
import jwt from "jsonwebtoken";
import fs from "fs";
import CONFIG from "../config.js";
import CityDTO from "../../Shared/DTO/City/CityDTO.js";


/**
 *
 * @export
 * @class CityService
 * @extends BaseService
 */
export default class CityService extends BaseService {
  /**
   * Creates an instance of UserService.
   * @param   {{ unitOfWorkDI: UnitOfWork}}
   */
  constructor({ unitOfWorkDI }) {
    super({ unitOfWorkDI, repository: 'countryRepository' });
  }
  

  /**
   *
   *
   * @param   {{ city: CityDTO}}
   * @returns {{Promise<CityDTO[]>}}
   * @memberof CityService
   */
  async getCities({city}) {

    console.log('KUPAAAA');
    console.log(this.unitOfWorkDI);

    let cityList = await this.unitOfWorkDI.cityRepository.getCities({
      name_fs: city.name,
      country_id:city.country_id
    });
    return cityList;
  }
}
