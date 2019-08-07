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

/**
 *
 * @export
 * @class UserService
 * @extends BaseService
 */
export default class UserService extends BaseService {
  /**
   * Creates an instance of UserService.
   * @param   {{ unitOfWorkDI: UnitOfWork}}
   */
  constructor({ unitOfWorkDI, userRepositoryDI }) {
    super({ unitOfWorkDI, repository: 'userRepository' });
  }
  /**
     * 
     * @param {{ model: UserRegisterInternalDTO}}
     * @return {Promise<any>}
   
     */
  async newInternalUser({ model }) {
    let passwordHash = "";
    let passwordSalt = "";

    passwordSalt = bcrypt.genSaltSync(10);
    passwordHash = bcrypt.hashSync(model.password, passwordSalt);
    let dto = Object.assign(new UserDTO(), model);
    dto.passwordHash = passwordHash;
    dto.salt = passwordSalt;
    dto.is_admin = false;
    dto.is_root = false;
    return await this.unitOfWorkDI.userRepository.insert({ model: dto });
  }

  async checkMailInDb({ email }) {
    try {
      return await this.unitOfWorkDI.userRepository.checkMailInDb({
        email
      });
    } catch (ex) {
      throw ex;
    }
  }
  /**
   *
   * @param   {{model:UserLoginInternalDTO}}
   * @return {void}
   * @memberof UserService
   */
  async logInInternal({ model }) {
    let user = await this.checkMailInDb({
      email: model.email
    });
    if (!user) {
      throw new ServerException().throw({
        code: "EMAIL_NOT_EXIST",
        type: "ERROR"
      });
    }
    let hash = bcrypt.hashSync(model.password, user.salt);

    if (hash != user.passwordHash) {
      throw new ServerException().throw({
        code: "EMAIL_NOT_EXIST",
        type: "ERROR"
      });
    }

    if (hash == user.passwordHash) {
      let refresh_token = uuidv4();
      var expiresDate = new Date();
      expiresDate.setDate(expiresDate.getDate() + 1);

      let cert = fs.readFileSync("./cert.key");
      return {
        token: jwt.sign(
          {
            uid: user.uid,
            socialGuid: null,
            socialType: null,
            email: user.email
          },
          cert.toString("utf8"),
          { expiresIn: CONFIG.SECURITY.TOKEN_EXPIRATION }
        ),
        refresh_token: user.refresh_token,
        uid: user.uid,
        name: user.name,
        surname: user.surname,
        email: user.email,
        language: user.language,
        expiresIn: expiresDate,
        user: user


        //,language:
      };
    }
  }

  async genRefreshToken({ guid }) {
    let user = await this.getByGuid({ uid: guid });
    let refresh_token = uuidv4();

    await this.unitOfWorkDI.userRepository.updateRefreshToken({
      id: user.id,
      refresh_token: refresh_token,
      relogin_require: false
    });
  }

  /**
   *
   *
   * @param {*} { guid }
   * @returns
   * @memberof UserService
   */
  async getRefreshToken() {
    let user = await this.getByGuid({
      uid: this.context.user.uid
    });
    return user.refresh_token;
  }
  /**
   *
   *
   * @param {*} { refresh_token }
   * @returns
   * @memberof UserService
   */
  async logByRefreshToken({ refresh_token }) {
    let user = await this.toJsonParse(
      this.unitOfWorkDI.userRepository.getByRefreshToken({
        refresh_token
      })
    );
    if (user && user.relogin_require == false) {
      let cert = fs.readFileSync("./cert.key");
      var expiresDate = new Date();
      expiresDate.setDate(expiresDate.getDate() + 1);

      return {
        token: jwt.sign(
          {
            uid: user.uid,
            socialGuid: null,
            socialType: null,
            email: user.email
          },
          cert.toString("utf8"),
          { expiresIn: CONFIG.SECURITY.TOKEN_EXPIRATION }
        ),
        refresh_token: refresh_token,
        uid: user.uid,
        name: user.name,
        surname: user.surname,
        email: user.email,
        language: user.language,
        expiresIn: expiresDate,
        user: user


      };
    } else {
      throw new ServerException().throw({
        code: "AUTHORIZATION_ERROR",
        type: "ERROR"
      });
    }
  }

