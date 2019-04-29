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
        language: user.language
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
        language: user.language
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

  async setCoordinates({ longitude, latitude }) {
    this.context.user.longitude = longitude;
    this.context.user.latitude = latitude;
    this.update({ model: this.context.user });
  }
}
