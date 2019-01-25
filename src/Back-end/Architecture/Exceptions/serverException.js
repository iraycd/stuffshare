"use strict";
import ValidationExceptions from "./validationExceptions.js";
import BaseException from "../../../Shared/BaseObjects/Exceptions/baseException.js";
import CodeDictionary from "../Dictionary/codeDictionary.js";

export default class ServerException extends BaseException {
  constructor() {
    super({});
    this.error = {
      status: "",
      message: {
        pl: "",
        us: ""
      },
      code: "",
      type: "",
      validations: [],
      field: "",
      error: ""
    };
  }
  throw({ status, type, msg, code, validations, error }, ...param) {
    this.error.error = error;
    this.error.code = code;

    if (typeof status == "undefined" && typeof code != "undefined") {
      const dictResult = new CodeDictionary().get(
        this.error.code,
        type,
        ...param
      );
      this.error = Object.assign({}, this.error, dictResult);
    } else {
      this.Status = status;
      this.Code = code;
      this.Msg = msg;
    }
    if (typeof validations != "undefined") {
      validations.map(item => {
        this.addValidationError(item);
      }, this);
    }
    return this;
  }
  addValidationError(validObject) {
    console.log("exception", this);
    ///if (validObject instanceof ValidationExceptions) {
    this.error.validations.push(validObject);

    //} else throw 'WRONG_TYPE';
  }
}
