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
   * @param   {{ country: CityDTO}}
   * @returns
   * @memberof CityService
   */
  async getCountryByName({country}) {

    console.log('KUPAAAA');
    console.log(this.unitOfWorkDI);

    let countryList = await this.unitOfWorkDI.countryRepository.getCountryByName({
      name_fs: country.name
    });
    return countryList;
  }
}
