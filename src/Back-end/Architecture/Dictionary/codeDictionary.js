"use strict";

//const BaseInfrastracture = require('./../baseInfrastructure');

import JsonDB from "node-json-db";
import "./../../../Shared/BaseObjects/Helper/commonFunctions.js";

export default class CodeDictionary {
  constructor() {
    this.db = new JsonDB("CodeDictionary", true, true);
  }
  get(code, type, ...param) {
    let path = "/";
    if (type != "") {
      path += type + "/";
    }
    if (code != "") {
      path += code;
    }

    const result = Object.assign({}, this.db.getData(path));
    for (let key in result.message) {
      if (result.message.hasOwnProperty(key)) {
        result.message[key] = result.message[key].format(
          param[0],
          param[1],
          param[2],
          param[3],
          param[4]
        );
      }
    }
    return result;
  }
  get_trans(code, type, lang, ...param) {
    return this.get(code, type, param).message[lang];
  }
  set(code, type, jsonObject) {
    this.db.push(`/${type}/${code}`, jsonObject, true);
  }

  remove(code, type) {
    this.db.delete(`/${type}/${code}`);
  }
  checkDb() {
    return this.db instanceof JsonDB;
  }
}
