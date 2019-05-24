"use strict";
import BaseCommand from "./../../Architecture/baseCommand.js";
import LogFileInfrastructure from "../../Architecture/Infrastructure/logFileInfrastructure.js";
import UserService from "../../Services/userService.js";
import BaseDTO from "../../../Shared/BaseObjects/baseDTO.js";
import AuthInfrastucture from "../../Architecture/Infrastructure/authInfrastucture.js";
import UserDTO from "../../../Shared/DTO/User/UserDTO.js";
import ExternalCredentialsDTO from "../../../Shared/DTO/User/ExternalCredentialsDTO.js";
import axios from 'axios'
import BlobService from "../../Services/blobService.js";
import UserRegisterInternalDTO from "../../../Shared/DTO/User/UserRegisterInternalDTO.js";
import uuidv4 from 'uuid/v4';
import fs from "fs-extra";
import CONFIG from "../../config.js";
import BlobBase64DTO from "../../../Shared/DTO/Blob/BlobBase64DTO.js";
import EMAIL_TEMPLATE from "./../../Static/MailsXSLT/index.js";
import CodeDictionary from "../../Architecture/Dictionary/codeDictionary.js";

/**
 * 
 * 
 * @export
 * @class CreateUserByExternalCommand
 * @extends {BaseCommand}
 */
export default class CreateUserByExternalCommand extends BaseCommand {
  /**
   * Creates an instance of CreateUserCommand.
   * @param  {{logFileInfrastructureDI:LogFileInfrastructure ,userServiceDI: UserService ,blobServiceDI:BlobService,dbTransactionInfrastuctureDI:DbTransactionInfrastucture,mailSenderDI:MailSender }}
   * @memberof CreateUserByExternalCommand
   */
  constructor({
    logFileInfrastructureDI,
    userServiceDI,
    blobServiceDI,
    dbTransactionInfrastuctureDI,
    mailSenderDI

  }) {
    super({
      logFileInfrastructureDI,
      dbTransactionInfrastuctureDI
    });
    this.userServiceDI = userServiceDI;
    this.blobServiceDI = blobServiceDI;
    this.mailSenderDI = mailSenderDI
  }
  init(dto) {
    this.model = Object.assign(new ExternalCredentialsDTO(), dto);
  }

  //request to api
  async getApiResult(accessToken, userId, provider) {
    if (provider == 1) {
      return await axios({
        method: 'get',
        url: `https://graph.facebook.com/${userId}?fields=id,name,email,address,gender&access_token=${accessToken}`
      })
    } if (provider == 2) {
      return await axios({
        method: 'get',
        url: `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${accessToken}`
      })
    }

  }
  async getApiImage(accessToken, userId, provider) {

    if (provider == 1) {
      return await axios({
        method: 'get',
        url: `https://graph.facebook.com/${userId}/picture?height=600&width=600&access_token=${accessToken}`,
        responseType: 'arraybuffer'
      })
    }
    return undefined

  }
  async saveBlob() {
    let img = await this.getApiImage(this.model.token, this.model.userId, this.model.provider);
    let blob = new BlobBase64DTO();
    blob.blob = img.data;
    blob.type = img.headers["content-type"];
    blob.uid = uuidv4();
    let result = await this.blobServiceDI.setContext(this.context).uploadUserImage({ blob: blob });

    await this.blobServiceDI.setContext(this.context).verifyImage({ blob: result.dataValues });
    return result.dataValues.id

  }

  sendMail(newUser) {
    let model = {
      body: {
        name: newUser.name,
        email: newUser.email,
        uid: newUser.uid,
        href: CONFIG.FRONT_END_URL
      }
    };
    this.mailSenderDI.mailSend({
      xslt_file: EMAIL_TEMPLATE.new_user,
      model,
      email_to: model.body.email,
      language: newUser.language,
      mail_title: new CodeDictionary().get_trans(
        "NEW_USER_TITLE",
        "EMAIL",
        newUser.language,
        [model.body.name]
      )
    });

  }
  async checkIfExistAndLink(externalCred, userInfo, provider) {
    let fbCred = undefined;
    if (userInfo.user_auths != undefined && userInfo.user_auths.length > 0) {
      fbCred = await userInfo.user_auths.find(item => {
        return item.socialType == provider && item.socialUser_id == externalCred.id;
      })
    }
    if (fbCred != undefined) {
      return;
    } else {
      return await this.userServiceDI.addExternalCredentials({
        cred: {
          id: fbCred != undefined ? fbCred.id : 0,
          user_id: userInfo.id,
          socialUser_id: externalCred.id,
          socialType: provider
        }
      })
    }
  }
  async action() {

    const resultReq = await this.getApiResult(this.model.token, this.model.userId, this.model.provider);
    const result = resultReq.data;
    console.log(result);
    const userInfo = await this.userServiceDI.toJsonParse(this.userServiceDI.setContext(this.context).checkMailInDb({ email: result.email }));
    console.log(userInfo)
    if (userInfo != null && userInfo.id !='') {
      await this.checkIfExistAndLink(result, userInfo, this.model.provider);
      return;
    } else {
      let userRegister = Object.assign(new UserRegisterInternalDTO(), {
        email: result.email,
        name: result.name,
        phone: '',
        birthDate: Date.now(),
        password: uuidv4(),
        city: null,
        city_id: null,
        address: null,
        country: null,
        country_id: null,
        longitude: 0,
        latitude: 0,
        uid: uuidv4(),
        language: this.language,
        blob_id: null

      });
      const newUser = await this.userServiceDI.toJsonParse(this.userServiceDI.setContext(this.context).newInternalUser({ model: userRegister }));
      await this.userServiceDI.authorizeUser({ guid: newUser.uid })
      await this.checkIfExistAndLink(result, newUser, this.model.provider);
      if (this.model.provider == 1) {
        newUser.is_authorized = 1;
        this.context.user = newUser;
        let blob_id = await this.saveBlob()
        await this.userServiceDI.setContext(this.context).setProfileImage({
          user: {
            blob_id: blob_id
          }
        })
      }
      this.sendMail(newUser);




    }

  }
}
