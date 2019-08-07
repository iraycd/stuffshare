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
import NodeGeocoder from 'node-geocoder';

var options = {
  provider: 'locationiq',

  // Optional depending on the providers
  httpAdapter: 'https', // Default
  apiKey: CONFIG.LOCATION_IQ, // for Mapquest, OpenCage, Google Premier
  formatter: null         // 'gpx', 'string', ...
};

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
  async getCities({ city }) {

  
    let cityList = await this.unitOfWorkDI.cityRepository.getCities({
      name_fs: city.name,
      country_id: city.country_id
    });
    return cityList;
  }

  /**
   *
   *
   * @param   {{ city: CityDTO}}
   * @returns {{Promise<CityDTO[]>}}
   * @memberof CityService
   */
  async getReverse({ country, city, address }) {

    var geocoder = NodeGeocoder(options);

    // Using callback
    let result = await new Promise((resolve, rej) => {
      geocoder.geocode({ address: address, country: country, city: city, limit: 100 }, function (err, res) {

        resolve(res);
      });

    });
    return result;
  }

  async getReverseByLatLng({ longitude, latitude, address }) {

    var geocoder = NodeGeocoder(options);

    let result = await new Promise((resolve, rej) => {
      geocoder.reverse({ lat: latitude, lon: longitude }, function (err, res) {

        console.log(res)
        resolve(res);
      });

    });
    return result;
  }
}
