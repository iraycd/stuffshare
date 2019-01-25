"use strict";

import BaseInfrastracture from "./../baseInfrastructure.js";
import jwt from 'jsonwebtoken';
import ServerException from "../Exceptions/serverException.js";
import fs from "fs";
import UserRepository from "../../Repository/userRepository.js";


export default class AuthInfrastucture extends BaseInfrastracture {

  /**
   *Creates an instance of AuthInfrastucture.
   * @param {{userRepositoryDI:UserRepository }
   * @memberof AuthInfrastucture
   */
  constructor({ userRepositoryDI }) {
    super();
    this.userRepositoryDI = userRepositoryDI;
    this.anonymous = false;
  }
  allowAnonymous() {
    this.anonymous = true;
  }
  async loginAgainCheck(user) {
    let result = await this.userRepositoryDI.getByGuid({ uid })
  }

  getDecodedToken(pToken) {
    let token = ''
    if (pToken) {
      token = pToken.split(' ')[1];
    }
    else {
      throw 'AUTHORIZATION_ERROR'
    }
    let cert = fs.readFileSync('./cert.key');
    let decoded = jwt.verify(token, cert.toString('utf8'));
    return decoded
  }

  async executeLayer(action) {
    try {
      let context = this.getDecodedToken(action.token);

      let user = await this.userRepositoryDI.getByGuid({ uid: context.uid })

      if (user == undefined || user.relogin_require == true) {
        throw 'AUTHORIZATION_ERROR'
      }
      action.context.user = user.dataValues;
      return await action;
    } catch (ex) {
      if (!this.anonymous) {
        throw (new ServerException()).throw({ code: "AUTHORIZATION_ERROR", type: "ERROR" });
      } else {
        return await action;
      }
    }
  }
}