  async authorizeUser({ guid }) {
    await this.unitOfWorkDI.userRepository.authorizeUser({ uid: guid });
    return await this.getByGuid({ uid: guid });
  }

  async logOut({ id }) {
    return await this.unitOfWorkDI.userRepository.updateRefreshToken({
      id: id,
      refresh_token: null,
      relogin_require: true
    });
  }

  async changePassword({ user, password }) {
    user.passwordHash = bcrypt.hashSync(password, user.salt);
    await this.unitOfWorkDI.userRepository.update({
      model: user
    });
  }

  async forgotPassword({ uid }) {
    let user = await this.getByGuid({ uid });
    let password = bcrypt
      .genSaltSync(10)
      .substring(7, 14)
      .toLowerCase();
    await this.logOut({ id: user.id });
    user = await this.getByGuid({ uid });
    await this.changePassword({ user: user, password });
    return {
      email: user.email,
      password,
      language: user.language,
      name: user.name
    };
  }
  async setLangauge({ language }) {
    this.context.user.language = language;
    this.update({ model: this.context.user });
  }
  //external_log_in
  //plug_new_log_in
  //upload_user_image

  //get_language
  //user edit
  /**
   *
   *
   * @param {*} {user_id}
   * @returns UserDTO
   * @memberof UserService
   */
  async getUserInfo({ user_id }) {
    return await this.toJsonParse(this.unitOfWorkDI.userRepository.getUserInfo({ user_id }));
  }

  async setCoordinates({ longitude, latitude, zipcode, address, city_id, country_id, city }) {
    this.context.user.longitude = longitude;
    this.context.user.latitude = latitude;
    this.context.user.zipcode = zipcode;
    this.context.user.address = address;
    this.context.user.city_id = city_id;
    this.context.user.country_id = country_id;
    this.context.user.city = city;
    await this.update({ model: this.context.user });
  }


  async setProfileImage({ user }) {
    this.context.user.blob_id = user.blob_id;
    await this.update({ model: this.context.user })
  }

  async addExternalCredentials({ cred }) {
    if (cred.id > 0) {
      await this.unitOfWorkDI.userAuthRepository.delete({ model: cred })
    }
    cred.id = undefined;
    return await this.unitOfWorkDI.userAuthRepository.insert({ model: cred })
  }

  async loginByExternalUserId({ email, externalUserId, provider }) {
    let result = await this.toJsonParse(this.checkMailInDb({ email: email }))
    console.log(result);
    let extCred = undefined;
    if (result == null) {
      throw new ServerException().throw({
        code: "EMAIL_NOT_EXIST",
        type: "ERROR"
      });
    }
    if (result.user_auths.length > 0) {
      extCred = await result.user_auths.find(item => {
        return item.socialType == provider && item.socialUser_id == externalUserId;
      })
    }
    if (extCred != undefined) {
      let cert = fs.readFileSync("./cert.key");
      var expiresDate = new Date();
      expiresDate.setDate(expiresDate.getDate() + 1);
      return {
        token: jwt.sign(
          {
            uid: result.uid,
            socialGuid: null,
            socialType: null,
            email: result.email
          },
          cert.toString("utf8"),
          { expiresIn: CONFIG.SECURITY.TOKEN_EXPIRATION }
        ),
        refresh_token: result.refresh_token,
        uid: result.uid,
        name: result.name,
        surname: result.surname,
        email: result.email,
        language: result.language,
        expiresIn: expiresDate,
        user: result
        //,language:
      };
    }

    throw new ServerException().throw({
      code: "EMAIL_NOT_EXIST",
      type: "ERROR"
    });

  }
}
