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
import RegionDTO from "../../Shared/DTO/Region/RegionDTO.js";


/**
 *
 * @export
 * @class RegionService
 * @extends BaseService
 */
export default class RegionService extends BaseService {
  /**
   * Creates an instance of UserService.
   * @param   {{ unitOfWorkDI: UnitOfWork}}
   */
  constructor({ unitOfWorkDI }) {
    super({ unitOfWorkDI, repository: 'regionRepository' });
  }
  

  /**
   *
   *
   * @param   {{ region: RegionDTO}}
   * @returns
   * @memberof RegionService
   */
  async getRegions({region}) {

    console.log('KUPAAAA');
    console.log(this.unitOfWorkDI);

    let countryList = await this.unitOfWorkDI.regionRepository.getRegions({
      name_fs: region.name,
      country_id:region.country_id
    });
    return countryList;
  }
}
